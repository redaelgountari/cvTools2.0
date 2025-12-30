"use client"

import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image, Font } from '@react-pdf/renderer';
import { Resume } from '@/app/types/resume';

// Font configuration
Font.register({
  family: 'Inter',
  fonts: [
    { src: 'https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfMZg.ttf', fontWeight: 400 },
    { src: 'https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuFuYMZg.ttf', fontWeight: 600 },
    { src: 'https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuDyYMZg.ttf', fontWeight: 700 },
  ],
});

// Color palette
const COLORS = {
  primary: '#2563EB',  // Blue-600
  dark: '#1E293B',     // Slate-800
  medium: '#64748B',   // Slate-500
  light: '#E2E8F0',    // Slate-200
  background: '#F8FAFC' // Slate-50
};

// Create styles
const styles = StyleSheet.create({
  page: {
    padding: 0,
    fontFamily: 'Inter',
    backgroundColor: '#FFFFFF',
  },
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  sidebar: {
    width: '35%',
    padding: 30,
    backgroundColor: COLORS.dark,
    color: 'white',
  },
  mainContent: {
    width: '65%',
    padding: 30,
  },
  header: {
    marginBottom: 30,
    alignItems: 'center',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 15,
    borderWidth: 3,
    borderColor: 'white',
  },
  name: {
    fontSize: 20,
    fontWeight: 700,
    marginBottom: 5,
    color: 'white',
    textAlign: 'center',
  },
  title: {
    fontSize: 14,
    fontWeight: 600,
    color: COLORS.light,
    textAlign: 'center',
    opacity: 0.9,
  },
  section: {
    marginBottom: 20,
  },
  sidebarSection: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 700,
    marginBottom: 10,
    color: COLORS.dark,
    borderBottomWidth: 2,
    borderBottomColor: COLORS.primary,
    paddingBottom: 5,
  },
  sidebarTitle: {
    fontSize: 14,
    fontWeight: 700,
    marginBottom: 10,
    color: 'white',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.medium,
    paddingBottom: 5,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  contactIcon: {
    width: 12,
    height: 12,
    marginRight: 8,
    color: COLORS.primary,
  },
  contactText: {
    fontSize: 10,
    color: COLORS.light,
  },
  skillCategory: {
    fontSize: 12,
    fontWeight: 600,
    marginBottom: 5,
    color: COLORS.light,
  },
  skillItem: {
    fontSize: 10,
    marginBottom: 5,
    color: COLORS.light,
  },
  bulletList: {
    marginLeft: 5,
  },
  bulletItem: {
    fontSize: 10,
    marginBottom: 4,
    color: COLORS.light,
    position: 'relative',
    paddingLeft: 12,
  },
  experienceItem: {
    marginBottom: 15,
  },
  experienceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  jobTitle: {
    fontSize: 14,
    fontWeight: 700,
    color: COLORS.dark,
  },
  jobPeriod: {
    fontSize: 10,
    fontWeight: 600,
    color: COLORS.primary,
  },
  company: {
    fontSize: 12,
    fontWeight: 600,
    color: COLORS.medium,
    marginBottom: 8,
  },
  jobDescription: {
    fontSize: 10,
    lineHeight: 1.4,
    color: COLORS.dark,
    marginBottom: 5,
  },
  educationItem: {
    marginBottom: 12,
  },
  degree: {
    fontSize: 12,
    fontWeight: 700,
    color: COLORS.dark,
    marginBottom: 3,
  },
  institution: {
    fontSize: 11,
    color: COLORS.medium,
    marginBottom: 3,
  },
  projectItem: {
    marginBottom: 12,
  },
  projectTitle: {
    fontSize: 12,
    fontWeight: 700,
    color: COLORS.dark,
    marginBottom: 3,
  },
  projectDescription: {
    fontSize: 10,
    color: COLORS.dark,
    marginBottom: 5,
    lineHeight: 1.4,
  },
  tagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 5,
  },
  tag: {
    fontSize: 8,
    backgroundColor: COLORS.background,
    color: COLORS.medium,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 10,
    marginRight: 5,
    marginBottom: 5,
  },
});

interface Theme1Props {
  userdata: Resume;
  userImage: string;
}

const filterEmpty = (value?: string): string => (value && value !== 'N/A' ? value : '');

