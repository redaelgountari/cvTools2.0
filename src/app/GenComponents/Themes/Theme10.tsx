import React from 'react';
import { Document, Page, Text, View, StyleSheet, Font, Image } from '@react-pdf/renderer';
import { Resume } from '@/app/types/resume';
import { DEFAULT_THEME_COLORS } from './themeDefaults';
import { hasContent } from './contentVerification';

export default function Theme10({ userdata, colors = DEFAULT_THEME_COLORS.theme10 }: { userdata: Resume, colors?: any }) {
  const styles = StyleSheet.create({
    page: {
      flexDirection: 'row',
      backgroundColor: colors.background || '#FFFFFF',
      fontFamily: 'Helvetica',
    },
    sidebar: {
      width: '35%',
      backgroundColor: colors.sidebar || '#F8FAFC',
      padding: 30,
      paddingTop: 40,
    },
    mainContent: {
      width: '65%',
      padding: 30,
      paddingTop: 40,
    },
    header: {
      marginBottom: 30,
    },
    name: {
      fontSize: 28,
      fontWeight: 'bold',
      color: colors.primary || '#1E293B',
      marginBottom: 6,
      letterSpacing: 0.5,
    },
    title: {
      fontSize: 14,
      color: colors.accent || '#64748B',
      marginBottom: 20,
      letterSpacing: 0.3,
    },
    profileImage: {
      width: 100,
      height: 100,
      borderRadius: 50,
      marginBottom: 20,
      objectFit: 'cover',
    },
    sidebarSection: {
      marginBottom: 24,
    },
    sidebarHeading: {
      fontSize: 12,
      fontWeight: 'bold',
      color: colors.primary || '#1E293B',
      textTransform: 'uppercase',
      marginBottom: 12,
      letterSpacing: 1,
      borderBottomWidth: 2,
      borderBottomColor: colors.primary || '#3B82F6',
      paddingBottom: 4,
    },
    contactItem: {
      marginBottom: 10,
    },
    contactLabel: {
      fontSize: 8,
      color: colors.accent || '#64748B',
      textTransform: 'uppercase',
      marginBottom: 2,
      letterSpacing: 0.5,
    },
    contactText: {
      fontSize: 10,
      color: colors.secondary || '#334155',
      lineHeight: 1.4,
    },
    skillItem: {
      fontSize: 10,
      color: colors.secondary || '#334155',
      marginBottom: 8,
      paddingLeft: 12,
      position: 'relative',
      lineHeight: 1.4,
    },
    skillBullet: {
      position: 'absolute',
      left: 0,
      top: 0,
      width: 6,
      height: 6,
      backgroundColor: colors.primary || '#3B82F6',
      borderRadius: 3,
      marginTop: 4,
    },
    mainSection: {
      marginBottom: 28,
    },
    sectionHeading: {
      fontSize: 16,
      fontWeight: 'bold',
      color: colors.primary || '#1E293B',
      textTransform: 'uppercase',
      marginBottom: 16,
      letterSpacing: 1.2,
      borderBottomWidth: 2,
      borderBottomColor: colors.primary || '#3B82F6',
      paddingBottom: 6,
    },
    profileText: {
      fontSize: 10.5,
      color: '#475569',
      lineHeight: 1.6,
      textAlign: 'justify',
    },
    timelineItem: {
      marginBottom: 20,
      paddingLeft: 20,
      position: 'relative',
    },
    timelineDot: {
      position: 'absolute',
      left: 0,
      top: 6,
      width: 8,
      height: 8,
      backgroundColor: colors.primary || '#3B82F6',
      borderRadius: 4,
    },
    timelineLine: {
      position: 'absolute',
      left: 3.5,
      top: 14,
      width: 1,
      bottom: -20,
      backgroundColor: '#CBD5E1',
    },
    itemHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: 4,
    },
    itemTitle: {
      fontSize: 12,
      fontWeight: 'bold',
      color: colors.primary || '#1E293B',
      flex: 1,
      lineHeight: 1.3,
    },
    itemPeriod: {
      fontSize: 9,
      color: colors.accent || '#64748B',
      backgroundColor: '#F1F5F9',
      paddingVertical: 3,
      paddingHorizontal: 8,
      borderRadius: 4,
      marginLeft: 8,
    },
    itemSubtitle: {
      fontSize: 10.5,
      color: colors.secondary || '#475569',
      marginBottom: 8,
      lineHeight: 1.3,
    },
    bulletList: {
      marginTop: 6,
    },
    bulletItem: {
      fontSize: 10,
      color: '#475569',
      marginBottom: 5,
      paddingLeft: 14,
      position: 'relative',
      lineHeight: 1.5,
    },
    bullet: {
      position: 'absolute',
      left: 0,
      top: 0,
      fontSize: 10,
      color: colors.primary || '#3B82F6',
    },
    projectDescription: {
      fontSize: 10,
      color: '#475569',
      marginBottom: 8,
      lineHeight: 1.5,
    },
    techTag: {
      fontSize: 8,
      color: colors.primary || '#3B82F6',
      backgroundColor: '#EFF6FF',
      paddingVertical: 3,
      paddingHorizontal: 8,
      borderRadius: 4,
      marginRight: 4,
      marginBottom: 4,
    },
    techContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      marginTop: 6,
    },
  });

  const displayName = hasContent(userdata.personalInfo?.fullName) ? userdata.personalInfo.fullName.trim() : 'Your Name';
  const displayTitle = hasContent(userdata.jobSearchTitle) ? userdata.jobSearchTitle.trim() : (hasContent(userdata.personalInfo?.title) ? userdata.personalInfo?.title?.trim() : 'Professional');
  const hasValidImage = userdata.image && userdata.image[0] && hasContent(userdata.image[0]);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.sidebar}>
          {hasValidImage && (
            <Image style={styles.profileImage} src={userdata.image[0]} />
          )}

          <View style={styles.sidebarSection}>
            <Text style={styles.sidebarHeading}>Contact</Text>
            {hasContent(userdata.personalInfo?.phone) && (
              <View style={styles.contactItem}>
                <Text style={styles.contactLabel}>Phone</Text>
                <Text style={styles.contactText}>{userdata.personalInfo.phone.trim()}</Text>
              </View>
            )}
            {hasContent(userdata.personalInfo?.email) && (
              <View style={styles.contactItem}>
                <Text style={styles.contactLabel}>Email</Text>
                <Text style={styles.contactText}>{userdata.personalInfo.email.trim()}</Text>
              </View>
            )}
            {hasContent(userdata.personalInfo?.location) && (
              <View style={styles.contactItem}>
                <Text style={styles.contactLabel}>Location</Text>
                <Text style={styles.contactText}>{userdata.personalInfo.location.trim()}</Text>
              </View>
            )}
          </View>

          {(userdata.skills.technical.some(hasContent) || userdata.skills.soft.some(hasContent)) && (
            <View style={styles.sidebarSection}>
              <Text style={styles.sidebarHeading}>Skills</Text>
              {[...userdata.skills.technical, ...userdata.skills.soft].filter(hasContent).map((skill, index) => (
                <View key={index}>
                  <View style={styles.skillBullet} />
                  <Text style={styles.skillItem}>{skill.trim()}</Text>
                </View>
              ))}
            </View>
          )}

          {userdata.skills.languages.some(hasContent) && (
            <View style={styles.sidebarSection}>
              <Text style={styles.sidebarHeading}>Languages</Text>
              {userdata.skills.languages.filter(hasContent).map((language, index) => (
                <View key={index}>
                  <Text style={styles.contactText}>{language.trim()}</Text>
                </View>
              ))}
            </View>
          )}
        </View>

        <View style={styles.mainContent}>
          <View style={styles.header}>
            <Text style={styles.name}>{displayName}</Text>
            <Text style={styles.title}>{displayTitle}</Text>
          </View>

          {hasContent(userdata.professionalSummary) && (
            <View style={styles.mainSection}>
              <Text style={styles.sectionHeading}>Profile</Text>
              <Text style={styles.profileText}>{userdata.professionalSummary.trim()}</Text>
            </View>
          )}

          {userdata.experience.some(exp => hasContent(exp.title) || hasContent(exp.company)) && (
            <View style={styles.mainSection}>
              <Text style={styles.sectionHeading}>Work Experience</Text>
              {userdata.experience.filter(exp => hasContent(exp.title) || hasContent(exp.company)).map((exp, index, arr) => (
                <View key={index} style={styles.timelineItem}>
                  <View style={styles.timelineDot} />
                  {index !== arr.length - 1 && <View style={styles.timelineLine} />}
                  <View style={styles.itemHeader}>
                    <Text style={styles.itemTitle}>{exp.title?.trim()}</Text>
                    <Text style={styles.itemPeriod}>
                      {[exp.startDate, exp.endDate].filter(hasContent).join(' - ') || (hasContent(exp.startDate) ? 'Present' : '')}
                    </Text>
                  </View>
                  <Text style={styles.itemSubtitle}>{exp.company?.trim()}</Text>
                  {exp.responsibilities && exp.responsibilities.some(hasContent) && (
                    <View style={styles.bulletList}>
                      {exp.responsibilities.filter(hasContent).map((resp, idx) => (
                        <View key={idx}>
                          <Text style={styles.bullet}>•</Text>
                          <Text style={styles.bulletItem}>{resp.trim()}</Text>
                        </View>
                      ))}
                    </View>
                  )}
                </View>
              ))}
            </View>
          )}

          {userdata.projects && userdata.projects.some(p => hasContent(p.title) || hasContent(p.description)) && (
            <View style={styles.mainSection}>
              <Text style={styles.sectionHeading}>Projects</Text>
              {userdata.projects.filter(p => hasContent(p.title) || hasContent(p.description)).map((project, index, arr) => (
                <View key={index} style={styles.timelineItem}>
                  <View style={styles.timelineDot} />
                  {index !== arr.length - 1 && <View style={styles.timelineLine} />}
                  <Text style={styles.itemTitle}>{project.title?.trim()}</Text>
                  <Text style={styles.projectDescription}>{project.description?.trim()}</Text>
                  {(project.technologies || project.technologiesUsed) && (
                    <View style={styles.techContainer}>
                      {(project.technologies || project.technologiesUsed).filter(hasContent).map((tech, techIdx) => (
                        <Text key={techIdx} style={styles.techTag}>{tech.trim()}</Text>
                      ))}
                    </View>
                  )}
                </View>
              ))}
            </View>
          )}

          {userdata.education.some(edu => hasContent(edu.degree) || hasContent(edu.institution)) && (
            <View style={styles.mainSection}>
              <Text style={styles.sectionHeading}>Education</Text>
              {userdata.education.filter(edu => hasContent(edu.degree) || hasContent(edu.institution)).map((edu, index, arr) => (
                <View key={index} style={styles.timelineItem}>
                  <View style={styles.timelineDot} />
                  {index !== arr.length - 1 && <View style={styles.timelineLine} />}
                  <View style={styles.itemHeader}>
                    <Text style={styles.itemTitle}>{edu.degree?.trim()}</Text>
                    <Text style={styles.itemPeriod}>{edu.graduationYear?.trim()}</Text>
                  </View>
                  <Text style={styles.itemSubtitle}>{edu.institution?.trim()}</Text>
                </View>
              ))}
            </View>
          )}
        </View>
      </Page>
    </Document>
  );
}