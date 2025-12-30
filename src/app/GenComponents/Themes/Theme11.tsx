"use client"

import React from 'react';
import { Document, Page, Text, View, StyleSheet, Font, Image } from '@react-pdf/renderer';

// Register custom fonts
Font.register({
  family: 'Open Sans',
  fonts: [
    { src: 'https://fonts.gstatic.com/s/opensans/v28/memSYaGs126MiZpBA-UvWbX2vVnXBbObj2OVZyOOSr4dVJWUgsjZ0B4gaVc.ttf', fontWeight: 'normal' },
    { src: 'https://fonts.gstatic.com/s/opensans/v28/memSYaGs126MiZpBA-UvWbX2vVnXBbObj2OVZyOOSr4dVJWUgsg-1x4gaVc.ttf', fontWeight: 'bold' },
    { src: 'https://fonts.gstatic.com/s/opensans/v28/memSYaGs126MiZpBA-UvWbX2vVnXBbObj2OVZyOOSr4dVJWUgsgH1x4gaVc.ttf', fontWeight: 'semibold' },
    { src: 'https://fonts.gstatic.com/s/opensans/v28/memSYaGs126MiZpBA-UvWbX2vVnXBbObj2OVZyOOSr4dVJWUgsin9M4gaVc.ttf', fontStyle: 'italic' },
  ],
});

// Define colors for consistent theming
const colors = {
  primary: '#2D3748',
  primaryLight: '#4A5568',
  secondary: '#4299E1',
  background: '#FFFFFF',
  sidebarBg: '#F7FAFC',
  text: '#2D3E50',
  textLight: '#718096',
  accent: '#38B2AC',
  border: '#E2E8F0',
  timelineDot: '#3182CE',
  timelineLine: '#CBD5E0'
};

