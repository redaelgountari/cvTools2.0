'use client'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Button } from '@/components/ui/button'

interface ColorPickerProps {
    colors: { [key: string]: string };
    onChange: (key: string, value: string) => void;
}

export function ColorPicker({ colors, onChange }: ColorPickerProps) {
    const presetColors = [
        '#ef4444', '#f97316', '#f59e0b', '#eab308', '#84cc16', '#22c55e',
        '#10b981', '#14b8a6', '#06b6d4', '#0ea5e9', '#3b82f6', '#6366f1',
        '#8b5cf6', '#a855f7', '#d946ef', '#ec4899', '#f43f5e', '#000000',
        '#ffffff', '#6b7280'
    ]

    return (
        <div className="flex flex-wrap gap-4 p-4 border rounded-xl bg-muted/30">
            {Object.entries(colors).map(([key, value]) => (
                <div key={key} className="space-y-2">
                    <Label className="capitalize text-[10px] font-bold text-muted-foreground">{key}</Label>
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                variant="outline"
                                className="w-full justify-start gap-2 h-9 px-2"
                            >
                                <div
                                    className="h-4 w-4 rounded border shadow-sm"
                                    style={{ backgroundColor: value }}
                                />
                                <span className="font-mono text-[10px]">{value}</span>
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-64">
                            <div className="space-y-4">
                                <div className="space-y-1">
                                    <Label htmlFor={`${key}-hex`} className="text-xs">Hex Color</Label>
                                    <Input
                                        id={`${key}-hex`}
                                        value={value}
                                        onChange={(e) => onChange(key, e.target.value)}
                                        className="font-mono h-8 text-xs"
                                    />
                                </div>

                                <div className="space-y-1">
                                    <Label className="text-xs">Visual Selector</Label>
                                    <input
                                        type="color"
                                        value={value}
                                        onChange={(e) => onChange(key, e.target.value)}
                                        className="h-8 w-full cursor-pointer rounded border p-0"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label className="text-xs">Presets</Label>
                                    <div className="grid grid-cols-5 gap-1.5">
                                        {presetColors.map((presetColor) => (
                                            <button
                                                key={presetColor}
                                                className="h-6 w-6 rounded border transition-transform hover:scale-110"
                                                style={{
                                                    backgroundColor: presetColor,
                                                    borderWidth: value === presetColor ? '2px' : '1px',
                                                    borderColor: value === presetColor ? '#000' : 'rgba(0,0,0,0.1)'
                                                }}
                                                onClick={() => onChange(key, presetColor)}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </PopoverContent>
                    </Popover>
                </div>
            ))}
        </div>
    )
}