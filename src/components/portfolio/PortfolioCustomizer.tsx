"use client";

import React, { useState, useEffect } from 'react';
import { Settings, X, ChevronUp, ChevronDown, Eye, EyeOff, RotateCcw, Palette, Type, LayoutTemplate, Layers, Moon, Sun } from 'lucide-react';
import { useCustomization, SectionId } from './CustomizationContext';

const DebouncedColorPicker = ({ label, targetKey, value, onChange }: { label: string, targetKey: string, value: string, onChange: (key: string, val: string) => void }) => {
    const getValidHex = (raw: string) => {
        if (!raw) return '#000000';
        const val = raw.trim();
        if (/^#[0-9a-fA-F]{6}$/i.test(val)) return val;
        if (/^#[0-9a-fA-F]{3}$/i.test(val)) return '#' + val[1] + val[1] + val[2] + val[2] + val[3] + val[3];

        // Handle rgb/rgba
        const rgbMatch = val.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*[\d.]+)?\)$/i);
        if (rgbMatch) {
            const r = parseInt(rgbMatch[1]).toString(16).padStart(2, '0');
            const g = parseInt(rgbMatch[2]).toString(16).padStart(2, '0');
            const b = parseInt(rgbMatch[3]).toString(16).padStart(2, '0');
            return `#${r}${g}${b}`;
        }

        return '#000000';
    };

    const [localValue, setLocalValue] = useState(getValidHex(value));

    useEffect(() => {
        setLocalValue(getValidHex(value));
    }, [value]);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (localValue !== getValidHex(value)) {
                onChange(targetKey, localValue);
            }
        }, 150);
        return () => clearTimeout(timer);
    }, [localValue, targetKey, value, onChange]);

    return (
        <div className="flex items-center justify-between">
            <label className="text-sm font-medium">{label}</label>
            <div className="flex items-center gap-3">
                <span className="text-xs font-mono text-zinc-400 w-20 truncate text-right">{value}</span>
                <input
                    type="color"
                    value={localValue}
                    onChange={(e) => setLocalValue(e.target.value)}
                    className="w-8 h-8 rounded cursor-pointer border-0 p-0 shrink-0"
                />
            </div>
        </div>
    );
};

