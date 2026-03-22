"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';

export type SectionId = 'hero' | 'about' | 'skills' | 'experience' | 'education' | 'projects' | 'additional' | 'contact';

export const ALL_SECTIONS: SectionId[] = ['hero', 'about', 'skills', 'experience', 'education', 'projects', 'additional', 'contact'];

export const defaultLightVars = {
    '--bg': '#FFFFFF',
    '--primary': '#000000',
    '--accent': '#FF3366',
    '--secondary': '#0066FF',
    '--text': '#1a1a1a',
    '--text-secondary': '#666666',
    '--border': '#000000',
    '--highlight': '#FFFF00',
    '--shadow': 'rgba(0, 0, 0, 0.1)',
    '--card-bg': '#FFFFFF',
    '--nav-bg': 'rgba(255, 255, 255, 0.85)',
    '--radius': '0px',
    '--shadow-depth': '10px',
    '--border-width': '3px',
    '--font-size-base': '16px',
    '--letter-spacing': '-1.5px',
    '--blur': '12px',
    '--grid-opacity': '0.1',
    '--font-main': "'Space Grotesk', sans-serif",
    // Western Theme Colors
    '--fg': '#3b2b1a',
    '--fg-muted': '#6b5035',
    '--accent-red': '#8b3a2b',
    '--card-border': '#8b5a2b',
    '--stamp-red': 'rgba(139, 58, 43, 0.7)',
    '--paper-bg': '#e1cda0',
    '--paper-fg': '#2c1a0c',
    '--redacted-bg': '#3b2b1a',
    '--marquee-bg': '#d4b886',
    '--marquee-item-bg': '#c9ad7d',
    '--marquee-border': '#8b5a2b',
    '--timeline-line': '#5c3e21',
    '--resp-bg': '#ecd9b3',
    '--resp-border': '#8b5a2b'
};

export const defaultDarkVars = {
    ...defaultLightVars,
    '--bg': '#0a0a0a',
    '--primary': '#ffffff',
    '--text': '#f5f5f5',
    '--text-secondary': '#a3a3a3',
    '--border': '#333333',
    '--card-bg': '#1a1a1a',
    '--nav-bg': 'rgba(10, 10, 10, 0.85)',
    '--shadow': 'rgba(0, 0, 0, 0.5)'
};

export type ThemeMode = 'light' | 'dark';

type CustomizationContextType = {
    themeVars: Record<string, string>;
    visibility: Record<SectionId, boolean>;
    order: SectionId[];
    themeMode: ThemeMode;
    isDarkMode: boolean;
    disableThemeMode: boolean;
    updateVar: (key: string, value: string) => void;
    toggleSection: (id: SectionId) => void;
    moveSection: (id: SectionId, direction: 'up' | 'down') => void;
    setThemeMode: (mode: ThemeMode) => void;
    resetAll: () => void;
    updateContent: (path: string, value: string) => void;
    updateElementStyle: (id: string, style: Record<string, string>) => void;
    contentOverrides: Record<string, string>;
    elementStyles: Record<string, Record<string, string>>;
    dynamicStyles: string;
};

const CustomizationContext = createContext<CustomizationContextType | null>(null);