const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: colors.background,
    fontFamily: 'Open Sans',
  },
  sidebar: {
    width: '30%',
    backgroundColor: colors.sidebarBg,
    padding: 15,
    borderRight: `1px solid ${colors.border}`,
    paddingTop: "140px"
  },
  mainContent: {
    width: '70%',
    paddingLeft:-15,
   
    backgroundColor: colors.background,
  },
  contentPadding: {
    paddingLeft: 15,
    marginLeft :5,
    marginTop: -10,
    padding: 5
  },
  header: {
    backgroundColor: colors.primary,
    padding: 20,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    width: "152%",
    marginLeft: "-43%"
  },
  textContainer: {
    marginLeft: 35,
    justifyContent: 'center',
  },
  profileImageContainer: {
    width: 80,
    height: 80,
    borderRadius: 60,
    backgroundColor: colors.background,
    overflow: 'hidden',
    borderWidth: 4,
    borderColor: colors.background,
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  },
  profileImage: {
    width: '100%',
    height: '100%',
    borderRadius: 60,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.background,
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 3,
  },
  title: {
    fontSize: 12,
    color: colors.background,
    textAlign: 'center',
    letterSpacing: 0.5,
    opacity: 0.9,
  },
  contactHeading: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 10,
    color: colors.primary,
    borderBottomWidth: 2,
    borderBottomColor: colors.accent,
    paddingBottom: 3,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  contactIcon: {
    width: 14,
    height: 14,
    marginRight: 6,
    color: colors.accent,
  },
  contactText: {
    fontSize: 11, // Increased from 9
    color: colors.text,
  },
  sidebarSection: {
    marginBottom: 15,
  },
  skillsList: {
    marginLeft: 5,
  },
  skillItem: {
    fontSize: 11, // Increased from 9
    marginBottom: 5,
    display: 'flex',
    flexDirection: 'row',
  },
  bullet: {
    marginRight: 5,
    color: colors.accent,
  },
  skillLevel: {
    flexDirection: 'row',
    marginTop: 2,
  },
  skillLevelDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.accent,
    marginRight: 2,
  },
  skillLevelDotEmpty: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.border,
    marginRight: 2,
  },
  sectionHeading: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 15,
    color: colors.primary,
    textTransform: 'uppercase',
    borderBottomWidth: 2,
    borderBottomColor: colors.accent,
    paddingBottom: 5,
    letterSpacing: 1,
  },
  mainSection: {
    marginBottom: 15,
  },
  timelineContainer: {
    position: 'relative',
    marginLeft: 15,
  },
  timelineItem: {
    marginBottom: 15,
    paddingLeft: 20,
    position: 'relative',
  },
  timelineDot: {
    position: 'absolute',
    left: 0,
    top: 5,
    width: 10,
    height: 10,
    backgroundColor: colors.timelineDot,
    borderRadius: 5,
  },
  timelineLine: {
    position: 'absolute',
    left: 5,
    top: 15,
    width: 2,
    bottom: -15,
    backgroundColor: colors.timelineLine,
  },
  jobTitle: {
    fontSize: 11, // Increased from 10
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 2,
  },
  jobCompany: {
    fontSize: 10, // Increased from 8
    marginBottom: 4,
    color: colors.textLight,
  },
  jobPeriod: {
    fontSize: 9, // Increased from 7
    color: colors.textLight,
    position: 'absolute',
    right: 0,
    top: 4,
    backgroundColor: colors.sidebarBg,
    padding: '2 4',
    borderRadius: 3,
  },
  bulletList: {
    marginTop: 6,
  },
  bulletPoint: {
    fontSize: 9, // Increased from 7
    marginBottom: 3,
    lineHeight: 1.4,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  bulletPointText: {
    flex: 1,
    paddingRight: 5,
    fontSize: 10, // Increased from 8
  },
  educationItem: {
    marginBottom: 15,
  },
  degree: {
    fontSize: 11, // Increased from 10
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 2,
    width: 270
  },
  university: {
    fontSize: 10, // Increased from 8
    marginBottom: 3,
    color: colors.textLight,
  },
  profileText: {
    fontSize: 10, // Increased from 8
    lineHeight: 1.5,
    textAlign: 'justify',
    marginBottom: 8,
    color: colors.text,
  },
  reference: {
    marginBottom: 10,
    padding: 6,
    backgroundColor: colors.background,
    borderRadius: 4,
    borderLeftWidth: 3,
    borderLeftColor: colors.accent,
  },
  referenceName: {
    fontSize: 10, // Increased from 8
    fontWeight: 'bold',
    color: colors.primary,
  },
  referenceTitle: {
    fontSize: 9, // Increased from 7
    marginBottom: 4,
    color: colors.textLight,
    fontStyle: 'italic',
  },
  referenceContact: {
    fontSize: 8, // Increased from 6
    color: colors.text,
  },
  languageItem: {
    fontSize: 9, // Increased from 7
    marginBottom: 5,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  languageName: {
    flex: 1,
    color: colors.text,
  },
  languageLevel: {
    color: colors.textLight,
    fontStyle: 'italic',
    fontSize: 8, // Increased from 6
  },
  projectTitle: {
    fontSize: 11, // Increased from 10
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 2,
  },
  projectDescription: {
    fontSize: 10, // Increased from 7
    color: colors.text,
    marginBottom: 4,
    lineHeight: 1.4,
  },
  projectTechTag: {
    fontSize: 7, // Increased from 5
    backgroundColor: colors.accent,
    color: colors.background,
    padding: '2 4',
    borderRadius: 3,
    marginRight: 3,
    marginBottom: 3,
  },
  projectTechContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 4,
  },
  certificationContainer: {
    marginBottom: 6,
  },
});

// Helper function to filter out N/A values
const filterNA = (value) => (value && value !== 'N/A' ? value : '');

// Helper to safely concatenate arrays that might be undefined
const safeConcat = (arr1, arr2) => {
  const safeArr1 = Array.isArray(arr1) ? arr1 : [];
  const safeArr2 = Array.isArray(arr2) ? arr2 : [];
  return safeArr1.concat(safeArr2);
};

