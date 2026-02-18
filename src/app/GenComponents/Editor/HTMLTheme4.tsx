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

export default function HTMLTheme4({
    userdata,
    colors = DEFAULT_THEME_COLORS.theme4,
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
    const displayTitle = hasContent(userdata.jobSearchTitle) ? userdata.jobSearchTitle.trim() : (hasContent(userdata.personalInfo?.title) ? userdata.personalInfo?.title?.trim() : 'Professional');

    return (
        <div className="w-full min-h-[1122px] bg-white shadow-2xl mx-auto overflow-hidden text-[#333333]" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>
            {/* Header Section */}
            <header className="p-8 flex flex-row items-center" style={{ backgroundColor: colors.primary || '#202A44', color: 'white' }}>
                <div className="flex-1">
                    <EditableText
                        value={displayName}
                        onSave={(val) => handleUpdatePersonalInfo('fullName', val)}
                        className="text-3xl font-bold uppercase tracking-widest mb-1 p-0"
                        style={{ color: 'white' }}
                    />
                    <EditableText
                        value={displayTitle}
                        onSave={handleUpdateTitle}
                        className="text-sm font-bold uppercase tracking-wider"
                        style={{ color: colors.accent || '#F06543' }}
                    />
                    <div className="flex flex-wrap gap-4 mt-4 text-[11px]">
                        {hasContent(userdata.personalInfo?.email) && (
                            <div className="flex items-center gap-1">
                                <span>✉</span>
                                <EditableText value={userdata.personalInfo.email} onSave={(val) => handleUpdatePersonalInfo('email', val)} className="text-white" />
                            </div>
                        )}
                        {hasContent(userdata.personalInfo?.phone) && (
                            <div className="flex items-center gap-1">
                                <span>☎</span>
                                <EditableText value={userdata.personalInfo.phone} onSave={(val) => handleUpdatePersonalInfo('phone', val)} className="text-white" />
                            </div>
                        )}
                        {hasContent(userdata.personalInfo?.location) && (
                            <div className="flex items-center gap-1">
                                <span>📍</span>
                                <EditableText value={userdata.personalInfo.location} onSave={(val) => handleUpdatePersonalInfo('location', val)} className="text-white" />
                            </div>
                        )}
                    </div>
                </div>
            </header>

            <div className="flex flex-row flex-1">
                {/* Left Column */}
                <div className="w-[65%] p-8">
                    {hasContent(userdata.professionalSummary) && (
                        <section className="mb-8">
                            <h2 className="text-lg font-bold uppercase tracking-wider mb-4 pb-1 border-b-2" style={{ color: colors.primary || '#202A44', borderColor: colors.primary || '#202A44' }}>
                                Profile Summary
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
                        <section className="mb-8">
                            <h2 className="text-lg font-bold uppercase tracking-wider mb-4 pb-1 border-b-2" style={{ color: colors.primary || '#202A44', borderColor: colors.primary || '#202A44' }}>
                                Work Experience
                            </h2>
                            <div className="space-y-6">
                                {userdata.experience.map((exp, index) => (
                                    <div key={index}>
                                        <div className="flex justify-between items-baseline mb-1">
                                            <EditableText
                                                value={exp.title}
                                                onSave={(val) => handleUpdateExperience(index, 'title', val)}
                                                className="text-sm font-bold"
                                                style={{ color: colors.primary || '#202A44' }}
                                            />
                                            <div className="flex gap-1 text-[11px] font-bold" style={{ color: colors.accent || '#F06543' }}>
                                                <EditableText value={exp.startDate} onSave={(val) => handleUpdateExperience(index, 'startDate', val)} />
                                                <span>-</span>
                                                <EditableText value={exp.endDate || 'Present'} onSave={(val) => handleUpdateExperience(index, 'endDate', val)} />
                                            </div>
                                        </div>
                                        <EditableText
                                            value={exp.company}
                                            onSave={(val) => handleUpdateExperience(index, 'company', val)}
                                            className="text-[11px] italic mb-2 block"
                                        />
                                        <div className="space-y-1 mt-2">
                                            {exp.responsibilities.map((resp, idx) => (
                                                <div key={idx} className="flex flex-row gap-2">
                                                    <span className="text-[11px]" style={{ color: colors.accent || '#F06543' }}>•</span>
                                                    <EditableText
                                                        value={resp}
                                                        onSave={(val) => {
                                                            const newResp = [...exp.responsibilities];
                                                            newResp[idx] = val;
                                                            handleUpdateExperience(index, 'responsibilities', newResp);
                                                        }}
                                                        className="text-[11px] flex-1 leading-normal"
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {userdata.projects.length > 0 && (
                        <section className="mb-8">
                            <h2 className="text-lg font-bold uppercase tracking-wider mb-4 pb-1 border-b-2" style={{ color: colors.primary || '#202A44', borderColor: colors.primary || '#202A44' }}>
                                Notable Projects
                            </h2>
                            <div className="space-y-6">
                                {userdata.projects.map((project, index) => (
                                    <div key={index}>
                                        <EditableText
                                            value={project.title}
                                            onSave={(val) => handleUpdateProject(index, 'title', val)}
                                            className="text-sm font-bold block mb-1"
                                            style={{ color: colors.primary || '#202A44' }}
                                        />
                                        <EditableText
                                            value={project.description}
                                            onSave={(val) => handleUpdateProject(index, 'description', val)}
                                            multiline
                                            className="text-[11px] leading-relaxed"
                                        />
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </div>

                {/* Right Column */}
                <div className="w-[35%] py-8 px-6 bg-[#F8F9FA] border-l" style={{ borderColor: colors.border || '#E0E0E0' }}>
                    {userdata.skills.technical.length > 0 && (
                        <div className="mb-8">
                            <h3 className="text-sm font-bold uppercase tracking-wide mb-4 pb-1 border-b-2" style={{ color: colors.primary || '#202A44', borderColor: colors.accent || '#F06543' }}>
                                Technical Skills
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {userdata.skills.technical.map((skill, index) => (
                                    <div key={index} className="bg-white border rounded px-2 py-1 text-[11px]" style={{ borderColor: colors.border || '#E0E0E0' }}>
                                        <EditableText
                                            value={skill}
                                            onSave={(val) => handleUpdateSkill('technical', index, val)}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {userdata.education.length > 0 && (
                        <div className="mb-8">
                            <h3 className="text-sm font-bold uppercase tracking-wide mb-4 pb-1 border-b-2" style={{ color: colors.primary || '#202A44', borderColor: colors.accent || '#F06543' }}>
                                Education
                            </h3>
                            <div className="space-y-4">
                                {userdata.education.map((edu, index) => (
                                    <div key={index}>
                                        <EditableText
                                            value={edu.degree}
                                            onSave={(val) => handleUpdateEducation(index, 'degree', val)}
                                            className="text-[11px] font-bold block"
                                            style={{ color: colors.primary || '#202A44' }}
                                        />
                                        <EditableText
                                            value={edu.institution}
                                            onSave={(val) => handleUpdateEducation(index, 'institution', val)}
                                            className="text-[10px] block"
                                        />
                                        <EditableText
                                            value={edu.graduationYear}
                                            onSave={(val) => handleUpdateEducation(index, 'graduationYear', val)}
                                            className="text-[10px] text-gray-500 block"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {userdata.skills.languages.length > 0 && (
                        <div className="mb-8">
                            <h3 className="text-sm font-bold uppercase tracking-wide mb-4 pb-1 border-b-2" style={{ color: colors.primary || '#202A44', borderColor: colors.accent || '#F06543' }}>
                                Languages
                            </h3>
                            <div className="space-y-1">
                                {userdata.skills.languages.map((lang, index) => (
                                    <div key={index} className="flex items-center gap-2 text-[11px]">
                                        <span style={{ color: colors.accent || '#F06543' }}>•</span>
                                        <EditableText
                                            value={lang}
                                            onSave={(val) => handleUpdateSkill('languages', index, val)}
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
