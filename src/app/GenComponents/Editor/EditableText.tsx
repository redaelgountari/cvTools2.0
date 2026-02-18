"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

interface EditableTextProps {
    value: string;
    onSave: (newValue: string) => void;
    className?: string;
    style?: React.CSSProperties;
    multiline?: boolean;
    placeholder?: string;
}

export const EditableText = ({
    value,
    onSave,
    className = "",
    style = {},
    multiline = false,
    placeholder = "Click to edit..."
}: EditableTextProps) => {
    const [isEditing, setIsEditing] = useState(false);
    const [currentValue, setCurrentValue] = useState(value);
    const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);

    useEffect(() => {
        setCurrentValue(value);
    }, [value]);

    useEffect(() => {
        if (isEditing && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isEditing]);

    const handleBlur = () => {
        setIsEditing(false);
        if (currentValue !== value) {
            onSave(currentValue);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !multiline) {
            handleBlur();
        }
        if (e.key === 'Escape') {
            setCurrentValue(value);
            setIsEditing(false);
        }
    };

    const handleStartEditing = () => {
        setIsEditing(true);
    };

    if (isEditing) {
        return multiline ? (
            <Textarea
                ref={inputRef as React.RefObject<HTMLTextAreaElement>}
                value={currentValue}
                onChange={(e) => setCurrentValue(e.target.value)}
                onBlur={handleBlur}
                onKeyDown={handleKeyDown}
                className={`min-h-[100px] ${className}`}
                placeholder={placeholder}
            />
        ) : (
            <Input
                ref={inputRef as React.RefObject<HTMLInputElement>}
                value={currentValue}
                onChange={(e) => setCurrentValue(e.target.value)}
                onBlur={handleBlur}
                onKeyDown={handleKeyDown}
                className={className}
                placeholder={placeholder}
            />
        );
    }

    return (
        <div
            onClick={handleStartEditing}
            className={`cursor-text hover:bg-primary/5 rounded p-1 transition-colors min-h-[1.5em] group relative ${className}`}
            style={style}
        >
            {value || <span className="text-muted-foreground italic">{placeholder}</span>}
            <div className="absolute top-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity bg-primary text-white text-[10px] px-1 rounded">
                Edit
            </div>
        </div>
    );
};
