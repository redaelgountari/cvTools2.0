"use client"

import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  AlertCircle,
  Loader2,
  Plus,
  Trash2,
  Image as ImageIcon,
  User,
  FileText,
  Zap,
  Wrench,
  Briefcase,
  GraduationCap,
  Scroll,
  BookOpen,
  Award,
  HeartHandshake,
  Rocket,
  Globe,
  Palette,
  Star,
  X,
  ChevronUp,
  ChevronDown,
  Save
} from 'lucide-react';
import React, { useContext, useEffect, useState } from 'react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet";
import { ReadContext } from './ReadContext';
import { Resume } from '../types/resume';
import { useToast } from '@/hooks/use-toast';
import { ResumeSchema } from '../types/resumeSchema';
import { normalizeResumeData } from './Themes/dataNormalization';
import { z } from 'zod';
import { Skeleton } from '@/components/ui/skeleton';
import LoadingState from './LoadingState';

interface TagInputProps {
  tags: string[];
  onTagsChange: (newTags: string[]) => void;
  placeholder?: string;
}

const TagInput = ({ tags = [], onTagsChange, placeholder }: TagInputProps) => {
  const [inputValue, setInputValue] = useState('');

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTag();
    }
  };

  const addTag = () => {
    const trimmed = inputValue.trim();
    if (trimmed && !tags.includes(trimmed)) {
      onTagsChange([...tags, trimmed]);
      setInputValue('');
    }
  };

  const removeTag = (indexToRemove: number) => {
    onTagsChange(tags.filter((_, index) => index !== indexToRemove));
  };

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap gap-2 mb-2">
        {tags.map((tag, index) => (
          <Badge key={index} variant="secondary" className="px-2 py-1 flex items-center gap-1">
            {tag}
            <button
              type="button"
              onClick={() => removeTag(index)}
              className="hover:bg-destructive/20 rounded-full p-0.5 transition-colors"
            >
              <X className="w-3 h-3" />
            </button>
          </Badge>
        ))}
      </div>
      <div className="flex gap-2">
        <Input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder || "Type and press Enter or add button..."}
          className="flex-1"
        />
        <Button onClick={addTag} type="button" size="icon" variant="outline">
          <Plus className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

