"use client"
import { AppSidebar } from "@/components/app-sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import ReadTXT from "../../GenComponents/ReadTXT"
import Analyse from "../../GenComponents/Analyse"
import ReadContextProvider from '../../GenComponents/ReadContextProvider'
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card'
import SearchResults from "../../GenComponents/SearchResults"
import { useEffect, useState } from "react"
import { useTour } from "../TourProvider"

export default function Page() {
  const [isAnalysisReady, setIsAnalysisReady] = useState(false)
  const { setSteps, autoStart } = useTour();

  const [hasTriggeredTour, setHasTriggeredTour] = useState(false);
  const handleFileUploaded = () => {
    setIsAnalysisReady(true);
  };

  useEffect(() => {
    if (hasTriggeredTour) return;

    setSteps([
      {
        target: '.upload-section',
        content: 'Start by uploading your resume here. Click or drag and drop your PDF file.',
        placement: 'right',
        disableBeacon: true,
      },
      {
        target: '.tips-card',
        content: 'Check out these helpful tips to improve your resume before uploading.',
        placement: 'right',
        disableBeacon: true,
      },
      {
        target: '.analysis-section',
        content: 'Your analysis results will appear here after uploading your resume.',
        placement: 'left',
        disableBeacon: true,
      },
    ]);

    setHasTriggeredTour(true);
    autoStart();
  }, [setSteps, autoStart, hasTriggeredTour]);
  return (
    <ReadContextProvider>
      <div className="flex min-h-screen flex-col bg-background">
        <div className="container flex-1 py-6 md:py-8">
          <div className="flex flex-col space-y-6">
            <div className="grid gap-6 md:grid-cols-12">
              {/* Sidebar */}
              <div className="md:col-span-6 lg:col-span-5">
                <div className="grid gap-4">
                  <div className="upload-section">
                    <ReadTXT onFileUploaded={handleFileUploaded} />
                  </div>

                  <Card className="hidden md:block tips-card">
                    <CardHeader>
                      <CardTitle>Tips</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="ml-4 list-disc text-sm text-muted-foreground">
                        <li className="mb-2">Resume should be ATS-friendly</li>
                        <li className="mb-2">Include relevant keywords</li>
                        <li className="mb-2">Quantify achievements when possible</li>
                        <li>Keep formatting consistent</li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Main Analysis Area */}
              <div className="md:col-span-6 lg:col-span-7">
                <div className="grid gap-6">
                  <div className="analysis-section">
                    <Analyse />
                  </div>

                  <Card>
                    <CardHeader>
                      <CardTitle>Keyword Matches</CardTitle>
                    </CardHeader>
                    <CardContent>
                      {/* <SearchResults /> */}
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="border-t py-4">
          <div className="container flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              © 2025 Resume Analyzer
            </p>
            <nav className="flex items-center space-x-4">
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground">
                Privacy
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground">
                Terms
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground">
                Help
              </a>
            </nav>
          </div>
        </footer>
      </div>
    </ReadContextProvider>
  )
}