'use client'

import React, { useContext, useEffect, useState , useMemo  } from 'react';
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
import {getFromStorage, saveToStorage} from "../../Cookiesmv"
import AnalyseResults from './AnalyseResults';
import { Resume } from '../types/resume';


export default function Analyse(){
  const [response, setResponse] = useState<Resume | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { userData } = useContext(ReadContext);
  const { userinfos } = useContext(ReadContext);
  const { setAnlysedCV } = useContext(ReadContext);
  const [activeSection, setActiveSection] = useState('personal');
  const [jobMatchingPrompt, setJobMatchingPrompt] = useState<string>('');
  const [uploading , setUploading] = useState<boolean>(false)

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
  
    return `Act as an expert job matching system. Find highly relevant job opportunities for a candidate with the following profile:
  
  Key Qualifications:
  - Professional Level: ${calculateTotalExperience} years of experience
  - Recent Roles: ${recentTitles}
  - Location: ${resumeData.personalInfo.location}
  - Highest Education: ${resumeData.education[0]?.degree || 'N/A'}
  - Industry Preferences: [Add user input for industry preferences]
  - Job Type: [Add user input for job type, e.g., remote, hybrid, on-site]

  Technical Expertise:
  ${resumeData.skills.technical.join(', ')}
  
  Core Competencies:
  ${resumeData.skills.soft.join(', ')}
  
  Languages:
  ${resumeData.skills.languages.join(', ')}
  
  Key Achievements:
  ${keyAchievements}
  
  Professional Summary:
  ${resumeData.professionalSummary}
  
  Please find job opportunities that:
  1. Match the candidate's technical skills and experience level
  2. Align with their recent role titles and responsibilities
  3. Consider their location and job type preferences
  4. Utilize their language capabilities
  5. Leverage their educational background
  
  For each job match, provide:
  1. Job title
  2. Company
  3. Location (including remote options)
  4. Required experience level
  5. Key responsibilities
  6. Skills match percentage
  7. Compensation range (if available)
  8. Growth potential
  9. Application link (if available)
  10.return skills not skill 
  
  Focus on opportunities that offer career progression and utilize the candidate's full skills set. Prioritize roles that match at least 70% of the technical skills and experience level.`;
  };

const fetchAnalysis = async () => {
  if (!userData) return;
  setLoading(true);
  setError('');

  try {
   
    const { data } = await axios.post("/api/gemini", { userData: userData.text});
    const cleanedData = data.text.replace(/```json|```/g, '').trim();
    const parsedData = JSON.parse(cleanedData);
    
    if (!parsedData.personalInfo || !parsedData.experience) {
      throw new Error('Invalid resume data format');
    }
    setUploading(true)
    setResponse(parsedData);
    setAnlysedCV(parsedData);
    const prompt = generateJobMatchingPrompt(parsedData);
    setJobMatchingPrompt(prompt);

  } catch (error) {
    console.error('Error:', error);
    setError(error instanceof Error ? error.message : 'An error occurred');
  } finally {
    setLoading(false);
  }
};
  useEffect(() => {
    if (userData) {
      fetchAnalysis();
      setUploading(false)
      console.log("userData :",userData.text)
    }
    else{
      setUploading(true)
    }
  }, [userData?.text]);

    return (
     
     <div className="flex flex-col min-h-screen">
            <div className="flex-1 ">
                  <div className="grid grid-cols-1 ">
                      <CardContent>
                        {
                        !uploading ? <LoadingState /> : 
                        <AnalyseResults />
                      }
                      {error && (
                        <Alert variant="destructive">
                          <AlertDescription>{error}</AlertDescription>
                        </Alert>
                      )}
                      </CardContent>
              </div>
            </div>
      
            {/* <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" /> */}
          </div>

    );

  }