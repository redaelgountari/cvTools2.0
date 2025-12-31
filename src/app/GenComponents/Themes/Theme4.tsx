
import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image, Font } from '@react-pdf/renderer';

// Register custom fonts
Font.register({
  family: 'Roboto',
  fonts: [
    { src: 'https://fonts.gstatic.com/s/roboto/v20/KFOmCnqEu92Fr1Mu4mxP.ttf', fontWeight: 'normal' },
    { src: 'https://fonts.gstatic.com/s/roboto/v20/KFOlCnqEu92Fr1MmWUlfBBc9.ttf', fontWeight: 'bold' },
    { src: 'https://fonts.gstatic.com/s/roboto/v20/KFOlCnqEu92Fr1MmSU5fBBc9.ttf', fontWeight: 'light' },
  ],
});

Font.register({
  family: 'OpenSans',
  fonts: [
    { src: 'https://fonts.gstatic.com/s/opensans/v18/mem8YaGs126MiZpBA-UFVZ0e.ttf', fontWeight: 'normal' },
    { src: 'https://fonts.gstatic.com/s/opensans/v18/mem5YaGs126MiZpBA-UN_r8OUuhs.ttf', fontWeight: 'light' },
  ],
});

// Interfaces
interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  website?: string;
  github?: string;
  portfolio?: string;
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
  technologies?: string[];
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
  startDate?: string;
  endDate?: string;
}

interface Resume {
  personalInfo: PersonalInfo;
  professionalSummary: string;
  skills: Skills;
  experience: Experience[];
  education: Education[];
  certifications: Certification[];
  projects?: Project[];
}

// Create styles
const styles = StyleSheet.create({
  page: {
    fontFamily: 'Roboto',
    backgroundColor: '#FFFFFF',
    padding: 0,
  },
  headerSection: {
    backgroundColor: '#202A44',
    color: 'white',
    padding: 30,
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerInfo: {
    flex: 1,
  },
  headerImageContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    overflow: 'hidden',
    marginRight: 20,
    backgroundColor: 'white',
  },
  headerImage: {
    width: '100%',
    height: '100%',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  title: {
    fontSize: 14,
    fontFamily: 'Roboto',
    fontWeight: 'light',
    marginBottom: 10,
  },
  contactRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
  },
  contactItem: {
    fontSize: 10,
    marginRight: 12,
    marginBottom: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  contactText: {
    marginLeft: 5,
  },
  accentBar: {
    height: 5,
    backgroundColor: '#F06543',
    width: '100%',
  },
  content: {
    margin: 30,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  sectionTitleIcon: {
    backgroundColor: '#202A44',
    color: 'white',
    padding: 4,
    borderRadius: 4,
    fontSize: 10,
    marginRight: 8,
    width: 20,
    height: 20,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 16,
    color: '#202A44',
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  divider: {
    height: 1,
    backgroundColor: '#E0E0E0',
    marginBottom: 10,
  },
  summary: {
    fontSize: 11,
    lineHeight: 1.5,
    fontFamily: 'OpenSans',
    color: '#333333',
    marginBottom: 10,
    textAlign: 'justify',
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 5,
  },
  skillCategory: {
    width: '100%',
    fontSize: 12,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 5,
    marginTop: 10,
  },
  skillItem: {
    fontSize: 10,
    color: '#333333',
    marginRight: 8,
    marginBottom: 8,
    backgroundColor: '#F0F0F0',
    borderRadius: 12,
    paddingVertical: 3,
    paddingHorizontal: 8,
  },
  experienceContainer: {
    marginBottom: 15,
  },
  experienceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  jobTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333333',
  },
  company: {
    fontSize: 12,
    fontWeight: 'normal',
    color: '#555555',
  },
  dateLocation: {
    fontSize: 10,
    color: '#555555',
    // fontStyle: 'italic',
  },
  bulletList: {
    marginLeft: 12,
    marginTop: 5,
  },
  bullet: {
    fontSize: 10,
    fontFamily: 'OpenSans',
    marginBottom: 3,
    lineHeight: 1.4,
    color: '#333333',
  },
  technologies: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 5,
  },
  technologyTag: {
    fontSize: 8,
    color: '#555555',
    backgroundColor: '#F0F0F0',
    borderRadius: 10,
    padding: 3,
    marginRight: 5,
    marginBottom: 3,
  },
  achievement: {
    fontSize: 10,
    fontFamily: 'OpenSans',
    color: '#F06543',
    fontWeight: 'bold',
    marginLeft: 12,
    marginBottom: 3,
  },
  columns: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  column: {
    flex: 1,
    paddingRight: 10,
  },
  certificationItem: {
    marginBottom: 8,
  },
  certificationName: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#333333',
  },
  certificationDetails: {
    fontSize: 10,
    color: '#555555',
  },
  educationItem: {
    marginBottom: 10,
  },
  courseList: {
    marginLeft: 12,
    marginTop: 4,
  },
  courseItem: {
    fontSize: 9,
    color: '#555555',
    marginBottom: 2,
  },
  projectItem: {
    marginBottom: 12,
  },
  projectHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 3,
  },
  projectTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#333333',
  },
  projectDates: {
    fontSize: 10,
    color: '#555555',
    // fontStyle: 'italic',
  },
  projectDescription: {
    fontSize: 10,
    fontFamily: 'OpenSans',
    color: '#333333',
    marginBottom: 5,
  },
  languageItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  languageName: {
    fontSize: 10,
    color: '#333333',
    flex: 1,
  },
  languageLevel: {
    fontSize: 9,
    color: '#555555',
  },
  footer: {
    position: 'absolute',
    bottom: 20,
    left: 30,
    right: 30,
    fontSize: 8,
    color: '#888888',
    textAlign: 'center',
    borderTop: '1px solid #E0E0E0',
    paddingTop: 5,
  },
});

