"use client"

import React from 'react';
import { Document, Page, Text, View, StyleSheet, Svg, Path, Image } from '@react-pdf/renderer';

// Define interfaces for types
interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  website?: string;
  profileImage?: string;
}

interface Skills {
  technical: string[];
  soft: string[];
  languages: string[];
}

interface Experience {
  title: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  responsibilities: string[];
  achievements?: string[];
}

interface Education {
  degree: string;
  institution: string;
  location: string;
  graduationYear: string;
  relevantCourses: string[];
  gpa?: string;
}

interface Certification {
  name: string;
  issuer: string;
  year: string;
  expiryDate?: string;
}

interface Project {
  title: string;
  description: string;
  technologies: string[];
  link?: string;
}

interface Resume {
  personalInfo: PersonalInfo;
  professionalSummary: string;
  skills: Skills;
  tools: string[];
  experience: Experience[];
  education: Education[];
  certifications: Certification[];
  publications?: any[];
  awards?: any[];
  volunteerExperience?: any[];
  projects?: Project[];
  onlinePresence?: any[];
  hobbies: string[];
}

// Modern styles with improved adaptability
const styles = StyleSheet.create({
  page: {
    padding: 0,
    backgroundColor: '#FFFFFF',
  },
  header: {
    height: 150,
    width: '100%',
    position: 'relative',
  },
  headerBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 150,
  },
  headerContent: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    padding: 30,
    paddingTop: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerLeft: {
    width: '60%',
    flexDirection: 'row',
  },
  profileImageContainer: {
    width: 90,
    height: 90,
    borderRadius: 45,
    overflow: 'hidden',
    borderWidth: 3,
    borderColor: '#FFFFFF',
    marginRight: 20,
  },
  profileImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  profilePlaceholder: {
    width: '100%',
    height: '100%',
    backgroundColor: '#FFFFFF',
    opacity: 0.3,
  },
  nameTitle: {
    justifyContent: 'center',
  },
  headerRight: {
    width: '40%',
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  name: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
    letterSpacing: 1,
  },
  title: {
    fontSize: 15,
    color: '#FFFFFF',
    letterSpacing: 0.5,
    marginBottom: 10,
  },
  contactItem: {
    fontSize: 9,
    color: '#FFFFFF',
    marginBottom: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  contactText: {
    marginLeft: 4,
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 0,
  },
  leftColumn: {
    width: '34%',
    backgroundColor: '#FAFAFA',
    paddingTop: 30,
    paddingBottom: 30,
    paddingLeft: 25,
    paddingRight: 25,
  },
  rightColumn: {
    width: '66%',
    padding: 30,
    paddingTop: 30,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#155e76',
    paddingBottom: 5,
    position: 'relative',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  sectionBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    height: 2,
    width: '100%',
    backgroundColor: '#E8F1F5',
  },
  sectionAccent: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    height: 2,
    width: '30%',
    backgroundColor: '#155e76',
  },
  section: {
    marginBottom: 22,
  },
  skillContainer: {
    marginBottom: 15,
  },
  skillCategory: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#155e76',
    marginBottom: 8,
  },
  skillsWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  skillBadge: {
    fontSize: 9,
    backgroundColor: '#E8F1F5',
    color: '#155e76',
    padding: 5,
    paddingHorizontal: 10,
    borderRadius: 15,
    marginRight: 5,
    marginBottom: 5,
    borderWidth: 1,
    borderColor: '#D3E4EB',
  },
  languageItem: {
    marginBottom: 12,
  },
  languageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  languageName: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#333333',
  },
  languageLevel: {
    fontSize: 9,
    color: '#155e76',
    fontStyle: 'italic',
  },
  languageBar: {
    height: 5,
    backgroundColor: '#E8F1F5',
    borderRadius: 3,
  },
  languageFill: {
    height: 5,
    backgroundColor: '#155e76',
    borderRadius: 3,
  },
  summaryBox: {
    padding: 14,
    backgroundColor: '#F5F9FB',
    borderLeftWidth: 3,
    borderLeftColor: '#155e76',
    borderRadius: 3,
    marginBottom: 20,
  },
  summaryText: {
    fontSize: 10,
    lineHeight: 1.6,
    color: '#333333',
    textAlign: 'justify',
  },
  experienceItem: {
    marginBottom: 22,
    position: 'relative',
  },
  jobTitle: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#155e76',
    marginBottom: 4,
  },
  companyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 3,
  },
  company: {
    fontSize: 11,
    color: '#333333',
    fontWeight: 'bold',
  },
  dateRange: {
    fontSize: 9,
    color: '#666666',
    fontStyle: 'italic',
    backgroundColor: '#F2F7F9',
    padding: 3,
    paddingHorizontal: 6,
    borderRadius: 3,
  },
  location: {
    fontSize: 9,
    color: '#666666',
    marginBottom: 8,
  },
  bulletWrapper: {
    flexDirection: 'row',
    marginBottom: 4,
    paddingRight: 5,
  },
  bullet: {
    fontSize: 9,
    color: '#155e76',
    marginRight: 5,
    marginTop: 2,
    lineHeight: 1.4,
  },
  bulletText: {
    fontSize: 9,
    color: '#333333',
    lineHeight: 1.5,
    flex: 1,
  },
  educationItem: {
    marginBottom: 18,
  },
  degree: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#155e76',
    marginBottom: 3,
  },
  eduHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 3,
    alignItems: 'center',
  },
  institution: {
    fontSize: 10,
    color: '#333333',
    fontWeight: 'bold',
  },
  graduationYear: {
    fontSize: 9,
    color: '#666666',
    fontStyle: 'italic',
    backgroundColor: '#F2F7F9',
    padding: 3,
    paddingHorizontal: 6,
    borderRadius: 3,
  },
  eduLocation: {
    fontSize: 9,
    color: '#666666',
    marginBottom: 6,
  },
  hobbiesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  hobbyItem: {
    fontSize: 9,
    color: '#333333',
    backgroundColor: '#E8F1F5',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 12,
    marginRight: 5,
    marginBottom: 5,
  },
  certificationItem: {
    marginBottom: 12,
    borderLeft: '2px solid #E8F1F5',
    paddingLeft: 8,
  },
  certificationName: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 2,
  },
  certificationDetails: {
    fontSize: 9,
    color: '#666666',
  },
  projectItem: {
    marginBottom: 15,
    padding: 12,
    backgroundColor: '#F5F9FB',
    borderRadius: 4,
    borderLeft: '3px solid #155e76',
  },
  projectTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#155e76',
    marginBottom: 4,
  },
  projectDescription: {
    fontSize: 9,
    color: '#333333',
    marginBottom: 6,
    lineHeight: 1.5,
    textAlign: 'justify',
  },
  techBadgesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 6,
  },
  techBadge: {
    fontSize: 8,
    color: '#FFFFFF',
    backgroundColor: '#155e76',
    borderRadius: 10,
    paddingVertical: 2,
    paddingHorizontal: 8,
    marginRight: 4,
    marginBottom: 4,
  },
  projectLink: {
    fontSize: 9,
    color: '#155e76',
    marginTop: 4,
    textDecoration: 'underline',
  },
  divider: {
    height: 1,
    backgroundColor: '#E8F1F5',
    marginVertical: 12,
  },
  achievementSection: {
    marginTop: 6,
    backgroundColor: '#F7FAFC',
    padding: 8,
    borderRadius: 3,
  },
  achievementTitle: {
    fontSize: 9,
    fontWeight: 'bold',
    color: '#155e76',
    marginBottom: 4,
  },
  emptySection: {
    fontSize: 9,
    color: '#666666',
    fontStyle: 'italic',
    textAlign: 'center',
    padding: 10,
  },
  toolsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 10,
  },
  toolItem: {
    fontSize: 9,
    backgroundColor: '#E3EDF2',
    color: '#155e76',
    padding: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
    marginRight: 4,
    marginBottom: 4,
  },
});

