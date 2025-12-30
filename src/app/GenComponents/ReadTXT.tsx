"use client";
import React, { useContext, useState } from "react";
import pdfToText from "react-pdftotext";
import { ReadContext } from "./ReadContext";
import { FileUpload } from "@/components/ui/file-upload";
import axios from "axios";
import { Button } from "@/components/ui/button";
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
import { getFromStorage } from "@/Cookiesmv";

function ReadTXT() {
  const [extractedText, setExtractedText] = useState<string | null>(null);
  const [extractedImages, setExtractedImages] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { setUserData } = useContext(ReadContext);

  const generateStructuredPrompt = (cvText: string) => {
    return `You are an advanced AI specialized in CV analysis and structured data extraction. Analyze the given CV text and return the extracted details strictly in JSON format.

    ### 🔹 **EXTRACTION GUIDELINES**  
    - **Maintain consistency**: Use standard formats for dates, locations, and names.  
    - **Ensure accuracy**: Do not misclassify information (e.g., names as skills).  
    - **No missing fields**: If data is unavailable, use "N/A".  
    - **if their is no data just return data as empty
    - **Structured JSON output**: Keep array structures even for single values.  

    ### 🔹 **DATA EXTRACTION RULES**  

    **📌 Personal Information**  
    - Extract: Full name, email, phone, location, LinkedIn, personal website, GitHub, and portfolio link.  
    - If multiple names are found, prioritize the one with contact details.  

    **📌 Professional Summary**  
    - Extract a short summary (if available) highlighting key strengths, experience, or career goals.  

    **📌 Experience**  
    - Extract: Job title, company, location, start & end dates, and key responsibilities.  
    - Ensure date format is **YYYY-MM** (or "Present" if ongoing).  

    **📌 Education**  
    - Extract: Degree, institution, location, graduation year, and relevant courses.  

    **📌 Projects**  
    - Extract: Title, description, technologies used, GitHub link, and role played.  

    **📌 Skills & Tools**  
    - **Technical Skills**: Programming languages, frameworks, and libraries.  
    - **Soft Skills**: Communication, teamwork, leadership, etc.  
    - **Languages**: Spoken and written languages.  
    - **Tools**: IDEs, databases, version control, DevOps tools, and design software.  

    **📌 Certifications**  
    - Extract: Certification name, issuer, and year.  

    **📌 Publications**  
    - Extract: Title, type (Research Paper, Blog, Book), year, and link.  

    **📌 Awards & Recognitions**  
    - Extract: Name, year, and brief description of awards, competitions, or honors.  

    **📌 Volunteer Experience**  
    - Extract: Role, organization, start & end dates, and description.  

    **📌 Online Presence**  
    - Extract: Twitter, GitHub, Stack Overflow, Medium, or relevant profiles.  

    **📌 Hobbies & Interests**  
    - Extract personal interests (e.g., sports, music, travel, coding hobbies).

    **📌 Job Search Assistance**  
    - Suggest a job title that best matches the profile.
    - Provide relevant job recommendations and alternatives.

    
    ### 🔹 **EXPECTED JSON OUTPUT FORMAT**  
    \`\`\`json
    {
      "personalInfo": {
        "fullName": "",
        "email": "",
        "phone": "",
        "location": "",
        "city": "",
        "linkedin": "",
        "website": "",
        "github": "",
        "portfolio": ""
      },
      "professionalSummary": "",
      "skills": {
         "technical": [],
         "soft": [],
         "languages": []
      },
      "tools": [],
      "experience": [
        {
          "title": "",
          "company": "",
          "location": "",
          "startDate": "",
          "endDate": "",
          "responsibilities": []
        }
      ],
      "education": [
        {
          "degree": "",
          "institution": "",
          "location": "",
          "graduationYear": "",
          "relevantCourses": []
        }
      ],
      "certifications": [
        {
          "name": "",
          "issuer": "",
          "year": ""
        }
      ],
      "publications": [
        {
          "title": "",
          "publicationType": "",
          "year": "",
          "link": ""
        }
      ],
      "awards": [
        {
          "name": "",
          "year": "",
          "description": ""
        }
      ],
      "volunteerExperience": [
        {
          "role": "",
          "organization": "",
          "startDate": "",
          "endDate": "",
          "description": ""
        }
      ],
      "projects": [
        {
          "title": "",
          "description": "",
          "technologiesUsed": [],
          "github": "",
          "role": ""
        }
      ],
      "onlinePresence": {
        "twitter": "",
        "stackOverflow": "",
        "medium": ""
      },
      "hobbies": [],
      "jobSearchTitle" : ""
      "jobSearchSuggestions" : []
      
    }
    \`\`\`

    **Return only the structured JSON output.**  

    **CV Text:**  
    ${cvText}
  `;
  };

  const handleFileUpload = async (files: File[]) => {
    const file = files[0];
    if (!file) return;

    setIsLoading(true);
    setError(null);
    setExtractedText(null);
    setExtractedImages([]);

    try {
      const text = await pdfToText(file);
      
      const formData = new FormData();
      formData.append('file', file);

      // Extract images
      const imageResponse = await axios.post("http://localhost:8000/extract-images/", formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      setExtractedText(text);
      setExtractedImages(imageResponse.data.files || []);
      
      // Generate structured user data
      setUserData({
        text: generateStructuredPrompt(text) || "", 
        image: imageResponse?.data?.files || []
      });
      

      console.log("Extracted Text:", text);
      console.log("Extracted Images:", imageResponse.data.files);
    } catch (error: any) {
      setError(error.message || "An error occurred during PDF processing");
      console.error("PDF Processing Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      {/* <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="w-6 h-6" />
          Upload Resume
        </CardTitle>
        <CardDescription>
          Upload a PDF to extract text and images
        </CardDescription>
      </CardHeader> */}
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
      </CardContent>
    </Card>
  );
}

export default ReadTXT;