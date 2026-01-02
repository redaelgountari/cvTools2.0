"use client";

import { useEffect, useState, useRef } from "react";
import { ReadContext } from "./ReadContext";
import { getFromStorage, saveSettings, saveToStorage } from "@/Cookiesmv";
import { Toaster } from "@/components/ui/toaster";
import axios from "axios";
import { SessionProvider, useSession } from "next-auth/react";

interface AnlysedCVType {
  [key: string]: string | number | boolean | null | undefined;
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
  const [userinfos, setUserinfos] = useState<string | null>(null);
  const [settings, setSettings] = useState<SettingsType | null>(null);
  const [AnlysedCV, setAnlysedCV] = useState<AnlysedCVType | null>(null);
  const { data: session } = useSession();

  const isDataLoaded = useRef(false);
  const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const previousAnlysedCV = useRef<AnlysedCVType | null>(null);

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
          const normalized = normalizeData(saved);
          setAnlysedCV(normalized);
          previousAnlysedCV.current = normalized;
        } else {
          const { data } = await axios.get("/api/GettingUserData", {
            params: { userId: userinfos },
          });

          const normalized = normalizeData(data.data);
          setAnlysedCV(normalized);
          previousAnlysedCV.current = normalized;
          await saveToStorage(userinfos, normalized, 7);
        }

        isDataLoaded.current = true;
      } catch (err) {
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
