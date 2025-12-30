import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Sparkles, FileText } from "lucide-react";
import axios from "axios";
import React, { useState } from "react";
import { promptePromptEnhancement, prompteTemplate } from "../Promptes/Aipromptes";

export default function AIcvgenerated() {
  const [prompte, setPrompte] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isTemplateLoading, setIsTemplateLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"enhance" | "template">("enhance");

  const enhanceAipropte = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompte.trim()) {
      setError("Please enter a job description");
      return;
    }
    
    setIsLoading(true);
    setError(null);
    
    try {
      const { data } = await axios.post("/api/gemini", { 
        userData: promptePromptEnhancement(prompte) 
      });
      setPrompte(data.text);
    } catch (err) {
      console.error("Error:", err);
      setError("Failed to enhance prompt. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const Generatetempalte = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompte.trim()) {
      setError("Please enter a job description");
      return;
    }
    
    setIsTemplateLoading(true);
    setError(null);
    
    try {
      const { data } = await axios.post("/api/gemini", { 
        userData: prompteTemplate(prompte)
      });
      // setPrompte(data.text);
      console.log("template :", data);
    } catch (err) {
      console.error("Error:", err);
      setError("Failed to generate template. Please try again.");
    } finally {
      setIsTemplateLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4 space-y-6">
      <Card className="shadow-lg border-0">
        <CardHeader className="pb-0">
          <CardTitle className="text-3xl font-bold text-gray-800 flex items-center gap-2">
            <Sparkles className="text-blue-500" />
            AI Resume Generator
          </CardTitle>
          <CardDescription className="text-gray-600">
            Optimize your resume for any job description with AI
          </CardDescription>
        </CardHeader>
        
        <CardContent className="pt-6">
          <div className="flex border-b mb-6">
            <button
              className={`px-4 py-2 font-medium ${activeTab === "enhance" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-500"}`}
              onClick={() => setActiveTab("enhance")}
            >
              <Sparkles className="inline mr-2 h-4 w-4" />
              Enhance Resume
            </button>
            <button
              className={`px-4 py-2 font-medium ${activeTab === "template" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-500"}`}
              onClick={() => setActiveTab("template")}
            >
              <FileText className="inline mr-2 h-4 w-4" />
              Generate Template
            </button>
          </div>
          
          <form onSubmit={activeTab === "enhance" ? enhanceAipropte : Generatetempalte} className="space-y-6">
            <div className="space-y-3">
              <label htmlFor="job-description" className="block text-sm font-medium text-gray-700">
                Target Job Description
                <span className="text-red-500">*</span>
              </label>
              <Textarea
                id="job-description"
                value={prompte}
                onChange={(e) => setPrompte(e.target.value)}
                placeholder="Paste the job description you're applying for..."
                className="min-h-[200px] text-base p-4 border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              {error && <p className="text-sm text-red-500 mt-2">{error}</p>}
            </div>
            
            <div className="flex justify-end gap-3">
              <Button 
                type="button"
                variant="outline"
                onClick={() => setPrompte("")}
                className="border-gray-300"
              >
                Clear
              </Button>
              
              {activeTab === "enhance" ? (
                <Button 
                  type="submit" 
                  disabled={isLoading}
                  className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white shadow-md"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Optimizing...
                    </>
                  ) : (
                    <>
                      <Sparkles className="mr-2 h-4 w-4" />
                      Enhance My Resume
                    </>
                  )}
                </Button>
              ) : (
                <Button 
                  type="submit" 
                  disabled={isTemplateLoading}
                  className="bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-700 hover:to-purple-600 text-white shadow-md"
                >
                  {isTemplateLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <FileText className="mr-2 h-4 w-4" />
                      Generate AI Template
                    </>
                  )}
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>
      
      <div className="text-center text-sm text-gray-500">
        <p>Tip: Copy the exact job description for best optimization results</p>
      </div>
    </div>
  );
}