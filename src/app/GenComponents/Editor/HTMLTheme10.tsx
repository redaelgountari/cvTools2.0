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

export default function HTMLTheme10({
    userdata,
    colors = DEFAULT_THEME_COLORS.theme10,
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
        const items = [...updated.skills[type]];
        items[index] = value;
        updated.skills = { ...updated.skills, [type]: items };
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
        <div className="w-full min-h-[1122px] bg-white shadow-2xl mx-auto flex flex-row overflow-hidden text-[#334155]" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>
            {/* Sidebar */}
            <aside className="w-[35%] bg-[#F8FAFC] p-8 pt-10" style={{ backgroundColor: colors.sidebar || '#F8FAFC' }}>
                {hasValidImage && (
                    <div className="mb-8 flex justify-center">
                        <img src={userdata.image[0]} alt="Profile" className="w-[100px] h-[100px] rounded-full object-cover shadow-md" />
                    </div>
                )}

                <div className="space-y-8">
                    {/* Contact Section */}
                    <div>
                        <h3 className="text-xs font-bold tracking-widest uppercase border-b-2 pb-1 mb-4" style={{ color: colors.primary || '#1E293B', borderColor: colors.primary || '#3B82F6' }}>Contact</h3>
                        <div className="space-y-4">
                            {hasContent(userdata.personalInfo.phone) && (
                                <div>
                                    <span className="text-[8px] uppercase tracking-wider block mb-1" style={{ color: colors.accent || '#64748B' }}>Phone</span>
                                    <EditableText value={userdata.personalInfo.phone} onSave={(val) => handleUpdatePersonalInfo('phone', val)} className="text-[10px]" />
                                </div>
                            )}
                            {hasContent(userdata.personalInfo.email) && (
                                <div>
                                    <span className="text-[8px] uppercase tracking-wider block mb-1" style={{ color: colors.accent || '#64748B' }}>Email</span>
                                    <EditableText value={userdata.personalInfo.email} onSave={(val) => handleUpdatePersonalInfo('email', val)} className="text-[10px]" />
                                </div>
                            )}
                            {hasContent(userdata.personalInfo.location) && (
                                <div>
                                    <span className="text-[8px] uppercase tracking-wider block mb-1" style={{ color: colors.accent || '#64748B' }}>Location</span>
                                    <EditableText value={userdata.personalInfo.location} onSave={(val) => handleUpdatePersonalInfo('location', val)} className="text-[10px]" />
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Skills Section */}
                    {(userdata.skills.technical.length > 0 || userdata.skills.soft.length > 0) && (
                        <div>
                            <h3 className="text-xs font-bold tracking-widest uppercase border-b-2 pb-1 mb-4" style={{ color: colors.primary || '#1E293B', borderColor: colors.primary || '#3B82F6' }}>Skills</h3>
                            <div className="space-y-2">
                                {userdata.skills.technical.map((skill, index) => (
                                    <div key={`tech-${index}`} className="flex items-center gap-3 pl-3 relative text-[10px]">
                                        <div className="absolute left-0 w-1.5 h-1.5 rounded-full" style={{ backgroundColor: colors.primary || '#3B82F6' }} />
                                        <EditableText value={skill} onSave={(val) => handleUpdateSkill('technical', index, val)} />
                                    </div>
                                ))}
                                {userdata.skills.soft.map((skill, index) => (
                                    <div key={`soft-${index}`} className="flex items-center gap-3 pl-3 relative text-[10px]">
                                        <div className="absolute left-0 w-1.5 h-1.5 rounded-full" style={{ backgroundColor: colors.primary || '#3B82F6' }} />
                                        <EditableText value={skill} onSave={(val) => handleUpdateSkill('soft', index, val)} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </aside>

            {/* Main Content */}
            <main className="w-[65%] p-10 pt-10">
                <header className="mb-10">
                    <EditableText
                        value={displayName}
                        onSave={(val) => handleUpdatePersonalInfo('fullName', val)}
                        className="text-3xl font-bold tracking-tight mb-2 p-0"
                        style={{ color: colors.primary || '#1E293B' }}
                    />
                    <EditableText
                        value={displayTitle}
                        onSave={handleUpdateTitle}
                        className="text-sm tracking-wide p-0 uppercase"
                        style={{ color: colors.accent || '#64748B' }}
                    />
                </header>

                <div className="space-y-10">
                    {hasContent(userdata.professionalSummary) && (
                        <section>
                            <h2 className="text-sm font-bold uppercase tracking-wider border-b-2 pb-2 mb-4" style={{ color: colors.primary || '#1E293B', borderColor: colors.primary || '#3B82F6' }}>Profile</h2>
                            <EditableText
                                value={userdata.professionalSummary}
                                onSave={handleUpdateSummary}
                                multiline
                                className="text-[10.5px] leading-relaxed text-justify text-[#475569]"
                            />
                        </section>
                    )}

                    {userdata.experience.length > 0 && (
                        <section>
                            <h2 className="text-sm font-bold uppercase tracking-wider border-b-2 pb-2 mb-6" style={{ color: colors.primary || '#1E293B', borderColor: colors.primary || '#3B82F6' }}>Work Experience</h2>
                            <div className="space-y-8 ml-2">
                                {userdata.experience.map((exp, index) => (
                                    <div key={index} className="relative pl-6">
                                        <div className="absolute left-0 top-1.5 w-2 h-2 rounded-full" style={{ backgroundColor: colors.primary || '#3B82F6' }} />
                                        {index < userdata.experience.length - 1 && <div className="absolute left-[3.5px] top-[14px] w-[1px] h-full bg-[#CBD5E1]" />}

                                        <div className="flex justify-between items-start mb-2 gap-4">
                                            <EditableText value={exp.title} onSave={(val) => handleUpdateExperience(index, 'title', val)} className="text-[12px] font-bold text-[#1E293B] flex-1" />
                                            <div className="text-[9px] font-bold bg-[#F1F5F9] px-2 py-1 rounded-md flex gap-1 whitespace-nowrap">
                                                <EditableText value={exp.startDate} onSave={(val) => handleUpdateExperience(index, 'startDate', val)} />
                                                <span>-</span>
                                                <EditableText value={exp.endDate || 'Present'} onSave={(val) => handleUpdateExperience(index, 'endDate', val)} />
                                            </div>
                                        </div>
                                        <EditableText value={exp.company} onSave={(val) => handleUpdateExperience(index, 'company', val)} className="text-[10.5px] italic mb-3 block" />

                                        <div className="space-y-1">
                                            {exp.responsibilities.map((resp, idx) => (
                                                <div key={idx} className="flex gap-2 items-start text-[10px] text-[#475569]">
                                                    <span className="font-bold" style={{ color: colors.primary || '#3B82F6' }}>•</span>
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
                            <h2 className="text-sm font-bold uppercase tracking-wider border-b-2 pb-2 mb-6" style={{ color: colors.primary || '#1E293B', borderColor: colors.primary || '#3B82F6' }}>Education</h2>
                            <div className="space-y-6 ml-2">
                                {userdata.education.map((edu, index) => (
                                    <div key={index} className="relative pl-6">
                                        <div className="absolute left-0 top-1.5 w-2 h-2 rounded-full" style={{ backgroundColor: colors.primary || '#3B82F6' }} />
                                        {index < userdata.education.length - 1 && <div className="absolute left-[3.5px] top-[14px] w-[1px] h-full bg-[#CBD5E1]" />}

                                        <div className="flex justify-between items-start mb-1 gap-4">
                                            <EditableText value={edu.degree} onSave={(val) => handleUpdateEducation(index, 'degree', val)} className="text-[12px] font-bold text-[#1E293B] flex-1" />
                                            <div className="text-[9px] font-bold bg-[#F1F5F9] px-2 py-1 rounded-md whitespace-nowrap">
                                                <EditableText value={edu.graduationYear} onSave={(val) => handleUpdateEducation(index, 'graduationYear', val)} />
                                            </div>
                                        </div>
                                        <EditableText value={edu.institution} onSave={(val) => handleUpdateEducation(index, 'institution', val)} className="text-[10.5px] block" />
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
