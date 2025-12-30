export interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  website: string;
  github: string;
  portfolio: string;
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
}

export interface Education {
  degree: string;
  institution: string;
  location: string;
  graduationYear: string;
  relevantCourses: string[];
}

export interface Certification {
  name: string;
  issuer: string;
  year: string;
}

export interface Publication {
  title: string;
  publicationType: string;
  year: string;
  link: string;
}

export interface Award {
  name: string;
  year: string;
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
  github: string;
  role: string;
}

export interface OnlinePresence {
  twitter: string;
  stackOverflow: string;
  medium: string;
}

export interface UserData {
    image: string;
    name: string;
    // Add other user properties
  }
  
  // Define empty defaults to avoid null
  const defaultUserData: UserData = {
    image: '',
    name: ''
  }
  

  
export interface Resume {
  personalInfo: PersonalInfo;
  professionalSummary: string;
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
}
