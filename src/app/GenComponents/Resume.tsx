"use client";

import React, { useContext, useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { getFromStorage } from '@/Cookiesmv';
import { ReadContext } from './ReadContext';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { prompteCVUpdate, prompteResumeTailoring } from '../Promptes/Aipromptes';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useIsCVAnalyzed } from '@/hooks/useIsCVAnalyzed';
import dynamic from "next/dynamic";
import { logger } from '@/lib/logger';

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
  BarChart as ChartBar,
  RefreshCw,
  Sparkles,
  MessageSquare,
  Briefcase,
  Zap,
  Edit3,
  Eye
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
import { AlertDialogCancel } from '@radix-ui/react-alert-dialog';
import MatchAnalysisStats from './MatchAnalysisStats';
import { ColorPicker } from './ColorPicker';
import { DEFAULT_THEME_COLORS } from './Themes/themeDefaults';
import { normalizeResumeData } from './Themes/dataNormalization';
import type { Resume, MatchData } from '@/app/types/resume';
import HTMLTheme1 from './Editor/HTMLTheme1';
import HTMLTheme2 from './Editor/HTMLTheme2';
import HTMLTheme3 from './Editor/HTMLTheme3';
import HTMLTheme4 from './Editor/HTMLTheme4';
import HTMLTheme5 from './Editor/HTMLTheme5';
import HTMLTheme6 from './Editor/HTMLTheme6';
import HTMLTheme7 from './Editor/HTMLTheme7';
import HTMLTheme8 from './Editor/HTMLTheme8';
import HTMLTheme9 from './Editor/HTMLTheme9';
import HTMLTheme10 from './Editor/HTMLTheme10';
import HTMLTheme11 from './Editor/HTMLTheme11';

import { useTour } from '../(studio)/TourProvider';

