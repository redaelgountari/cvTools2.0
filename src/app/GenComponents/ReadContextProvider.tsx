"use client";

import { useEffect, useState } from "react";
import { ReadContext } from "./ReadContext";
import {
  getFromStorage,
  saveImageToStorage,
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

  useEffect(() => {
    const saveData = async () => {
      if (!AnlysedCV || !userinfos) return;

      saveToStorage("userData", AnlysedCV, 7);

      try {
        await axios.post("/api/storeuserdata", {
          userData: AnlysedCV,
          userId: userinfos,
        });
      } catch (err) {
        console.error("Error storing user data:", err);
      }
    };

    saveData();
  }, [AnlysedCV, userinfos]);

  useEffect(() => {
    const loadUserData = async () => {
      if (!userinfos) return;

      try {
        const saved = getFromStorage("userData");

        if (saved) {
          setAnlysedCV(normalizeData(saved));
        } else {
          const userId =
            typeof userinfos === "object" ? userinfos.id : userinfos;
          const { data } = await axios.get("/api/GettingUserData", {
            params: { userId },
          });

          setAnlysedCV(normalizeData(data));
        }
      } catch (err) {
        console.error("Error loading user data:", err);
        setAnlysedCV(normalizeData({}));
      }
    };

    loadUserData();
  }, [userinfos]);

  useEffect(() => {
    const saved = getFromStorage("Settings");
    if (saved) setSettings(saved);
  }, []);

  useEffect(() => {
    if (userData?.image) {
      saveImageToStorage("userImage", userData.image as string, 7);
    }
  }, [userData]);

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
