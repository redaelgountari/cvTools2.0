"use client"

import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { AlertCircle, Loader2, Plus, Trash2, Image as ImageIcon, Star } from 'lucide-react';
import React, { useContext, useEffect, useState } from 'react';
import { ReadContext } from './ReadContext';
import { Resume } from '../types/resume';

export default function AnalyseResults() {
  const [response, setResponse] = useState<Resume | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [activeSection, setActiveSection] = useState('personal');
  const { AnlysedCV, setAnlysedCV, userData, setUserData } = useContext(ReadContext);
  const [userImages, setUserImages] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (AnlysedCV) {
      setResponse(AnlysedCV);
      setUserImages(AnlysedCV?.image || []);
    }
  }, [AnlysedCV]);

const handleSubmit = async (e: any) => {
  e.preventDefault();
  setLoading(true);
  try {
    // Merge the response data with the images from userData
    const updatedResume = {
      ...response,
      image: userImages // Use the current userImages state
    };
    
    setAnlysedCV(updatedResume);
    
    // Also update userData to ensure consistency
    setUserData(prev => ({
      ...prev,
      ...updatedResume
    }));
    
    console.log("Updated resume with images:", updatedResume);
  } catch (err) {
    console.error("Error updating resume data:", err);
    setError('Failed to update resume data. Please try again.');
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
      const cloudinaryUrl = await uploadToCloudinary(file);

      const newImages = [...userImages];
      newImages[index] = cloudinaryUrl;
      setUserImages(newImages);

      // Update userData with Cloudinary URL instead of File object
      setUserData(prev => ({
        ...prev,
        image: newImages
      }));

    } catch (error) {
      console.error('Error updating image:', error);
      setError('Failed to update image. Please try again.');
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
        const uploadPromises = files.map(file => uploadToCloudinary(file));
        const cloudinaryUrls = await Promise.all(uploadPromises);

        const newImages = [...userImages, ...cloudinaryUrls];
        setUserImages(newImages);

        setUserData(prev => ({
          ...prev,
          image: newImages
        }));

      } catch (error) {
        console.error('Error uploading images:', error);
        setError('Failed to upload images. Please try again.');
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
        const uploadPromises = files.map(file => uploadToCloudinary(file));
        const cloudinaryUrls = await Promise.all(uploadPromises);

        setUserImages(cloudinaryUrls);

        setUserData(prev => ({
          ...prev,
          image: cloudinaryUrls
        }));

      } catch (error) {
        console.error('Error uploading images:', error);
        setError('Failed to upload images. Please try again.');
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


  const sections = [
    { id: 'image', label: 'Images', icon: '🖼️' },
    { id: 'personal', label: 'Personal Info', icon: '👤' },
    { id: 'summary', label: 'Summary', icon: '📝' },
    { id: 'skills', label: 'Skills', icon: '⚡' },
    { id: 'tools', label: 'Tools', icon: '🛠️' },
    { id: 'experience', label: 'Experience', icon: '💼' },
    { id: 'education', label: 'Education', icon: '🎓' },
    { id: 'certifications', label: 'Certifications', icon: '📜' },
    { id: 'publications', label: 'Publications', icon: '📚' },
    { id: 'awards', label: 'Awards', icon: '🏆' },
    { id: 'volunteer', label: 'Volunteer', icon: '🤝' },
    { id: 'projects', label: 'Projects', icon: '🚀' },
    { id: 'online', label: 'Online Presence', icon: '🌐' },
    { id: 'hobbies', label: 'Hobbies', icon: '🎨' }
  ];

  if (!response) {
    return (
      <div className="flex flex-col items-center justify-center h-96 border-2 border-dashed border-gray-300 rounded-xl p-8 bg-gray-50">
        <AlertCircle className="h-16 w-16 text-gray-400 mb-4" />
        <p className="text-center text-gray-600 text-lg font-medium mb-2">
          No CV data found
        </p>
        <p className="text-center text-gray-500 text-sm">
          Please upload and analyze your CV first to get started.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-6">
      <Card className="shadow-xl border-1 bg-gradient-to-br border-white">
        <form onSubmit={handleSubmit}>
          <CardHeader className="space-y-4 pb-6 border-b bg-gradient-to-r">
            <div className="flex gap-2 overflow-x-auto py-2 scrollbar-hide">
              {sections.map((section) => (
                <Button
                  key={section.id}
                  variant={activeSection === section.id ? "default" : "outline"}
                  onClick={() => setActiveSection(section.id)}
                  className={`whitespace-nowrap transition-all duration-200 ${activeSection === section.id
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-600 shadow-lg scale-105'
                      : 'hover:bg-gray-100'
                    }`}
                  type="button"
                >
                  <span className="mr-2">{section.icon}</span>
                  {section.label}
                </Button>
              ))}
            </div>
          </CardHeader>

          <CardContent className="space-y-6 pt-8">
            {loading && (
              <div className="flex items-center justify-center space-x-3 p-4 bg-blue-50 rounded-lg">
                <Loader2 className="animate-spin text-blue-600" />
                <span className="text-blue-700 font-medium">Updating your resume...</span>
              </div>
            )}

            {uploading && (
              <div className="flex items-center justify-center space-x-3 p-4 bg-green-50 rounded-lg">
                <Loader2 className="animate-spin text-green-600" />
                <span className="text-green-700 font-medium">Uploading images...</span>
              </div>
            )}

            {error && (
              <Alert variant="destructive" className="border-red-200 bg-red-50">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {/* Image Section */}
            {activeSection === 'image' && (
              <div className="space-y-6">
                <div className="flex items-center space-x-3 pb-3 border-b-2 border-gray-200">
                  <ImageIcon className="h-6 w-6 text-blue-600" />
                  <h3 className="text-2xl font-bold text-gray-800">Professional Images</h3>
                </div>

                {userImages && userImages.length > 0 ? (
                  <div>
                    <div className={`${userImages.length > 1 ? "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6" : "max-w-sm mx-auto"}`}>
                      {userImages.map((imageUrl, index) => (
                        <div
                          key={index}
                          className={`relative group overflow-hidden rounded-2xl shadow-xl transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 ${index === 0 ? "ring-4 ring-blue-500 ring-offset-2" : ""
                            }`}
                        >
                          {index === 0 && (
                            <div className="absolute top-2 left-2 z-10 bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center space-x-1 shadow-lg">
                              <Star className="h-3 w-3 fill-white" />
                              <span>Primary</span>
                            </div>
                          )}

                          <div className="aspect-square overflow-hidden bg-gray-100">
                            <img
                              src={imageUrl}
                              alt={`Professional ${index + 1}`}
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                          </div>

                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                          <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                            <div className="flex justify-center space-x-2">
                              {index !== 0 && userImages.length > 1 && (
                                <button
                                  onClick={() => handleMakePrimary(index)}
                                  className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full shadow-lg transition-colors"
                                  type="button"
                                  title="Make primary"
                                >
                                  <Star className="h-4 w-4" />
                                </button>
                              )}
                              <button
                                onClick={() => document.getElementById(`file-input-${index}`)?.click()}
                                className="bg-white hover:bg-gray-100 text-gray-800 p-2 rounded-full shadow-lg transition-colors"
                                type="button"
                                title="Change image"
                              >
                                <ImageIcon className="h-4 w-4" />
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
                                className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-full shadow-lg transition-colors"
                                type="button"
                                title="Delete image"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-6 flex justify-center">
                      <button
                        onClick={handleAddMoreImages}
                        type="button"
                        disabled={uploading}
                        className="flex items-center bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-3 rounded-xl shadow-lg transition-all duration-200 hover:shadow-xl hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <Plus className="h-5 w-5 mr-2" />
                        {uploading ? 'Uploading...' : 'Add More Images'}
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-16 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl border-2 border-dashed border-gray-300">
                    <ImageIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 text-lg font-medium mb-2">
                      No professional images uploaded
                    </p>
                    <p className="text-gray-500 text-sm mb-6">
                      Add your professional photos to personalize your resume
                    </p>
                    <button
                      onClick={handleAddImages}
                      type="button"
                      disabled={uploading}
                      className="flex items-center mx-auto bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-3 rounded-xl shadow-lg transition-all duration-200 hover:shadow-xl hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Plus className="h-5 w-5 mr-2" />
                      {uploading ? 'Uploading...' : 'Upload Images'}
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Personal Info Section */}
            {activeSection === 'personal' && (
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-gray-800 pb-3 border-b-2 border-gray-200">Personal Information</h3>
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
                      <label className="text-sm font-semibold text-gray-700">{field.label}</label>
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
                        className="border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Professional Summary */}
            {activeSection === 'summary' && (
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-gray-800 pb-3 border-b-2 border-gray-200">Professional Summary</h3>
                <Textarea
                  value={response.professionalSummary || ''}
                  onChange={(e) => setResponse({ ...response, professionalSummary: e.target.value })}
                  placeholder="Write a compelling professional summary that highlights your key achievements and career goals..."
                  rows={8}
                  className="border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all resize-none"
                />
              </div>
            )}

            {/* Skills Section */}
            {activeSection === 'skills' && (
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-gray-800 pb-3 border-b-2 border-gray-200">Skills</h3>
                {[
                  { label: 'Technical Skills', key: 'technical', placeholder: 'React, Node.js, Python, SQL...' },
                  { label: 'Soft Skills', key: 'soft', placeholder: 'Communication, Leadership, Problem Solving...' },
                  { label: 'Languages', key: 'languages', placeholder: 'English, French, Spanish...' },
                ].map(skill => (
                  <div key={skill.key} className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700">{skill.label}</label>
                    <Textarea
                      value={response.skills?.[skill.key]?.join(', ') || ''}
                      onChange={(e) =>
                        setResponse({
                          ...response,
                          skills: {
                            ...response.skills,
                            [skill.key]: e.target.value.split(',').map(s => s.trim()).filter(s => s)
                          },
                        })
                      }
                      placeholder={skill.placeholder}
                      rows={3}
                      className="border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                    />
                    <p className="text-xs text-gray-500">Separate skills with commas</p>
                  </div>
                ))}
              </div>
            )}

            {/* Tools Section */}
            {activeSection === 'tools' && (
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-gray-800 pb-3 border-b-2 border-gray-200">Tools & Technologies</h3>
                <Textarea
                  value={response.tools?.join(', ') || ''}
                  onChange={(e) =>
                    setResponse({
                      ...response,
                      tools: e.target.value.split(',').map(t => t.trim()).filter(t => t),
                    })
                  }
                  placeholder="Git, Docker, VS Code, Figma, Jira..."
                  rows={4}
                  className="border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                />
                <p className="text-xs text-gray-500">Separate tools with commas</p>
              </div>
            )}

            {/* Experience Section */}
            {activeSection === 'experience' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-3 border-b-2 border-gray-200">
                  <h3 className="text-2xl font-bold text-gray-800">Work Experience</h3>
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
                    type="button"
                    className="flex items-center bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-4 py-2 rounded-lg shadow transition-all hover:shadow-lg"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Experience
                  </button>
                </div>

                {response.experience && response.experience.map((exp, index) => (
                  <Card key={index} className="shadow-md hover:shadow-lg transition-shadow border-l-4 border-blue-500">
                    <CardHeader className="bg-gray-50">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg text-gray-800">Experience #{index + 1}</CardTitle>
                        <button
                          onClick={() => {
                            setResponse({
                              ...response,
                              experience: response.experience.filter((_, i) => i !== index)
                            });
                          }}
                          type="button"
                          className="text-red-600 hover:text-red-700 hover:bg-red-50 p-2 rounded-lg transition-colors"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4 pt-6">
                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                          <label className="text-sm font-semibold text-gray-700">Job Title</label>
                          <Input
                            value={exp.title || ''}
                            onChange={(e) => {
                              const updated = [...response.experience];
                              updated[index].title = e.target.value;
                              setResponse({ ...response, experience: updated });
                            }}
                            placeholder="Senior Developer"
                            className="border-gray-300 focus:border-blue-500"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-semibold text-gray-700">Company</label>
                          <Input
                            value={exp.company || ''}
                            onChange={(e) => {
                              const updated = [...response.experience];
                              updated[index].company = e.target.value;
                              setResponse({ ...response, experience: updated });
                            }}
                            placeholder="Tech Corp"
                            className="border-gray-300 focus:border-blue-500"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-semibold text-gray-700">Start Date</label>
                          <Input
                            value={exp.startDate || ''}
                            onChange={(e) => {
                              const updated = [...response.experience];
                              updated[index].startDate = e.target.value;
                              setResponse({ ...response, experience: updated });
                            }}
                            placeholder="2020-01"
                            className="border-gray-300 focus:border-blue-500"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-semibold text-gray-700">End Date</label>
                          <Input
                            value={exp.endDate || ''}
                            onChange={(e) => {
                              const updated = [...response.experience];
                              updated[index].endDate = e.target.value;
                              setResponse({ ...response, experience: updated });
                            }}
                            placeholder="Present"
                            className="border-gray-300 focus:border-blue-500"
                          />
                        </div>
                        <div className="space-y-2 md:col-span-2">
                          <label className="text-sm font-semibold text-gray-700">Location</label>
                          <Input
                            value={exp.location || ''}
                            onChange={(e) => {
                              const updated = [...response.experience];
                              updated[index].location = e.target.value;
                              setResponse({ ...response, experience: updated });
                            }}
                            placeholder="City, Country"
                            className="border-gray-300 focus:border-blue-500"
                          />
                        </div>
                        <div className="space-y-2 md:col-span-2">
                          <label className="text-sm font-semibold text-gray-700">Responsibilities</label>
                          <Textarea
                            value={exp.responsibilities?.join('\n') || ''}
                            onChange={(e) => {
                              const updated = [...response.experience];
                              updated[index].responsibilities = e.target.value.split('\n').filter(r => r.trim());
                              setResponse({ ...response, experience: updated });
                            }}
                            placeholder="• Led development of feature X&#10;• Managed team of 5 developers&#10;• Improved performance by 40%"
                            rows={5}
                            className="border-gray-300 focus:border-blue-500"
                          />
                          <p className="text-xs text-gray-500">One responsibility per line</p>
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
                <div className="flex items-center justify-between pb-3 border-b-2 border-gray-200">
                  <h3 className="text-2xl font-bold text-gray-800">Education</h3>
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
                    type="button"
                    className="flex items-center bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-4 py-2 rounded-lg shadow transition-all hover:shadow-lg"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Education
                  </button>
                </div>

                {response.education && response.education.map((edu, index) => (
                  <Card key={index} className="shadow-md hover:shadow-lg transition-shadow border-l-4 border-purple-500">
                    <CardHeader className="bg-gray-50">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg text-gray-800">Education #{index + 1}</CardTitle>
                        <button
                          onClick={() => {
                            setResponse({
                              ...response,
                              education: response.education.filter((_, i) => i !== index)
                            });
                          }}
                          type="button"
                          className="text-red-600 hover:text-red-700 hover:bg-red-50 p-2 rounded-lg transition-colors"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4 pt-6">
                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                          <label className="text-sm font-semibold text-gray-700">Degree</label>
                          <Input
                            value={edu.degree || ''}
                            onChange={(e) => {
                              const updated = [...response.education];
                              updated[index].degree = e.target.value;
                              setResponse({ ...response, education: updated });
                            }}
                            placeholder="Bachelor of Science"
                            className="border-gray-300 focus:border-purple-500"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-semibold text-gray-700">Institution</label>
                          <Input
                            value={edu.institution || ''}
                            onChange={(e) => {
                              const updated = [...response.education];
                              updated[index].institution = e.target.value;
                              setResponse({ ...response, education: updated });
                            }}
                            placeholder="University Name"
                            className="border-gray-300 focus:border-purple-500"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-semibold text-gray-700">Location</label>
                          <Input
                            value={edu.location || ''}
                            onChange={(e) => {
                              const updated = [...response.education];
                              updated[index].location = e.target.value;
                              setResponse({ ...response, education: updated });
                            }}
                            placeholder="City, Country"
                            className="border-gray-300 focus:border-purple-500"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-semibold text-gray-700">Graduation Year</label>
                          <Input
                            value={edu.graduationYear || ''}
                            onChange={(e) => {
                              const updated = [...response.education];
                              updated[index].graduationYear = e.target.value;
                              setResponse({ ...response, education: updated });
                            }}
                            placeholder="2024"
                            className="border-gray-300 focus:border-purple-500"
                          />
                        </div>
                        <div className="space-y-2 md:col-span-2">
                          <label className="text-sm font-semibold text-gray-700">Relevant Courses</label>
                          <Textarea
                            value={edu.relevantCourses?.join('\n') || ''}
                            onChange={(e) => {
                              const updated = [...response.education];
                              updated[index].relevantCourses = e.target.value.split('\n').filter(c => c.trim());
                              setResponse({ ...response, education: updated });
                            }}
                            placeholder="Data Structures&#10;Algorithms&#10;Web Development"
                            rows={4}
                            className="border-gray-300 focus:border-purple-500"
                          />
                          <p className="text-xs text-gray-500">One course per line</p>
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
                <div className="flex items-center justify-between pb-3 border-b-2 border-gray-200">
                  <h3 className="text-2xl font-bold text-gray-800">Certifications</h3>
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
                    type="button"
                    className="flex items-center bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-4 py-2 rounded-lg shadow transition-all hover:shadow-lg"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Certification
                  </button>
                </div>

                {response.certifications && response.certifications.map((cert, index) => (
                  <Card key={index} className="shadow-md hover:shadow-lg transition-shadow border-l-4 border-amber-500">
                    <CardHeader className="bg-gray-50">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg text-gray-800">Certification #{index + 1}</CardTitle>
                        <button
                          onClick={() => {
                            setResponse({
                              ...response,
                              certifications: response.certifications.filter((_, i) => i !== index)
                            });
                          }}
                          type="button"
                          className="text-red-600 hover:text-red-700 hover:bg-red-50 p-2 rounded-lg transition-colors"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4 pt-6">
                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2 md:col-span-2">
                          <label className="text-sm font-semibold text-gray-700">Certification Name</label>
                          <Input
                            value={cert.name || ''}
                            onChange={(e) => {
                              const updated = [...response.certifications];
                              updated[index].name = e.target.value;
                              setResponse({ ...response, certifications: updated });
                            }}
                            placeholder="AWS Certified Solutions Architect"
                            className="border-gray-300 focus:border-amber-500"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-semibold text-gray-700">Issuing Organization</label>
                          <Input
                            value={cert.issuer || ''}
                            onChange={(e) => {
                              const updated = [...response.certifications];
                              updated[index].issuer = e.target.value;
                              setResponse({ ...response, certifications: updated });
                            }}
                            placeholder="Amazon Web Services"
                            className="border-gray-300 focus:border-amber-500"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-semibold text-gray-700">Year</label>
                          <Input
                            value={cert.year || ''}
                            onChange={(e) => {
                              const updated = [...response.certifications];
                              updated[index].year = e.target.value;
                              setResponse({ ...response, certifications: updated });
                            }}
                            placeholder="2024"
                            className="border-gray-300 focus:border-amber-500"
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
                <div className="flex items-center justify-between pb-3 border-b-2 border-gray-200">
                  <h3 className="text-2xl font-bold text-gray-800">Publications</h3>
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
                    type="button"
                    className="flex items-center bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-4 py-2 rounded-lg shadow transition-all hover:shadow-lg"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Publication
                  </button>
                </div>

                {response.publications && response.publications.map((pub, index) => (
                  <Card key={index} className="shadow-md hover:shadow-lg transition-shadow border-l-4 border-indigo-500">
                    <CardHeader className="bg-gray-50">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg text-gray-800">Publication #{index + 1}</CardTitle>
                        <button
                          onClick={() => {
                            setResponse({
                              ...response,
                              publications: response.publications.filter((_, i) => i !== index)
                            });
                          }}
                          type="button"
                          className="text-red-600 hover:text-red-700 hover:bg-red-50 p-2 rounded-lg transition-colors"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4 pt-6">
                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2 md:col-span-2">
                          <label className="text-sm font-semibold text-gray-700">Title</label>
                          <Input
                            value={pub.title || ''}
                            onChange={(e) => {
                              const updated = [...response.publications];
                              updated[index].title = e.target.value;
                              setResponse({ ...response, publications: updated });
                            }}
                            placeholder="Research Paper Title"
                            className="border-gray-300 focus:border-indigo-500"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-semibold text-gray-700">Publication Type</label>
                          <Input
                            value={pub.publicationType || ''}
                            onChange={(e) => {
                              const updated = [...response.publications];
                              updated[index].publicationType = e.target.value;
                              setResponse({ ...response, publications: updated });
                            }}
                            placeholder="Journal Article, Conference Paper"
                            className="border-gray-300 focus:border-indigo-500"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-semibold text-gray-700">Year</label>
                          <Input
                            value={pub.year || ''}
                            onChange={(e) => {
                              const updated = [...response.publications];
                              updated[index].year = e.target.value;
                              setResponse({ ...response, publications: updated });
                            }}
                            placeholder="2024"
                            className="border-gray-300 focus:border-indigo-500"
                          />
                        </div>
                        <div className="space-y-2 md:col-span-2">
                          <label className="text-sm font-semibold text-gray-700">Link</label>
                          <Input
                            value={pub.link || ''}
                            onChange={(e) => {
                              const updated = [...response.publications];
                              updated[index].link = e.target.value;
                              setResponse({ ...response, publications: updated });
                            }}
                            placeholder="https://doi.org/..."
                            className="border-gray-300 focus:border-indigo-500"
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
                <div className="flex items-center justify-between pb-3 border-b-2 border-gray-200">
                  <h3 className="text-2xl font-bold text-gray-800">Awards & Honors</h3>
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
                    type="button"
                    className="flex items-center bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-4 py-2 rounded-lg shadow transition-all hover:shadow-lg"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Award
                  </button>
                </div>

                {response.awards && response.awards.map((award, index) => (
                  <Card key={index} className="shadow-md hover:shadow-lg transition-shadow border-l-4 border-yellow-500">
                    <CardHeader className="bg-gray-50">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg text-gray-800">Award #{index + 1}</CardTitle>
                        <button
                          onClick={() => {
                            setResponse({
                              ...response,
                              awards: response.awards.filter((_, i) => i !== index)
                            });
                          }}
                          type="button"
                          className="text-red-600 hover:text-red-700 hover:bg-red-50 p-2 rounded-lg transition-colors"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4 pt-6">
                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                          <label className="text-sm font-semibold text-gray-700">Award Name</label>
                          <Input
                            value={award.name || ''}
                            onChange={(e) => {
                              const updated = [...response.awards];
                              updated[index].name = e.target.value;
                              setResponse({ ...response, awards: updated });
                            }}
                            placeholder="Employee of the Year"
                            className="border-gray-300 focus:border-yellow-500"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-semibold text-gray-700">Year</label>
                          <Input
                            value={award.year || ''}
                            onChange={(e) => {
                              const updated = [...response.awards];
                              updated[index].year = e.target.value;
                              setResponse({ ...response, awards: updated });
                            }}
                            placeholder="2024"
                            className="border-gray-300 focus:border-yellow-500"
                          />
                        </div>
                        <div className="space-y-2 md:col-span-2">
                          <label className="text-sm font-semibold text-gray-700">Description</label>
                          <Textarea
                            value={award.description || ''}
                            onChange={(e) => {
                              const updated = [...response.awards];
                              updated[index].description = e.target.value;
                              setResponse({ ...response, awards: updated });
                            }}
                            placeholder="Describe the achievement..."
                            rows={3}
                            className="border-gray-300 focus:border-yellow-500"
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
                <div className="flex items-center justify-between pb-3 border-b-2 border-gray-200">
                  <h3 className="text-2xl font-bold text-gray-800">Volunteer Experience</h3>
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
                    type="button"
                    className="flex items-center bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-4 py-2 rounded-lg shadow transition-all hover:shadow-lg"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Volunteer Work
                  </button>
                </div>

                {response.volunteerExperience && response.volunteerExperience.map((vol, index) => (
                  <Card key={index} className="shadow-md hover:shadow-lg transition-shadow border-l-4 border-green-500">
                    <CardHeader className="bg-gray-50">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg text-gray-800">Volunteer #{index + 1}</CardTitle>
                        <button
                          onClick={() => {
                            setResponse({
                              ...response,
                              volunteerExperience: response.volunteerExperience.filter((_, i) => i !== index)
                            });
                          }}
                          type="button"
                          className="text-red-600 hover:text-red-700 hover:bg-red-50 p-2 rounded-lg transition-colors"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4 pt-6">
                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                          <label className="text-sm font-semibold text-gray-700">Role</label>
                          <Input
                            value={vol.role || ''}
                            onChange={(e) => {
                              const updated = [...response.volunteerExperience];
                              updated[index].role = e.target.value;
                              setResponse({ ...response, volunteerExperience: updated });
                            }}
                            placeholder="Volunteer Coordinator"
                            className="border-gray-300 focus:border-green-500"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-semibold text-gray-700">Organization</label>
                          <Input
                            value={vol.organization || ''}
                            onChange={(e) => {
                              const updated = [...response.volunteerExperience];
                              updated[index].organization = e.target.value;
                              setResponse({ ...response, volunteerExperience: updated });
                            }}
                            placeholder="Non-profit Organization"
                            className="border-gray-300 focus:border-green-500"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-semibold text-gray-700">Start Date</label>
                          <Input
                            value={vol.startDate || ''}
                            onChange={(e) => {
                              const updated = [...response.volunteerExperience];
                              updated[index].startDate = e.target.value;
                              setResponse({ ...response, volunteerExperience: updated });
                            }}
                            placeholder="2023-01"
                            className="border-gray-300 focus:border-green-500"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-semibold text-gray-700">End Date</label>
                          <Input
                            value={vol.endDate || ''}
                            onChange={(e) => {
                              const updated = [...response.volunteerExperience];
                              updated[index].endDate = e.target.value;
                              setResponse({ ...response, volunteerExperience: updated });
                            }}
                            placeholder="Present"
                            className="border-gray-300 focus:border-green-500"
                          />
                        </div>
                        <div className="space-y-2 md:col-span-2">
                          <label className="text-sm font-semibold text-gray-700">Description</label>
                          <Textarea
                            value={vol.description || ''}
                            onChange={(e) => {
                              const updated = [...response.volunteerExperience];
                              updated[index].description = e.target.value;
                              setResponse({ ...response, volunteerExperience: updated });
                            }}
                            placeholder="Describe your volunteer contributions..."
                            rows={4}
                            className="border-gray-300 focus:border-green-500"
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
                <div className="flex items-center justify-between pb-3 border-b-2 border-gray-200">
                  <h3 className="text-2xl font-bold text-gray-800">Projects</h3>
                  <button
                    onClick={() => {
                      setResponse({
                        ...response,
                        projects: [...(response.projects || []), {
                          title: '',
                          description: '',
                          technologiesUsed: [],
                          github: '',
                          role: '',
                          image: ''
                        }]
                      });
                    }}
                    type="button"
                    className="flex items-center bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-4 py-2 rounded-lg shadow transition-all hover:shadow-lg"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Project
                  </button>
                </div>

                {response.projects && response.projects.map((proj, index) => (
                  <Card key={index} className="shadow-md hover:shadow-lg transition-shadow border-l-4 border-cyan-500">
                    <CardHeader className="bg-gray-50">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg text-gray-800">Project #{index + 1}</CardTitle>
                        <button
                          onClick={() => {
                            setResponse({
                              ...response,
                              projects: response.projects.filter((_, i) => i !== index)
                            });
                          }}
                          type="button"
                          className="text-red-600 hover:text-red-700 hover:bg-red-50 p-2 rounded-lg transition-colors"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4 pt-6">
                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2 md:col-span-2">
                          <label className="text-sm font-semibold text-gray-700">Project Title</label>
                          <Input
                            value={proj.title || ''}
                            onChange={(e) => {
                              const updated = [...response.projects];
                              updated[index].title = e.target.value;
                              setResponse({ ...response, projects: updated });
                            }}
                            placeholder="E-commerce Platform"
                            className="border-gray-300 focus:border-cyan-500"
                          />
                        </div>
                        <div className="space-y-4 md:col-span-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-semibold text-gray-700">Project Images</label>
                <button
                  onClick={() => document.getElementById(`project-multiple-file-input-${index}`)?.click()}
                  type="button"
                  disabled={uploading}
                  className="flex items-center bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white px-3 py-1.5 rounded-lg text-sm shadow transition-all duration-200 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Plus className="h-3 w-3 mr-1" />
                  Add Images
                </button>
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
                      <div
                        key={imageIndex}
                        className="relative group overflow-hidden rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                      >
                        {imageIndex === 0 && (
                          <div className="absolute top-2 left-2 z-10 bg-cyan-600 text-white px-2 py-1 rounded-full text-xs font-bold flex items-center space-x-1 shadow-lg">
                            <Star className="h-3 w-3 fill-white" />
                            <span>Primary</span>
                          </div>
                        )}

                        <div className="aspect-video overflow-hidden bg-gray-100">
                          <img
                            src={imageUrl}
                            alt={`Project ${index + 1} - Image ${imageIndex + 1}`}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                        </div>

                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                        <div className="absolute bottom-2 left-2 right-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                          <div className="flex justify-center space-x-1">
                            {imageIndex !== 0 && proj.images.length > 1 && (
                              <button
                                onClick={() => {
                                  const updated = [...response.projects];
                                  const projectImages = [...updated[index].images];
                                  const selectedImage = projectImages.splice(imageIndex, 1)[0];
                                  projectImages.unshift(selectedImage);
                                  updated[index].images = projectImages;
                                  setResponse({ ...response, projects: updated });
                                }}
                                className="bg-cyan-600 hover:bg-cyan-700 text-white p-1.5 rounded-full shadow-lg transition-colors"
                                type="button"
                                title="Make primary"
                              >
                                <Star className="h-3 w-3" />
                              </button>
                            )}
                            <button
                              onClick={() => document.getElementById(`project-single-file-input-${index}-${imageIndex}`)?.click()}
                              className="bg-white hover:bg-gray-100 text-gray-800 p-1.5 rounded-full shadow-lg transition-colors"
                              type="button"
                              title="Change image"
                            >
                              <ImageIcon className="h-3 w-3" />
                            </button>
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
                            <button
                              onClick={() => {
                                const updated = [...response.projects];
                                updated[index].images = updated[index].images.filter((_, i) => i !== imageIndex);
                                setResponse({ ...response, projects: updated });
                              }}
                              className="bg-red-600 hover:bg-red-700 text-white p-1.5 rounded-full shadow-lg transition-colors"
                              type="button"
                              title="Delete image"
                            >
                              <Trash2 className="h-3 w-3" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 flex justify-center">
                    <button
                      onClick={() => document.getElementById(`project-multiple-file-input-${index}`)?.click()}
                      type="button"
                      disabled={uploading}
                      className="flex items-center bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white px-4 py-2 rounded-lg shadow transition-all duration-200 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      {uploading ? 'Uploading...' : 'Add More Images'}
                    </button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl border-2 border-dashed border-gray-300">
                  <ImageIcon className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                  <p className="text-gray-600 text-sm font-medium mb-2">
                    No project images uploaded
                  </p>
                  <p className="text-gray-500 text-xs mb-4">
                    Add screenshots or visual representations of your project
                  </p>
                  <button
                    onClick={() => document.getElementById(`project-multiple-file-input-${index}`)?.click()}
                    type="button"
                    disabled={uploading}
                    className="flex items-center mx-auto bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white px-4 py-2 rounded-lg shadow transition-all duration-200 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    {uploading ? 'Uploading...' : 'Upload Project Images'}
                  </button>
                </div>
              )}
            </div>
                        <div className="space-y-2 md:col-span-2">
                          <label className="text-sm font-semibold text-gray-700">Description</label>
                          <Textarea
                            value={proj.description || ''}
                            onChange={(e) => {
                              const updated = [...response.projects];
                              updated[index].description = e.target.value;
                              setResponse({ ...response, projects: updated });
                            }}
                            placeholder="Describe the project and your contributions..."
                            rows={4}
                            className="border-gray-300 focus:border-cyan-500"
                          />
                        </div>
                        <div className="space-y-2 md:col-span-2">
                          <label className="text-sm font-semibold text-gray-700">Technologies Used</label>
                          <Textarea
                            value={proj.technologiesUsed?.join(', ') || ''}
                            onChange={(e) => {
                              const updated = [...response.projects];
                              updated[index].technologiesUsed = e.target.value.split(',').map(t => t.trim()).filter(t => t);
                              setResponse({ ...response, projects: updated });
                            }}
                            placeholder="React, Node.js, MongoDB, AWS"
                            rows={2}
                            className="border-gray-300 focus:border-cyan-500"
                          />
                          <p className="text-xs text-gray-500">Separate technologies with commas</p>
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-semibold text-gray-700">GitHub URL</label>
                          <Input
                            value={proj.github || ''}
                            onChange={(e) => {
                              const updated = [...response.projects];
                              updated[index].github = e.target.value;
                              setResponse({ ...response, projects: updated });
                            }}
                            placeholder="https://github.com/..."
                            className="border-gray-300 focus:border-cyan-500"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-semibold text-gray-700">Project url</label>
                          <Input
                            value={proj.url || ''}
                            onChange={(e) => {
                              const updated = [...response.projects];
                              updated[index].url = e.target.value;
                              setResponse({ ...response, projects: updated });
                            }}
                            placeholder="https://project.com/..."
                            className="border-gray-300 focus:border-cyan-500"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-semibold text-gray-700">Your Role</label>
                          <Input
                            value={proj.role || ''}
                            onChange={(e) => {
                              const updated = [...response.projects];
                              updated[index].role = e.target.value;
                              setResponse({ ...response, projects: updated });
                            }}
                            placeholder="Lead Developer"
                            className="border-gray-300 focus:border-cyan-500"
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
                <h3 className="text-2xl font-bold text-gray-800 pb-3 border-b-2 border-gray-200">Online Presence</h3>
                <div className="grid gap-6 md:grid-cols-2">
                  {[
                    { label: 'Twitter', key: 'twitter', placeholder: 'https://twitter.com/username' },
                    { label: 'Stack Overflow', key: 'stackOverflow', placeholder: 'https://stackoverflow.com/users/...' },
                    { label: 'Medium', key: 'medium', placeholder: 'https://medium.com/@username' },
                  ].map(field => (
                    <div key={field.key} className="space-y-2">
                      <label className="text-sm font-semibold text-gray-700">{field.label}</label>
                      <Input
                        value={response.onlinePresence?.[field.key] || ''}
                        onChange={(e) =>
                          setResponse({
                            ...response,
                            onlinePresence: { ...response.onlinePresence, [field.key]: e.target.value },
                          })
                        }
                        placeholder={field.placeholder}
                        className="border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Hobbies Section */}
            {activeSection === 'hobbies' && (
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-gray-800 pb-3 border-b-2 border-gray-200">Hobbies & Interests</h3>
                <Textarea
                  value={response.hobbies?.join(', ') || ''}
                  onChange={(e) =>
                    setResponse({
                      ...response,
                      hobbies: e.target.value.split(',').map(h => h.trim()).filter(h => h),
                    })
                  }
                  placeholder="Photography, Hiking, Reading, Gaming, Cooking..."
                  rows={4}
                  className="border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                />
                <p className="text-xs text-gray-500">Separate hobbies with commas</p>
              </div>
            )}

            <div className="flex justify-end pt-6 border-t">
              <Button
                type="submit"
                disabled={loading}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-3 rounded-xl shadow-lg transition-all duration-200 hover:shadow-xl hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
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
      </Card>
    </div>
  );
}