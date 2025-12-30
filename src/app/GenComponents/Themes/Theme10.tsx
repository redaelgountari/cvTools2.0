"use client"

import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image ,Font } from '@react-pdf/renderer';
import { Resume } from '@/app/types/resume';

// Font configuration is kept the same as your original code
// Register fonts for PDF generation
Font.register({
  family: 'Inter',
  fonts: [
    { src: 'https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfMZg.ttf', fontWeight: 400 },
    { src: 'https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuFuYMZg.ttf', fontWeight: 600 },
    { src: 'https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuDyYMZg.ttf', fontWeight: 700 },
  ],
});
Font.register({
  family: 'Inter',
  fonts: [
    { src: 'https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfMZg.ttf', fontWeight: 400 },
    { src: 'https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuFuYMZg.ttf', fontWeight: 600 },
    { src: 'https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuDyYMZg.ttf', fontWeight: 700 },
  ],
});
// Color palette - adapted for the Sterling Cooper style
const COLORS = {
  primary: '#333333',    // Dark gray for main text
  dark: '#1E1E1E',       // Almost black for the sidebar background
  medium: '#777777',     // Medium gray for secondary text
  light: '#F2F2F2',      // Light gray for backgrounds
  accent: '#444444'      // Slightly lighter gray for accents
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
    width: '30%',
    padding: 30,
    backgroundColor: COLORS.dark,
    color: 'white',
  },
  mainContent: {
    width: '70%',
    padding: 30,
  },
  header: {
    marginBottom: 25,
    alignItems: 'center',
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 700,
    color: 'white',
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  title: {
    fontSize: 12,
    textTransform: 'uppercase',
    letterSpacing: 1,
    color: '#CCCCCC',
    textAlign: 'center',
    marginTop: 5,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 700,
    marginBottom: 15,
    color: COLORS.primary,
    textTransform: 'uppercase',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.accent,
    paddingBottom: 5,
    letterSpacing: 1,
  },
  sidebarTitle: {
    fontSize: 16,
    fontWeight: 700,
    marginBottom: 15,
    color: 'white',
    textTransform: 'uppercase',
    borderBottomWidth: 1,
    borderBottomColor: '#555555',
    paddingBottom: 5,
    letterSpacing: 1,
  },
  sidebarSection: {
    marginBottom: 30,
  },
  aboutMeText: {
    fontSize: 10,
    lineHeight: 1.5,
    color: '#CCCCCC',
    marginBottom: 20,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  contactIcon: {
    width: 16,
    height: 16,
    marginRight: 8,
  },
  contactText: {
    fontSize: 10,
    color: '#CCCCCC',
  },
  linksSection: {
    marginTop: 20,
  },
  linkItem: {
    fontSize: 10,
    color: '#CCCCCC',
    marginBottom: 5,
    textDecoration: 'underline',
  },
  referenceSection: {
    marginTop: 20,
  },
  referenceName: {
    fontSize: 12,
    fontWeight: 700,
    color: 'white',
    marginBottom: 5,
    textTransform: 'uppercase',
  },
  referenceDetails: {
    fontSize: 10,
    color: '#CCCCCC',
    marginBottom: 3,
  },
  hobbiesSection: {
    marginTop: 20,
  },
  hobbyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  bulletPoint: {
    fontSize: 10,
    marginRight: 5,
    color: '#CCCCCC',
  },
  hobbyText: {
    fontSize: 10,
    color: '#CCCCCC',
  },
  experienceItem: {
    marginBottom: 20,
    flexDirection: 'row',
  },
  timelineMarker: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: COLORS.primary,
    marginRight: 10,
    marginTop: 5,
  },
  experienceContent: {
    flex: 1,
  },
  companyName: {
    fontSize: 12,
    fontWeight: 700,
    color: COLORS.primary,
    marginBottom: 5,
    textTransform: 'uppercase',
  },
  jobTitle: {
    fontSize: 11,
    fontWeight: 600,
    color: COLORS.primary,
    marginBottom: 2,
  },
  jobLocation: {
    fontSize: 10,
    color: COLORS.medium,
    marginBottom: 5,
  },
  jobPeriod: {
    fontSize: 10,
    color: COLORS.medium,
    marginBottom: 8,
  },
  bulletList: {
    marginLeft: 10,
  },
  bulletItem: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  bulletPoint: {
    fontSize: 10,
    marginRight: 5,
    color: COLORS.primary,
  },
  bulletText: {
    fontSize: 10,
    color: COLORS.primary,
    flex: 1,
  },
  educationItem: {
    marginBottom: 15,
    flexDirection: 'row',
  },
  skillsSection: {
    marginBottom: 20,
  },
  skillCategory: {
    marginBottom: 10,
  },
  skillName: {
    fontSize: 10,
    color: COLORS.primary,
    textTransform: 'uppercase',
    marginBottom: 3,
  },
  skillBar: {
    height: 4,
    backgroundColor: '#EEEEEE',
    marginBottom: 8,
  },
  skillFill: {
    height: '100%',
    backgroundColor: COLORS.primary,
  },
  languagesSection: {
    marginBottom: 20,
  },
  languageItem: {
    marginBottom: 8,
  },
  languageName: {
    fontSize: 10,
    color: COLORS.primary,
    textTransform: 'uppercase',
    marginBottom: 3,
  },
});

