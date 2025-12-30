"use client"

import React from 'react';
import { Document, Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer';
import { Resume } from '@/app/types/resume';

// Register modern, professional fonts
Font.register({
  family: 'Inter',
  fonts: [
    { src: 'https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hjp-Ek-_EeA.ttf', fontWeight: 'normal' },
    { src: 'https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuGKYAZ9hjp-Ek-_EeA.ttf', fontWeight: 'bold' },
    { src: 'https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuI6fAZ9hjp-Ek-_EeA.ttf', fontWeight: 'semibold' },
    { src: 'https://fonts.gstatic.com/s/inter/v12/UcC73FwrK3iLTeHuS_fvQtMwCp50KnMa1ZL7.ttf', fontStyle: 'italic' },
  ],
});

// Create a cohesive color palette
const colors = {
  primary: '#2D3748',     // Dark blue-gray for primary text
  secondary: '#4A5568',   // Medium gray for secondary text
  accent: '#3182CE',      // Blue accent color
  light: '#718096',       // Light gray for less important text
  ultraLight: '#EDF2F7',  // Very light gray for backgrounds
  divider: '#E2E8F0',     // Light gray for dividers
  white: '#FFFFFF',       // White
};

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: 'Inter',
    backgroundColor: colors.white,
    color: colors.primary,
  },
  header: {
    marginBottom: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.accent,
    marginBottom: 4,
    letterSpacing: 0.5,
  },
  title: {
    fontSize: 14,
    marginBottom: 6,
    color: colors.secondary,
    fontWeight: 'semibold',
  },
  contactInfo: {
    marginBottom: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    borderTop: `1px solid ${colors.divider}`,
    borderBottom: `1px solid ${colors.divider}`,
    paddingTop: 10,
    paddingBottom: 10,
  },
  contactItem: {
    fontSize: 9,
    color: colors.secondary,
    marginRight: 8,
    marginBottom: 4,
  },
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 8,
    color: colors.accent,
    borderBottom: `1px solid ${colors.divider}`,
    paddingBottom: 4,
  },
  summary: {
    fontSize: 10,
    lineHeight: 1.6,
    color: colors.secondary,
    marginBottom: 12,
    textAlign: 'justify',
  },
  experienceItem: {
    marginBottom: 14,
  },
  experienceHeader: {
    marginBottom: 4,
  },
  dateLocation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    fontSize: 9,
    color: colors.light,
    marginBottom: 6,
  },
  jobTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: colors.primary,
  },
  company: {
    fontSize: 11,
    marginBottom: 3,
    color: colors.secondary,
    fontWeight: 'semibold',
  },
  bulletList: {
    marginLeft: 8,
  },
  bulletPoint: {
    fontSize: 9.5,
    marginBottom: 4,
    color: colors.secondary,
    lineHeight: 1.5,
  },
  bulletIcon: {
    color: colors.accent,
    fontSize: 9,
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  skillsGroup: {
    marginBottom: 10,
  },
  skillCategory: {
    fontSize: 10,
    fontWeight: 'semibold',
    color: colors.primary,
    marginBottom: 4,
  },
  skillItem: {
    fontSize: 9.5,
    marginRight: 20,
    marginBottom: 5,
    color: colors.secondary,
    backgroundColor: colors.ultraLight,
    padding: '3 6',
    borderRadius: 4,
  },
  educationItem: {
    marginBottom: 12,
  },
  degreeTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    color: colors.primary,
  },
  institution: {
    fontSize: 10,
    color: colors.secondary,
    marginBottom: 2,
  },
  hobbiesText: {
    fontSize: 10,
    color: colors.secondary,
    lineHeight: 1.5,
  },
  projectItem: {
    marginBottom: 10,
  },
  projectTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 2,
  },
  projectDesc: {
    fontSize: 9.5,
    color: colors.secondary,
    lineHeight: 1.5,
    marginBottom: 3,
  },
  projectTech: {
    fontSize: 9,
    color: colors.light,
    fontStyle: 'italic',
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 40,
    right: 40,
    fontSize: 8,
    color: colors.light,
    textAlign: 'center',
    paddingTop: 4,
    borderTop: `0.5px solid ${colors.divider}`,
  },
  twoColumnSection: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  columnLeft: {
    width: '48%',
    marginRight: '4%',
  },
  columnRight: {
    width: '48%',
  },
});

// Helper function to filter out N/A values
const filterNA = (value: string | undefined): string => (value && value !== 'N/A' ? value : '');

// Helper function to format bullet points
const BulletPoint = ({ text }: { text: string }) => (
  <Text style={styles.bulletPoint}><Text style={styles.bulletIcon}>•</Text> {text}</Text>
);

