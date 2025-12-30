import { type NextRequest, NextResponse } from "next/server"
import { promisify } from "util"
import { inflate as zlibInflate } from "zlib"
import { PDFDocument } from "pdf-lib"
import { v2 as cloudinary } from 'cloudinary';

const inflate = promisify(zlibInflate)

export const maxDuration = 60

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
})

const IMAGE_MIME_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/gif',
  'image/webp',
  'image/bmp',
  'image/svg+xml',
  'image/tiff'
]

const IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.bmp', '.svg', '.tiff', '.tif']

function isImageFile(file: File): boolean {
  const fileName = file.name.toLowerCase()
  const hasImageExtension = IMAGE_EXTENSIONS.some(ext => fileName.endsWith(ext))
  const hasImageMimeType = IMAGE_MIME_TYPES.includes(file.type)
  
  return hasImageExtension || hasImageMimeType
}

async function uploadImageToCloudinary(file: File): Promise<{ filename: string; url: string; mimeType: string }> {
  const arrayBuffer = await file.arrayBuffer()
  const buffer = Buffer.from(arrayBuffer)
  
  const uploadResult = await new Promise<{ secure_url: string }>((resolve, reject) => {
    cloudinary.uploader.upload_stream(
      {
        folder: "uploaded_images",
        public_id: file.name.replace(/\.[^/.]+$/, ""),
        resource_type: "image",
      },
      (error, result) => {
        if (error) reject(error)
        else resolve(result as { secure_url: string })
      }
    ).end(buffer)
  })

  return {
    filename: file.name,
    url: uploadResult.secure_url,
    mimeType: file.type || 'image/jpeg',
  }
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get("file") as File

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 })
    }

    // Handle image files
    if (isImageFile(file)) {
      try {
        const uploadedImage = await uploadImageToCloudinary(file)
        
        return NextResponse.json({
          message: "Image uploaded successfully.",
          files: [uploadedImage],
          debug: {
            fileType: "image",
            originalFilename: file.name,
            mimeType: file.type,
          },
        })
      } catch (uploadError) {
        return NextResponse.json(
          {
            error: `Error uploading image: ${uploadError instanceof Error ? uploadError.message : "Unknown error"}`,
          },
          { status: 500 },
        )
      }
    }

    // Handle PDF files
    if (!file.name.toLowerCase().endsWith(".pdf")) {
      return NextResponse.json({ error: "Invalid file type. Please upload a PDF or image file." }, { status: 400 })
    }

    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    const pdfDoc = await PDFDocument.load(buffer, { ignoreEncryption: true })
    const pageCount = pdfDoc.getPageCount()

    const images = await extractImagesFromPDF(pdfDoc, buffer)

    if (images.length === 0) {
      return NextResponse.json({
        message: "PDF processed successfully, but no images were found.",
        files: [],
        debug: {
          totalPages: pageCount,
          totalImagesFound: 0,
          successfulProcessing: 0,
        },
      })
    }

    const extractedFiles: { filename: string; url: string; mimeType: string }[] = []

    for (let i = 0; i < images.length; i++) {
      const image = images[i]
      const filename = `${file.name.replace(".pdf", "")}_image_${i + 1}.${image.ext}`
      const mimeType = `image/${image.ext === "jpg" ? "jpeg" : image.ext}`

      try {
        const uploadResult = await new Promise<{ secure_url: string }>((resolve, reject) => {
          cloudinary.uploader.upload_stream(
            {
              folder: "pdf_extracted_images",
              public_id: filename.replace(/\.[^/.]+$/, ""),
              resource_type: "image",
            },
            (error, result) => {
              if (error) reject(error)
              else resolve(result as { secure_url: string })
            }
          ).end(image.data)
        })

        extractedFiles.push({
          filename,
          url: uploadResult.secure_url,
          mimeType,
        })
      } catch (uploadError) {
        continue
      }
    }

    return NextResponse.json({
      message: `Successfully extracted ${extractedFiles.length} image(s).`,
      files: extractedFiles,
      debug: {
        totalPages: pageCount,
        totalImagesFound: images.length,
        successfulProcessing: extractedFiles.length,
      },
    })
  } catch (error) {
    return NextResponse.json(
      {
        error: `Error processing file: ${error instanceof Error ? error.message : "Unknown error"}`,
      },
      { status: 500 },
    )
  }
}

