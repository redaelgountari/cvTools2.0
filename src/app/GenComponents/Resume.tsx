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
  CardDescription 
} from '@/components/ui/card';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';
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
  ChevronDown, 
  FileText, 
  Loader2, 
  CheckCircle,
  Download,
  FileCode,
  AlertCircle
} from 'lucide-react';
import AnalyseResults from './AnalyseResults';
import Theme1 from './Themes/Theme1';
import Theme2 from './Themes/Theme2';
import Theme3 from './Themes/Theme3';
import Theme4 from './Themes/Theme4';
import Theme5 from './Themes/Theme5';
import Theme6 from './Themes/Theme6';
import Theme7 from './Themes/Theme7';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import Theme8 from './Themes/Theme8';
import Theme9 from './Themes/Theme9';
import Theme10 from './Themes/Theme10';
import Theme11 from './Themes/Theme11';

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
      
    // Context and state
    const { AnlysedCV, userData, Settings, setSettings } = useContext(ReadContext);
    const [resumeData, setResumeData] = useState<Resume | null>(null);
    const [rawResponse, setRawResponse] = useState<string | null>(null);
    const [resumeOutput, setResumeOutput] = useState('');
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
    const [activeTab, setActiveTab] = useState('editor');
    
    // Load data from context or storage
    useEffect(() => {
        const loadResumeData = () => {
            try {
                if (AnlysedCV) {
                    console.log("Loading data from context:", AnlysedCV);
                    setRawResponse(AnlysedCV);
                    const parsedData = typeof AnlysedCV === 'string' ? JSON.parse(AnlysedCV) : AnlysedCV;
                    setResumeData(parsedData);
                } else {
                    const storedData = getFromStorage('userData');
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
                    const storedImage = getFromStorage('userImage');
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
        if (!Settings) {
          const savedSettings = getFromStorage('Settings');
          if (savedSettings) {
            setSettings(savedSettings);
          }
        }
        
        console.log("Settings:", Settings);
    }, [Settings, setSettings]);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    // Dynamic import of PDFViewer with loading skeleton
    const PDFViewer = dynamic(() => import("@/app/GenComponents/PDFViewer"), {
        loading: () => (
          <div className="w-full h-[700px] bg-background rounded-lg border border-input p-6 overflow-hidden">
            {/* Header skeleton */}
            <div className="space-y-4 animate-pulse">
              {/* Title bar */}
              <div className="flex items-center justify-between">
                <div className="h-6 bg-muted rounded w-2/5"></div>
                <div className="h-6 bg-muted rounded w-24"></div>
              </div>
              
              {/* Toolbar */}
              <div className="flex space-x-2">
                <div className="h-8 bg-muted rounded w-10"></div>
                <div className="h-8 bg-muted rounded w-10"></div>
                <div className="h-8 bg-muted rounded w-24"></div>
                <div className="h-8 bg-muted rounded w-16"></div>
              </div>
              
              {/* Document body */}
              <div className="pt-4 space-y-3">
                {/* Generate multiple content lines */}
                {Array(15).fill(0).map((_, i) => (
                  <div key={i} className="h-4 bg-muted rounded w-full" style={{opacity: 1 - (i * 0.03)}}></div>
                ))}
                
                {/* Document "image" */}
                <div className="h-40 bg-muted rounded w-full mt-6"></div>
                
                {/* More text lines */}
                {Array(8).fill(0).map((_, i) => (
                  <div key={i + 15} className="h-4 bg-muted rounded w-full" style={{opacity: 0.9 - (i * 0.05)}}></div>
                ))}
              </div>
            </div>
            
            {/* Page navigation */}
            <div className="absolute bottom-6 left-0 right-0 flex justify-center animate-pulse">
              <div className="h-8 bg-muted rounded w-32"></div>
            </div>
          </div>
        ),
    });

    // Generate resume content
    const generateResume = async () => {
        if (!rawResponse) {
            setError('Please provide your CV data first before generating a resume.');
            return;
        }
        if(!jobAnnouncement && resumeData){
            setResumeData(resumeData);
            setShowSuccess(true);
            return;
        }

        setLoading(true);
        setError('');

        try {
            // Create dynamic prompt based on settings
            const prompt = `
            You are a highly skilled professional resume writer specializing in crafting ${
                Settings?.atsOptimized ? 'ATS-optimized and' : ''
            } modern, professional resumes that maximize job-seeker success.
            
            ### USER DATA:
            ${rawResponse}
            
            ${jobAnnouncement ? `### JOB DESCRIPTION:\n${jobAnnouncement}\n` : ''}
            
            ### INSTRUCTIONS:
            1. **Create a polished, professional, and modern${
                Settings?.atsOptimized ? ' ATS-optimized' : ''
            } resume** based on the user's provided data.
            2. **Highlight key skills, experiences, and achievements** that best align with the user's career goals.
            3. **Use strong action verbs and quantify achievements** wherever possible to enhance impact.
            4. **Ensure a logical and structured flow**, improving readability and eliminating redundancies.
            5. **Format the resume into clear sections**, ensuring consistency in styling and structure.
            ${jobAnnouncement ? '6. **Tailor the resume to match the provided job description** by emphasizing relevant qualifications.\n' : ''}
            ${Settings?.showLineLimit ? `7. **Keep each bullet point within approximately ${Settings.lineLimit} words** to ensure clarity and conciseness.\n` : ''}
            8. **Deliver the resume in a clean, structured Markdown format** for easy conversion to PDF or Word.
            9. **Make the resume compelling, concise, and results-oriented**, effectively showcasing the candidate's strengths.
            10. **Write the resume in ${Settings?.selectedLanguage || 'French'}.

            ### SPECIAL HANDLING:
            - **Include only valid and relevant information.**  
            - **Remove placeholders or irrelevant entries** such as "[Your LinkedIn Profile URL]", "N/A", "null", or "Not Provided."  
            - **If a section (e.g., Certifications, Portfolio) has no valid data, omit it entirely** rather than leaving it blank.  
            
            ### OUTPUT FORMAT:
            Ensure the resume follows this structured JSON format for alignment with the job offer:  
            \`\`\`json
            ${JSON.stringify(resumeData, null, 2)}
            \`\`\`
            `;
            
            const { data } = await axios.post("/api/gemini", { userData: prompt });
            const cleanedData = data.text
                .replace(/```json|```/g, '') 
                .trim(); 
        
            setResumeOutput(cleanedData);
            setResumeData(JSON.parse(cleanedData));
            setShowSuccess(true);
            setTimeout(() => {
                setShowSuccess(false);
                setActiveTab('preview'); 
            }, 1500);
            console.log("Cleaned data:", JSON.parse(cleanedData));
            console.log("selectedLanguage:", Settings?.selectedLanguage);

        } catch (error) {
            console.error('Error generating resume:', error);
            setError(error instanceof Error ? error.message : 'Failed to generate resume. Please try again.');
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
            // This would be connected to actual export functionality
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            if (format === 'pdf') {
                console.log('Exporting as PDF...');
                // Implementation for PDF export
            } else if (format === 'docx') {
                console.log('Exporting as Word...');
                // Implementation for Word export
            }
            
            // Success notification
            setError('');
            // Could show a success message here
        } catch (error) {
            setError('Export failed. Please try again.');
        } finally {
            setExportLoading(false);
        }
    };

    // Render the theme component based on activeTheme
    const renderThemeComponent = () => {
        if (!resumeData) return null;
        
        const themeProps = { userdata: resumeData, userImage };
        
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

    return (
        <div className="container mx-auto p-4 max-w-7xl">
            <div className="mb-8 text-center">
                <h1 className="text-3xl font-bold tracking-tight">Resume Builder</h1>
                <p className="text-muted-foreground mt-2">Create professional, ATS-optimized resumes tailored to your target jobs</p>
            </div>
            
            <Tabs defaultValue="editor" className="w-full" value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid grid-cols-2 mb-6">
                    <TabsTrigger value="editor">Editor</TabsTrigger>
                    <TabsTrigger value="preview">Preview</TabsTrigger>
                </TabsList>
                
                <TabsContent value="editor" className="space-y-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Left Column - Your Data */}
                        <Card className="shadow-md">
                            <CardHeader>
                                <CardTitle className="flex items-center">
                                    <FileText className="h-5 w-5 mr-2" />
                                    Your Resume Data
                                </CardTitle>
                                <CardDescription>
                                    Review the information extracted from your CV
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="max-h-[500px] overflow-y-auto">
                                    {resumeData ? (
                                        <AnalyseResults />
                                    ) : (
                                        <div className="flex flex-col items-center justify-center h-[200px] border-2 border-dashed rounded-md p-4">
                                            <AlertCircle className="h-10 w-10 text-muted-foreground mb-4" />
                                            <p className="text-center text-muted-foreground">
                                                No CV data found. Please upload and analyze your CV first.
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                        
                        {/* Right Column - Job Description */}
                        <Card className="shadow-md">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <div>
                                    <CardTitle className="text-lg">Target Job Description</CardTitle>
                                    <CardDescription>
                                        Add job details to tailor your resume for specific positions
                                    </CardDescription>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Switch 
                                        id="job-desc-toggle" 
                                        checked={showJobDescription}
                                        onCheckedChange={setShowJobDescription}
                                    />
                                    <Label htmlFor="job-desc-toggle">Enable</Label>
                                </div>
                            </CardHeader>
                            <CardContent>
                                {showJobDescription ? (
                                    <div className="space-y-4">
                                        <Textarea 
                                            placeholder="Paste the job description here to tailor your resume..." 
                                            className="min-h-[200px]"
                                            value={jobAnnouncement}
                                            onChange={(e) => setJobAnnouncement(e.target.value)}
                                        />
                                        <div className="text-sm text-muted-foreground">
                                            Adding a job description helps optimize your resume for ATS systems and highlights relevant skills.
                                        </div>
                                    </div>
                                ) : (
                                    <div className="flex flex-col items-center justify-center h-[200px] border-2 border-dashed rounded-md p-4">
                                        <p className="text-center text-muted-foreground mb-2">
                                            Enable job description targeting to create a tailored resume
                                        </p>
                                        <Button 
                                            variant="outline" 
                                            onClick={() => setShowJobDescription(true)}
                                        >
                                            Add Job Description
                                        </Button>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>
                    
                    {/* Generate Button and Options */}
                    <div className="flex flex-col space-y-4">
                        <div className="flex items-center justify-center">
                            <Button 
                                className="w-full md:w-1/2 h-12" 
                                onClick={generateResume} 
                                disabled={loading || !resumeData}
                            >
                                {loading ? (
                                    <span className="flex items-center">
                                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                        Generating Resume...
                                    </span>
                                ) : (
                                    <span className="flex items-center">
                                        <FileText className="mr-2 h-5 w-5" />
                                        Generate Resume
                                    </span>
                                )}
                            </Button>
                        </div>
                        
                        {showSuccess && (
                            <div className="flex items-center justify-center p-2 bg-green-100 text-green-700 rounded-md">
                                <CheckCircle className="mr-2 h-5 w-5" />
                                Resume successfully generated! Switching to Preview tab...
                            </div>
                        )}
                        
                        {error && (
                            <div className="p-3 bg-red-100 text-red-700 rounded-md flex items-center">
                                <AlertCircle className="h-5 w-5 mr-2" />
                                {error}
                            </div>
                        )}
                    </div>
                </TabsContent>
                
                <TabsContent value="preview" className="space-y-6">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                        {/* Left Column - Resume Theme Selection */}
                        <div className="lg:col-span-4 space-y-4">
                            <Card className="shadow-md">
                                <CardHeader>
                                    <CardTitle>Resume Template</CardTitle>
                                    <CardDescription>
                                        Choose a professional template for your resume
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        {isMounted ? (
                                            <Carousel
                                                opts={{
                                                    align: "start",
                                                }}
                                                className="w-full max-w-sm"
                                            >
                                                <CarouselContent>
                                                    {[
                                                        { id: 'theme1', name: 'Modern' },
                                                        { id: 'theme2', name: 'Professional' },
                                                        { id: 'theme3', name: 'Classic' },
                                                        { id: 'theme4', name: 'Creative' },
                                                        { id: 'theme5', name: 'Minimal' },
                                                        { id: 'theme6', name: 'New' },
                                                        { id: 'theme7', name: 'New' },
                                                        { id: 'theme8', name: 'New' },
                                                        { id: 'theme9', name: 'New' },
                                                        { id: 'theme10', name: 'New' },
                                                        { id: 'theme11', name: 'New' },
                                                    ].map((theme, index) => (
                                                        <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                                                            <div className="p-1">
                                                                <Card 
                                                                    className={`cursor-pointer transition-all ${activeTheme === theme.id ? 'ring-2 ring-primary' : ''}`}
                                                                    onClick={() => setActiveTheme(theme.id)}
                                                                >
                                                                    <CardContent className="flex flex-col aspect-square items-center justify-center p-6">
                                                                        <span className="text-3xl font-semibold mb-2">{index + 1}</span>
                                                                        <span className="text-sm font-medium">{theme.name}</span>
                                                                    </CardContent>
                                                                </Card>
                                                            </div>
                                                        </CarouselItem>
                                                    ))}
                                                </CarouselContent>
                                                <CarouselPrevious />
                                                <CarouselNext />
                                            </Carousel>
                                        ) : (
                                            <div className="w-full h-48 flex items-center justify-center bg-muted rounded-md">
                                                <Loader2 className="h-8 w-8 animate-spin opacity-50" />
                                            </div>
                                        )}

                                        <div className="grid grid-cols-2 gap-4 mt-4">
                                            <Button 
                                                variant={activeTheme === 'theme1' ? 'default' : 'outline'} 
                                                className="w-full"
                                                onClick={() => setActiveTheme('theme1')}
                                            >
                                                Modern
                                            </Button>
                                            <Button 
                                                variant={activeTheme === 'theme2' ? 'default' : 'outline'} 
                                                className="w-full"
                                                onClick={() => setActiveTheme('theme2')}
                                            >
                                                Professional
                                            </Button>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                            
                            <Card className="shadow-md">
                                <CardHeader>
                                    <CardTitle>Export Options</CardTitle>
                                    <CardDescription>
                                        Download your resume in different formats
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex flex-col space-y-3">
                                        <Button 
                                            className="w-full justify-start" 
                                            onClick={() => handleExport('pdf')} 
                                            disabled={!resumeData || exportLoading}
                                        >
                                            <Download className="mr-2 h-5 w-5" />
                                            {exportLoading ? 'Exporting...' : 'Export as PDF'}
                                        </Button>
                                        <Button 
                                            className="w-full justify-start" 
                                            variant="outline" 
                                            onClick={() => handleExport('docx')} 
                                            disabled={!resumeData || exportLoading}
                                        >
                                            <FileCode className="mr-2 h-5 w-5" />
                                            {exportLoading ? 'Exporting...' : 'Export as Word'}
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                        
                        {/* Right Column - Resume Preview */}
                        <div className="lg:col-span-8">
                            <Card className="shadow-md">
                                <CardHeader>
                                    <CardTitle>Resume Preview</CardTitle>
                                    <CardDescription>
                                        See how your resume will look when exported
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    {resumeData ? (
                                        <div className="overflow-hidden rounded-lg border bg-background">
                                            {typeof window !== 'undefined' && (
                                                <PDFViewer width="100%" height="700px">
                                                    {renderThemeComponent()}
                                                </PDFViewer>
                                            )}
                                        </div>
                                    ) : (
                                        <div className="flex flex-col items-center justify-center h-[500px] border-2 border-dashed rounded-md p-4">
                                            <p className="text-center text-muted-foreground mb-4">
                                                {resumeData ? 
                                                    "No resume generated yet. Go to the Editor tab to create your resume." :
                                                    "No resume data available. Please upload and analyze your CV first."
                                                }
                                            </p>
                                            {resumeData && (
                                                <Button 
                                                    variant="outline" 
                                                    onClick={() => setActiveTab('editor')}
                                                >
                                                    Go to Editor
                                                </Button>
                                            )}
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </TabsContent>
            </Tabs>
            
            {/* Success Alert Dialog */}
            <AlertDialog open={showSuccess} onOpenChange={setShowSuccess}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle className="flex items-center">
                            <CheckCircle className="h-5 w-5 mr-2 text-green-500" />
                            Resume Generated Successfully!
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            Your resume has been created according to your specifications. You can now preview and export it.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogAction onClick={() => setActiveTab('preview')}>
                            View Resume
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
}