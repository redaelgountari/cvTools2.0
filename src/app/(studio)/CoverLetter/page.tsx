"use client"

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import React, { useEffect, useState } from 'react'
import ReadTXT from '../../GenComponents/ReadTXT'
import Analyse from '../../GenComponents/Analyse'
import SearchResults from '../../GenComponents/SearchResults'
import { Textarea } from '@/components/ui/textarea'
import { getFromStorage } from '@/Cookiesmv'
import AnalyseResults from '../../GenComponents/AnalyseResults'
import Coverlettergenarate from '../../GenComponents/Coverlettergenarate'

export default function page() {
  const [data, setdata] = useState('')
  useEffect(() => {
    setdata(getFromStorage('userData','userData'))
    setdata(getFromStorage('userData','userImage'))
  }, [])
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-1 bg-gray-50 dark:bg-gray-900 py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-3xl font-bold text-center mb-8 text-gray-800 dark:text-white">
              Resume Analyzer
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* <Card className="h-fit">
                <CardHeader>
                  <CardTitle>Uploaded Resume</CardTitle>
                </CardHeader>
                <CardContent>
                  <AnalyseResults />
                </CardContent>
              </Card> */}

              <Coverlettergenarate/>
            </div>
          </div>
        </div>
      </div>

      <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" />
    </div>
  )
}