"use client"

import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Download, FileText, Sparkles, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useIsCVAnalyzed } from '@/hooks/useIsCVAnalyzed';
import React, { useContext, useEffect, useState } from 'react';
import { ReadContext } from './ReadContext';
import axios from 'axios';
import jsPDF from 'jspdf';
import { getFromStorage } from '@/Cookiesmv';
import MatchAnalysisStats from './MatchAnalysisStats';
import { prompteCoverLetter } from '../Promptes/Aipromptes';
import { logger } from '@/lib/logger';

interface MatchData {
    matchScore: number;
    skillsMatch: number;
    experienceMatch: number;
    educationMatch: number;
    skillsJustification?: string;
    experienceJustification?: string;
    educationJustification?: string;
}

export default function CoverLetterGenerate() {
    const { isCVAnalyzed, isLoading: isCVLoading } = useIsCVAnalyzed();
    const router = useRouter();
    const { AnlysedCV, settings } = useContext(ReadContext);

    const [response, setResponse] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [coverLetter, setCoverLetter] = useState('');
    const [jobAnnouncement, setJobAnnouncement] = useState('');
    const [lineLimit, setLineLimit] = useState(15);
    const [showLineLimit, setShowLineLimit] = useState(false);
    const [matchData, setMatchData] = useState<MatchData | null>(null);

    useEffect(() => {
        if (!isCVLoading && !isCVAnalyzed) {
            router.push('/ReadCV');
        }
    }, [isCVLoading, isCVAnalyzed, router]);

    useEffect(() => {
        const loadData = async () => {
            if (!AnlysedCV) {
                const storedData = await getFromStorage('userData');
                if (storedData) {
                    logger.log("storedData:", storedData);
                    setResponse(storedData); // No need to JSON.stringify if it's already an object
                }
            } else {
                logger.log("AnlysedCV:", AnlysedCV);
                setResponse(AnlysedCV);
            }
        };
        loadData();
    }, [AnlysedCV]);

    if (isCVLoading) {
        return (
            <div className="flex justify-center items-center min-h-[50vh]">
                <Loader2 className="animate-spin h-8 w-8 text-primary" />
            </div>
        );
    }

    if (!isCVAnalyzed) return null;

    const generateCoverLetter = async () => {
        if (!response || !jobAnnouncement) {
            setError('Please provide both the analyzed CV and the job announcement.');
            return;
        }

        setLoading(true);
        setError('');

        try {
            const { data } = await axios.post("/api/gemini", {
                userData: jobAnnouncement,
                useCase: 'cover-letter',
                cvData: response,
                jobDescription: jobAnnouncement,
                lineLimit: lineLimit,
                language: settings?.selectedLanguage || 'english'
            });

            const responseText = data.text;
            logger.log("Raw AI Response:", responseText);

            // First, find and extract the JSON
            const jsonMatch = responseText.match(/\{[\s\S]*\}/);
            let jsonString = jsonMatch ? jsonMatch[0] : '';

            // Extract Cover Letter
            // Try explicit tags first
            let coverLetterText = '';
            const coverLetterMatch = responseText.match(/<cover_letter>\s*([\s\S]*?)\s*<\/cover_letter>/i);

            if (coverLetterMatch) {
                coverLetterText = coverLetterMatch[1].trim();
            } else {
                // FALLBACK: If AI didn't use tags, remove the JSON block and markdown, and use whatever is left over
                let remainingText = responseText.replace(jsonString, '');
                remainingText = remainingText.replace(/```(json|xml|html|text)?\s*/gi, '').replace(/```\s*/g, '');
                remainingText = remainingText.replace(/<cover_letter>/gi, '').replace(/<\/cover_letter>/gi, '');

                // Clean up any conversational filler
                remainingText = remainingText.replace(/Here is the requested (cover letter|JSON|format|analysis)[^\n]*\n/gi, '');
                coverLetterText = remainingText.trim();
            }

            logger.log('Processed JSON String:', jsonString);

            try {
                if (!jsonString) {
                    throw new Error('Could not find analysis JSON block in the AI response.');
                }

                if (!coverLetterText || coverLetterText.length < 50) {
                    throw new Error('Could not extract a valid cover letter from the AI response.');
                }

                // Super aggressive cleanup for control characters to ensure parseability
                jsonString = jsonString
                    .replace(/\\n/g, '\\\\n')
                    .replace(/\\t/g, '\\\\t')
                    .replace(/\\r/g, '\\\\r')
                    .replace(/[\x00-\x1F\x7F]/g, '');

                let parsedData = JSON.parse(jsonString);

                // Validate analysis fields
                const requiredFields = ['matchScore', 'skillsMatch', 'experienceMatch', 'educationMatch'];
                const missingFields = requiredFields.filter(field =>
                    parsedData[field] === undefined || parsedData[field] === null
                );

                if (missingFields.length > 0) {
                    throw new Error(`Missing analysis fields: ${missingFields.join(', ')}`);
                }

                // Set the data
                setMatchData(parsedData);
                setCoverLetter(coverLetterText);

            } catch (parseError: any) {
                console.error('Parse error:', parseError);
                console.error('Raw response:', responseText);

                setError(`Unable to process the AI response. ${parseError.message || 'Invalid format'}. Please try again.`);
                setCoverLetter('');
                setMatchData(null);
            }
        } catch (error) {
            console.error('Error:', error);
            setError(error instanceof Error ? error.message : 'An error occurred while generating the cover letter');
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

        lines.forEach((line: string) => {
            if (y + lineHeight > pageHeight - margin) {
                pdf.addPage();
                y = margin;
            }

            pdf.text(line, margin, y);
            y += lineHeight;
        });

        pdf.save('cover-letter.pdf');
    };

    return (
        <div className="p-4 md:p-8">
            <div className="max-w-7xl mx-auto">
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
                    <div className="lg:col-span-1">
                        <MatchAnalysisStats matchData={matchData} />
                    </div>
                </div>
            </div>
        </div>
    );
}