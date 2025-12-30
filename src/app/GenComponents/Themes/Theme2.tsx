"use client"

import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image, Font } from '@react-pdf/renderer';
import { Resume } from '@/app/types/resume';

// Register custom fonts for a more professional look
Font.register({
  family: 'Montserrat',
  fonts: [
    { src: 'https://fonts.gstatic.com/s/montserrat/v15/JTUSjIg1_i6t8kCHKm459Wlhzg.ttf', fontWeight: 'normal' },
    { src: 'https://fonts.gstatic.com/s/montserrat/v15/JTURjIg1_i6t8kCHKm45_bZF3gnD-w.ttf', fontWeight: 'bold' },
    { src: 'https://fonts.gstatic.com/s/montserrat/v15/JTURjIg1_i6t8kCHKm45_c5H3gnD-w.ttf', fontWeight: 'semibold' },
    { src: 'https://fonts.gstatic.com/s/montserrat/v15/JTUQjIg1_i6t8kCHKm459WxRxy7j.ttf', fontStyle: 'italic' },
  ],
});

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: 'Montserrat',
    backgroundColor: '#FFFFFF',
  },
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  leftColumn: {
    width: '30%',
    paddingRight: 15,
    backgroundColor: '#F5F7FA',
    padding: 15,
  },
  rightColumn: {
    width: '70%',
    paddingLeft: 15,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  imageContainer: {
    width: 100,
    height: 100,
    marginBottom: 10,
    borderRadius: 50,
    overflow: 'hidden',
    alignSelf: 'center',
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
  name: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#2D3748',
    textAlign: 'center',
  },
  title: {
    fontSize: 14,
    marginBottom: 10,
    color: '#4A5568',
    textAlign: 'center',
  },
  contactContainer: {
    marginBottom: 20,
  },
  contactItem: {
    flexDirection: 'row',
    marginBottom: 5,
    alignItems: 'center',
  },
  contactIcon: {
    width: 12,
    marginRight: 8,
  },
  contactText: {
    fontSize: 10,
    color: '#4A5568',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#2D3748',
    borderBottom: '1px solid #E2E8F0',
    paddingBottom: 4,
  },
  leftSectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#2D3748',
    borderBottom: '1px solid #E2E8F0',
    paddingBottom: 4,
  },
  skillCategory: {
    fontSize: 12,
    fontWeight: 'semibold',
    marginBottom: 5,
    marginTop: 8,
    color: '#4A5568',
  },
  skillItem: {
    fontSize: 10,
    marginBottom: 3,
    color: '#4A5568',
    padding: 3,
    backgroundColor: '#EDF2F7',
    borderRadius: 3,
    marginRight: 3,
  },
  skillRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 5,
  },
  bulletPoint: {
    fontSize: 10,
    marginLeft: 10,
    marginBottom: 3,
    color: '#4A5568',
  },
  experienceItem: {
    marginBottom: 12,
  },
  experienceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 3,
  },
  jobTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#2D3748',
  },
  jobPeriod: {
    fontSize: 10,
    fontStyle: 'italic',
    color: '#718096',
  },
  company: {
    fontSize: 11,
    marginBottom: 4,
    color: '#4A5568',
  },
  bulletList: {
    marginLeft: 10,
  },
  summary: {
    fontSize: 10,
    lineHeight: 1.5,
    color: '#4A5568',
    marginBottom: 10,
    textAlign: 'justify',
  },
  languageItem: {
    marginBottom: 5,
  },
  languageName: {
    fontSize: 10,
    color: '#4A5568',
  },
  achievementText: {
    fontSize: 10,
    fontStyle: 'italic',
    color: '#38A169',
    marginLeft: 10,
    marginBottom: 3,
  },
  certificationItem: {
    marginBottom: 5,
  },
  certificationName: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#2D3748',
  },
  certificationDetails: {
    fontSize: 10,
    color: '#4A5568',
  },
  projectItem: {
    marginBottom: 8,
  },
  projectTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#2D3748',
  },
  projectDescription: {
    fontSize: 10,
    marginTop: 2,
    marginBottom: 2,
    color: '#4A5568',
  },
  projectTech: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  projectTechItem: {
    fontSize: 9,
    color: '#4A5568',
    backgroundColor: '#EDF2F7',
    padding: 2,
    borderRadius: 3,
    marginRight: 3,
    marginBottom: 3,
  },
  projectLink: {
    fontSize: 9,
    color: '#3182CE',
    textDecoration: 'underline',
  },
});

// Helper function to filter out N/A values
const filterNA = (value: string | undefined): string => (value && value !== 'N/A' ? value : '');

