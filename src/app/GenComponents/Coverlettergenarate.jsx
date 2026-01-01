import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Download, TrendingUp, FileText, Sparkles, CheckCircle2, AlertCircle, Info, ChevronDown, ChevronUp } from 'lucide-react';
import React, { useContext, useEffect, useState } from 'react';
import { ReadContext } from './ReadContext';
import axios from 'axios';
import jsPDF from 'jspdf';
import { getFromStorage } from '@/Cookiesmv';

export default function CoverLetterGenerate() {
    const { AnlysedCV } = useContext(ReadContext);
    const [response, setResponse] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [coverLetter, setCoverLetter] = useState('');
    const [jobAnnouncement, setJobAnnouncement] = useState('');
    const [lineLimit, setLineLimit] = useState(15);
    const [showLineLimit, setShowLineLimit] = useState(false);
    const [matchData, setMatchData] = useState(null);
    const [expandedMetric, setExpandedMetric] = useState(null);

    useEffect(() => {
        if (!AnlysedCV) {
            const storedData = getFromStorage('userData', 'userData');
            if (storedData) {
                console.log("storedData :", storedData);
                setResponse(JSON.stringify(storedData));
            }
        } else {
            console.log("AnlysedCV :", AnlysedCV);
            setResponse(AnlysedCV);
        }
    }, [AnlysedCV]);

    const generateCoverLetter = async () => {
        if (!response || !jobAnnouncement) {
            setError('Please provide both the analyzed CV and the job announcement.');
            return;
        }

        setLoading(true);
        setError('');

        try {
            const prompt = `
                You are a professional career advisor. Analyze the CV against the job announcement and provide:
                
                1. A match analysis in JSON format with these exact fields:
                {
                    "matchScore": <number 0-100>,
                    "skillsMatch": <number 0-100>,
                    "experienceMatch": <number 0-100>,
                    "educationMatch": <number 0-100>
                }
                
                2. A concise and tailored cover letter that:
                   - Is no longer than ${lineLimit} lines
                   - Highlights the most relevant skills and experiences from the CV that match the job requirements
                   - Addresses the job announcement directly, showing enthusiasm for the role and company
                   - Uses a professional and formal tone
                   - Includes a strong opening and closing statement
                   - Matches the language and style of the job announcement

                CV Data:
                ${JSON.stringify(response)}

                Job Announcement:
                ${jobAnnouncement}

                Return your response in this exact JSON format:
                {
                    "analysis": {
                        "matchScore": <number>,
                        "skillsMatch": <number>,
                        "experienceMatch": <number>,
                        "educationMatch": <number>,
                        "skillsJustification": "<brief explanation>",
                        "experienceJustification": "<brief explanation>",
                        "educationJustification": "<brief explanation>"
                    },
                    "coverLetter": "<the cover letter text>"
                }

                Important: The cover letter must not exceed ${lineLimit} lines. Ensure it is concise and well-structured.
            `;

            const { data } = await axios.post("/api/gemini", {
                userData: prompt,
                useCase: 'cover-letter',
                jobDescription: jobAnnouncement
            });
            const cleanedData = data.text.replace(/```json|```/g, '').trim();

            // Try to parse as JSON first
            try {
                const parsedData = JSON.parse(cleanedData);
                setMatchData(parsedData.analysis);
                setCoverLetter(parsedData.coverLetter);
            } catch (parseError) {
                // If not JSON, treat as plain text cover letter
                console.log('Response is not JSON, treating as plain text');
                setCoverLetter(cleanedData);
                // Set default match data if not provided
                setMatchData({
                    matchScore: 0,
                    skillsMatch: 0,
                    experienceMatch: 0,
                    educationMatch: 0,
                    skillsJustification: '',
                    experienceJustification: '',
                    educationJustification: ''
                });
            }
        } catch (error) {
            console.error('Error:', error);
            setError(error instanceof Error ? error.message : 'An error occurred');
        } finally {
            setLoading(false);
        }
    };

    const downloadPDF = () => {
        const pdf = new jsPDF({
            orientation: 'portrait',
            unit: 'mm',
            format: 'a4'
        });

        const margin = 20;
        const pageWidth = pdf.internal.pageSize.getWidth();
        const pageHeight = pdf.internal.pageSize.getHeight();
        const maxWidth = pageWidth - (margin * 2);

        pdf.setFontSize(12);
        const lines = pdf.splitTextToSize(coverLetter, maxWidth);

        let y = margin;
        const lineHeight = 7;

        lines.forEach((line, index) => {
            if (y + lineHeight > pageHeight - margin) {
                pdf.addPage();
                y = margin;
            }

            pdf.text(line, margin, y);
            y += lineHeight;
        });

        pdf.save('cover-letter.pdf');
    };

    const getScoreColor = (score) => {
        if (score >= 80) return 'text-green-600 dark:text-green-400';
        if (score >= 60) return 'text-yellow-600 dark:text-yellow-400';
        return 'text-red-600 dark:text-red-400';
    };

    const getScoreBgColor = (score) => {
        if (score >= 80) return 'from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 border-green-200 dark:border-green-800';
        if (score >= 60) return 'from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/20 border-yellow-200 dark:border-yellow-800';
        return 'from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 border-red-200 dark:border-red-800';
    };

    const getScoreLabel = (score) => {
        if (score >= 80) return 'Excellent';
        if (score >= 60) return 'Good';
        return 'Needs Improvement';
    };

    return (
        <div className="p-4 md:p-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                {/* <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center p-3 bg-blue-100 dark:bg-blue-900/30 rounded-2xl mb-4">
                        <FileText className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                    </div>
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent mb-2">
                        Cover Letter Generator
                    </h1>
                    <p className="text-muted-foreground text-lg">
                        Create a professional cover letter tailored to your dream job
                    </p>
                </div> */}

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Left Column - Input and Output */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Input Card */}
                        <Card className="shadow-lg border-2">
                            <CardHeader className="pb-4">
                                <CardTitle className="text-xl flex items-center gap-2">
                                    <Sparkles className="h-5 w-5 text-yellow-500" />
                                    Job Details
                                </CardTitle>
                                <CardDescription>
                                    Paste the job announcement to get started
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-5">
                                <div className="space-y-3">
                                    <label className="text-sm font-semibold flex items-center gap-2">
                                        <FileText className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                                        Job Announcement
                                    </label>
                                    <Textarea
                                        placeholder="Paste the complete job announcement here..."
                                        value={jobAnnouncement}
                                        onChange={(e) => setJobAnnouncement(e.target.value)}
                                        className="min-h-[140px] resize-none border-2 focus:border-blue-500 dark:focus:border-blue-400"
                                        rows={6}
                                    />
                                    <p className="text-xs text-muted-foreground">
                                        {jobAnnouncement.length} characters
                                    </p>
                                </div>

                                <Separator />

                                <div className="space-y-3">
                                    <div className="flex items-center justify-between p-3 border-2 border-dashed rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
                                        onClick={() => setShowLineLimit(!showLineLimit)}>
                                        <label className="flex items-center space-x-2 cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={showLineLimit}
                                                onChange={() => setShowLineLimit(!showLineLimit)}
                                                className="h-4 w-4 rounded border-gray-300 text-blue-600"
                                            />
                                            <span className="text-sm font-medium">Customize length</span>
                                        </label>
                                        <Badge variant="outline" className="text-xs">
                                            {showLineLimit ? 'Active' : 'Optional'}
                                        </Badge>
                                    </div>

                                    {showLineLimit && (
                                        <div className="space-y-3 p-4 border-2 rounded-lg">
                                            <div className="flex justify-between items-center">
                                                <label className="text-sm font-semibold">Maximum Lines</label>
                                                <Badge className="text-base font-bold px-3">
                                                    {lineLimit}
                                                </Badge>
                                            </div>
                                            <input
                                                type="range"
                                                min={5}
                                                max={30}
                                                value={lineLimit}
                                                onChange={(e) => setLineLimit(Number(e.target.value))}
                                                className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-gray-200 dark:bg-gray-700"
                                            />
                                            <div className="flex justify-between text-xs text-muted-foreground">
                                                <span>Brief (5)</span>
                                                <span>Standard (15)</span>
                                                <span>Detailed (30)</span>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <Button
                                    onClick={generateCoverLetter}
                                    disabled={loading || !jobAnnouncement}
                                    className="w-full h-12 text-base font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg"
                                >
                                    {loading ? (
                                        <>
                                            <div className="animate-spin mr-2 h-5 w-5 border-2 border-white border-t-transparent rounded-full" />
                                            Generating...
                                        </>
                                    ) : (
                                        <>
                                            <Sparkles className="mr-2 h-5 w-5" />
                                            Generate Cover Letter
                                        </>
                                    )}
                                </Button>

                                {error && (
                                    <div className="p-4 bg-red-50 dark:bg-red-900/20 border-2 border-red-200 dark:border-red-800 rounded-lg flex items-start gap-3">
                                        <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
                                        <div>
                                            <p className="font-semibold text-red-900 dark:text-red-200 text-sm">Error</p>
                                            <p className="text-sm text-red-700 dark:text-red-300">{error}</p>
                                        </div>
                                    </div>
                                )}
                            </CardContent>
                        </Card>

                        {/* Output Card */}
                        {coverLetter && (
                            <Card className="shadow-lg border-2">
                                <CardHeader className="pb-4">
                                    <div className="flex justify-between items-start flex-wrap gap-4">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-xl">
                                                <FileText className="h-6 w-6 text-green-600 dark:text-green-400" />
                                            </div>
                                            <div>
                                                <CardTitle className="text-xl flex items-center gap-2">
                                                    Your Cover Letter
                                                    <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400" />
                                                </CardTitle>
                                                <CardDescription>
                                                    Review and download
                                                </CardDescription>
                                            </div>
                                        </div>
                                        <Button
                                            onClick={downloadPDF}
                                            className="flex items-center gap-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 shadow-lg"
                                        >
                                            <Download size={16} />
                                            Download PDF
                                        </Button>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <Textarea
                                        value={coverLetter}
                                        onChange={(e) => setCoverLetter(e.target.value)}
                                        className="min-h-[400px] leading-relaxed border-2 focus:border-green-500 dark:focus:border-green-400 font-serif"
                                        rows={18}
                                    />
                                    <p className="text-xs text-muted-foreground mt-3">
                                        You can edit the cover letter above before downloading
                                    </p>
                                </CardContent>
                            </Card>
                        )}
                    </div>

                    {/* Right Column - Stats */}
                    <div className="lg:col-span-1 space-y-6">
                        {matchData && matchData.matchScore > 0 ? (
                            <Card className="shadow-lg border-2">
                                <CardHeader className="pb-4">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-xl">
                                            <TrendingUp className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                                        </div>
                                        <div>
                                            <CardTitle className="text-xl">Match Analysis</CardTitle>
                                            <CardDescription>Profile compatibility</CardDescription>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    {/* Overall Score - Circular Diagram */}
                                    <div className="flex flex-col items-center py-6">
                                        <div className="relative w-48 h-48">
                                            <svg className="w-48 h-48 transform -rotate-90">
                                                {/* Background circle */}
                                                <circle
                                                    cx="96"
                                                    cy="96"
                                                    r="88"
                                                    stroke="currentColor"
                                                    strokeWidth="12"
                                                    fill="none"
                                                    className="text-gray-200 dark:text-gray-700"
                                                />
                                                {/* Progress circle */}
                                                <circle
                                                    cx="96"
                                                    cy="96"
                                                    r="88"
                                                    stroke="currentColor"
                                                    strokeWidth="12"
                                                    fill="none"
                                                    strokeDasharray={`${2 * Math.PI * 88}`}
                                                    strokeDashoffset={`${2 * Math.PI * 88 * (1 - matchData.matchScore / 100)}`}
                                                    className={matchData.matchScore >= 80 ? "text-green-500" : matchData.matchScore >= 60 ? "text-yellow-500" : "text-red-500"}
                                                    strokeLinecap="round"
                                                />
                                            </svg>
                                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                                <p className={`text-5xl font-bold ${getScoreColor(matchData.matchScore)}`}>
                                                    {matchData.matchScore}%
                                                </p>
                                                <p className="text-xs font-medium text-muted-foreground mt-1">Overall Match</p>
                                            </div>
                                        </div>
                                        <Badge className="text-xs px-4 py-1 mt-4">
                                            {getScoreLabel(matchData.matchScore)}
                                        </Badge>
                                    </div>

                                    <Separator />

                                    {/* Metric Cards - Circular Diagrams */}
                                    <div className="space-y-6">
                                        {/* Skills Match */}
                                        <div className="border-2 rounded-xl overflow-hidden hover:shadow-md transition-all">
                                            <div
                                                className="flex items-center gap-4 p-4 cursor-pointer hover:bg-muted/30 transition-colors"
                                                onClick={() => setExpandedMetric(expandedMetric === 'skills' ? null : 'skills')}
                                            >
                                                <div className="relative w-20 h-20 flex-shrink-0">
                                                    <svg className="w-20 h-20 transform -rotate-90">
                                                        <circle
                                                            cx="40"
                                                            cy="40"
                                                            r="36"
                                                            stroke="currentColor"
                                                            strokeWidth="6"
                                                            fill="none"
                                                            className="text-gray-200 dark:text-gray-700"
                                                        />
                                                        <circle
                                                            cx="40"
                                                            cy="40"
                                                            r="36"
                                                            stroke="currentColor"
                                                            strokeWidth="6"
                                                            fill="none"
                                                            strokeDasharray={`${2 * Math.PI * 36}`}
                                                            strokeDashoffset={`${2 * Math.PI * 36 * (1 - matchData.skillsMatch / 100)}`}
                                                            className="text-green-500"
                                                            strokeLinecap="round"
                                                        />
                                                    </svg>
                                                    <div className="absolute inset-0 flex items-center justify-center">
                                                        <p className={`text-lg font-bold ${getScoreColor(matchData.skillsMatch)}`}>
                                                            {matchData.skillsMatch}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="flex-1">
                                                    <div className="flex items-center justify-between mb-1">
                                                        <p className="text-sm font-semibold">Skills Match</p>
                                                        <div className="flex items-center gap-2">
                                                            <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" />
                                                            {expandedMetric === 'skills' ?
                                                                <ChevronUp className="h-4 w-4 text-muted-foreground" /> :
                                                                <ChevronDown className="h-4 w-4 text-muted-foreground" />
                                                            }
                                                        </div>
                                                    </div>
                                                    <Progress value={matchData.skillsMatch} className="h-2" />
                                                </div>
                                            </div>
                                            {expandedMetric === 'skills' && matchData.skillsJustification && (
                                                <div className="px-4 pb-4 pt-2 bg-green-50/50 dark:bg-green-950/20 border-t animate-in slide-in-from-top">
                                                    <div className="flex gap-2">
                                                        <Info className="h-4 w-4 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                                                        <p className="text-sm text-muted-foreground leading-relaxed">
                                                            {matchData.skillsJustification}
                                                        </p>
                                                    </div>
                                                </div>
                                            )}
                                        </div>

                                        {/* Experience Match */}
                                        <div className="border-2 rounded-xl overflow-hidden hover:shadow-md transition-all">
                                            <div
                                                className="flex items-center gap-4 p-4 cursor-pointer hover:bg-muted/30 transition-colors"
                                                onClick={() => setExpandedMetric(expandedMetric === 'experience' ? null : 'experience')}
                                            >
                                                <div className="relative w-20 h-20 flex-shrink-0">
                                                    <svg className="w-20 h-20 transform -rotate-90">
                                                        <circle
                                                            cx="40"
                                                            cy="40"
                                                            r="36"
                                                            stroke="currentColor"
                                                            strokeWidth="6"
                                                            fill="none"
                                                            className="text-gray-200 dark:text-gray-700"
                                                        />
                                                        <circle
                                                            cx="40"
                                                            cy="40"
                                                            r="36"
                                                            stroke="currentColor"
                                                            strokeWidth="6"
                                                            fill="none"
                                                            strokeDasharray={`${2 * Math.PI * 36}`}
                                                            strokeDashoffset={`${2 * Math.PI * 36 * (1 - matchData.experienceMatch / 100)}`}
                                                            className="text-orange-500"
                                                            strokeLinecap="round"
                                                        />
                                                    </svg>
                                                    <div className="absolute inset-0 flex items-center justify-center">
                                                        <p className={`text-lg font-bold ${getScoreColor(matchData.experienceMatch)}`}>
                                                            {matchData.experienceMatch}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="flex-1">
                                                    <div className="flex items-center justify-between mb-1">
                                                        <p className="text-sm font-semibold">Experience Match</p>
                                                        <div className="flex items-center gap-2">
                                                            <CheckCircle2 className="h-4 w-4 text-orange-600 dark:text-orange-400" />
                                                            {expandedMetric === 'experience' ?
                                                                <ChevronUp className="h-4 w-4 text-muted-foreground" /> :
                                                                <ChevronDown className="h-4 w-4 text-muted-foreground" />
                                                            }
                                                        </div>
                                                    </div>
                                                    <Progress value={matchData.experienceMatch} className="h-2" />
                                                </div>
                                            </div>
                                            {expandedMetric === 'experience' && matchData.experienceJustification && (
                                                <div className="px-4 pb-4 pt-2 bg-orange-50/50 dark:bg-orange-950/20 border-t animate-in slide-in-from-top">
                                                    <div className="flex gap-2">
                                                        <Info className="h-4 w-4 text-orange-600 dark:text-orange-400 flex-shrink-0 mt-0.5" />
                                                        <p className="text-sm text-muted-foreground leading-relaxed">
                                                            {matchData.experienceJustification}
                                                        </p>
                                                    </div>
                                                </div>
                                            )}
                                        </div>

                                        {/* Education Match */}
                                        <div className="border-2 rounded-xl overflow-hidden hover:shadow-md transition-all">
                                            <div
                                                className="flex items-center gap-4 p-4 cursor-pointer hover:bg-muted/30 transition-colors"
                                                onClick={() => setExpandedMetric(expandedMetric === 'education' ? null : 'education')}
                                            >
                                                <div className="relative w-20 h-20 flex-shrink-0">
                                                    <svg className="w-20 h-20 transform -rotate-90">
                                                        <circle
                                                            cx="40"
                                                            cy="40"
                                                            r="36"
                                                            stroke="currentColor"
                                                            strokeWidth="6"
                                                            fill="none"
                                                            className="text-gray-200 dark:text-gray-700"
                                                        />
                                                        <circle
                                                            cx="40"
                                                            cy="40"
                                                            r="36"
                                                            stroke="currentColor"
                                                            strokeWidth="6"
                                                            fill="none"
                                                            strokeDasharray={`${2 * Math.PI * 36}`}
                                                            strokeDashoffset={`${2 * Math.PI * 36 * (1 - matchData.educationMatch / 100)}`}
                                                            className="text-purple-500"
                                                            strokeLinecap="round"
                                                        />
                                                    </svg>
                                                    <div className="absolute inset-0 flex items-center justify-center">
                                                        <p className={`text-lg font-bold ${getScoreColor(matchData.educationMatch)}`}>
                                                            {matchData.educationMatch}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="flex-1">
                                                    <div className="flex items-center justify-between mb-1">
                                                        <p className="text-sm font-semibold">Education Match</p>
                                                        <div className="flex items-center gap-2">
                                                            <CheckCircle2 className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                                                            {expandedMetric === 'education' ?
                                                                <ChevronUp className="h-4 w-4 text-muted-foreground" /> :
                                                                <ChevronDown className="h-4 w-4 text-muted-foreground" />
                                                            }
                                                        </div>
                                                    </div>
                                                    <Progress value={matchData.educationMatch} className="h-2" />
                                                </div>
                                            </div>
                                            {expandedMetric === 'education' && matchData.educationJustification && (
                                                <div className="px-4 pb-4 pt-2 bg-purple-50/50 dark:bg-purple-950/20 border-t animate-in slide-in-from-top">
                                                    <div className="flex gap-2">
                                                        <Info className="h-4 w-4 text-purple-600 dark:text-purple-400 flex-shrink-0 mt-0.5" />
                                                        <p className="text-sm text-muted-foreground leading-relaxed">
                                                            {matchData.educationJustification}
                                                        </p>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ) : (
                            <Card className="shadow-lg border-2 border-dashed">
                                <CardContent className="py-16 px-6">
                                    <div className="flex flex-col items-center text-center space-y-4">
                                        <div className="p-4 bg-muted/50 rounded-full">
                                            <TrendingUp className="h-12 w-12 text-muted-foreground" />
                                        </div>
                                        <div className="space-y-2">
                                            <h3 className="text-lg font-semibold">No Analysis Yet</h3>
                                            <p className="text-sm text-muted-foreground max-w-xs">
                                                Generate your cover letter to see how well your profile matches the job requirements
                                            </p>
                                        </div>
                                        <div className="pt-4 space-y-3 w-full">
                                            <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
                                                <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center flex-shrink-0">
                                                    <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400" />
                                                </div>
                                                <div className="text-left">
                                                    <p className="text-xs font-semibold">Skills Analysis</p>
                                                    <p className="text-xs text-muted-foreground">Coming soon...</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
                                                <div className="w-10 h-10 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center flex-shrink-0">
                                                    <CheckCircle2 className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                                                </div>
                                                <div className="text-left">
                                                    <p className="text-xs font-semibold">Experience Review</p>
                                                    <p className="text-xs text-muted-foreground">Coming soon...</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
                                                <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center flex-shrink-0">
                                                    <CheckCircle2 className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                                                </div>
                                                <div className="text-left">
                                                    <p className="text-xs font-semibold">Education Match</p>
                                                    <p className="text-xs text-muted-foreground">Coming soon...</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}