import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { TrendingUp, CheckCircle2, Info, ChevronDown, ChevronUp } from 'lucide-react';
import React, { useState } from 'react';

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


export default function MatchAnalysisStats({ matchData, layout = 'horizontal' }: MatchAnalysisStatsProps) {
    const [expandedMetric, setExpandedMetric] = useState<string | null>(null);

    const getScoreColor = (score: number) => {
        if (score >= 80) return 'text-green-600 dark:text-green-400';
        if (score >= 60) return 'text-yellow-600 dark:text-yellow-400';
        return 'text-red-600 dark:text-red-400';
    };

    const getScoreLabel = (score: number) => {
        if (score >= 80) return 'Excellent';
        if (score >= 60) return 'Good';
        return 'Needs Improvement';
    };

    const getCircleColor = (score: number) => {
        if (score >= 80) return 'text-green-500';
        if (score >= 60) return 'text-yellow-500';
        return 'text-red-500';
    };

    const MetricCard = ({
        score,
        label,
        color,
        justification,
        metricKey
    }: {
        score: number;
        label: string;
        color: string;
        justification?: string;
        metricKey: string;
    }) => (
        <div className="border-2 rounded-xl overflow-hidden hover:shadow-md transition-all">
            <div
                className="flex items-center gap-4 p-4 cursor-pointer hover:bg-muted/30 transition-colors"
                onClick={() => setExpandedMetric(expandedMetric === metricKey ? null : metricKey)}
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
                            strokeDashoffset={`${2 * Math.PI * 36 * (1 - score / 100)}`}
                            className={color}
                            strokeLinecap="round"
                        />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <p className={`text-lg font-bold ${getScoreColor(score)}`}>
                            {score}
                        </p>
                    </div>
                </div>
                <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                        <p className="text-sm font-semibold">{label}</p>
                        <div className="flex items-center gap-2">
                            <CheckCircle2 className={`h-4 w-4 ${color.replace('text-', 'text-').replace('-500', '-600')} dark:${color.replace('text-', 'text-').replace('-500', '-400')}`} />
                            {expandedMetric === metricKey ?
                                <ChevronUp className="h-4 w-4 text-muted-foreground" /> :
                                <ChevronDown className="h-4 w-4 text-muted-foreground" />
                            }
                        </div>
                    </div>
                    <Progress value={score} className="h-2" />
                </div>
            </div>
            {expandedMetric === metricKey && justification && (
                <div className={`px-4 pb-4 pt-2 ${color.replace('text-', 'bg-').replace('-500', '-50/50')} dark:${color.replace('text-', 'bg-').replace('-500', '-950/20')} border-t`}>
                    <div className="flex gap-2">
                        <Info className={`h-4 w-4 ${color.replace('text-', 'text-').replace('-500', '-600')} dark:${color.replace('text-', 'text-').replace('-500', '-400')} flex-shrink-0 mt-0.5`} />
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            {justification}
                        </p>
                    </div>
                </div>
            )}
        </div>
    );

    if (!matchData || matchData.matchScore === 0) {
        return (
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
        );
    }

    // Vertical Layout
    if (layout === 'vertical') {
        return (
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
                                <circle
                                    cx="96"
                                    cy="96"
                                    r="88"
                                    stroke="currentColor"
                                    strokeWidth="12"
                                    fill="none"
                                    className="text-gray-200 dark:text-gray-700"
                                />
                                <circle
                                    cx="96"
                                    cy="96"
                                    r="88"
                                    stroke="currentColor"
                                    strokeWidth="12"
                                    fill="none"
                                    strokeDasharray={`${2 * Math.PI * 88}`}
                                    strokeDashoffset={`${2 * Math.PI * 88 * (1 - matchData.matchScore / 100)}`}
                                    className={getCircleColor(matchData.matchScore)}
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

                    {/* Metric Cards */}
                    <div className="space-y-6">
                        <MetricCard
                            score={matchData.skillsMatch}
                            label="Skills Match"
                            color="text-green-500"
                            justification={matchData.skillsJustification}
                            metricKey="skills"
                        />
                        <MetricCard
                            score={matchData.experienceMatch}
                            label="Experience Match"
                            color="text-orange-500"
                            justification={matchData.experienceJustification}
                            metricKey="experience"
                        />
                        <MetricCard
                            score={matchData.educationMatch}
                            label="Education Match"
                            color="text-purple-500"
                            justification={matchData.educationJustification}
                            metricKey="education"
                        />
                    </div>
                </CardContent>
            </Card>
        );
    }

    // Horizontal Layout
    return (
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
            <CardContent>
                <div className="flex flex-col lg:flex-row gap-6">
                    {/* Overall Score - Left Side */}
                    <div className="flex flex-col items-center justify-center lg:w-1/3 py-6 lg:border-r lg:pr-6">
                        <div className="relative w-40 h-40">
                            <svg className="w-40 h-40 transform -rotate-90">
                                <circle
                                    cx="80"
                                    cy="80"
                                    r="72"
                                    stroke="currentColor"
                                    strokeWidth="10"
                                    fill="none"
                                    className="text-gray-200 dark:text-gray-700"
                                />
                                <circle
                                    cx="80"
                                    cy="80"
                                    r="72"
                                    stroke="currentColor"
                                    strokeWidth="10"
                                    fill="none"
                                    strokeDasharray={`${2 * Math.PI * 72}`}
                                    strokeDashoffset={`${2 * Math.PI * 72 * (1 - matchData.matchScore / 100)}`}
                                    className={getCircleColor(matchData.matchScore)}
                                    strokeLinecap="round"
                                />
                            </svg>
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                <p className={`text-4xl font-bold ${getScoreColor(matchData.matchScore)}`}>
                                    {matchData.matchScore}%
                                </p>
                                <p className="text-xs font-medium text-muted-foreground mt-1">Overall</p>
                            </div>
                        </div>
                        <Badge className="text-xs px-4 py-1 mt-4">
                            {getScoreLabel(matchData.matchScore)}
                        </Badge>
                    </div>

                    {/* Metrics - Right Side */}
                    <div className="flex-1 space-y-4">
                        <MetricCard
                            score={matchData.skillsMatch}
                            label="Skills Match"
                            color="text-green-500"
                            justification={matchData.skillsJustification}
                            metricKey="skills"
                        />
                        <MetricCard
                            score={matchData.experienceMatch}
                            label="Experience Match"
                            color="text-orange-500"
                            justification={matchData.experienceJustification}
                            metricKey="experience"
                        />
                        <MetricCard
                            score={matchData.educationMatch}
                            label="Education Match"
                            color="text-purple-500"
                            justification={matchData.educationJustification}
                            metricKey="education"
                        />
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}