export const PortfolioCustomizer = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [activeTab, setActiveTab] = useState<'colors' | 'typography' | 'layout' | 'sections'>('colors');
    const context = useCustomization();

    if (!context) return null;

    const {
        themeVars,
        isDarkMode,
        themeMode,
        updateVar,
        setThemeMode,
        resetAll,
        visibility,
        order,
        toggleSection,
        moveSection,
        disableThemeMode
    } = context;

    const tabs = [
        { id: 'colors', icon: Palette, label: 'Colors' },
        { id: 'typography', icon: Type, label: 'Type' },
        { id: 'layout', icon: LayoutTemplate, label: 'Layout' },
        { id: 'sections', icon: Layers, label: 'Sections' }
    ] as const;

    const fonts = [
        "'Space Grotesk', sans-serif",
        "'Inter', sans-serif",
        "'Cormorant Garamond', serif",
        "'Space Mono', monospace",
        "'Archivo Black', sans-serif",
        "'JetBrains Mono', monospace"
    ];

    return (
        <>
            {/* Toggle Button */}
            <button
                onClick={() => setIsOpen(true)}
                className={`fixed left-0 top-1/2 -translate-y-1/2 z-[10002] flex items-center justify-center w-14 h-14 bg-black text-white hover:bg-[#FF3366] transition-colors rounded-r-xl shadow-2xl ${isOpen ? '-translate-x-full' : 'translate-x-0'}`}
                aria-label="Open Customizer"
            >
                <Settings className="w-6 h-6 animate-[spin_4s_linear_infinite]" />
            </button>

            {/* Customizer Panel */}
            <div className={`fixed top-0 right-0 h-full w-[360px] max-w-full bg-white dark:bg-zinc-950 border-l border-zinc-200 dark:border-zinc-800 shadow-2xl z-[20000] transition-transform duration-500 flex flex-col ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>

                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900">
                    <div>
                        <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                            <Settings className="w-5 h-5" /> Portfolio Studio
                        </h2>
                        <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 uppercase tracking-widest">Global Editor</p>
                    </div>
                    <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-zinc-200 dark:hover:bg-zinc-800 rounded-lg transition-colors text-zinc-500">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Tabs */}
                <div className="flex border-b border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900/50">
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex flex-col items-center gap-1.5 flex-1 py-3 text-xs font-semibold transition-colors
                                ${activeTab === tab.id
                                    ? 'text-[#FF3366] border-b-2 border-[#FF3366] bg-white dark:bg-zinc-950'
                                    : 'text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-300 hover:bg-white/50 dark:hover:bg-zinc-800/50 border-b-2 border-transparent'
                                }`}
                        >
                            <tab.icon className="w-4 h-4" />
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-6 bg-white dark:bg-zinc-950 text-zinc-800 dark:text-zinc-200">

                    {/* COLORS TAB */}
                    {activeTab === 'colors' && (
                        <div className="space-y-8">
                            {!disableThemeMode && (
                                <div>
                                    <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-500 mb-4 inline-flex items-center gap-2">
                                        <Moon className="w-3 h-3" /> Base Mode
                                    </h3>
                                    <div className="flex bg-zinc-100 dark:bg-zinc-900 rounded-lg p-1">
                                        {(['light', 'dark'] as const).map(mode => (
                                            <button
                                                key={mode}
                                                onClick={() => setThemeMode(mode)}
                                                className={`flex-1 flex items-center justify-center gap-2 py-2 text-xs font-semibold uppercase tracking-wider rounded-md transition-all ${themeMode === mode ? 'bg-white shadow dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100' : 'text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300'}`}
                                            >
                                                {mode === 'light' && <Sun className="w-3 h-3" />}
                                                {mode === 'dark' && <Moon className="w-3 h-3" />}
                                                {mode}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            <div className="space-y-4">
                                <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-500 inline-flex items-center gap-2">
                                    <Palette className="w-3 h-3" /> Core Palette
                                </h3>

                                <div className="space-y-3">
                                    {[
                                        { key: '--bg', label: 'Background' },
                                        { key: '--fg', label: 'Text Core' },
                                        { key: '--fg-muted', label: 'Muted Text' },
                                        { key: '--accent-red', label: 'Western Accent' },
                                        { key: '--primary', label: 'Primary Detail' },
                                        { key: '--accent', label: 'Accent' },
                                        { key: '--secondary', label: 'Secondary / Overlay' },
                                        { key: '--text', label: 'Text Output' },
                                        { key: '--text-secondary', label: 'Muted Text (Alt)' },
                                        { key: '--border', label: 'Border Color' },
                                        { key: '--card-border', label: 'Western Border' },
                                        { key: '--highlight', label: 'Highlight Element' },
                                        { key: '--card-bg', label: 'Card Surface' },
                                        { key: '--nav-bg', label: 'Navigation BG' },
                                        { key: '--stamp-red', label: 'Stamp/Seal Red' },
                                        { key: '--paper-bg', label: 'Paper Base' },
                                        { key: '--paper-fg', label: 'Typewriter Text' },
                                        { key: '--redacted-bg', label: 'Redacted Fill' },
                                        { key: '--marquee-bg', label: 'Marquee Strip' },
                                        { key: '--marquee-item-bg', label: 'Marquee Tag' },
                                        { key: '--marquee-border', label: 'Marquee Border' },
                                        { key: '--timeline-line', label: 'Timeline Path' },
                                        { key: '--resp-bg', label: 'Dialog Bubble BG' },
                                        { key: '--resp-border', label: 'Dialog Border' },
                                        { key: '--obsidian', label: 'Obsidian Base (Lux)' },
                                        { key: '--snow', label: 'Snow Contrast (Lux)' }
                                    ].map(({ key, label }) => {
                                        const rawValue = themeVars[key];
                                        if (rawValue === undefined) return null;

                                        return (
                                            <DebouncedColorPicker
                                                key={key}
                                                label={label}
                                                targetKey={key}
                                                value={rawValue}
                                                onChange={updateVar}
                                            />
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* TYPOGRAPHY TAB */}
                    {activeTab === 'typography' && (
                        <div className="space-y-8">
                            <div className="space-y-4">
                                <label className="text-xs font-bold uppercase tracking-wider text-zinc-500">Global Font Family</label>
                                <select
                                    value={themeVars['--font-main'] || "'Space Grotesk', sans-serif"}
                                    onChange={(e) => updateVar('--font-main', e.target.value)}
                                    className="w-full p-3 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg text-sm focus:outline-none focus:border-[#FF3366]"
                                >
                                    {fonts.map(f => <option key={f} value={f}>{f.split(',')[0].replace(/'/g, '')}</option>)}
                                </select>
                            </div>

                            <div className="space-y-4">
                                <div className="flex justify-between">
                                    <label className="text-xs font-bold uppercase tracking-wider text-zinc-500">Base Size</label>
                                    <span className="text-xs font-mono">{themeVars['--font-size-base'] || '16px'}</span>
                                </div>
                                <input
                                    type="range" min="12" max="24" step="1"
                                    value={parseInt(themeVars['--font-size-base'] || '16')}
                                    onChange={(e) => updateVar('--font-size-base', `${e.target.value}px`)}
                                    className="w-full accent-[#FF3366]"
                                />
                            </div>

                            <div className="space-y-4">
                                <div className="flex justify-between">
                                    <label className="text-xs font-bold uppercase tracking-wider text-zinc-500">Letter Spacing</label>
                                    <span className="text-xs font-mono">{themeVars['--letter-spacing'] || '-1.5px'}</span>
                                </div>
                                <input
                                    type="range" min="-5" max="10" step="0.5"
                                    value={parseFloat(themeVars['--letter-spacing'] || '-1.5')}
                                    onChange={(e) => updateVar('--letter-spacing', `${e.target.value}px`)}
                                    className="w-full accent-[#FF3366]"
                                />
                            </div>
                        </div>
                    )}

                    {/* LAYOUT TAB */}
                    {activeTab === 'layout' && (
                        <div className="space-y-8">
                            <div className="space-y-4">
                                <div className="flex justify-between">
                                    <label className="text-xs font-bold uppercase tracking-wider text-zinc-500">Border Radius</label>
                                    <span className="text-xs font-mono">{themeVars['--radius'] || '0px'}</span>
                                </div>
                                <input
                                    type="range" min="0" max="40" step="2"
                                    value={parseInt(themeVars['--radius'] || '0')}
                                    onChange={(e) => updateVar('--radius', `${e.target.value}px`)}
                                    className="w-full accent-[#FF3366]"
                                />
                            </div>

                            <div className="space-y-4">
                                <div className="flex justify-between">
                                    <label className="text-xs font-bold uppercase tracking-wider text-zinc-500">Border Width</label>
                                    <span className="text-xs font-mono">{themeVars['--border-width'] || '3px'}</span>
                                </div>
                                <input
                                    type="range" min="0" max="10" step="1"
                                    value={parseInt(themeVars['--border-width'] || '3')}
                                    onChange={(e) => updateVar('--border-width', `${e.target.value}px`)}
                                    className="w-full accent-[#FF3366]"
                                />
                            </div>

                            <div className="space-y-4">
                                <div className="flex justify-between">
                                    <label className="text-xs font-bold uppercase tracking-wider text-zinc-500">Grid Opacity</label>
                                    <span className="text-xs font-mono">{themeVars['--grid-opacity'] || '0.1'}</span>
                                </div>
                                <input
                                    type="range" min="0" max="1" step="0.05"
                                    value={parseFloat(themeVars['--grid-opacity'] || '0.1')}
                                    onChange={(e) => updateVar('--grid-opacity', `${e.target.value}`)}
                                    className="w-full accent-[#FF3366]"
                                />
                            </div>
                        </div>
                    )}

                    {/* SECTIONS TAB */}
                    {activeTab === 'sections' && (
                        <div className="space-y-2">
                            <p className="text-xs text-zinc-500 mb-6 font-medium">Reorder and toggle visibility of layout blocks.</p>

                            {order.map((sectionId, index) => (
                                <div key={sectionId} className={`flex items-center justify-between p-3 border rounded-lg transition-colors
                                    ${visibility[sectionId] ? 'bg-zinc-50 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800' : 'bg-transparent border-dashed border-zinc-200 dark:border-zinc-800 opacity-60'}
                                `}>
                                    <span className="text-sm font-semibold capitalize flex items-center gap-3">
                                        <span className="font-mono text-xs opacity-50 w-4">{index + 1}.</span>
                                        {sectionId}
                                    </span>

                                    <div className="flex items-center gap-1">
                                        <button
                                            onClick={() => toggleSection(sectionId)}
                                            className="p-1.5 hover:bg-zinc-200 dark:hover:bg-zinc-800 rounded transition-colors mr-2"
                                        >
                                            {visibility[sectionId] ? <Eye className="w-4 h-4 text-[#FF3366]" /> : <EyeOff className="w-4 h-4" />}
                                        </button>

                                        <div className="flex flex-col">
                                            <button
                                                onClick={() => moveSection(sectionId, 'up')}
                                                disabled={index === 0}
                                                className="p-0.5 hover:bg-zinc-200 dark:hover:bg-zinc-800 rounded disabled:opacity-30"
                                            >
                                                <ChevronUp className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() => moveSection(sectionId, 'down')}
                                                disabled={index === order.length - 1}
                                                className="p-0.5 hover:bg-zinc-200 dark:hover:bg-zinc-800 rounded disabled:opacity-30"
                                            >
                                                <ChevronDown className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="p-6 border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950">
                    <button
                        onClick={resetAll}
                        className="w-full py-3 flex items-center justify-center gap-2 font-mono text-xs uppercase tracking-widest text-zinc-500 hover:text-black dark:hover:text-white hover:bg-zinc-200 dark:hover:bg-zinc-800 rounded-lg transition-colors"
                    >
                        <RotateCcw className="w-3.5 h-3.5" /> Factory Reset
                    </button>
                </div>
            </div>

            {/* Backdrop */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[19999]"
                    onClick={() => setIsOpen(false)}
                />
            )}
        </>
    );
};
