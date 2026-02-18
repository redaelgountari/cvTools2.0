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

export default function HTMLTheme9({
    userdata,
    colors = DEFAULT_THEME_COLORS.theme9,
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

    const handleUpdateSkill = (type: 'technical' | 'languages' | 'soft' | 'tools', index: number, value: string) => {
        const updated = { ...userdata };
        if (type === 'tools') {
            const items = [...updated.tools];
            items[index] = value;
            updated.tools = items;
        } else {
            const items = [...updated.skills[type as 'technical' | 'languages' | 'soft']];
            items[index] = value;
            updated.skills = { ...updated.skills, [type as 'technical' | 'languages' | 'soft']: items };
        }
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
    const displayTitle = hasContent(userdata.jobSearchTitle) ? userdata.jobSearchTitle.trim() : (hasContent(userdata.personalInfo?.title) ? userdata.personalInfo?.title?.trim() : 'Professional');
    const hasValidImage = userdata.image && userdata.image[0] && hasContent(userdata.image[0]);

    return (
        <div className="w-full min-h-[1122px] bg-white shadow-2xl mx-auto flex flex-row overflow-hidden text-[#1f2937]" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>
            {/* Sidebar */}
            <aside className="w-[33%] bg-[#1a1f36] text-white p-0" style={{ backgroundColor: colors.secondary || '#1a1f36' }}>
                <div className="p-8 pt-10">
                    {hasValidImage && (
                        <div className="flex justify-center mb-8">
                            <img src={userdata.image[0]} alt="Profile" className="w-[90px] h-[90px] rounded-full border-[3px] object-cover" style={{ borderColor: colors.primary || '#4f46e5' }} />
                        </div>
                    )}

                    {/* Contact Section */}
                    <div className="mb-8">
                        <h3 className="text-[9px] font-bold tracking-[1.5px] uppercase border-b-2 pb-2 mb-4" style={{ color: colors.accent || '#818cf8', borderColor: '#2d3347' }}>CONTACT</h3>
                        <div className="space-y-4">
                            {hasContent(userdata.personalInfo.phone) && (
                                <div className="flex items-start gap-3">
                                    <div className="w-1 h-1 rounded-full mt-2" style={{ backgroundColor: colors.accent || '#818cf8' }} />
                                    <EditableText value={userdata.personalInfo.phone} onSave={(val) => handleUpdatePersonalInfo('phone', val)} className="text-[8.5px] text-[#d1d5db]" />
                                </div>
                            )}
                            {hasContent(userdata.personalInfo.email) && (
                                <div className="flex items-start gap-3">
                                    <div className="w-1 h-1 rounded-full mt-2" style={{ backgroundColor: colors.accent || '#818cf8' }} />
                                    <EditableText value={userdata.personalInfo.email} onSave={(val) => handleUpdatePersonalInfo('email', val)} className="text-[8.5px] text-[#d1d5db]" />
                                </div>
                            )}
                            {hasContent(userdata.personalInfo.location) && (
                                <div className="flex items-start gap-3">
                                    <div className="w-1 h-1 rounded-full mt-2" style={{ backgroundColor: colors.accent || '#818cf8' }} />
                                    <EditableText value={userdata.personalInfo.location} onSave={(val) => handleUpdatePersonalInfo('location', val)} className="text-[8.5px] text-[#d1d5db]" />
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Skills Grid */}
                    {userdata.skills.technical.length > 0 && (
                        <div className="mb-8">
                            <h3 className="text-[9px] font-bold tracking-[1.5px] uppercase border-b-2 pb-2 mb-4" style={{ color: colors.accent || '#818cf8', borderColor: '#2d3347' }}>COMPÉTENCES</h3>
                            <div className="flex flex-wrap gap-2">
                                {userdata.skills.technical.map((skill, index) => (
                                    <div key={index} className="text-[7.5px] bg-[#312e81] border px-2 py-1 rounded" style={{ borderColor: colors.primary || '#4f46e5' }}>
                                        <EditableText value={skill} onSave={(val) => handleUpdateSkill('technical', index, val)} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Languages Section */}
                    {userdata.skills.languages.length > 0 && (
                        <div className="mb-8">
                            <h3 className="text-[9px] font-bold tracking-[1.5px] uppercase border-b-2 pb-2 mb-4" style={{ color: colors.accent || '#818cf8', borderColor: '#2d3347' }}>LANGUES</h3>
                            <div className="space-y-3">
                                {userdata.skills.languages.map((lang, index) => (
                                    <div key={index} className="flex items-center gap-3 border-b border-[#2d3347] pb-2 text-[8.5px] text-[#d1d5db]">
                                        <div className="w-1 h-1 rounded-full" style={{ backgroundColor: colors.accent || '#818cf8' }} />
                                        <EditableText value={lang} onSave={(val) => handleUpdateSkill('languages', index, val)} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </aside>

            {/* Main Content */}
            <main className="w-[67%] bg-white flex flex-col">
                <header className="bg-[#f8fafc] p-10 py-8 border-b-2" style={{ borderColor: colors.primary || '#4f46e5' }}>
                    <EditableText
                        value={displayName}
                        onSave={(val) => handleUpdatePersonalInfo('fullName', val)}
                        className="text-3xl font-bold tracking-tight mb-2 p-0"
                        style={{ color: '#111827' }}
                    />
                    <EditableText
                        value={displayTitle}
                        onSave={handleUpdateTitle}
                        className="text-sm font-bold tracking-wide p-0 uppercase"
                        style={{ color: colors.primary || '#4f46e5' }}
                    />
                </header>

                <div className="p-10 pt-8 space-y-8">
                    {hasContent(userdata.professionalSummary) && (
                        <section>
                            <h2 className="text-xs font-bold uppercase tracking-[1.2px] border-b-2 pb-1 mb-4" style={{ color: '#111827', borderColor: '#e5e7eb' }}>PROFIL PROFESSIONNEL</h2>
                            <EditableText
                                value={userdata.professionalSummary}
                                onSave={handleUpdateSummary}
                                multiline
                                className="text-[9.5px] leading-relaxed text-justify text-[#4b5563]"
                            />
                        </section>
                    )}

                    {userdata.experience.length > 0 && (
                        <section>
                            <h2 className="text-xs font-bold uppercase tracking-[1.2px] border-b-2 pb-1 mb-6" style={{ color: '#111827', borderColor: '#e5e7eb' }}>EXPÉRIENCE PROFESSIONNELLE</h2>
                            <div className="space-y-6 relative ml-2">
                                {userdata.experience.map((exp, index) => (
                                    <div key={index} className="relative pl-6">
                                        {/* Timeline connector */}
                                        <div className="absolute left-0 top-1.5 w-[7px] h-[7px] rounded-full border-2 bg-white" style={{ borderColor: '#c7d2fe', backgroundColor: colors.primary || '#4f46e5' }} />
                                        {index < userdata.experience.length - 1 && <div className="absolute left-[2.5px] top-[11px] w-[1.5px] h-full bg-[#e5e7eb]" />}

                                        <div className="mb-1">
                                            <EditableText value={exp.title} onSave={(val) => handleUpdateExperience(index, 'title', val)} className="text-[10.5px] font-bold text-[#111827] block" />
                                            <EditableText value={exp.company} onSave={(val) => handleUpdateExperience(index, 'company', val)} className="text-[9.5px] font-bold block" style={{ color: colors.primary || '#4f46e5' }} />
                                        </div>
                                        <div className="flex gap-2 text-[8px] font-bold text-white px-3 py-1 rounded-full w-fit mb-3" style={{ backgroundColor: colors.primary || '#4f46e5' }}>
                                            <EditableText value={exp.startDate} onSave={(val) => handleUpdateExperience(index, 'startDate', val)} />
                                            <span>-</span>
                                            <EditableText value={exp.endDate || 'Présent'} onSave={(val) => handleUpdateExperience(index, 'endDate', val)} />
                                        </div>
                                        <div className="space-y-1">
                                            {exp.responsibilities.map((resp, idx) => (
                                                <div key={idx} className="flex gap-2 items-start text-[9px] text-[#4b5563]">
                                                    <span className="font-bold" style={{ color: colors.primary || '#4f46e5' }}>▸</span>
                                                    <EditableText
                                                        value={resp}
                                                        onSave={(val) => {
                                                            const newResp = [...exp.responsibilities];
                                                            newResp[idx] = val;
                                                            handleUpdateExperience(index, 'responsibilities', newResp);
                                                        }}
                                                        className="flex-1 leading-relaxed"
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {userdata.education.length > 0 && (
                        <section>
                            <h2 className="text-xs font-bold uppercase tracking-[1.2px] border-b-2 pb-1 mb-6" style={{ color: '#111827', borderColor: '#e5e7eb' }}>FORMATION</h2>
                            <div className="space-y-6 relative ml-2">
                                {userdata.education.map((edu, index) => (
                                    <div key={index} className="relative pl-6">
                                        <div className="absolute left-0 top-1.5 w-[7px] h-[7px] rounded-full border-2 bg-white" style={{ borderColor: '#c7d2fe', backgroundColor: colors.primary || '#4f46e5' }} />
                                        {index < userdata.education.length - 1 && <div className="absolute left-[2.5px] top-[11px] w-[1.5px] h-full bg-[#e5e7eb]" />}
                                        <EditableText value={edu.degree} onSave={(val) => handleUpdateEducation(index, 'degree', val)} className="text-[10.5px] font-bold text-[#111827] block mb-1" />
                                        <EditableText value={edu.institution} onSave={(val) => handleUpdateEducation(index, 'institution', val)} className="text-[9.5px] font-bold block mb-2" style={{ color: colors.primary || '#4f46e5' }} />
                                        <div className="text-[8px] font-bold text-white px-3 py-1 rounded-full w-fit" style={{ backgroundColor: colors.primary || '#4f46e5' }}>
                                            <EditableText value={edu.graduationYear} onSave={(val) => handleUpdateEducation(index, 'graduationYear', val)} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </div>
            </main>
        </div>
    );
}
