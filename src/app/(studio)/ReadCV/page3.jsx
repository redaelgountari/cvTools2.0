"use client";

import React, { useState } from "react";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import { annotationPlugin } from "@react-pdf-viewer/core"; // ✅ built-in annotation plugin
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
// import "@react-pdf-viewer/annotation/lib/styles/index.css"; // Optional

export default function CVStudio() {
  const [fileUrl, setFileUrl] = useState(null);
  const annotationPluginInstance = annotationPlugin();

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file && file.type === "application/pdf") {
      const reader = new FileReader();
      reader.onload = (event) => setFileUrl(event.target.result);
      reader.readAsDataURL(file);
    } else {
      alert("Please upload a valid PDF file.");
    }
  };

  return (
    <div className="flex flex-col items-center p-6 space-y-6">
      <label className="bg-blue-600 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-blue-700 transition">
        Upload PDF CV
        <input
          type="file"
          accept="application/pdf"
          onChange={handleFileChange}
          className="hidden"
        />
      </label>

      {fileUrl && (
        <div className="w-full h-[85vh] border rounded-lg shadow-lg overflow-hidden">
          <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.16.105/build/pdf.worker.min.js">
            <Viewer fileUrl={fileUrl} plugins={[annotationPluginInstance]} />
          </Worker>
        </div>
      )}
    </div>
  );
}
