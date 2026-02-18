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

export default function HTMLTheme2({
    userdata,
    colors = DEFAULT_THEME_COLORS.theme2,
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

    return (
        <div className="flex flex-row w-full min-h-[1100px] bg-white shadow-2xl mx-auto overflow-hidden text-[#2D3748]" style={{ fontFamily: 'Inter, sans-serif' }}>
            {/* Left Column */}
            <div
                className="w-[32%] p-8 pt-10 border-r"
                style={{
                    backgroundColor: colors.sidebar || '#F5F7FA',
                    borderColor: colors.border || '#E2E8F0'
                }}
            >
                {hasValidImage && (
                    <div className="w-32 h-32 rounded-full mb-8 border-2 mx-auto overflow-hidden" style={{ borderColor: colors.primary || '#3182CE' }}>
                        <img className="w-full h-full object-cover" src={userdata.image[0]} alt="Avatar" />
                    </div>
                )}

                <div className="mb-8">
                    <h3 className="text-xs font-bold uppercase tracking-[1.5px] pb-1 mb-4 border-b-2" style={{ color: colors.primary || '#3182CE', borderColor: colors.primary || '#3182CE' }}>
                        Contact
                    </h3>

                    <div className="space-y-4 text-[10px]">
                        <div>
                            <p className="font-bold uppercase mb-0.5" style={{ color: colors.accent || '#4A5568' }}>Email</p>
                            <EditableText value={userdata.personalInfo.email}
                                onSave={(val) => handleUpdatePersonalInfo('email', val)}
                                className="text-[11px]"
                            />
                        </div>
                        <div>
                            <p className="font-bold uppercase mb-0.5" style={{ color: colors.accent || '#4A5568' }}>Phone</p>
                            <EditableText value={userdata.personalInfo.phone}
                                onSave={(val) => handleUpdatePersonalInfo('phone', val)}
                                className="text-[11px]"
                            />
                        </div>
                        <div>
                            <p className="font-bold uppercase mb-0.5" style={{ color: colors.accent || '#4A5568' }}>Location</p>
                            <EditableText value={userdata.personalInfo.location}
                                onSave={(val) => handleUpdatePersonalInfo('location', val)}
                                className="text-[11px]"
                            />
                        </div>
                    </div>
                </div>

                {userdata.skills.technical.length > 0 && (
                    <div className="mb-8">
                        <h3 className="text-xs font-bold uppercase tracking-[1.5px] pb-1 mb-4 border-b-2" style={{ color: colors.primary || '#3182CE', borderColor: colors.primary || '#3182CE' }}>
                            Skills
                        </h3>
                        <div className="space-y-2">
                            {userdata.skills.technical.map((skill, index) => (
                                <EditableText key={index}
                                    value={skill}
                                    onSave={(val) => handleUpdateSkill('technical', index, val)}
                                    className="text-xs"
                                />
                            ))}
                        </div>
                    </div>
                )}

                {userdata.skills.languages.length > 0 && (
                    <div className="mb-8">
                        <h3 className="text-xs font-bold uppercase tracking-[1.5px] pb-1 mb-4 border-b-2" style={{ color: colors.primary || '#3182CE', borderColor: colors.primary || '#3182CE' }}>
                            Languages
                        </h3>
                        <div className="space-y-2">
                            {userdata.skills.languages.map((lang, index) => (
                                <EditableText key={index}
                                    value={lang}
                                    onSave={(val) => handleUpdateSkill('languages', index, val)}
                                    className="text-xs"
                                />
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Main Content */}
            <div className="w-[68%] p-10 bg-white">
                <header className="mb-10">
                    <EditableText value={displayName}
                        onSave={(val) => handleUpdatePersonalInfo('fullName', val)}
                        className="text-4xl font-bold uppercase tracking-wider mb-1 p-0"
                        style={{ color: colors.primary || '#3182CE' }}
                    />
                    <EditableText value={displayTitle}
                        onSave={handleUpdateTitle}
                        className="text-base font-bold uppercase tracking-[3px]"
                        style={{ color: colors.accent || '#4A5568' }}
                    />
                </header>

                {hasContent(userdata.professionalSummary) && (
                    <section className="mb-8">
                        <h2 className="text-lg font-bold uppercase tracking-widest pb-2 mb-4 border-b" style={{ color: colors.primary || '#3182CE', borderColor: colors.border || '#E2E8F0' }}>
                            Profile
                        </h2>
                        <EditableText value={userdata.professionalSummary}
                            onSave={handleUpdateSummary}
                            multiline
                            className="text-[11px] leading-relaxed text-justify"
                        />
                    </section>
                )}

                {userdata.experience.length > 0 && (
                    <section className="mb-8">
                        <h2 className="text-lg font-bold uppercase tracking-widest pb-2 mb-4 border-b" style={{ color: colors.primary || '#3182CE', borderColor: colors.border || '#E2E8F0' }}>
                            Experience
                        </h2>
                        <div className="space-y-6">
                            {userdata.experience.map((exp, index) => (
                                <div key={index}>
                                    <div className="flex justify-between items-baseline mb-1">
                                        <EditableText value={exp.title}
                                            onSave={(val) => handleUpdateExperience(index, 'title', val)}
                                            className="text-sm font-bold"
                                        />
                                        <div className="flex gap-1 text-[10px] font-bold" style={{ color: colors.accent || '#4A5568' }}>
                                            <EditableText value={exp.startDate} onSave={(val) => handleUpdateExperience(index, 'startDate', val)} />
                                            <span>-</span>
                                            <EditableText value={exp.endDate || 'Present'} onSave={(val) => handleUpdateExperience(index, 'endDate', val)} />
                                        </div>
                                    </div>
                                    <EditableText value={exp.company}
                                        onSave={(val) => handleUpdateExperience(index, 'company', val)}
                                        className="text-xs font-bold mb-2 block"
                                        style={{ color: colors.primary || '#3182CE' }}
                                    />
                                    <div className="space-y-1 mt-2">
                                        {exp.responsibilities.map((resp, idx) => (
                                            <div key={idx} className="flex flex-row gap-2">
                                                <span className="text-xs" style={{ color: colors.primary || '#3182CE' }}>•</span>
                                                <EditableText value={resp}
                                                    onSave={(val) => {
                                                        const newResp = [...exp.responsibilities];
                                                        newResp[idx] = val;
                                                        handleUpdateExperience(index, 'responsibilities', newResp);
                                                    }}
                                                    className="text-[11px] flex-1"
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
                        <h2 className="text-lg font-bold uppercase tracking-widest pb-2 mb-4 border-b" style={{ color: colors.primary || '#3182CE', borderColor: colors.border || '#E2E8F0' }}>
                            Education
                        </h2>
                        <div className="space-y-6">
                            {userdata.education.map((edu, index) => (
                                <div key={index}>
                                    <div className="flex justify-between items-baseline mb-1">
                                        <EditableText value={edu.degree}
                                            onSave={(val) => handleUpdateEducation(index, 'degree', val)}
                                            className="text-sm font-bold"
                                        />
                                        <EditableText value={edu.graduationYear}
                                            onSave={(val) => handleUpdateEducation(index, 'graduationYear', val)}
                                            className="text-[10px] font-bold"
                                            style={{ color: colors.accent || '#4A5568' }}
                                        />
                                    </div>
                                    <EditableText value={edu.institution}
                                        onSave={(val) => handleUpdateEducation(index, 'institution', val)}
                                        className="text-xs font-bold block"
                                        style={{ color: colors.primary || '#3182CE' }}
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
