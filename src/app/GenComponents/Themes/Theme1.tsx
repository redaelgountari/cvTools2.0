"use client"

import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image, Font } from '@react-pdf/renderer';
import { Resume } from '@/app/types/resume';

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
  primary: '#2563EB',
  dark: '#1E293B',
  medium: '#64748B',
  light: '#E2E8F0',
  background: '#F8FAFC'
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
    paddingTop: 40,
    backgroundColor: COLORS.dark,
    color: 'white',
  },
  mainContent: {
    width: '65%',
    padding: 30,
    paddingTop: 40,
  },
  header: {
    marginBottom: 30,
    alignItems: 'center',
  },
  headerWithImage: {
    marginBottom: 30,
    alignItems: 'center',
  },
  headerNoImage: {
    marginBottom: 25,
    alignItems: 'center',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 15,
    borderWidth: 3,
    objectFit: "cover",
    borderColor: 'white',
  },
  avatarPlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: COLORS.primary,
    backgroundColor: COLORS.medium,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarInitials: {
    fontSize: 32,
    fontWeight: 700,
    color: 'white',
  },
  name: {
    fontSize: 20,
    fontWeight: 700,
    marginBottom: 5,
    color: 'white',
    textAlign: 'center',
    lineHeight: 1.2,
  },
  title: {
    fontSize: 12,
    fontWeight: 600,
    color: COLORS.light,
    textAlign: 'center',
    opacity: 0.95,
    lineHeight: 1.3,
  },
  section: {
    marginBottom: 20,
  },
  sidebarSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 700,
    marginBottom: 10,
    color: COLORS.dark,
    borderBottomWidth: 2,
    borderBottomColor: COLORS.primary,
    paddingBottom: 5,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  sidebarTitle: {
    fontSize: 12,
    fontWeight: 700,
    marginBottom: 10,
    color: 'white',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.medium,
    paddingBottom: 5,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  contactItem: {
    marginBottom: 10,
  },
  contactText: {
    fontSize: 10,
    color: COLORS.light,
    lineHeight: 1.4,
  },
  skillCategory: {
    fontSize: 11,
    fontWeight: 600,
    marginBottom: 6,
    marginTop: 2,
    color: COLORS.light,
    textTransform: 'uppercase',
    letterSpacing: 0.3,
  },
  skillItem: {
    fontSize: 10,
    marginBottom: 5,
    color: COLORS.light,
    lineHeight: 1.3,
  },
  bulletList: {
    marginLeft: 0,
  },
  bulletItem: {
    fontSize: 9.5,
    marginBottom: 5,
    color: COLORS.light,
    paddingLeft: 12,
    lineHeight: 1.4,
  },
  experienceItem: {
    marginBottom: 16,
  },
  experienceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 4,
    gap: 10,
  },
  jobTitle: {
    fontSize: 12,
    fontWeight: 700,
    color: COLORS.dark,
    lineHeight: 1.3,
    flex: 1,
  },
  jobPeriod: {
    fontSize: 9,
    fontWeight: 600,
    color: COLORS.primary,
    textAlign: 'right',
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  company: {
    fontSize: 10.5,
    fontWeight: 600,
    color: COLORS.medium,
    marginBottom: 6,
    lineHeight: 1.3,
  },
  jobDescription: {
    fontSize: 9.5,
    lineHeight: 1.5,
    color: COLORS.dark,
    marginBottom: 3,
  },
  educationItem: {
    marginBottom: 12,
  },
  degree: {
    fontSize: 11.5,
    fontWeight: 700,
    color: COLORS.dark,
    marginBottom: 3,
    lineHeight: 1.3,
  },
  institution: {
    fontSize: 10,
    color: COLORS.medium,
    marginBottom: 2,
    lineHeight: 1.3,
  },
  projectItem: {
    marginBottom: 14,
  },
  projectTitle: {
    fontSize: 12,
    fontWeight: 700,
    color: COLORS.dark,
    marginBottom: 4,
    lineHeight: 1.3,
  },
  projectDescription: {
    fontSize: 10,
    color: COLORS.dark,
    marginBottom: 6,
    lineHeight: 1.5,
  },
  tagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 4,
  },
  tag: {
    fontSize: 8,
    backgroundColor: COLORS.background,
    color: COLORS.medium,
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: 10,
    marginRight: 5,
    marginBottom: 5,
    borderWidth: 1,
    borderColor: COLORS.light,
  },
  professionalSummary: {
    fontSize: 9.5,
    lineHeight: 1.6,
    color: COLORS.dark,
    textAlign: 'justify',
  },
});