// Improved utility functions
const isValidValue = (value: any): boolean => {
  if (value === undefined || value === null) return false;
  if (typeof value === 'string' && (value.trim() === '' || value.toLowerCase() === 'n/a')) return false;
  if (Array.isArray(value) && value.length === 0) return false;
  return true;
};

const filterData = (value: string | undefined): string => {
  if (!isValidValue(value)) return '';
  return value as string;
};

// Language proficiency mapping
const getLanguageProficiency = (language: string): [string, number] => {
  // Standard language proficiency mapping
  const languageMap: Record<string, [string, number]> = {
    'Native': ['Native', 100],
    'Fluent': ['Fluent', 90],
    'Advanced': ['Advanced', 80],
    'Intermediate': ['Intermediate', 60],
    'Beginner': ['Beginner', 40],
    
    // Common languages with proficiency indicators
    'English (Native)': ['Native', 100],
    'English (Fluent)': ['Fluent', 90],
    'English (Advanced)': ['Advanced', 80],
    'English (Intermediate)': ['Intermediate', 60],
    'English (Beginner)': ['Beginner', 40],
    
    'French (Native)': ['Native', 100],
    'French (Fluent)': ['Fluent', 90],
    'French (Advanced)': ['Advanced', 80],
    'French (Intermediate)': ['Intermediate', 60],
    'French (Beginner)': ['Beginner', 40],
    
    'Spanish (Native)': ['Native', 100],
    'Spanish (Fluent)': ['Fluent', 90],
    'Spanish (Advanced)': ['Advanced', 80],
    'Spanish (Intermediate)': ['Intermediate', 60],
    'Spanish (Beginner)': ['Beginner', 40],
    
    'German (Native)': ['Native', 100],
    'German (Fluent)': ['Fluent', 90],
    'German (Advanced)': ['Advanced', 80],
    'German (Intermediate)': ['Intermediate', 60],
    'German (Beginner)': ['Beginner', 40],
  };

  // Check if we have a direct match in our map
  if (languageMap[language]) {
    return languageMap[language];
  }
  
  // Check for proficiency level in parentheses
  const proficiencyMatch = language.match(/\((.*?)\)/);
  if (proficiencyMatch) {
    const proficiency = proficiencyMatch[1].toLowerCase();
    if (proficiency.includes('native')) return ['Native', 100];
    if (proficiency.includes('fluent')) return ['Fluent', 90];
    if (proficiency.includes('advanced')) return ['Advanced', 80];
    if (proficiency.includes('intermediate')) return ['Intermediate', 60];
    if (proficiency.includes('beginner')) return ['Beginner', 40];
  }
  
  // For languages without specified proficiency, make an educated guess
  // by looking for common language names
  const lowerLang = language.toLowerCase();
  if (lowerLang.includes('english')) return ['Advanced', 80];
  if (lowerLang.includes('french')) return ['Advanced', 80];
  if (lowerLang.includes('spanish')) return ['Intermediate', 60];
  if (lowerLang.includes('german')) return ['Intermediate', 60];
  
  // Default to intermediate for unrecognized languages
  return ['Intermediate', 60];
};

