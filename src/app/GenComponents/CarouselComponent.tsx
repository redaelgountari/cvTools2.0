// CarouselComponent.js
"use client";

import React from 'react';
import { 
    Carousel, 
    CarouselContent, 
    CarouselItem, 
    CarouselNext, 
    CarouselPrevious 
} from '@/components/ui/carousel';
import { Card, CardContent } from '@/components/ui/card';

export default function CarouselComponent({ activeTheme, setActiveTheme }) {
    const themes = [
        { id: 'theme1', name: 'Modern' },
        { id: 'theme2', name: 'Professional' },
        { id: 'theme3', name: 'Classic' },
        { id: 'theme4', name: 'Creative' },
        { id: 'theme5', name: 'Minimal' },
    ];

    return (
        <Carousel
            opts={{
                align: "start",
            }}
            className="w-full max-w-sm"
        >
            <CarouselContent>
                {themes.map((theme, index) => (
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
    );
}