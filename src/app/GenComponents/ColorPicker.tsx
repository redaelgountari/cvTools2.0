'use client'

import { Label } from '@/components/ui/label'

interface ColorPickerProps {
    colors: { [key: string]: string };
    onChange: (key: string, value: string) => void;
}

const getFriendlyName = (key: string) => {
    switch (key) {
        case 'primary': return 'Accent';
        case 'secondary': return 'Secondary';
        case 'background': return 'Background';
        case 'text': return 'Body Text';
        case 'heading': return 'Headings';
        case 'accent': return 'Accent';
        default: return key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
    }
}

export function ColorPicker({ colors, onChange }: ColorPickerProps) {
    return (
        <div className="flex flex-wrap items-center gap-5 p-3 bg-muted/30 rounded-lg border border-border/50">
            <div className="flex flex-col gap-1 justify-center mr-2">
                <div className="flex items-center gap-1.5">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                    <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">Live</span>
                </div>
                <span className="text-[10px] text-muted-foreground">Theme Colors</span>
            </div>

            <div className="w-px h-8 bg-border border-l mx-1"></div>

            {Object.entries(colors).map(([key, value]) => (
                <div key={key} className="flex flex-col items-center gap-1.5 group">
                    <Label className="text-[9px] uppercase tracking-wider font-semibold text-muted-foreground group-hover:text-foreground transition-colors cursor-pointer">
                        {getFriendlyName(key)}
                    </Label>
                    <div
                        className="relative w-7 h-7 rounded-full shadow-sm border border-black/10 dark:border-white/10 overflow-hidden cursor-pointer hover:scale-110 transition-transform ring-2 ring-transparent group-hover:ring-primary/20"
                        title={`Change ${getFriendlyName(key)} color`}
                    >
                        <input
                            type="color"
                            value={value}
                            onChange={(e) => onChange(key, e.target.value)}
                            className="absolute inset-0 w-20 h-20 -top-2 -left-2 cursor-pointer p-0 border-0 bg-transparent"
                        />
                    </div>
                </div>
            ))}
        </div>
    )
}