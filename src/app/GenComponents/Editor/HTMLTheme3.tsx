"use client";

import React from 'react';
import { Resume } from '@/app/types/resume';
import { DEFAULT_THEME_COLORS } from '../Themes/themeDefaults';
import { hasContent } from '../Themes/contentVerification';
import { EditableText } from './EditableText';

interface HTMLThemeProps {
    userdata: Resume;
    colors?: any;
    userImage?: string;
    onUpdate: (newData: Resume) => void;
}

export default function HTMLTheme3({
    userdata,
    colors = DEFAULT_THEME_COLORS.theme3,
    userImage,
    onUpdate
}: HTMLThemeProps) {

    const handleUpdatePersonalInfo = (field: string, value: string) => {
        const updated = { ...userdata };
        updated.personalInfo = { ...updated.personalInfo, [field]: value };
        onUpdate(updated);
    };

    const handleUpdateSummary = (value: string) => {
        onUpdate({ ...userdata, professionalSummary: value });
    };

    const handleUpdateTitle = (value: string) => {
        onUpdate({ ...userdata, jobSearchTitle: value });
    };

    const handleUpdateExperience = (index: number, field: string, value: any) => {
        const updated = { ...userdata };
        const newExp = [...updated.experience];
        newExp[index] = { ...newExp[index], [field]: value };
        updated.experience = newExp;
        onUpdate(updated);
    };

    const handleUpdateEducation = (index: number, field: string, value: any) => {
        const updated = { ...userdata };
        const newEdu = [...updated.education];
        newEdu[index] = { ...newEdu[index], [field]: value };
        updated.education = newEdu;
        onUpdate(updated);
    };

    const handleUpdateSkill = (type: 'technical' | 'languages', index: number, value: string) => {
        const updated = { ...userdata };
        const newSkills = [...updated.skills[type]];
        newSkills[index] = value;
        updated.skills = { ...updated.skills, [type]: newSkills };
        onUpdate(updated);
    };

    const handleUpdateProject = (index: number, field: string, value: any) => {
        const updated = { ...userdata };
        const newProjects = [...updated.projects];
        newProjects[index] = { ...newProjects[index], [field]: value };
        updated.projects = newProjects;
        onUpdate(updated);
    };

    const displayName = hasContent(userdata.personalInfo?.fullName) ? userdata.personalInfo.fullName.trim() : 'Your Name';
    const displayTitle = hasContent(userdata.jobSearchTitle) ? userdata.jobSearchTitle.trim() : (hasContent(userdata.personalInfo?.title) ? (userdata as any).personalInfo.title.trim() : 'Professional');
    const hasValidImage = userdata.image && userdata.image[0] && hasContent(userdata.image[0]);

    return (
        <div className="w-full min-h-[1122px] bg-white shadow-2xl mx-auto overflow-hidden text-[#4A5568]" style={{ fontFamily: 'Inter, sans-serif' }}>
            {/* Top Accent Band */}
            <div className="h-2 w-full" style={{ backgroundColor: colors.primary || '#1A365D' }} />

            {/* Header Section */}
            <header className="px-12 py-10 bg-white border-b border-gray-100">
                <div className="flex flex-row items-center mb-6">
                    {hasValidImage && (
                        <div className="mr-6">
                            <div className="w-24 h-24 rounded-full border-4 overflow-hidden" style={{ borderColor: colors.gold || '#D4AF37' }}>
                                <img className="w-full h-full object-cover" src={userdata.image[0]} alt="Avatar" />
                            </div>
                        </div>
                    )}
                    <div className="flex-1">
                        <EditableText
                            value={displayName}
                            onSave={(val) => handleUpdatePersonalInfo('fullName', val)}
                            className="text-4xl font-bold mb-1 p-0 tracking-tight"
                            style={{ color: colors.primary || '#1A365D' }}
                        />
                        <EditableText
                            value={displayTitle}
                            onSave={handleUpdateTitle}
                            className="text-sm font-bold uppercase tracking-[3px]"
                            style={{ color: colors.gold || '#D4AF37' }}
                        />
                    </div>
                </div>

                <div className="flex flex-wrap gap-x-6 gap-y-2 pt-6 border-t border-gray-100">
                    {hasContent(userdata.personalInfo.email) && (
                        <div className="flex items-center text-[11px]">
                            <div className="w-1.5 h-1.5 rounded-full mr-2" style={{ backgroundColor: colors.gold || '#D4AF37' }} />
                            <EditableText value={userdata.personalInfo.email} onSave={(val) => handleUpdatePersonalInfo('email', val)} />
                        </div>
                    )}
                    {hasContent(userdata.personalInfo.phone) && (
                        <div className="flex items-center text-[11px]">
                            <div className="w-1.5 h-1.5 rounded-full mr-2" style={{ backgroundColor: colors.gold || '#D4AF37' }} />
                            <EditableText value={userdata.personalInfo.phone} onSave={(val) => handleUpdatePersonalInfo('phone', val)} />
                        </div>
                    )}
                    {hasContent(userdata.personalInfo.location) && (
                        <div className="flex items-center text-[11px]">
                            <div className="w-1.5 h-1.5 rounded-full mr-2" style={{ backgroundColor: colors.gold || '#D4AF37' }} />
                            <EditableText value={userdata.personalInfo.location} onSave={(val) => handleUpdatePersonalInfo('location', val)} />
                        </div>
                    )}
                </div>
            </header>

            {/* Content Area */}
            <div className="flex flex-row px-12 py-8">
                {/* Main Column */}
                <div className="w-[67%] pr-8">
                    {/* Profile */}
                    {hasContent(userdata.professionalSummary) && (
                        <section className="mb-8">
                            <div className="flex items-center mb-4">
                                <div className="w-1 h-4 mr-3" style={{ backgroundColor: colors.gold || '#D4AF37' }} />
                                <h2 className="text-sm font-bold uppercase tracking-wider" style={{ color: colors.primary || '#1A365D' }}>
                                    Profil Professionnel
                                </h2>
                            </div>
                            <EditableText
                                value={userdata.professionalSummary}
                                onSave={handleUpdateSummary}
                                multiline
                                className="text-[11px] leading-relaxed text-justify"
                            />
                        </section>
                    )}

                    {/* Experience */}
                    {userdata.experience.length > 0 && (
                        <section className="mb-8">
                            <div className="flex items-center mb-4">
                                <div className="w-1 h-4 mr-3" style={{ backgroundColor: colors.gold || '#D4AF37' }} />
                                <h2 className="text-sm font-bold uppercase tracking-wider" style={{ color: colors.primary || '#1A365D' }}>
                                    Expérience Professionnelle
                                </h2>
                            </div>
                            <div className="space-y-6">
                                {userdata.experience.map((exp, index) => (
                                    <div key={index} className="pb-6 border-b border-gray-100 last:border-0 last:pb-0">
                                        <EditableText
                                            value={exp.title}
                                            onSave={(val) => handleUpdateExperience(index, 'title', val)}
                                            className="text-xs font-bold mb-1"
                                            style={{ color: colors.primary || '#1A365D' }}
                                        />
                                        <div className="flex justify-between items-center mb-3">
                                            <EditableText
                                                value={exp.company}
                                                onSave={(val) => handleUpdateExperience(index, 'company', val)}
                                                className="text-[11px] font-bold text-gray-500"
                                            />
                                            <div className="flex gap-1 text-[10px] italic text-gray-500">
                                                <EditableText value={exp.startDate} onSave={(val) => handleUpdateExperience(index, 'startDate', val)} />
                                                <span>-</span>
                                                <EditableText value={exp.endDate || 'Present'} onSave={(val) => handleUpdateExperience(index, 'endDate', val)} />
                                            </div>
                                        </div>
                                        <div className="space-y-2 mt-2">
                                            {exp.responsibilities.map((resp, idx) => (
                                                <div key={idx} className="flex flex-row gap-3">
                                                    <div className="w-1 h-1 rounded-full mt-1.5 flex-shrink-0" style={{ backgroundColor: colors.gold || '#D4AF37' }} />
                                                    <EditableText
                                                        value={resp}
                                                        onSave={(val) => {
                                                            const newResp = [...exp.responsibilities];
                                                            newResp[idx] = val;
                                                            handleUpdateExperience(index, 'responsibilities', newResp);
                                                        }}
                                                        className="text-[11px] flex-1 leading-relaxed"
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Projects */}
                    {userdata.projects.length > 0 && (
                        <section className="mb-8">
                            <div className="flex items-center mb-4">
                                <div className="w-1 h-4 mr-3" style={{ backgroundColor: colors.gold || '#D4AF37' }} />
                                <h2 className="text-sm font-bold uppercase tracking-wider" style={{ color: colors.primary || '#1A365D' }}>
                                    Projets
                                </h2>
                            </div>
                            <div className="space-y-6">
                                {userdata.projects.map((proj, index) => (
                                    <div key={index}>
                                        <EditableText
                                            value={proj.title}
                                            onSave={(val) => handleUpdateProject(index, 'title', val)}
                                            className="text-[11px] font-bold mb-1"
                                            style={{ color: colors.primary || '#1A365D' }}
                                        />
                                        <EditableText
                                            value={proj.description}
                                            onSave={(val) => handleUpdateProject(index, 'description', val)}
                                            multiline
                                            className="text-[11px] leading-relaxed mb-2"
                                        />
                                        {proj.technologiesUsed && proj.technologiesUsed.length > 0 && (
                                            <div className="flex flex-wrap gap-2">
                                                {proj.technologiesUsed.map((tech, idx) => (
                                                    <span key={idx} className="text-[9px] px-2 py-1 rounded bg-gray-50 border border-gray-100" style={{ color: colors.primary || '#1A365D' }}>
                                                        {tech}
                                                    </span>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </div>

                {/* Sidebar Column */}
                <div className="w-[33%] pl-8 border-l border-gray-100">
                    {/* Languages */}
                    {userdata.skills.languages.length > 0 && (
                        <div className="mb-8">
                            <h3 className="text-[10px] font-bold uppercase tracking-[1.5px] pb-2 mb-4 border-b-2" style={{ color: colors.primary || '#1A365D', borderColor: colors.gold || '#D4AF37' }}>
                                Langues
                            </h3>
                            <div className="space-y-2">
                                {userdata.skills.languages.map((lang, index) => (
                                    <div key={index} className="pb-2 border-b border-gray-50 last:border-0 last:pb-0">
                                        <EditableText
                                            value={lang}
                                            onSave={(val) => handleUpdateSkill('languages', index, val)}
                                            className="text-[11px] font-bold"
                                            style={{ color: colors.primary || '#1A365D' }}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Skills */}
                    {userdata.skills.technical.length > 0 && (
                        <div className="mb-8">
                            <h3 className="text-[10px] font-bold uppercase tracking-[1.5px] pb-2 mb-4 border-b-2" style={{ color: colors.primary || '#1A365D', borderColor: colors.gold || '#D4AF37' }}>
                                Compétences
                            </h3>
                            <div className="space-y-3">
                                {userdata.skills.technical.map((skill, index) => (
                                    <div key={index} className="relative pl-3">
                                        <div className="absolute left-0 top-1.5 w-1 h-1 rounded-full" style={{ backgroundColor: colors.gold || '#D4AF37' }} />
                                        <EditableText
                                            value={skill}
                                            onSave={(val) => handleUpdateSkill('technical', index, val)}
                                            className="text-[11px] leading-tight"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Education */}
                    {userdata.education.length > 0 && (
                        <div className="mb-8">
                            <h3 className="text-[10px] font-bold uppercase tracking-[1.5px] pb-2 mb-4 border-b-2" style={{ color: colors.primary || '#1A365D', borderColor: colors.gold || '#D4AF37' }}>
                                Formation
                            </h3>
                            <div className="space-y-4">
                                {userdata.education.map((edu, index) => (
                                    <div key={index}>
                                        <EditableText
                                            value={edu.degree}
                                            onSave={(val) => handleUpdateEducation(index, 'degree', val)}
                                            className="text-[10px] font-bold"
                                            style={{ color: colors.primary || '#1A365D' }}
                                        />
                                        <EditableText
                                            value={edu.institution}
                                            onSave={(val) => handleUpdateEducation(index, 'institution', val)}
                                            className="text-[9px] text-gray-500 font-medium"
                                        />
                                        <EditableText
                                            value={edu.graduationYear}
                                            onSave={(val) => handleUpdateEducation(index, 'graduationYear', val)}
                                            className="text-[9px] text-gray-400 mt-0.5 block"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
