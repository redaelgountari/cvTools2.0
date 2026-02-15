import { Resume, EmptyResume } from '@/app/types/resume';

const getString = (val: any): string => {
    if (val === null || val === undefined) return '';
    if (Array.isArray(val)) {
        return val.length > 0 ? String(val[0] || '') : '';
    }
    return String(val);
};

const getStringFromSummary = (val: any): string => {
    if (val === null || val === undefined) return '';
    if (Array.isArray(val)) {
        return val.filter(item => item).join(' ');
    }
    return String(val);
};

export const normalizeResumeData = (data: any): Resume => {
    if (!data) return EmptyResume;

    // Handle deep copy and merging with default empty structure to ensure safety
    const safeInfo = data.personalInfo || {};

    // Helper to ensure arrays
    const ensureArray = (arr: any) => Array.isArray(arr) ? arr : (arr ? [arr] : []);

    return {
        ...EmptyResume,
        // Carry over other properties that might match
        ...data,

        // Explicitly normalize problematic fields
        personalInfo: {
            ...EmptyResume.personalInfo,
            ...safeInfo,
            fullName: getString(safeInfo.fullName),
            email: getString(safeInfo.email),
            phone: getString(safeInfo.phone),
            location: getString(safeInfo.location),
            city: getString(safeInfo.city),
            linkedin: getString(safeInfo.linkedin),
            website: getString(safeInfo.website),
            github: getString(safeInfo.github),
            portfolio: getString(safeInfo.portfolio),
            title: getString(safeInfo.title),
        },

        professionalSummary: getStringFromSummary(data.professionalSummary),
        jobSearchTitle: getString(data.jobSearchTitle),

        skills: {
            technical: ensureArray(data.skills?.technical),
            soft: ensureArray(data.skills?.soft),
            languages: ensureArray(data.skills?.languages),
        },

        experience: ensureArray(data.experience).map((exp: any) => ({
            ...exp,
            title: getString(exp.title),
            company: getString(exp.company),
            location: getString(exp.location),
            startDate: getString(exp.startDate),
            endDate: getString(exp.endDate),
            responsibilities: ensureArray(exp.responsibilities).map(getString),
            achievements: ensureArray(exp.achievements).map(getString),
        })),

        education: ensureArray(data.education).map((edu: any) => ({
            ...edu,
            degree: getString(edu.degree),
            institution: getString(edu.institution),
            location: getString(edu.location),
            graduationYear: getString(edu.graduationYear),
            relevantCourses: ensureArray(edu.relevantCourses).map(getString),
        })),

        projects: ensureArray(data.projects).map((proj: any) => ({
            ...proj,
            title: getString(proj.title),
            description: getString(proj.description),
            technologiesUsed: ensureArray(proj.technologiesUsed).map(getString),
            github: getString(proj.github),
            role: getString(proj.role),
        })),

        certifications: ensureArray(data.certifications).map((cert: any) => ({
            ...cert,
            name: getString(cert.name),
            issuer: getString(cert.issuer),
            year: getString(cert.year),
        })),

        // Ensure image is an array
        image: ensureArray(data.image),

        // Ensure other array fields
        tools: ensureArray(data.tools),
        hobbies: ensureArray(data.hobbies),
        languages: ensureArray(data.languages), // Note: sometimes languages are top level or in skills, schema says skills.languages
    };
};