// Create Document Component
export default function Theme2({ userdata, userImage }: { userdata: Resume; userImage: any }) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.container}>
          {/* Left Column - Personal Info, Skills, Languages */}
          <View style={styles.leftColumn}>
            {/* Header with profile image and name */}
            <View style={styles.header}>
              <View style={styles.imageContainer}>
                <Image
                  style={styles.profileImage}
                  src={userImage}
                />
              </View>
              <Text style={styles.name}>{filterNA(userdata.personalInfo.fullName)}</Text>
              {userdata.experience[0]?.title && <Text style={styles.title}>{userdata.experience[0].title}</Text>}
            </View>

            {/* Contact Information */}
            <View style={styles.contactContainer}>
              <Text style={styles.leftSectionTitle}>Contact</Text>
              {filterNA(userdata.personalInfo.location) && (
                <View style={styles.contactItem}>
                  <Text style={styles.contactText}>{userdata.personalInfo.location}</Text>
                </View>
              )}
              {filterNA(userdata.personalInfo.phone) && (
                <View style={styles.contactItem}>
                  <Text style={styles.contactText}>{userdata.personalInfo.phone}</Text>
                </View>
              )}
              {filterNA(userdata.personalInfo.email) && (
                <View style={styles.contactItem}>
                  <Text style={styles.contactText}>{userdata.personalInfo.email}</Text>
                </View>
              )}
              {filterNA(userdata.personalInfo.linkedin) && (
                <View style={styles.contactItem}>
                  <Text style={styles.contactText}>{userdata.personalInfo.linkedin}</Text>
                </View>
              )}
              {filterNA(userdata.personalInfo.website) && (
                <View style={styles.contactItem}>
                  <Text style={styles.contactText}>{userdata.personalInfo.website}</Text>
                </View>
              )}
            </View>

            {/* Skills Section */}
            {(userdata.skills.technical.length > 0 || userdata.skills.soft.length > 0) && (
              <View style={styles.section}>
                <Text style={styles.leftSectionTitle}>Compétences</Text>
                
                {userdata.skills.technical.length > 0 && (
                  <View>
                    <Text style={styles.skillCategory}>Techniques</Text>
                    <View style={styles.skillRow}>
                      {userdata.skills.technical.map((skill, index) => (
                        <Text key={index} style={styles.skillItem}>{skill}</Text>
                      ))}
                    </View>
                  </View>
                )}
                
                {userdata.skills.soft.length > 0 && (
                  <View>
                    
                    {userdata.skills.technical && <Text style={styles.skillCategory}>Soft Skills</Text>}
                    <View style={styles.skillRow}>
                      {userdata.skills.soft.map((skill, index) => (
                        <Text key={index} style={styles.skillItem}>{skill}</Text>
                      ))}
                    </View>
                  </View>
                )}
              </View>
            )}

            {/* Languages */}
            {userdata.skills.languages.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.leftSectionTitle}>Langues</Text>
                {userdata.skills.languages.map((language, index) => (
                  <View key={index} style={styles.languageItem}>
                    <Text style={styles.languageName}>• {language}</Text>
                  </View>
                ))}
              </View>
            )}
            
            {userdata.hobbies.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.leftSectionTitle}>hobbies</Text>
                {userdata.hobbies.map((hobbies, index) => (
                  <View key={index} style={styles.languageItem}>
                    <Text style={styles.languageName}>• {hobbies}</Text>
                  </View>
                ))}
              </View>
            )}

            {/* Certifications */}
            {userdata.certifications && userdata.certifications.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.leftSectionTitle}>Certifications</Text>
                {userdata.certifications.map((cert, index) => (
                  <View key={index} style={styles.certificationItem}>
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

          {/* Right Column - Summary, Experience, Education, Projects */}
          <View style={styles.rightColumn}>
            {/* Professional Summary */}
            {filterNA(userdata.professionalSummary) && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Profil Professionnel</Text>
                <Text style={styles.summary}>{userdata.professionalSummary}</Text>
              </View>
            )}

            {/* Experience */}
            {userdata.experience.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Expérience Professionnelle</Text>
                {userdata.experience.map((exp, index) => (
                  <View key={index} style={styles.experienceItem}>
                    <View style={styles.experienceHeader}>
                      <Text style={styles.jobTitle}>{filterNA(exp.title)}</Text>
                      <Text style={styles.jobPeriod}>{filterNA(exp.startDate)} - {filterNA(exp.endDate)}</Text>
                    </View>
                    <Text style={styles.company}>{filterNA(exp.company)}, {filterNA(exp.location)}</Text>
                    {exp.responsibilities.length > 0 && (
                      <View style={styles.bulletList}>
                        {exp.responsibilities.map((responsibility, idx) => (
                          <Text key={idx} style={styles.bulletPoint}>• {responsibility}</Text>
                        ))}
                      </View>
                    )}
                    {exp.achievements && exp.achievements.length > 0 && (
                      <View style={styles.bulletList}>
                        {exp.achievements.map((achievement, idx) => (
                          <Text key={idx} style={styles.achievementText}>✓ {achievement}</Text>
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
                <Text style={styles.sectionTitle}>Formation</Text>
                {userdata.education.map((edu, index) => (
                  <View key={index} style={styles.experienceItem}>
                    <View style={styles.experienceHeader}>
                      <Text style={styles.jobTitle}>{filterNA(edu.degree)}</Text>
                      <Text style={styles.jobPeriod}>{filterNA(edu.graduationYear)}</Text>
                    </View>
                    <Text style={styles.company}>{filterNA(edu.institution)}, {filterNA(edu.location)}</Text>
                    {edu.gpa && <Text style={styles.bulletPoint}>• GPA: {edu.gpa}</Text>}
                    {edu.relevantCourses && edu.relevantCourses.length > 0 && (
                      <View style={styles.bulletList}>
                        {edu.relevantCourses.map((course, idx) => (
                          <Text key={idx} style={styles.bulletPoint}>• {course}</Text>
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
                <Text style={styles.sectionTitle}>Projets</Text>
                {userdata.projects.map((project, index) => (
                  <View key={index} style={styles.projectItem}>
                    <Text style={styles.projectTitle}>{project.title}</Text>
                    <Text style={styles.projectDescription}>{project.description}</Text>
                    <View style={styles.projectTech}>
                      {project.technologies.map((tech, idx) => (
                        <Text key={idx} style={styles.projectTechItem}>{tech}</Text>
                      ))}
                    </View>
                    {project.link && <Text style={styles.projectLink}>{project.link}</Text>}
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
