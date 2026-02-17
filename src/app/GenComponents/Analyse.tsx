'use client'

import React, { useContext, useEffect, useState, useMemo } from 'react';
import { ReadContext } from './ReadContext';
import axios from 'axios';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import LoadingState from './LoadingState';
import { useCookies } from 'react-cookie';
import { getFromStorage, saveToStorage } from "../../Cookiesmv"
import AnalyseResults from './AnalyseResults';
import { Resume } from '../types/resume';
import { normalizeResumeData } from './Themes/dataNormalization';

export default function Analyse() {
  const [response, setResponse] = useState<Resume | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { userData } = useContext(ReadContext);
  const { userinfos } = useContext(ReadContext);
  const { setAnlysedCV } = useContext(ReadContext);
  const [activeSection, setActiveSection] = useState('personal');
  const [jobMatchingPrompt, setJobMatchingPrompt] = useState<string>('');
  const [uploading, setUploading] = useState<boolean>(false);

  const calculateTotalExperience = useMemo(() => {
    return response?.experience.reduce((total, exp) => {
      const endDate = exp.endDate === 'Present' ? new Date() : new Date(exp.endDate);
      const startDate = new Date(exp.startDate);
      const years = (endDate.getFullYear() - startDate.getFullYear());
      return total + years;
    }, 0) || 0;
  }, [response]);

  const generateJobMatchingPrompt = (resumeData: Resume) => {
    const recentTitles = resumeData.experience
      .slice(0, 3)
      .map(exp => exp.title)
      .join(', ');

    const keyAchievements = resumeData.experience
      .flatMap(exp => exp.responsibilities)
      .slice(0, 5)
      .join('; ');

    return `ehllo`;
  };

  const fetchAnalysis = async () => {
    if (!userData?.text) {
      setError('No resume data available to analyze');
      return;
    }

    setLoading(true);
    setError('');

    try {
      console.log("Sending data to API:", userData);

      const { data } = await axios.post("/api/gemini", {
        userData: userData.text,
        useCase: 'Analyse-resume',
      });
      console.log("dtsll :", data)

      // Check if response exists
      if (!data || !data.text) {
        throw new Error('Empty response from API');
      }

      console.log("Raw API response:", data.text);

      // Clean the response
      const cleanedData = data.text.replace(/```json|```/g, '').trim();

      // Validate it's not empty
      if (!cleanedData) {
        throw new Error('Empty JSON response after cleaning');
      }

      console.log("Cleaned data:", cleanedData);

      // Try to parse JSON
      let parsedData;
      try {
        parsedData = JSON.parse(cleanedData);
      } catch (parseError) {
        console.error('JSON Parse Error:', parseError);
        console.error('Attempted to parse:', cleanedData);
        throw new Error('Invalid JSON format received from API');
      }

      // Validate required fields
      if (!parsedData.personalInfo || !parsedData.experience) {
        throw new Error('Invalid resume data format - missing required fields');
      }

      console.log('rdatas :', { ...parsedData, image: userData.image })
      const normalizedData = normalizeResumeData({ ...parsedData, image: userData.image });
      setAnlysedCV(normalizedData);
      setUploading(true);
      setResponse(normalizedData);

      const prompt = generateJobMatchingPrompt(parsedData);
      setJobMatchingPrompt(prompt);

    } catch (error) {
      console.error('Error in fetchAnalysis:', error);

      if (axios.isAxiosError(error)) {
        // Handle Axios-specific errors
        if (error.response) {
          setError(`API Error: ${error.response.status} - ${error.response.data?.message || 'Unknown error'}`);
        } else if (error.request) {
          setError('No response from server. Please check your connection.');
        } else {
          setError(`Request Error: ${error.message}`);
        }
      } else {
        setError(error instanceof Error ? error.message : 'An unexpected error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userData?.text) {
      setUploading(false);
      console.log("userData:", userData.text);
      fetchAnalysis();
    } else {
      setUploading(true);
    }
  }, [userData?.text]);

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-1">
        <div className="grid grid-cols-1">
          <CardContent>
            {!uploading ? (
              <LoadingState />
            ) : (
              <AnalyseResults />
            )}
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
          </CardContent>
        </div>
      </div>
    </div>
  );
}