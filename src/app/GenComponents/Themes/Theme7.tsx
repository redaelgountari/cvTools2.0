import React from 'react';
import { Document, Page, Text, View, StyleSheet, Font, Image } from '@react-pdf/renderer';
import { Resume } from '@/app/types/resume';
import { DEFAULT_THEME_COLORS } from './themeDefaults';
import { hasContent } from './contentVerification';

export default function Theme7({ userdata, colors = DEFAULT_THEME_COLORS.theme7 }: { userdata: Resume, colors?: any }) {
  const styles = StyleSheet.create({
    page: {
      backgroundColor: colors.background || '#FFFFFF',
      fontFamily: 'Helvetica',
      padding: 0,
    },

    // Header Section
    header: {
      backgroundColor: colors.primary || '#2c3e50',
      padding: 25,
      paddingVertical: 28,
      alignItems: 'center',
    },
    headerContent: {
      alignItems: 'center',
      maxWidth: '80%',
    },
    profileImageContainer: {
      marginBottom: 12,
    },
    profileImage: {
      width: 70,
      height: 70,
      borderRadius: 35,
      borderWidth: 3,
      borderColor: '#ecf0f1',
      objectFit: 'cover',
    },
    name: {
      fontSize: 26,
      fontWeight: 'bold',
      color: '#FFFFFF',
      marginBottom: 6,
      letterSpacing: 1.5,
      textTransform: 'uppercase',
    },
    jobTitle: {
      fontSize: 12,
      color: '#ecf0f1',
      letterSpacing: 2.5,
      textTransform: 'uppercase',
      marginBottom: 12,
    },
    contactBar: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      flexWrap: 'wrap',
      gap: 12,
      marginTop: 6,
    },
    contactSeparator: {
      fontSize: 9,
      color: '#95a5a6',
      marginHorizontal: 8,
    },
    contactText: {
      fontSize: 8.5,
      color: '#bdc3c7',
    },

    // Main Layout
    mainLayout: {
      flexDirection: 'row',
    },

    // Left Column
    leftColumn: {
      width: '35%',
      backgroundColor: colors.sidebar || '#ecf0f1',
      padding: 30,
      paddingTop: 35,
    },
    leftSection: {
      marginBottom: 28,
    },
    leftSectionHeading: {
      fontSize: 11,
      fontWeight: 'bold',
      color: colors.primary || '#2c3e50',
      textTransform: 'uppercase',
      marginBottom: 12,
      letterSpacing: 1.2,
      paddingBottom: 6,
      borderBottomWidth: 2,
      borderBottomColor: colors.secondary || '#34495e',
    },
    skillItem: {
      fontSize: 9,
      color: colors.primary || '#2c3e50',
      marginBottom: 9,
      paddingLeft: 12,
      position: 'relative',
      lineHeight: 1.4,
    },
    skillBullet: {
      position: 'absolute',
      left: 0,
      top: 4,
      width: 4,
      height: 4,
      backgroundColor: colors.secondary || '#34495e',
      borderRadius: 2,
    },
    languageItem: {
      marginBottom: 10,
    },
    toolTag: {
      fontSize: 8,
      color: colors.primary || '#2c3e50',
      backgroundColor: '#bdc3c7',
      paddingVertical: 5,
      paddingHorizontal: 10,
      borderRadius: 4,
      marginBottom: 7,
      marginRight: 7,
    },
    toolsContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
    hobbyTag: {
      fontSize: 8,
      color: colors.primary || '#2c3e50',
      backgroundColor: '#d5dbdb',
      paddingVertical: 5,
      paddingHorizontal: 10,
      borderRadius: 12,
      marginBottom: 7,
      marginRight: 7,
    },

    // Right Column
    rightColumn: {
      width: '65%',
      padding: 35,
      paddingTop: 35,
    },
    section: {
      marginBottom: 26,
    },
    sectionHeading: {
      fontSize: 13,
      fontWeight: 'bold',
      color: colors.primary || '#2c3e50',
      textTransform: 'uppercase',
      marginBottom: 16,
      letterSpacing: 1.5,
      paddingBottom: 8,
      borderBottomWidth: 3,
      borderBottomColor: colors.secondary || '#34495e',
    },
    profileText: {
      fontSize: 9.5,
      color: colors.secondary || '#34495e',
      lineHeight: 1.7,
      textAlign: 'justify',
    },

    // Timeline Items
    timelineItem: {
      marginBottom: 20,
      paddingBottom: 18,
      borderBottomWidth: 1,
      borderBottomColor: colors.border || '#ecf0f1',
    },
    itemRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 6,
    },
    itemLeft: {
      flex: 1,
    },
    itemTitle: {
      fontSize: 11,
      fontWeight: 'bold',
      color: colors.primary || '#2c3e50',
      marginBottom: 4,
      lineHeight: 1.3,
    },
    itemSubtitle: {
      fontSize: 9.5,
      color: colors.secondary || '#34495e',
      marginBottom: 3,
    },
    itemLocation: {
      fontSize: 8.5,
      color: '#7f8c8d',
      marginTop: 2,
    },
    itemPeriod: {
      fontSize: 8.5,
      color: '#FFFFFF',
      backgroundColor: colors.secondary || '#34495e',
      paddingVertical: 4,
      paddingHorizontal: 10,
      borderRadius: 3,
      alignSelf: 'flex-start',
      fontWeight: 'bold',
      letterSpacing: 0.5,
    },
    bulletList: {
      marginTop: 8,
    },
    bulletItem: {
      fontSize: 9,
      color: colors.secondary || '#34495e',
      marginBottom: 6,
      paddingLeft: 14,
      position: 'relative',
      lineHeight: 1.6,
    },
    bullet: {
      position: 'absolute',
      left: 0,
      top: 1,
      fontSize: 7,
      color: colors.secondary || '#34495e',
    },

    // Projects
    projectDescription: {
      fontSize: 9,
      color: colors.secondary || '#34495e',
      marginBottom: 8,
      lineHeight: 1.6,
      marginTop: 4,
    },
    techContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      marginTop: 8,
    },
    techTag: {
      fontSize: 7.5,
      color: colors.primary || '#2c3e50',
      backgroundColor: '#ecf0f1',
      paddingVertical: 4,
      paddingHorizontal: 9,
      borderRadius: 3,
      marginRight: 6,
      marginBottom: 6,
      borderWidth: 1,
      borderColor: '#bdc3c7',
    },

    // Education
    educationItem: {
      marginBottom: 18,
      paddingBottom: 16,
      borderBottomWidth: 1,
      borderBottomColor: colors.border || '#ecf0f1',
    },
    educationRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
    },
    degreeTitle: {
      fontSize: 10.5,
      fontWeight: 'bold',
      color: colors.primary || '#2c3e50',
      marginBottom: 4,
      lineHeight: 1.3,
    },
    institutionName: {
      fontSize: 9.5,
      color: colors.secondary || '#34495e',
      marginBottom: 3,
    },
    educationYear: {
      fontSize: 8.5,
      color: '#FFFFFF',
      backgroundColor: colors.secondary || '#34495e',
      paddingVertical: 4,
      paddingHorizontal: 10,
      borderRadius: 3,
      alignSelf: 'flex-start',
      fontWeight: 'bold',
    },
  });

  const displayName = hasContent(userdata.personalInfo?.fullName) ? userdata.personalInfo.fullName.trim() : 'Your Name';
  const displayTitle = hasContent(userdata.experience?.[0]?.title) ? userdata.experience[0].title.trim() : 'Professional';
  const hasValidImage = userdata.image && userdata.image[0] && hasContent(userdata.image[0]);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <View style={styles.headerContent}>
            {hasValidImage && (
              <View style={styles.profileImageContainer}>
                <Image style={styles.profileImage} src={userdata.image[0]} />
              </View>
            )}

            <Text style={styles.name}>{displayName}</Text>
            <Text style={styles.jobTitle}>{displayTitle}</Text>

            <View style={styles.contactBar}>
              {hasContent(userdata.personalInfo?.phone) && (
                <>
                  <Text style={styles.contactText}>{userdata.personalInfo.phone.trim()}</Text>
                  <Text style={styles.contactSeparator}>•</Text>
                </>
              )}
              {hasContent(userdata.personalInfo?.email) && (
                <>
                  <Text style={styles.contactText}>{userdata.personalInfo.email.trim()}</Text>
                  <Text style={styles.contactSeparator}>•</Text>
                </>
              )}
              {hasContent(userdata.personalInfo?.location) && (
                <Text style={styles.contactText}>{userdata.personalInfo.location.trim()}</Text>
              )}
            </View>
          </View>
        </View>

        <View style={styles.mainLayout}>
          <View style={styles.leftColumn}>
            {userdata.skills.languages.some(hasContent) && (
              <View style={styles.leftSection}>
                <Text style={styles.leftSectionHeading}>Langues</Text>
                {userdata.skills.languages.filter(hasContent).map((language, index) => (
                  <View key={index}>
                    <View style={styles.skillBullet} />
                    <Text style={styles.skillItem}>{language.trim()}</Text>
                  </View>
                ))}
              </View>
            )}

            {userdata.skills.technical.some(hasContent) && (
              <View style={styles.leftSection}>
                <Text style={styles.leftSectionHeading}>Compétences Techniques</Text>
                {userdata.skills.technical.filter(hasContent).map((skill, index) => (
                  <View key={index}>
                    <View style={styles.skillBullet} />
                    <Text style={styles.skillItem}>{skill.trim()}</Text>
                  </View>
                ))}
              </View>
            )}

            {userdata.skills.soft.some(hasContent) && (
              <View style={styles.leftSection}>
                <Text style={styles.leftSectionHeading}>Soft Skills</Text>
                {userdata.skills.soft.filter(hasContent).map((skill, index) => (
                  <View key={index}>
                    <View style={styles.skillBullet} />
                    <Text style={styles.skillItem}>{skill.trim()}</Text>
                  </View>
                ))}
              </View>
            )}

            {userdata.tools.some(hasContent) && (
              <View style={styles.leftSection}>
                <Text style={styles.leftSectionHeading}>Outils</Text>
                <View style={styles.toolsContainer}>
                  {userdata.tools.filter(hasContent).map((tool, index) => (
                    <Text key={index} style={styles.toolTag}>{tool.trim()}</Text>
                  ))}
                </View>
              </View>
            )}

            {userdata.hobbies.some(hasContent) && (
              <View style={styles.leftSection}>
                <Text style={styles.leftSectionHeading}>Loisirs</Text>
                <View style={styles.toolsContainer}>
                  {userdata.hobbies.filter(hasContent).map((hobby, index) => (
                    <Text key={index} style={styles.hobbyTag}>{hobby.trim()}</Text>
                  ))}
                </View>
              </View>
            )}
          </View>

          <View style={styles.rightColumn}>
            {hasContent(userdata.professionalSummary) && (
              <View style={styles.section}>
                <Text style={styles.sectionHeading}>Profil Professionnel</Text>
                <Text style={styles.profileText}>{userdata.professionalSummary.trim()}</Text>
              </View>
            )}

            {userdata.experience.some(exp => hasContent(exp.title) || hasContent(exp.company)) && (
              <View style={styles.section}>
                <Text style={styles.sectionHeading}>Expérience Professionnelle</Text>
                {userdata.experience.filter(exp => hasContent(exp.title) || hasContent(exp.company)).map((exp, index) => (
                  <View key={index} style={styles.timelineItem}>
                    <View style={styles.itemRow}>
                      <View style={styles.itemLeft}>
                        <Text style={styles.itemTitle}>{exp.title?.trim()}</Text>
                        <Text style={styles.itemSubtitle}>{exp.company?.trim()}</Text>
                      </View>
                      <Text style={styles.itemPeriod}>
                        {[exp.startDate, exp.endDate].filter(hasContent).join(' - ') || (hasContent(exp.startDate) ? 'Présent' : '')}
                      </Text>
                    </View>

                    {exp.responsibilities && exp.responsibilities.some(hasContent) && (
                      <View style={styles.bulletList}>
                        {exp.responsibilities.filter(hasContent).map((responsibility, idx) => (
                          <View key={idx}>
                            <Text style={styles.bullet}>•</Text>
                            <Text style={styles.bulletItem}>{responsibility.trim()}</Text>
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
                <Text style={styles.sectionHeading}>Projets</Text>
                {userdata.projects.filter(p => hasContent(p.title) || hasContent(p.description)).map((project, index) => (
                  <View key={index} style={styles.timelineItem}>
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
              <View style={styles.section}>
                <Text style={styles.sectionHeading}>Formation</Text>
                {userdata.education.filter(edu => hasContent(edu.degree) || hasContent(edu.institution)).map((edu, index) => (
                  <View key={index} style={styles.educationItem}>
                    <View style={styles.educationRow}>
                      <View style={styles.itemLeft}>
                        <Text style={styles.degreeTitle}>{edu.degree?.trim()}</Text>
                        <Text style={styles.institutionName}>{edu.institution?.trim()}</Text>
                      </View>
                      <Text style={styles.educationYear}>{edu.graduationYear?.trim()}</Text>
                    </View>
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