interface SterlingCooperCVProps {
  userdata: Resume;
  userImage: string;
}

const filterEmpty = (value?: string): string => (value && value !== 'N/A' ? value : '');

const Theme10: React.FC<SterlingCooperCVProps> = ({ userdata, userImage }) => {
  // Function to render skill bar with level
  const renderSkillBar = (level: number) => {
    const percentage = Math.min(Math.max(level, 0), 100);
    return (
      <View style={styles.skillBar}>
        <View style={[styles.skillFill, { width: `${percentage}%` }]} />
      </View>
    );
  };

  // Helper function to get skills with predefined levels
  const getSkillsWithLevels = (skills: string[]) => {
    return skills.map(skill => {
      // This would normally come from data, but for the example we'll assign random levels
      const level = Math.floor(Math.random() * 40) + 60; // Random level between 60-100%
      return { name: skill, level };
    });
  };

  // Create skill objects with levels
  const technicalSkills = getSkillsWithLevels(userdata.skills.technical);
  const softSkills = getSkillsWithLevels(userdata.skills.soft);
  const languageSkills = getSkillsWithLevels(userdata.skills.languages);

  // Render the sidebar with personal info
  const renderSidebar = () => (
    <View style={styles.sidebar}>
      {/* Profile Photo */}
      <View style={styles.header}>
        <Image style={styles.avatar} src={userImage} />
        <Text style={styles.name}>{filterEmpty(userdata.personalInfo.fullName)}</Text>
        <Text style={styles.title}>{userdata.experience[0]?.title || "Professional"}</Text>
      </View>

      {/* About Me Section */}
      <View style={styles.sidebarSection}>
        <Text style={styles.sidebarTitle}>About Me</Text>
        <Text style={styles.aboutMeText}>{userdata.professionalSummary || "Experienced professional with a strong background in the industry."}</Text>
      </View>

      {/* Links Section */}
      <View style={styles.sidebarSection}>
        <Text style={styles.sidebarTitle}>Links</Text>
        {filterEmpty(userdata.personalInfo.linkedin) && (
          <View>
            <Text style={styles.linkItem}>LinkedIn: {userdata.personalInfo.linkedin}</Text>
          </View>
        )}
        {filterEmpty(userdata.personalInfo.website) && (
          <View>
            <Text style={styles.linkItem}>Website: {userdata.personalInfo.website}</Text>
          </View>
        )}
      </View>

      {/* Reference Section - using the first experience as a mock reference */}
      <View style={styles.sidebarSection}>
        <Text style={styles.sidebarTitle}>Reference</Text>
        {userdata.experience[0] && (
          <View>
            <Text style={styles.referenceName}>{userdata.experience[0].company}</Text>
            <Text style={styles.referenceDetails}>T: {userdata.personalInfo.phone || "+1 234 567 890"}</Text>
            <Text style={styles.referenceDetails}>E: {userdata.personalInfo.email || "email@example.com"}</Text>
          </View>
        )}
      </View>

      {/* Hobbies Section - Assuming some hobby data */}
      <View style={styles.sidebarSection}>
        <Text style={styles.sidebarTitle}>Hobbies</Text>
        {['Reading', 'Cooking', 'Traveling', 'Fashion', 'Music'].map((hobby, index) => (
          <View key={index} style={styles.hobbyItem}>
            <Text style={styles.bulletPoint}>•</Text>
            <Text style={styles.hobbyText}>{hobby.toUpperCase()}</Text>
          </View>
        ))}
      </View>
    </View>
  );

  // Render the main content with experience, education, skills
  const renderMainContent = () => (
    <View style={styles.mainContent}>
      {/* Work Experience Section */}
      <View style={styles.sectionTitle}>
        <Text>Work Experience</Text>
      </View>
      {userdata.experience.map((exp, index) => (
        <View key={index} style={styles.experienceItem}>
          <View style={styles.timelineMarker} />
          <View style={styles.experienceContent}>
            <Text style={styles.companyName}>{filterEmpty(exp.company)}</Text>
            <Text style={styles.jobTitle}>{filterEmpty(exp.title)}</Text>
            <Text style={styles.jobLocation}>{filterEmpty(exp.location)}</Text>
            <Text style={styles.jobPeriod}>
              {filterEmpty(exp.startDate)} - {filterEmpty(exp.endDate)}
            </Text>
            <View style={styles.bulletList}>
              {exp.responsibilities.map((responsibility, idx) => (
                <View key={idx} style={styles.bulletItem}>
                  <Text style={styles.bulletPoint}>•</Text>
                  <Text style={styles.bulletText}>{responsibility}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>
      ))}

      {/* Education Section */}
      <View style={styles.sectionTitle}>
        <Text>Education</Text>
      </View>
      {userdata.education.map((edu, index) => (
        <View key={index} style={styles.educationItem}>
          <View style={styles.timelineMarker} />
          <View style={styles.experienceContent}>
            <Text style={styles.companyName}>{filterEmpty(edu.institution)}</Text>
            <Text style={styles.jobTitle}>{filterEmpty(edu.degree)}</Text>
            <Text style={styles.jobLocation}>{filterEmpty(edu.location)}</Text>
            <Text style={styles.jobPeriod}>{filterEmpty(edu.graduationYear)}</Text>
            <View style={styles.bulletList}>
              <View style={styles.bulletItem}>
                <Text style={styles.bulletPoint}>•</Text>
                <Text style={styles.bulletText}>Specialized in {edu.fieldOfStudy || "relevant field"}.</Text>
              </View>
              {edu.gpa && (
                <View style={styles.bulletItem}>
                  <Text style={styles.bulletPoint}>•</Text>
                  <Text style={styles.bulletText}>GPA: {edu.gpa}</Text>
                </View>
              )}
            </View>
          </View>
        </View>
      ))}

      {/* Skills Section */}
      <View style={styles.sectionTitle}>
        <Text>Skills</Text>
      </View>
      <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
        {technicalSkills.map((skill, index) => (
          <View key={index} style={[styles.skillCategory, {width: '48%', marginRight: index % 2 === 0 ? '4%' : 0}]}>
            <Text style={styles.skillName}>{skill.name}</Text>
            {renderSkillBar(skill.level)}
          </View>
        ))}
      </View>

      {/* Languages Section */}
      <View style={styles.sectionTitle}>
        <Text>Languages</Text>
      </View>
      <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
        {languageSkills.map((language, index) => (
          <View key={index} style={[styles.languageItem, {width: '48%', marginRight: index % 2 === 0 ? '4%' : 0}]}>
            <Text style={styles.languageName}>{language.name}</Text>
            {renderSkillBar(language.level)}
          </View>
        ))}
      </View>
    </View>
  );

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.container}>
          {renderSidebar()}
          {renderMainContent()}
        </View>
      </Page>
    </Document>
  );
};

export default Theme10;