// Helper function to filter out N/A values
const filterNA = (value: string | undefined): string => (value && value !== 'N/A' ? value : '');

// Create Document Component
export default function Theme4({ userdata, userImage }: { userdata: Resume; userImage: any }) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header Section with Name and Contact Info */}
        <View style={styles.headerSection}>
          <View style={styles.headerImageContainer}>
            <Image
              style={styles.headerImage}
              src={userdata.image[0]}
            />
          </View>
          <View style={styles.headerInfo}>
            <Text style={styles.name}>{filterNA(userdata.personalInfo.fullName)}</Text>
            <Text style={styles.title}>{userdata.experience[0]?.title || "Professional"}</Text>
            <View style={styles.contactRow}>
              {filterNA(userdata.personalInfo.email) && (
                <View style={styles.contactItem}>
                  <Text style={styles.contactText}>{userdata.personalInfo.email}</Text>
                </View>
              )}
              {filterNA(userdata.personalInfo.phone) && (
                <View style={styles.contactItem}>
                  <Text style={styles.contactText}>{userdata.personalInfo.phone}</Text>
                </View>
              )}
              {filterNA(userdata.personalInfo.location) && (
                <View style={styles.contactItem}>
                  <Text style={styles.contactText}>{userdata.personalInfo.location}</Text>
                </View>
              )}
            </View>
            <View style={styles.contactRow}>
              {filterNA(userdata.personalInfo.linkedin) && (
                <View style={styles.contactItem}>
                  <Text style={styles.contactText}>{userdata.personalInfo.linkedin}</Text>
                </View>
              )}
              {filterNA(userdata.personalInfo.github) && (
                <View style={styles.contactItem}>
                  <Text style={styles.contactText}>{userdata.personalInfo.github}</Text>
                </View>
              )}
              {filterNA(userdata.personalInfo.website) && (
                <View style={styles.contactItem}>
                  <Text style={styles.contactText}>{userdata.personalInfo.website}</Text>
                </View>
              )}
            </View>
          </View>
        </View>
        
        {/* Accent Bar */}
        <View style={styles.accentBar} />
        
        {/* Main Content */}
        <View style={styles.content}>
          {/* Professional Summary */}
          {filterNA(userdata.professionalSummary) && (
            <View style={styles.section}>
              <View style={styles.sectionTitleContainer}>
                <Text style={styles.sectionTitleIcon}>P</Text>
                <Text style={styles.sectionTitle}>Profil</Text>
              </View>
              <View style={styles.divider} />
              <Text style={styles.summary}>{userdata.professionalSummary}</Text>
            </View>
          )}
          
          {/* Skills Section */}
          {(userdata.skills.technical.length > 0 || userdata.skills.soft.length > 0) && (
            <View style={styles.section}>
              <View style={styles.sectionTitleContainer}>
                <Text style={styles.sectionTitleIcon}>S</Text>
                <Text style={styles.sectionTitle}>Compétences</Text>
              </View>
              <View style={styles.divider} />
              
              {userdata.skills.technical.length > 0 && (
                <View>
                  <Text style={styles.skillCategory}>Compétences Techniques</Text>
                  <View style={styles.skillsContainer}>
                    {userdata.skills.technical.map((skill, index) => (
                      <Text key={index} style={styles.skillItem}>{skill}</Text>
                    ))}
                  </View>
                </View>
              )}
              
              {userdata.skills.soft.length > 0 && (
                <View>
                  <Text style={styles.skillCategory}>Soft Skills</Text>
                  <View style={styles.skillsContainer}>
                    {userdata.skills.soft.map((skill, index) => (
                      <Text key={index} style={styles.skillItem}>{skill}</Text>
                    ))}
                  </View>
                </View>
              )}
              
              {userdata.skills.languages.length > 0 && (
                <View>
                  <Text style={styles.skillCategory}>Langues</Text>
                  {userdata.skills.languages.map((language, index) => (
                    <View key={index} style={styles.languageItem}>
                      <Text style={styles.languageName}>{language}</Text>
                    </View>
                  ))}
                </View>
              )}
            </View>
          )}
          
          {/* Experience Section */}
          {userdata.experience.length > 0 && (
            <View style={styles.section}>
              <View style={styles.sectionTitleContainer}>
                <Text style={styles.sectionTitleIcon}>E</Text>
                <Text style={styles.sectionTitle}>Expérience Professionnelle</Text>
              </View>
              <View style={styles.divider} />
              
              {userdata.experience.map((exp, index) => (
                <View key={index} style={styles.experienceContainer}>
                  <View style={styles.experienceHeader}>
                    <View>
                      <Text style={styles.jobTitle}>{filterNA(exp.title)}</Text>
                      <Text style={styles.company}>{filterNA(exp.company)}, {filterNA(exp.location)}</Text>
                    </View>
                    <Text style={styles.dateLocation}>
                      {filterNA(exp.startDate)} - {filterNA(exp.endDate)}
                    </Text>
                  </View>
                  
                  {exp.responsibilities.length > 0 && (
                    <View style={styles.bulletList}>
                      {exp.responsibilities.map((responsibility, idx) => (
                        <Text key={idx} style={styles.bullet}>• {responsibility}</Text>
                      ))}
                    </View>
                  )}
                  
                  {exp.achievements && exp.achievements.length > 0 && (
                    <View>
                      {exp.achievements.map((achievement, idx) => (
                        <Text key={idx} style={styles.achievement}>★ {achievement}</Text>
                      ))}
                    </View>
                  )}
                  
                  {exp.technologies && exp.technologies.length > 0 && (
                    <View style={styles.technologies}>
                      {exp.technologies.map((tech, idx) => (
                        <Text key={idx} style={styles.technologyTag}>{tech}</Text>
                      ))}
                    </View>
                  )}
                </View>
              ))}
            </View>
          )}
          
          {/* Two-Column Layout for Education and Certifications */}
          <View style={styles.columns}>
            {/* Education Column */}
            {userdata.education.length > 0 && (
              <View style={styles.column}>
                <View style={styles.sectionTitleContainer}>
                  <Text style={styles.sectionTitleIcon}>F</Text>
                  <Text style={styles.sectionTitle}>Formation</Text>
                </View>
                <View style={styles.divider} />
                
                {userdata.education.map((edu, index) => (
                  <View key={index} style={styles.educationItem}>
                    <Text style={styles.jobTitle}>{filterNA(edu.degree)}</Text>
                    <Text style={styles.company}>{filterNA(edu.institution)}</Text>
                    <Text style={styles.dateLocation}>
                      {filterNA(edu.location)} | {filterNA(edu.graduationYear)}
                      {edu.gpa ? ` | GPA: ${edu.gpa}` : ''}
                    </Text>
                    
                    {edu.relevantCourses && edu.relevantCourses.length > 0 && (
                      <View style={styles.courseList}>
                        {edu.relevantCourses.map((course, idx) => (
                          <Text key={idx} style={styles.courseItem}>• {course}</Text>
                        ))}
                      </View>
                    )}
                  </View>
                ))}
              </View>
            )}
            
            {/* Certifications Column */}
            {userdata.certifications.length > 0 && (
              <View style={styles.column}>
                <View style={styles.sectionTitleContainer}>
                  <Text style={styles.sectionTitleIcon}>C</Text>
                  <Text style={styles.sectionTitle}>Certifications</Text>
                </View>
                <View style={styles.divider} />
                
                {userdata.certifications.map((cert, index) => (
                  <View key={index} style={styles.certificationItem}>
                    <Text style={styles.certificationName}>{filterNA(cert.name)}</Text>
                    <Text style={styles.certificationDetails}>
                      {filterNA(cert.issuer)} | {filterNA(cert.year)}
                      {cert.expiryDate ? ` - ${cert.expiryDate}` : ''}
                    </Text>
                  </View>
                ))}
              </View>
            )}
          </View>
          
          {/* Projects Section */}
          {userdata.projects && userdata.projects.length > 0 && (
            <View style={styles.section}>
              <View style={styles.sectionTitleContainer}>
                <Text style={styles.sectionTitleIcon}>P</Text>
                <Text style={styles.sectionTitle}>Projets</Text>
              </View>
              <View style={styles.divider} />
              
              {userdata.projects.map((project, index) => (
                <View key={index} style={styles.projectItem}>
                  <View style={styles.projectHeader}>
                    <Text style={styles.projectTitle}>{project.title}</Text>
                    {project.startDate && project.endDate && (
                      <Text style={styles.projectDates}>
                        {project.startDate} - {project.endDate}
                      </Text>
                    )}
                  </View>
                  <Text style={styles.projectDescription}>{project.description}</Text>
                  <View style={styles.technologies}>
                    {project.technologies.map((tech, idx) => (
                      <Text key={idx} style={styles.technologyTag}>{tech}</Text>
                    ))}
                  </View>
                  {project.link && (
                    <Text style={styles.bullet}>• Lien: {project.link}</Text>
                  )}
                </View>
              ))}
            </View>
          )}
        </View>
        
        {/* Footer */}
        <Text style={styles.footer}>
          Mis à jour le {new Date().toLocaleDateString('fr-FR')} | Référence disponible sur demande
        </Text>
      </Page>
    </Document>
  );
}