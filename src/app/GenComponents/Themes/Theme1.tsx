import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image, Font } from '@react-pdf/renderer';
import { Resume } from '@/app/types/resume';
import { DEFAULT_THEME_COLORS } from './themeDefaults';
import { hasContent } from './contentVerification';

export default function Theme1({ userdata, colors = DEFAULT_THEME_COLORS.theme1 }: { userdata: Resume; colors?: any }) {
  const styles = StyleSheet.create({
    page: {
      flexDirection: 'row',
      backgroundColor: colors.background || '#FFFFFF',
      fontFamily: 'Helvetica',
    },
    sidebar: {
      width: '35%',
      backgroundColor: colors.sidebar || '#1f2937',
      color: '#FFFFFF',
      padding: 30,
    },
    mainContent: {
      width: '65%',
      padding: 30,
    },
    profileImage: {
      width: 100,
      height: 100,
      borderRadius: 50,
      marginBottom: 20,
      borderWidth: 2,
      borderColor: '#FFFFFF',
      alignSelf: 'center',
    },
    initialsPlaceholder: {
      width: 80,
      height: 80,
      borderRadius: 40,
      backgroundColor: colors.primary || '#2563eb',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 20,
      alignSelf: 'center',
      borderWidth: 2,
      borderColor: '#FFFFFF',
    },
    initialsText: {
      fontSize: 32,
      color: '#FFFFFF',
      fontWeight: 'bold',
    },
    sidebarName: {
      fontSize: 20,
      fontWeight: 'bold',
      color: '#FFFFFF',
      textAlign: 'center',
      marginBottom: 5,
    },
    sidebarTitle: {
      fontSize: 10,
      color: '#e5e7eb',
      textAlign: 'center',
      marginBottom: 25,
      opacity: 0.9,
    },
    sidebarSection: {
      marginBottom: 20,
    },
    sidebarHeading: {
      fontSize: 10,
      fontWeight: 'bold',
      color: '#FFFFFF',
      textTransform: 'uppercase',
      letterSpacing: 1,
      marginBottom: 10,
      borderBottomWidth: 1,
      borderBottomColor: colors.accent || '#4b5563',
      paddingBottom: 3,
    },
    contactText: {
      fontSize: 9,
      color: '#e5e7eb',
      marginBottom: 6,
    },
    skillItem: {
      fontSize: 9,
      color: '#e5e7eb',
      marginBottom: 4,
    },
    sectionHeading: {
      fontSize: 14,
      fontWeight: 'bold',
      color: colors.secondary || '#1f2937',
      textTransform: 'uppercase',
      letterSpacing: 1.2,
      marginBottom: 10,
      borderBottomWidth: 2,
      borderBottomColor: colors.primary || '#2563eb',
      paddingBottom: 5,
    },
    summaryText: {
      fontSize: 10,
      color: colors.text || '#111827',
      lineHeight: 1.5,
      textAlign: 'justify',
      marginBottom: 20,
    },
    experienceItem: {
      marginBottom: 15,
    },
    itemHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 3,
    },
    itemTitle: {
      fontSize: 11,
      fontWeight: 'bold',
      color: colors.secondary || '#1f2937',
    },
    itemDate: {
      fontSize: 9,
      color: colors.primary || '#2563eb',
      fontWeight: 'bold',
    },
    itemSubtitle: {
      fontSize: 10,
      color: '#6b7280',
      marginBottom: 5,
    },
    bulletItem: {
      flexDirection: 'row',
      marginBottom: 3,
      paddingLeft: 5,
    },
    bullet: {
      width: 10,
      fontSize: 9,
      color: colors.primary || '#2563eb',
    },
    bulletText: {
      flex: 1,
      fontSize: 9,
      color: colors.text || '#111827',
      lineHeight: 1.4,
    }
  });

  const displayName = hasContent(userdata.personalInfo?.fullName) ? userdata.personalInfo.fullName.trim() : 'Your Name';
  const displayTitle = hasContent(userdata.jobSearchTitle) ? userdata.jobSearchTitle.trim() : (hasContent(userdata.personalInfo?.title) ? userdata.personalInfo?.title?.trim() : 'Professional');
  const hasValidImage = userdata.image && userdata.image[0] && hasContent(userdata.image[0]);

  const getInitials = (name: string): string => {
    const parts = name.trim().split(' ').filter(p => p);
    if (parts.length === 0) return '?';
    if (parts.length === 1) return parts[0][0].toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Sidebar */}
        <View style={styles.sidebar}>
          {hasValidImage ? (
            <Image style={styles.profileImage} src={userdata.image[0]} />
          ) : (
            <View style={styles.initialsPlaceholder}>
              <Text style={styles.initialsText}>{getInitials(displayName)}</Text>
            </View>
          )}

          <Text style={styles.sidebarName}>{displayName}</Text>
          <Text style={styles.sidebarTitle}>{displayTitle}</Text>

          <View style={styles.sidebarSection}>
            <Text style={styles.sidebarHeading}>Contact</Text>
            {hasContent(userdata.personalInfo?.email) && (
              <Text style={styles.contactText}>{userdata.personalInfo.email.trim()}</Text>
            )}
            {hasContent(userdata.personalInfo?.phone) && (
              <Text style={styles.contactText}>{userdata.personalInfo.phone.trim()}</Text>
            )}
            {hasContent(userdata.personalInfo?.location) && (
              <Text style={styles.contactText}>{userdata.personalInfo.location.trim()}</Text>
            )}
          </View>

          {userdata.skills.technical.some(hasContent) && (
            <View style={styles.sidebarSection}>
              <Text style={styles.sidebarHeading}>Skills</Text>
              {userdata.skills.technical.filter(hasContent).map((skill, index) => (
                <Text key={index} style={styles.skillItem}>• {skill.trim()}</Text>
              ))}
            </View>
          )}

          {userdata.skills.languages.some(hasContent) && (
            <View style={styles.sidebarSection}>
              <Text style={styles.sidebarHeading}>Languages</Text>
              {userdata.skills.languages.filter(hasContent).map((lang, index) => (
                <Text key={index} style={styles.skillItem}>• {lang.trim()}</Text>
              ))}
            </View>
          )}
        </View>

        {/* Main Content */}
        <View style={styles.mainContent}>
          {hasContent(userdata.professionalSummary) && (
            <View style={{ marginBottom: 20 }}>
              <Text style={styles.sectionHeading}>Professional Profile</Text>
              <Text style={styles.summaryText}>{userdata.professionalSummary.trim()}</Text>
            </View>
          )}

          {userdata.experience.some(exp => hasContent(exp.title) || hasContent(exp.company)) && (
            <View style={{ marginBottom: 20 }}>
              <Text style={styles.sectionHeading}>Experience</Text>
              {userdata.experience.filter(exp => hasContent(exp.title) || hasContent(exp.company)).map((exp, index) => (
                <View key={index} style={styles.experienceItem}>
                  <View style={styles.itemHeader}>
                    <Text style={styles.itemTitle}>{(exp.title?.toString() || '').trim()}</Text>
                    <Text style={styles.itemDate}>
                      {[exp.startDate, exp.endDate].filter(hasContent).join(' - ') || (hasContent(exp.startDate) ? 'Present' : '')}
                    </Text>
                  </View>
                  <Text style={styles.itemSubtitle}>{(exp.company?.toString() || '').trim()}</Text>
                  {exp.responsibilities && exp.responsibilities.some(hasContent) && (
                    <View>
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

          {userdata.education.some(edu => hasContent(edu.degree) || hasContent(edu.institution)) && (
            <View style={{ marginBottom: 20 }}>
              <Text style={styles.sectionHeading}>Education</Text>
              {userdata.education.filter(edu => hasContent(edu.degree) || hasContent(edu.institution)).map((edu, index) => (
                <View key={index} style={styles.experienceItem}>
                  <View style={styles.itemHeader}>
                    <Text style={styles.itemTitle}>{edu.degree?.trim()}</Text>
                    <Text style={styles.itemDate}>{edu.graduationYear?.trim()}</Text>
                  </View>
                  <Text style={styles.itemSubtitle}>{edu.institution?.trim()}</Text>
                </View>
              ))}
            </View>
          )}

          {userdata.projects && userdata.projects.some(p => hasContent(p.title) || hasContent(p.description)) && (
            <View>
              <Text style={styles.sectionHeading}>Projects</Text>
              {userdata.projects.filter(p => hasContent(p.title) || hasContent(p.description)).map((project, index) => (
                <View key={index} style={styles.experienceItem}>
                  <Text style={styles.itemTitle}>{project.title?.trim()}</Text>
                  <Text style={styles.bulletText}>{project.description?.trim()}</Text>
                </View>
              ))}
            </View>
          )}
        </View>
      </Page>
    </Document>
  );
}
