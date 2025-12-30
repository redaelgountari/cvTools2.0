"use client"

import React from 'react';
import { Document, Page, Text, View, StyleSheet, Svg, Path } from '@react-pdf/renderer';

// ======= TYPES =======
interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  website?: string;
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
  publications: any[];
  awards: any[];
  volunteerExperience: any[];
  projects?: Project[];
  onlinePresence: any[];
  hobbies: string[];
}

// ======= THEME CONSTANTS =======
const COLORS = {
  primary: '#2C5EBD',
  primaryLight: '#D9E2F8',
  primaryLighter: '#E8F0FF',
  primaryBackground: '#F0F5FF',
  primaryVeryLight: '#F8FAFF',
  text: '#333333',
  textLight: '#666666',
  white: '#FFFFFF',
  divider: '#EEEEEE',
  border: '#D9E2F8',
};

// ======= STYLES =======
const styles = StyleSheet.create({
  page: {
    padding: 0,
    fontFamily: 'Helvetica',
    backgroundColor: COLORS.white,
  },
  // Header styles
  diagonalHeader: {
    height: 140,
    width: '100%',
    position: 'relative',
  },
  headerBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 140,
  },
  headerContent: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    padding: 30,
    paddingTop: 35,
  },
  name: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.white,
    marginBottom: 4,
    textTransform: 'uppercase',
    letterSpacing: 1.5,
  },
  title: {
    fontSize: 16,
    color: COLORS.white,
    letterSpacing: 0.5,
    marginBottom: 5,
  },
  headerInfo: {
    position: 'absolute',
    right: 30,
    top: 73,
    alignItems: 'flex-end',
  },
  headerInfoItem: {
    fontSize: 9,
    color: COLORS.white,
    marginBottom: 3,
  },
  
  // Layout styles
  container: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 0,
  },
  leftColumn: {
    width: '32%',
    backgroundColor: COLORS.primaryBackground,
    paddingTop: 40,
    paddingBottom: 30,
    paddingLeft: 25,
    paddingRight: 25,
    borderRight: `2px solid ${COLORS.primary}`,
  },
  rightColumn: {
    width: '68%',
    padding: 30,
    paddingTop: 40,
  },
  
  // Common Section styles
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 12,
    color: COLORS.primary,
    textTransform: 'uppercase',
    paddingBottom: 6,
    position: 'relative',
  },
  sectionTitleLine: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    height: 2,
    width: '40%',
    backgroundColor: COLORS.primary,
  },
  sectionTitleDot: {
    position: 'absolute',
    bottom: -2.5,
    left: '40%',
    width: 7,
    height: 7,
    borderRadius: 3.5,
    backgroundColor: COLORS.primary,
  },
  horizontalLine: {
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    marginVertical: 6,
  },
  
  // Skills styles
  skillProgressContainer: {
    marginBottom: 8,
  },
  skillLabel: {
    fontSize: 10,
    color: COLORS.text,
    marginBottom: 3,
  },
  skillProgressBar: {
    height: 4,
    backgroundColor: COLORS.primaryLight,
    borderRadius: 2,
  },
  skillProgressFill: {
    height: 4,
    backgroundColor: COLORS.primary,
    borderRadius: 2,
  },
  
  // Languages styles
  languageItem: {
    marginBottom: 8,
  },
  languageNameAndLevel: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 3,
  },
  languageName: {
    fontSize: 10,
    color: COLORS.text,
    fontWeight: 'bold',
  },
  languageLevel: {
    fontSize: 9,
    color: COLORS.textLight,
    fontStyle: 'italic',
  },
  languageBar: {
    height: 4,
    backgroundColor: COLORS.primaryLight,
    borderRadius: 2,
  },
  languageFill: {
    height: 4,
    backgroundColor: COLORS.primary,
    borderRadius: 2,
  },
  
  // Hobbies styles
  hobbiesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  hobbyItem: {
    fontSize: 10,
    color: COLORS.text,
    backgroundColor: COLORS.primaryLight,
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: 10,
    marginRight: 5,
    marginBottom: 5,
  },
  
  // Certifications styles
  certificationItem: {
    marginBottom: 8,
  },
  certificationName: {
    fontSize: 10,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 2,
  },
  certificationDetails: {
    fontSize: 9,
    color: COLORS.textLight,
  },
  
  // Experience styles
  experienceItem: {
    marginBottom: 20,
    position: 'relative',
    paddingLeft: 16,
  },
  timelineDot: {
    position: 'absolute',
    left: 0,
    top: 5,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.primary,
  },
  timelineLine: {
    position: 'absolute',
    left: 3.5,
    top: 13,
    bottom: -10,
    width: 1,
    backgroundColor: COLORS.primaryLight,
  },
  jobTitle: {
    fontSize: 13,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: 2,
  },
  companyAndDate: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  company: {
    fontSize: 11,
    color: COLORS.text,
    fontWeight: 'bold',
  },
  dateRange: {
    fontSize: 10,
    color: COLORS.textLight,
    fontStyle: 'italic',
  },
  location: {
    fontSize: 10,
    color: COLORS.textLight,
    marginBottom: 6,
  },
  
  // Bullet lists
  bulletList: {
    marginTop: 4,
    marginLeft: 6,
  },
  bulletWrapper: {
    flexDirection: 'row',
    marginBottom: 3,
  },
  bullet: {
    color: COLORS.primary,
    marginRight: 6,
    fontSize: 10,
    lineHeight: 1.4,
  },
  bulletText: {
    fontSize: 10,
    color: COLORS.text,
    lineHeight: 1.4,
    flex: 1,
  },
  
  // Education styles
  educationItem: {
    marginBottom: 16,
    position: 'relative',
    paddingLeft: 16,
  },
  degree: {
    fontSize: 12,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: 2,
  },
  eduDateAndInstitution: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 2,
  },
  institution: {
    fontSize: 11,
    color: COLORS.text,
  },
  graduationYear: {
    fontSize: 10,
    color: COLORS.textLight,
    fontStyle: 'italic',
  },
  
  // Summary/Profile styles
  summaryBox: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 6,
    padding: 10,
    backgroundColor: COLORS.primaryVeryLight,
    marginBottom: 20,
  },
  summaryHeading: {
    fontSize: 11,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: 5,
  },
  summaryText: {
    fontSize: 10,
    lineHeight: 1.5,
    color: COLORS.text,
  },
  
  // Project styles
  projectItem: {
    marginBottom: 16,
    position: 'relative',
    paddingLeft: 16,
  },
  projectTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: 2,
  },
  projectDescription: {
    fontSize: 10,
    color: COLORS.text,
    marginBottom: 4,
    lineHeight: 1.4,
  },
  techBadgesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 4,
  },
  techBadge: {
    fontSize: 9,
    color: COLORS.primary,
    backgroundColor: COLORS.primaryLighter,
    borderRadius: 9,
    paddingVertical: 2,
    paddingHorizontal: 6,
    marginRight: 4,
    marginBottom: 4,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  projectLink: {
    fontSize: 9,
    color: COLORS.primary,
    marginTop: 2,
    textDecoration: 'underline',
  },
});

