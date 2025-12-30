import React from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';

const LoadingTexteria = () => {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card>
        <CardHeader className="space-y-4">
          {/* Title skeleton */}
          <div className="h-8 w-48 bg-gray-200 rounded-md animate-pulse" />
          
          {/* Navigation buttons skeleton */}
          <div className="flex gap-2 overflow-x-auto py-2">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="h-10 w-24 bg-gray-200 rounded-md animate-pulse"
              />
            ))}
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Content sections */}
          <div className="grid gap-4 md:grid-cols-2">
            {/* Input field skeletons */}
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="space-y-2">
                <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
                <div className="h-10 w-full bg-gray-200 rounded-md animate-pulse" />
              </div>
            ))}
            
            {/* Full width input skeleton */}
            <div className="space-y-2 md:col-span-2">
              <div className="h-4 w-32 bg-gray-200 rounded animate-pulse" />
              <div className="h-10 w-full bg-gray-200 rounded-md animate-pulse" />
            </div>
            
            <div className="space-y-2 md:col-span-2">
              <div className="h-4 w-40 bg-gray-200 rounded animate-pulse" />
              <div className="h-32 w-full bg-gray-200 rounded-md animate-pulse" />
            </div>
          </div>
          
          {/* Cards section skeleton */}
          {/* <div className="space-y-6">
            {[1, 2].map((card) => (
              <Card key={card} className="overflow-hidden">
                <CardHeader>
                  <div className="h-6 w-32 bg-gray-200 rounded animate-pulse" />
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    {[1, 2, 3, 4].map((item) => (
                      <div key={item} className="space-y-2">
                        <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
                        <div className="h-10 w-full bg-gray-200 rounded-md animate-pulse" />
                      </div>
                    ))}
                    <div className="space-y-2 md:col-span-2">
                      <div className="h-4 w-32 bg-gray-200 rounded animate-pulse" />
                      <div className="h-24 w-full bg-gray-200 rounded-md animate-pulse" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div> */}
        </CardContent>
      </Card>
    </div>
  );
};

export default LoadingTexteria;