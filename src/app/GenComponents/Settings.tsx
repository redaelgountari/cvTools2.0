"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Button } from '@/components/ui/button'
import { ChevronDown, Settings as SettingsIcon, Save } from 'lucide-react'
import React, { useContext, useState, useEffect } from 'react'
import { useToast } from "@/hooks/use-toast"
import { ReadContext } from './ReadContext'
import axios from 'axios'
// Settings schema type definition
type ResumeSettings = {
  showLineLimit: boolean;
  lineLimit: number;
  atsOptimized: boolean;
  selectedLanguage: string;
}

const SUPPORTED_LANGUAGES = [
  { value: 'english', label: 'English' },
  { value: 'french', label: 'French' },
  { value: 'spanish', label: 'Spanish' },
  { value: 'german', label: 'German' },
  { value: 'italian', label: 'Italian' },
  { value: 'portuguese', label: 'Portuguese' },
  { value: 'russian', label: 'Russian' },
  { value: 'chinese', label: 'Chinese' },
  { value: 'japanese', label: 'Japanese' },
  { value: 'korean', label: 'Korean' },
  { value: 'arabic', label: 'Arabic' },
  { value: 'hindi', label: 'Hindi' },
  { value: 'turkish', label: 'Turkish' },
  { value: 'dutch', label: 'Dutch' },
  { value: 'swedish', label: 'Swedish' },
  { value: 'greek', label: 'Greek' },
  { value: 'hebrew', label: 'Hebrew' },
  { value: 'thai', label: 'Thai' },
  { value: 'vietnamese', label: 'Vietnamese' },
];