export default function Theme9({ userdata, userImage }: { userdata: Resume; userImage: any }) {
  // Format date range for cleaner display
  const formatDateRange = (startDate: string, endDate: string) => {
    const start = filterNA(startDate);
    const end = filterNA(endDate);
    
    if (start && end) {
      return `${start} — ${end === 'Present' ? 'Present' : end}`;
    } else if (start) {
      return `${start} — Present`;
    }
    return '';
  };

  // Group skills by category for better organization
  const renderSkillsByCategory = (skills: string[], category: string) => {
    if (skills.length === 0) return null;
    
    return (
      <View style={styles.skillsGroup}>
        <Text style={styles.skillCategory}>{category}</Text>
        <View style={styles.skillsContainer}>
          {skills.map((skill, index) => (
            <Text key={index} style={styles.skillItem}>{skill}</Text>
          ))}
        </View>
      </View>
    );
  };

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header with name and title */}
        <View style={styles.header}>
          <Text style={styles.name}>{filterNA(userdata.personalInfo.fullName)}</Text>
          {userdata.experience[0]?.title && <Text style={styles.title}>{userdata.experience[0].title}</Text>}
        </View>

        {/* Contact Information */}
        <View style={styles.contactInfo}>
          {filterNA(userdata.personalInfo.location) && (
            <Text style={styles.contactItem}>📍 {userdata.personalInfo.location}</Text>
          )}
          {filterNA(userdata.personalInfo.phone) && (
            <Text style={styles.contactItem}>📱 {userdata.personalInfo.phone}</Text>
          )}
          {filterNA(userdata.personalInfo.email) && (
            <Text style={styles.contactItem}>✉️ {userdata.personalInfo.email}</Text>
          )}
          {filterNA(userdata.personalInfo.linkedin) && (
            <Text style={styles.contactItem}>🔗 {userdata.personalInfo.linkedin}</Text>
          )}
        </View>

        {/* Professional Summary */}
        {filterNA(userdata.professionalSummary) && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Professional Profile</Text>
            <Text style={styles.summary}>{userdata.professionalSummary}</Text>
          </View>
        )}

        {/* Split the content into two columns for better space utilization */}
        <View style={styles.twoColumnSection}>
          {/* Left Column: Experience and Education */}
          <View style={styles.columnLeft}>
            {/* Experience */}
            {userdata.experience.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Professional Experience</Text>
                {userdata.experience.map((exp, index) => (
                  <View key={index} style={styles.experienceItem}>
                    <View style={styles.experienceHeader}>
                      <Text style={styles.jobTitle}>{filterNA(exp.title)}</Text>
                      <Text style={styles.company}>{filterNA(exp.company)}</Text>
                      <View style={styles.dateLocation}>
                        <Text>{formatDateRange(exp.startDate, exp.endDate)}</Text>
                        <Text>{filterNA(exp.location)}</Text>
                      </View>
                    </View>
                    {exp.responsibilities.length > 0 && (
                      <View style={styles.bulletList}>
                        {exp.responsibilities.map((responsibility, idx) => (
                          <BulletPoint key={idx} text={responsibility} />
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
                <Text style={styles.sectionTitle}>Education</Text>
                {userdata.education.map((edu, index) => (
                  <View key={index} style={styles.educationItem}>
                    <Text style={styles.degreeTitle}>{filterNA(edu.degree)}</Text>
                    <Text style={styles.institution}>{filterNA(edu.institution)}, {filterNA(edu.location)}</Text>
                    <Text style={styles.institution}>{filterNA(edu.graduationYear)}</Text>
                    {edu.relevantCourses && edu.relevantCourses.length > 0 && (
                      <View style={styles.bulletList}>
                        {edu.relevantCourses.map((course, idx) => (
                          <BulletPoint key={idx} text={course} />
                        ))}
                      </View>
                    )}
                  </View>
                ))}
              </View>
            )}
          </View>

          {/* Right Column: Skills, Certifications, Projects, Languages, Hobbies */}
          <View style={styles.columnRight}>
            {/* Skills Section with categories */}
            {(userdata.skills.technical.length > 0 || userdata.skills.soft.length > 0) && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Skills</Text>
                {renderSkillsByCategory(userdata.skills.technical, 'Technical')}
                {renderSkillsByCategory(userdata.skills.soft, 'Soft Skills')}
              </View>
            )}
            
            {/* Languages */}
            {userdata.skills.languages.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Languages</Text>
                <View style={styles.skillsContainer}>
                  {userdata.skills.languages.map((language, index) => (
                    <Text key={index} style={styles.skillItem}>{language}</Text>
                  ))}
                </View>
              </View>
            )}

            {/* Certifications */}
            {userdata.certifications && userdata.certifications.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Certifications</Text>
                {userdata.certifications.map((cert, index) => (
                  <View key={index} style={styles.educationItem}>
                    <Text style={styles.degreeTitle}>{filterNA(cert.name)}</Text>
                    <Text style={styles.institution}>
                      {filterNA(cert.issuer)}, {filterNA(cert.year)}
                      {cert.expiryDate ? ` — ${cert.expiryDate}` : ''}
                    </Text>
                  </View>
                ))}
              </View>
            )}

            {/* Projects */}
            {userdata.projects && userdata.projects.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Projects</Text>
                {userdata.projects.map((project, index) => (
                  <View key={index} style={styles.projectItem}>
                    <Text style={styles.projectTitle}>{project.title}</Text>
                    <Text style={styles.projectDesc}>{project.description}</Text>
                    <Text style={styles.projectTech}>Technologies: {project.technologies.join(', ')}</Text>
                    {project.link && <Text style={styles.institution}>Link: {project.link}</Text>}
                  </View>
                ))}
              </View>
            )}
            
            {/* Hobbies */}
            {userdata.hobbies.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Interests</Text>
                <Text style={styles.hobbiesText}>
                  {userdata.hobbies.join(' • ')}
                </Text>
              </View>
            )}
          </View>
        </View>

        {/* Footer with last updated date */}
        <View style={styles.footer}>
          <Text>Last updated: {new Date().toLocaleDateString('en-CA', { year: 'numeric', month: 'long', day: 'numeric' })}</Text>
        </View>
      </Page>
    </Document>
  );
}