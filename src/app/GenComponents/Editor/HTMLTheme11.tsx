"use client";

import React from 'react';
import { Resume } from '@/app/types/resume';
import { DEFAULT_THEME_COLORS } from '../Themes/themeDefaults';
import { hasContent } from '../Themes/contentVerification';
import { EditableText } from './EditableText';

const THEME11_COLORS = {
    primary: '#1e3a8a',
    secondary: '#000000',
    accent: '#64748b',
    text: '#1a1a1a',
    background: '#FFFFFF',
    border: '#cbd5e1'
};

interface HTMLThemeProps {
    userdata: Resume;
    colors?: any;
    userImage?: string;
    onUpdate: (newData: Resume) => void;
}

export default function HTMLTheme11({
    userdata,
    colors = THEME11_COLORS,
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

    const handleUpdateCertification = (index: number, field: string, value: string) => {
        const updated = { ...userdata };
        const newCerts = [...updated.certifications];
        newCerts[index] = { ...newCerts[index], [field]: value };
        updated.certifications = newCerts;
        onUpdate(updated);
    };

    const displayName = hasContent(userdata.personalInfo?.fullName) ? userdata.personalInfo.fullName.trim() : 'NAME';
    const displayTitle = hasContent(userdata.experience?.[0]?.title) ? userdata.experience[0].title.trim() : 'Professional';
    const hasValidImage = userdata.image && userdata.image[0] && hasContent(userdata.image[0]);

    return (
        <div className="w-full min-h-[1122px] bg-white shadow-2xl mx-auto p-10 pt-10 text-[#1a1a1a]" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>
            {/* Header */}
            <header className="flex flex-row border-b-[1.5px] pb-4 mb-6" style={{ borderColor: colors.primary || '#1e3a8a' }}>
                <div className="flex-1">
                    <EditableText
                        value={displayName}
                        onSave={(val) => handleUpdatePersonalInfo('fullName', val)}
                        className="text-2xl font-bold tracking-tight mb-1 p-0"
                        style={{ color: colors.secondary || '#000000' }}
                    />
                    <EditableText
                        value={displayTitle}
                        onSave={handleUpdateTitle}
                        className="text-sm font-bold p-0 mb-2 block"
                        style={{ color: colors.secondary || '#000000' }}
                    />

                    <div className="flex flex-wrap items-center gap-2 text-[9.5px] text-[#1a1a1a] opacity-80 mt-4">
                        {hasContent(userdata.personalInfo.email) && (
                            <EditableText value={userdata.personalInfo.email} onSave={(val) => handleUpdatePersonalInfo('email', val)} />
                        )}
                        <span style={{ color: colors.accent }}>|</span>
                        {hasContent(userdata.personalInfo.phone) && (
                            <EditableText value={userdata.personalInfo.phone} onSave={(val) => handleUpdatePersonalInfo('phone', val)} />
                        )}
                        <span style={{ color: colors.accent }}>|</span>
                        {hasContent(userdata.personalInfo.location) && (
                            <EditableText value={userdata.personalInfo.location} onSave={(val) => handleUpdatePersonalInfo('location', val)} />
                        )}
                    </div>
                </div>
                {hasValidImage && (
                    <div className="ml-6">
                        <img src={userdata.image[0]} alt="Profile" className="w-[55px] h-[55px] rounded-full object-cover" />
                    </div>
                )}
            </header>

            <div className="space-y-6">
                {hasContent(userdata.professionalSummary) && (
                    <section>
                        <h2 className="text-[10px] font-bold uppercase tracking-[0.6px] border-b-[0.5px] pb-1 mb-2" style={{ color: colors.primary || '#1e3a8a', borderColor: colors.border || '#cbd5e1' }}>Profil Professionnel</h2>
                        <EditableText
                            value={userdata.professionalSummary}
                            onSave={handleUpdateSummary}
                            multiline
                            className="text-[10.5px] leading-relaxed text-justify"
                        />
                    </section>
                )}

                {userdata.experience.length > 0 && (
                    <section>
                        <h2 className="text-[10px] font-bold uppercase tracking-[0.6px] border-b-[0.5px] pb-1 mb-3" style={{ color: colors.primary || '#1e3a8a', borderColor: colors.border || '#cbd5e1' }}>Expérience Professionnelle</h2>
                        <div className="space-y-4">
                            {userdata.experience.map((exp, index) => (
                                <div key={index}>
                                    <div className="flex justify-between items-start mb-1 gap-4">
                                        <div className="flex flex-wrap gap-1 text-[9.5px] font-bold">
                                            <EditableText value={exp.title} onSave={(val) => handleUpdateExperience(index, 'title', val)} style={{ color: colors.secondary || '#000000' }} />
                                            <span>—</span>
                                            <EditableText value={exp.company} onSave={(val) => handleUpdateExperience(index, 'company', val)} />
                                            <span className="font-normal opacity-60">|</span>
                                            <EditableText value={exp.location || ''} onSave={(val) => handleUpdateExperience(index, 'location', val)} className="font-normal opacity-60" />
                                        </div>
                                        <div className="text-[8.5px] font-bold opacity-60 whitespace-nowrap flex gap-1">
                                            <EditableText value={exp.startDate} onSave={(val) => handleUpdateExperience(index, 'startDate', val)} />
                                            <span>-</span>
                                            <EditableText value={exp.endDate || 'Present'} onSave={(val) => handleUpdateExperience(index, 'endDate', val)} />
                                        </div>
                                    </div>
                                    <div className="space-y-1 ml-4 pt-1">
                                        {exp.responsibilities.map((resp, idx) => (
                                            <div key={idx} className="flex gap-2 items-start text-[9.5px]">
                                                <span>•</span>
                                                <EditableText
                                                    value={resp}
                                                    onSave={(val) => {
                                                        const newResp = [...exp.responsibilities];
                                                        newResp[idx] = val;
                                                        handleUpdateExperience(index, 'responsibilities', newResp);
                                                    }}
                                                    className="flex-1 leading-normal"
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                <div className="grid grid-cols-2 gap-8">
                    <div className="space-y-6">
                        {userdata.education.length > 0 && (
                            <section>
                                <h2 className="text-[10px] font-bold uppercase tracking-[0.6px] border-b-[0.5px] pb-1 mb-3" style={{ color: colors.primary || '#1e3a8a', borderColor: colors.border || '#cbd5e1' }}>ÉDUCATION</h2>
                                <div className="space-y-4">
                                    {userdata.education.map((edu, index) => (
                                        <div key={index}>
                                            <div className="flex justify-between items-start mb-1">
                                                <EditableText value={edu.degree} onSave={(val) => handleUpdateEducation(index, 'degree', val)} className="text-[9.5px] font-bold" style={{ color: colors.secondary || '#000000' }} />
                                                <EditableText value={edu.graduationYear} onSave={(val) => handleUpdateEducation(index, 'graduationYear', val)} className="text-[8.5px] opacity-60" />
                                            </div>
                                            <div className="text-[9.5px]">
                                                <EditableText value={edu.institution} onSave={(val) => handleUpdateEducation(index, 'institution', val)} />
                                                {hasContent(edu.location) && <span> | {edu.location}</span>}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {userdata.skills.languages.length > 0 && (
                            <section>
                                <h2 className="text-[10px] font-bold uppercase tracking-[0.6px] border-b-[0.5px] pb-1 mb-3" style={{ color: colors.primary || '#1e3a8a', borderColor: colors.border || '#cbd5e1' }}>LANGUES</h2>
                                <EditableText
                                    value={userdata.skills.languages.join(', ')}
                                    onSave={(val) => {
                                        const langs = val.split(',').map(s => s.trim());
                                        onUpdate({ ...userdata, skills: { ...userdata.skills, languages: langs } });
                                    }}
                                    className="text-[10.5px]"
                                />
                            </section>
                        )}
                    </div>

                    <div className="space-y-6">
                        {userdata.skills.technical.length > 0 && (
                            <section>
                                <h2 className="text-[10px] font-bold uppercase tracking-[0.6px] border-b-[0.5px] pb-1 mb-3" style={{ color: colors.primary || '#1e3a8a', borderColor: colors.border || '#cbd5e1' }}>COMPÉTENCES TECHNIQUES</h2>
                                <div className="flex flex-wrap gap-x-4 gap-y-1">
                                    {userdata.skills.technical.map((skill, index) => (
                                        <div key={index} className="flex gap-1 items-center text-[10px]">
                                            <span>•</span>
                                            <EditableText value={skill} onSave={(val) => handleUpdateSkill('technical', index, val)} />
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {userdata.tools.length > 0 && (
                            <section>
                                <h2 className="text-[10px] font-bold uppercase tracking-[0.6px] border-b-[0.5px] pb-1 mb-3" style={{ color: colors.primary || '#1e3a8a', borderColor: colors.border || '#cbd5e1' }}>OUTILS & TECHNOLOGIES</h2>
                                <div className="flex flex-wrap gap-x-4 gap-y-1">
                                    {userdata.tools.map((tool, index) => (
                                        <div key={index} className="flex gap-1 items-center text-[10px]">
                                            <span>•</span>
                                            <EditableText value={tool} onSave={(val) => handleUpdateSkill('tools', index, val)} />
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}
                    </div>
                </div>

                {userdata.projects.length > 0 && (
                    <section>
                        <h2 className="text-[10px] font-bold uppercase tracking-[0.6px] border-b-[0.5px] pb-1 mb-3" style={{ color: colors.primary || '#1e3a8a', borderColor: colors.border || '#cbd5e1' }}>PROJECTS</h2>
                        <div className="space-y-4">
                            {userdata.projects.map((proj, index) => (
                                <div key={index}>
                                    <EditableText value={proj.title} onSave={(val) => handleUpdateProject(index, 'title', val)} className="text-[10px] font-bold" style={{ color: colors.secondary || '#000000' }} />
                                    <EditableText value={proj.description} onSave={(val) => handleUpdateProject(index, 'description', val)} multiline className="text-[10px] leading-relaxed mb-1" />
                                    <div className="text-[9px] opacity-60 flex gap-1">
                                        <span>Stack:</span>
                                        <EditableText value={(proj.technologiesUsed || proj.technologies || []).join(', ')} onSave={(val) => handleUpdateProject(index, 'technologiesUsed', val.split(',').map(s => s.trim()))} />
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
