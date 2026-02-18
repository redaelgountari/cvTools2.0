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

export default function HTMLTheme6({
    userdata,
    colors = DEFAULT_THEME_COLORS.theme6,
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
    const displayTitle = hasContent(userdata.jobSearchTitle) ? userdata.jobSearchTitle.trim() : (hasContent(userdata.experience?.[0]?.title) ? userdata.experience[0].title.trim() : 'Professional');
    const hasValidImage = userdata.image && userdata.image[0] && hasContent(userdata.image[0]);

    return (
        <div className="w-full min-h-[1122px] bg-white shadow-2xl mx-auto overflow-hidden text-[#37474F]" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>
            {/* Header */}
            <header className="flex flex-row p-8 border-b-2 items-center" style={{ backgroundColor: colors.background || '#F8FAFB', borderColor: colors.border || '#CFD8DC' }}>
                {hasValidImage && (
                    <div className="w-20 h-20 rounded-full overflow-hidden border-2 mr-6" style={{ borderColor: colors.primary || '#0F4C81' }}>
                        <img src={userdata.image[0]} alt="Profile" className="w-full h-full object-cover" />
                    </div>
                )}
                <div className="flex-1">
                    <EditableText
                        value={displayName.toUpperCase()}
                        onSave={(val) => handleUpdatePersonalInfo('fullName', val)}
                        className="text-2xl font-bold tracking-[2px] p-0 mb-1"
                        style={{ color: colors.primary || '#0F4C81' }}
                    />
                    <EditableText
                        value={displayTitle.toUpperCase()}
                        onSave={handleUpdateTitle}
                        className="text-[10px] tracking-[1.1px] uppercase"
                    />
                </div>
                <div className="flex flex-col items-end text-[9px] space-y-1">
                    {hasContent(userdata.personalInfo.email) && (
                        <EditableText value={userdata.personalInfo.email} onSave={(val) => handleUpdatePersonalInfo('email', val)} />
                    )}
                    {hasContent(userdata.personalInfo.phone) && (
                        <EditableText value={userdata.personalInfo.phone} onSave={(val) => handleUpdatePersonalInfo('phone', val)} />
                    )}
                    {hasContent(userdata.personalInfo.location) && (
                        <EditableText value={userdata.personalInfo.location} onSave={(val) => handleUpdatePersonalInfo('location', val)} />
                    )}
                </div>
            </header>

            <div className="flex flex-row">
                {/* Left Column */}
                <aside className="w-[35%] p-8 pt-6 space-y-6" style={{ backgroundColor: colors.background || '#F8FAFB' }}>
                    {hasContent(userdata.professionalSummary) && (
                        <section>
                            <h2 className="text-[10px] font-bold tracking-[1.2px] uppercase border-b-2 pb-1 mb-3" style={{ color: colors.primary || '#0F4C81', borderColor: colors.primary || '#0F4C81' }}>PROFIL</h2>
                            <EditableText
                                value={userdata.professionalSummary}
                                onSave={handleUpdateSummary}
                                multiline
                                className="text-[9px] leading-relaxed text-justify"
                            />
                        </section>
                    )}

                    {userdata.skills.languages.length > 0 && (
                        <section>
                            <h2 className="text-[10px] font-bold tracking-[1.2px] uppercase border-b-2 pb-1 mb-3" style={{ color: colors.primary || '#0F4C81', borderColor: colors.primary || '#0F4C81' }}>LANGUES</h2>
                            <div className="space-y-1 ml-2">
                                {userdata.skills.languages.map((lang, index) => (
                                    <EditableText key={index} value={lang} onSave={(val) => handleUpdateSkill('languages', index, val)} className="text-[9px] font-bold block" />
                                ))}
                            </div>
                        </section>
                    )}

                    {userdata.certifications.length > 0 && (
                        <section>
                            <h2 className="text-[10px] font-bold tracking-[1.2px] uppercase border-b-2 pb-1 mb-3" style={{ color: colors.primary || '#0F4C81', borderColor: colors.primary || '#0F4C81' }}>CERTIFICATIONS</h2>
                            <div className="space-y-3">
                                {userdata.certifications.map((cert, index) => (
                                    <div key={index}>
                                        <EditableText value={cert.name} onSave={(val) => handleUpdateCertification(index, 'name', val)} className="text-[9px] font-bold block" style={{ color: colors.primary || '#0F4C81' }} />
                                        <EditableText value={cert.issuer || ''} onSave={(val) => handleUpdateCertification(index, 'issuer', val)} className="text-[9px] block" />
                                        <EditableText value={cert.year || ''} onSave={(val) => handleUpdateCertification(index, 'year', val)} className="text-[8px] text-gray-400 block" />
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {userdata.skills.technical.length > 0 && (
                        <section>
                            <h2 className="text-[10px] font-bold tracking-[1.2px] uppercase border-b-2 pb-1 mb-3" style={{ color: colors.primary || '#0F4C81', borderColor: colors.primary || '#0F4C81' }}>COMPÉTENCES</h2>
                            <div className="space-y-1 ml-2">
                                {userdata.skills.technical.map((skill, index) => (
                                    <div key={index} className="flex gap-2 items-start text-[9px]">
                                        <span>•</span>
                                        <EditableText value={skill} onSave={(val) => handleUpdateSkill('technical', index, val)} />
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {userdata.skills.soft.length > 0 && (
                        <section>
                            <h2 className="text-[10px] font-bold tracking-[1.2px] uppercase border-b-2 pb-1 mb-3" style={{ color: colors.primary || '#0F4C81', borderColor: colors.primary || '#0F4C81' }}>EXPERTISE</h2>
                            <div className="space-y-1 ml-2">
                                {userdata.skills.soft.map((skill, index) => (
                                    <div key={index} className="flex gap-2 items-start text-[9px]">
                                        <span>•</span>
                                        <EditableText value={skill} onSave={(val) => handleUpdateSkill('soft', index, val)} />
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </aside>

                {/* Right Column */}
                <main className="w-[65%] p-8 pt-6 space-y-6">
                    {userdata.experience.length > 0 && (
                        <section>
                            <h2 className="text-[10px] font-bold tracking-[1.2px] uppercase border-b-2 pb-1 mb-4" style={{ color: colors.primary || '#0F4C81', borderColor: colors.primary || '#0F4C81' }}>EXPÉRIENCE PROFESSIONNELLE</h2>
                            <div className="space-y-6">
                                {userdata.experience.map((exp, index) => (
                                    <div key={index}>
                                        <EditableText value={exp.title} onSave={(val) => handleUpdateExperience(index, 'title', val)} className="text-[10px] font-bold block mb-1" style={{ color: colors.primary || '#0F4C81' }} />
                                        <div className="flex justify-between items-baseline mb-2 text-[9px]">
                                            <div className="italic flex gap-1">
                                                <EditableText value={exp.company} onSave={(val) => handleUpdateExperience(index, 'company', val)} />
                                                <span>,</span>
                                                <EditableText value={exp.location || ''} onSave={(val) => handleUpdateExperience(index, 'location', val)} />
                                            </div>
                                            <div className="font-bold text-gray-500 flex gap-1">
                                                <EditableText value={exp.startDate} onSave={(val) => handleUpdateExperience(index, 'startDate', val)} />
                                                <span>-</span>
                                                <EditableText value={exp.endDate || 'Présent'} onSave={(val) => handleUpdateExperience(index, 'endDate', val)} />
                                            </div>
                                        </div>
                                        <div className="space-y-1 ml-2">
                                            {exp.responsibilities.map((resp, idx) => (
                                                <div key={idx} className="flex gap-2 items-start text-[9px]">
                                                    <span style={{ color: colors.primary || '#0F4C81' }}>•</span>
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
                            <h2 className="text-[10px] font-bold tracking-[1.2px] uppercase border-b-2 pb-1 mb-4" style={{ color: colors.primary || '#0F4C81', borderColor: colors.primary || '#0F4C81' }}>FORMATION</h2>
                            <div className="space-y-4">
                                {userdata.education.map((edu, index) => (
                                    <div key={index}>
                                        <EditableText value={edu.degree} onSave={(val) => handleUpdateEducation(index, 'degree', val)} className="text-[9.5px] font-bold block mb-1" style={{ color: colors.primary || '#0F4C81' }} />
                                        <EditableText value={edu.institution} onSave={(val) => handleUpdateEducation(index, 'institution', val)} className="text-[9px] block mb-1" />
                                        <EditableText value={edu.graduationYear} onSave={(val) => handleUpdateEducation(index, 'graduationYear', val)} className="text-[8px] text-gray-500 block" />
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {userdata.projects.length > 0 && (
                        <section>
                            <h2 className="text-[10px] font-bold tracking-[1.2px] uppercase border-b-2 pb-1 mb-4" style={{ color: colors.primary || '#0F4C81', borderColor: colors.primary || '#0F4C81' }}>PROJETS NOTABLES</h2>
                            <div className="space-y-6">
                                {userdata.projects.map((proj, index) => (
                                    <div key={index}>
                                        <EditableText value={proj.title} onSave={(val) => handleUpdateProject(index, 'title', val)} className="text-[10px] font-bold block mb-1" style={{ color: colors.primary || '#0F4C81' }} />
                                        <EditableText
                                            value={proj.description}
                                            onSave={(val) => handleUpdateProject(index, 'description', val)}
                                            multiline
                                            className="text-[9px] leading-relaxed text-justify mb-2"
                                        />
                                        {(proj.technologies || proj.technologiesUsed) && (
                                            <div className="text-[8px] italic text-gray-500 flex gap-1">
                                                <span>Technologies:</span>
                                                <EditableText
                                                    value={(proj.technologies || proj.technologiesUsed).join(', ')}
                                                    onSave={(val) => handleUpdateProject(index, 'technologies', val.split(',').map(t => t.trim()))}
                                                />
                                            </div>
                                        )}
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
