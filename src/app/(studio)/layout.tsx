import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider";
import Dashboard from "../GenComponents/Dashboard";
import { TourProvider } from "./TourProvider";
import { ErrorBoundary } from "../GenComponents/ErrorBoundary";

export const metadata: Metadata = {
  title: "Dashboard — CV Tools",
  description: "Manage your resume, cover letters, and portfolio with AI-powered tools.",
};

export default function StudioLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <ErrorBoundary>
          <Dashboard>
            <TourProvider>
              {children}
            </TourProvider>
          </Dashboard>
        </ErrorBoundary>
      </ThemeProvider>
    </>
  );
}
