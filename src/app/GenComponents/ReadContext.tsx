"use client"
import { createContext, Dispatch, SetStateAction } from "react";
import { Resume } from "@/app/types/resume";

export interface ResumeSettings {
    showLineLimit: boolean;
    lineLimit: number;
    atsOptimized: boolean;
    selectedLanguage: string;
}

export interface ReadContextType {
    userData: Resume;
    setUserData: Dispatch<SetStateAction<Resume>>;
    AnlysedCV: Resume;
    setAnlysedCV: Dispatch<SetStateAction<Resume>>;
    settings: ResumeSettings | null;
    setSettings: Dispatch<SetStateAction<ResumeSettings | null>>;
    userinfos: string | null;
    setUserinfos: Dispatch<SetStateAction<string | null>>;
    isLoading: boolean;
}

export const ReadContext = createContext<ReadContextType>({} as ReadContextType);
