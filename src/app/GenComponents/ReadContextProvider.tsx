"use client";

import { useEffect, useState, useRef } from "react";
import { ReadContext } from "./ReadContext";
import {
  getFromStorage,
  saveSettings,
  saveToStorage,
} from "@/Cookiesmv";
import { Toaster } from "@/components/ui/toaster";
import axios from "axios";
import { SessionProvider, useSession } from "next-auth/react";

interface AnlysedCVType {
  [key: string]: string | number | boolean | null | undefined;
}

interface UserInfosType {
  id: string;
  [key: string]: any;
}

interface SettingsType {
  [key: string]: any;
}

const normalizeData = <T extends Record<string, any>>(data: T): T => {
  if (!data || typeof data !== "object") return {} as T;

  return Object.fromEntries(
    Object.entries(data).map(([key, value]) => [key, value ?? ""])
  ) as T;
};

function ReadContextProviderInner({ children }: { children: React.ReactNode }) {
  const [userData, setUserData] = useState<AnlysedCVType | null>(null);
  const [userinfos, setUserinfos] = useState<string | UserInfosType | null>(
    null
  );
  const [settings, setSettings] = useState<SettingsType | null>(null);
  const [AnlysedCV, setAnlysedCV] = useState<AnlysedCVType | null>(null);
  const { data: session } = useSession();
  
  const isDataLoaded = useRef(false);
  const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const previousAnlysedCV = useRef<AnlysedCVType | null>(null);

  // Save data with debouncing to prevent multiple rapid calls
  useEffect(() => {
    if (!isDataLoaded.current || !AnlysedCV || !userinfos) return;

    const hasChanged = JSON.stringify(previousAnlysedCV.current) !== JSON.stringify(AnlysedCV);
    
    if (!hasChanged) {
      return;
    }

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
        
        console.log("Data saved successfully");
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
      if (!userinfos) return;
      
      if (isDataLoaded.current) return;

      try {
        const saved = null; ;

        if (saved) {
          setAnlysedCV(normalizeData(saved));
          previousAnlysedCV.current = normalizeData(saved);
        } else {
          const userId = userinfos;
          const { data } = await axios.get("/api/GettingUserData", {
            params: { userId },
          });
          const normalizedData = normalizeData(data.data);
          setAnlysedCV(normalizedData);
          previousAnlysedCV.current = normalizedData;
          await saveToStorage(userinfos, normalizedData, 7);
        }
        
        isDataLoaded.current = true;
      } catch (err) {
        console.error("Error loading user data:", err);
        setAnlysedCV(normalizeData({}));
        isDataLoaded.current = true;
      }
    };

    loadUserData();
  }, [userinfos]);

  useEffect(() => {
    const loadSettings = async () => {
      const saved = await getFromStorage("Settings");
      if (saved) setSettings(saved);
      console.log("saved settings:", saved);
    };

    loadSettings();
  }, []);

  useEffect(() => {
    if (settings) {
      saveSettings("Settings", settings, 7);
    }
  }, [settings]);

  useEffect(() => {
    if (session?.user) {
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