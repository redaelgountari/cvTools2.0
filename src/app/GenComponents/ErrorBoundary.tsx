"use client"

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertCircle, RefreshCw } from 'lucide-react';

interface Props {
    children: React.ReactNode;
    fallback?: React.ReactNode;
}

interface State {
    hasError: boolean;
    error?: Error;
}

export class ErrorBoundary extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        console.error('ErrorBoundary caught:', error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return this.props.fallback || (
                <div className="flex items-center justify-center min-h-[400px] p-8">
                    <Card className="max-w-md w-full">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-destructive">
                                <AlertCircle className="h-5 w-5" />
                                Something went wrong
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <p className="text-sm text-muted-foreground">
                                An unexpected error occurred. Please try refreshing the page.
                            </p>
                            {this.state.error && (
                                <details className="text-xs text-muted-foreground">
                                    <summary className="cursor-pointer hover:text-foreground">Technical details</summary>
                                    <pre className="mt-2 p-2 bg-muted rounded text-xs overflow-auto max-h-32">
                                        {this.state.error.message}
                                    </pre>
                                </details>
                            )}
                            <Button
                                onClick={() => {
                                    this.setState({ hasError: false });
                                    window.location.reload();
                                }}
                                className="w-full"
                            >
                                <RefreshCw className="h-4 w-4 mr-2" />
                                Refresh Page
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            );
        }

        return this.props.children;
    }
}
