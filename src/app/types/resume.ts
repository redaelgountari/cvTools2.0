export interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  city?: string;
  linkedin: string;
  website: string;
  github: string;
  portfolio: string;
  title?: string;
}

export interface Skills {
  technical: string[];
  soft: string[];
  languages: string[];
}

export interface Experience {
  title: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  responsibilities: string[];
  achievements?: string[];
}

export interface Education {
  degree: string;
  institution: string;
  location: string;
  graduationYear: string;
  endDate?: string;
  fieldOfStudy?: string;
  gpa?: string;
  relevantCourses: string[];
}

export interface Certification {
  name: string;
  issuer: string;
  year: string;
  expiryDate?: string;
}

export interface Publication {
  title: string;
  publicationType: string;
  publisher?: string;
  year: string;
  date?: string;
  link: string;
  description?: string;
}

export interface Award {
  name: string;
  title?: string;
  issuer?: string;
  year: string;
  date?: string;
  description: string;
}

export interface VolunteerExperience {
  role: string;
  organization: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface Project {
  title: string;
  description: string;
  technologiesUsed: string[];
  technologies?: string[];
  github: string;
  role: string;
  url?: string;
  link?: string;
  images?: string[];
}

export interface OnlinePresence {
  twitter: string;
  stackOverflow: string;
  medium: string;
}

export interface UserData {
  image: string;
  name: string;
}

const defaultUserData: UserData = {
  image: '',
  name: ''
}

export interface Resume {
  personalInfo: PersonalInfo;
  professionalSummary: string;
  jobSearchTitle: string;
  skills: Skills;
  tools: string[];
  experience: Experience[];
  education: Education[];
  certifications: Certification[];
  publications: Publication[];
  awards: Award[];
  volunteerExperience: VolunteerExperience[];
  projects: Project[];
  onlinePresence: OnlinePresence;
  hobbies: string[];
  image: string[];
}

export const EmptyResume: Resume = {
  personalInfo: {
    fullName: ' ',
    email: ' ',
    phone: ' ',
    location: ' ',
    city: ' ',
    linkedin: ' ',
    website: ' ',
    github: ' ',
    portfolio: ' ',
  },
  professionalSummary: ' ',
  jobSearchTitle: ' ',
  skills: {
    technical: [],
    soft: [],
    languages: [],
  },
  tools: [],
  experience: [],
  education: [],
  certifications: [],
  publications: [],
  awards: [],
  volunteerExperience: [],
  projects: [],
  onlinePresence: {
    twitter: ' ',
    stackOverflow: ' ',
    medium: ' ',
  },
  hobbies: [],
  image: [],
};

export interface MatchData {
  matchScore: number;
  skillsMatch: number;
  experienceMatch: number;
  educationMatch: number;
  skillsJustification?: string;
  experienceJustification?: string;
  educationJustification?: string;
}
