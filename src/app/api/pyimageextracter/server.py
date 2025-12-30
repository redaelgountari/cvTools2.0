from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
import fitz 
import os
import shutil
import uuid
import asyncio
import cloudinary
import cloudinary.uploader
from dotenv import load_dotenv
import time
from datetime import datetime

load_dotenv()

cloudinary.config(
    cloud_name=os.getenv("CLOUDINARY_CLOUD_NAME"),
    api_key=os.getenv("CLOUDINARY_API_KEY"),
    api_secret=os.getenv("CLOUDINARY_API_SECRET"),
)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

TEMP_FOLDER = "temp"
OUTPUT_FOLDER = "output_images"
os.makedirs(TEMP_FOLDER, exist_ok=True)
os.makedirs(OUTPUT_FOLDER, exist_ok=True)

@app.post("/extract-images/")
async def extract_images(file: UploadFile = File(...)):
    if not file.filename or not file.filename.lower().endswith('.pdf'):
        raise HTTPException(status_code=400, detail="Invalid file type. Please upload a PDF.")

    unique_filename = f"{uuid.uuid4()}_{file.filename}"
    pdf_path = os.path.join(TEMP_FOLDER, unique_filename)

    try:
        # Save uploaded file
        with open(pdf_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)

        # Extract images from PDF
        doc = fitz.open(pdf_path)
        extracted_files = []

        for page_number in range(len(doc)):
            page = doc[page_number]
            image_list = page.get_images(full=True)
            
            for img_index, img in enumerate(image_list):
                xref = img[0]
                base_image = doc.extract_image(xref)
                image_bytes = base_image["image"]
                image_ext = base_image["ext"]
                
                image_filename = f"page_{page_number + 1}_img_{img_index + 1}_{uuid.uuid4()}.{image_ext}"
                full_image_path = os.path.join(OUTPUT_FOLDER, image_filename)

                # Save image to local storage
                with open(full_image_path, "wb") as img_file:
                    img_file.write(image_bytes)

                # Debug: Check if image was saved successfully
                if os.path.exists(full_image_path):
                    file_size = os.path.getsize(full_image_path)
                    print(f"✅ Image saved successfully: {image_filename} (Size: {file_size} bytes)")
                else:
                    print(f"❌ Failed to save image: {image_filename}")
                    continue

                extracted_files.append(image_filename)

        doc.close()
        
        # Debug: Summary of extraction results
        print(f"📊 Extraction Summary:")
        print(f"   - Total images extracted: {len(extracted_files)}")
        print(f"   - Output folder: {OUTPUT_FOLDER}")
        
        return {"message": "Images extracted successfully!", "files": extracted_files}

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error processing PDF: {str(e)}")
    finally:
        # Clean up temporary PDF file
        try:
            await asyncio.sleep(0.1)
            if os.path.exists(pdf_path):
                os.unlink(pdf_path)
        except PermissionError:
            print(f"Could not delete temporary file: {pdf_path}")
        except Exception as e:
            print(f"Error deleting temporary file: {e}")

@app.get("/extract-images/{filename}")
async def get_image(filename: str):
    file_path = os.path.join(OUTPUT_FOLDER, filename)
    
    # Debug: Check file existence and properties
    print(f"🔍 Looking for image: {filename}")
    print(f"   - Full path: {file_path}")
    
    if not os.path.exists(file_path):
        print(f"❌ Image not found: {filename}")
        raise HTTPException(status_code=404, detail="Image not found")
    
    # Debug: File found, show details
    file_size = os.path.getsize(file_path)
    print(f"✅ Image found: {filename} (Size: {file_size} bytes)")
    
    try:
        # # Debug: Show current time before upload
        # current_time = datetime.utcnow()
        # print(f"🕐 Current UTC time: {current_time}")
        
        # Upload to Cloudinary with explicit timestamp
        print(f"☁️ Uploading to Cloudinary: {filename}")
        upload_result = cloudinary.uploader.upload(file_path)
        # cloudinary.uploader.upload("https://res.cloudinary.com/demo/image/upload/getting-started/shoes.jpg",
        #                                    public_id="shoes")
        
        # Debug: Cloudinary upload success
        print(f"✅ Cloudinary upload successful:")
        print(f"   - Public ID: {upload_result.get('public_id', 'N/A')}")
        print(f"   - URL: {upload_result.get('secure_url', 'N/A')}")
        print(f"   - Format: {upload_result.get('format', 'N/A')}")
        print(f"   - Size: {upload_result.get('bytes', 'N/A')} bytes")
        
        # Return the image file
        return FileResponse(file_path)
        
    except Exception as e:
        print(f"❌ Cloudinary upload failed: {str(e)}")
        print(f"❌99 : {file_path}")
        
        # If Cloudinary fails, still return the local file
        print(f"📁 Returning local file instead")
        return FileResponse(file_path)

@app.on_event("startup")
async def startup_event():
    """Create necessary directories on startup"""
    os.makedirs(TEMP_FOLDER, exist_ok=True)
    os.makedirs(OUTPUT_FOLDER, exist_ok=True)
    
    # Debug: Show startup information
    print(f"🚀 FastAPI PDF Image Extractor Started")
    print(f"   - Temp folder: {os.path.abspath(TEMP_FOLDER)}")
    print(f"   - Output folder: {os.path.abspath(OUTPUT_FOLDER)}")
    print(f"   - Cloudinary configured: {'✅' if os.getenv('CLOUDINARY_CLOUD_NAME') else '❌'}")

# Debug endpoint to check stored images
@app.get("/debug/images")
async def debug_images():
    """Debug endpoint to list all stored images"""
    try:
        if not os.path.exists(OUTPUT_FOLDER):
            return {"message": "Output folder does not exist", "images": []}
        
        images = []
        for filename in os.listdir(OUTPUT_FOLDER):
            file_path = os.path.join(OUTPUT_FOLDER, filename)
            if os.path.isfile(file_path):
                file_size = os.path.getsize(file_path)
                images.append({
                    "filename": filename,
                    "size_bytes": file_size,
                    "path": file_path
                })
        
        return {
            "message": f"Found {len(images)} stored images",
            "output_folder": os.path.abspath(OUTPUT_FOLDER),
            "images": images
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error listing images: {str(e)}")