export default function AnalyseResults() {
  const [response, setResponse] = useState<Resume | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [activeSection, setActiveSection] = useState('personal');
  const { AnlysedCV, setAnlysedCV, userData, setUserData, isLoading: contextLoading } = useContext(ReadContext);
  const [userImages, setUserImages] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);
  const { toast } = useToast();
  const [initialLoading, setInitialLoading] = useState(true);
  const [showNoData, setShowNoData] = useState(false);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalSection, setModalSection] = useState<string | null>(null);
  const [modalData, setModalData] = useState<any>({});

  const validateFile = (file: File) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'];
    const maxSize = 5 * 1024 * 1024; // 5MB

    if (!allowedTypes.includes(file.type)) {
      throw new Error(`Invalid file type. Please upload a JPEG, PNG or WEBP image.`);
    }

    if (file.size > maxSize) {
      throw new Error(`File is too large. Maximum size is 5MB.`);
    }
  };

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    if (!contextLoading && AnlysedCV) {
      setResponse(AnlysedCV);
      setUserImages(AnlysedCV?.image || []);
      setInitialLoading(false);
    } else if (!contextLoading && !AnlysedCV) {
      // Set a timeout to show "No CV data found" after 10 seconds
      timeoutId = setTimeout(() => {
        if (!AnlysedCV && !contextLoading) {
          setInitialLoading(false);
          setShowNoData(true);
        }
      }, 10000);
    }

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [AnlysedCV, contextLoading]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Merge the response data with the images from userData
      const updatedResume = {
        ...response,
        image: userImages // Use the current userImages state
      };

      // Normalize data to ensure string fields are strings (fixes Gemini returning arrays)
      const normalizedData = normalizeResumeData(updatedResume);

      // Validate using Zod
      const validatedData = ResumeSchema.parse(normalizedData);

      setAnlysedCV(validatedData as Resume);

      // Also update userData to ensure consistency
      setUserData(prev => ({
        ...prev,
        ...validatedData
      }));

      console.log("Updated resume with images:", validatedData);

      toast({
        title: "Success",
        description: "Your resume has been updated successfully.",
        variant: "default",
        className: "bg-green-500 text-white border-none"
      });

    } catch (err) {
      console.error("Error updating resume data:", err);
      let errorMessage = "Failed to update resume data. Please try again.";

      if (err instanceof z.ZodError) {
        // Create a more user-friendly error message from Zod validation issues
        errorMessage = `Validation Error: ${err.errors.map(e => `${e.path.join('.')}: ${e.message}`).join(', ')}`;
      }

      setError(errorMessage);
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const uploadToCloudinary = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch("/api/extract-images", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Failed to upload image: ${response.statusText}`);
      }

      const data = await response.json();

      // Make sure the response structure matches what you expect
      if (data.files && data.files[0] && data.files[0].url) {
        return data.files[0].url;
      } else {
        throw new Error('Invalid response format from image upload');
      }
    } catch (error) {
      console.error('Cloudinary upload error:', error);
      throw error;
    }
  };

  const handleChangeImage = (index: number) => async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      validateFile(file);
      const cloudinaryUrl = await uploadToCloudinary(file);

      const newImages = [...userImages];
      newImages[index] = cloudinaryUrl;
      setUserImages(newImages);

      // Update userData with Cloudinary URL instead of File object
      setUserData(prev => ({
        ...prev,
        image: newImages
      }));

    } catch (error: any) {
      console.error('Error updating image:', error);
      const msg = error.message || 'Failed to update image. Please try again.';
      setError(msg);
      toast({
        title: "Upload Error",
        description: msg,
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  const handleAddMoreImages = async () => {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';
    fileInput.multiple = true; // Allow multiple files
    fileInput.style.display = 'none';

    fileInput.addEventListener('change', async (e: Event) => {
      const target = e.target as HTMLInputElement;
      const files = Array.from(target.files || []);

      if (files.length === 0) return;

      setUploading(true);
      try {
        files.forEach(file => validateFile(file));

        const uploadPromises = files.map(file => uploadToCloudinary(file));
        const cloudinaryUrls = await Promise.all(uploadPromises);

        const newImages = [...userImages, ...cloudinaryUrls];
        setUserImages(newImages);

        setUserData(prev => ({
          ...prev,
          image: newImages
        }));

      } catch (error: any) {
        console.error('Error uploading images:', error);
        const msg = error.message || 'Failed to upload images. Please try again.';
        setError(msg);
        toast({
          title: "Upload Error",
          description: msg,
          variant: "destructive",
        });
      } finally {
        setUploading(false);
      }
    });

    document.body.appendChild(fileInput);
    fileInput.click();
    document.body.removeChild(fileInput);
  };

  const handleAddImages = async () => {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';
    fileInput.multiple = true;
    fileInput.style.display = 'none';

    fileInput.addEventListener('change', async (e: Event) => {
      const target = e.target as HTMLInputElement;
      const files = Array.from(target.files || []);

      if (files.length === 0) return;

      setUploading(true);
      try {
        files.forEach(file => validateFile(file));

        const uploadPromises = files.map(file => uploadToCloudinary(file));
        const cloudinaryUrls = await Promise.all(uploadPromises);

        setUserImages(cloudinaryUrls);

        setUserData(prev => ({
          ...prev,
          image: cloudinaryUrls
        }));

      } catch (error: any) {
        console.error('Error uploading images:', error);
        const msg = error.message || 'Failed to upload images. Please try again.';
        setError(msg);
        toast({
          title: "Upload Error",
          description: msg,
          variant: "destructive",
        });
      } finally {
        setUploading(false);
      }
    });

    document.body.appendChild(fileInput);
    fileInput.click();
    document.body.removeChild(fileInput);
  };

  const handleMakePrimary = (index: number) => {
    if (index === 0 || userImages.length <= 1) return;

    const newImages = [...userImages];
    const selectedImage = newImages.splice(index, 1)[0];
    newImages.unshift(selectedImage);

    setUserImages(newImages);

    setUserData(prev => ({
      ...prev,
      image: newImages
    }));
  };

  const handleDeleteImage = (index: number) => {
    const newImages = [...userImages];
    newImages.splice(index, 1);
    setUserImages(newImages);

    setUserData(prev => ({
      ...prev,
      image: newImages
    }));
  };


  const handleMoveExperience = (index: number, direction: 'up' | 'down') => {
    if (!response || !response.experience) return;

    const newExperience = [...response.experience];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;

    if (targetIndex < 0 || targetIndex >= newExperience.length) return;

    // Swap items
    [newExperience[index], newExperience[targetIndex]] = [newExperience[targetIndex], newExperience[index]];

    setResponse({
      ...response,
      experience: newExperience
    });
  };

  const handleMoveEducation = (index: number, direction: 'up' | 'down') => {
    if (!response || !response.education) return;

    const newEducation = [...response.education];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;

    if (targetIndex < 0 || targetIndex >= newEducation.length) return;

    // Swap items
    [newEducation[index], newEducation[targetIndex]] = [newEducation[targetIndex], newEducation[index]];

    setResponse({
      ...response,
      education: newEducation
    });
  };

  const sections = [
    { id: 'image', label: 'Images', icon: <ImageIcon className="w-4 h-4" /> },
    { id: 'personal', label: 'Personal Info', icon: <User className="w-4 h-4" /> },
    { id: 'summary', label: 'Summary', icon: <FileText className="w-4 h-4" /> },
    { id: 'skills', label: 'Skills', icon: <Zap className="w-4 h-4" /> },
    { id: 'tools', label: 'Tools', icon: <Wrench className="w-4 h-4" /> },
    { id: 'experience', label: 'Experience', icon: <Briefcase className="w-4 h-4" /> },
    { id: 'education', label: 'Education', icon: <GraduationCap className="w-4 h-4" /> },
    { id: 'certifications', label: 'Certifications', icon: <Scroll className="w-4 h-4" /> },
    { id: 'publications', label: 'Publications', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'awards', label: 'Awards', icon: <Award className="w-4 h-4" /> },
    { id: 'volunteer', label: 'Volunteer', icon: <HeartHandshake className="w-4 h-4" /> },
    { id: 'projects', label: 'Projects', icon: <Rocket className="w-4 h-4" /> },
    { id: 'online', label: 'Online Presence', icon: <Globe className="w-4 h-4" /> },
    { id: 'hobbies', label: 'Hobbies', icon: <Palette className="w-4 h-4" /> }
  ];

  const openAddModal = (sectionId: string) => {
    setModalSection(sectionId);
    let initialData = {};

    switch (sectionId) {
      case 'experience':
        initialData = { title: '', company: '', startDate: '', endDate: '', location: '', responsibilities: [] };
        break;
      case 'education':
        initialData = { degree: '', institution: '', location: '', graduationYear: '', relevantCourses: [] };
        break;
      case 'certifications':
        initialData = { name: '', issuer: '', year: '' };
        break;
      case 'publications':
        initialData = { title: '', publicationType: '', year: '', link: '' };
        break;
      case 'awards':
        initialData = { name: '', year: '', description: '' };
        break;
      case 'volunteer':
        initialData = { role: '', organization: '', startDate: '', endDate: '', description: '' };
        break;
      case 'projects':
        initialData = { title: '', description: '', technologiesUsed: [], github: '', role: '', images: [] };
        break;
    }

    setModalData(initialData);
    setIsModalOpen(true);
  };

  const handleSaveModalData = () => {
    if (!response || !modalSection) return;

    const updatedResponse = { ...response };

    switch (modalSection) {
      case 'experience':
        updatedResponse.experience = [...(updatedResponse.experience || []), modalData];
        break;
      case 'education':
        updatedResponse.education = [...(updatedResponse.education || []), modalData];
        break;
      case 'certifications':
        updatedResponse.certifications = [...(updatedResponse.certifications || []), modalData];
        break;
      case 'publications':
        updatedResponse.publications = [...(updatedResponse.publications || []), modalData];
        break;
      case 'awards':
        updatedResponse.awards = [...(updatedResponse.awards || []), modalData];
        break;
      case 'volunteer':
        updatedResponse.volunteerExperience = [...(updatedResponse.volunteerExperience || []), modalData];
        break;
      case 'projects':
        updatedResponse.projects = [...(updatedResponse.projects || []), modalData];
        break;
    }

    setResponse(updatedResponse);
    setIsModalOpen(false);
    setModalSection(null);
    setModalData({});

    toast({
      title: "Success",
      description: `Added new ${modalSection} entry.`,
    });
  };

  if (initialLoading || contextLoading) {
    return <LoadingState />;
  }

  if (!response && showNoData) {
    return (
      <div className="flex flex-col items-center justify-center h-96 border border-dashed rounded-xl p-8 bg-muted/50">
        <AlertCircle className="h-16 w-16 text-muted-foreground mb-4" />
        <p className="text-center text-lg font-medium mb-2">
          No CV data found
        </p>
        <p className="text-center text-muted-foreground text-sm">
          Please upload and analyze your CV first to get started.
        </p>
      </div>
    );
  }

  if (!response) return null;

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-6">
      <Card className="shadow-lg">
        <form onSubmit={handleSubmit}>
          <CardHeader className="space-y-4 pb-6 border-b">
            <div className="flex gap-2 overflow-x-auto py-2 scrollbar-none">
              {sections.map((section) => (
                <Button
                  key={section.id}
                  variant={activeSection === section.id ? "default" : "ghost"}
                  onClick={() => setActiveSection(section.id)}
                  className="whitespace-nowrap"
                  type="button"
                  size="sm"
                >
                  <span className="mr-2">{section.icon}</span>
                  {section.label}
                </Button>
              ))}
            </div>
          </CardHeader>

          <CardContent className="space-y-6 pt-8">
            {loading && (
              <div className="flex items-center justify-center space-x-3 p-4 bg-primary/10 rounded-lg">
                <Loader2 className="animate-spin text-primary" />
                <span className="text-primary font-medium">Updating your resume...</span>
              </div>
            )}

            {uploading && (
              <div className="flex items-center justify-center space-x-3 p-4 bg-muted rounded-lg">
                <Loader2 className="animate-spin text-muted-foreground" />
                <span className="text-muted-foreground font-medium">Uploading images...</span>
              </div>
            )}

            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {/* Image Section */}
            {activeSection === 'image' && (
              <div className="space-y-6">
                <div className="flex items-center space-x-3 pb-3 border-b">
                  <ImageIcon className="h-6 w-6 text-primary" />
                  <h3 className="text-2xl font-bold">Professional Images</h3>
                </div>

                {userImages && userImages.length > 0 ? (
                  <div>
                    <div className={`${userImages.length > 1 ? "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6" : "max-w-sm mx-auto"}`}>
                      {userImages.map((imageUrl, index) => (
                        <Card
                          key={index}
                          className={`relative group overflow-hidden transition-all ${index === 0 ? "ring-2 ring-primary ring-offset-2" : ""}`}
                        >
                          {index === 0 && (
                            <div className="absolute top-2 left-2 z-10">
                              <Badge variant="default" className="flex items-center space-x-1 shadow-sm">
                                <Star className="h-3 w-3 fill-current" />
                                <span>Primary</span>
                              </Badge>
                            </div>
                          )}

                          <div className="aspect-square overflow-hidden bg-muted">
                            <img
                              src={imageUrl}
                              alt={`Professional ${index + 1}`}
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                          </div>

                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
                            <div className="flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                              {index !== 0 && userImages.length > 1 && (
                                <Button
                                  onClick={() => handleMakePrimary(index)}
                                  size="icon"
                                  variant="secondary"
                                  type="button"
                                  title="Make primary"
                                  className="h-8 w-8 rounded-full"
                                >
                                  <Star className="h-4 w-4" />
                                </Button>
                              )}
                              <Button
                                onClick={() => document.getElementById(`file-input-${index}`)?.click()}
                                size="icon"
                                variant="secondary"
                                type="button"
                                title="Change image"
                                className="h-8 w-8 rounded-full"
                              >
                                <ImageIcon className="h-4 w-4" />
                              </Button>
                              <input
                                type="file"
                                id={`file-input-${index}`}
                                onChange={handleChangeImage(index)}
                                accept="image/*"
                                style={{ display: 'none' }}
                              />
                              <Button
                                onClick={() => handleDeleteImage(index)}
                                size="icon"
                                variant="destructive"
                                type="button"
                                title="Delete image"
                                className="h-8 w-8 rounded-full"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>

                    <div className="mt-6 flex justify-center">
                      <Button
                        onClick={handleAddMoreImages}
                        type="button"
                        disabled={uploading}
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        {uploading ? 'Uploading...' : 'Add More Images'}
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-16 bg-muted/30 rounded-lg border border-dashed">
                    <ImageIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-lg font-medium mb-2">
                      No professional images uploaded
                    </p>
                    <p className="text-muted-foreground text-sm mb-6">
                      Add your professional photos to personalize your resume
                    </p>
                    <Button
                      onClick={handleAddImages}
                      type="button"
                      disabled={uploading}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      {uploading ? 'Uploading...' : 'Upload Images'}
                    </Button>
                  </div>
                )}
              </div>
            )}

            {/* Personal Info Section */}
            {activeSection === 'personal' && (
              <div className="space-y-6">
                <h3 className="text-2xl font-bold pb-3 border-b">Personal Information</h3>
                <div className="grid gap-6 md:grid-cols-2">
                  {[
                    { label: 'Full Name', key: 'fullName', type: 'text' },
                    { label: 'Email', key: 'email', type: 'email' },
                    { label: 'Phone', key: 'phone', type: 'tel' },
                    { label: 'Location', key: 'location', type: 'text' },
                    { label: 'City', key: 'city', type: 'text' },
                    { label: 'LinkedIn', key: 'linkedin', type: 'url' },
                    { label: 'Website', key: 'website', type: 'url' },
                    { label: 'GitHub', key: 'github', type: 'url' },
                    { label: 'Portfolio', key: 'portfolio', type: 'url' },
                  ].map(field => (
                    <div key={field.key} className="space-y-2">
                      <Label>{field.label}</Label>
                      <Input
                        type={field.type}
                        value={response.personalInfo?.[field.key] || ''}
                        onChange={(e) =>
                          setResponse({
                            ...response,
                            personalInfo: { ...response.personalInfo, [field.key]: e.target.value },
                          })
                        }
                        placeholder={`Enter ${field.label.toLowerCase()}`}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Professional Summary */}
            {activeSection === 'summary' && (
              <div className="space-y-4">
                <h3 className="text-2xl font-bold pb-3 border-b">Professional Summary</h3>
                <Textarea
                  value={response.professionalSummary || ''}
                  onChange={(e) => setResponse({ ...response, professionalSummary: e.target.value })}
                  placeholder="Write a compelling professional summary that highlights your key achievements and career goals..."
                  rows={8}
                />
              </div>
            )}

            {/* Skills Section */}
            {activeSection === 'skills' && (
              <div className="space-y-6">
                <h3 className="text-2xl font-bold pb-3 border-b">Skills</h3>
                {[
                  { label: 'Technical Skills', key: 'technical', placeholder: 'Add a technical skill...' },
                  { label: 'Soft Skills', key: 'soft', placeholder: 'Add a soft skill...' },
                  { label: 'Languages', key: 'languages', placeholder: 'Add a language...' },
                ].map(skill => (
                  <div key={skill.key} className="space-y-2">
                    <Label>{skill.label}</Label>
                    <TagInput
                      tags={response.skills?.[skill.key] || []}
                      onTagsChange={(newTags) =>
                        setResponse({
                          ...response,
                          skills: {
                            ...response.skills,
                            [skill.key]: newTags
                          },
                        })
                      }
                      placeholder={skill.placeholder}
                    />
                  </div>
                ))}
              </div>
            )}

            {/* Tools Section */}
            {activeSection === 'tools' && (
              <div className="space-y-4">
                <h3 className="text-2xl font-bold pb-3 border-b">Tools & Technologies</h3>
                <TagInput
                  tags={response.tools || []}
                  onTagsChange={(newTags) =>
                    setResponse({
                      ...response,
                      tools: newTags,
                    })
                  }
                  placeholder="Add a tool (e.g. Git, Figma)..."
                />
              </div>
            )}

            {/* Experience Section */}
            {activeSection === 'experience' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-3 border-b">
                  <h3 className="text-2xl font-bold">Work Experience</h3>
                  <Button
                    onClick={() => openAddModal('experience')}
                    type="button"
                    size="sm"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Experience
                  </Button>
                </div>

                {response.experience && response.experience.map((exp, index) => (
                  <Card key={index} className="relative">
                    <CardHeader className="bg-muted/30">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">Experience #{index + 1}</CardTitle>
                        <div className="flex items-center gap-1">
                          <Button
                            onClick={() => handleMoveExperience(index, 'up')}
                            disabled={index === 0}
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                          >
                            <ChevronUp className="h-4 w-4" />
                          </Button>
                          <Button
                            onClick={() => handleMoveExperience(index, 'down')}
                            disabled={index === response.experience.length - 1}
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                          >
                            <ChevronDown className="h-4 w-4" />
                          </Button>
                          <Button
                            onClick={() => {
                              setResponse({
                                ...response,
                                experience: response.experience.filter((_, i) => i !== index)
                              });
                            }}
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="text-destructive hover:text-destructive hover:bg-destructive/10 h-8 w-8"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4 pt-6">
                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                          <Label>Job Title</Label>
                          <Input
                            value={exp.title || ''}
                            onChange={(e) => {
                              const updated = [...response.experience];
                              updated[index].title = e.target.value;
                              setResponse({ ...response, experience: updated });
                            }}
                            placeholder="Senior Developer"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Company</Label>
                          <Input
                            value={exp.company || ''}
                            onChange={(e) => {
                              const updated = [...response.experience];
                              updated[index].company = e.target.value;
                              setResponse({ ...response, experience: updated });
                            }}
                            placeholder="Tech Corp"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Start Date</Label>
                          <Input
                            value={exp.startDate || ''}
                            onChange={(e) => {
                              const updated = [...response.experience];
                              updated[index].startDate = e.target.value;
                              setResponse({ ...response, experience: updated });
                            }}
                            placeholder="2020-01"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>End Date</Label>
                          <Input
                            value={exp.endDate || ''}
                            onChange={(e) => {
                              const updated = [...response.experience];
                              updated[index].endDate = e.target.value;
                              setResponse({ ...response, experience: updated });
                            }}
                            placeholder="Present"
                          />
                        </div>
                        <div className="space-y-2 md:col-span-2">
                          <Label>Location</Label>
                          <Input
                            value={exp.location || ''}
                            onChange={(e) => {
                              const updated = [...response.experience];
                              updated[index].location = e.target.value;
                              setResponse({ ...response, experience: updated });
                            }}
                            placeholder="City, Country"
                          />
                        </div>
                        <div className="space-y-2 md:col-span-2">
                          <Label>Responsibilities</Label>
                          <Textarea
                            value={exp.responsibilities?.join('\n') || ''}
                            onChange={(e) => {
                              const updated = [...response.experience];
                              updated[index].responsibilities = e.target.value.split('\n').filter(r => r.trim());
                              setResponse({ ...response, experience: updated });
                            }}
                            placeholder="• Led development of feature X&#10;• Managed team of 5 developers&#10;• Improved performance by 40%"
                            rows={5}
                          />
                          <p className="text-xs text-muted-foreground">One responsibility per line</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {/* Education Section */}
            {activeSection === 'education' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-3 border-b">
                  <h3 className="text-2xl font-bold">Education</h3>
                  <Button
                    onClick={() => openAddModal('education')}
                    type="button"
                    size="sm"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Education
                  </Button>
                </div>

                {response.education && response.education.map((edu, index) => (
                  <Card key={index} className="relative">
                    <CardHeader className="bg-muted/30">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">Education #{index + 1}</CardTitle>
                        <div className="flex items-center gap-1">
                          <Button
                            onClick={() => handleMoveEducation(index, 'up')}
                            disabled={index === 0}
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                          >
                            <ChevronUp className="h-4 w-4" />
                          </Button>
                          <Button
                            onClick={() => handleMoveEducation(index, 'down')}
                            disabled={index === response.education.length - 1}
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                          >
                            <ChevronDown className="h-4 w-4" />
                          </Button>
                          <Button
                            onClick={() => {
                              setResponse({
                                ...response,
                                education: response.education.filter((_, i) => i !== index)
                              });
                            }}
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="text-destructive hover:text-destructive hover:bg-destructive/10 h-8 w-8"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4 pt-6">
                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                          <Label>Degree</Label>
                          <Input
                            value={edu.degree || ''}
                            onChange={(e) => {
                              const updated = [...response.education];
                              updated[index].degree = e.target.value;
                              setResponse({ ...response, education: updated });
                            }}
                            placeholder="Bachelor of Science"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Institution</Label>
                          <Input
                            value={edu.institution || ''}
                            onChange={(e) => {
                              const updated = [...response.education];
                              updated[index].institution = e.target.value;
                              setResponse({ ...response, education: updated });
                            }}
                            placeholder="University Name"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Location</Label>
                          <Input
                            value={edu.location || ''}
                            onChange={(e) => {
                              const updated = [...response.education];
                              updated[index].location = e.target.value;
                              setResponse({ ...response, education: updated });
                            }}
                            placeholder="City, Country"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Graduation Year</Label>
                          <Input
                            value={edu.graduationYear || ''}
                            onChange={(e) => {
                              const updated = [...response.education];
                              updated[index].graduationYear = e.target.value;
                              setResponse({ ...response, education: updated });
                            }}
                            placeholder="2024"
                          />
                        </div>
                        <div className="space-y-2 md:col-span-2">
                          <Label>Relevant Courses</Label>
                          <Textarea
                            value={edu.relevantCourses?.join('\n') || ''}
                            onChange={(e) => {
                              const updated = [...response.education];
                              updated[index].relevantCourses = e.target.value.split('\n').filter(c => c.trim());
                              setResponse({ ...response, education: updated });
                            }}
                            placeholder="Data Structures&#10;Algorithms&#10;Web Development"
                            rows={4}
                          />
                          <p className="text-xs text-muted-foreground">One course per line</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {/* Certifications Section */}
            {activeSection === 'certifications' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-3 border-b">
                  <h3 className="text-2xl font-bold">Certifications</h3>
                  <Button
                    onClick={() => openAddModal('certifications')}
                    type="button"
                    size="sm"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Certification
                  </Button>
                </div>

                {response.certifications && response.certifications.map((cert, index) => (
                  <Card key={index} className="relative">
                    <CardHeader className="bg-muted/30">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">Certification #{index + 1}</CardTitle>
                        <Button
                          onClick={() => {
                            setResponse({
                              ...response,
                              certifications: response.certifications.filter((_, i) => i !== index)
                            });
                          }}
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="text-destructive hover:text-destructive hover:bg-destructive/10"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4 pt-6">
                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2 md:col-span-2">
                          <Label>Certification Name</Label>
                          <Input
                            value={cert.name || ''}
                            onChange={(e) => {
                              const updated = [...response.certifications];
                              updated[index].name = e.target.value;
                              setResponse({ ...response, certifications: updated });
                            }}
                            placeholder="AWS Certified Solutions Architect"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Issuing Organization</Label>
                          <Input
                            value={cert.issuer || ''}
                            onChange={(e) => {
                              const updated = [...response.certifications];
                              updated[index].issuer = e.target.value;
                              setResponse({ ...response, certifications: updated });
                            }}
                            placeholder="Amazon Web Services"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Year</Label>
                          <Input
                            value={cert.year || ''}
                            onChange={(e) => {
                              const updated = [...response.certifications];
                              updated[index].year = e.target.value;
                              setResponse({ ...response, certifications: updated });
                            }}
                            placeholder="2024"
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {/* Publications Section */}
            {activeSection === 'publications' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-3 border-b">
                  <h3 className="text-2xl font-bold">Publications</h3>
                  <Button
                    onClick={() => openAddModal('publications')}
                    type="button"
                    size="sm"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Publication
                  </Button>
                </div>

                {response.publications && response.publications.map((pub, index) => (
                  <Card key={index} className="relative">
                    <CardHeader className="bg-muted/30">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">Publication #{index + 1}</CardTitle>
                        <Button
                          onClick={() => {
                            setResponse({
                              ...response,
                              publications: response.publications.filter((_, i) => i !== index)
                            });
                          }}
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="text-destructive hover:text-destructive hover:bg-destructive/10"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4 pt-6">
                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2 md:col-span-2">
                          <Label>Title</Label>
                          <Input
                            value={pub.title || ''}
                            onChange={(e) => {
                              const updated = [...response.publications];
                              updated[index].title = e.target.value;
                              setResponse({ ...response, publications: updated });
                            }}
                            placeholder="Research Paper Title"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Publication Type</Label>
                          <Input
                            value={pub.publicationType || ''}
                            onChange={(e) => {
                              const updated = [...response.publications];
                              updated[index].publicationType = e.target.value;
                              setResponse({ ...response, publications: updated });
                            }}
                            placeholder="Journal Article, Conference Paper"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Year</Label>
                          <Input
                            value={pub.year || ''}
                            onChange={(e) => {
                              const updated = [...response.publications];
                              updated[index].year = e.target.value;
                              setResponse({ ...response, publications: updated });
                            }}
                            placeholder="2024"
                          />
                        </div>
                        <div className="space-y-2 md:col-span-2">
                          <Label>Link</Label>
                          <Input
                            value={pub.link || ''}
                            onChange={(e) => {
                              const updated = [...response.publications];
                              updated[index].link = e.target.value;
                              setResponse({ ...response, publications: updated });
                            }}
                            placeholder="https://doi.org/..."
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {/* Awards Section */}
            {activeSection === 'awards' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-3 border-b">
                  <h3 className="text-2xl font-bold">Awards & Honors</h3>
                  <Button
                    onClick={() => openAddModal('awards')}
                    type="button"
                    size="sm"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Award
                  </Button>
                </div>

                {response.awards && response.awards.map((award, index) => (
                  <Card key={index} className="relative">
                    <CardHeader className="bg-muted/30">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">Award #{index + 1}</CardTitle>
                        <Button
                          onClick={() => {
                            setResponse({
                              ...response,
                              awards: response.awards.filter((_, i) => i !== index)
                            });
                          }}
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="text-destructive hover:text-destructive hover:bg-destructive/10"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4 pt-6">
                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                          <Label>Award Name</Label>
                          <Input
                            value={award.name || ''}
                            onChange={(e) => {
                              const updated = [...response.awards];
                              updated[index].name = e.target.value;
                              setResponse({ ...response, awards: updated });
                            }}
                            placeholder="Employee of the Year"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Year</Label>
                          <Input
                            value={award.year || ''}
                            onChange={(e) => {
                              const updated = [...response.awards];
                              updated[index].year = e.target.value;
                              setResponse({ ...response, awards: updated });
                            }}
                            placeholder="2024"
                          />
                        </div>
                        <div className="space-y-2 md:col-span-2">
                          <Label>Description</Label>
                          <Textarea
                            value={award.description || ''}
                            onChange={(e) => {
                              const updated = [...response.awards];
                              updated[index].description = e.target.value;
                              setResponse({ ...response, awards: updated });
                            }}
                            placeholder="Describe the achievement..."
                            rows={3}
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {/* Volunteer Experience Section */}
            {activeSection === 'volunteer' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-3 border-b">
                  <h3 className="text-2xl font-bold">Volunteer Experience</h3>
                  <Button
                    onClick={() => openAddModal('volunteer')}
                    type="button"
                    size="sm"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Volunteer Work
                  </Button>
                </div>

                {response.volunteerExperience && response.volunteerExperience.map((vol, index) => (
                  <Card key={index} className="relative">
                    <CardHeader className="bg-muted/30">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">Volunteer #{index + 1}</CardTitle>
                        <Button
                          onClick={() => {
                            setResponse({
                              ...response,
                              volunteerExperience: response.volunteerExperience.filter((_, i) => i !== index)
                            });
                          }}
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="text-destructive hover:text-destructive hover:bg-destructive/10"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4 pt-6">
                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                          <Label>Role</Label>
                          <Input
                            value={vol.role || ''}
                            onChange={(e) => {
                              const updated = [...response.volunteerExperience];
                              updated[index].role = e.target.value;
                              setResponse({ ...response, volunteerExperience: updated });
                            }}
                            placeholder="Volunteer Coordinator"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Organization</Label>
                          <Input
                            value={vol.organization || ''}
                            onChange={(e) => {
                              const updated = [...response.volunteerExperience];
                              updated[index].organization = e.target.value;
                              setResponse({ ...response, volunteerExperience: updated });
                            }}
                            placeholder="Non-profit Organization"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Start Date</Label>
                          <Input
                            value={vol.startDate || ''}
                            onChange={(e) => {
                              const updated = [...response.volunteerExperience];
                              updated[index].startDate = e.target.value;
                              setResponse({ ...response, volunteerExperience: updated });
                            }}
                            placeholder="2023-01"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>End Date</Label>
                          <Input
                            value={vol.endDate || ''}
                            onChange={(e) => {
                              const updated = [...response.volunteerExperience];
                              updated[index].endDate = e.target.value;
                              setResponse({ ...response, volunteerExperience: updated });
                            }}
                            placeholder="Present"
                          />
                        </div>
                        <div className="space-y-2 md:col-span-2">
                          <Label>Description</Label>
                          <Textarea
                            value={vol.description || ''}
                            onChange={(e) => {
                              const updated = [...response.volunteerExperience];
                              updated[index].description = e.target.value;
                              setResponse({ ...response, volunteerExperience: updated });
                            }}
                            placeholder="Describe your volunteer contributions..."
                            rows={4}
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {/* Projects Section */}
            {activeSection === 'projects' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-3 border-b">
                  <h3 className="text-2xl font-bold">Projects</h3>
                  <Button
                    onClick={() => openAddModal('projects')}
                    type="button"
                    size="sm"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Project
                  </Button>
                </div>

                {response.projects && response.projects.map((proj, index) => (
                  <Card key={index} className="relative">
                    <CardHeader className="bg-muted/30">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">Project #{index + 1}</CardTitle>
                        <Button
                          onClick={() => {
                            setResponse({
                              ...response,
                              projects: response.projects.filter((_, i) => i !== index)
                            });
                          }}
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="text-destructive hover:text-destructive hover:bg-destructive/10"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4 pt-6">
                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2 md:col-span-2">
                          <Label>Project Title</Label>
                          <Input
                            value={proj.title || ''}
                            onChange={(e) => {
                              const updated = [...response.projects];
                              updated[index].title = e.target.value;
                              setResponse({ ...response, projects: updated });
                            }}
                            placeholder="E-commerce Platform"
                          />
                        </div>
                        <div className="space-y-4 md:col-span-2">
                          <div className="flex items-center justify-between">
                            <Label>Project Images</Label>
                            <Button
                              onClick={() => document.getElementById(`project-multiple-file-input-${index}`)?.click()}
                              type="button"
                              disabled={uploading}
                              size="sm"
                              variant="outline"
                            >
                              <Plus className="h-3 w-3 mr-1" />
                              Add Images
                            </Button>
                            <input
                              type="file"
                              id={`project-multiple-file-input-${index}`}
                              onChange={async (e) => {
                                const files = Array.from(e.target.files || []);
                                if (files.length === 0) return;

                                setUploading(true);
                                try {
                                  const uploadPromises = files.map(file => uploadToCloudinary(file));
                                  const cloudinaryUrls = await Promise.all(uploadPromises);

                                  const updated = [...response.projects];
                                  updated[index].images = [...(updated[index].images || []), ...cloudinaryUrls];
                                  setResponse({ ...response, projects: updated });

                                } catch (error) {
                                  console.error('Error uploading project images:', error);
                                  setError('Failed to upload project images. Please try again.');
                                } finally {
                                  setUploading(false);
                                }
                              }}
                              accept="image/*"
                              multiple
                              style={{ display: 'none' }}
                            />
                          </div>

                          {proj.images && proj.images.length > 0 ? (
                            <div>
                              <div className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ${proj.images.length === 1 ? 'max-w-md' : ''}`}>
                                {proj.images.map((imageUrl, imageIndex) => (
                                  <Card
                                    key={imageIndex}
                                    className="relative group overflow-hidden transition-all"
                                  >
                                    {imageIndex === 0 && (
                                      <div className="absolute top-2 left-2 z-10">
                                        <Badge variant="default" className="flex items-center space-x-1 shadow-sm">
                                          <Star className="h-3 w-3 fill-current" />
                                          <span>Primary</span>
                                        </Badge>
                                      </div>
                                    )}

                                    <div className="aspect-video overflow-hidden bg-muted">
                                      <img
                                        src={imageUrl}
                                        alt={`Project ${index + 1} - Image ${imageIndex + 1}`}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                      />
                                    </div>

                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                      <div className="flex justify-center space-x-1">
                                        {imageIndex !== 0 && proj.images.length > 1 && (
                                          <Button
                                            onClick={() => {
                                              const updated = [...response.projects];
                                              const projectImages = [...updated[index].images];
                                              const selectedImage = projectImages.splice(imageIndex, 1)[0];
                                              projectImages.unshift(selectedImage);
                                              updated[index].images = projectImages;
                                              setResponse({ ...response, projects: updated });
                                            }}
                                            size="icon"
                                            variant="secondary"
                                            className="h-8 w-8 rounded-full"
                                            type="button"
                                            title="Make primary"
                                          >
                                            <Star className="h-3 w-3" />
                                          </Button>
                                        )}
                                        <Button
                                          onClick={() => document.getElementById(`project-single-file-input-${index}-${imageIndex}`)?.click()}
                                          size="icon"
                                          variant="secondary"
                                          className="h-8 w-8 rounded-full"
                                          type="button"
                                          title="Change image"
                                        >
                                          <ImageIcon className="h-3 w-3" />
                                        </Button>
                                        <input
                                          type="file"
                                          id={`project-single-file-input-${index}-${imageIndex}`}
                                          onChange={async (e) => {
                                            const file = e.target.files?.[0];
                                            if (!file) return;

                                            setUploading(true);
                                            try {
                                              const cloudinaryUrl = await uploadToCloudinary(file);

                                              const updated = [...response.projects];
                                              updated[index].images[imageIndex] = cloudinaryUrl;
                                              setResponse({ ...response, projects: updated });

                                            } catch (error) {
                                              console.error('Error updating project image:', error);
                                              setError('Failed to update project image. Please try again.');
                                            } finally {
                                              setUploading(false);
                                            }
                                          }}
                                          accept="image/*"
                                          style={{ display: 'none' }}
                                        />
                                        <Button
                                          onClick={() => {
                                            const updated = [...response.projects];
                                            updated[index].images = updated[index].images.filter((_, i) => i !== imageIndex);
                                            setResponse({ ...response, projects: updated });
                                          }}
                                          size="icon"
                                          variant="destructive"
                                          className="h-8 w-8 rounded-full"
                                          type="button"
                                          title="Delete image"
                                        >
                                          <Trash2 className="h-3 w-3" />
                                        </Button>
                                      </div>
                                    </div>
                                  </Card>
                                ))}
                              </div>

                              <div className="mt-4 flex justify-center">
                                <Button
                                  onClick={() => document.getElementById(`project-multiple-file-input-${index}`)?.click()}
                                  type="button"
                                  disabled={uploading}
                                  variant="outline"
                                >
                                  <Plus className="h-4 w-4 mr-2" />
                                  {uploading ? 'Uploading...' : 'Add More Images'}
                                </Button>
                              </div>
                            </div>
                          ) : (
                            <div className="text-center py-8 bg-muted/30 rounded-lg border border-dashed">
                              <ImageIcon className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
                              <p className="text-sm font-medium mb-2">
                                No project images uploaded
                              </p>
                              <p className="text-muted-foreground text-xs mb-4">
                                Add screenshots or visual representations of your project
                              </p>
                              <Button
                                onClick={() => document.getElementById(`project-multiple-file-input-${index}`)?.click()}
                                type="button"
                                disabled={uploading}
                                variant="outline"
                                size="sm"
                              >
                                <Plus className="h-4 w-4 mr-2" />
                                {uploading ? 'Uploading...' : 'Upload Project Images'}
                              </Button>
                            </div>
                          )}
                        </div>
                        <div className="space-y-2 md:col-span-2">
                          <Label>Description</Label>
                          <Textarea
                            value={proj.description || ''}
                            onChange={(e) => {
                              const updated = [...response.projects];
                              updated[index].description = e.target.value;
                              setResponse({ ...response, projects: updated });
                            }}
                            placeholder="Describe the project and your contributions..."
                            rows={4}
                          />
                        </div>
                        <div className="space-y-2 md:col-span-2">
                          <Label>Technologies Used</Label>
                          <TagInput
                            tags={proj.technologiesUsed || []}
                            onTagsChange={(newTags) => {
                              const updated = [...response.projects];
                              updated[index].technologiesUsed = newTags;
                              setResponse({ ...response, projects: updated });
                            }}
                            placeholder="Add technology..."
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>GitHub URL</Label>
                          <Input
                            value={proj.github || ''}
                            onChange={(e) => {
                              const updated = [...response.projects];
                              updated[index].github = e.target.value;
                              setResponse({ ...response, projects: updated });
                            }}
                            placeholder="https://github.com/..."
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Project url</Label>
                          <Input
                            value={proj.url || ''}
                            onChange={(e) => {
                              const updated = [...response.projects];
                              updated[index].url = e.target.value;
                              setResponse({ ...response, projects: updated });
                            }}
                            placeholder="https://project.com/..."
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Your Role</Label>
                          <Input
                            value={proj.role || ''}
                            onChange={(e) => {
                              const updated = [...response.projects];
                              updated[index].role = e.target.value;
                              setResponse({ ...response, projects: updated });
                            }}
                            placeholder="Lead Developer"
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {/* Online Presence Section */}
            {activeSection === 'online' && (
              <div className="space-y-6">
                <h3 className="text-2xl font-bold pb-3 border-b">Online Presence</h3>
                <div className="grid gap-6 md:grid-cols-2">
                  {[
                    { label: 'Twitter', key: 'twitter', placeholder: 'https://twitter.com/username' },
                    { label: 'Stack Overflow', key: 'stackOverflow', placeholder: 'https://stackoverflow.com/users/...' },
                    { label: 'Medium', key: 'medium', placeholder: 'https://medium.com/@username' },
                  ].map(field => (
                    <div key={field.key} className="space-y-2">
                      <Label>{field.label}</Label>
                      <Input
                        value={response.onlinePresence?.[field.key] || ''}
                        onChange={(e) =>
                          setResponse({
                            ...response,
                            onlinePresence: { ...response.onlinePresence, [field.key]: e.target.value },
                          })
                        }
                        placeholder={field.placeholder}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Hobbies Section */}
            {activeSection === 'hobbies' && (
              <div className="space-y-4">
                <h3 className="text-2xl font-bold pb-3 border-b">Hobbies & Interests</h3>
                <TagInput
                  tags={response.hobbies || []}
                  onTagsChange={(newTags) =>
                    setResponse({
                      ...response,
                      hobbies: newTags,
                    })
                  }
                  placeholder="Add a hobby (e.g. Photography, Reading)..."
                />
              </div>
            )}

            <div className="flex justify-end pt-6 border-t">
              <Button
                type="submit"
                disabled={loading}
                size="lg"
              >
                {loading ? (
                  <>
                    <Loader2 className="animate-spin h-5 w-5 mr-2" />
                    Updating...
                  </>
                ) : (
                  <>
                    Save Changes
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </form>

        {/* Add New Entry Modal */}
        <Sheet open={isModalOpen} onOpenChange={setIsModalOpen}>
          <SheetContent side="right" className="w-[400px] sm:w-[540px] overflow-y-auto">
            <SheetHeader>
              <SheetTitle>Add {modalSection === 'volunteer' ? 'Volunteer Experience' : modalSection?.charAt(0).toUpperCase().concat(modalSection?.slice(1))}</SheetTitle>
              <SheetDescription>
                Enter the details for the new {modalSection} entry.
              </SheetDescription>
            </SheetHeader>

            <div className="grid gap-4 py-4">
              {modalSection === 'experience' && (
                <>
                  <div className="space-y-2">
                    <Label>Job Title</Label>
                    <Input
                      value={modalData.title || ''}
                      onChange={(e) => setModalData({ ...modalData, title: e.target.value })}
                      placeholder="Senior Developer"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Company</Label>
                    <Input
                      value={modalData.company || ''}
                      onChange={(e) => setModalData({ ...modalData, company: e.target.value })}
                      placeholder="Tech Corp"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Start Date</Label>
                      <Input
                        value={modalData.startDate || ''}
                        onChange={(e) => setModalData({ ...modalData, startDate: e.target.value })}
                        placeholder="2020-01"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>End Date</Label>
                      <Input
                        value={modalData.endDate || ''}
                        onChange={(e) => setModalData({ ...modalData, endDate: e.target.value })}
                        placeholder="Present"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Location</Label>
                    <Input
                      value={modalData.location || ''}
                      onChange={(e) => setModalData({ ...modalData, location: e.target.value })}
                      placeholder="City, Country"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Responsibilities</Label>
                    <Textarea
                      value={modalData.responsibilities?.join('\n') || ''}
                      onChange={(e) => setModalData({ ...modalData, responsibilities: e.target.value.split('\n').filter(r => r.trim()) })}
                      placeholder="Enter responsibilities (one per line)"
                      rows={5}
                    />
                    <p className="text-xs text-muted-foreground">One responsibility per line</p>
                  </div>
                </>
              )}

              {modalSection === 'education' && (
                <>
                  <div className="space-y-2">
                    <Label>Degree</Label>
                    <Input
                      value={modalData.degree || ''}
                      onChange={(e) => setModalData({ ...modalData, degree: e.target.value })}
                      placeholder="Bachelor of Science"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Institution</Label>
                    <Input
                      value={modalData.institution || ''}
                      onChange={(e) => setModalData({ ...modalData, institution: e.target.value })}
                      placeholder="University Name"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Location</Label>
                      <Input
                        value={modalData.location || ''}
                        onChange={(e) => setModalData({ ...modalData, location: e.target.value })}
                        placeholder="City, Country"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Graduation Year</Label>
                      <Input
                        value={modalData.graduationYear || ''}
                        onChange={(e) => setModalData({ ...modalData, graduationYear: e.target.value })}
                        placeholder="2024"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Relevant Courses</Label>
                    <Textarea
                      value={modalData.relevantCourses?.join('\n') || ''}
                      onChange={(e) => setModalData({ ...modalData, relevantCourses: e.target.value.split('\n').filter(c => c.trim()) })}
                      placeholder="Enter courses (one per line)"
                      rows={5}
                    />
                    <p className="text-xs text-muted-foreground">One course per line</p>
                  </div>
                </>
              )}

              {modalSection === 'certifications' && (
                <>
                  <div className="space-y-2">
                    <Label>Certification Name</Label>
                    <Input
                      value={modalData.name || ''}
                      onChange={(e) => setModalData({ ...modalData, name: e.target.value })}
                      placeholder="AWS Certified Solutions Architect"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Issuing Organization</Label>
                    <Input
                      value={modalData.issuer || ''}
                      onChange={(e) => setModalData({ ...modalData, issuer: e.target.value })}
                      placeholder="Amazon Web Services"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Year</Label>
                    <Input
                      value={modalData.year || ''}
                      onChange={(e) => setModalData({ ...modalData, year: e.target.value })}
                      placeholder="2024"
                    />
                  </div>
                </>
              )}

              {modalSection === 'publications' && (
                <>
                  <div className="space-y-2">
                    <Label>Title</Label>
                    <Input
                      value={modalData.title || ''}
                      onChange={(e) => setModalData({ ...modalData, title: e.target.value })}
                      placeholder="Publication Title"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Publication Type</Label>
                    <Input
                      value={modalData.publicationType || ''}
                      onChange={(e) => setModalData({ ...modalData, publicationType: e.target.value })}
                      placeholder="Journal, Conference"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Year</Label>
                      <Input
                        value={modalData.year || ''}
                        onChange={(e) => setModalData({ ...modalData, year: e.target.value })}
                        placeholder="2024"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Link</Label>
                      <Input
                        value={modalData.link || ''}
                        onChange={(e) => setModalData({ ...modalData, link: e.target.value })}
                        placeholder="https://..."
                      />
                    </div>
                  </div>
                </>
              )}

              {modalSection === 'awards' && (
                <>
                  <div className="space-y-2">
                    <Label>Award Name</Label>
                    <Input
                      value={modalData.name || ''}
                      onChange={(e) => setModalData({ ...modalData, name: e.target.value })}
                      placeholder="Employee of the Year"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Year</Label>
                    <Input
                      value={modalData.year || ''}
                      onChange={(e) => setModalData({ ...modalData, year: e.target.value })}
                      placeholder="2024"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Description</Label>
                    <Textarea
                      value={modalData.description || ''}
                      onChange={(e) => setModalData({ ...modalData, description: e.target.value })}
                      placeholder="Award description..."
                      rows={4}
                    />
                  </div>
                </>
              )}

              {modalSection === 'volunteer' && (
                <>
                  <div className="space-y-2">
                    <Label>Role</Label>
                    <Input
                      value={modalData.role || ''}
                      onChange={(e) => setModalData({ ...modalData, role: e.target.value })}
                      placeholder="Volunteer Role"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Organization</Label>
                    <Input
                      value={modalData.organization || ''}
                      onChange={(e) => setModalData({ ...modalData, organization: e.target.value })}
                      placeholder="Organization"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Start Date</Label>
                      <Input
                        value={modalData.startDate || ''}
                        onChange={(e) => setModalData({ ...modalData, startDate: e.target.value })}
                        placeholder="2023-01"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>End Date</Label>
                      <Input
                        value={modalData.endDate || ''}
                        onChange={(e) => setModalData({ ...modalData, endDate: e.target.value })}
                        placeholder="Present"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Description</Label>
                    <Textarea
                      value={modalData.description || ''}
                      onChange={(e) => setModalData({ ...modalData, description: e.target.value })}
                      placeholder="Description..."
                      rows={4}
                    />
                  </div>
                </>
              )}

              {modalSection === 'projects' && (
                <>
                  <div className="space-y-2">
                    <Label>Project Title</Label>
                    <Input
                      value={modalData.title || ''}
                      onChange={(e) => setModalData({ ...modalData, title: e.target.value })}
                      placeholder="Project Name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Role</Label>
                    <Input
                      value={modalData.role || ''}
                      onChange={(e) => setModalData({ ...modalData, role: e.target.value })}
                      placeholder="Lead Developer"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Description</Label>
                    <Textarea
                      value={modalData.description || ''}
                      onChange={(e) => setModalData({ ...modalData, description: e.target.value })}
                      placeholder="Project description..."
                      rows={4}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>GitHub Link</Label>
                    <Input
                      value={modalData.github || ''}
                      onChange={(e) => setModalData({ ...modalData, github: e.target.value })}
                      placeholder="https://github.com/..."
                    />
                  </div>
                </>
              )}
            </div>

            <SheetFooter className="mt-6">
              <SheetClose asChild>
                <Button variant="outline">Cancel</Button>
              </SheetClose>
              <Button onClick={handleSaveModalData}>
                <Save className="h-4 w-4 mr-2" />
                Save Entry
              </Button>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </Card>
    </div>
  );
}