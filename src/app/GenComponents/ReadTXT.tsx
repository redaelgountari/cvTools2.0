"use client"
import { useContext, useState } from "react"
import pdfToText from "react-pdftotext"
import { ReadContext } from "./ReadContext";
import { normalizeResumeData } from "./Themes/dataNormalization";
import { prompteCVAnalysis } from "../Promptes/Aipromptes";
import { FileUpload } from "@/components/ui/file-upload"
import { Card, CardContent } from "@/components/ui/card"
import { AlertCircle, Loader2 } from "lucide-react"

function ReadTXT() {
  const [extractedText, setExtractedText] = useState<string | null>(null)
  const [extractedImages, setExtractedImages] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { setUserData, settings } = useContext(ReadContext)


  const handleFileUpload = async (files: File[]) => {
    const file = files[0]
    if (!file) return

    setIsLoading(true)
    setError(null)
    setExtractedText(null)
    setExtractedImages([])

    try {
      const text = await pdfToText(file)
      setExtractedText(text)

      const formData = new FormData()
      formData.append("file", file)

      const imageResponse = await fetch("/api/extract-images", {
        method: "POST",
        body: formData,
      })

      const imageData = await imageResponse.json()

      if (!imageResponse.ok) {
        throw new Error(imageData.error || "Failed to extract images")
      }

      const imageUrls = imageData.files?.map((file: { url: string }) => file.url) || []
      setExtractedImages(imageUrls)
      extractedImages


      setUserData(normalizeResumeData({
        text: text,
        image: imageUrls,
      }))

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "An error occurred during PDF processing"
      setError(errorMessage)
      console.error("[v0] PDF Processing Error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardContent className="pt-6">
        <div className="w-full border-gray-300 dark:border-gray-700 rounded-lg p-6">
          <FileUpload onChange={handleFileUpload} />
        </div>

        {isLoading && (
          <div className="flex items-center justify-center mt-4">
            <Loader2 className="mr-2 h-6 w-6 animate-spin" />
            <p>Processing PDF...</p>
          </div>
        )}

        {error && (
          <div className="mt-4 flex items-center text-red-500">
            <AlertCircle className="mr-2 h-6 w-6" />
            <p>{error}</p>
          </div>
        )}

        {extractedText && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-4">Extracted Text Preview</h3>
            <div className="bg-muted p-4 rounded-lg max-h-64 overflow-auto">
              <pre className="text-sm whitespace-pre-wrap">{extractedText.slice(0, 500)}...</pre>
            </div>
          </div>
        )}

        {extractedImages.length > 0 && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-4">Extracted Images ({extractedImages.length})</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {extractedImages.map((url, index) => (
                <div
                  key={index}
                  className="relative aspect-square overflow-hidden rounded-lg border border-border bg-muted"
                >
                  <img
                    src={url || "/placeholder.svg"}
                    alt={`Extracted image ${index + 1}`}
                    className="h-full w-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default ReadTXT