// Dynamic import of PDFViewer with loading skeleton
const PDFViewer = dynamic(() => import("@/app/GenComponents/PDFViewer"), {
  ssr: false,
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

// Memoized wrapper for the PDF Viewer content to prevent unnecessary re-renders
const ResumePreview = React.memo(({
  resumeData,
  activeTheme,
  themeColors,
  userImage
}: {
  resumeData: Resume;
  activeTheme: string;
  themeColors: any;
  userImage: string;
}) => {
  const themeProps = useMemo(() => ({
    userdata: resumeData,
    userImage,
    colors: themeColors
  }), [resumeData, userImage, themeColors]);

  const RenderedTheme = useMemo(() => {
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
  }, [activeTheme, themeProps]);

  return (
    <PDFViewer
      width="100%"
      height="800px"
      showToolbar={true}
      className="rounded-lg"
    >
      {RenderedTheme}
    </PDFViewer>
  );
}, (prevProps, nextProps) => {
  // Simple check for equality to prevent redundant updates if unnecessary
  // But parent component will now control remounting via key
  return (
    prevProps.activeTheme === nextProps.activeTheme &&
    prevProps.userImage === nextProps.userImage &&
    JSON.stringify(prevProps.themeColors) === JSON.stringify(nextProps.themeColors) &&
    prevProps.resumeData === nextProps.resumeData
  );
});

ResumePreview.displayName = 'ResumePreview';

export default function Resume() {
  const { setSteps, autoStart } = useTour();
  const { isCVAnalyzed, isLoading: isCVLoading } = useIsCVAnalyzed();
  const router = useRouter();

  // Context and state
  const { AnlysedCV, setAnlysedCV, userData, settings: contextSettings, setSettings, isLoading: contextLoading } = useContext<any>(ReadContext);
  const [resumeData, setResumeData] = useState<Resume | null>(null);
  const [rawResponse, setRawResponse] = useState<string | null>(null);
  const [jobAnnouncement, setJobAnnouncement] = useState('');
  const [activeTheme, setActiveTheme] = useState('theme2');
  const [showJobDescription, setShowJobDescription] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [userImage, setUserImage] = useState('');
  const [isEditingMode, setIsEditingMode] = useState(false);

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

  // AI Power Tools states
  const [aiInstruction, setAiInstruction] = useState('');
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [activeAiTab, setActiveAiTab] = useState('targeted');

  const [hasTriggeredTour, setHasTriggeredTour] = useState(false);
  const [currentThemeIndex, setCurrentThemeIndex] = useState(1);

  const updateResumeData = (newData: Resume) => {
    setResumeData(newData);
  };

  // Load data from context or storage
  useEffect(() => {
    const loadResumeData = async () => {
      try {
        if (!contextLoading && AnlysedCV) {
          logger.log("Loading data from context:", AnlysedCV);
          // Optimization: check if data actually changed before processing
          const isString = typeof AnlysedCV === 'string';
          const stringData = isString ? AnlysedCV : JSON.stringify(AnlysedCV);

          if (rawResponse !== stringData) {
            setRawResponse(stringData);
            const parsedData = isString ? JSON.parse(AnlysedCV) : AnlysedCV;
            setResumeData(normalizeResumeData(parsedData));
          }
        } else if (!contextLoading && !AnlysedCV) {
          const storedData = await getFromStorage('userData');
          if (storedData) {
            logger.log("Loading data from storage:", storedData);
            const stringData = JSON.stringify(storedData);
            if (rawResponse !== stringData) {
              setRawResponse(stringData);
              setResumeData(normalizeResumeData(storedData));
            }
          }
        }

        // Set user image from userData or storage
        if (userData && userData.image && userData.image[0]) {
          if (userImage !== userData.image[0]) {
            setUserImage(userData.image[0]);
          }
        } else {
          const storedImage = await getFromStorage('userImage');
          if (storedImage && storedImage[0] && userImage !== storedImage[0]) {
            setUserImage(storedImage[0]);
          }
        }
      } catch (error) {
        console.error("Error loading resume data:", error);
      }
    };

    loadResumeData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [AnlysedCV, userData, contextLoading]); // Optimized dependencies

  // Onboarding Tutorial Effect
  useEffect(() => {
    if (!contextLoading && isMounted && !hasTriggeredTour) {
      setSteps([
        {
          target: '.card-container',
          content: 'This is the control panel. You can select different resume templates and themes here.',
          placement: 'right' as const,
          disableBeacon: true,
        },
        {
          target: '.job-description-section',
          content: 'Paste the target job description here to let the AI tailor your resume precisely.',
          placement: 'bottom' as const,
          disableBeacon: true,
        },
        {
          target: '.generate-button',
          content: 'Click here to generate your tailored resume!',
          placement: 'top' as const,
          disableBeacon: true,
        },
        {
          target: '.pdf-viewer-container',
          content: 'Your live resume preview will appear here. Changes are saved automatically.',
          placement: 'left' as const,
          disableBeacon: true,
        }
      ]);

      setHasTriggeredTour(true);
      autoStart();
    }
  }, [contextLoading, isMounted, setSteps, autoStart, hasTriggeredTour]);

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
  }, [contextSettings, setSettings]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Update colors when theme changes
  useEffect(() => {
    setThemeColors(DEFAULT_THEME_COLORS[activeTheme] || {});
  }, [activeTheme]);

  useEffect(() => {
    if (!isCVLoading && !isCVAnalyzed) {
      router.push('/ReadCV');
    }
  }, [isCVLoading, isCVAnalyzed, router]);

  // Memoize resume data key to avoid expensive stringify on every render
  const resumeDataKey = useMemo(() => {
    return resumeData ? JSON.stringify(resumeData) : '';
  }, [resumeData]);

  // Check if current resume data differs from original raw response
  const isDirty = useMemo(() => {
    if (!rawResponse || !resumeData) return false;
    try {
      const original = normalizeResumeData(JSON.parse(rawResponse));
      // Comparison - normalize both to be sure
      const current = JSON.stringify(normalizeResumeData(resumeData));
      const baseline = JSON.stringify(original);
      return current !== baseline;
    } catch (e) {
      return false;
    }
  }, [rawResponse, resumeData]);

  if (isCVLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!isCVAnalyzed) return null;

  const handleColorChange = (key: string, value: string) => {
    setThemeColors(prev => ({
      ...prev,
      [key]: value
    }));
  };

  // Reset local state to the current baseline (rawResponse)
  const resetToOriginal = () => {
    if (!rawResponse) return;
    try {
      logger.log("Resetting to baseline:", rawResponse);
      const originalCV = JSON.parse(rawResponse);
      const normalized = normalizeResumeData(originalCV);
      setResumeData(normalized);
      setMatchData(null);
      setJobAnnouncement('');
      setAiInstruction('');
      setError('');
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 1500);
    } catch (e) {
      console.error("Failed to reset resume:", e);
      setError("Failed to reset data.");
    }
  };

  const generateResume = async () => {
    if (!rawResponse) {
      setError('Please provide your CV data first before generating a resume.');
      return;
    }
    if (!jobAnnouncement) {
      setError('Please provide a job description for targeted adaptation.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const language = contextSettings?.selectedLanguage || 'French';
      const prompt = prompteResumeTailoring(rawResponse, jobAnnouncement, language);

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

      logger.log("Raw response:", data.text);
      logger.log("Cleaned data:", cleanedData);

      // Parse the JSON
      const parsedData = JSON.parse(cleanedData);

      // Extract resume and analysis data
      // AI might return it wrapped in "resume" or flat at the top level
      let newResumeData = parsedData.resume || (parsedData.personalInfo ? parsedData : null);
      const newAnalysisData = parsedData.analysis || null;

      // Special case: if it's flat but doesn't have personalInfo, check if it's the resume object itself
      if (!newResumeData && !parsedData.resume && !parsedData.analysis) {
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
        setPendingResumeData(normalizeResumeData(newResumeData));
        setShowLowMatchWarning(true);
      } else {
        setResumeData(normalizeResumeData(newResumeData));
        setMatchData(newAnalysisData);
        setShowSuccess(true);
        setTimeout(() => {
          setShowSuccess(false);
        }, 1500);
      }

      logger.log("Parsed data:", parsedData);
      logger.log("Selected language:", contextSettings?.selectedLanguage);

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

  const applyAIUpdate = async () => {
    if (!aiInstruction.trim()) {
      setError('Please provide instructions for the AI.');
      return;
    }
    if (!resumeData) {
      setError('No resume data found to update.');
      return;
    }

    setIsAiLoading(true);
    setError('');

    try {
      const prompt = prompteCVUpdate(JSON.stringify(resumeData), aiInstruction, contextSettings?.selectedLanguage);

      const { data } = await axios.post("/api/gemini", {
        userData: prompt,
        useCase: 'Analyse-resume'
      });

      let cleanedData = data.text.trim();
      cleanedData = cleanedData.replace(/```[\w]*\n?/g, '').replace(/```/g, '').trim();

      const firstBrace = cleanedData.indexOf('{');
      const lastBrace = cleanedData.lastIndexOf('}');
      if (firstBrace !== -1 && lastBrace !== -1) {
        cleanedData = cleanedData.substring(firstBrace, lastBrace + 1);
      }

      const parsedData = JSON.parse(cleanedData);

      // AI might return it wrapped in "resume" or flat at the top level
      let newResumeData = parsedData.resume || (parsedData.personalInfo ? parsedData : null);
      const newAnalysisData = parsedData.analysis || null;

      // Special case: if it's flat but doesn't have personalInfo, check if it's the resume object itself
      if (!newResumeData && !parsedData.resume && !parsedData.analysis) {
        newResumeData = parsedData;
      }

      if (!newResumeData || (!newResumeData.personalInfo && !newResumeData.experience)) {
        throw new Error('AI did not return a valid resume structure.');
      }

      // Preserve the image
      if (resumeData && (resumeData as any).image) {
        (newResumeData as any).image = (resumeData as any).image;
      } else if (userImage) {
        (newResumeData as any).image = [userImage];
      }

      if (newAnalysisData && newAnalysisData.matchScore > 0 && newAnalysisData.matchScore < 50) {
        setMatchData(newAnalysisData);
        setPendingResumeData(normalizeResumeData(newResumeData));
        setShowLowMatchWarning(true);
      } else {
        setResumeData(normalizeResumeData(newResumeData));
        setMatchData(newAnalysisData);
        setShowSuccess(true);
        setAiInstruction('');
        setTimeout(() => setShowSuccess(false), 1500);
      }
    } catch (error) {
      console.error('Error updating resume with AI:', error);
      setError('Failed to update resume. Please try again.');
    } finally {
      setIsAiLoading(false);
    }
  };

  // Handle export
  const handleExport = async (format: string) => {
    if (!resumeData) {
      setError('No resume content to export.');
      return;
    }

    setExportLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));

      if (format === 'pdf') {
        logger.log('Exporting as PDF...');
      } else if (format === 'docx') {
        logger.log('Exporting as Word...');
      }

      setError('');
    } catch (error) {
      setError('Export failed. Please try again.');
    } finally {
      setExportLoading(false);
    }
  };

  const themes = [
    { id: 'theme1', name: 'Modern', bgColor: 'bg-blue-50/50 dark:bg-blue-900/10', accentColor: 'text-blue-600 dark:text-blue-400', borderColor: 'border-blue-500/50', ringColor: 'ring-blue-500', badge: 'Popular' },
    { id: 'theme2', name: 'Professional', bgColor: 'bg-slate-50/50 dark:bg-slate-800/20', accentColor: 'text-slate-800 dark:text-slate-200', borderColor: 'border-slate-500/50', ringColor: 'ring-slate-500', badge: 'ATS Friendly' },
    { id: 'theme3', name: 'Classic', bgColor: 'bg-stone-50/50 dark:bg-stone-800/20', accentColor: 'text-stone-700 dark:text-stone-300', borderColor: 'border-stone-500/50', ringColor: 'ring-stone-500' },
    { id: 'theme4', name: 'Creative', bgColor: 'bg-violet-50/50 dark:bg-violet-900/10', accentColor: 'text-violet-600 dark:text-violet-400', borderColor: 'border-violet-500/50', ringColor: 'ring-violet-500', badge: 'Trending' },
    { id: 'theme5', name: 'Minimal', bgColor: 'bg-zinc-50/50 dark:bg-zinc-800/20', accentColor: 'text-zinc-600 dark:text-zinc-400', borderColor: 'border-zinc-500/50', ringColor: 'ring-zinc-500' },
    { id: 'theme6', name: 'Elegant', bgColor: 'bg-rose-50/50 dark:bg-rose-900/10', accentColor: 'text-rose-600 dark:text-rose-400', borderColor: 'border-rose-500/50', ringColor: 'ring-rose-500' },
    { id: 'theme7', name: 'Bold', bgColor: 'bg-emerald-50/50 dark:bg-emerald-900/10', accentColor: 'text-emerald-600 dark:text-emerald-400', borderColor: 'border-emerald-500/50', ringColor: 'ring-emerald-500' },
    { id: 'theme8', name: 'Simple', bgColor: 'bg-gray-50/50 dark:bg-gray-800/20', accentColor: 'text-gray-600 dark:text-gray-400', borderColor: 'border-gray-500/50', ringColor: 'ring-gray-500' },
    { id: 'theme9', name: 'Contemporary', bgColor: 'bg-cyan-50/50 dark:bg-cyan-900/10', accentColor: 'text-cyan-600 dark:text-cyan-400', borderColor: 'border-cyan-500/50', ringColor: 'ring-cyan-500' },
    { id: 'theme10', name: 'Executive', bgColor: 'bg-indigo-50/50 dark:bg-indigo-900/10', accentColor: 'text-indigo-600 dark:text-indigo-400', borderColor: 'border-indigo-500/50', ringColor: 'ring-indigo-500', badge: 'Recommended' },
    { id: 'theme11', name: 'Technical', bgColor: 'bg-teal-50/50 dark:bg-teal-900/10', accentColor: 'text-teal-600 dark:text-teal-400', borderColor: 'border-teal-500/50', ringColor: 'ring-teal-500' },
  ];

  const activeThemeObj = themes.find(t => t.id === activeTheme) || themes[1];

  // Check if we have actual data or just the empty initialization
  const hasActualData = AnlysedCV && AnlysedCV.personalInfo && AnlysedCV.personalInfo.email !== ' ';

  if (contextLoading || !hasActualData) {
    return (
      <div className="flex items-center justify-center min-h-[600px]">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
          <p className="text-lg font-medium text-muted-foreground">
            {contextLoading ? "Loading your resume data..." : "Preparing your workspace..."}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto p-4 md:p-6 max-w-[1600px]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">

          {/* Left Column - Controls */}
          <div className="lg:col-span-4 space-y-6">

            {/* Featured Template Picker */}
            <div className="flex flex-col gap-4">
              <h2 className="text-xl font-semibold tracking-tight">Template</h2>

              {/* Featured Selected Card */}
              <div className={`relative overflow-hidden rounded-xl border-2 transition-all duration-500 ease-out bg-card ${activeThemeObj.borderColor} shadow-[0_4px_24px_-8px] shadow-${activeThemeObj.ringColor.replace('ring-', '')}/20`}>
                <div className={`p-5 flex gap-5 items-center ${activeThemeObj.bgColor}`}>
                  {/* Mockup SVG */}
                  <div className="w-16 h-20 shrink-0 bg-white dark:bg-slate-900 rounded shadow-sm border border-black/5 dark:border-white/5 p-1.5 flex flex-col gap-1.5 transform group-hover:scale-105 transition-transform">
                    <div className={`h-1.5 w-full rounded-sm ${activeThemeObj.accentColor.replace('text-', 'bg-').split(' ')[0]}`} />
                    <div className="h-1 w-2/3 rounded-sm bg-muted-foreground/30" />
                    <div className="h-px w-full bg-border my-0.5" />
                    <div className="h-0.5 w-full rounded-sm bg-muted-foreground/20" />
                    <div className="h-0.5 w-4/5 rounded-sm bg-muted-foreground/20" />
                    <div className="h-0.5 w-full rounded-sm bg-muted-foreground/20" />
                    <div className="h-0.5 w-3/4 rounded-sm bg-muted-foreground/20" />
                  </div>

                  <div className="flex-1 space-y-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-lg">{activeThemeObj.name}</h3>
                      {activeThemeObj.badge && (
                        <span className={`text-[10px] uppercase tracking-wider font-bold px-1.5 py-0.5 rounded border ${activeThemeObj.borderColor} ${activeThemeObj.accentColor}`}>
                          {activeThemeObj.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground font-medium">Currently applied to your resume</p>
                    <div className="flex items-center gap-1.5 mt-2">
                      <CheckCircle className={`w-3.5 h-3.5 ${activeThemeObj.accentColor}`} />
                      <span className={`text-xs font-semibold ${activeThemeObj.accentColor}`}>Selected ✓</span>
                    </div>
                  </div>
                </div>
                {/* Visual Color Customizer */}
                <div className="px-5 pb-5 pt-0">
                  <ColorPicker colors={themeColors} onChange={handleColorChange} />
                </div>
              </div>

              {/* Grid Selector */}
              <div className="grid grid-cols-4 sm:grid-cols-5 gap-3 mt-2">
                {themes.map((theme) => {
                  const isActive = activeTheme === theme.id;
                  return (
                    <button
                      key={theme.id}
                      onClick={() => setActiveTheme(theme.id)}
                      className="group relative flex flex-col items-center gap-2 outline-none"
                    >
                      <div className={`w-full aspect-[3/4] rounded-md transition-all duration-300 border-2 overflow-hidden bg-card ${isActive
                          ? `${theme.borderColor} ring-4 ${theme.ringColor.replace('ring-', 'ring-')}/20 scale-105 z-10 shadow-lg`
                          : 'border-border hover:border-muted-foreground/50 hover:shadow-md hover:-translate-y-1'
                        }`}
                      >
                        <div className={`w-full h-full p-2 flex flex-col gap-1 ${theme.bgColor}`}>
                          <div className={`h-1.5 w-full rounded-sm ${theme.accentColor.replace('text-', 'bg-').split(' ')[0]}`} />
                          <div className="h-1 w-2/3 rounded-sm bg-muted-foreground/30" />
                          <div className="h-px w-full bg-border my-0.5" />
                          <div className="h-0.5 w-full rounded-sm bg-muted-foreground/20" />
                          <div className="h-0.5 w-4/5 rounded-sm bg-muted-foreground/20" />
                          <div className="h-0.5 w-full rounded-sm bg-muted-foreground/20" />
                        </div>
                      </div>
                      <span className={`text-[11px] font-medium transition-colors ${isActive ? 'text-foreground font-semibold' : 'text-muted-foreground group-hover:text-foreground'}`}>
                        {theme.name}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* AI Power Tools Redesign */}
            <div className="mt-8 pt-6 border-t border-border">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="h-4 w-4 text-primary" />
                <h2 className="text-xl font-semibold tracking-tight">Optimize with AI</h2>
              </div>

              <Tabs value={activeAiTab} onValueChange={setActiveAiTab} className="w-full">
                <TabsList className="w-full h-auto p-1 bg-muted/60 rounded-lg grid grid-cols-2 mb-4">
                  <TabsTrigger value="targeted" className="rounded-md py-2 data-[state=active]:bg-background data-[state=active]:shadow-sm text-xs font-medium transition-all">
                    Targeted Offer
                  </TabsTrigger>
                  <TabsTrigger value="editor" className="rounded-md py-2 data-[state=active]:bg-background data-[state=active]:shadow-sm text-xs font-medium transition-all">
                    AI Editor
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="targeted" className="space-y-4 m-0 outline-none">
                  <div className="space-y-2">
                    <Label htmlFor="job-offer" className="text-xs font-semibold text-muted-foreground ml-1">
                      Job Description
                    </Label>
                    <div className="relative">
                      <Textarea
                        id="job-offer"
                        placeholder="Paste the target job description here..."
                        className="min-h-[140px] text-sm resize-none border-border/60 bg-card focus:border-primary/50 focus:ring-1 focus:ring-primary/50 rounded-xl p-4 shadow-sm placeholder:text-muted-foreground/50 transition-all"
                        value={jobAnnouncement}
                        onChange={(e) => setJobAnnouncement(e.target.value)}
                      />
                    </div>
                  </div>
                  <Button
                    className="w-full h-11 text-sm font-semibold rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground shadow-sm transition-all flex items-center justify-center gap-2"
                    onClick={generateResume}
                    disabled={loading || !rawResponse || !jobAnnouncement}
                  >
                    {loading ? (
                      <><Loader2 className="h-4 w-4 animate-spin" /> Adapting...</>
                    ) : (
                      <><Zap className="h-4 w-4" /> Adapt My CV</>
                    )}
                  </Button>
                </TabsContent>

                <TabsContent value="editor" className="space-y-4 m-0 outline-none">
                  <div className="space-y-2">
                    <Label htmlFor="ai-editor" className="text-xs font-semibold text-muted-foreground ml-1">
                      Custom Instructions
                    </Label>
                    <div className="relative">
                      <Textarea
                        id="ai-editor"
                        placeholder="E.g., 'Make my tone more executive' or 'Extract keywords for a Product Manager role'..."
                        className="min-h-[140px] text-sm resize-none border-border/60 bg-card focus:border-primary/50 focus:ring-1 focus:ring-primary/50 rounded-xl p-4 shadow-sm placeholder:text-muted-foreground/50 transition-all"
                        value={aiInstruction}
                        onChange={(e) => setAiInstruction(e.target.value)}
                      />
                    </div>
                  </div>
                  <Button
                    className="w-full h-11 text-sm font-semibold rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground shadow-sm transition-all flex items-center justify-center gap-2"
                    onClick={applyAIUpdate}
                    disabled={isAiLoading || !rawResponse || !aiInstruction}
                  >
                    {isAiLoading ? (
                      <><Loader2 className="h-4 w-4 animate-spin" /> Updating...</>
                    ) : (
                      <><Sparkles className="h-4 w-4" /> Apply Magic Update</>
                    )}
                  </Button>
                </TabsContent>
              </Tabs>
            </div>

            {/* Sync & Reset buttons */}
            {isDirty && !loading && !isAiLoading && (
              <div className="pt-2">
                <Button
                  variant="ghost"
                  className="w-full text-xs h-9 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
                  onClick={resetToOriginal}
                >
                  <RefreshCw className="w-3.5 h-3.5 mr-2" />
                  Revert to Original
                </Button>
              </div>
            )}

            {error && (
              <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-lg flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-destructive shrink-0" />
                <p className="text-sm text-destructive">{error}</p>
              </div>
            )}
          </div>

          {/* Right Column - Preview */}
          <div className="lg:col-span-8 pdf-viewer-container">
            <Card className="border-2 h-full">
              <CardHeader className="pb-3 sm:pb-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 overflow-hidden">
                  <div>
                    <CardTitle className="text-base sm:text-lg">Resume Preview</CardTitle>
                    <CardDescription className="text-xs sm:text-sm">
                      {isEditingMode ? "Editing your resume directly" : "See how your resume will look"}
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant={isEditingMode ? "default" : "outline"}
                      size="sm"
                      className="h-9"
                      onClick={() => setIsEditingMode(!isEditingMode)}
                    >
                      {isEditingMode ? (
                        <><Eye className="mr-2 h-4 w-4" /> View PDF</>
                      ) : (
                        <><Edit3 className="mr-2 h-4 w-4" /> Visual Editor</>
                      )}
                    </Button>
                    {resumeData && (
                      <Button
                        className="h-9 text-xs sm:text-sm"
                        onClick={() => handleExport('pdf')}
                        disabled={exportLoading}
                      >
                        <Download className="mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                        {exportLoading ? 'Exporting...' : 'Export PDF'}
                      </Button>
                    )}
                  </div>
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
                  <div className="overflow-hidden rounded-lg border-2 bg-background shadow-inner min-h-[800px]">
                    {isMounted && (
                      isEditingMode ? (
                        <div className="bg-slate-100/50 dark:bg-slate-900/50 p-4 sm:p-8 overflow-auto max-h-[1000px] flex justify-center">
                          <div className="bg-white shadow-2xl origin-top" style={{ width: '210mm', minHeight: '297mm', transform: 'scale(0.95)' }}>
                            {(() => {
                              const props = {
                                userdata: resumeData,
                                colors: themeColors,
                                userImage: userImage,
                                onUpdate: updateResumeData
                              };
                              switch (activeTheme) {
                                case 'theme1': return <HTMLTheme1 {...props} />;
                                case 'theme2': return <HTMLTheme2 {...props} />;
                                case 'theme3': return <HTMLTheme3 {...props} />;
                                case 'theme4': return <HTMLTheme4 {...props} />;
                                case 'theme5': return <HTMLTheme5 {...props} />;
                                case 'theme6': return <HTMLTheme6 {...props} />;
                                case 'theme7': return <HTMLTheme7 {...props} />;
                                case 'theme8': return <HTMLTheme8 {...props} />;
                                case 'theme9': return <HTMLTheme9 {...props} />;
                                case 'theme10': return <HTMLTheme10 {...props} />;
                                case 'theme11': return <HTMLTheme11 {...props} />;
                                default: return (
                                  <div className="flex flex-col items-center justify-center h-[297mm] p-20 text-center bg-white">
                                    <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
                                      <Edit3 className="h-8 w-8 text-muted-foreground" />
                                    </div>
                                    <h3 className="text-xl font-semibold mb-2">Visual Editor for "{activeTheme}"</h3>
                                    <p className="text-muted-foreground max-w-sm">
                                      We're currently building the interactive version of this template. You can still customize colors below or switch to another theme!
                                    </p>
                                    <Button variant="outline" className="mt-6" onClick={() => setIsEditingMode(false)}>
                                      Switch to PDF View
                                    </Button>
                                  </div>
                                );
                              }
                            })()}
                          </div>
                        </div>
                      ) : (
                        <ResumePreview
                          key={resumeDataKey + activeTheme} // Force remount on data/theme change
                          resumeData={resumeData}
                          activeTheme={activeTheme}
                          themeColors={themeColors}
                          userImage={userImage}
                        />
                      )
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
      {/* Stats Analysis Dialog */}
      <AlertDialog open={showStatsModal} onOpenChange={setShowStatsModal}>
        <AlertDialogContent className="max-w-2xl">
          <AlertDialogHeader>
            <AlertDialogTitle>Match Analysis</AlertDialogTitle>
          </AlertDialogHeader>
          <div className="py-4">
            <MatchAnalysisStats matchData={matchData} />
          </div>
          <AlertDialogFooter>
            <AlertDialogAction>Close</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

    </div>
  );
}
