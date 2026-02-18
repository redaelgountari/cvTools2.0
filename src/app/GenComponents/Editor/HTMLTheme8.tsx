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

export default function HTMLTheme8({
    userdata,
    colors = DEFAULT_THEME_COLORS.theme8,
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

    const handleUpdateCertification = (index: number, field: string, value: string) => {
        const updated = { ...userdata };
        const newCerts = [...updated.certifications];
        newCerts[index] = { ...newCerts[index], [field]: value };
        updated.certifications = newCerts;
        onUpdate(updated);
    };

    const displayName = hasContent(userdata.personalInfo?.fullName) ? userdata.personalInfo.fullName.trim() : 'Your Name';
    const displayTitle = hasContent(userdata.jobSearchTitle) ? userdata.jobSearchTitle.trim() : (hasContent(userdata.personalInfo?.title) ? userdata.personalInfo.title.trim() : 'Professional');

    return (
        <div className="w-full min-h-[1122px] bg-white shadow-2xl mx-auto p-8 text-[#333333]" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>
            <header className="mb-6">
                <EditableText
                    value={displayName.toUpperCase()}
                    onSave={(val) => handleUpdatePersonalInfo('fullName', val)}
                    className="text-2xl font-bold p-0 mb-1"
                    style={{ color: colors.primary || '#000000' }}
                />
                <EditableText
                    value={displayTitle}
                    onSave={handleUpdateTitle}
                    className="text-lg p-0 mb-1"
                    style={{ color: colors.secondary || '#4A5568' }}
                />
            </header>

            <div className="flex flex-row justify-between border-t border-b p-2 mb-6 flex-wrap gap-4" style={{ borderColor: colors.border || '#000' }}>
                {hasContent(userdata.personalInfo.location) && (
                    <EditableText value={userdata.personalInfo.location} onSave={(val) => handleUpdatePersonalInfo('location', val)} className="text-[10px]" />
                )}
                {hasContent(userdata.personalInfo.phone) && (
                    <EditableText value={userdata.personalInfo.phone} onSave={(val) => handleUpdatePersonalInfo('phone', val)} className="text-[10px]" />
                )}
                {hasContent(userdata.personalInfo.email) && (
                    <EditableText value={userdata.personalInfo.email} onSave={(val) => handleUpdatePersonalInfo('email', val)} className="text-[10px]" />
                )}
            </div>

            {hasContent(userdata.professionalSummary) && (
                <section className="mb-8">
                    <h2 className="text-sm font-bold uppercase border-b pb-1 mb-3" style={{ color: colors.primary || '#000', borderColor: colors.border || '#000' }}>About Me</h2>
                    <EditableText
                        value={userdata.professionalSummary}
                        onSave={handleUpdateSummary}
                        multiline
                        className="text-[10px] leading-relaxed text-justify"
                    />
                </section>
            )}

            {userdata.experience.length > 0 && (
                <section className="mb-8">
                    <h2 className="text-sm font-bold uppercase border-b pb-1 mb-3" style={{ color: colors.primary || '#000', borderColor: colors.border || '#000' }}>Professional Experience</h2>
                    <div className="space-y-6">
                        {userdata.experience.map((exp, index) => (
                            <div key={index}>
                                <div className="mb-2">
                                    <EditableText value={exp.title} onSave={(val) => handleUpdateExperience(index, 'title', val)} className="text-xs font-bold block" style={{ color: colors.primary || '#2D3748' }} />
                                    <EditableText value={exp.company} onSave={(val) => handleUpdateExperience(index, 'company', val)} className="text-[11px] block" />
                                    <div className="flex justify-between items-center text-[10px] text-gray-500 mt-1">
                                        <div className="flex gap-1">
                                            <EditableText value={exp.startDate} onSave={(val) => handleUpdateExperience(index, 'startDate', val)} />
                                            <span>-</span>
                                            <EditableText value={exp.endDate || 'Present'} onSave={(val) => handleUpdateExperience(index, 'endDate', val)} />
                                        </div>
                                        <EditableText value={exp.location || ''} onSave={(val) => handleUpdateExperience(index, 'location', val)} />
                                    </div>
                                </div>
                                <div className="space-y-1 ml-4">
                                    {exp.responsibilities.map((resp, idx) => (
                                        <div key={idx} className="flex gap-2 items-start text-[10px]">
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
                        ))}
                    </div>
                </section>
            )}

            {userdata.education.length > 0 && (
                <section className="mb-8">
                    <h2 className="text-sm font-bold uppercase border-b pb-1 mb-3" style={{ color: colors.primary || '#000', borderColor: colors.border || '#000' }}>Education</h2>
                    <div className="space-y-4">
                        {userdata.education.map((edu, index) => (
                            <div key={index}>
                                <EditableText value={edu.degree} onSave={(val) => handleUpdateEducation(index, 'degree', val)} className="text-[11px] font-bold block mb-1" style={{ color: colors.primary || '#2D3748' }} />
                                <div className="flex gap-1 text-[10px] block">
                                    <EditableText value={edu.institution} onSave={(val) => handleUpdateEducation(index, 'institution', val)} />
                                    <span>,</span>
                                    <EditableText value={edu.location || ''} onSave={(val) => handleUpdateEducation(index, 'location', val)} />
                                </div>
                                <EditableText value={edu.graduationYear} onSave={(val) => handleUpdateEducation(index, 'graduationYear', val)} className="text-[10px] block" />
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {(userdata.skills.technical.length > 0 || userdata.skills.soft.length > 0) && (
                <section className="mb-8">
                    <h2 className="text-sm font-bold uppercase border-b pb-1 mb-3" style={{ color: colors.primary || '#000', borderColor: colors.border || '#000' }}>Skills & Languages</h2>
                    <div className="flex flex-wrap gap-4">
                        {userdata.skills.technical.map((skill, index) => (
                            <div key={`tech-${index}`} className="flex gap-2 items-center text-[10px]">
                                <span>•</span>
                                <EditableText value={skill} onSave={(val) => handleUpdateSkill('technical', index, val)} />
                            </div>
                        ))}
                        {userdata.skills.soft.map((skill, index) => (
                            <div key={`soft-${index}`} className="flex gap-2 items-center text-[10px]">
                                <span>•</span>
                                <EditableText value={skill} onSave={(val) => handleUpdateSkill('soft', index, val)} />
                            </div>
                        ))}
                        {userdata.skills.languages.map((lang, index) => (
                            <div key={`lang-${index}`} className="flex gap-2 items-center text-[10px]">
                                <span>•</span>
                                <EditableText value={lang} onSave={(val) => handleUpdateSkill('languages', index, val)} />
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {userdata.certifications.length > 0 && (
                <section className="mb-8">
                    <h2 className="text-sm font-bold uppercase border-b pb-1 mb-3" style={{ color: colors.primary || '#000', borderColor: colors.border || '#000' }}>Certifications</h2>
                    <div className="space-y-4">
                        {userdata.certifications.map((cert, index) => (
                            <div key={index}>
                                <EditableText value={cert.name} onSave={(val) => handleUpdateCertification(index, 'name', val)} className="text-[11px] font-bold block mb-1" style={{ color: colors.primary || '#2D3748' }} />
                                <div className="flex gap-1 text-[10px]">
                                    <EditableText value={cert.issuer || ''} onSave={(val) => handleUpdateCertification(index, 'issuer', val)} />
                                    <span>,</span>
                                    <EditableText value={cert.year || ''} onSave={(val) => handleUpdateCertification(index, 'year', val)} />
                                    {hasContent(cert.expiryDate) && (
                                        <>
                                            <span>-</span>
                                            <EditableText value={cert.expiryDate} onSave={(val) => handleUpdateCertification(index, 'expiryDate', val)} />
                                        </>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            )}
        </div>
    );
}