export default function Settings() {
    const { settings: contextSettings, setSettings, AnlysedCV, setAnlysedCV } = useContext(ReadContext);
    
    const [settings, setLocalSettings] = useState<ResumeSettings>({
      showLineLimit: false,
      lineLimit: 15,
      atsOptimized: true,
      selectedLanguage: 'english'
    });
    const [isSaving, setIsSaving] = useState(false);
    const { toast } = useToast();
    const {userinfos} = useContext(ReadContext);
    
    console.log("AnlysedCV :",AnlysedCV)

    // Initialize with context settings if they exist
    useEffect(() => {
      if (contextSettings) {
        setLocalSettings(contextSettings);
      }
    }, [contextSettings]);

    const handleSettingChange = <T extends keyof ResumeSettings>(key: T, value: ResumeSettings[T]) => {
      setLocalSettings(prev => ({
        ...prev,
        [key]: value
      }));
    };


    const changeLanguage = async () => {
        if (!AnlysedCV) return;
        
        try {
          const prompt = `Change the language of this CV to ${settings.selectedLanguage}. Return ONLY valid JSON without any additional text or markdown formatting: ${JSON.stringify(AnlysedCV)}`;
          const { data } = await axios.post("/api/gemini", { 
            userData: prompt,
            useCase: 'Translate-cv'
           });
          
          // More robust cleaning of the response
          let cleanedData = data.text;
          
          // Remove markdown code blocks if present
          if (cleanedData.startsWith('```json')) {
            cleanedData = cleanedData.replace(/```json|```/g, '').trim();
          }
          
          // Remove any leading/trailing non-JSON text
          const jsonStart = cleanedData.indexOf('{');
          const jsonEnd = cleanedData.lastIndexOf('}') + 1;
          if (jsonStart !== -1 && jsonEnd !== -1) {
            cleanedData = cleanedData.slice(jsonStart, jsonEnd);
          }
          
          const parsedData = JSON.parse(cleanedData);
          
          if (!parsedData.personalInfo || !parsedData.experience) {
            throw new Error('Invalid resume data format');
          }
          
          console.log("Parsed Data:", parsedData);
          setAnlysedCV(parsedData); // Fixed the incorrect function call
          
          toast({
            title: "Language changed",
            description: `CV has been converted to ${settings.selectedLanguage}`,
            variant: "default",
          });
        } catch (err) {
          toast({
            title: "Error",
            description: "Failed to change language. Please try again.",
            variant: "destructive",
          });
          console.error("Language change error:", err);
        }
      };
      

    const saveSettings = async () => {
      setIsSaving(true);
      
      try {
        await new Promise(resolve => setTimeout(resolve, 800)); // Simulate API call
        setSettings(settings);
        
        if (settings.selectedLanguage !== contextSettings?.selectedLanguage) {
          await changeLanguage();
        }
        
        toast({
          title: "Settings saved",
          description: "Your resume settings have been saved successfully.",
          variant: "default",
        });
      } catch (err) {
        toast({
          title: "Error",
          description: "Failed to save settings",
          variant: "destructive",
        });
        console.error("Save settings error:", err);
      } finally {
        setIsSaving(false);
      }
    };
    
    return (
      <div>
          <Card className="shadow-md">
              <CardHeader>
                  <CardTitle className="flex items-center">
                      <SettingsIcon className="h-5 w-5 mr-2" />
                      Resume Settings
                  </CardTitle>
                  <CardDescription>
                      Customize how your resume is generated
                  </CardDescription>
                 
              </CardHeader>
              <CardContent>
                  <div className="space-y-6">
                      <div className="space-y-4">
                          <h3 className="font-medium">Content Settings</h3>
                          
                          <div className="flex items-center space-x-2">
                              <Switch
                                  id="line-limit-toggle" 
                                  checked={settings.showLineLimit}
                                  onCheckedChange={(val) => handleSettingChange('showLineLimit', val)}
                              />
                              <Label htmlFor="line-limit-toggle">Enable Bullet Point Word Limit</Label>
                          </div>
                          
                          {settings.showLineLimit && (
                              <div className="flex items-center space-x-4 ml-6">
                                  <Label htmlFor="lineLimitInput">Maximum words per bullet:</Label>
                                  <Input
                                      id="lineLimitInput"
                                      type="number" 
                                      value={settings.lineLimit} 
                                      onChange={(e) => handleSettingChange('lineLimit', Math.max(1, Math.min(50, Number(e.target.value))))} 
                                      className="w-24" 
                                      min="1"
                                      max="50"
                                  />
                              </div>
                          )}
                      </div>
                      
                      <div className="border-t pt-4">
                          <h3 className="font-medium mb-2">ATS Optimization</h3>
                          <div className="flex items-center space-x-2">
                              <Switch 
                                  id="ats-toggle" 
                                  checked={settings.atsOptimized}
                                  onCheckedChange={(val) => handleSettingChange('atsOptimized', val)}
                              />
                              <Label htmlFor="ats-toggle">Optimize for Applicant Tracking Systems</Label>
                          </div>
                          <p className="text-sm text-muted-foreground mt-2">
                              Ensures your resume can be properly parsed by automated recruiting systems
                          </p>
                      </div>
                      
                      <div className="border-t pt-4">
                          <h3 className="font-medium mb-2">Language Settings</h3>
                          <div className="flex flex-col space-y-2">
                              <Label htmlFor="language-select">Resume Language</Label>
                              <div className="relative">
                                  <select 
                                      id="language-select"
                                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 appearance-none"
                                      value={settings.selectedLanguage}
                                      onChange={(e) => handleSettingChange('selectedLanguage', e.target.value)}
                                  >
                                      {SUPPORTED_LANGUAGES.map((lang) => (
                                        <option key={lang.value} value={lang.value}>
                                          {lang.label}
                                        </option>
                                      ))}
                                  </select>
                                  <ChevronDown className="absolute right-3 top-2.5 h-4 w-4 opacity-50" />
                              </div>
                          </div>
                      </div>
                  </div>
              </CardContent>
              <CardFooter className="flex justify-end border-t pt-4">
                  <Button 
                      onClick={saveSettings} 
                      disabled={isSaving}
                      className="flex items-center gap-2"
                  >
                      {isSaving ? (
                          "Saving..."
                      ) : (
                          <>
                              <Save className="h-4 w-4" />
                              Save Settings
                          </>
                      )}
                  </Button>
              </CardFooter>
          </Card>
      </div>
    )
}