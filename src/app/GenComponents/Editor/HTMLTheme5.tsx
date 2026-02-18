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

export default function HTMLTheme5({
    userdata,
    colors = DEFAULT_THEME_COLORS.theme5,
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

    const handleUpdateSkill = (type: 'technical' | 'languages' | 'soft', index: number, value: string) => {
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
    const displayTitle = hasContent(userdata.jobSearchTitle) ? userdata.jobSearchTitle.trim() : (hasContent(userdata.personalInfo?.title) ? userdata.personalInfo?.title?.trim() : 'Professional');

    const hasValidImage = userdata.image && userdata.image[0] && hasContent(userdata.image[0]);

    return (
        <div className="w-full min-h-[1122px] bg-white shadow-2xl mx-auto flex flex-row overflow-hidden text-[#333333]" style={{ fontFamily: 'Roboto, Helvetica, Arial, sans-serif' }}>
            {/* Left Column (Sidebar) */}
            <div className="w-[35%] bg-[#F8F8F8] flex flex-col" style={{ backgroundColor: colors.sidebar || '#F8F8F8' }}>
                {hasValidImage && (
                    <div className="w-full h-52 overflow-hidden mb-6">
                        <img src={userdata.image[0]} alt="Profile" className="w-full h-full object-cover" />
                    </div>
                )}

                <div className={`px-8 ${!hasValidImage ? 'pt-10' : ''}`}>
                    {/* Contact Section */}
                    <div className="mb-10">
                        <h3 className="text-sm font-bold tracking-[2px] uppercase mb-4" style={{ color: colors.primary || '#000000' }}>CONTACT</h3>
                        <div className="space-y-3">
                            <div className="text-[11px]">
                                <EditableText value={userdata.personalInfo.phone} onSave={(val) => handleUpdatePersonalInfo('phone', val)} />
                            </div>
                            <div className="text-[11px]">
                                <EditableText value={userdata.personalInfo.email} onSave={(val) => handleUpdatePersonalInfo('email', val)} />
                            </div>
                            <div className="text-[11px]">
                                <EditableText value={userdata.personalInfo.location} onSave={(val) => handleUpdatePersonalInfo('location', val)} />
                            </div>
                        </div>
                    </div>

                    {/* Skills Section */}
                    <div className="mb-10">
                        <h3 className="text-sm font-bold tracking-[2px] uppercase mb-4" style={{ color: colors.primary || '#000000' }}>COMPÉTENCES</h3>
                        <div className="space-y-2">
                            {userdata.skills.technical.map((skill, index) => (
                                <div key={index} className="flex gap-2 items-start text-[11px]">
                                    <span>•</span>
                                    <EditableText value={skill} onSave={(val) => handleUpdateSkill('technical', index, val)} />
                                </div>
                            ))}
                            {userdata.skills.soft.map((skill, index) => (
                                <div key={index} className="flex gap-2 items-start text-[11px]">
                                    <span>•</span>
                                    <EditableText value={skill} onSave={(val) => handleUpdateSkill('soft', index, val)} />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Languages Section */}
                    {userdata.skills.languages.length > 0 && (
                        <div className="mb-10">
                            <h3 className="text-sm font-bold tracking-[2px] uppercase mb-4" style={{ color: colors.primary || '#000000' }}>LANGUES</h3>
                            <div className="space-y-2 text-[11px]">
                                {userdata.skills.languages.map((lang, index) => (
                                    <div key={index} className="flex gap-2 items-start">
                                        <span>•</span>
                                        <EditableText value={lang} onSave={(val) => handleUpdateSkill('languages', index, val)} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Right Column (Main Content) */}
            <div className="w-[65%] p-10 bg-white">
                <header className="mb-10">
                    <EditableText
                        value={displayName.toUpperCase()}
                        onSave={(val) => handleUpdatePersonalInfo('fullName', val)}
                        className="text-3xl font-bold tracking-[2px] p-0 mb-1"
                        style={{ color: colors.primary || '#000000' }}
                    />
                    <EditableText
                        value={displayTitle.toUpperCase()}
                        onSave={handleUpdateTitle}
                        className="text-sm font-light tracking-[1.5px]"
                        style={{ color: colors.accent || '#333333' }}
                    />
                </header>

                {hasContent(userdata.professionalSummary) && (
                    <section className="mb-10">
                        <h2 className="text-xs font-bold tracking-[1.5px] uppercase border-b pb-2 mb-4" style={{ color: colors.primary || '#000000', borderColor: colors.border || '#CCCCCC' }}>PROFIL</h2>
                        <EditableText
                            value={userdata.professionalSummary}
                            onSave={handleUpdateSummary}
                            multiline
                            className="text-[11px] leading-relaxed text-justify"
                        />
                    </section>
                )}

                {userdata.experience.length > 0 && (
                    <section className="mb-10">
                        <h2 className="text-xs font-bold tracking-[1.5px] uppercase border-b pb-2 mb-4" style={{ color: colors.primary || '#000000', borderColor: colors.border || '#CCCCCC' }}>EXPÉRIENCES PROFESSIONNELLES</h2>
                        <div className="space-y-8 relative">
                            {userdata.experience.map((exp, index) => (
                                <div key={index} className="flex gap-4 group">
                                    <div className="flex flex-col items-center min-w-[20px]">
                                        <div className="w-2 h-2 rounded-full mt-1.5" style={{ backgroundColor: colors.primary || '#000000' }} />
                                        {index < userdata.experience.length - 1 && <div className="w-[1px] flex-1 mt-1 bg-gray-200" />}
                                    </div>
                                    <div className="flex-1 pb-2">
                                        <div className="flex gap-2 items-center text-xs font-bold mb-1 uppercase" style={{ color: colors.primary || '#000000' }}>
                                            <EditableText value={exp.title} onSave={(val) => handleUpdateExperience(index, 'title', val)} />
                                            <span>-</span>
                                            <EditableText value={exp.company} onSave={(val) => handleUpdateExperience(index, 'company', val)} />
                                        </div>
                                        <div className="flex gap-1 text-[10px] text-gray-400 mb-2">
                                            <EditableText value={exp.startDate} onSave={(val) => handleUpdateExperience(index, 'startDate', val)} />
                                            <span>-</span>
                                            <EditableText value={exp.endDate || 'Présent'} onSave={(val) => handleUpdateExperience(index, 'endDate', val)} />
                                        </div>
                                        <div className="space-y-1">
                                            {exp.responsibilities.map((resp, idx) => (
                                                <div key={idx} className="flex gap-2 text-[10px] items-start">
                                                    <span>•</span>
                                                    <EditableText
                                                        value={resp}
                                                        onSave={(val) => {
                                                            const newResp = [...exp.responsibilities];
                                                            newResp[idx] = val;
                                                            handleUpdateExperience(index, 'responsibilities', newResp);
                                                        }}
                                                        className="flex-1"
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {userdata.education.length > 0 && (
                    <section className="mb-10">
                        <h2 className="text-xs font-bold tracking-[1.5px] uppercase border-b pb-2 mb-4" style={{ color: colors.primary || '#000000', borderColor: colors.border || '#CCCCCC' }}>FORMATION</h2>
                        <div className="space-y-6">
                            {userdata.education.map((edu, index) => (
                                <div key={index} className="flex gap-4">
                                    <div className="flex flex-col items-center min-w-[20px]">
                                        <div className="w-2 h-2 rounded-full mt-1.5" style={{ backgroundColor: colors.primary || '#000000' }} />
                                        {index < userdata.education.length - 1 && <div className="w-[1px] flex-1 mt-1 bg-gray-200" />}
                                    </div>
                                    <div className="flex-1">
                                        <EditableText
                                            value={edu.degree.toUpperCase()}
                                            onSave={(val) => handleUpdateEducation(index, 'degree', val)}
                                            className="text-xs font-bold block mb-1 uppercase"
                                            style={{ color: colors.primary || '#000000' }}
                                        />
                                        <EditableText
                                            value={edu.institution}
                                            onSave={(val) => handleUpdateEducation(index, 'institution', val)}
                                            className="text-[11px] block mb-1"
                                            style={{ color: colors.accent || '#666666' }}
                                        />
                                        <div className="flex gap-1 text-[10px] text-gray-400 uppercase">
                                            <EditableText value={edu.location} onSave={(val) => handleUpdateEducation(index, 'location', val)} />
                                            <span>•</span>
                                            <EditableText value={edu.graduationYear} onSave={(val) => handleUpdateEducation(index, 'graduationYear', val)} />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}
            </div>
        </div>
    );
}
