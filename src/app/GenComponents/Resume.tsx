"use client";

import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { getFromStorage } from '@/Cookiesmv';
import { ReadContext } from './ReadContext';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import dynamic from "next/dynamic";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter
} from '@/components/ui/card';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import {
  Loader2,
  CheckCircle,
  Download,
  FileCode,
  ChevronLeft,
  ChevronRight,
  AlertCircle,
  BarChart as ChartBar
} from 'lucide-react';
import Theme1 from './Themes/Theme1';
import Theme2 from './Themes/Theme2';
import Theme3 from './Themes/Theme3';
import Theme4 from './Themes/Theme4';
import Theme5 from './Themes/Theme5';
import Theme6 from './Themes/Theme6';
import Theme7 from './Themes/Theme7';
import Theme8 from './Themes/Theme8';
import Theme9 from './Themes/Theme9';
import Theme10 from './Themes/Theme10';
import Theme11 from './Themes/Theme11';
import { AlertDialogCancel, AlertDialogTrigger } from '@radix-ui/react-alert-dialog';
import MatchAnalysisStats from './MatchAnalysisStats';
import { ColorPicker } from './ColorPicker';
import { DEFAULT_THEME_COLORS } from './Themes/themeDefaults';

export default function Resume() {
  // Types
  interface PersonalInfo {
    fullName: string;
    email: string;
    phone: string;
    location: string;
    linkedin: string;
  }

  interface Skills {
    technical: string[];
    soft: string[];
    languages: string[];
  }

  interface Experience {
    title: string;
    company: string;
    location: string;
    startDate: string;
    endDate: string;
    responsibilities: string[];
  }

  interface Education {
    degree: string;
    institution: string;
    location: string;
    graduationYear: string;
    relevantCourses: string[];
  }

  interface Certification {
    name: string;
    issuer: string;
    year: string;
  }

  interface Resume {
    personalInfo: PersonalInfo;
    professionalSummary: string;
    skills: Skills;
    experience: Experience[];
    education: Education[];
    certifications: Certification[];
  }

  interface MatchData {
    matchScore: number;
    skillsMatch: number;
    experienceMatch: number;
    educationMatch: number;
    skillsJustification?: string;
    experienceJustification?: string;
    educationJustification?: string;
  }

  // Context and state
  const { AnlysedCV, userData, settings: contextSettings, setSettings } = useContext(ReadContext);
  const [resumeData, setResumeData] = useState<Resume | null>(null);
  const [rawResponse, setRawResponse] = useState<string | null>(null);
  const [jobAnnouncement, setJobAnnouncement] = useState('');
  const [activeTheme, setActiveTheme] = useState('theme2');
  const [showJobDescription, setShowJobDescription] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [userImage, setUserImage] = useState('');

  // UI states
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [exportLoading, setExportLoading] = useState(false);
  const [matchData, setMatchData] = useState<MatchData | null>(null);
  const [showLowMatchWarning, setShowLowMatchWarning] = useState(false);
  const [showStatsModal, setShowStatsModal] = useState(false);
  const [pendingResumeData, setPendingResumeData] = useState<Resume | null>(null);
  const [themeColors, setThemeColors] = useState(DEFAULT_THEME_COLORS[activeTheme] || {});

  // Load data from context or storage
  useEffect(() => {
    const loadResumeData = async () => {
      try {
        if (AnlysedCV) {
          console.log("Loading data from context:", AnlysedCV);
          setRawResponse(typeof AnlysedCV === 'string' ? AnlysedCV : JSON.stringify(AnlysedCV));
          const parsedData = typeof AnlysedCV === 'string' ? JSON.parse(AnlysedCV) : AnlysedCV;
          setResumeData(parsedData);
        } else {
          const storedData = await getFromStorage('userData');
          if (storedData) {
            console.log("Loading data from storage:", storedData);
            setRawResponse(JSON.stringify(storedData));
            setResumeData(storedData as Resume);
          }
        }

        // Set user image from userData or storage
        if (userData && userData.image && userData.image[0]) {
          setUserImage(userData.image[0]);
        } else {
          const storedImage = await getFromStorage('userImage');
          if (storedImage && storedImage[0]) {
            setUserImage(storedImage[0]);
          }
        }
      } catch (error) {
        console.error("Error loading resume data:", error);
        setError("Failed to load resume data. Please try again.");
      }
    };

    loadResumeData();
  }, [AnlysedCV, userData]);

  useEffect(() => {
    const loadSettings = async () => {
      if (!contextSettings) {
        const savedSettings = await getFromStorage('Settings');
        if (savedSettings) {
          setSettings(savedSettings);
        }
      }
    };

    loadSettings();
    console.log("Settings:", contextSettings);
  }, [contextSettings, setSettings]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Update colors when theme changes
  useEffect(() => {
    setThemeColors(DEFAULT_THEME_COLORS[activeTheme] || {});
  }, [activeTheme]);

  const handleColorChange = (key: string, value: string) => {
    setThemeColors(prev => ({
      ...prev,
      [key]: value
    }));
  };

  // Dynamic import of PDFViewer with loading skeleton
  const PDFViewer = dynamic(() => import("@/app/GenComponents/PDFViewer"), {
    loading: () => (
      <div className="w-full h-[700px] bg-background rounded-lg border border-input p-6 overflow-hidden">
        <div className="space-y-4 animate-pulse">
          <div className="flex items-center justify-between">
            <div className="h-6 bg-muted rounded w-2/5"></div>
            <div className="h-6 bg-muted rounded w-24"></div>
          </div>
          <div className="flex space-x-2">
            <div className="h-8 bg-muted rounded w-10"></div>
            <div className="h-8 bg-muted rounded w-10"></div>
            <div className="h-8 bg-muted rounded w-24"></div>
            <div className="h-8 bg-muted rounded w-16"></div>
          </div>
          <div className="pt-4 space-y-3">
            {Array(15).fill(0).map((_, i) => (
              <div key={i} className="h-4 bg-muted rounded w-full" style={{ opacity: 1 - (i * 0.03) }}></div>
            ))}
            <div className="h-40 bg-muted rounded w-full mt-6"></div>
            {Array(8).fill(0).map((_, i) => (
              <div key={i + 15} className="h-4 bg-muted rounded w-full" style={{ opacity: 0.9 - (i * 0.05) }}></div>
            ))}
          </div>
        </div>
        <div className="absolute bottom-6 left-0 right-0 flex justify-center animate-pulse">
          <div className="h-8 bg-muted rounded w-32"></div>
        </div>
      </div>
    ),
  });

  const generateResume = async () => {
    if (!rawResponse) {
      setError('Please provide your CV data first before generating a resume.');
      return;
    }
    if (!jobAnnouncement) {
      if (rawResponse) {
        try {
          // Reset to original CV if no job description
          const originalCV = JSON.parse(rawResponse);
          setResumeData(originalCV);
          setMatchData(null);
          setShowSuccess(true);
          setTimeout(() => setShowSuccess(false), 1500);
        } catch (e) {
          console.error("Failed to reset resume:", e);
        }
      }
      return;
    }

    setLoading(true);
    setError('');

    try {
      const prompt = `
You are a highly skilled professional resume writer and career analyst.

### TASK:
1. Analyze the match between the CANDIDATE PROFILE (User Data) and the TARGET JOB (Job Description).
2. ALWAYS generate a professional resume tailored to the job.
   - If the match is strong, emphasize relevant experience and skills.
   - If the match is weak, focus on transferable skills and soft skills. Do NOT lie, but present the candidate in the best possible light for this specific role.
3. Calculate honest match statistics.

### 1. CANDIDATE PROFILE (USER DATA):
${rawResponse}

${jobAnnouncement ? `### 2. TARGET JOB DESCRIPTION:\n${jobAnnouncement}\n` : ''}

### CRITICAL RULES (VIOLATION = FAILURE):

**A. MATCH ANALYSIS (HONESTY IS PARAMOUNT):**
- Evaluate the match honestly.
- If the candidate is a "Software Engineer" and the job is "Nurse", the Match Score should be low, but you MUST still generate the best possible resume (highlighting attention to detail, quick learning, etc.).

**B. PERSONAL INFORMATION (STRICT PRESERVATION):**
- **You must copy the following fields EXACTLY from the CANDIDATE PROFILE:**
  - Full Name
  - Email
  - Phone Number
  - Location/Address
  - LinkedIn/Website Links
- **DO NOT** change, "optimize", or "correct" the contact details.

**C. RESUME CONTENT:**
- **Tailoring:** Rewrite the Professional Summary and adapt the bullet points of Experience to align with the Job Description keywords where truthful.
- **Language:** Write the resume in **${contextSettings?.selectedLanguage || 'French'}**.

### OUTPUT FORMAT:

**IMPORTANT: Return ONLY valid JSON.**
The JSON structure must follow this format:

{
  "resume": {
    "personalInfo": {
      "fullName": "Exact string from input",
      "email": "Exact string from input",
      "phone": "Exact string from input",
      "location": "Exact string from input",
      "linkedin": "Exact string from input",
      ...
    },
    "professionalSummary": "REWRITTEN summary tailored to the target job...",
    "skills": { 
        "technical": ["Relevant skill 1", "Relevant skill 2"],
        ...
    },
    "experience": [ 
        {
            "title": "...",
            "company": "...",
            "responsibilities": ["REWRITTEN bullet point using keywords from job description...", "..."]
        }
    ],
    // ... rest of resume structure
  },
  "analysis": {
    "matchScore": 0,
    "skillsMatch": 0,
    "experienceMatch": 0,
    "educationMatch": 0,
    "skillsJustification": "Brief explanation...",
    "experienceJustification": "Brief explanation...",
    "educationJustification": "Brief explanation..."
  }
}
`;

      const { data } = await axios.post("/api/gemini", {
        userData: prompt,
        useCase: 'Analyse-resume',
        jobDescription: jobAnnouncement
      });

      // Enhanced cleaning to handle various markdown formats
      let cleanedData = data.text.trim();

      // Remove markdown code blocks with any language identifier
      cleanedData = cleanedData.replace(/```[\w]*\n?/g, '');
      cleanedData = cleanedData.replace(/```/g, '');

      // Remove any leading/trailing whitespace
      cleanedData = cleanedData.trim();

      // Find the first { and last } to extract just the JSON
      const firstBrace = cleanedData.indexOf('{');
      const lastBrace = cleanedData.lastIndexOf('}');

      if (firstBrace !== -1 && lastBrace !== -1) {
        cleanedData = cleanedData.substring(firstBrace, lastBrace + 1);
      }

      console.log("Raw response:", data.text);
      console.log("Cleaned data:", cleanedData);

      // Parse the JSON
      const parsedData = JSON.parse(cleanedData);

      // Extract resume and analysis data
      let newResumeData = parsedData.resume;
      const newAnalysisData = parsedData.analysis || null;

      // Handle flat structure or missing resume field
      if (!newResumeData && parsedData.personalInfo) {
        newResumeData = parsedData;
      }

      // If we still don't have a valid resume structure, throw or handle error
      if (!newResumeData || !newResumeData.personalInfo) {
        console.warn("AI did not return a valid resume structure. Using original data.");
        // Fallback: If no resume generated (rare with new prompt), keep using current but show analysis
        newResumeData = resumeData;
      }

      // CRITICAL FIX: Preserve the image from the original data
      // The AI often drops the 'image' field since it's not text. We must restore it.
      if (newResumeData) {
        if (resumeData && (resumeData as any).image) {
          (newResumeData as any).image = (resumeData as any).image;
        } else if (userImage) {
          (newResumeData as any).image = [userImage];
        }
      }

      if (newAnalysisData && newAnalysisData.matchScore < 50) {
        setMatchData(newAnalysisData);
        setPendingResumeData(newResumeData);
        setShowLowMatchWarning(true);
      } else {
        setResumeData(newResumeData);
        setMatchData(newAnalysisData);
        setShowSuccess(true);
        setTimeout(() => {
          setShowSuccess(false);
        }, 1500);
      }

      console.log("Parsed data:", parsedData);
      console.log("Selected language:", contextSettings?.selectedLanguage);

    } catch (error) {
      console.error('Error generating resume:', error);

      // More detailed error message
      let errorMessage = 'Failed to generate resume. ';
      if (error instanceof SyntaxError) {
        errorMessage += 'The AI returned invalid data. Please try again.';
      } else if (error instanceof Error) {
        errorMessage += error.message;
      } else {
        errorMessage += 'Please try again.';
      }

      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Handle export
  const handleExport = async (format) => {
    if (!resumeData) {
      setError('No resume content to export.');
      return;
    }

    setExportLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));

      if (format === 'pdf') {
        console.log('Exporting as PDF...');
      } else if (format === 'docx') {
        console.log('Exporting as Word...');
      }

      setError('');
    } catch (error) {
      setError('Export failed. Please try again.');
    } finally {
      setExportLoading(false);
    }
  };

  // Render the theme component based on activeTheme
  const renderThemeComponent = () => {
    if (!resumeData) return null;

    const themeProps = { userdata: resumeData, userImage, colors: themeColors };

    switch (activeTheme) {
      case 'theme1': return <Theme1 {...themeProps} />;
      case 'theme2': return <Theme2 {...themeProps} />;
      case 'theme3': return <Theme3 {...themeProps} />;
      case 'theme4': return <Theme4 {...themeProps} />;
      case 'theme5': return <Theme5 {...themeProps} />;
      case 'theme6': return <Theme6 {...themeProps} />;
      case 'theme7': return <Theme7 {...themeProps} />;
      case 'theme8': return <Theme8 {...themeProps} />;
      case 'theme9': return <Theme9 {...themeProps} />;
      case 'theme10': return <Theme10 {...themeProps} />;
      case 'theme11': return <Theme11 {...themeProps} />;
      default: return <Theme2 {...themeProps} />;
    }
  };

  const themes = [
    { id: 'theme1', name: 'Modern' },
    { id: 'theme2', name: 'Professional' },
    { id: 'theme3', name: 'Classic' },
    { id: 'theme4', name: 'Creative' },
    { id: 'theme5', name: 'Minimal' },
    { id: 'theme6', name: 'Elegant' },
    { id: 'theme7', name: 'Bold' },
    { id: 'theme8', name: 'Simple' },
    { id: 'theme9', name: 'Contemporary' },
    { id: 'theme10', name: 'Executive' },
    { id: 'theme11', name: 'Technical' },
  ];

  const [currentThemeIndex, setCurrentThemeIndex] = useState(1);

  const handlePrevTheme = () => {
    const newIndex = currentThemeIndex === 0 ? themes.length - 1 : currentThemeIndex - 1;
    setCurrentThemeIndex(newIndex);
    setActiveTheme(themes[newIndex].id);
  };

  const handleNextTheme = () => {
    const newIndex = currentThemeIndex === themes.length - 1 ? 0 : currentThemeIndex + 1;
    setCurrentThemeIndex(newIndex);
    setActiveTheme(themes[newIndex].id);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-3 sm:p-4 md:p-6 max-w-[1600px]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6">
          {/* Left Column - Controls */}
          <div className="lg:col-span-4 space-y-4 sm:space-y-6">
            {/* Resume Template Section */}
            <Card className="border-2 shadow-lg">
              <CardHeader className="pb-3 sm:pb-4 px-3 sm:px-6">
                <CardTitle className="text-base sm:text-lg md:text-xl">Resume Template</CardTitle>
                <CardDescription className="text-xs sm:text-sm">
                  Choose a professional template for your resume
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 sm:space-y-4 px-3 sm:px-6">
                {/* Theme Carousel */}
                <div className="flex items-center justify-between gap-1 sm:gap-2 md:gap-3">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={handlePrevTheme}
                    className="h-12 w-10 sm:h-16 sm:w-12 md:h-20 md:w-16 rounded-lg shrink-0 flex items-center justify-center"
                    aria-label="Previous theme"
                  >
                    <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6" />
                  </Button>

                  <div className="flex-1 flex items-center justify-center gap-1 sm:gap-2 md:gap-3 overflow-hidden">
                    {[currentThemeIndex - 1, currentThemeIndex, currentThemeIndex + 1].map((index, i) => {
                      const actualIndex = ((index % themes.length) + themes.length) % themes.length;
                      const theme = themes[actualIndex];
                      const isActive = i === 1;

                      return (
                        <Card
                          key={`${theme.id}-${i}`}
                          className={`cursor-pointer transition-all duration-300 overflow-hidden ${isActive
                            ? 'ring-2 ring-primary scale-100 opacity-100'
                            : 'scale-75 sm:scale-90 opacity-30 sm:opacity-40'
                            } ${i === 0 || i === 2 ? 'hidden xs:block' : ''}`}
                          onClick={() => {
                            setCurrentThemeIndex(actualIndex);
                            setActiveTheme(theme.id);
                          }}
                        >
                          <CardContent className="p-0">
                            <div className={`relative ${isActive
                              ? 'w-24 h-32 sm:w-28 sm:h-36 md:w-32 md:h-40 lg:w-36 lg:h-48'
                              : 'w-20 h-28 sm:w-24 sm:h-32 md:w-28 md:h-36'
                              }`}>
                              {/* Mock Resume Preview */}
                              <div className="absolute inset-0 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 p-1.5 sm:p-2 md:p-3">
                                {/* Header */}
                                <div className="space-y-0.5 sm:space-y-1">
                                  <div className="h-1 sm:h-1.5 md:h-2 bg-primary/80 rounded w-3/4"></div>
                                  <div className="h-0.5 sm:h-1 md:h-1.5 bg-primary/40 rounded w-1/2"></div>
                                </div>
                                {/* Content Lines */}
                                <div className="mt-1.5 sm:mt-2 md:mt-3 space-y-0.5 sm:space-y-1">
                                  <div className="h-0.5 bg-slate-300 dark:bg-slate-600 rounded w-full"></div>
                                  <div className="h-0.5 bg-slate-300 dark:bg-slate-600 rounded w-5/6"></div>
                                  <div className="h-0.5 bg-slate-300 dark:bg-slate-600 rounded w-4/5"></div>
                                  <div className="h-0.5 bg-slate-300 dark:bg-slate-600 rounded w-full"></div>
                                  <div className="h-0.5 bg-slate-300 dark:bg-slate-600 rounded w-3/4"></div>
                                </div>
                              </div>
                              {/* Theme Name Overlay */}
                              <div className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t ${isActive
                                ? 'from-primary/90 to-transparent'
                                : 'from-slate-900/60 to-transparent'
                                } p-1 sm:p-1.5 md:p-2`}>
                                <span className="text-[7px] sm:text-[9px] md:text-[10px] font-semibold text-white block text-center leading-tight">
                                  {theme.name}
                                </span>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>

                  <Button
                    variant="outline"
                    size="icon"
                    onClick={handleNextTheme}
                    className="h-12 w-10 sm:h-16 sm:w-12 md:h-20 md:w-16 rounded-lg shrink-0 flex items-center justify-center"
                    aria-label="Next theme"
                  >
                    <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6" />
                  </Button>
                </div>

                {/* All Themes Grid - Fully Responsive */}
                <div className="pt-3 sm:pt-4 border-t">
                  <h3 className="text-xs sm:text-sm font-medium mb-2 sm:mb-3 text-slate-700 dark:text-slate-300">
                    All Templates
                  </h3>
                  <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-1.5 sm:gap-2 md:gap-3">
                    {themes.map((theme, index) => (
                      <Card
                        key={theme.id}
                        className={`cursor-pointer transition-all duration-200 overflow-hidden hover:ring-2 hover:ring-primary/50 hover:scale-105 ${activeTheme === theme.id ? 'ring-2 ring-primary scale-105' : ''
                          }`}
                        onClick={() => {
                          setCurrentThemeIndex(index);
                          setActiveTheme(theme.id);
                        }}
                      >
                        <CardContent className="p-0">
                          <div className="relative w-full aspect-[3/4]">
                            {/* Mock Resume Preview */}
                            <div className="absolute inset-0 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 p-1 sm:p-1.5 md:p-2">
                              {/* Header */}
                              <div className="space-y-0.5">
                                <div className="h-0.5 sm:h-1 md:h-1.5 bg-primary/80 rounded w-3/4"></div>
                                <div className="h-0.5 sm:h-0.5 md:h-1 bg-primary/40 rounded w-1/2"></div>
                              </div>
                              {/* Content Lines */}
                              <div className="mt-1 sm:mt-1.5 md:mt-2 space-y-0.5">
                                <div className="h-0.5 bg-slate-300 dark:bg-slate-600 rounded w-full"></div>
                                <div className="h-0.5 bg-slate-300 dark:bg-slate-600 rounded w-5/6"></div>
                                <div className="h-0.5 bg-slate-300 dark:bg-slate-600 rounded w-4/5"></div>
                                <div className="h-0.5 bg-slate-300 dark:bg-slate-600 rounded w-full"></div>
                                <div className="h-0.5 bg-slate-300 dark:bg-slate-600 rounded w-3/4"></div>
                              </div>
                            </div>
                            {/* Theme Name Overlay */}
                            <div className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t ${activeTheme === theme.id
                              ? 'from-primary/90 to-transparent'
                              : 'from-slate-900/60 to-transparent'
                              } p-0.5 sm:p-1 md:p-1.5`}>
                              <span className="text-[7px] sm:text-[8px] md:text-[9px] font-semibold text-white block text-center leading-tight">
                                {theme.name}
                              </span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>

                {/* Selected Theme Info */}
                <div className="pt-3 sm:pt-4 border-t">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300">
                        Selected Template:
                      </p>
                      <p className="text-sm sm:text-base md:text-lg font-bold text-primary">
                        {themes[currentThemeIndex].name}
                      </p>
                    </div>
                    <Button className="text-xs sm:text-sm px-3 sm:px-4 py-1.5 sm:py-2">
                      Use Template
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Target Job Description Section */}
            <Card className="border-2">
              <CardHeader className="pb-3 sm:pb-4">
                <div className="flex flex-col sm:flex-row items-start justify-between gap-3 sm:gap-0">
                  <div className="flex-1">
                    <CardTitle className="text-base sm:text-lg">Target Job Description</CardTitle>
                    <CardDescription className="text-xs sm:text-sm mt-1">
                      Add job details to tailor your resume
                    </CardDescription>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="job-desc-toggle"
                      checked={showJobDescription}
                      onCheckedChange={setShowJobDescription}
                    />
                    <Label htmlFor="job-desc-toggle" className="text-xs sm:text-sm font-medium cursor-pointer">
                      Enable
                    </Label>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {showJobDescription ? (
                  <div className="space-y-2 sm:space-y-3">
                    <Textarea
                      placeholder="Paste the job description here..."
                      className="min-h-[150px] sm:min-h-[180px] text-xs sm:text-sm"
                      value={jobAnnouncement}
                      onChange={(e) => setJobAnnouncement(e.target.value)}
                    />
                    <p className="text-[10px] sm:text-xs text-muted-foreground">
                      Helps optimize your resume for ATS systems
                    </p>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-[150px] sm:h-[180px] border-2 border-dashed rounded-lg p-4 bg-muted/20">
                    <p className="text-center text-xs sm:text-sm text-muted-foreground mb-3">
                      Enable to create a tailored resume
                    </p>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setShowJobDescription(true)}
                    >
                      Add Job Description
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Generate Button */}
            <Button
              className="w-full h-11 sm:h-12 text-sm sm:text-base font-semibold"
              onClick={generateResume}
              disabled={loading || !rawResponse}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 sm:h-5 sm:w-5 animate-spin" />
                  Generating...
                </>
              ) : (
                'Generate Resume'
              )}
            </Button>

            {error && (
              <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
                <p className="text-sm text-destructive">{error}</p>
              </div>
            )}


          </div>

          {/* Right Column - Preview */}
          <div className="lg:col-span-8">
            <Card className="border-2 h-full">
              <CardHeader className="pb-3 sm:pb-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <div>
                    <CardTitle className="text-base sm:text-lg">Resume Preview</CardTitle>
                    <CardDescription className="text-xs sm:text-sm">
                      See how your resume will look
                    </CardDescription>
                  </div>
                  {resumeData && (
                    <Button
                      className="h-9 sm:h-10 text-xs sm:text-sm w-full sm:w-auto"
                      onClick={() => handleExport('pdf')}
                      disabled={exportLoading}
                    >
                      <Download className="mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                      {exportLoading ? 'Exporting...' : 'Export PDF'}
                    </Button>
                  )}
                </div>

                {matchData && (
                  <div className="flex justify-end mt-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="gap-2"
                      onClick={() => setShowStatsModal(true)}
                    >
                      <ChartBar className="h-4 w-4" />
                      Analysis Stats
                    </Button>
                  </div>
                )}

              </CardHeader>
              <CardContent>
                {resumeData ? (
                  <div className="overflow-hidden rounded-lg border-2 bg-background shadow-inner">
                    {typeof window !== 'undefined' && (
                      <PDFViewer key={JSON.stringify(resumeData) + activeTheme} width="100%" height="800px">
                        {renderThemeComponent()}
                      </PDFViewer>
                    )}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-[400px] sm:h-[600px] md:h-[800px] border-2 border-dashed rounded-lg p-4 sm:p-8 bg-muted/20">
                    <div className="text-center space-y-3 sm:space-y-4">
                      <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto bg-muted rounded-full flex items-center justify-center">
                        <FileCode className="h-6 w-6 sm:h-8 sm:w-8 text-muted-foreground" />
                      </div>
                      <p className="text-sm sm:text-lg font-medium text-foreground">
                        No Resume Generated Yet
                      </p>
                      <p className="text-xs sm:text-sm text-muted-foreground max-w-md px-4">
                        {!rawResponse
                          ? "Please upload and analyze your CV first to generate a resume."
                          : "Click 'Generate Resume' to create your professional resume."
                        }
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
              <CardFooter className="flex flex-col items-center justify-center border-t bg-muted/5 py-6">
                <div className="text-center mb-4">
                  <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-300">Customize Theme Colors</h4>
                  <p className="text-xs text-muted-foreground">Adjust the colors below to personalize this template</p>
                </div>
                <ColorPicker colors={themeColors} onChange={handleColorChange} />
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>

      {/* Success Alert Dialog */}
      <AlertDialog open={showSuccess} onOpenChange={setShowSuccess}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              Resume Generated Successfully!
            </AlertDialogTitle>
            <AlertDialogDescription>
              Your resume has been created according to your specifications. You can now preview and export it.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction>
              Close
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Low Match Warning Dialog */}
      <AlertDialog open={showLowMatchWarning} onOpenChange={setShowLowMatchWarning}>
        <AlertDialogContent className="max-w-2xl">
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2 text-destructive">
              <AlertCircle className="h-5 w-5" />
              Low Job Match Detected
            </AlertDialogTitle>
            <AlertDialogDescription>
              The generated resume has a low match score ({matchData?.matchScore}%) with the job description.
              The result might not be optimal. Do you want to proceed with this resume or cancel to adjust your inputs?
            </AlertDialogDescription>
          </AlertDialogHeader>

          <div className="py-4">
            <MatchAnalysisStats matchData={matchData} />
          </div>

          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => {
              setPendingResumeData(null);
              setMatchData(null);
            }}>
              Cancel & Adjust
            </AlertDialogCancel>
            <AlertDialogAction onClick={() => {
              if (pendingResumeData) {
                setResumeData(pendingResumeData);
                setShowSuccess(true);
                setTimeout(() => setShowSuccess(false), 1500);
              }
            }}>
              Continue Anyway
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      {/* Stats Analysis Dialog */}
      <AlertDialog open={showStatsModal} onOpenChange={setShowStatsModal}>
        <AlertDialogContent className="max-w-2xl">
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <ChartBar className="h-5 w-5 text-primary" />
              Resume Match Analysis
            </AlertDialogTitle>
            <AlertDialogDescription>
              Detailed breakdown of how well your profile matches the job description.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <div className="py-4">
            <MatchAnalysisStats matchData={matchData} />
          </div>

          <AlertDialogFooter>
            <AlertDialogAction onClick={() => setShowStatsModal(false)}>Close</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}