// ======= UTILITY FUNCTIONS =======
// Filter out empty or N/A values
const filterNA = (value: string | undefined): string => 
  (value && value !== 'N/A') ? value : '';

// Generate a consistent skill level based on skill name
const getSkillLevel = (skill: string): number => {
  // Hash function for consistent pseudo-random values
  const hash = skill.split('').reduce((acc, char) => {
    return ((acc << 5) - acc) + char.charCodeAt(0);
  }, 0);
  
  // Range between 60-100 for skill levels
  return 60 + Math.abs(hash % 41);
};

// Map languages to proficiency levels with localization support
const getLanguageLevel = (language: string): [string, number] => {
  const normalizedLang = language.toLowerCase();
  
  if (normalizedLang.includes('anglais') || normalizedLang.includes('english')) {
    return ['Avancé', 85];
  } else if (normalizedLang.includes('allemand') || normalizedLang.includes('german')) {
    return ['Intermédiaire', 65];
  } else if (normalizedLang.includes('espagnol') || normalizedLang.includes('spanish')) {
    return ['Débutant', 40];
  } else if (normalizedLang.includes('français') || normalizedLang.includes('french')) {
    return ['Natif', 100];
  } else {
    // Hash for consistent random values
    const hash = language.split('').reduce((acc, char) => {
      return ((acc << 5) - acc) + char.charCodeAt(0);
    }, 0);
    const level = 40 + Math.abs(hash % 61);
    
    // Text representation based on level
    if (level > 90) return ['Natif', level];
    if (level > 75) return ['Avancé', level];
    if (level > 50) return ['Intermédiaire', level];
    return ['Débutant', level];
  }
};

