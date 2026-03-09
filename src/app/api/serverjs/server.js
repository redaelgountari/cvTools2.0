"use client";
import React, { useContext, useState } from "react";
import pdfToText from "react-pdftotext";
import { ReadContext } from "./ReadContext";
import { FileUpload } from "@/components/ui/file-upload";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { prompteCVAnalysis } from "../../Promptes/Aipromptes";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import {
  AlertCircle,
  FileText,
  Loader2,
  Upload
} from "lucide-react";
import { getFromStorage, saveImagesToMemory } from "@/Cookiesmv";

// PDF.js library (using the one bundled with browsers or a CDN version)
const loadPdfJs = async () => {
  if (typeof window !== 'undefined' && !window.pdfjsLib) {
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js';
    document.head.appendChild(script);

    await new Promise((resolve) => {
      script.onload = resolve;
    });
  }
  return (window as any).pdfjsLib;
};

function ReadTXT() {
  const [extractedText, setExtractedText] = useState < string | null > (null);
  const [extractedImages, setExtractedImages] = useState < string[] > ([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState < string | null > (null);
  const { setUserData, settings } = useContext(ReadContext);


  const extractImagesFromPDF = async (file: File): Promise<string[]> => {
    try {
      const pdfjsLib = await loadPdfJs();

      const arrayBuffer = await file.arrayBuffer();
      const typedArray = new Uint8Array(arrayBuffer);

      const loadingTask = pdfjsLib.getDocument({ data: typedArray });
      const pdfDoc = await loadingTask.promise;

      const extractedImageUrls: string[] = [];

      for (let pageNum = 1; pageNum <= pdfDoc.numPages; pageNum++) {
        const page = await pdfDoc.getPage(pageNum);
        const operatorList = await page.getOperatorList();

        for (let i = 0; i < operatorList.fnArray.length; i++) {
          if (operatorList.fnArray[i] === pdfjsLib.OPS.paintImageXObject ||
            operatorList.fnArray[i] === pdfjsLib.OPS.paintInlineImageXObject) {

            try {
              const imageName = operatorList.argsArray[i][0];

              const image = page.objs.get(imageName);

              await new Promise((resolve) => {
                if (image) {
                  resolve(image);
                } else {
                  page.objs.get(imageName, resolve);
                }
              }).then((img: any) => {
                if (img && img.data) {
                  const canvas = document.createElement('canvas');
                  canvas.width = img.width;
                  canvas.height = img.height;
                  const ctx = canvas.getContext('2d');

                  if (ctx) {
                    const imageData = ctx.createImageData(img.width, img.height);
                    const data = img.data;

                    // Handle different image types
                    if (img.kind === 1) { // Grayscale
                      for (let j = 0; j < data.length; j++) {
                        const idx = j * 4;
                        imageData.data[idx] = data[j];
                        imageData.data[idx + 1] = data[j];
                        imageData.data[idx + 2] = data[j];
                        imageData.data[idx + 3] = 255;
                      }
                    } else if (img.kind === 2) { // RGB
                      for (let j = 0, k = 0; j < data.length; j += 3, k += 4) {
                        imageData.data[k] = data[j];
                        imageData.data[k + 1] = data[j + 1];
                        imageData.data[k + 2] = data[j + 2];
                        imageData.data[k + 3] = 255;
                      }
                    } else { // RGBA
                      imageData.data.set(data);
                    }

                    ctx.putImageData(imageData, 0, 0);

                    // Convert canvas to base64 data URL
                    const dataUrl = canvas.toDataURL('image/png');
                    extractedImageUrls.push(dataUrl);
                  }
                }
              });

            } catch (imgError) {
              console.error(`Error extracting image on page ${pageNum}:`, imgError);
            }
          }
        }
      }

      return extractedImageUrls;

    } catch (error) {
      console.error("Error in extractImagesFromPDF:", error);
      throw error;
    }
  };

  const handleFileUpload = async (files: File[]) => {
    const file = files[0];
    if (!file) return;

    setIsLoading(true);
    setError(null);
    setExtractedText(null);
    setExtractedImages([]);

    try {
      // Extract text using react-pdftotext
      const text = await pdfToText(file);
      setExtractedText(text);

      // Extract images directly in the component
      const imageUrls = await extractImagesFromPDF(file);
      setExtractedImages(imageUrls);

      // Save images to memory
      if (imageUrls.length > 0) {
        const saveResult = await saveImagesToMemory(imageUrls, `pdf_images_${Date.now()}`, 7);

        if (saveResult.success) {
          console.log("Images saved successfully:", saveResult.data);
        } else {
          console.error("Failed to save images:", saveResult.error);
        }
      }
      console.log("imageUrls:", imageUrls)
      console.log("textdts:", text)
      // Update context with extracted data
      setUserData({
        text: text,
        image: imageUrls
      });

      console.log("Extracted Text:", text);
      console.log("Extracted Images:", imageUrls.length);

    } catch (error: any) {
      const errorMessage = error.message || "An error occurred during PDF processing";
      setError(errorMessage);
      console.error("PDF Processing Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardContent>
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
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg max-h-64 overflow-auto">
              <pre className="text-sm whitespace-pre-wrap">{extractedText.slice(0, 500)}...</pre>
            </div>
          </div>
        )}

        {extractedImages.length > 0 && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-4">Extracted Images ({extractedImages.length})</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {extractedImages.slice(0, 6).map((imgUrl, index) => (
                <div key={index} className="bg-gray-100 dark:bg-gray-800 p-2 rounded-lg">
                  <img
                    src={imgUrl}
                    alt={`Extracted ${index + 1}`}
                    className="w-full h-auto rounded"
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default ReadTXT;