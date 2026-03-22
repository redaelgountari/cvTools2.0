"use client";

import React, { useState, useRef, useEffect } from 'react';
import { useCustomization } from './CustomizationContext';
import { Type, Palette, Scissors, Image as ImageIcon, Check, X, Move, Type as FontIcon } from 'lucide-react';

interface VisualEditorProps {
    id: string;
    contentPath: string;
    children: React.ReactElement;
    type?: 'text' | 'image' | 'container';
}

export const VisualEditor = ({ id, contentPath, children, type = 'text' }: VisualEditorProps) => {
    const customization = useCustomization();
    const [isEditing, setIsEditing] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [showToolbar, setShowToolbar] = useState(false);
    const [tempContent, setTempContent] = useState('');
    const containerRef = useRef<HTMLDivElement>(null);

    const { updateContent, updateElementStyle, contentOverrides, elementStyles } = customization || {};

    const currentContent = (contentOverrides && contentOverrides[contentPath]) || "";
    // Merge children props with overrides if needed, but the parent should handle the actual data injection usually.
    // However, to make it "drop-in", we can intercept children.

    useEffect(() => {
        if (isEditing) {
            setTempContent(currentContent || ((children as any).props.children as string) || "");
        }
    }, [isEditing, currentContent, (children as any).props.children]);

    const handleSave = () => {
        if (updateContent) {
            updateContent(contentPath, tempContent);
        }
        setIsEditing(false);
    };

    const handleCancel = () => {
        setIsEditing(false);
    };

    const styleTimeoutRef = useRef<any>(null);

    const handleStyleChange = (key: string, value: string) => {
        // Immediate visual feedback for some elements might be needed, 
        // but to avoid context/re-render storms, we debounce the save.
        if (styleTimeoutRef.current) clearTimeout(styleTimeoutRef.current);

        styleTimeoutRef.current = setTimeout(() => {
            if (updateElementStyle) {
                updateElementStyle(id, { [key]: value });
            }
        }, 150);
    };

    useEffect(() => {
        return () => {
            if (styleTimeoutRef.current) clearTimeout(styleTimeoutRef.current);
        };
    }, []);

    const isImage = type === 'image' || children.type === 'img';

    if (isEditing && type === 'text') {
        return (
            <div className="relative inline-block w-full" ref={containerRef}>
                <textarea
                    className="w-full p-2 bg-white/10 border-2 border-[#ff3366] text-inherit font-inherit outline-none rounded"
                    value={tempContent}
                    onChange={(e) => setTempContent(e.target.value)}
                    autoFocus
                    onBlur={(e) => {
                        // Small delay to allow clicking the Save button
                        setTimeout(() => {
                            if (!containerRef.current?.contains(document.activeElement)) {
                                handleSave();
                            }
                        }, 100);
                    }}
                />
                <div className="absolute -top-10 right-0 flex gap-1 z-[1000]">
                    <button onClick={handleSave} className="p-1 bg-green-500 text-white rounded shadow-lg"><Check size={16} /></button>
                    <button onClick={handleCancel} className="p-1 bg-red-500 text-white rounded shadow-lg"><X size={16} /></button>
                </div>
            </div>
        );
    }

    if (isEditing && isImage) {
        return (
            <div className="relative inline-block" ref={containerRef}>
                <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center p-4 z-50 rounded">
                    <input
                        type="text"
                        className="w-full p-2 mb-2 bg-black text-white border border-white/20 text-xs"
                        placeholder="Image URL..."
                        value={tempContent || ((children as any).props.src as string)}
                        onChange={(e) => setTempContent(e.target.value)}
                        autoFocus
                    />
                    <div className="flex gap-2">
                        <button onClick={handleSave} className="px-3 py-1 bg-white text-black text-xs font-bold uppercase">Save</button>
                        <button onClick={handleCancel} className="px-3 py-1 bg-red-500 text-white text-xs font-bold uppercase">Cancel</button>
                    </div>
                </div>
                {children}
            </div>
        );
    }

    // Inject the ID and the overridden content into the child
    const childProps = (children as any).props;
    const enhancedChild = React.cloneElement(children as React.ReactElement<any>, {
        id: id,
        children: !isImage && currentContent ? currentContent : childProps.children,
        src: isImage && currentContent ? currentContent : childProps.src,
        onDoubleClick: () => setIsEditing(true),
        className: `${childProps.className || ''} transition-all duration-300 ${isHovered ? 'ring-2 ring-[#ff3366] ring-offset-2 cursor-pointer' : ''}`
    });

    return (
        <div
            className="relative group/ve"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => {
                setIsHovered(false);
                setShowToolbar(false);
            }}
            onClick={() => setShowToolbar(!showToolbar)}
        >
            {enhancedChild}

            {/* Floating Toolbar */}
            {isHovered && !isEditing && (
                <div className="absolute -top-10 left-0 z-[1000] flex flex-col items-start translate-y-2 group-hover/ve:translate-y-0 transition-all duration-200">
                    {/* Hover Bridge: a transparent area that keeps the hover state active */}
                    <div className="h-4 w-full cursor-default" />

                    <div className="flex items-center gap-1 bg-black/95 border border-white/20 p-1.5 rounded-lg shadow-2xl scale-90 group-hover/ve:scale-100 transition-all duration-200 origin-bottom-left backdrop-blur-md">
                        <button
                            onClick={(e) => { e.stopPropagation(); setIsEditing(true); }}
                            className="p-1.5 hover:bg-white/10 text-white rounded transition-colors"
                            title="Edit Content"
                        >
                            {isImage ? <ImageIcon size={14} /> : <Type size={14} />}
                        </button>

                        {!isImage && (
                            <>
                                <div className="w-[1px] h-4 bg-white/20 mx-1" />
                                <div className="flex items-center gap-2 px-1">
                                    <select
                                        onChange={(e) => handleStyleChange('font-size', e.target.value)}
                                        className="bg-transparent text-[10px] text-white border-none outline-none cursor-pointer hover:bg-white/5 p-1 rounded"
                                        onClick={(e) => e.stopPropagation()}
                                        defaultValue={elementStyles?.[id]?.['font-size'] || ''}
                                    >
                                        <option value="" className="bg-neutral-900">Size</option>
                                        <option value="12px" className="bg-neutral-900">12</option>
                                        <option value="16px" className="bg-neutral-900">16</option>
                                        <option value="20px" className="bg-neutral-900">20</option>
                                        <option value="24px" className="bg-neutral-900">24</option>
                                        <option value="32px" className="bg-neutral-900">32</option>
                                        <option value="48px" className="bg-neutral-900">48</option>
                                        <option value="64px" className="bg-neutral-900">64</option>
                                    </select>

                                    <div className="relative flex items-center justify-center w-6 h-6 rounded-full border border-white/20 hover:border-white/40 overflow-hidden">
                                        <input
                                            type="color"
                                            onChange={(e) => handleStyleChange('color', e.target.value)}
                                            className="absolute inset-0 w-full h-full scale-150 cursor-pointer border-none p-0 outline-none"
                                            title="Text Color"
                                            onClick={(e) => e.stopPropagation()}
                                            defaultValue={elementStyles?.[id]?.['color'] || '#ffffff'}
                                        />
                                    </div>
                                </div>
                            </>
                        )}

                        <div className="w-[1px] h-4 bg-white/20 mx-1" />

                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                if (updateElementStyle) updateElementStyle(id, { 'display': 'none' });
                            }}
                            className="p-1.5 hover:bg-red-500/80 text-white rounded transition-colors"
                            title="Hide Element"
                        >
                            <Scissors size={14} />
                        </button>
                    </div>
                </div>
            )}

            {/* Small indicator label */}
            {isHovered && !isEditing && (
                <div className="absolute -bottom-6 left-0 px-2 py-0.5 bg-[#ff3366] text-white text-[8px] font-bold uppercase tracking-tighter rounded opacity-0 group-hover/ve:opacity-100 transition-opacity whitespace-nowrap z-[1000]">
                    Path: {contentPath}
                </div>
            )}
        </div>
    );
};