// ======= COMPONENT FUNCTIONS =======
// Header component with diagonal design
const Header = ({ personalInfo, jobTitle }: { personalInfo: PersonalInfo, jobTitle?: string }) => (
  <View style={styles.diagonalHeader}>
    <Svg style={styles.headerBackground} viewBox="0 0 595 140">
      <Path
        d="M0,0 L595,0 L595,90 Q450,140 300,105 Q150,70 0,120 L0,0 Z"
        fill={COLORS.primary}
      />
    </Svg>
    <View style={styles.headerContent}>
      <Text style={styles.name}>{filterNA(personalInfo.fullName)}</Text>
      {jobTitle && <Text style={styles.title}>{jobTitle}</Text>}
    </View>
    <View style={styles.headerInfo}>
      {filterNA(personalInfo.phone) && (
        <Text style={styles.headerInfoItem}>{personalInfo.phone}</Text>
      )}
      {filterNA(personalInfo.email) && (
        <Text style={styles.headerInfoItem}>{personalInfo.email}</Text>
      )}
      {filterNA(personalInfo.location) && (
        <Text style={styles.headerInfoItem}>{personalInfo.location}</Text>
      )}
    </View>
  </View>
);

// Section title component with decorative line and dot
const SectionTitle = ({ title }: { title: string }) => (
  <Text style={styles.sectionTitle}>
    {title}
    <View style={styles.sectionTitleLine} />
    <View style={styles.sectionTitleDot} />
  </Text>
);

// Bullet list item component for reuse
const BulletItem = ({ text, symbol = '•' }: { text: string, symbol?: string }) => (
  <View style={styles.bulletWrapper}>
    <Text style={styles.bullet}>{symbol}</Text>
    <Text style={styles.bulletText}>{text}</Text>
  </View>
);

// Timeline element for experience and education items
const TimelineElement = ({ isLast = false }: { isLast?: boolean }) => (
  <>
    <View style={styles.timelineDot} />
    {!isLast && <View style={styles.timelineLine} />}
  </>
);

