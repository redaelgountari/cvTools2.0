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

export default function HTMLTheme1({
    userdata,
    colors = DEFAULT_THEME_COLORS.theme1,
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

    const displayName = hasContent(userdata.personalInfo?.fullName) ? userdata.personalInfo.fullName.trim() : 'Your Name';
    const displayTitle = hasContent(userdata.jobSearchTitle) ? userdata.jobSearchTitle.trim() : (hasContent(userdata.personalInfo?.title) ? (userdata as any).personalInfo.title.trim() : 'Professional');
    const hasValidImage = userdata.image && userdata.image[0] && hasContent(userdata.image[0]);

    const getInitials = (name: string): string => {
        const parts = name.trim().split(' ').filter(p => p);
        if (parts.length === 0) return '?';
        if (parts.length === 1) return parts[0][0].toUpperCase();
        return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    };

    return (
        <div className="flex flex-row w-full min-h-[1100px] bg-white shadow-2xl mx-auto overflow-hidden text-[#111827]" style={{ fontFamily: 'Inter, sans-serif' }}>
            {/* Sidebar */}
            <div
                className="w-[35%] p-8 pt-10 text-white flex flex-col items-center"
                style={{
                    backgroundColor: colors.sidebar || '#1f2937'
                }}
            >
                {hasValidImage ? (
                    <div className="w-32 h-32 rounded-full mb-6 border-2 border-white overflow-hidden">
                        <img className="w-full h-full object-cover" src={userdata.image[0]} alt="Avatar" />
                    </div>
                ) : (
                    <div
                        className="w-24 h-24 rounded-full mb-6 border-2 border-white flex items-center justify-center text-3xl font-bold"
                        style={{ backgroundColor: colors.primary || '#2563eb' }}
                    >
                        {getInitials(displayName)}
                    </div>
                )}

                <EditableText
                    value={displayName}
                    onSave={(val) => handleUpdatePersonalInfo('fullName', val)}
                    className="text-xl font-bold text-center mb-1 w-full"
                    style={{ color: '#FFFFFF' }}
                />
                <EditableText
                    value={displayTitle}
                    onSave={handleUpdateTitle}
                    className="text-xs font-medium text-center mb-8 opacity-90 w-full"
                    style={{ color: '#e5e7eb' }}
                />

                <div className="w-full space-y-6">
                    <div>
                        <h3 className="text-xs font-bold uppercase tracking-wider mb-3 pb-1 border-b" style={{ borderColor: colors.accent || '#4b5563' }}>
                            Contact
                        </h3>
                        <div className="space-y-2">
                            <EditableText
                                value={userdata.personalInfo.email}
                                onSave={(val) => handleUpdatePersonalInfo('email', val)}
                                className="text-[10px]"
                                style={{ color: '#e5e7eb' }}
                            />
                            <EditableText
                                value={userdata.personalInfo.phone}
                                onSave={(val) => handleUpdatePersonalInfo('phone', val)}
                                className="text-[10px]"
                                style={{ color: '#e5e7eb' }}
                            />
                            <EditableText
                                value={userdata.personalInfo.location}
                                onSave={(val) => handleUpdatePersonalInfo('location', val)}
                                className="text-[10px]"
                                style={{ color: '#e5e7eb' }}
                            />
                        </div>
                    </div>

                    {userdata.skills.technical.length > 0 && (
                        <div>
                            <h3 className="text-xs font-bold uppercase tracking-wider mb-3 pb-1 border-b" style={{ borderColor: colors.accent || '#4b5563' }}>
                                Skills
                            </h3>
                            <div className="space-y-1">
                                {userdata.skills.technical.map((skill, index) => (
                                    <EditableText
                                        key={index}
                                        value={`• ${skill}`}
                                        onSave={(val) => handleUpdateSkill('technical', index, val.replace('• ', ''))}
                                        className="text-[10px]"
                                        style={{ color: '#e5e7eb' }}
                                    />
                                ))}
                            </div>
                        </div>
                    )}

                    {userdata.skills.languages.length > 0 && (
                        <div>
                            <h3 className="text-xs font-bold uppercase tracking-wider mb-3 pb-1 border-b" style={{ borderColor: colors.accent || '#4b5563' }}>
                                Languages
                            </h3>
                            <div className="space-y-1">
                                {userdata.skills.languages.map((lang, index) => (
                                    <EditableText
                                        key={index}
                                        value={`• ${lang}`}
                                        onSave={(val) => handleUpdateSkill('languages', index, val.replace('• ', ''))}
                                        className="text-[10px]"
                                        style={{ color: '#e5e7eb' }}
                                    />
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Main Content */}
            <div className="w-[65%] p-10 bg-white">
                {hasContent(userdata.professionalSummary) && (
                    <section className="mb-10">
                        <h2 className="text-sm font-bold uppercase tracking-[1.5px] pb-2 mb-4 border-b-2" style={{ color: colors.secondary || '#1f2937', borderColor: colors.primary || '#2563eb' }}>
                            Professional Profile
                        </h2>
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
                        <h2 className="text-sm font-bold uppercase tracking-[1.5px] pb-2 mb-4 border-b-2" style={{ color: colors.secondary || '#1f2937', borderColor: colors.primary || '#2563eb' }}>
                            Experience
                        </h2>
                        <div className="space-y-6">
                            {userdata.experience.map((exp, index) => (
                                <div key={index}>
                                    <div className="flex justify-between items-baseline mb-1">
                                        <EditableText
                                            value={exp.title}
                                            onSave={(val) => handleUpdateExperience(index, 'title', val)}
                                            className="text-xs font-bold"
                                            style={{ color: colors.secondary || '#1f2937' }}
                                        />
                                        <div className="flex gap-1 text-[10px] font-bold" style={{ color: colors.primary || '#2563eb' }}>
                                            <EditableText value={exp.startDate} onSave={(val) => handleUpdateExperience(index, 'startDate', val)} />
                                            <span>-</span>
                                            <EditableText value={exp.endDate || 'Present'} onSave={(val) => handleUpdateExperience(index, 'endDate', val)} />
                                        </div>
                                    </div>
                                    <EditableText
                                        value={exp.company}
                                        onSave={(val) => handleUpdateExperience(index, 'company', val)}
                                        className="text-[10px] text-gray-500 mb-2 block font-medium"
                                    />
                                    <div className="space-y-1 mt-2">
                                        {exp.responsibilities.map((resp, idx) => (
                                            <div key={idx} className="flex flex-row gap-2">
                                                <span className="text-[10px]" style={{ color: colors.primary || '#2563eb' }}>•</span>
                                                <EditableText
                                                    value={resp}
                                                    onSave={(val) => {
                                                        const newResp = [...exp.responsibilities];
                                                        newResp[idx] = val;
                                                        handleUpdateExperience(index, 'responsibilities', newResp);
                                                    }}
                                                    className="text-[10px] flex-1 leading-normal"
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
                    <section className="mb-10">
                        <h2 className="text-sm font-bold uppercase tracking-[1.5px] pb-2 mb-4 border-b-2" style={{ color: colors.secondary || '#1f2937', borderColor: colors.primary || '#2563eb' }}>
                            Education
                        </h2>
                        <div className="space-y-6">
                            {userdata.education.map((edu, index) => (
                                <div key={index}>
                                    <div className="flex justify-between items-baseline mb-1">
                                        <EditableText
                                            value={edu.degree}
                                            onSave={(val) => handleUpdateEducation(index, 'degree', val)}
                                            className="text-xs font-bold"
                                            style={{ color: colors.secondary || '#1f2937' }}
                                        />
                                        <EditableText
                                            value={edu.graduationYear}
                                            onSave={(val) => handleUpdateEducation(index, 'graduationYear', val)}
                                            className="text-[10px] font-bold"
                                            style={{ color: colors.primary || '#2563eb' }}
                                        />
                                    </div>
                                    <EditableText
                                        value={edu.institution}
                                        onSave={(val) => handleUpdateEducation(index, 'institution', val)}
                                        className="text-[10px] text-gray-500 font-medium"
                                    />
                                </div>
                            ))}
                        </div>
                    </section>
                )}
            </div>
        </div>
    );
}
