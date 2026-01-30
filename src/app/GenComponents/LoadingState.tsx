"use client"

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export default function LoadingState() {
  const sections = [
    'Personal Info',
    'Summary',
    'Skills',
    'Tools',
    'Experience',
    'Education',
    'Certifications',
    'Publications',
    'Awards',
  ];

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-6 w-full">
      <Card className="w-full">
        <CardHeader className="space-y-4">
          <CardTitle className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-8 w-28" />
          </CardTitle>
          <div className="flex gap-2 overflow-x-auto py-2 scrollbar-none w-full">
            {sections.map((_, index) => (
              <Skeleton key={index} className="h-9 w-24 sm:w-28 rounded-md flex-shrink-0" />
            ))}
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center space-x-3 pb-3 border-b">
              <Skeleton className="h-6 w-6 rounded-full" />
              <Skeleton className="h-8 w-48" />
            </div>
            <div className="grid gap-4 sm:gap-6 grid-cols-1 md:grid-cols-2">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <div key={i} className="space-y-2">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-10 w-full" />
                </div>
              ))}
            </div>
            <div className="flex justify-center mt-6">
              <Skeleton className="h-10 w-full sm:w-32" />
            </div>
          </div>
        </CardContent>
        <div className="px-6 py-4 flex justify-end border-t">
          <Skeleton className="h-11 w-full sm:w-32" />
        </div>
      </Card>
    </div>
  );
}
