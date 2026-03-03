"use client"
import { createContext, Dispatch, SetStateAction } from "react";
import { Resume } from "@/app/types/resume";

interface SettingsType {
    [key: string]: any;
}

export interface ReadContextType {
    userData: Resume;
    setUserData: Dispatch<SetStateAction<Resume>>;
    AnlysedCV: Resume;
    setAnlysedCV: Dispatch<SetStateAction<Resume>>;
    settings: SettingsType | null;
    setSettings: Dispatch<SetStateAction<SettingsType | null>>;
    userinfos: string | null;
    setUserinfos: Dispatch<SetStateAction<string | null>>;
    isLoading: boolean;
}

export const ReadContext = createContext<ReadContextType>({} as ReadContextType);