// Main component with improved handling of any data
export default function Theme3({ userdata, userImage }: { userdata: Resume; userImage: any }) {
  // Defensive programming - ensure we have valid data
  const data: Resume = {
    personalInfo: userdata.personalInfo || {
      fullName: 'Full Name',
      email: '',
      phone: '',
      location: '',
      linkedin: '',
    },
    professionalSummary: userdata.professionalSummary || '',
    skills: userdata.skills || { technical: [], soft: [], languages: [] },
    tools: userdata.tools || [],
    experience: userdata.experience || [],
    education: userdata.education || [],
    certifications: userdata.certifications || [],
    publications: userdata.publications || [],
    awards: userdata.awards || [],
    volunteerExperience: userdata.volunteerExperience || [],
    projects: userdata.projects || [],
    onlinePresence: userdata.onlinePresence || [],
    hobbies: userdata.hobbies || [],
  };

  // Determine if sections should be displayed
  const hasSkills = isValidValue(data.skills.technical) || isValidValue(data.skills.soft);
  const hasLanguages = isValidValue(data.skills.languages);
  const hasTools = isValidValue(data.tools);
  const hasCertifications = isValidValue(data.certifications);
  const hasHobbies = isValidValue(data.hobbies);
  const hasExperience = isValidValue(data.experience);
  const hasEducation = isValidValue(data.education);
  const hasProjects = isValidValue(data.projects);
  const hasSummary = isValidValue(data.professionalSummary);

  // Determine current position for header
  const currentPosition = data.experience && data.experience.length > 0 
    ? data.experience[0].title 
    : 'Professional';

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header with gradient background */}
        <View style={styles.header}>
          <Svg style={styles.headerBackground} viewBox="0 0 595 150">
            <Path
              d="M0,0 L595,0 L595,150 L0,150 L0,0 Z"
              fill="#155e76"
            />
            <Path
              d="M0,150 C150,100 300,130 595,90 L595,150 L0,150 Z"
              fill="#1A7A8C"
              opacity="0.6"
            />
          </Svg>
          
          <View style={styles.headerContent}>
            <View style={styles.headerLeft}>
              {/* Profile Image Container with fallback */}
              <View style={styles.profileImageContainer}>
                {/* {isValidValue(data.personalInfo.profileImage) ? (
                  <Image src={userImage} style={styles.profileImage} />
                ) : (
                  <View style={styles.profilePlaceholder} />
                )} */}
                  <Image src={userImage} style={styles.profileImage} />

              </View>
              
              <View style={styles.nameTitle}>
                <Text style={styles.name}>{filterData(data.personalInfo.fullName)}</Text>
                <Text style={styles.title}>{currentPosition}</Text>
              </View>
            </View>
            
            <View style={styles.headerRight}>
              {isValidValue(data.personalInfo.phone) && (
                <View style={styles.contactItem}>
                  <Text style={styles.contactText}>{data.personalInfo.phone}</Text>
                </View>
              )}
              
              {isValidValue(data.personalInfo.email) && (
                <View style={styles.contactItem}>
                  <Text style={styles.contactText}>{data.personalInfo.email}</Text>
                </View>
              )}
              
              {isValidValue(data.personalInfo.location) && (
                <View style={styles.contactItem}>
                  <Text style={styles.contactText}>{data.personalInfo.location}</Text>
                </View>
              )}
              
              {isValidValue(data.personalInfo.linkedin) && (
                <View style={styles.contactItem}>
                  <Text style={styles.contactText}>{data.personalInfo.linkedin}</Text>
                </View>
              )}
              
              {isValidValue(data.personalInfo.website) && (
                <View style={styles.contactItem}>
                  <Text style={styles.contactText}>{data.personalInfo.website}</Text>
                </View>
              )}
            </View>
          </View>
        </View>
        
        <View style={styles.container}>
          {/* Left Column */}
          <View style={styles.leftColumn}>
            {/* Professional Summary */}
            {hasSummary && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>
                  PROFILE
                  <View style={styles.sectionBar} />
                  <View style={styles.sectionAccent} />
                </Text>
                <View style={styles.summaryBox}>
                  <Text style={styles.summaryText}>{data.professionalSummary}</Text>
                </View>
              </View>
            )}

            {/* Skills Section */}
            {hasSkills && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>
                  SKILLS
                  <View style={styles.sectionBar} />
                  <View style={styles.sectionAccent} />
                </Text>
                
                {isValidValue(data.skills.soft) && (
                  <View style={styles.skillContainer}>
                    <Text style={styles.skillCategory}>Soft Skills</Text>
                    <View style={styles.skillsWrapper}>
                      {data.skills.soft.map((skill, index) => (
                        <Text key={index} style={styles.skillBadge}>{skill}</Text>
                      ))}
                    </View>
                  </View>
                )}
                
                {isValidValue(data.skills.technical) && (
                  <View style={styles.skillContainer}>
                    <Text style={styles.skillCategory}>Technical Skills</Text>
                    <View style={styles.skillsWrapper}>
                      {data.skills.technical.map((skill, index) => (
                        <Text key={index} style={styles.skillBadge}>{skill}</Text>
                      ))}
                    </View>
                  </View>
                )}
              </View>
            )}

            {/* Tools Section - New addition */}
            {hasTools && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>
                  TOOLS
                  <View style={styles.sectionBar} />
                  <View style={styles.sectionAccent} />
                </Text>
                <View style={styles.toolsContainer}>
                  {data.tools.map((tool, index) => (
                    <Text key={index} style={styles.toolItem}>{tool}</Text>
                  ))}
                </View>
              </View>
            )}

            {/* Languages Section */}
            {hasLanguages && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>
                  LANGUAGES
                  <View style={styles.sectionBar} />
                  <View style={styles.sectionAccent} />
                </Text>
                {data.skills.languages.map((language, index) => {
                  const [level, percentage] = getLanguageProficiency(language);
                  return (
                    <View key={index} style={styles.languageItem}>
                      <View style={styles.languageHeader}>
                        <Text style={styles.languageName}>{language}</Text>
                        <Text style={styles.languageLevel}>{level}</Text>
                      </View>
                      <View style={styles.languageBar}>
                        <View style={[styles.languageFill, { width: `${percentage}%` }]} />
                      </View>
                    </View>
                  );
                })}
              </View>
            )}

            {/* Certifications Section */}
            {hasCertifications && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>
                  CERTIFICATIONS
                  <View style={styles.sectionBar} />
                  <View style={styles.sectionAccent} />
                </Text>
                {data.certifications.map((cert, index) => (
                  <View key={index} style={styles.certificationItem}>
                    <Text style={styles.certificationName}>{filterData(cert.name)}</Text>
                    <Text style={styles.certificationDetails}>
                      {filterData(cert.issuer)}{cert.issuer ? ', ' : ''}
                      {filterData(cert.year)}
                      {isValidValue(cert.expiryDate) ? ` - ${cert.expiryDate}` : ''}
                    </Text>
                  </View>
                ))}
              </View>
            )}

            {/* Hobbies Section */}
            {hasHobbies && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>
                  INTERESTS
                  <View style={styles.sectionBar} />
                  <View style={styles.sectionAccent} />
                </Text>
                <View style={styles.hobbiesContainer}>
                  {data.hobbies.map((hobby, index) => (
                    <Text key={index} style={styles.hobbyItem}>{hobby}</Text>
                  ))}
                </View>
              </View>
            )}
          </View>

          {/* Right Column */}
          <View style={styles.rightColumn}>
            {/* Experience Section */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>
                PROFESSIONAL EXPERIENCE
                <View style={styles.sectionBar} />
                <View style={styles.sectionAccent} />
              </Text>
              
              {hasExperience ? (
                data.experience.map((exp, index) => (
                  <View key={index} style={styles.experienceItem}>
                    <Text style={styles.jobTitle}>{filterData(exp.title)}</Text>
                    <View style={styles.companyHeader}>
                      <Text style={styles.company}>{filterData(exp.company)}</Text>
                      <Text style={styles.dateRange}>
                        {filterData(exp.startDate)}{exp.endDate ? ` - ${filterData(exp.endDate)}` : ' - Present'}
                      </Text>
                    </View>
                    
                    {isValidValue(exp.location) && (
                      <Text style={styles.location}>{exp.location}</Text>
                    )}
                    
                    {isValidValue(exp.responsibilities) && (
                      <View>
                        {exp.responsibilities.map((responsibility, idx) => (
                          <View key={idx} style={styles.bulletWrapper}>
                            <Text style={styles.bullet}>•</Text>
                            <Text style={styles.bulletText}>{responsibility}</Text>
                          </View>
                        ))}
                      </View>
                    )}
                    
                    {isValidValue(exp.achievements) && (
                      <View style={styles.achievementSection}>
                        <Text style={styles.achievementTitle}>Key Achievements:</Text>
                        {exp.achievements.map((achievement, idx) => (
                          <View key={idx} style={styles.bulletWrapper}>
                            <Text style={styles.bullet}>✓</Text>
                            <Text style={styles.bulletText}>{achievement}</Text>
                          </View>
                        ))}
                      </View>
                    )}
                    
                    {index < data.experience.length - 1 && <View style={styles.divider} />}
                  </View>
                ))
              ) : (
                <Text style={styles.emptySection}>No professional experience listed</Text>
              )}
            </View>

            {/* Education Section */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>
                EDUCATION
                <View style={styles.sectionBar} />
                <View style={styles.sectionAccent} />
              </Text>
              
              {hasEducation ? (
                data.education.map((edu, index) => (
                  <View key={index} style={styles.educationItem}>
                    <Text style={styles.degree}>{filterData(edu.degree)}</Text>
                    <View style={styles.eduHeader}>
                      <Text style={styles.institution}>
                        {filterData(edu.institution)}
                      </Text>
                      <Text style={styles.graduationYear}>{filterData(edu.graduationYear)}</Text>
                    </View>
                    
                    {isValidValue(edu.location) && (
                      <Text style={styles.eduLocation}>{edu.location}</Text>
                    )}
                    
                    {isValidValue(edu.relevantCourses) && (
                      <View>
                        {edu.relevantCourses.map((course, idx) => (
                          <View key={idx} style={styles.bulletWrapper}>
                            <Text style={styles.bullet}>•</Text>
                            <Text style={styles.bulletText}>{course}</Text>
                          </View>
                        ))}
                      </View>
                    )}
                    
                    {index < data.education.length - 1 && <View style={styles.divider} />}
                  </View>
                ))
              ) : (
                <Text style={styles.emptySection}>No education listed</Text>
              )}
            </View>

            {/* Projects Section */}
            {hasProjects && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>
                  PROJECTS
                  <View style={styles.sectionBar} />
                  <View style={styles.sectionAccent} />
                </Text>
                
                {data.projects.map((project, index) => (
                  <View key={index} style={styles.projectItem}>
                    <Text style={styles.projectTitle}>{project.title}</Text>
                    <Text style={styles.projectDescription}>{project.description}</Text>
                    
                    {isValidValue(project.technologies) && (
                      <View style={styles.techBadgesContainer}>
                        {project.technologies.map((tech, idx) => (
                          <Text key={idx} style={styles.techBadge}>{tech}</Text>
                        ))}
                      </View>
                    )}
                    
                    {isValidValue(project.link) && (
                      <Text style={styles.projectLink}>{project.link}</Text>
                    )}
                  </View>
                ))}
              </View>
            )}
          </View>
        </View>
      </Page>
    </Document>
  );
}