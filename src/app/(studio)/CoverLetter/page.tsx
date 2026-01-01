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
    <div>
              <Coverlettergenarate/>

    </div>
  )
}