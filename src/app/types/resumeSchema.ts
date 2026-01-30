import { z } from 'zod';

export const PersonalInfoSchema = z.object({
    fullName: z.string().min(1, "Full Name is required").max(100),
    email: z.string().min(1, "Email is required").email("Invalid email address"),
    phone: z.string().min(1, "Phone number is required").max(20),
    location: z.string().min(1, "Location is required").max(100),
    linkedin: z.string().url("Invalid LinkedIn URL").optional().or(z.literal('')),
    website: z.string().url("Invalid Website URL").optional().or(z.literal('')),
    github: z.string().url("Invalid GitHub URL").optional().or(z.literal('')),
    portfolio: z.string().url("Invalid Portfolio URL").optional().or(z.literal('')),
    city: z.string().optional().or(z.literal('')),
});

export const SkillsSchema = z.object({
    technical: z.array(z.string()).optional(),
    soft: z.array(z.string()).optional(),
    languages: z.array(z.string()).optional(),
});

export const ExperienceSchema = z.object({
    title: z.string().optional().or(z.literal('')),
    company: z.string().optional().or(z.literal('')),
    location: z.string().optional().or(z.literal('')),
    startDate: z.string().optional().or(z.literal('')),
    endDate: z.string().optional().or(z.literal('')),
    responsibilities: z.array(z.string()).optional(),
    achievements: z.array(z.string()).optional(),
});

export const EducationSchema = z.object({
    degree: z.string().optional().or(z.literal('')),
    institution: z.string().optional().or(z.literal('')),
    location: z.string().optional().or(z.literal('')),
    graduationYear: z.string().optional().or(z.literal('')),
    endDate: z.string().optional().or(z.literal('')),
    fieldOfStudy: z.string().optional().or(z.literal('')),
    gpa: z.string().optional().or(z.literal('')),
    relevantCourses: z.array(z.string()).optional(),
});

export const CertificationSchema = z.object({
    name: z.string().optional().or(z.literal('')),
    issuer: z.string().optional().or(z.literal('')),
    year: z.string().optional().or(z.literal('')),
    expiryDate: z.string().optional().or(z.literal('')),
});

export const PublicationSchema = z.object({
    title: z.string().optional().or(z.literal('')),
    publicationType: z.string().optional().or(z.literal('')),
    publisher: z.string().optional().or(z.literal('')),
    year: z.string().optional().or(z.literal('')),
    date: z.string().optional().or(z.literal('')),
    link: z.string().url("Invalid Link URL").optional().or(z.literal('')),
    description: z.string().optional().or(z.literal('')),
});

export const AwardSchema = z.object({
    name: z.string().optional().or(z.literal('')),
    title: z.string().optional().or(z.literal('')),
    issuer: z.string().optional().or(z.literal('')),
    year: z.string().optional().or(z.literal('')),
    date: z.string().optional().or(z.literal('')),
    description: z.string().optional().or(z.literal('')),
});

export const VolunteerExperienceSchema = z.object({
    role: z.string().optional().or(z.literal('')),
    organization: z.string().optional().or(z.literal('')),
    startDate: z.string().optional().or(z.literal('')),
    endDate: z.string().optional().or(z.literal('')),
    description: z.string().optional().or(z.literal('')),
});

export const ProjectSchema = z.object({
    title: z.string().optional().or(z.literal('')),
    description: z.string().optional().or(z.literal('')),
    technologiesUsed: z.array(z.string()).optional(),
    technologies: z.array(z.string()).optional(),
    github: z.string().url("Invalid GitHub URL").optional().or(z.literal('')),
    role: z.string().optional().or(z.literal('')),
    url: z.string().url("Invalid Project URL").optional().or(z.literal('')),
    link: z.string().optional().or(z.literal('')),
    images: z.array(z.string()).optional(),
});

export const OnlinePresenceSchema = z.object({
    twitter: z.string().url("Invalid Twitter URL").optional().or(z.literal('')),
    stackOverflow: z.string().url("Invalid StackOverflow URL").optional().or(z.literal('')),
    medium: z.string().url("Invalid Medium URL").optional().or(z.literal('')),
});

export const ResumeSchema = z.object({
    personalInfo: PersonalInfoSchema.optional(),
    professionalSummary: z.string().min(1, "Professional Summary is required"),
    skills: SkillsSchema.optional(),
    tools: z.array(z.string()).optional(),
    experience: z.array(ExperienceSchema).optional(),
    education: z.array(EducationSchema).optional(),
    certifications: z.array(CertificationSchema).optional(),
    publications: z.array(PublicationSchema).optional(),
    awards: z.array(AwardSchema).optional(),
    volunteerExperience: z.array(VolunteerExperienceSchema).optional(),
    projects: z.array(ProjectSchema).optional(),
    onlinePresence: OnlinePresenceSchema.optional(),
    hobbies: z.array(z.string()).optional(),
    image: z.array(z.string()).optional(),
});
