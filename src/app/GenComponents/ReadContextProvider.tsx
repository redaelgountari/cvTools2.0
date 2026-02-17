"use client";

import { useEffect, useState, useRef } from "react";
import { ReadContext } from "./ReadContext";
import { getFromStorage, saveSettings, saveToStorage } from "@/Cookiesmv";
import { Toaster } from "@/components/ui/toaster";
import axios from "axios";
import { SessionProvider, useSession } from "next-auth/react";

import { Resume, EmptyResume } from "@/app/types/resume";
import { normalizeResumeData } from "./Themes/dataNormalization";

interface SettingsType {
  [key: string]: any;
}

const normalizeData = (data: any): any => {
  if (data === null || data === undefined) return '';
  if (Array.isArray(data)) return data.map(item => normalizeData(item));
  if (typeof data === 'object' && data !== null) {
    return Object.fromEntries(
      Object.entries(data).map(([key, value]) => [key, normalizeData(value)])
    );
  }
  return data;
};

function ReadContextProviderInner({ children }: { children: React.ReactNode }) {
  const [userData, setUserData] = useState<Resume>(EmptyResume);
  const [userinfos, setUserinfos] = useState<string | null>(null);
  const [settings, setSettings] = useState<SettingsType | null>(null);
  const [AnlysedCV, setAnlysedCV] = useState<Resume>(EmptyResume);
  const [isLoading, setIsLoading] = useState(true);
  const { data: session } = useSession();

  const isDataLoaded = useRef(false);
  const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const previousAnlysedCV = useRef<Resume | null>(null);

  useEffect(() => {
    if (!isDataLoaded.current || !AnlysedCV || !userinfos) return;

    const hasChanged =
      JSON.stringify(previousAnlysedCV.current) !==
      JSON.stringify(AnlysedCV);

    if (!hasChanged) return;

    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }

    saveTimeoutRef.current = setTimeout(async () => {
      try {
        await saveToStorage(userinfos, AnlysedCV, 7);

        await axios.post("/api/storeuserdata", {
          userData: AnlysedCV,
          userId: userinfos,
        });

        previousAnlysedCV.current = AnlysedCV;
      } catch (err) {
        console.error("Error storing user data:", err);
      }
    }, 1000);

    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
    };
  }, [AnlysedCV, userinfos]);

  useEffect(() => {
    const loadUserData = async () => {
      if (!userinfos || isDataLoaded.current) return;

      try {
        const saved = await getFromStorage(userinfos);

        if (saved) {
          const normalized = normalizeResumeData(saved);
          setAnlysedCV(normalized);
          previousAnlysedCV.current = normalized;
        } else {
          const { data } = await axios.get("/api/GettingUserData", {
            params: { userId: userinfos },
          });

          const normalized = normalizeResumeData(data.data);
          setAnlysedCV(normalized);
          previousAnlysedCV.current = normalized;
          await saveToStorage(userinfos, normalized, 7);
        }

        isDataLoaded.current = true;
        setIsLoading(false);
      } catch (err) {
        setAnlysedCV(normalizeData(EmptyResume));
        isDataLoaded.current = true;
        setIsLoading(false);
      }
    };

    loadUserData();
  }, [userinfos]);

  useEffect(() => {
    const loadSettings = async () => {
      const saved = await getFromStorage("Settings");
      if (saved) setSettings(saved);
    };

    loadSettings();
  }, []);

  useEffect(() => {
    if (settings) {
      saveSettings("Settings", settings, 7);
    }
  }, [settings]);

  useEffect(() => {
    if (session?.user?.id) {
      setUserinfos(session.user.id);
    }
  }, [session]);

  return (
    <ReadContext.Provider
      value={{
        userData,
        setUserData,
        AnlysedCV,
        setAnlysedCV,
        settings,
        setSettings,
        userinfos,
        setUserinfos,
        isLoading,
      }}
    >
      {children}
      <Toaster />
    </ReadContext.Provider>
  );
}

export default function ReadContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      <ReadContextProviderInner>{children}</ReadContextProviderInner>
    </SessionProvider>
  );
}