// ======= MAIN COMPONENT =======
export default function ResumeTemplate({ 
  userdata, 
  userImage 
}: { 
  userdata: Resume; 
  userImage: any 
}) {
  const jobTitle = userdata.experience[0]?.title || '';
  
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header with personal info */}
        <Header 
          personalInfo={userdata.personalInfo} 
          jobTitle={jobTitle} 
        />
        
        <View style={styles.container}>
          {/* Left Column */}
          <View style={styles.leftColumn}>
            {/* Professional Summary */}
            {filterNA(userdata.professionalSummary) && (
              <View style={styles.section}>
                <View style={styles.summaryBox}>
                  <Text style={styles.summaryHeading}>PROFIL</Text>
                  <Text style={styles.summaryText}>{userdata.professionalSummary}</Text>
                </View>
              </View>
            )}

            {/* Skills Section */}
            {(userdata.skills.technical.length > 0 || userdata.skills.soft.length > 0) && (
              <View style={styles.section}>
                <SectionTitle title="COMPÉTENCES" />
                
                {/* Soft Skills */}
                {userdata.skills.soft.length > 0 && (
                  <View>
                    {userdata.skills.soft.map((skill, index) => (
                      <View key={`soft-${index}`} style={styles.skillProgressContainer}>
                        <Text style={styles.skillLabel}>{skill}</Text>
                        <View style={styles.skillProgressBar}>
                          <View 
                            style={[
                              styles.skillProgressFill, 
                              { width: `${getSkillLevel(skill)}%` }
                            ]} 
                          />
                        </View>
                      </View>
                    ))}
                  </View>
                )}
                
                {/* Divider between skill types */}
                {userdata.skills.technical.length > 0 && userdata.skills.soft.length > 0 && (
                  <View style={styles.horizontalLine} />
                )}
                
                {/* Technical Skills */}
                {userdata.skills.technical.length > 0 && (
                  <View>
                    {userdata.skills.technical.map((skill, index) => (
                      <View key={`tech-${index}`} style={styles.skillProgressContainer}>
                        <Text style={styles.skillLabel}>{skill}</Text>
                        <View style={styles.skillProgressBar}>
                          <View 
                            style={[
                              styles.skillProgressFill, 
                              { width: `${getSkillLevel(skill)}%` }
                            ]} 
                          />
                        </View>
                      </View>
                    ))}
                  </View>
                )}
              </View>
            )}

            {/* Languages */}
            {userdata.skills.languages.length > 0 && (
              <View style={styles.section}>
                <SectionTitle title="LANGUES" />
                {userdata.skills.languages.map((language, index) => {
                  const [level, percentage] = getLanguageLevel(language);
                  return (
                    <View key={`lang-${index}`} style={styles.languageItem}>
                      <View style={styles.languageNameAndLevel}>
                        <Text style={styles.languageName}>{language}</Text>
                        <Text style={styles.languageLevel}>{level}</Text>
                      </View>
                      <View style={styles.languageBar}>
                        <View 
                          style={[
                            styles.languageFill, 
                            { width: `${percentage}%` }
                          ]} 
                        />
                      </View>
                    </View>
                  );
                })}
              </View>
            )}

            {/* Hobbies */}
            {userdata.hobbies.length > 0 && (
              <View style={styles.section}>
                <SectionTitle title="CENTRES D'INTÉRET" />
                <View style={styles.hobbiesContainer}>
                  {userdata.hobbies.map((hobby, index) => (
                    <Text key={`hobby-${index}`} style={styles.hobbyItem}>{hobby}</Text>
                  ))}
                </View>
              </View>
            )}

            {/* Certifications */}
            {userdata.certifications && userdata.certifications.length > 0 && (
              <View style={styles.section}>
                <SectionTitle title="CERTIFICATIONS" />
                {userdata.certifications.map((cert, index) => (
                  <View key={`cert-${index}`} style={styles.certificationItem}>
                    <Text style={styles.certificationName}>{filterNA(cert.name)}</Text>
                    <Text style={styles.certificationDetails}>
                      {filterNA(cert.issuer)}, {filterNA(cert.year)}
                      {cert.expiryDate && ` - ${cert.expiryDate}`}
                    </Text>
                  </View>
                ))}
              </View>
            )}
          </View>

          {/* Right Column */}
          <View style={styles.rightColumn}>
            {/* Experience */}
            {userdata.experience.length > 0 && (
              <View style={styles.section}>
                <SectionTitle title="EXPÉRIENCE PROFESSIONNELLE" />
                {userdata.experience.map((exp, index) => (
                  <View key={`exp-${index}`} style={styles.experienceItem}>
                    <TimelineElement isLast={index === userdata.experience.length - 1} />
                    
                    <Text style={styles.jobTitle}>{filterNA(exp.title)}</Text>
                    <View style={styles.companyAndDate}>
                      <Text style={styles.company}>{filterNA(exp.company)}</Text>
                      <Text style={styles.dateRange}>
                        {filterNA(exp.startDate)} - {filterNA(exp.endDate)}
                      </Text>
                    </View>
                    <Text style={styles.location}>{filterNA(exp.location)}</Text>
                    
                    {exp.responsibilities.length > 0 && (
                      <View style={styles.bulletList}>
                        {exp.responsibilities.map((responsibility, idx) => (
                          <BulletItem 
                            key={`resp-${idx}`} 
                            text={responsibility} 
                          />
                        ))}
                      </View>
                    )}
                    
                    {exp.achievements && exp.achievements.length > 0 && (
                      <View style={styles.bulletList}>
                        {exp.achievements.map((achievement, idx) => (
                          <BulletItem 
                            key={`achiev-${idx}`} 
                            text={achievement} 
                            symbol="✓" 
                          />
                        ))}
                      </View>
                    )}
                  </View>
                ))}
              </View>
            )}

            {/* Education */}
            {userdata.education.length > 0 && (
              <View style={styles.section}>
                <SectionTitle title="FORMATION" />
                {userdata.education.map((edu, index) => (
                  <View key={`edu-${index}`} style={styles.educationItem}>
                    <TimelineElement isLast={index === userdata.education.length - 1} />
                    
                    <Text style={styles.degree}>{filterNA(edu.degree)}</Text>
                    <View style={styles.eduDateAndInstitution}>
                      <Text style={styles.institution}>
                        {filterNA(edu.institution)}
                      </Text>
                      <Text style={styles.graduationYear}>{filterNA(edu.graduationYear)}</Text>
                    </View>
                    <Text style={styles.location}>{filterNA(edu.location)}</Text>
                    
                    {edu.relevantCourses && edu.relevantCourses.length > 0 && (
                      <View style={styles.bulletList}>
                        {edu.relevantCourses.map((course, idx) => (
                          <BulletItem 
                            key={`course-${idx}`} 
                            text={course} 
                          />
                        ))}
                      </View>
                    )}
                  </View>
                ))}
              </View>
            )}

            {/* Projects (optional) */}
            {userdata.projects && userdata.projects.length > 0 && (
              <View style={styles.section}>
                <SectionTitle title="PROJETS" />
                {userdata.projects.map((project, index) => (
                  <View key={`proj-${index}`} style={styles.projectItem}>
                    <TimelineElement isLast={index === userdata.projects.length - 1} />
                    
                    <Text style={styles.projectTitle}>{project.title}</Text>
                    <Text style={styles.projectDescription}>{project.description}</Text>
                    
                    {project.technologies.length > 0 && (
                      <View style={styles.techBadgesContainer}>
                        {project.technologies.map((tech, idx) => (
                          <Text key={`tech-${idx}`} style={styles.techBadge}>{tech}</Text>
                        ))}
                      </View>
                    )}
                    
                    {project.link && (
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