export default function ModernTimelineResume({ userdata, userImage }) {
  // Ensure userdata structure is complete to prevent errors
  const safeUserData = {
    personalInfo: {
      fullName: userdata?.personalInfo?.fullName || '',
      title: userdata?.personalInfo?.title || '',
      phone: userdata?.personalInfo?.phone || '',
      email: userdata?.personalInfo?.email || '',
      location: userdata?.personalInfo?.location || '',
      website: userdata?.personalInfo?.website || ''
    },
    professionalSummary: userdata?.professionalSummary || '',
    skills: {
      technical: userdata?.skills?.technical || [],
      soft: userdata?.skills?.soft || [],
      languages: userdata?.skills?.languages || []
    },
    experience: userdata?.experience || [],
    education: userdata?.education || [],
    projects: userdata?.projects || [],
    certifications: userdata?.certifications || [],
    references: userdata?.references || []
  };

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Left Sidebar */}
        <View style={styles.sidebar}>
          {/* Contact Information */}
          <View style={styles.sidebarSection}>
            <Text style={styles.contactHeading}>Contact</Text>
            
            {filterNA(safeUserData.personalInfo.phone) && (
              <View style={styles.contactItem}>
                <Text style={styles.contactText}>
                  {safeUserData.personalInfo.phone}
                </Text>
              </View>
            )}
            
            {filterNA(safeUserData.personalInfo.email) && (
              <View style={styles.contactItem}>
                <Text style={styles.contactText}>
                  {safeUserData.personalInfo.email}
                </Text>
              </View>
            )}
            
            {filterNA(safeUserData.personalInfo.location) && (
              <View style={styles.contactItem}>
                <Text style={styles.contactText}>
                  {safeUserData.personalInfo.location}
                </Text>
              </View>
            )}
            
            {filterNA(safeUserData.personalInfo.website) && (
              <View style={styles.contactItem}>
                <Text style={styles.contactText}>
                  {safeUserData.personalInfo.website}
                </Text>
              </View>
            )}
          </View>

          {/* Skills Section */}
          {(safeUserData.skills.technical.length > 0 || safeUserData.skills.soft.length > 0) && (
            <View style={styles.sidebarSection}>
              <Text style={styles.contactHeading}>Skills</Text>
              <View style={styles.skillsList}>
                {safeConcat(safeUserData.skills.technical, safeUserData.skills.soft).map((skill, index) => (
                  <View key={index} style={styles.skillItem}>
                    <Text style={styles.bullet}>•</Text>
                    <Text style={styles.contactText}>{skill}</Text>
                  </View>
                ))}
              </View>
            </View>
          )}

          {/* Languages Section */}
          {safeUserData.skills.languages.length > 0 && (
            <View style={styles.sidebarSection}>
              <Text style={styles.contactHeading}>Languages</Text>
              <View style={styles.skillsList}>
                {safeUserData.skills.languages.map((language, index) => (
                  <View key={index} style={styles.languageItem}>
                    <Text style={styles.bullet}>•</Text>
                    <Text style={styles.contactText}>{language}</Text>
                  </View>
                ))}
              </View>
            </View>
          )}
          {safeUserData.skills.soft.length > 0 && (
            <View style={styles.sidebarSection}>
              <Text style={styles.contactHeading}>soft</Text>
              <View style={styles.skillsList}>
                {safeUserData.skills.soft.map((skill, index) => (
                  <View key={index} style={styles.languageItem}>
                    <Text style={styles.bullet}>•</Text>
                    <Text style={styles.contactText}>{skill}</Text>
                  </View>
                ))}
              </View>
            </View>
          )}

          {/* References Section */}
          {safeUserData.references.length > 0 && (
            <View style={styles.sidebarSection}>
              <Text style={styles.contactHeading}>References</Text>
              {safeUserData.references.map((ref, index) => (
                <View key={index} style={styles.reference}>
                  <Text style={styles.referenceName}>{ref.name || ''}</Text>
                  <Text style={styles.referenceTitle}>{ref.title || ''}</Text>
                  {ref.phone && <Text style={styles.referenceContact}>{ref.phone}</Text>}
                  {ref.email && <Text style={styles.referenceContact}>{ref.email}</Text>}
                </View>
              ))}
            </View>
          )}
        </View>

        {/* Main Content */}
        <View style={styles.mainContent}>
          {/* Name and Title Header */}
          <View style={styles.header}>
            <View style={styles.profileImageContainer}>
              {userImage && <Image style={styles.profileImage} src={userImage} />}
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.name}>
                {filterNA(safeUserData.personalInfo.fullName)}
              </Text>
              <Text style={styles.title}>
                {filterNA(safeUserData.personalInfo.title)}
              </Text>
            </View>
          </View>

          {/* Main Content Sections */}
          <View style={styles.contentPadding}>
            {/* Profile Section */}
            {filterNA(safeUserData.professionalSummary) && (
              <View style={styles.mainSection}>
                <Text style={styles.sectionHeading}>Profile</Text>
                <Text style={styles.profileText}>{safeUserData.professionalSummary}</Text>
              </View>
            )}

            {/* Work Experience */}
            {safeUserData.experience.length > 0 && (
              <View style={styles.mainSection}>
                <Text style={styles.sectionHeading}>Work Experience</Text>
                <View style={styles.timelineContainer}>
                  {safeUserData.experience.map((exp, index) => (
                    <View key={index} style={styles.timelineItem}>
                      <View style={styles.timelineDot} />
                      {index !== safeUserData.experience.length - 1 && <View style={styles.timelineLine} />}
                      <Text style={styles.jobTitle}>{filterNA(exp.title)}</Text>
                      <Text style={styles.jobCompany}>
                        {filterNA(exp.company)}
                        {exp.position ? ` | ${exp.position}` : ''}
                      </Text>
                      <Text style={styles.jobPeriod}>
                        {filterNA(exp.startDate)} - {filterNA(exp.endDate || 'Present')}
                      </Text>
                      
                      <View style={styles.bulletList}>
                        {Array.isArray(exp.responsibilities) && exp.responsibilities.map((responsibility, idx) => (
                          <View key={idx} style={styles.bulletPoint}>
                            <Text style={styles.bullet}>•</Text>
                            <Text style={styles.bulletPointText}>{responsibility}</Text>
                          </View>
                        ))}
                        {Array.isArray(exp.achievements) && exp.achievements.map((achievement, idx) => (
                          <View key={`ach-${idx}`} style={styles.bulletPoint}>
                            <Text style={styles.bullet}>•</Text>
                            <Text style={styles.bulletPointText}>{achievement}</Text>
                          </View>
                        ))}
                      </View>
                    </View>
                  ))}
                </View>
              </View>
            )}

            {/* Education */}
            {safeUserData.education.length > 0 && (
              <View style={styles.mainSection}>
                <Text style={styles.sectionHeading}>Education</Text>
                <View style={styles.timelineContainer}>
                  {safeUserData.education.map((edu, index) => (
                    <View key={index} style={styles.timelineItem}>
                      <View style={styles.timelineDot} />
                      {index !== safeUserData.education.length - 1 && <View style={styles.timelineLine} />}
                      <Text style={styles.degree}>{filterNA(edu.degree)}</Text>
                      <Text style={styles.university}>
                        {edu.fieldOfStudy ? `${edu.fieldOfStudy} | ` : ''}
                        {filterNA(edu.institution)}
                      </Text>
                      <Text style={styles.jobPeriod}>
                        {filterNA(edu.startDate || edu.graduationYear)} - {filterNA(edu.endDate || 'Present')}
                      </Text>
                      {edu.gpa && <Text style={styles.contactText}>GPA: {edu.gpa}</Text>}
                      
                      {Array.isArray(edu.relevantCourses) && edu.relevantCourses.length > 0 && (
                        <View style={styles.bulletList}>
                          {edu.relevantCourses.map((course, idx) => (
                            <View key={idx} style={styles.bulletPoint}>
                              <Text style={styles.bullet}>•</Text>
                              <Text style={styles.bulletPointText}>{course}</Text>
                            </View>
                          ))}
                        </View>
                      )}
                    </View>
                  ))}
                </View>
              </View>
            )}

            {/* Projects */}
            {safeUserData.projects.length > 0 && (
              <View style={styles.mainSection}>
                <Text style={styles.sectionHeading}>Projects</Text>
                <View style={styles.timelineContainer}>
                  {safeUserData.projects.map((project, index) => (
                    <View key={index} style={styles.timelineItem}>
                      <View style={styles.timelineDot} />
                      {index !== safeUserData.projects.length - 1 && <View style={styles.timelineLine} />}
                      <Text style={styles.projectTitle}>{project.title || ''}</Text>
                      <Text style={styles.projectDescription}>{project.description || ''}</Text>
                      
                      {Array.isArray(project.technologies) && project.technologies.length > 0 && (
                        <View style={styles.projectTechContainer}>
                          {project.technologies.map((tech, techIdx) => (
                            <Text key={techIdx} style={styles.projectTechTag}>{tech}</Text>
                          ))}
                        </View>
                      )}
                      
                      {project.link && (
                        <View style={styles.bulletPoint}>
                          <Text style={styles.bullet}>•</Text>
                          <Text style={styles.bulletPointText}>Link: {project.link}</Text>
                        </View>
                      )}
                    </View>
                  ))}
                </View>
              </View>
            )}

            {/* Certifications */}
            {safeUserData.certifications.length > 0 && (
              <View style={styles.mainSection}>
                <Text style={styles.sectionHeading}>Certifications</Text>
                <View style={styles.timelineContainer}>
                  {safeUserData.certifications.map((cert, index) => (
                    <View key={index} style={styles.timelineItem}>
                      <View style={styles.timelineDot} />
                      {index !== safeUserData.certifications.length - 1 && <View style={styles.timelineLine} />}
                      <Text style={styles.jobTitle}>{filterNA(cert.name)}</Text>
                      <Text style={styles.contactText}>
                        {filterNA(cert.issuer)}
                        {cert.year ? `, ${cert.year}` : ''}
                        {cert.expiryDate ? ` (Valid until ${cert.expiryDate})` : ''}
                      </Text>
                    </View>
                  ))}
                </View>
              </View>
            )}
          </View>
        </View>
      </Page>
    </Document>
  );
}