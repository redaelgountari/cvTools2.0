import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image, Font } from '@react-pdf/renderer';
import { Resume } from '@/app/types/resume';
import { DEFAULT_THEME_COLORS } from './themeDefaults';
import { hasContent } from './contentVerification';

// Register custom fonts
try {
  Font.register({
    family: 'Roboto',
    fonts: [
      { src: 'https://fonts.gstatic.com/s/roboto/v30/KFOmCnqEu92Fr1Mu4mxKKTU1Kg.woff2', fontWeight: 'normal' },
      { src: 'https://fonts.gstatic.com/s/roboto/v30/KFOlCnqEu92Fr1MmWUlfBBc4AMP6lQ.woff2', fontWeight: 'bold' },
    ],
  });
} catch (error) {
  console.warn('Font registration failed, using default fonts:', error);
}

export default function Theme4({
  userdata,
  colors = DEFAULT_THEME_COLORS.theme4
}: {
  userdata: Resume;
  colors?: any
}) {
  const styles = StyleSheet.create({
    page: {
      fontFamily: 'Helvetica',
      backgroundColor: colors.background || '#FFFFFF',
      padding: 0,
    },
    headerSection: {
      backgroundColor: colors.primary || '#202A44',
      color: 'white',
      padding: 30,
      flexDirection: 'row',
      alignItems: 'center',
    },
    headerText: {
      flex: 1,
    },
    name: {
      fontSize: 28,
      fontWeight: 'bold',
      color: 'white',
      textTransform: 'uppercase',
      letterSpacing: 2,
    },
    jobTitle: {
      fontSize: 14,
      color: colors.accent || '#F06543',
      marginTop: 4,
      fontWeight: 'bold',
      textTransform: 'uppercase',
    },
    contactRow: {
      flexDirection: 'row',
      marginTop: 15,
      flexWrap: 'wrap',
      gap: 15,
    },
    contactItem: {
      fontSize: 9,
      color: 'white',
    },
    mainContainer: {
      flexDirection: 'row',
      flex: 1,
    },
    leftColumn: {
      width: '65%',
      padding: 30,
    },
    rightColumn: {
      width: '35%',
      backgroundColor: '#F8F9FA',
      padding: 25,
      borderLeftWidth: 1,
      borderLeftColor: colors.border || '#E0E0E0',
    },
    section: {
      marginBottom: 25,
    },
    sectionTitleContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 15,
    },
    sectionTitle: {
      fontSize: 16,
      color: colors.primary || '#202A44',
      fontWeight: 'bold',
      textTransform: 'uppercase',
      letterSpacing: 1,
    },
    summary: {
      fontSize: 10,
      color: colors.text || '#333333',
      lineHeight: 1.6,
      textAlign: 'justify',
    },
    experienceItem: {
      marginBottom: 20,
    },
    itemHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'baseline',
      marginBottom: 4,
    },
    itemTitle: {
      fontSize: 12,
      fontWeight: 'bold',
      color: colors.primary || '#202A44',
    },
    itemDate: {
      fontSize: 9,
      color: colors.accent || '#F06543',
      fontWeight: 'bold',
    },
    itemSubtitle: {
      fontSize: 10,
      color: colors.text || '#333333',
      fontStyle: 'italic',
      marginBottom: 6,
    },
    bulletList: {
      marginTop: 5,
    },
    bulletItem: {
      flexDirection: 'row',
      marginBottom: 4,
      paddingLeft: 5,
    },
    bullet: {
      width: 10,
      fontSize: 10,
      color: colors.accent || '#F06543',
    },
    bulletText: {
      flex: 1,
      fontSize: 9.5,
      color: colors.text || '#333333',
      lineHeight: 1.5,
    },
    sidebarSectionTitle: {
      fontSize: 13,
      color: colors.primary || '#202A44',
      fontWeight: 'bold',
      textTransform: 'uppercase',
      marginBottom: 12,
      borderBottomWidth: 2,
      borderBottomColor: colors.accent || '#F06543',
      paddingBottom: 4,
    },
    skillTag: {
      backgroundColor: 'white',
      borderWidth: 1,
      borderColor: colors.border || '#E0E0E0',
      paddingVertical: 4,
      paddingHorizontal: 10,
      borderRadius: 4,
      marginBottom: 6,
      marginRight: 6,
    },
    skillText: {
      fontSize: 9,
      color: colors.text || '#333333',
    },
    skillsContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
    educationItem: {
      marginBottom: 15,
    },
    eduDegree: {
      fontSize: 10,
      fontWeight: 'bold',
      color: colors.primary || '#202A44',
    },
    eduInfo: {
      fontSize: 9,
      color: colors.text || '#333333',
      marginTop: 2,
    }
  });

  const displayName = hasContent(userdata.personalInfo?.fullName) ? userdata.personalInfo.fullName.trim() : 'Your Name';
  const displayTitle = hasContent(userdata.jobSearchTitle) ? userdata.jobSearchTitle.trim() : (hasContent(userdata.personalInfo?.title) ? userdata.personalInfo?.title?.trim() : 'Professional');

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.headerSection}>
          <View style={styles.headerText}>
            <Text style={styles.name}>{displayName}</Text>
            <Text style={styles.jobTitle}>{displayTitle}</Text>
            <View style={styles.contactRow}>
              {hasContent(userdata.personalInfo?.email) && (
                <Text style={styles.contactItem}>✉  {userdata.personalInfo.email.trim()}</Text>
              )}
              {hasContent(userdata.personalInfo?.phone) && (
                <Text style={styles.contactItem}>☎  {userdata.personalInfo.phone.trim()}</Text>
              )}
              {hasContent(userdata.personalInfo?.location) && (
                <Text style={styles.contactItem}>📍  {userdata.personalInfo.location.trim()}</Text>
              )}
            </View>
          </View>
        </View>

        <View style={styles.mainContainer}>
          <View style={styles.leftColumn}>
            {hasContent(userdata.professionalSummary) && (
              <View style={styles.section}>
                <View style={styles.sectionTitleContainer}>
                  <Text style={styles.sectionTitle}>Profile Summary</Text>
                </View>
                <Text style={styles.summary}>{userdata.professionalSummary.trim()}</Text>
              </View>
            )}

            {userdata.experience.some(exp => hasContent(exp.title) || hasContent(exp.company)) && (
              <View style={styles.section}>
                <View style={styles.sectionTitleContainer}>
                  <Text style={styles.sectionTitle}>Work Experience</Text>
                </View>
                {userdata.experience.filter(exp => hasContent(exp.title) || hasContent(exp.company)).map((exp, index) => (
                  <View key={index} style={styles.experienceItem}>
                    <View style={styles.itemHeader}>
                      <Text style={styles.itemTitle}>{exp.title?.trim()}</Text>
                      <Text style={styles.itemDate}>
                        {[exp.startDate, exp.endDate].filter(hasContent).join(' - ') || (hasContent(exp.startDate) ? 'Present' : '')}
                      </Text>
                    </View>
                    <Text style={styles.itemSubtitle}>{exp.company?.trim()}</Text>
                    {exp.responsibilities && exp.responsibilities.some(hasContent) && (
                      <View style={styles.bulletList}>
                        {exp.responsibilities.filter(hasContent).map((resp, idx) => (
                          <View key={idx} style={styles.bulletItem}>
                            <Text style={styles.bullet}>•</Text>
                            <Text style={styles.bulletText}>{resp.trim()}</Text>
                          </View>
                        ))}
                      </View>
                    )}
                  </View>
                ))}
              </View>
            )}

            {userdata.projects && userdata.projects.some(p => hasContent(p.title) || hasContent(p.description)) && (
              <View style={styles.section}>
                <View style={styles.sectionTitleContainer}>
                  <Text style={styles.sectionTitle}>Notable Projects</Text>
                </View>
                {userdata.projects.filter(p => hasContent(p.title) || hasContent(p.description)).map((project, index) => (
                  <View key={index} style={styles.experienceItem}>
                    <Text style={styles.itemTitle}>{project.title?.trim()}</Text>
                    <Text style={[styles.summary, { marginTop: 4 }]}>{project.description?.trim()}</Text>
                  </View>
                ))}
              </View>
            )}
          </View>

          <View style={styles.rightColumn}>
            {userdata.skills.technical.some(hasContent) && (
              <View style={styles.section}>
                <Text style={styles.sidebarSectionTitle}>Technical Skills</Text>
                <View style={styles.skillsContainer}>
                  {userdata.skills.technical.filter(hasContent).map((skill, index) => (
                    <View key={index} style={styles.skillTag}>
                      <Text style={styles.skillText}>{skill.trim()}</Text>
                    </View>
                  ))}
                </View>
              </View>
            )}

            {userdata.education.some(edu => hasContent(edu.degree) || hasContent(edu.institution)) && (
              <View style={styles.section}>
                <Text style={styles.sidebarSectionTitle}>Education</Text>
                {userdata.education.filter(edu => hasContent(edu.degree) || hasContent(edu.institution)).map((edu, index) => (
                  <View key={index} style={styles.educationItem}>
                    <Text style={styles.eduDegree}>{edu.degree?.trim()}</Text>
                    <Text style={styles.eduInfo}>{edu.institution?.trim()}</Text>
                    <Text style={styles.eduInfo}>{edu.graduationYear?.trim()}</Text>
                  </View>
                ))}
              </View>
            )}

            {userdata.skills.languages.some(hasContent) && (
              <View style={styles.section}>
                <Text style={styles.sidebarSectionTitle}>Languages</Text>
                {userdata.skills.languages.filter(hasContent).map((lang, index) => (
                  <Text key={index} style={[styles.eduInfo, { marginBottom: 4 }]}>• {lang.trim()}</Text>
                ))}
              </View>
            )}
          </View>
        </View>
      </Page>
    </Document>
  );
}