async function extractImagesFromPDF(
  pdfDoc: any,
  buffer: Buffer,
): Promise<Array<{ data: Buffer; ext: string; width?: number; height?: number }>> {
  const images: Array<{ data: Buffer; ext: string; width?: number; height?: number }> = []
  const seenHashes = new Set<string>()

  try {
    const indirectObjects = pdfDoc.context.indirectObjects

    for (const [ref, obj] of indirectObjects.entries()) {
      try {
        if (!obj || typeof obj !== "object" || !("dict" in obj) || !("contents" in obj)) {
          continue
        }

        const stream = obj as any
        const dict = stream.dict

        if (!dict || !dict.get) {
          continue
        }

        const subtype = dict.get(pdfDoc.context.obj("Subtype"))

        if (!subtype || subtype.toString() !== "/Image") {
          continue
        }

        const width = dict.get(pdfDoc.context.obj("Width"))
        const height = dict.get(pdfDoc.context.obj("Height"))
        const filter = dict.get(pdfDoc.context.obj("Filter"))
        const colorSpace = dict.get(pdfDoc.context.obj("ColorSpace"))
        const imageData = stream.contents

        if (!imageData || imageData.length === 0) {
          continue
        }

        const w = width ? Number(width.toString()) : 0
        const h = height ? Number(height.toString()) : 0

        if (w < 10 || h < 10 || w > 10000 || h > 10000) {
          continue
        }

        const filterStr = filter ? filter.toString() : ""
        let extractedImage: { data: Buffer; ext: string; width?: number; height?: number } | null = null

        if (filterStr.includes("DCTDecode")) {
          const format = detectImageFormat(imageData)
          if (format === "jpg" && isValidJPEG(imageData)) {
            extractedImage = {
              data: Buffer.from(imageData),
              ext: "jpg",
              width: w,
              height: h,
            }
          }
        } else if (filterStr.includes("FlateDecode")) {
          try {
            const decompressed = await inflate(Buffer.from(imageData))
            const pngData = await convertRawToPNG(decompressed, w, h, colorSpace?.toString())

            if (pngData && pngData.length > 1000) {
              extractedImage = {
                data: pngData,
                ext: "png",
                width: w,
                height: h,
              }
            }
          } catch (decompressError) {
            continue
          }
        } else if (filterStr.includes("JPXDecode")) {
          if (imageData.length > 1000) {
            extractedImage = {
              data: Buffer.from(imageData),
              ext: "jp2",
              width: w,
              height: h,
            }
          }
        } else if (!filter || filterStr === "/null") {
          try {
            const pngData = await convertRawToPNG(imageData, w, h, colorSpace?.toString())

            if (pngData && pngData.length > 1000) {
              extractedImage = {
                data: pngData,
                ext: "png",
                width: w,
                height: h,
              }
            }
          } catch (convertError) {
            continue
          }
        }

        if (extractedImage) {
          const hash = simpleHash(extractedImage.data)
          if (!seenHashes.has(hash)) {
            seenHashes.add(hash)
            images.push(extractedImage)
          }
        }
      } catch (objError) {
        continue
      }
    }

    if (images.length === 0) {
      const binaryImages = extractImagesByPattern(buffer)
      for (const img of binaryImages) {
        const hash = simpleHash(img.data)
        if (!seenHashes.has(hash)) {
          seenHashes.add(hash)
          images.push(img)
        }
      }
    }
  } catch (error) {
    return images
  }

  return images
}

async function convertRawToPNG(
  rawData: Uint8Array,
  width: number,
  height: number,
  colorSpace?: string,
): Promise<Buffer | null> {
  try {
    if (!width || !height || width < 1 || height < 1) {
      return null
    }

    const { createCanvas } = await import("canvas")

    let channels = 3
    let isGrayscale = false

    if (colorSpace?.includes("DeviceGray") || colorSpace?.includes("Gray")) {
      channels = 1
      isGrayscale = true
    } else if (colorSpace?.includes("DeviceCMYK") || colorSpace?.includes("CMYK")) {
      channels = 4
    } else if (colorSpace?.includes("DeviceRGB") || colorSpace?.includes("RGB")) {
      channels = 3
    }

    const expectedSize = width * height * channels

    if (rawData.length < expectedSize * 0.8 || rawData.length > expectedSize * 1.2) {
      return null
    }

    const canvas = createCanvas(width, height)
    const ctx = canvas.getContext("2d")
    const imageData = ctx.createImageData(width, height)

    if (isGrayscale) {
      for (let i = 0; i < width * height; i++) {
        const gray = rawData[i] || 0
        imageData.data[i * 4] = gray
        imageData.data[i * 4 + 1] = gray
        imageData.data[i * 4 + 2] = gray
        imageData.data[i * 4 + 3] = 255
      }
    } else if (channels === 3) {
      for (let i = 0; i < width * height; i++) {
        imageData.data[i * 4] = rawData[i * 3] || 0
        imageData.data[i * 4 + 1] = rawData[i * 3 + 1] || 0
        imageData.data[i * 4 + 2] = rawData[i * 3 + 2] || 0
        imageData.data[i * 4 + 3] = 255
      }
    } else if (channels === 4) {
      if (colorSpace?.includes("CMYK")) {
        for (let i = 0; i < width * height; i++) {
          const c = (rawData[i * 4] || 0) / 255
          const m = (rawData[i * 4 + 1] || 0) / 255
          const y = (rawData[i * 4 + 2] || 0) / 255
          const k = (rawData[i * 4 + 3] || 0) / 255

          imageData.data[i * 4] = Math.round(255 * (1 - c) * (1 - k))
          imageData.data[i * 4 + 1] = Math.round(255 * (1 - m) * (1 - k))
          imageData.data[i * 4 + 2] = Math.round(255 * (1 - y) * (1 - k))
          imageData.data[i * 4 + 3] = 255
        }
      } else {
        for (let i = 0; i < Math.min(rawData.length, imageData.data.length); i++) {
          imageData.data[i] = rawData[i] || 0
        }
      }
    }

    ctx.putImageData(imageData, 0, 0)
    const pngBuffer = canvas.toBuffer("image/png")
    return pngBuffer
  } catch (error) {
    return null
  }
}

