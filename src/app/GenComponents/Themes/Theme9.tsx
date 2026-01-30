import React from 'react';
import { Document, Page, Text, View, StyleSheet, Font, Image } from '@react-pdf/renderer';
import { Resume } from '@/app/types/resume';
import { DEFAULT_THEME_COLORS } from './themeDefaults';
import { hasContent } from './contentVerification';

export default function Theme9({ userdata, colors = DEFAULT_THEME_COLORS.theme9 }: { userdata: Resume, colors?: any }) {
  const styles = StyleSheet.create({
    page: {
      flexDirection: 'row',
      backgroundColor: colors.background || '#FFFFFF',
      fontFamily: 'Helvetica',
    },

    // Sidebar
    sidebar: {
      width: '33%',
      backgroundColor: colors.secondary || '#1a1f36',
      padding: 0,
    },
    sidebarContent: {
      padding: 20,
      paddingTop: 28,
    },
    profileImageContainer: {
      width: '100%',
      alignItems: 'center',
      marginBottom: 22,
    },
    profileImage: {
      width: 90,
      height: 90,
      borderRadius: 45,
      borderWidth: 3,
      borderColor: colors.primary || '#4f46e5',
      objectFit: 'cover',
    },
    sidebarSection: {
      marginBottom: 20,
    },
    sidebarHeading: {
      fontSize: 9,
      fontWeight: 'bold',
      color: colors.accent || '#818cf8',
      textTransform: 'uppercase',
      marginBottom: 10,
      letterSpacing: 1.5,
      paddingBottom: 6,
      borderBottomWidth: 1.5,
      borderBottomColor: '#2d3347',
    },
    contactItem: {
      marginBottom: 9,
      flexDirection: 'row',
      alignItems: 'flex-start',
    },
    contactIcon: {
      width: 3.5,
      height: 3.5,
      backgroundColor: colors.accent || '#818cf8',
      borderRadius: 2,
      marginRight: 9,
      marginTop: 5,
    },
    contactText: {
      fontSize: 8.5,
      color: '#d1d5db',
      lineHeight: 1.5,
      flex: 1,
    },
    skillsGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 5,
    },
    skillTag: {
      fontSize: 7.5,
      color: '#e0e7ff',
      backgroundColor: '#312e81',
      paddingVertical: 4,
      paddingHorizontal: 9,
      borderRadius: 4,
      marginBottom: 5,
      marginRight: 5,
      borderWidth: 0.5,
      borderColor: colors.primary || '#4f46e5',
    },
    languageItem: {
      marginBottom: 9,
      paddingBottom: 7,
      borderBottomWidth: 0.5,
      borderBottomColor: '#2d3347',
      flexDirection: 'row',
      alignItems: 'center',
    },
    languageText: {
      fontSize: 8.5,
      color: '#d1d5db',
      marginLeft: 9,
    },
    toolItem: {
      fontSize: 8.5,
      color: '#d1d5db',
      marginBottom: 8,
      paddingLeft: 12,
      position: 'relative',
    },
    toolBullet: {
      position: 'absolute',
      left: 0,
      top: 5,
      width: 3.5,
      height: 3.5,
      backgroundColor: colors.accent || '#818cf8',
      borderRadius: 2,
    },
    hobbyItem: {
      fontSize: 7.5,
      color: '#e0e7ff',
      backgroundColor: '#2d3347',
      paddingVertical: 5,
      paddingHorizontal: 10,
      borderRadius: 10,
      marginBottom: 6,
      marginRight: 6,
    },

    // Main Content
    mainContent: {
      width: '67%',
      padding: 0,
    },
    headerSection: {
      backgroundColor: '#f8fafc',
      padding: 30,
      paddingVertical: 26,
      borderBottomWidth: 2,
      borderBottomColor: colors.primary || '#4f46e5',
    },
    name: {
      fontSize: 28,
      fontWeight: 'bold',
      color: '#111827',
      marginBottom: 6,
      letterSpacing: -0.5,
      lineHeight: 1.2,
    },
    jobTitle: {
      fontSize: 13,
      color: colors.primary || '#4f46e5',
      fontWeight: 'bold',
      marginBottom: 5,
      letterSpacing: 0.5,
    },
    locationText: {
      fontSize: 9.5,
      color: '#6b7280',
      marginTop: 2,
    },
    mainContentPadding: {
      padding: 26,
      paddingTop: 22,
    },
    mainSection: {
      marginBottom: 22,
    },
    sectionHeading: {
      fontSize: 12,
      fontWeight: 'bold',
      color: '#111827',
      textTransform: 'uppercase',
      marginBottom: 12,
      letterSpacing: 1.2,
      paddingBottom: 5,
      borderBottomWidth: 2,
      borderBottomColor: '#e5e7eb',
    },
    profileText: {
      fontSize: 9.5,
      color: '#4b5563',
      lineHeight: 1.65,
      textAlign: 'justify',
    },

    // Timeline
    timelineItem: {
      marginBottom: 16,
      paddingLeft: 18,
      position: 'relative',
    },
    timelineDot: {
      position: 'absolute',
      left: 0,
      top: 4,
      width: 7,
      height: 7,
      backgroundColor: colors.primary || '#4f46e5',
      borderRadius: 4,
      borderWidth: 1.5,
      borderColor: '#c7d2fe',
    },
    timelineLine: {
      position: 'absolute',
      left: 2.5,
      top: 11,
      width: 1.5,
      bottom: -16,
      backgroundColor: '#e5e7eb',
    },
    itemHeader: {
      marginBottom: 6,
    },
    itemTitle: {
      fontSize: 10.5,
      fontWeight: 'bold',
      color: '#111827',
      marginBottom: 3,
      lineHeight: 1.4,
    },
    itemSubtitle: {
      fontSize: 9.5,
      color: colors.primary || '#4f46e5',
      marginBottom: 3,
      fontWeight: 'bold',
    },
    itemLocation: {
      fontSize: 8.5,
      color: '#6b7280',
      marginBottom: 4,
    },
    itemPeriod: {
      fontSize: 8,
      color: '#FFFFFF',
      backgroundColor: colors.primary || '#4f46e5',
      paddingVertical: 3,
      paddingHorizontal: 9,
      borderRadius: 8,
      marginTop: 4,
      alignSelf: 'flex-start',
      fontWeight: 'bold',
    },
    bulletList: {
      marginTop: 6,
    },
    bulletItem: {
      fontSize: 9,
      color: '#4b5563',
      marginBottom: 5,
      paddingLeft: 12,
      position: 'relative',
      lineHeight: 1.6,
    },
    bullet: {
      position: 'absolute',
      left: 0,
      top: 0,
      fontSize: 8,
      color: colors.primary || '#4f46e5',
      fontWeight: 'bold',
    },
    projectDescription: {
      fontSize: 9,
      color: '#4b5563',
      marginBottom: 6,
      lineHeight: 1.6,
      marginTop: 3,
    },
    techContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      marginTop: 6,
    },
    techTag: {
      fontSize: 7,
      color: '#1e40af',
      backgroundColor: '#dbeafe',
      paddingVertical: 3,
      paddingHorizontal: 8,
      borderRadius: 4,
      marginRight: 5,
      marginBottom: 5,
      fontWeight: 'bold',
      borderWidth: 0.5,
      borderColor: '#93c5fd',
    },
    degreeTitle: {
      fontSize: 10.5,
      fontWeight: 'bold',
      color: '#111827',
      marginBottom: 3,
      lineHeight: 1.4,
    },
    institutionName: {
      fontSize: 9.5,
      color: colors.primary || '#4f46e5',
      marginBottom: 3,
      fontWeight: 'bold',
    },
  });

  const displayName = hasContent(userdata.personalInfo?.fullName) ? userdata.personalInfo.fullName.trim() : 'Your Name';
  const displayTitle = hasContent(userdata.jobSearchTitle) ? userdata.jobSearchTitle.trim() : (hasContent(userdata.personalInfo?.title) ? userdata.personalInfo?.title?.trim() : 'Professional');
  const hasValidImage = userdata.image && userdata.image[0] && hasContent(userdata.image[0]);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Sidebar */}
        <View style={styles.sidebar}>
          <View style={styles.sidebarContent}>
            {hasValidImage && (
              <View style={styles.profileImageContainer}>
                <Image style={styles.profileImage} src={userdata.image[0]} />
              </View>
            )}

            {/* Contact Section */}
            <View style={styles.sidebarSection}>
              <Text style={styles.sidebarHeading}>Contact</Text>
              {hasContent(userdata.personalInfo?.phone) && (
                <View style={styles.contactItem}>
                  <View style={styles.contactIcon} />
                  <Text style={styles.contactText}>{userdata.personalInfo.phone.trim()}</Text>
                </View>
              )}
              {hasContent(userdata.personalInfo?.email) && (
                <View style={styles.contactItem}>
                  <View style={styles.contactIcon} />
                  <Text style={styles.contactText}>{userdata.personalInfo.email.trim()}</Text>
                </View>
              )}
              {hasContent(userdata.personalInfo?.location) && (
                <View style={styles.contactItem}>
                  <View style={styles.contactIcon} />
                  <Text style={styles.contactText}>{userdata.personalInfo.location.trim()}</Text>
                </View>
              )}
            </View>

            {userdata.skills.technical.some(hasContent) && (
              <View style={styles.sidebarSection}>
                <Text style={styles.sidebarHeading}>Compétences</Text>
                <View style={styles.skillsGrid}>
                  {userdata.skills.technical.filter(hasContent).map((skill, index) => (
                    <Text key={index} style={styles.skillTag}>{skill.trim()}</Text>
                  ))}
                </View>
              </View>
            )}

            {userdata.skills.languages.some(hasContent) && (
              <View style={styles.sidebarSection}>
                <Text style={styles.sidebarHeading}>Langues</Text>
                {userdata.skills.languages.filter(hasContent).map((language, index) => (
                  <View key={index} style={styles.languageItem}>
                    <View style={styles.contactIcon} />
                    <Text style={styles.languageText}>{language.trim()}</Text>
                  </View>
                ))}
              </View>
            )}

            {userdata.tools.some(hasContent) && (
              <View style={styles.sidebarSection}>
                <Text style={styles.sidebarHeading}>Outils</Text>
                {userdata.tools.filter(hasContent).map((tool, index) => (
                  <View key={index}>
                    <View style={styles.toolBullet} />
                    <Text style={styles.toolItem}>{tool.trim()}</Text>
                  </View>
                ))}
              </View>
            )}
          </View>
        </View>

        {/* Main Content */}
        <View style={styles.mainContent}>
          <View style={styles.headerSection}>
            <Text style={styles.name}>{displayName}</Text>
            <Text style={styles.jobTitle}>{displayTitle}</Text>
          </View>

          <View style={styles.mainContentPadding}>
            {hasContent(userdata.professionalSummary) && (
              <View style={styles.mainSection}>
                <Text style={styles.sectionHeading}>Profil Professionnel</Text>
                <Text style={styles.profileText}>{userdata.professionalSummary.trim()}</Text>
              </View>
            )}

            {userdata.experience.some(exp => hasContent(exp.title) || hasContent(exp.company)) && (
              <View style={styles.mainSection}>
                <Text style={styles.sectionHeading}>Expérience Professionnelle</Text>
                {userdata.experience.filter(exp => hasContent(exp.title) || hasContent(exp.company)).map((exp, index, arr) => (
                  <View key={index} style={styles.timelineItem}>
                    <View style={styles.timelineDot} />
                    {index !== arr.length - 1 && <View style={styles.timelineLine} />}
                    <View style={styles.itemHeader}>
                      <Text style={styles.itemTitle}>{exp.title?.trim()}</Text>
                      <Text style={styles.itemSubtitle}>{exp.company?.trim()}</Text>
                      <Text style={styles.itemPeriod}>
                        {[exp.startDate, exp.endDate].filter(hasContent).join(' - ') || (hasContent(exp.startDate) ? 'Présent' : '')}
                      </Text>
                    </View>
                    {exp.responsibilities && exp.responsibilities.some(hasContent) && (
                      <View style={styles.bulletList}>
                        {exp.responsibilities.filter(hasContent).map((resp, idx) => (
                          <View key={idx}>
                            <Text style={styles.bullet}>▸</Text>
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
                <Text style={styles.sectionHeading}>Projets</Text>
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
                <Text style={styles.sectionHeading}>Formation</Text>
                {userdata.education.filter(edu => hasContent(edu.degree) || hasContent(edu.institution)).map((edu, index, arr) => (
                  <View key={index} style={styles.timelineItem}>
                    <View style={styles.timelineDot} />
                    {index !== arr.length - 1 && <View style={styles.timelineLine} />}
                    <Text style={styles.degreeTitle}>{edu.degree?.trim()}</Text>
                    <Text style={styles.institutionName}>{edu.institution?.trim()}</Text>
                    <Text style={styles.itemPeriod}>{edu.graduationYear?.trim()}</Text>
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