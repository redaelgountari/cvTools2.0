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

export default function HTMLTheme7({
    userdata,
    colors = DEFAULT_THEME_COLORS.theme7,
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

    const handleUpdateSkill = (type: 'technical' | 'languages' | 'soft' | 'tools' | 'hobbies', index: number, value: string) => {
        const updated = { ...userdata };
        const newItems = [...(updated as any)[type === 'tools' || type === 'hobbies' ? type : 'skills'][type === 'tools' || type === 'hobbies' ? '' : type]];

        if (type === 'tools' || type === 'hobbies') {
            const items = [...(updated as any)[type]];
            items[index] = value;
            (updated as any)[type] = items;
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
    const displayTitle = hasContent(userdata.jobSearchTitle) ? userdata.jobSearchTitle.trim() : (hasContent(userdata.experience?.[0]?.title) ? userdata.experience[0].title.trim() : 'Professional');
    const hasValidImage = userdata.image && userdata.image[0] && hasContent(userdata.image[0]);

    return (
        <div className="w-full min-h-[1122px] bg-white shadow-2xl mx-auto overflow-hidden text-[#34495e]" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>
            {/* Header */}
            <header className="flex flex-col items-center p-8 py-10" style={{ backgroundColor: colors.primary || '#2c3e50', color: 'white' }}>
                <div className="flex flex-col items-center max-w-[80%] text-center">
                    {hasValidImage && (
                        <div className="mb-4">
                            <img src={userdata.image[0]} alt="Profile" className="w-[70px] h-[70px] rounded-full border-[3px] border-[#ecf0f1] object-cover" />
                        </div>
                    )}
                    <EditableText
                        value={displayName.toUpperCase()}
                        onSave={(val) => handleUpdatePersonalInfo('fullName', val)}
                        className="text-2xl font-bold tracking-[1.5px] p-0 mb-1"
                        style={{ color: 'white' }}
                    />
                    <EditableText
                        value={displayTitle.toUpperCase()}
                        onSave={handleUpdateTitle}
                        className="text-sm tracking-[2.5px] p-0 mb-3"
                        style={{ color: '#ecf0f1' }}
                    />
                    <div className="flex flex-wrap justify-center items-center gap-3 text-[9px] mt-2 opacity-80">
                        {hasContent(userdata.personalInfo.phone) && (
                            <EditableText value={userdata.personalInfo.phone} onSave={(val) => handleUpdatePersonalInfo('phone', val)} />
                        )}
                        <span className="text-[#95a5a6]">|</span>
                        {hasContent(userdata.personalInfo.email) && (
                            <EditableText value={userdata.personalInfo.email} onSave={(val) => handleUpdatePersonalInfo('email', val)} />
                        )}
                        <span className="text-[#95a5a6]">|</span>
                        {hasContent(userdata.personalInfo.location) && (
                            <EditableText value={userdata.personalInfo.location} onSave={(val) => handleUpdatePersonalInfo('location', val)} />
                        )}
                    </div>
                </div>
            </header>

            <div className="flex flex-row">
                {/* Left Column */}
                <aside className="w-[35%] p-8 pt-10" style={{ backgroundColor: colors.sidebar || '#ecf0f1' }}>
                    {userdata.skills.languages.length > 0 && (
                        <section className="mb-8">
                            <h2 className="text-[11px] font-bold tracking-[1.2px] uppercase border-b-2 pb-1 mb-4" style={{ color: colors.primary || '#2c3e50', borderColor: colors.secondary || '#34495e' }}>LANGUES</h2>
                            <div className="space-y-2">
                                {userdata.skills.languages.map((lang, index) => (
                                    <div key={index} className="relative flex items-center gap-3 pl-3 text-[9px]">
                                        <div className="absolute left-0 w-1 h-1 rounded-full" style={{ backgroundColor: colors.secondary || '#34495e' }} />
                                        <EditableText value={lang} onSave={(val) => handleUpdateSkill('languages', index, val)} />
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {userdata.skills.technical.length > 0 && (
                        <section className="mb-8">
                            <h2 className="text-[11px] font-bold tracking-[1.2px] uppercase border-b-2 pb-1 mb-4" style={{ color: colors.primary || '#2c3e50', borderColor: colors.secondary || '#34495e' }}>COMPÉTENCES TECHNIQUES</h2>
                            <div className="space-y-2">
                                {userdata.skills.technical.map((skill, index) => (
                                    <div key={index} className="relative flex items-center gap-3 pl-3 text-[9px]">
                                        <div className="absolute left-0 w-1 h-1 rounded-full" style={{ backgroundColor: colors.secondary || '#34495e' }} />
                                        <EditableText value={skill} onSave={(val) => handleUpdateSkill('technical', index, val)} />
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {userdata.tools.length > 0 && (
                        <section className="mb-8">
                            <h2 className="text-[11px] font-bold tracking-[1.2px] uppercase border-b-2 pb-1 mb-4" style={{ color: colors.primary || '#2c3e50', borderColor: colors.secondary || '#34495e' }}>OUTILS</h2>
                            <div className="flex flex-wrap gap-2">
                                {userdata.tools.map((tool, index) => (
                                    <div key={index} className="bg-[#bdc3c7] px-2 py-1 rounded text-[8px]">
                                        <EditableText value={tool} onSave={(val) => handleUpdateSkill('tools', index, val)} />
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </aside>

                {/* Right Column */}
                <main className="w-[65%] p-10 pt-10">
                    {hasContent(userdata.professionalSummary) && (
                        <section className="mb-8">
                            <h2 className="text-[13px] font-bold tracking-[1.5px] uppercase border-b-2 pb-2 mb-4" style={{ color: colors.primary || '#2c3e50', borderColor: colors.secondary || '#34495e' }}>PROFIL PROFESSIONNEL</h2>
                            <EditableText
                                value={userdata.professionalSummary}
                                onSave={handleUpdateSummary}
                                multiline
                                className="text-[9.5px] leading-relaxed text-justify"
                            />
                        </section>
                    )}

                    {userdata.experience.length > 0 && (
                        <section className="mb-8">
                            <h2 className="text-[13px] font-bold tracking-[1.5px] uppercase border-b-2 pb-2 mb-4" style={{ color: colors.primary || '#2c3e50', borderColor: colors.secondary || '#34495e' }}>EXPÉRIENCE PROFESSIONNELLE</h2>
                            <div className="space-y-6">
                                {userdata.experience.map((exp, index) => (
                                    <div key={index} className="border-b pb-4 last:border-0" style={{ borderColor: colors.border || '#ecf0f1' }}>
                                        <div className="flex justify-between items-start mb-2">
                                            <div className="flex-1">
                                                <EditableText value={exp.title} onSave={(val) => handleUpdateExperience(index, 'title', val)} className="text-[11px] font-bold block mb-1" style={{ color: colors.primary || '#2c3e50' }} />
                                                <EditableText value={exp.company} onSave={(val) => handleUpdateExperience(index, 'company', val)} className="text-[9.5px] block" />
                                            </div>
                                            <div className="text-[8.5px] font-bold px-2 py-1 rounded text-white flex gap-1" style={{ backgroundColor: colors.secondary || '#34495e' }}>
                                                <EditableText value={exp.startDate} onSave={(val) => handleUpdateExperience(index, 'startDate', val)} />
                                                <span>-</span>
                                                <EditableText value={exp.endDate || 'Présent'} onSave={(val) => handleUpdateExperience(index, 'endDate', val)} />
                                            </div>
                                        </div>
                                        <div className="space-y-1 ml-4">
                                            {exp.responsibilities.map((resp, idx) => (
                                                <div key={idx} className="flex gap-2 items-start text-[9px]">
                                                    <span className="text-[7px] mt-1">•</span>
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
                        <section className="mb-8">
                            <h2 className="text-[13px] font-bold tracking-[1.5px] uppercase border-b-2 pb-2 mb-4" style={{ color: colors.primary || '#2c3e50', borderColor: colors.secondary || '#34495e' }}>FORMATION</h2>
                            <div className="space-y-4">
                                {userdata.education.map((edu, index) => (
                                    <div key={index} className="flex justify-between items-start border-b pb-4 last:border-0" style={{ borderColor: colors.border || '#ecf0f1' }}>
                                        <div className="flex-1">
                                            <EditableText value={edu.degree} onSave={(val) => handleUpdateEducation(index, 'degree', val)} className="text-[10.5px] font-bold block mb-1" style={{ color: colors.primary || '#2c3e50' }} />
                                            <EditableText value={edu.institution} onSave={(val) => handleUpdateEducation(index, 'institution', val)} className="text-[9.5px] block" />
                                        </div>
                                        <div className="text-[8.5px] font-bold px-2 py-1 rounded text-white" style={{ backgroundColor: colors.secondary || '#34495e' }}>
                                            <EditableText value={edu.graduationYear} onSave={(val) => handleUpdateEducation(index, 'graduationYear', val)} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </main>
            </div>
        </div>
    );
}