function detectImageFormat(data: Uint8Array | Buffer): string | null {
  const buffer = Buffer.isBuffer(data) ? data : Buffer.from(data)

  if (buffer.length < 4) {
    return null
  }

  if (buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff) {
    return "jpg"
  }
  if (buffer[0] === 0x89 && buffer[1] === 0x50 && buffer[2] === 0x4e && buffer[3] === 0x47) {
    return "png"
  }
  if (buffer[0] === 0x47 && buffer[1] === 0x49 && buffer[2] === 0x46) {
    return "gif"
  }
  if (buffer[0] === 0x42 && buffer[1] === 0x4d) {
    return "bmp"
  }
  if (
    buffer.length >= 12 &&
    buffer[0] === 0x52 && buffer[1] === 0x49 && buffer[2] === 0x46 && buffer[3] === 0x46 &&
    buffer[8] === 0x57 && buffer[9] === 0x45 && buffer[10] === 0x42 && buffer[11] === 0x50
  ) {
    return "webp"
  }

  return null
}

function isValidJPEG(data: Uint8Array | Buffer): boolean {
  const buffer = Buffer.isBuffer(data) ? data : Buffer.from(data)
  
  if (buffer.length < 10) {
    return false
  }

  if (buffer[0] !== 0xff || buffer[1] !== 0xd8 || buffer[2] !== 0xff) {
    return false
  }

  for (let i = buffer.length - 2; i >= Math.max(0, buffer.length - 100); i--) {
    if (buffer[i] === 0xff && buffer[i + 1] === 0xd9) {
      return true
    }
  }

  return false
}

function extractImagesByPattern(buffer: Buffer): Array<{ data: Buffer; ext: string }> {
  const images: Array<{ data: Buffer; ext: string }> = []
  const maxImages = 100
  const minImageSize = 1000
  const maxSearchBytes = Math.min(buffer.length, 50 * 1024 * 1024)

  let i = 0
  while (i < maxSearchBytes - 3 && images.length < maxImages) {
    if (buffer[i] === 0xff && buffer[i + 1] === 0xd8 && buffer[i + 2] === 0xff) {
      let foundEnd = false
      let j = i + 3
      const maxSearch = Math.min(i + 10 * 1024 * 1024, buffer.length - 1)
      
      while (j < maxSearch) {
        if (buffer[j] === 0xff && buffer[j + 1] === 0xd9) {
          const imageData = buffer.slice(i, j + 2)
          if (imageData.length > minImageSize && isValidJPEG(imageData)) {
            images.push({ data: imageData, ext: "jpg" })
          }
          i = j + 2
          foundEnd = true
          break
        }
        j++
      }
      
      if (!foundEnd) {
        i++
      }
    } else {
      i++
    }
  }

  i = 0
  while (i < maxSearchBytes - 8 && images.length < maxImages) {
    if (buffer[i] === 0x89 && buffer[i + 1] === 0x50 && buffer[i + 2] === 0x4e && buffer[i + 3] === 0x47) {
      let foundEnd = false
      let j = i + 8
      const maxSearch = Math.min(i + 10 * 1024 * 1024, buffer.length - 8)
      
      while (j < maxSearch) {
        if (
          buffer[j] === 0x49 && buffer[j + 1] === 0x45 && buffer[j + 2] === 0x4e && buffer[j + 3] === 0x44 &&
          buffer[j + 4] === 0xae && buffer[j + 5] === 0x42 && buffer[j + 6] === 0x60 && buffer[j + 7] === 0x82
        ) {
          const imageData = buffer.slice(i, j + 8)
          if (imageData.length > minImageSize) {
            images.push({ data: imageData, ext: "png" })
          }
          i = j + 8
          foundEnd = true
          break
        }
        j++
      }
      
      if (!foundEnd) {
        i++
      }
    } else {
      i++
    }
  }

  return images
}

function simpleHash(buffer: Buffer): string {
  let hash = 0
  const step = Math.max(1, Math.floor(buffer.length / 100))
  
  for (let i = 0; i < buffer.length; i += step) {
    hash = ((hash << 5) - hash) + buffer[i]
    hash = hash & hash
  }
  
  return `${hash}_${buffer.length}`
}