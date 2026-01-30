import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image, Font } from '@react-pdf/renderer';
import { Resume } from '@/app/types/resume';
import { DEFAULT_THEME_COLORS } from './themeDefaults';
import { hasContent } from './contentVerification';

// Register custom fonts
try {
  Font.register({
    family: 'Montserrat',
    fonts: [
      { src: 'https://fonts.gstatic.com/s/montserrat/v25/JTUSjIg1_i6t8kCHKm4df9GR7mthP6_VAnUv.woff2', fontWeight: 'normal' },
      { src: 'https://fonts.gstatic.com/s/montserrat/v25/JTUHjIg1_i6t8kCHKm4dfW37xO7fP3UL-K8P.woff2', fontWeight: 'bold' },
    ],
  });
} catch (error) {
  console.warn('Font registration failed, using default fonts:', error);
}

export default function Theme2({
  userdata,
  colors = DEFAULT_THEME_COLORS.theme2
}: {
  userdata: Resume;
  colors?: any
}) {
  const styles = StyleSheet.create({
    page: {
      flexDirection: 'row',
      backgroundColor: colors.background || '#FFFFFF',
      fontFamily: 'Helvetica',
    },
    leftColumn: {
      width: '32%',
      backgroundColor: colors.sidebar || '#F5F7FA',
      padding: 24,
      paddingTop: 36,
      borderRightWidth: 1,
      borderRightColor: colors.border || '#E2E8F0',
    },
    rightColumn: {
      width: '68%',
      padding: 36,
      backgroundColor: colors.background || '#FFFFFF',
    },
    avatarPlaceholder: {
      width: 100,
      height: 100,
      borderRadius: 50,
      marginBottom: 20,
      borderWidth: 2,
      borderColor: colors.primary || '#3182CE',
      alignSelf: 'center',
      overflow: 'hidden',
    },
    photo: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
    },
    sidebarSection: {
      marginBottom: 28,
    },
    sidebarTitle: {
      fontSize: 12,
      fontWeight: 'bold',
      color: colors.primary || '#3182CE',
      textTransform: 'uppercase',
      letterSpacing: 1.5,
      marginBottom: 12,
      borderBottomWidth: 2,
      borderBottomColor: colors.primary || '#3182CE',
      paddingBottom: 4,
    },
    contactItem: {
      marginBottom: 10,
    },
    contactLabel: {
      fontSize: 8,
      fontWeight: 'bold',
      color: colors.accent || '#4A5568',
      textTransform: 'uppercase',
      marginBottom: 2,
    },
    contactValue: {
      fontSize: 9,
      color: colors.secondary || '#2D3748',
      lineHeight: 1.4,
    },
    skillItem: {
      marginBottom: 6,
    },
    skillName: {
      fontSize: 9,
      color: colors.secondary || '#2D3748',
    },

    // Right Column Components
    header: {
      marginBottom: 32,
    },
    name: {
      fontSize: 32,
      fontWeight: 'bold',
      color: colors.primary || '#3182CE',
      textTransform: 'uppercase',
      letterSpacing: 2,
      marginBottom: 4,
    },
    jobTitle: {
      fontSize: 14,
      color: colors.accent || '#4A5568',
      textTransform: 'uppercase',
      letterSpacing: 3,
      fontWeight: 'bold',
    },
    section: {
      marginBottom: 28,
    },
    sectionTitle: {
      fontSize: 16,
      fontWeight: 'bold',
      color: colors.primary || '#3182CE',
      textTransform: 'uppercase',
      letterSpacing: 2,
      marginBottom: 16,
      borderBottomWidth: 1,
      borderBottomColor: colors.border || '#E2E8F0',
      paddingBottom: 8,
    },
    summary: {
      fontSize: 10,
      color: colors.secondary || '#2D3748',
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
      color: colors.secondary || '#2D3748',
    },
    itemDate: {
      fontSize: 9,
      color: colors.accent || '#4A5568',
      fontWeight: 'bold',
    },
    itemSubtitle: {
      fontSize: 10,
      color: colors.primary || '#3182CE',
      marginBottom: 8,
      fontWeight: 'bold',
    },
    bulletList: {
      marginTop: 4,
    },
    bulletItem: {
      flexDirection: 'row',
      marginBottom: 4,
    },
    bullet: {
      width: 12,
      fontSize: 10,
      color: colors.primary || '#3182CE',
    },
    bulletText: {
      flex: 1,
      fontSize: 9.5,
      color: colors.secondary || '#2D3748',
      lineHeight: 1.5,
    }
  });

  const displayName = hasContent(userdata.personalInfo?.fullName) ? userdata.personalInfo.fullName.trim() : 'Your Name';
  const displayTitle = hasContent(userdata.jobSearchTitle) ? userdata.jobSearchTitle.trim() : (hasContent(userdata.personalInfo?.title) ? (userdata as any).personalInfo.title.trim() : 'Professional');
  const hasValidImage = userdata.image && userdata.image[0] && hasContent(userdata.image[0]);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Sidebar */}
        <View style={styles.leftColumn}>
          {hasValidImage && (
            <View style={styles.avatarPlaceholder}>
              <Image style={styles.photo} src={userdata.image[0]} />
            </View>
          )}

          <View style={styles.sidebarSection}>
            <Text style={styles.sidebarTitle}>Contact</Text>
            {hasContent(userdata.personalInfo?.email) && (
              <View style={styles.contactItem}>
                <Text style={styles.contactLabel}>Email</Text>
                <Text style={styles.contactValue}>{userdata.personalInfo.email.trim()}</Text>
              </View>
            )}
            {hasContent(userdata.personalInfo?.phone) && (
              <View style={styles.contactItem}>
                <Text style={styles.contactLabel}>Phone</Text>
                <Text style={styles.contactValue}>{userdata.personalInfo.phone.trim()}</Text>
              </View>
            )}
            {hasContent(userdata.personalInfo?.location) && (
              <View style={styles.contactItem}>
                <Text style={styles.contactLabel}>Location</Text>
                <Text style={styles.contactValue}>{userdata.personalInfo.location.trim()}</Text>
              </View>
            )}
            {hasContent(userdata.personalInfo?.linkedin) && (
              <View style={styles.contactItem}>
                <Text style={styles.contactLabel}>LinkedIn</Text>
                <Text style={styles.contactValue}>Profile Connected</Text>
              </View>
            )}
          </View>

          {userdata.skills.technical.some(hasContent) && (
            <View style={styles.sidebarSection}>
              <Text style={styles.sidebarTitle}>Skills</Text>
              {userdata.skills.technical.filter(hasContent).map((skill, index) => (
                <View key={index} style={styles.skillItem}>
                  <Text style={styles.skillName}>• {skill.trim()}</Text>
                </View>
              ))}
            </View>
          )}

          {userdata.skills.languages.some(hasContent) && (
            <View style={styles.sidebarSection}>
              <Text style={styles.sidebarTitle}>Languages</Text>
              {userdata.skills.languages.filter(hasContent).map((lang, index) => (
                <View key={index} style={styles.skillItem}>
                  <Text style={styles.skillName}>• {lang.trim()}</Text>
                </View>
              ))}
            </View>
          )}
        </View>

        {/* Main Content */}
        <View style={styles.rightColumn}>
          <View style={styles.header}>
            <Text style={styles.name}>{displayName}</Text>
            <Text style={styles.jobTitle}>{displayTitle}</Text>
          </View>

          {hasContent(userdata.professionalSummary) && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Profile</Text>
              <Text style={styles.summary}>{userdata.professionalSummary.trim()}</Text>
            </View>
          )}

          {userdata.experience.some(exp => hasContent(exp.title) || hasContent(exp.company)) && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Experience</Text>
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

          {userdata.education.some(edu => hasContent(edu.degree) || hasContent(edu.institution)) && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Education</Text>
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
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Projects</Text>
              {userdata.projects.filter(p => hasContent(p.title) || hasContent(p.description)).map((project, index) => (
                <View key={index} style={styles.experienceItem}>
                  <Text style={styles.itemTitle}>{project.title?.trim()}</Text>
                  <Text style={[styles.summary, { marginTop: 4 }]}>{project.description?.trim()}</Text>
                </View>
              ))}
            </View>
          )}
        </View>
      </Page>
    </Document>
  );
}