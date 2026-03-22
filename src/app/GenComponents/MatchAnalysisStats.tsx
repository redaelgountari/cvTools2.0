"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { TrendingUp, CheckCircle2, Info, ChevronDown, ChevronUp, Target, BarChart3, Award } from 'lucide-react';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

interface MatchData {
    matchScore: number;
    skillsMatch: number;
    experienceMatch: number;
    educationMatch: number;
    skillsJustification?: string;
    experienceJustification?: string;
    educationJustification?: string;
}

interface MatchAnalysisStatsProps {
    matchData: MatchData | null;
    layout?: 'horizontal' | 'vertical';
}

export default function MatchAnalysisStats({ matchData, layout = 'vertical' }: MatchAnalysisStatsProps) {
    const [expandedMetric, setExpandedMetric] = useState<string | null>(null);

    const getScoreColor = (score: number) => {
        if (score >= 80) return 'text-emerald-600 dark:text-emerald-400';
        if (score >= 60) return 'text-amber-600 dark:text-amber-400';
        return 'text-rose-600 dark:text-rose-400';
    };

    const getScoreBg = (score: number) => {
        if (score >= 80) return 'bg-emerald-50 dark:bg-emerald-950/30';
        if (score >= 60) return 'bg-amber-50 dark:bg-amber-950/30';
        return 'bg-rose-50 dark:bg-rose-950/30';
    };

    const getScoreBorder = (score: number) => {
        if (score >= 80) return 'border-emerald-200 dark:border-emerald-800/50';
        if (score >= 60) return 'border-amber-200 dark:border-amber-800/50';
        return 'border-rose-200 dark:border-rose-800/50';
    };

    const getScoreLabel = (score: number) => {
        if (score >= 80) return 'Excellent Match';
        if (score >= 60) return 'Good Match';
        return 'Improvement Recommended';
    };

    const MetricCard = ({
        score,
        label,
        icon: Icon,
        justification,
        metricKey,
        isCompact = false
    }: {
        score: number;
        label: string;
        icon: any;
        justification?: string;
        metricKey: string;
        isCompact?: boolean;
    }) => {
        const isExpanded = expandedMetric === metricKey;
        const colorClass = getScoreColor(score);
        const bgClass = getScoreBg(score);
        const borderClass = getScoreBorder(score);

        return (
            <motion.div
                layout
                className={cn(
                    "border-2 rounded-2xl overflow-hidden transition-all duration-300",
                    isExpanded ? "shadow-md ring-1 ring-primary/10" : "hover:border-primary/20"
                )}
            >
                <div
                    className={cn(
                        "flex items-center gap-4 cursor-pointer hover:bg-muted/30 transition-colors",
                        isCompact ? "p-3" : "p-4"
                    )}
                    onClick={() => setExpandedMetric(isExpanded ? null : metricKey)}
                >
                    <div className={cn("relative flex-shrink-0", isCompact ? "w-10 h-10" : "w-12 h-12")}>
                        <svg className={cn("transform -rotate-90", isCompact ? "w-10 h-10" : "w-12 h-12")}>
                            <circle
                                cx={isCompact ? "20" : "24"}
                                cy={isCompact ? "20" : "24"}
                                r={isCompact ? "18" : "20"}
                                stroke="currentColor"
                                strokeWidth="3"
                                fill="none"
                                className="text-muted/30"
                            />
                            <motion.circle
                                initial={{ strokeDashoffset: 125 }}
                                animate={{ strokeDashoffset: 125 * (1 - score / 100) }}
                                transition={{ duration: 1, ease: "easeOut" }}
                                cx={isCompact ? "20" : "24"}
                                cy={isCompact ? "20" : "24"}
                                r={isCompact ? "18" : "20"}
                                stroke="currentColor"
                                strokeWidth="3"
                                fill="none"
                                strokeDasharray="125"
                                className={colorClass}
                                strokeLinecap="round"
                            />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <span className={cn("font-bold", isCompact ? "text-xs" : "text-sm", colorClass)}>
                                {score}%
                            </span>
                        </div>
                    </div>

                    <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                            <div className="flex items-center gap-2 overflow-hidden">
                                <Icon className={cn("flex-shrink-0", isCompact ? "h-4 w-4" : "h-5 w-5", colorClass)} />
                                <p className={cn("font-bold truncate", isCompact ? "text-sm" : "text-base")}>{label}</p>
                            </div>
                            <div className="flex items-center gap-2 ml-2">
                                {isExpanded ?
                                    <ChevronUp className="h-3 w-3 text-muted-foreground" /> :
                                    <ChevronDown className="h-3 w-3 text-muted-foreground" />
                                }
                            </div>
                        </div>
                        <Progress value={score} className="h-1" />
                    </div>
                </div>

                <AnimatePresence>
                    {isExpanded && justification && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                        >
                            <div className={cn("px-4 pb-3 pt-2 border-t text-sm leading-relaxed", bgClass, borderClass)}>
                                <div className="flex gap-3">
                                    <Info className={cn("h-4 w-4 flex-shrink-0 mt-0.5", colorClass)} />
                                    <p className="text-foreground/80 italic font-medium">
                                        {justification}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        );
    };

    if (!matchData || matchData.matchScore === 0) {
        return (
            <Card className="shadow-lg border-2 border-dashed overflow-hidden">
                <CardContent className="py-8 px-6">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="flex flex-col items-center text-center space-y-4"
                    >
                        <div className="p-3 bg-primary/10 rounded-full text-primary">
                            <TrendingUp className="h-8 w-8" />
                        </div>
                        <div className="space-y-1">
                            <h3 className="text-base font-bold">Analysis Pending</h3>
                            <p className="text-xs text-muted-foreground max-w-xs">
                                Generate your content to see resonance analysis.
                            </p>
                        </div>
                    </motion.div>
                </CardContent>
            </Card>
        );
    }

    const HorizontalLayout = () => (
        <Card className="shadow-xl border-2 overflow-hidden bg-card/50 backdrop-blur-sm">
            <CardContent className="p-4 sm:p-6">
                <div className="flex flex-col md:flex-row items-center gap-8">
                    {/* Overall Score */}
                    <div className="flex flex-col items-center shrink-0">
                        <div className="relative w-32 h-32">
                            <svg className="w-32 h-32 transform -rotate-90">
                                <circle cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="6" fill="none" className="text-muted/20" />
                                <motion.circle
                                    initial={{ strokeDashoffset: 365 }}
                                    animate={{ strokeDashoffset: 365 * (1 - matchData.matchScore / 100) }}
                                    transition={{ duration: 1.5, ease: "circOut" }}
                                    cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="8" fill="none" strokeDasharray="365" className={getScoreColor(matchData.matchScore)} strokeLinecap="round"
                                />
                            </svg>
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                <span className={cn("text-4xl font-black tracking-tighter", getScoreColor(matchData.matchScore))}>
                                    {matchData.matchScore}%
                                </span>
                                <span className="text-[8px] font-bold uppercase tracking-widest text-muted-foreground">Match</span>
                            </div>
                        </div>
                        <Badge variant="outline" className={cn("mt-4 px-3 py-1 border-2 text-[10px] font-black shadow-sm", getScoreColor(matchData.matchScore), getScoreBorder(matchData.matchScore))}>
                            {getScoreLabel(matchData.matchScore)}
                        </Badge>
                    </div>

                    <Separator orientation="vertical" className="hidden md:block h-32" />

                    {/* Breakdown */}
                    <div className="flex-1 w-full space-y-4">
                        <div className="flex items-center gap-2 mb-2">
                            <TrendingUp className="h-5 w-5 text-primary" />
                            <h3 className="text-sm font-black uppercase tracking-widest opacity-60">Compatibility Breakdown</h3>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-start">
                            <MetricCard score={matchData.skillsMatch} label="Skills" icon={Target} justification={matchData.skillsJustification} metricKey="skills" isCompact />
                            <MetricCard score={matchData.experienceMatch} label="Experience" icon={BarChart3} justification={matchData.experienceJustification} metricKey="experience" isCompact />
                            <MetricCard score={matchData.educationMatch} label="Education" icon={Award} justification={matchData.educationJustification} metricKey="education" isCompact />
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );

    const VerticalLayout = () => (
        <Card className="shadow-xl border-2 overflow-hidden bg-card/50 backdrop-blur-sm">
            <CardHeader className="pb-4 relative">
                <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-primary/10 rounded-2xl">
                        <TrendingUp className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                        <CardTitle className="text-base font-bold">Match Analysis</CardTitle>
                        <CardDescription className="text-[10px] uppercase tracking-wider font-semibold opacity-70">AI-Powered Insights</CardDescription>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="flex flex-col items-center bg-muted/30 rounded-3xl p-6 relative overflow-hidden group">
                    <div className="relative w-32 h-32">
                        <svg className="w-32 h-32 transform -rotate-90">
                            <circle cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="6" fill="none" className="text-muted/20" />
                            <motion.circle
                                initial={{ strokeDashoffset: 365 }}
                                animate={{ strokeDashoffset: 365 * (1 - matchData.matchScore / 100) }}
                                transition={{ duration: 1.5, ease: "circOut" }}
                                cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="8" fill="none" strokeDasharray="365" className={getScoreColor(matchData.matchScore)} strokeLinecap="round"
                            />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <span className={cn("text-4xl font-black tracking-tighter", getScoreColor(matchData.matchScore))}>
                                {matchData.matchScore}%
                            </span>
                        </div>
                    </div>
                    <Badge variant="outline" className={cn("mt-4 px-3 py-1 border-2 text-[10px] font-bold shadow-sm", getScoreColor(matchData.matchScore), getScoreBorder(matchData.matchScore))}>
                        {getScoreLabel(matchData.matchScore)}
                    </Badge>
                </div>
                <div className="space-y-3">
                    <MetricCard score={matchData.skillsMatch} label="Skills Alignment" icon={Target} justification={matchData.skillsJustification} metricKey="skills" />
                    <MetricCard score={matchData.experienceMatch} label="Experience Level" icon={BarChart3} justification={matchData.experienceJustification} metricKey="experience" />
                    <MetricCard score={matchData.educationMatch} label="Education Relevance" icon={Award} justification={matchData.educationJustification} metricKey="education" />
                </div>
            </CardContent>
        </Card>
    );

    return layout === 'horizontal' ? <HorizontalLayout /> : <VerticalLayout />;
}