export const CustomizationProvider = ({
    children,
    initialLightVars = defaultLightVars,
    initialDarkVars = defaultDarkVars,
    disableThemeMode = false
}: {
    children: React.ReactNode;
    initialLightVars?: Record<string, string>;
    initialDarkVars?: Record<string, string>;
    disableThemeMode?: boolean;
}) => {
    const [customLightVars, setCustomLightVars] = useState<Record<string, string>>({});
    const [customDarkVars, setCustomDarkVars] = useState<Record<string, string>>({});
    const [customSharedVars, setCustomSharedVars] = useState<Record<string, string>>({});
    const [contentOverrides, setContentOverrides] = useState<Record<string, string>>({});
    const [elementStyles, setElementStyles] = useState<Record<string, Record<string, string>>>({});
    const [visibility, setVisibility] = useState<Record<SectionId, boolean>>(
        ALL_SECTIONS.reduce((acc, curr) => ({ ...acc, [curr]: true }), {} as Record<SectionId, boolean>)
    );
    const [order, setOrder] = useState<SectionId[]>(ALL_SECTIONS);
    const [themeMode, setThemeMode] = useState<ThemeMode>('dark');
    const [isMounted, setIsMounted] = useState(false);

    // Initial load from localStorage if available
    useEffect(() => {
        setIsMounted(true);
        try {
            const savedCustomization = localStorage.getItem('portfolio_customization_v2');
            if (savedCustomization) {
                const parsed = JSON.parse(savedCustomization);
                if (parsed.customLightVars) setCustomLightVars(parsed.customLightVars);
                if (parsed.customDarkVars) setCustomDarkVars(parsed.customDarkVars);
                if (parsed.customSharedVars) setCustomSharedVars(parsed.customSharedVars);
                if (parsed.contentOverrides) setContentOverrides(parsed.contentOverrides);
                if (parsed.elementStyles) setElementStyles(parsed.elementStyles);
                if (parsed.visibility) setVisibility(parsed.visibility);
                if (parsed.order) setOrder(parsed.order);
                if (parsed.themeMode) setThemeMode(parsed.themeMode);
            }
        } catch (e) {
            console.error("Failed to parse customization from local storage", e);
        }
    }, []); // Only run once on mount

    const isDarkMode = !disableThemeMode && themeMode === 'dark';

    // Save to localStorage when changed
    useEffect(() => {
        if (!isMounted) return;
        localStorage.setItem('portfolio_customization_v2', JSON.stringify({
            customLightVars,
            customDarkVars,
            customSharedVars,
            contentOverrides,
            elementStyles,
            visibility,
            order,
            themeMode
        }));
    }, [customLightVars, customDarkVars, customSharedVars, contentOverrides, elementStyles, visibility, order, themeMode, isMounted]);

    useEffect(() => {
        if (disableThemeMode) return;

        if (isDarkMode) {
            document.body.classList.add('dark-mode');
        } else {
            document.body.classList.remove('dark-mode');
        }
    }, [isDarkMode, disableThemeMode]);

    const isColorVar = (key: string) => {
        const colorPrefixes = [
            '--bg', '--primary', '--accent', '--secondary', '--text',
            '--text-secondary', '--border', '--highlight', '--card-bg',
            '--nav-bg', '--obsidian', '--snow',
            '--fg', '--fg-muted', '--accent-red', '--card-border',
            '--stamp-red', '--paper-bg', '--paper-fg', '--redacted-bg',
            '--marquee-bg', '--marquee-item-bg', '--marquee-border',
            '--timeline-line', '--resp-bg', '--resp-border'
        ];
        return colorPrefixes.some(prefix => key.startsWith(prefix));
    };

    const updateVar = (key: string, value: string) => {
        if (isColorVar(key)) {
            if (isDarkMode) {
                setCustomDarkVars(prev => ({ ...prev, [key]: value }));
            } else {
                setCustomLightVars(prev => ({ ...prev, [key]: value }));
            }
        } else {
            setCustomSharedVars(prev => ({ ...prev, [key]: value }));
        }
    };

    const toggleSection = (id: SectionId) => {
        setVisibility(prev => ({ ...prev, [id]: !prev[id] }));
    };

    const updateContent = (path: string, value: string) => {
        setContentOverrides(prev => ({ ...prev, [path]: value }));
    };

    const updateElementStyle = (id: string, style: Record<string, string>) => {
        setElementStyles(prev => ({
            ...prev,
            [id]: { ...(prev[id] || {}), ...style }
        }));
    };

    const moveSection = (id: SectionId, direction: 'up' | 'down') => {
        setOrder(prev => {
            const idx = prev.indexOf(id);
            if (idx === -1) return prev;
            if (direction === 'up' && idx === 0) return prev;
            if (direction === 'down' && idx === prev.length - 1) return prev;

            const next = [...prev];
            const swapIdx = direction === 'up' ? idx - 1 : idx + 1;
            [next[idx], next[swapIdx]] = [next[swapIdx], next[idx]];
            return next;
        });
    };

    const resetAll = () => {
        setCustomLightVars({});
        setCustomDarkVars({});
        setCustomSharedVars({});
        setContentOverrides({});
        setElementStyles({});
        setVisibility(ALL_SECTIONS.reduce((acc, curr) => ({ ...acc, [curr]: true }), {} as Record<SectionId, boolean>));
        setOrder(ALL_SECTIONS);
        setThemeMode('dark');
        localStorage.removeItem('portfolio_customization_v2');
    };

    const baseThemeVars = isDarkMode ? initialDarkVars : initialLightVars;

    // Construct the active variables based on base + overrides
    const themeVars = {
        ...baseThemeVars,
        ...(isDarkMode ? customDarkVars : customLightVars),
        ...customSharedVars
    };

    const dynamicStyles = `
        :root {
            ${Object.entries(customSharedVars).map(([k, v]) => `${k}: ${v} !important;`).join('\n')}
            ${Object.entries(customLightVars).map(([k, v]) => `${k}: ${v} !important;`).join('\n')}
        }
        body.dark-mode {
            ${Object.entries(customDarkVars).map(([k, v]) => `${k}: ${v} !important;`).join('\n')}
        }
        ${Object.entries(elementStyles).map(([id, styles]) => `
            #${id} {
                ${Object.entries(styles).map(([k, v]) => `${k}: ${v} !important;`).join('\n')}
            }
        `).join('\n')}
    `;

    return (
        <CustomizationContext.Provider value={{
            themeVars,
            visibility,
            order,
            themeMode,
            isDarkMode,
            disableThemeMode,
            updateVar,
            toggleSection,
            moveSection,
            setThemeMode,
            resetAll,
            updateContent,
            updateElementStyle,
            contentOverrides,
            elementStyles,
            dynamicStyles
        }}>
            <style dangerouslySetInnerHTML={{ __html: dynamicStyles }} />
            {children}
        </CustomizationContext.Provider>
    );
};

export const useCustomization = () => {
    return useContext(CustomizationContext);
};
