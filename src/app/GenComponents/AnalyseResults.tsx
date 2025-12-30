"use client"

import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { AlertCircle, Loader2 } from 'lucide-react';
import React, { useContext, useEffect, useState } from 'react';
import { ReadContext } from './ReadContext';
import { getFromStorage, saveToStorage } from '@/Cookiesmv';
import { Resume } from '../types/resume';

export default function AnalyseResults() {
  const [response, setResponse] = useState<Resume | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [activeSection, setActiveSection] = useState('personal');
  const { AnlysedCV, setAnlysedCV, setUserData } = useContext(ReadContext);
  const storedImages = getFromStorage('userImage');
  const [userImages, setUserImages] = useState<string[]>(storedImages || []);

  useEffect(() => {
    if (!AnlysedCV) {
      const storedData = getFromStorage('userData');
      if (storedData) {
        console.log("storedData :", storedData);
        setResponse(storedData);
        setUserImages(getFromStorage('userImage') || []);
      }
    } else {
      setResponse(AnlysedCV);
    }
  }, [AnlysedCV]);

  const handleSubmit = (e : any) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      if (response) {
        setAnlysedCV(response);
        
        saveToStorage('userData', response);
        saveToStorage('userImage', userImages);
        
        setError('');
      }
    } catch (err) {
      console.error("Error updating resume data:", err);
      setError('Failed to update resume data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleChangeImage = (index: number) => async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
  
    try {
      const newImages = [...userImages];
      
      const reader = new FileReader();
      reader.readAsDataURL(file);
      
      reader.onload = () => {
        if (reader.result) {
          newImages[index] = reader.result as string;
          
          setUserImages(newImages);
          setUserData(prev => ({
            ...prev,
            image: [file] 
          }));
          
          saveToStorage('userImage', newImages);
        }
      };
  
      reader.onerror = () => {
        throw new Error('Failed to read image file');
      };
      
    } catch (error) {
      console.error('Error updating image:', error);
      setError('Failed to update image. Please try again.');
    }
  };

  const handleAddMoreImages = () => {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';
    fileInput.style.display = 'none';
    
    fileInput.addEventListener('change', (e: any) => {
      const file = e.target.files?.[0];
      if (!file) return;
      
      const reader = new FileReader();
      reader.readAsDataURL(file);
      
      reader.onload = () => {
        if (reader.result) {
          const newImages = [...userImages, reader.result as string];
          setUserImages(newImages);
          saveToStorage('userImage', newImages);
          
          setUserData(prev => ({
            ...prev,
            image: prev?.image ? [...prev?.image, file] : [file]
          }));
        }
      };
    });
    
    document.body.appendChild(fileInput);
    fileInput.click();
    document.body.removeChild(fileInput);
  };

  const handleAddImages = () => {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';
    fileInput.style.display = 'none';
    
    fileInput.addEventListener('change', (e: any) => {
      const file = e.target.files?.[0];
      if (!file) return;
      
      const reader = new FileReader();
      reader.readAsDataURL(file);
      
      reader.onload = () => {
        if (reader.result) {
          const newImages = [reader.result as string];
          setUserImages(newImages);
          saveToStorage('userImage', newImages);
          
          setUserData(prev => ({
            ...prev,
            image: [file]
          }));
        }
      };
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
    saveToStorage('userImage', newImages);
    
    setUserData(prev => {
      if (!Array.isArray(prev?.image) || prev?.image.length <= 1) return prev;
      
      const updatedImages = [...prev?.image];
      const selectedFile = updatedImages.splice(index, 1)[0];
      updatedImages.unshift(selectedFile);
      
      return {
        ...prev,
        image: updatedImages
      };
    });
  };
  
  const handleDeleteImage = (index: number) => {
    const newImages = [...userImages];
    newImages.splice(index, 1);
    setUserImages(newImages);
    saveToStorage('userImage', newImages);
    
    // Update userdata context accordingly
    setUserData(prev => {
      const updatedImages = Array.isArray(prev?.image) ? [...prev?.image] : [];
      updatedImages.splice(index, 1);
      return {
        ...prev,
        image: updatedImages
      };
    });
  };

  

  const sections = [
    { id: 'image', label: 'Personal image' },
    { id: 'personal', label: 'Personal Info' },
    { id: 'summary', label: 'Summary' },
    { id: 'skills', label: 'Skills' },
    { id: 'tools', label: 'Tools' },
    { id: 'experience', label: 'Experience' },
    { id: 'education', label: 'Education' },
    { id: 'certifications', label: 'Certifications' },
    { id: 'publications', label: 'Publications' },
    { id: 'awards', label: 'Awards' },
    { id: 'volunteer', label: 'Volunteer Experience' },
    { id: 'projects', label: 'Projects' },
    { id: 'online', label: 'Online Presence' },
    { id: 'hobbies', label: 'Hobbies' }
  ];

  if (!response) {
    return (
        <div className="flex flex-col items-center justify-center h-[200px] border-2 border-dashed rounded-md p-4">
            <AlertCircle className="h-10 w-10 text-muted-foreground mb-4" />
            <p className="text-center text-muted-foreground">
                No CV data found. Please upload and analyze your CV first.
            </p>
        </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card>
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle>Resume Analysis</CardTitle>
            <div className="flex gap-2 overflow-x-auto py-2">
              {sections.map((section) => (
                <Button
                  key={section.id}
                  variant={activeSection === section.id ? "default" : "outline"}
                  onClick={() => setActiveSection(section.id)}
                  className="whitespace-nowrap"
                  type="button"
                >
                  {section.label}
                </Button>
              ))}
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {loading && (
              <div className="flex items-center space-x-2">
                <Loader2 className="animate-spin" />
                <span>Updating...</span>
              </div>
            )}

            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {activeSection === 'image' && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Professional Images</h3>
                
                {userImages && userImages.length > 0 ? (
              <div>
                <div className={`${userImages.length > 1 ? "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4" : "max-w-xs mx-auto"}`}>
                  {userImages.map((base64Image, index) => (
                    <div 
                      key={index} 
                      className={`relative group overflow-hidden rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl ${index === 0 ? "ring-2 ring-blue-500" : ""}`}
                    >
                      <div className="aspect-square overflow-hidden">
                        <img 
                          src={base64Image} 
                          alt={`Professional Image ${index + 1}`} 
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                        />
                      </div>
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                        {/* <span className={`${index === 0 ? "bg-blue-500" : "bg-black bg-opacity-50"} text-white px-3 py-1 rounded-full text-sm transition-opacity duration-300 ${index === 0 ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}>
                          {index === 0 ? "Primary Image" : `Image ${index + 1}`}
                        </span> */}
                      </div>
                      <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex space-x-2">
                        {index !== 0 && userImages.length > 1 && (
                          <button 
                            onClick={() => handleMakePrimary(index)}
                            className="bg-blue-500 text-white p-1 rounded-full shadow hover:bg-blue-600"
                            type="button"
                            title="Make primary"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                            </svg>
                          </button>
                        )}
                        <button 
                          onClick={() => document.getElementById(`file-input-${index}`)?.click()}
                          className="bg-white text-gray-800 p-1 rounded-full shadow hover:bg-gray-100"
                          type="button"
                          title="Change image"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                          </svg>
                        </button>
                        <input
                          type="file"
                          id={`file-input-${index}`}
                          onChange={handleChangeImage(index)}
                          accept="image/*"
                          style={{ display: 'none' }}
                        />

                        <button 
                          onClick={() => handleDeleteImage(index)} 
                          className="bg-white text-red-500 p-1 rounded-full shadow hover:bg-gray-100"
                          type="button"
                          title="Delete image"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-4 flex justify-center">
                  <button 
                    onClick={handleAddMoreImages} 
                    type="button"
                    className="flex items-center bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg shadow transition-colors duration-300"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    Add More Images
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center py-6 bg-gray-50 rounded-xl border border-gray-200">
                <p className="text-gray-500 text-sm mb-4">
                  No professional images uploaded
                </p>
                <button 
                  onClick={handleAddImages} 
                  type="button"
                  className="flex items-center mx-auto bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg shadow transition-colors duration-300"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Add Images
                </button>
              </div>
            )}
              </div>
            )}

            {activeSection === 'personal' && (
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Full Name</label>
                  <Input
                    value={response.personalInfo?.fullName || ''}
                    onChange={(e) =>
                      setResponse({
                        ...response,
                        personalInfo: { ...response.personalInfo, fullName: e.target.value },
                      })
                    }
                    placeholder="Full Name"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Email</label>
                  <Input
                    type="email"
                    value={response.personalInfo?.email || ''}
                    onChange={(e) =>
                      setResponse({
                        ...response,
                        personalInfo: { ...response.personalInfo, email: e.target.value },
                      })
                    }
                    placeholder="Email"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Phone</label>
                  <Input
                    value={response.personalInfo?.phone || ''}
                    onChange={(e) =>
                      setResponse({
                        ...response,
                        personalInfo: { ...response.personalInfo, phone: e.target.value },
                      })
                    }
                    placeholder="Phone"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Location</label>
                  <Input
                    value={response.personalInfo?.location || ''}
                    onChange={(e) =>
                      setResponse({
                        ...response,
                        personalInfo: { ...response.personalInfo, location: e.target.value },
                      })
                    }
                    placeholder="Location"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">LinkedIn</label>
                  <Input
                    value={response.personalInfo?.linkedin || ''}
                    onChange={(e) =>
                      setResponse({
                        ...response,
                        personalInfo: { ...response.personalInfo, linkedin: e.target.value },
                      })
                    }
                    placeholder="LinkedIn URL"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Website</label>
                  <Input
                    value={response.personalInfo?.website || ''}
                    onChange={(e) =>
                      setResponse({
                        ...response,
                        personalInfo: { ...response.personalInfo, website: e.target.value },
                      })
                    }
                    placeholder="Website URL"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">GitHub</label>
                  <Input
                    value={response.personalInfo?.github || ''}
                    onChange={(e) =>
                      setResponse({
                        ...response,
                        personalInfo: { ...response.personalInfo, github: e.target.value },
                      })
                    }
                    placeholder="GitHub URL"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Portfolio</label>
                  <Input
                    value={response.personalInfo?.portfolio || ''}
                    onChange={(e) =>
                      setResponse({
                        ...response,
                        personalInfo: { ...response.personalInfo, portfolio: e.target.value },
                      })
                    }
                    placeholder="Portfolio URL"
                  />
                </div>
              </div>
            )}

            {/* Rest of the code remains the same for all the other sections */}
            {/* Professional Summary Section */}
            {activeSection === 'summary' && (
              <div className="space-y-2">
                <label className="text-sm font-medium">Professional Summary</label>
                <Textarea
                  value={response.professionalSummary || ''}
                  onChange={(e) =>
                    setResponse({ ...response, professionalSummary: e.target.value })
                  }
                  placeholder="Write your professional summary..."
                  rows={6}
                />
              </div>
            )}

            {/* Skills Section */}
            {activeSection === 'skills' && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Technical Skills</label>
                  <Textarea
                    value={response.skills?.technical ? response.skills.technical.join(', ') : ''}
                    onChange={(e) =>
                      setResponse({
                        ...response,
                        skills: { ...response.skills, technical: e.target.value.split(', ').filter(skill => skill.trim()) },
                      })
                    }
                    placeholder="Enter technical skills (comma-separated)"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Soft Skills</label>
                  <Textarea
                    value={response.skills?.soft ? response.skills?.soft.join(', ') : ''}
                    onChange={(e) =>
                      setResponse({
                        ...response,
                        skills: { ...response.skills, soft: e.target.value.split(', ').filter(skill => skill.trim()) },
                      })
                    }
                    placeholder="Enter soft skills (comma-separated)"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Languages</label>
                  <Textarea
                    value={response.skills?.languages ? response.skills?.languages.join(', ') : ''}
                    onChange={(e) =>
                      setResponse({
                        ...response,
                        skills: { ...response.skills, languages: e.target.value.split(', ').filter(lang => lang.trim()) },
                      })
                    }
                    placeholder="Enter languages (comma-separated)"
                  />
                </div>
              </div>
            )}

            {/* Tools Section */}
            {activeSection === 'tools' && (
              <div className="space-y-2">
                <label className="text-sm font-medium">Tools</label>
                <Textarea
                  value={response.tools ? response.tools.join(', ') : ''}
                  onChange={(e) =>
                    setResponse({
                      ...response,
                      tools: e.target.value.split(', ').filter(tool => tool.trim()),
                    })
                  }
                  placeholder="Enter tools (comma-separated)"
                />
              </div>
            )}

            {/* Experience Section */}
        {activeSection === 'experience' && (
        <div className="space-y-6">
          {response.experience && response.experience.map((exp, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="text-lg">Experience {index + 1}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Job Title</label>
                    <Input
                      value={exp.title || ''}
                      onChange={(e) => {
                        const updatedExperience = [...response.experience];
                        updatedExperience[index].title = e.target.value;
                        setResponse({ ...response, experience: updatedExperience });
                      }}
                      placeholder="Job Title"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Company</label>
                    <Input
                      value={exp.company || ''}
                      onChange={(e) => {
                        const updatedExperience = [...response.experience];
                        updatedExperience[index].company = e.target.value;
                        setResponse({ ...response, experience: updatedExperience });
                      }}
                      placeholder="Company"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Start Date</label>
                    <Input
                      value={exp.startDate || ''}
                      onChange={(e) => {
                        const updatedExperience = [...response.experience];
                        updatedExperience[index].startDate = e.target.value;
                        setResponse({ ...response, experience: updatedExperience });
                      }}
                      placeholder="Start Date"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">End Date</label>
                    <Input
                      value={exp.endDate || ''}
                      onChange={(e) => {
                        const updatedExperience = [...response.experience];
                        updatedExperience[index].endDate = e.target.value;
                        setResponse({ ...response, experience: updatedExperience });
                      }}
                      placeholder="End Date"
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-sm font-medium">Location</label>
                    <Input
                      value={exp.location || ''}
                      onChange={(e) => {
                        const updatedExperience = [...response.experience];
                        updatedExperience[index].location = e.target.value;
                        setResponse({ ...response, experience: updatedExperience });
                      }}
                      placeholder="Location"
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-sm font-medium">Responsibilities</label>
                    <Textarea
                      value={exp.responsibilities ? exp.responsibilities.join('\n') : ''}
                      onChange={(e) => {
                        const updatedExperience = [...response.experience];
                        updatedExperience[index].responsibilities = e.target.value
                          .split('\n')
                          .filter(responsibility => responsibility.trim());
                        setResponse({ ...response, experience: updatedExperience });
                      }}
                      placeholder="Enter responsibilities (one per line)"
                      rows={4}
                    />
                  </div>
                </div>
                <button
                  onClick={() => {
                    const updatedExperience = response.experience.filter((_, i) => i !== index);
                    setResponse({
                      ...response,
                      experience: updatedExperience
                    });
                  }}
                  className="px-3 py-1 mt-2 text-sm bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </CardContent>
            </Card>
          ))}
          <button 
            onClick={() => {
              setResponse({
                ...response,
                experience: [...(response.experience || []), {
                  title: '',
                  company: '',
                  startDate: '',
                  endDate: '',
                  location: '',
                  responsibilities: []
                }]
              });
            }}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Add More +
          </button>
        </div>
      )}

          {/* Education Section */}
{activeSection === 'education' && (
  <div className="space-y-6">
    {response.education && response.education.map((edu, index) => (
      <Card key={index}>
        <CardHeader>
          <CardTitle className="text-lg">Education {index + 1}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium">Degree</label>
              <Input
                value={edu.degree || ''}
                onChange={(e) => {
                  const updatedEducation = [...response.education];
                  updatedEducation[index].degree = e.target.value;
                  setResponse({ ...response, education: updatedEducation });
                }}
                placeholder="Degree"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Institution</label>
              <Input
                value={edu.institution || ''}
                onChange={(e) => {
                  const updatedEducation = [...response.education];
                  updatedEducation[index].institution = e.target.value;
                  setResponse({ ...response, education: updatedEducation });
                }}
                placeholder="Institution"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Location</label>
              <Input
                value={edu.location || ''}
                onChange={(e) => {
                  const updatedEducation = [...response.education];
                  updatedEducation[index].location = e.target.value;
                  setResponse({ ...response, education: updatedEducation });
                }}
                placeholder="Location"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Graduation Year</label>
              <Input
                value={edu.graduationYear || ''}
                onChange={(e) => {
                  const updatedEducation = [...response.education];
                  updatedEducation[index].graduationYear = e.target.value;
                  setResponse({ ...response, education: updatedEducation });
                }}
                placeholder="Graduation Year"
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-medium">Relevant Courses</label>
              <Textarea
                value={edu.relevantCourses ? edu.relevantCourses.join('\n') : ''}
                onChange={(e) => {
                  const updatedEducation = [...response.education];
                  updatedEducation[index].relevantCourses = e.target.value
                    .split('\n')
                    .filter(course => course.trim());
                  setResponse({ ...response, education: updatedEducation });
                }}
                placeholder="Enter relevant courses (one per line)"
                rows={4}
              />
            </div>
          </div>
          <button
            onClick={() => {
              const updatedEducation = response.education.filter((_, i) => i !== index);
              setResponse({
                ...response,
                education: updatedEducation
              });
            }}
            className="px-3 py-1 mt-2 text-sm bg-red-500 text-white rounded hover:bg-red-600"
          >
            Delete
          </button>
        </CardContent>
      </Card>
    ))}
    <button 
      onClick={() => {
        setResponse({
          ...response,
          education: [...(response.education || []), {
            degree: '',
            institution: '',
            location: '',
            graduationYear: '',
            relevantCourses: []
          }]
        });
      }}
      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
    >
      Add Education +
    </button>
  </div>
)}

          {/* Certifications Section */}
          {/* Certifications Section */}
{activeSection === 'certifications' && (
  <div className="space-y-6">
    {response.certifications && response.certifications.map((cert, index) => (
      <Card key={index}>
        <CardHeader>
          <CardTitle className="text-lg">Certification {index + 1}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium">Name</label>
              <Input
                value={cert.name || ''}
                onChange={(e) => {
                  const updatedCertifications = [...response.certifications];
                  updatedCertifications[index].name = e.target.value;
                  setResponse({ ...response, certifications: updatedCertifications });
                }}
                placeholder="Certification Name"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Issuer</label>
              <Input
                value={cert.issuer || ''}
                onChange={(e) => {
                  const updatedCertifications = [...response.certifications];
                  updatedCertifications[index].issuer = e.target.value;
                  setResponse({ ...response, certifications: updatedCertifications });
                }}
                placeholder="Issuer"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Year</label>
              <Input
                value={cert.year || ''}
                onChange={(e) => {
                  const updatedCertifications = [...response.certifications];
                  updatedCertifications[index].year = e.target.value;
                  setResponse({ ...response, certifications: updatedCertifications });
                }}
                placeholder="Year"
              />
            </div>
          </div>
          <button
            onClick={() => {
              const updatedCertifications = response.certifications.filter((_, i) => i !== index);
              setResponse({
                ...response,
                certifications: updatedCertifications
              });
            }}
            className="px-3 py-1 mt-2 text-sm bg-red-500 text-white rounded hover:bg-red-600"
          >
            Delete
          </button>
        </CardContent>
      </Card>
    ))}
    <button 
      onClick={() => {
        setResponse({
          ...response,
          certifications: [...(response.certifications || []), {
            name: '',
            issuer: '',
            year: ''
          }]
        });
      }}
      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
    >
      Add Certification +
    </button>
  </div>
)}

{/* Publications Section */}
{activeSection === 'publications' && (
  <div className="space-y-6">
    {response.publications && response.publications.map((pub, index) => (
      <Card key={index}>
        <CardHeader>
          <CardTitle className="text-lg">Publication {index + 1}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium">Title</label>
              <Input
                value={pub.title || ''}
                onChange={(e) => {
                  const updatedPublications = [...response.publications];
                  updatedPublications[index].title = e.target.value;
                  setResponse({ ...response, publications: updatedPublications });
                }}
                placeholder="Publication Title"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Type</label>
              <Input
                value={pub.publicationType || ''}
                onChange={(e) => {
                  const updatedPublications = [...response.publications];
                  updatedPublications[index].publicationType = e.target.value;
                  setResponse({ ...response, publications: updatedPublications });
                }}
                placeholder="Publication Type"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Year</label>
              <Input
                value={pub.year || ''}
                onChange={(e) => {
                  const updatedPublications = [...response.publications];
                  updatedPublications[index].year = e.target.value;
                  setResponse({ ...response, publications: updatedPublications });
                }}
                placeholder="Year"
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-medium">Link</label>
              <Input
                value={pub.link || ''}
                onChange={(e) => {
                  const updatedPublications = [...response.publications];
                  updatedPublications[index].link = e.target.value;
                  setResponse({ ...response, publications: updatedPublications });
                }}
                placeholder="Publication Link"
              />
            </div>
          </div>
          <button
            onClick={() => {
              const updatedPublications = response.publications.filter((_, i) => i !== index);
              setResponse({
                ...response,
                publications: updatedPublications
              });
            }}
            className="px-3 py-1 mt-2 text-sm bg-red-500 text-white rounded hover:bg-red-600"
          >
            Delete
          </button>
        </CardContent>
      </Card>
    ))}
    <button 
      onClick={() => {
        setResponse({
          ...response,
          publications: [...(response.publications || []), {
            title: '',
            publicationType: '',
            year: '',
            link: ''
          }]
        });
      }}
      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
    >
      Add Publication +
    </button>
  </div>
)}

{/* Awards Section */}
{activeSection === 'awards' && (
  <div className="space-y-6">
    {response.awards && response.awards.map((award, index) => (
      <Card key={index}>
        <CardHeader>
          <CardTitle className="text-lg">Award {index + 1}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium">Name</label>
              <Input
                value={award.name || ''}
                onChange={(e) => {
                  const updatedAwards = [...response.awards];
                  updatedAwards[index].name = e.target.value;
                  setResponse({ ...response, awards: updatedAwards });
                }}
                placeholder="Award Name"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Year</label>
              <Input
                value={award.year || ''}
                onChange={(e) => {
                  const updatedAwards = [...response.awards];
                  updatedAwards[index].year = e.target.value;
                  setResponse({ ...response, awards: updatedAwards });
                }}
                placeholder="Year"
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-medium">Description</label>
              <Textarea
                value={award.description || ''}
                onChange={(e) => {
                  const updatedAwards = [...response.awards];
                  updatedAwards[index].description = e.target.value;
                  setResponse({ ...response, awards: updatedAwards });
                }}
                placeholder="Award Description"
                rows={4}
              />
            </div>
          </div>
          <button
            onClick={() => {
              const updatedAwards = response.awards.filter((_, i) => i !== index);
              setResponse({
                ...response,
                awards: updatedAwards
              });
            }}
            className="px-3 py-1 mt-2 text-sm bg-red-500 text-white rounded hover:bg-red-600"
          >
            Delete
          </button>
        </CardContent>
      </Card>
    ))}
    <button 
      onClick={() => {
        setResponse({
          ...response,
          awards: [...(response.awards || []), {
            name: '',
            year: '',
            description: ''
          }]
        });
      }}
      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
    >
      Add Award +
    </button>
  </div>
)}

{/* Volunteer Experience Section */}
{activeSection === 'volunteer' && (
  <div className="space-y-6">
    {response.volunteerExperience && response.volunteerExperience.map((volunteer, index) => (
      <Card key={index}>
        <CardHeader>
          <CardTitle className="text-lg">Volunteer Experience {index + 1}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium">Role</label>
              <Input
                value={volunteer.role || ''}
                onChange={(e) => {
                  const updatedVolunteerExperience = [...response.volunteerExperience];
                  updatedVolunteerExperience[index].role = e.target.value;
                  setResponse({ ...response, volunteerExperience: updatedVolunteerExperience });
                }}
                placeholder="Role"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Organization</label>
              <Input
                value={volunteer.organization || ''}
                onChange={(e) => {
                  const updatedVolunteerExperience = [...response.volunteerExperience];
                  updatedVolunteerExperience[index].organization = e.target.value;
                  setResponse({ ...response, volunteerExperience: updatedVolunteerExperience });
                }}
                placeholder="Organization"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Start Date</label>
              <Input
                value={volunteer.startDate || ''}
                onChange={(e) => {
                  const updatedVolunteerExperience = [...response.volunteerExperience];
                  updatedVolunteerExperience[index].startDate = e.target.value;
                  setResponse({ ...response, volunteerExperience: updatedVolunteerExperience });
                }}
                placeholder="Start Date"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">End Date</label>
              <Input
                value={volunteer.endDate || ''}
                onChange={(e) => {
                  const updatedVolunteerExperience = [...response.volunteerExperience];
                  updatedVolunteerExperience[index].endDate = e.target.value;
                  setResponse({ ...response, volunteerExperience: updatedVolunteerExperience });
                }}
                placeholder="End Date"
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-medium">Description</label>
              <Textarea
                value={volunteer.description || ''}
                onChange={(e) => {
                  const updatedVolunteerExperience = [...response.volunteerExperience];
                  updatedVolunteerExperience[index].description = e.target.value;
                  setResponse({ ...response, volunteerExperience: updatedVolunteerExperience });
                }}
                placeholder="Description"
                rows={4}
              />
            </div>
          </div>
          <button
            onClick={() => {
              const updatedVolunteerExperience = response.volunteerExperience.filter((_, i) => i !== index);
              setResponse({
                ...response,
                volunteerExperience: updatedVolunteerExperience
              });
            }}
            className="px-3 py-1 mt-2 text-sm bg-red-500 text-white rounded hover:bg-red-600"
          >
            Delete
          </button>
        </CardContent>
      </Card>
    ))}
    <button 
      onClick={() => {
        setResponse({
          ...response,
          volunteerExperience: [...(response.volunteerExperience || []), {
            role: '',
            organization: '',
            startDate: '',
            endDate: '',
            description: ''
          }]
        });
      }}
      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
    >
      Add Volunteer Experience +
    </button>
  </div>
)}

{/* Projects Section */}
{activeSection === 'projects' && (
  <div className="space-y-6">
    {response.projects && response.projects.map((project, index) => (
      <Card key={index}>
        <CardHeader>
          <CardTitle className="text-lg">Project {index + 1}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium">Title</label>
              <Input
                value={project.title || ''}
                onChange={(e) => {
                  const updatedProjects = [...response.projects];
                  updatedProjects[index].title = e.target.value;
                  setResponse({ ...response, projects: updatedProjects });
                }}
                placeholder="Project Title"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Description</label>
              <Textarea
                value={project.description || ''}
                onChange={(e) => {
                  const updatedProjects = [...response.projects];
                  updatedProjects[index].description = e.target.value;
                  setResponse({ ...response, projects: updatedProjects });
                }}
                placeholder="Project Description"
                rows={4}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Technologies Used</label>
              <Textarea
                value={project.technologiesUsed ? project.technologiesUsed.join(', ') : ''}
                onChange={(e) => {
                  const updatedProjects = [...response.projects];
                  updatedProjects[index].technologiesUsed = e.target.value
                    .split(',')
                    .map(tech => tech.trim())
                    .filter(tech => tech);
                  setResponse({ ...response, projects: updatedProjects });
                }}
                placeholder="Technologies Used (comma-separated)"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">GitHub</label>
              <Input
                value={project.github || ''}
                onChange={(e) => {
                  const updatedProjects = [...response.projects];
                  updatedProjects[index].github = e.target.value;
                  setResponse({ ...response, projects: updatedProjects });
                }}
                placeholder="GitHub URL"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Role</label>
              <Input
                value={project.role || ''}
                onChange={(e) => {
                  const updatedProjects = [...response.projects];
                  updatedProjects[index].role = e.target.value;
                  setResponse({ ...response, projects: updatedProjects });
                }}
                placeholder="Role"
              />
            </div>
          </div>
          <button
            onClick={() => {
              const updatedProjects = response.projects.filter((_, i) => i !== index);
              setResponse({
                ...response,
                projects: updatedProjects
              });
            }}
            className="px-3 py-1 mt-2 text-sm bg-red-500 text-white rounded hover:bg-red-600"
          >
            Delete
          </button>
        </CardContent>
      </Card>
    ))}
    <button 
      onClick={() => {
        setResponse({
          ...response,
          projects: [...(response.projects || []), {
            title: '',
            description: '',
            technologiesUsed: [],
            github: '',
            role: ''
          }]
        });
      }}
      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
    >
      Add Project +
    </button>
  </div>
)}

{/* Online Presence Section */}
{activeSection === 'online' && (
  <div className="space-y-6">
    <div className="grid gap-4 md:grid-cols-2">
      <div className="space-y-2">
        <label className="text-sm font-medium">Twitter</label>
        <Input
          value={response.onlinePresence?.twitter || ''}
          onChange={(e) =>
            setResponse({
              ...response,
              onlinePresence: { ...response.onlinePresence, twitter: e.target.value },
            })
          }
          placeholder="Twitter URL"
        />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium">Stack Overflow</label>
        <Input
          value={response.onlinePresence?.stackOverflow || ''}
          onChange={(e) =>
            setResponse({
              ...response,
              onlinePresence: { ...response.onlinePresence, stackOverflow: e.target.value },
            })
          }
          placeholder="Stack Overflow URL"
        />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium">Medium</label>
        <Input
          value={response.onlinePresence?.medium || ''}
          onChange={(e) =>
            setResponse({
              ...response,
              onlinePresence: { ...response.onlinePresence, medium: e.target.value },
            })
          }
          placeholder="Medium URL"
        />
      </div>
    </div>
  </div>
)}

    {/* Hobbies Section */}
    {activeSection === 'hobbies' && (
      <div className="space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-medium">Hobbies</label>
          <Textarea
            value={response.hobbies ? response.hobbies.join(', ') : ''}
            onChange={(e) =>
              setResponse({
                ...response,
                hobbies: e.target.value.split(',').map(hobby => hobby.trim()).filter(hobby => hobby),
              })
            }
            placeholder="Enter hobbies (comma-separated)"
          />
        </div>
      </div>
    )}
        </CardContent>

      <Button variant='ghost' type='submit'>update </Button>

        </form>
      </Card>

    </div>
  );
}