const Theme1: React.FC<Theme1Props> = ({ userdata, userImage }) => {
  const renderContactInfo = () => (
    <View style={styles.sidebarSection}>
      <Text style={styles.sidebarTitle}>Contact</Text>
      {filterEmpty(userdata.personalInfo.location) && (
        <View style={styles.contactItem}>
          <Text style={styles.contactText}>{userdata.personalInfo.location}</Text>
        </View>
      )}
      {filterEmpty(userdata.personalInfo.phone) && (
        <View style={styles.contactItem}>
          <Text style={styles.contactText}>{userdata.personalInfo.phone}</Text>
        </View>
      )}
      {filterEmpty(userdata.personalInfo.email) && (
        <View style={styles.contactItem}>
          <Text style={styles.contactText}>{userdata.personalInfo.email}</Text>
        </View>
      )}
      {filterEmpty(userdata.personalInfo.linkedin) && (
        <View style={styles.contactItem}>
          <Text style={styles.contactText}>{userdata.personalInfo.linkedin}</Text>
        </View>
      )}
      {filterEmpty(userdata.personalInfo.website) && (
        <View style={styles.contactItem}>
          <Text style={styles.contactText}>{userdata.personalInfo.website}</Text>
        </View>
      )}
    </View>
  );

  const renderSkills = () => (
    <View style={styles.sidebarSection}>
      <Text style={styles.sidebarTitle}>Skills</Text>
      
      {userdata.skills?.technical?.length > 0 && (
        <View>
          <Text style={styles.skillCategory}>Technical</Text>
          <View style={styles.bulletList}>
            {userdata.skills.technical.map((skill, index) => (
              <Text key={index} style={styles.bulletItem}>• {skill}</Text>
            ))}
          </View>
        </View>
      )}
      
      {userdata.skills?.soft?.length > 0 && (
        <View style={{ marginTop: 10 }}>
          <Text style={styles.skillCategory}>Soft Skills</Text>
          <View style={styles.bulletList}>
            {userdata.skills.soft.map((skill, index) => (
              <Text key={index} style={styles.bulletItem}>• {skill}</Text>
            ))}
          </View>
        </View>
      )}
    </View>
  );

  const renderLanguages = () => (
    <View style={styles.sidebarSection}>
      <Text style={styles.sidebarTitle}>Languages</Text>
      <View style={styles.bulletList}>
        {userdata.skills?.languages?.map((language, index) => (
          <Text key={index} style={styles.bulletItem}>• {language}</Text>
        ))}
      </View>
    </View>
  );

  const renderExperience = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Professional Experience</Text>
      {userdata.experience?.map((exp, index) => (
        <View key={index} style={styles.experienceItem}>
          <View style={styles.experienceHeader}>
            <Text style={styles.jobTitle}>{filterEmpty(exp.title)}</Text>
            <Text style={styles.jobPeriod}>
              {filterEmpty(exp.startDate)} - {filterEmpty(exp.endDate)}
            </Text>
          </View>
          <Text style={styles.company}>
            {filterEmpty(exp.company)} • {filterEmpty(exp.location)}
          </Text>
          <View style={styles.bulletList}>
            {exp.responsibilities.map((responsibility, idx) => (
              <Text key={idx} style={styles.jobDescription}>• {responsibility}</Text>
            ))}
          </View>
        </View>
      ))}
    </View>
  );

  const renderEducation = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Education</Text>
      {userdata.education?.map((edu, index) => (
        <View key={index} style={styles.educationItem}>
          <Text style={styles.degree}>{filterEmpty(edu.degree)}</Text>
          <Text style={styles.institution}>
            {filterEmpty(edu.institution)} • {filterEmpty(edu.location)}
          </Text>
          <Text style={styles.jobPeriod}>{filterEmpty(edu.graduationYear)}</Text>
          {edu.gpa && <Text style={styles.jobDescription}>GPA: {edu.gpa}</Text>}
        </View>
      ))}
    </View>
  );

  const renderProjects = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Projects</Text>
      {userdata.projects?.map((project, index) => (
        <View key={index} style={styles.projectItem}>
          <Text style={styles.projectTitle}>{project.title}</Text>
          <Text style={styles.projectDescription}>{project.description}</Text>
          <View style={styles.tagContainer}>
            {project.technologies.map((tech, idx) => (
              <Text key={idx} style={styles.tag}>{tech}</Text>
            ))}
          </View>
        </View>
      ))}
    </View>
  );

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.container}>
          {/* Sidebar */}
          <View style={styles.sidebar}>
            <View style={styles.header}>
              <Image style={styles.avatar} src={userImage} />
              <Text style={styles.name}>{filterEmpty(userdata.personalInfo.fullName)}</Text>
              {userdata.experience[0]?.title && (
                <Text style={styles.title}>{userdata.experience[0].title}</Text>
              )}
            </View>

            {renderContactInfo()}
            {renderSkills()}
            {userdata.skills.languages.length > 0 && renderLanguages()}
          </View>

          {/* Main Content */}
          <View style={styles.mainContent}>
            {filterEmpty(userdata.professionalSummary) && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Professional Profile</Text>
                <Text style={styles.jobDescription}>{userdata.professionalSummary}</Text>
              </View>
            )}

            {userdata.experience.length > 0 && renderExperience()}
            {userdata.education.length > 0 && renderEducation()}
            {userdata.projects?.length > 0 && renderProjects()}
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default Theme1;