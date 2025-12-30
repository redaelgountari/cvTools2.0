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
import { useState } from "react"

export default function Page() {
  const [isAnalysisReady, setIsAnalysisReady] = useState(false)
  
  // This function would be passed to ReadTXT to notify when a file is uploaded
  const handleFileUploaded = () => {
    setIsAnalysisReady(true)
  }

  return (
    <ReadContextProvider>
      <div className="flex min-h-screen flex-col bg-background">
        {/* Header with Breadcrumbs */}
        {/* <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur">
          <div className="container flex h-14 items-center">
            <SidebarTrigger />
            <Breadcrumb className="ml-4">
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/">Dashboard</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>Resume Analyzer</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header> */}

        <div className="container flex-1 py-6 md:py-8">
          <div className="flex flex-col space-y-6">
            {/* Page Title */}
            {/* <div className="flex flex-col items-center justify-center space-y-2 text-center">
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                Resume Analyzer
              </h1>
              <p className="max-w-[700px] text-muted-foreground">
                Upload your resume and get detailed analysis, insights, and improvement suggestions
              </p>
              <Separator className="mt-4" />
            </div> */}

            {/* Main Content */}
            <div className="grid gap-6 md:grid-cols-12">
              {/* Sidebar */}
              <div className="md:col-span-6 lg:col-span-5">
                <div className="grid gap-4">
                  {/* <Card>
                    <CardHeader> */}
                      {/* <CardTitle>Upload Resume</CardTitle> */}
                    {/* </CardHeader>
                    <CardContent> */}
                      <ReadTXT onFileUploaded={handleFileUploaded} />
                    {/* </CardContent>
                    <CardFooter>
                      <p className="text-xs text-muted-foreground">
                        Supported formats: PDF, DOCX, TXT (Max size: 5MB)
                      </p>
                    </CardFooter>
                  </Card> */}
                  
                  <Card className="hidden md:block">
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
                  {/* Analysis Card */}
                  {/* <Card>
                    <CardHeader>
                      <CardTitle>Analysis Results</CardTitle>
                    </CardHeader>
                    <CardContent> */}
                      <Analyse />
                    {/* </CardContent>
                  </Card> */}
                  
                  {/* Search Results Card */}
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