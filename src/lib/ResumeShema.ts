import mongoose from 'mongoose';

// Personal Info Schema
const PersonalInfoSchema = new mongoose.Schema({
  fullName: { type: String, default: '' },
  email: { type: String, default: '' },
  phone: { type: String, default: '' },
  location: { type: String, default: '' },
  linkedin: { type: String, default: '' },
  website: { type: String, default: '' },
  github: { type: String, default: '' },
  portfolio: { type: String, default: '' }
});

// Skills Schema
const SkillsSchema = new mongoose.Schema({
  technical: { type: [String], default: [] },
  soft: { type: [String], default: [] },
  languages: { type: [String], default: [] }
});

// Experience Schema
const ExperienceSchema = new mongoose.Schema({
  title: { type: String, default: '' },
  company: { type: String, default: '' },
  location: { type: String, default: '' },
  startDate: { type: String, default: '' },
  endDate: { type: String, default: '' },
  responsibilities: { type: [String], default: [] }
});

// Education Schema
const EducationSchema = new mongoose.Schema({
  degree: { type: String, default: '' },
  institution: { type: String, default: '' },
  location: { type: String, default: '' },
  graduationYear: { type: String, default: '' },
  relevantCourses: { type: [String], default: [] }
});

// Certification Schema
const CertificationSchema = new mongoose.Schema({
  name: { type: String, default: '' },
  issuer: { type: String, default: '' },
  year: { type: String, default: '' }
});

// Publication Schema
const PublicationSchema = new mongoose.Schema({
  title: { type: String, default: '' },
  publicationType: { type: String, default: '' },
  year: { type: String, default: '' },
  link: { type: String, default: '' }
});

// Award Schema
const AwardSchema = new mongoose.Schema({
  name: { type: String, default: '' },
  year: { type: String, default: '' },
  description: { type: String, default: '' }
});

// Volunteer Experience Schema
const VolunteerExperienceSchema = new mongoose.Schema({
  role: { type: String, default: '' },
  organization: { type: String, default: '' },
  startDate: { type: String, default: '' },
  endDate: { type: String, default: '' },
  description: { type: String, default: '' }
});

// Project Schema
const ProjectSchema = new mongoose.Schema({
  title: { type: String, default: '' },
  description: { type: String, default: '' },
  technologiesUsed: { type: [String], default: [] },
  github: { type: String, default: '' },
  role: { type: String, default: '' }
});

// Online Presence Schema
const OnlinePresenceSchema = new mongoose.Schema({
  twitter: { type: String, default: '' },
  stackOverflow: { type: String, default: '' },
  medium: { type: String, default: '' }
});

const UserDataSchema = new mongoose.Schema({
  image: { type: String, default: '' },
  name: { type: String, default: '' }
});

const ResumeSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  personalInfo: { type: PersonalInfoSchema, default: () => ({}) },
  professionalSummary: { type: String, default: '' },
  skills: { type: SkillsSchema, default: () => ({}) },
  tools: { type: [String], default: [] },
  experience: { type: [ExperienceSchema], default: [] },
  education: { type: [EducationSchema], default: [] },
  certifications: { type: [CertificationSchema], default: [] },
  publications: { type: [PublicationSchema], default: [] },
  awards: { type: [AwardSchema], default: [] },
  volunteerExperience: { type: [VolunteerExperienceSchema], default: [] },
  projects: { type: [ProjectSchema], default: [] },
  onlinePresence: { type: OnlinePresenceSchema, default: () => ({}) },
  hobbies: { type: [String], default: [] },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const ResumeShema = mongoose.models.Resume || mongoose.model('Resume', ResumeSchema);

export default ResumeShema;