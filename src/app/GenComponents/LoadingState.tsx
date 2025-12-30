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
    <div className="max-w-4xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-8 w-28" />
          </CardTitle>
          <div className="flex gap-2 overflow-x-auto py-2">
            {sections.map((_, index) => (
              <Skeleton key={index} className="h-9 w-28 rounded-md" />
            ))}
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <div key={i} className="space-y-2">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-10 w-full" />
                </div>
              ))}
            </div>
            <div className="flex justify-center mt-4">
              <Skeleton className="h-10 w-32" />
            </div>
          </div>
        </CardContent>
        <div className="px-6 py-4 flex justify-end">
          <Skeleton className="h-10 w-24" />
        </div>
      </Card>
    </div>
  );
}