interface Theme1Props {
  userdata: Resume;
}

const filterEmpty = (value?: string | null): string => {
  if (!value || value === 'N/A' || value.trim() === '') return '';
  return value.trim();
};

const hasContent = (value?: string | null): boolean => {
  return filterEmpty(value) !== '';
};

const Theme1: React.FC<Theme1Props> = ({ userdata }) => {
  const renderContactInfo = () => {
    const contactItems = [
      { value: userdata.personalInfo?.location, label: null },
      { value: userdata.personalInfo?.phone, label: null },
      { value: userdata.personalInfo?.email, label: null },
      { value: userdata.personalInfo?.linkedin, label: 'LinkedIn' },
      { value: userdata.personalInfo?.website, label: 'Website' },
    ];

    const validItems = contactItems.filter(item => hasContent(item.value));
    
    if (validItems.length === 0) return null;

    return (
      <View style={styles.sidebarSection}>
        <Text style={styles.sidebarTitle}>Contact</Text>
        {validItems.map((item, index) => (
          <View key={index} style={styles.contactItem}>
            <Text style={styles.contactText}>{filterEmpty(item.value)}</Text>
          </View>
        ))}
      </View>
    );
  };

  const renderSkills = () => {
    const hasTechnical = userdata.skills?.technical && userdata.skills.technical.length > 0;
    const hasSoft = userdata.skills?.soft && userdata.skills.soft.length > 0;
    
    if (!hasTechnical && !hasSoft) return null;

    return (
      <View style={styles.sidebarSection}>
        <Text style={styles.sidebarTitle}>Skills</Text>
        
        {hasTechnical && (
          <View>
            <Text style={styles.skillCategory}>Technical</Text>
            <View style={styles.bulletList}>
              {userdata.skills.technical.map((skill, index) => (
                skill && skill.trim() && (
                  <Text key={index} style={styles.bulletItem}>• {skill.trim()}</Text>
                )
              ))}
            </View>
          </View>
        )}
        
        {hasSoft && (
          <View style={{ marginTop: hasTechnical ? 12 : 0 }}>
            <Text style={styles.skillCategory}>Soft Skills</Text>
            <View style={styles.bulletList}>
              {userdata.skills.soft.map((skill, index) => (
                skill && skill.trim() && (
                  <Text key={index} style={styles.bulletItem}>• {skill.trim()}</Text>
                )
              ))}
            </View>
          </View>
        )}
      </View>
    );
  };

  const renderLanguages = () => {
    if (!userdata.skills?.languages || userdata.skills.languages.length === 0) return null;
    
    const validLanguages = userdata.skills.languages.filter(lang => lang && lang.trim());
    if (validLanguages.length === 0) return null;

    return (
      <View style={styles.sidebarSection}>
        <Text style={styles.sidebarTitle}>Languages</Text>
        <View style={styles.bulletList}>
          {validLanguages.map((language, index) => (
            <Text key={index} style={styles.bulletItem}>• {language.trim()}</Text>
          ))}
        </View>
      </View>
    );
  };

  const renderExperience = () => {
    if (!userdata.experience || userdata.experience.length === 0) return null;
    
    const validExperiences = userdata.experience.filter(exp => 
      hasContent(exp.title) || hasContent(exp.company)
    );
    
    if (validExperiences.length === 0) return null;

    return (
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Professional Experience</Text>
        {validExperiences.map((exp, index) => {
          const dateRange = [filterEmpty(exp.startDate), filterEmpty(exp.endDate)]
            .filter(d => d)
            .join(' - ') || '';
          
          const companyLocation = [filterEmpty(exp.company), filterEmpty(exp.location)]
            .filter(c => c)
            .join(' • ');

          return (
            <View key={index} style={styles.experienceItem}>
              <View style={styles.experienceHeader}>
                <Text style={styles.jobTitle}>{filterEmpty(exp.title) || 'Position'}</Text>
                {dateRange && <Text style={styles.jobPeriod}>{dateRange}</Text>}
              </View>
              {companyLocation && (
                <Text style={styles.company}>{companyLocation}</Text>
              )}
              {exp.responsibilities && exp.responsibilities.length > 0 && (
                <View style={styles.bulletList}>
                  {exp.responsibilities
                    .filter(r => r && r.trim())
                    .map((responsibility, idx) => (
                      <Text key={idx} style={styles.jobDescription}>• {responsibility.trim()}</Text>
                    ))}
                </View>
              )}
            </View>
          );
        })}
      </View>
    );
  };

  const renderEducation = () => {
    if (!userdata.education || userdata.education.length === 0) return null;
    
    const validEducation = userdata.education.filter(edu => 
      hasContent(edu.degree) || hasContent(edu.institution)
    );
    
    if (validEducation.length === 0) return null;

    return (
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Education</Text>
        {validEducation.map((edu, index) => {
          const institutionLocation = [filterEmpty(edu.institution), filterEmpty(edu.location)]
            .filter(i => i)
            .join(' • ');

          return (
            <View key={index} style={styles.educationItem}>
              <Text style={styles.degree}>{filterEmpty(edu.degree) || 'Degree'}</Text>
              {institutionLocation && (
                <Text style={styles.institution}>{institutionLocation}</Text>
              )}
              {hasContent(edu.graduationYear) && (
                <Text style={styles.jobPeriod}>{filterEmpty(edu.graduationYear)}</Text>
              )}
              {hasContent(edu.gpa) && (
                <Text style={styles.jobDescription}>GPA: {edu.gpa}</Text>
              )}
            </View>
          );
        })}
      </View>
    );
  };

  const renderProjects = () => {
    if (!userdata.projects || userdata.projects.length === 0) return null;
    
    const validProjects = userdata.projects.filter(project => 
      hasContent(project.title) || hasContent(project.description)
    );
    
    if (validProjects.length === 0) return null;

    return (
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Projects</Text>
        {validProjects.map((project, index) => (
          <View key={index} style={styles.projectItem}>
            <Text style={styles.projectTitle}>{filterEmpty(project.title) || 'Project'}</Text>
            {hasContent(project.description) && (
              <Text style={styles.projectDescription}>{filterEmpty(project.description)}</Text>
            )}
            {project.technologies && project.technologies.length > 0 && (
              <View style={styles.tagContainer}>
                {project.technologies
                  .filter(tech => tech && tech.trim())
                  .map((tech, idx) => (
                    <Text key={idx} style={styles.tag}>{tech.trim()}</Text>
                  ))}
              </View>
            )}
          </View>
        ))}
      </View>
    );
  };

  // Get display name and job title
  const displayName = filterEmpty(userdata.personalInfo?.fullName) || 'Your Name';
  const displayTitle = filterEmpty(userdata.experience?.[0]?.title) || '';
  
  // Check if image exists and is valid
  const hasValidImage = userdata.image && userdata.image.length > 0 && hasContent(userdata.image[0]);

  // Get initials for placeholder
  const getInitials = (name: string): string => {
    const parts = name.trim().split(' ').filter(p => p);
    if (parts.length === 0) return '?';
    if (parts.length === 1) return parts[0][0].toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  const initials = getInitials(displayName);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.container}>
          {/* Sidebar */}
          <View style={styles.sidebar}>
            <View style={hasValidImage ? styles.headerWithImage : styles.headerNoImage}>
              {hasValidImage ? (
                <Image style={styles.avatar} src={userdata.image[0]} />
              ) : (
                <View style={styles.avatarPlaceholder}>
                  <Text style={styles.avatarInitials}>{initials}</Text>
                </View>
              )}
              <Text style={styles.name}>{displayName}</Text>
              {displayTitle && (
                <Text style={styles.title}>{displayTitle}</Text>
              )}
            </View>

            {renderContactInfo()}
            {renderSkills()}
            {renderLanguages()}
          </View>

          {/* Main Content */}
          <View style={styles.mainContent}>
            {hasContent(userdata.professionalSummary) && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Professional Profile</Text>
                <Text style={styles.professionalSummary}>
                  {filterEmpty(userdata.professionalSummary)}
                </Text>
              </View>
            )}

            {renderExperience()}
            {renderEducation()}
            {renderProjects()}
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default Theme1;