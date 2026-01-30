import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import { Resume } from '@/app/types/resume';
import { DEFAULT_THEME_COLORS } from './themeDefaults';
import { hasContent } from './contentVerification';

export default function Theme3({ userdata, userImage, colors = DEFAULT_THEME_COLORS.theme3 }: { userdata: Resume, userImage?: any, colors?: any }) {
  const styles = StyleSheet.create({
    page: {
      backgroundColor: colors.white || '#ffffff',
      fontFamily: 'Helvetica',
    },

    // Top Header Band
    topBand: {
      backgroundColor: colors.primary,
      height: 8,
    },

    // Main Header
    headerContainer: {
      paddingHorizontal: 45,
      paddingVertical: 32,
      backgroundColor: colors.white || '#ffffff',
    },
    headerTop: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 16,
    },
    profileImageWrapper: {
      marginRight: 22,
    },
    profileImage: {
      width: 95,
      height: 95,
      borderRadius: 48,
      border: `4px solid ${colors.gold || '#e94560'}`,
      objectFit: 'cover',
    },
    headerInfo: {
      flex: 1,
    },
    fullName: {
      fontSize: 32,
      fontFamily: 'Helvetica-Bold',
      color: colors.primary,
      marginBottom: 6,
      letterSpacing: 0.5,
    },
    jobTitleHeader: {
      fontSize: 13,
      color: colors.gold || '#e94560',
      letterSpacing: 2,
      textTransform: 'uppercase',
      fontFamily: 'Helvetica-Bold',
    },
    contactGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 16,
      marginTop: 14,
      paddingTop: 14,
      borderTopWidth: 1,
      borderTopColor: colors.border || '#e8e8f0',
    },
    contactColumn: {
      flexDirection: 'row',
      alignItems: 'center',
      minWidth: '23%',
    },
    contactDot: {
      width: 5,
      height: 5,
      backgroundColor: colors.gold || '#e94560',
      borderRadius: 3,
      marginRight: 8,
    },
    contactTextSmall: {
      fontSize: 8.5,
      color: colors.accent || '#666666',
    },

    // Content Layout
    contentWrapper: {
      flexDirection: 'row',
      paddingHorizontal: 45,
      paddingTop: 28,
      paddingBottom: 40,
    },

    // Main Content (Left - Wider)
    mainColumn: {
      width: '67%',
      paddingRight: 28,
    },

    // Sidebar (Right - Narrower)
    sidebarColumn: {
      width: '33%',
      paddingLeft: 28,
      borderLeftWidth: 1,
      borderLeftColor: colors.border || '#e8e8f0',
    },

    // Section Styles
    sectionBlock: {
      marginBottom: 26,
    },
    sectionHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 14,
    },
    sectionAccent: {
      width: 4,
      height: 16,
      backgroundColor: colors.gold || '#e94560',
      marginRight: 10,
    },
    sectionTitle: {
      fontSize: 11.5,
      fontFamily: 'Helvetica-Bold',
      color: colors.primary,
      textTransform: 'uppercase',
      letterSpacing: 1.5,
    },

    // Professional Summary
    summaryText: {
      fontSize: 9.5,
      lineHeight: 1.7,
      color: colors.accent || '#666666',
      textAlign: 'justify',
    },

    // Experience Items
    experienceEntry: {
      marginBottom: 20,
      paddingBottom: 18,
      borderBottomWidth: 1,
      borderBottomColor: colors.border || '#e8e8f0',
    },
    experienceHeader: {
      marginBottom: 8,
    },
    positionTitle: {
      fontSize: 11,
      fontFamily: 'Helvetica-Bold',
      color: colors.primary,
      marginBottom: 4,
      lineHeight: 1.3,
    },
    companyRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'baseline',
      marginBottom: 3,
    },
    companyName: {
      fontSize: 9.5,
      color: colors.accent || '#666666',
      fontFamily: 'Helvetica-Bold',
    },
    dateRangeText: {
      fontSize: 8.5,
      color: colors.accent || '#666666',
      fontStyle: 'italic',
    },
    locationText: {
      fontSize: 8.5,
      color: colors.accent || '#666666',
    },
    responsibilitiesList: {
      marginTop: 8,
    },
    responsibilityRow: {
      flexDirection: 'row',
      marginBottom: 5,
    },
    responsibilityBullet: {
      width: 4,
      height: 4,
      backgroundColor: colors.gold || '#e94560',
      borderRadius: 2,
      marginRight: 10,
      marginTop: 5,
    },
    responsibilityText: {
      fontSize: 9,
      lineHeight: 1.6,
      color: colors.accent || '#666666',
      flex: 1,
    },

    // Education Items
    educationEntry: {
      marginBottom: 16,
    },
    degreeText: {
      fontSize: 10,
      fontFamily: 'Helvetica-Bold',
      color: colors.primary,
      marginBottom: 3,
      lineHeight: 1.3,
    },
    institutionText: {
      fontSize: 9,
      color: colors.accent || '#666666',
      marginBottom: 2,
    },
    yearText: {
      fontSize: 8,
      color: colors.accent || '#666666',
    },

    // Projects
    projectEntry: {
      marginBottom: 18,
    },
    projectTitle: {
      fontSize: 10,
      fontFamily: 'Helvetica-Bold',
      color: colors.primary,
      marginBottom: 5,
    },
    projectDescription: {
      fontSize: 9,
      lineHeight: 1.6,
      color: colors.accent || '#666666',
      marginBottom: 6,
    },
    techTagsContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 6,
    },
    techTag: {
      fontSize: 7.5,
      color: colors.primary,
      backgroundColor: colors.background || '#fafafa',
      paddingVertical: 4,
      paddingHorizontal: 9,
      borderRadius: 3,
      borderWidth: 1,
      borderColor: colors.border || '#e8e8f0',
    },

    // Sidebar Sections
    sidebarSection: {
      marginBottom: 24,
    },
    sidebarTitle: {
      fontSize: 10,
      fontFamily: 'Helvetica-Bold',
      color: colors.primary,
      textTransform: 'uppercase',
      marginBottom: 12,
      letterSpacing: 1.2,
      paddingBottom: 6,
      borderBottomWidth: 2,
      borderBottomColor: colors.gold || '#e94560',
    },

    // Skills
    skillCategory: {
      marginBottom: 14,
    },
    skillCategoryTitle: {
      fontSize: 9,
      fontFamily: 'Helvetica-Bold',
      color: colors.primary,
      marginBottom: 6,
      textTransform: 'uppercase',
      letterSpacing: 0.8,
    },
    skillItem: {
      fontSize: 8.5,
      color: colors.accent || '#666666',
      marginBottom: 4,
      paddingLeft: 10,
      lineHeight: 1.4,
    },
    skillBullet: {
      position: 'absolute',
      left: 0,
      top: 4,
      width: 3,
      height: 3,
      backgroundColor: colors.gold || '#e94560',
      borderRadius: 2,
    },

    // Languages
    languageRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 7,
      paddingBottom: 6,
      borderBottomWidth: 1,
      borderBottomColor: colors.border || '#e8e8f0',
    },
    languageNameText: {
      fontSize: 8.5,
      color: colors.primary,
      fontFamily: 'Helvetica-Bold',
    },
    languageLevelText: {
      fontSize: 7.5,
      color: colors.accent || '#666666',
    },

    // Tools/Hobbies Tags
    tagContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 6,
    },
    tag: {
      fontSize: 7.5,
      color: colors.primary,
      backgroundColor: colors.background || '#fafafa',
      paddingVertical: 5,
      paddingHorizontal: 10,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: colors.border || '#e8e8f0',
    },

    // Certifications
    certificationEntry: {
      marginBottom: 14,
    },
    certName: {
      fontSize: 9,
      fontFamily: 'Helvetica-Bold',
      color: colors.primary,
      marginBottom: 3,
    },
    certIssuer: {
      fontSize: 8.5,
      color: colors.accent || '#666666',
      marginBottom: 2,
    },
    certYear: {
      fontSize: 7.5,
      color: colors.accent || '#666666',
    },
  });

  const displayName = hasContent(userdata.personalInfo?.fullName) ? userdata.personalInfo.fullName.trim() : 'Your Name';
  const displayTitle = hasContent(userdata.jobSearchTitle) ? userdata.jobSearchTitle.trim() : (hasContent(userdata.personalInfo?.title) ? userdata.personalInfo.title.trim() : '');

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Top Accent Band */}
        <View style={styles.topBand} />

        {/* Header Section */}
        <View style={styles.headerContainer}>
          <View style={styles.headerTop}>
            {userdata.image && userdata.image[0] && hasContent(userdata.image[0]) && (
              <View style={styles.profileImageWrapper}>
                <Image style={styles.profileImage} src={userdata.image[0]} />
              </View>
            )}

            <View style={styles.headerInfo}>
              <Text style={styles.fullName}>{displayName}</Text>
              <Text style={styles.jobTitleHeader}>
                {displayTitle}
              </Text>
            </View>
          </View>

          <View style={styles.contactGrid}>
            {hasContent(userdata.personalInfo.email) && (
              <View style={styles.contactColumn}>
                <View style={styles.contactDot} />
                <Text style={styles.contactTextSmall}>{userdata.personalInfo.email.trim()}</Text>
              </View>
            )}
            {hasContent(userdata.personalInfo.phone) && (
              <View style={styles.contactColumn}>
                <View style={styles.contactDot} />
                <Text style={styles.contactTextSmall}>{userdata.personalInfo.phone.trim()}</Text>
              </View>
            )}
            {hasContent(userdata.personalInfo.location) && (
              <View style={styles.contactColumn}>
                <View style={styles.contactDot} />
                <Text style={styles.contactTextSmall}>{userdata.personalInfo.location.trim()}</Text>
              </View>
            )}
            {hasContent(userdata.personalInfo.linkedin) && (
              <View style={styles.contactColumn}>
                <View style={styles.contactDot} />
                <Text style={styles.contactTextSmall}>{userdata.personalInfo.linkedin.trim()}</Text>
              </View>
            )}
            {hasContent(userdata.personalInfo.website) && (
              <View style={styles.contactColumn}>
                <View style={styles.contactDot} />
                <Text style={styles.contactTextSmall}>{userdata.personalInfo.website.trim()}</Text>
              </View>
            )}
            {hasContent(userdata.personalInfo.github) && (
              <View style={styles.contactColumn}>
                <View style={styles.contactDot} />
                <Text style={styles.contactTextSmall}>{userdata.personalInfo.github.trim()}</Text>
              </View>
            )}
          </View>
        </View>

        {/* Main Content Area */}
        <View style={styles.contentWrapper}>
          {/* Main Column (Left - Wider) */}
          <View style={styles.mainColumn}>
            {/* Professional Summary */}
            {hasContent(userdata.professionalSummary) && (
              <View style={styles.sectionBlock}>
                <View style={styles.sectionHeader}>
                  <View style={styles.sectionAccent} />
                  <Text style={styles.sectionTitle}>Profil Professionnel</Text>
                </View>
                <Text style={styles.summaryText}>{userdata.professionalSummary.trim()}</Text>
              </View>
            )}

            {/* Work Experience */}
            {userdata.experience.length > 0 && userdata.experience.some(exp => hasContent(exp.title) || hasContent(exp.company)) && (
              <View style={styles.sectionBlock}>
                <View style={styles.sectionHeader}>
                  <View style={styles.sectionAccent} />
                  <Text style={styles.sectionTitle}>Expérience Professionnelle</Text>
                </View>
                {userdata.experience.map((exp, index) => (hasContent(exp.title) || hasContent(exp.company)) && (
                  <View key={index} style={styles.experienceEntry}>
                    <View style={styles.experienceHeader}>
                      <Text style={styles.positionTitle}>{exp.title?.trim()}</Text>
                      <View style={styles.companyRow}>
                        <Text style={styles.companyName}>{exp.company?.trim()}</Text>
                        <Text style={styles.dateRangeText}>
                          {[exp.startDate, exp.endDate].filter(hasContent).join(' - ') || (hasContent(exp.startDate) ? 'Présent' : '')}
                        </Text>
                      </View>
                      {hasContent(exp.location) && (
                        <Text style={styles.locationText}>📍 {exp.location.trim()}</Text>
                      )}
                    </View>

                    {exp.responsibilities && exp.responsibilities.length > 0 && exp.responsibilities.some(hasContent) && (
                      <View style={styles.responsibilitiesList}>
                        {exp.responsibilities.filter(hasContent).map((resp, idx) => (
                          <View key={idx} style={styles.responsibilityRow}>
                            <View style={styles.responsibilityBullet} />
                            <Text style={styles.responsibilityText}>{resp.trim()}</Text>
                          </View>
                        ))}
                      </View>
                    )}
                  </View>
                ))}
              </View>
            )}

            {/* Projects */}
            {userdata.projects.length > 0 && userdata.projects.some(p => hasContent(p.title) || hasContent(p.description)) && (
              <View style={styles.sectionBlock}>
                <View style={styles.sectionHeader}>
                  <View style={styles.sectionAccent} />
                  <Text style={styles.sectionTitle}>Projets</Text>
                </View>
                {userdata.projects.map((project, index) => (hasContent(project.title) || hasContent(project.description)) && (
                  <View key={index} style={styles.projectEntry}>
                    <Text style={styles.projectTitle}>{project.title?.trim()}</Text>
                    {hasContent(project.role) && (
                      <Text style={styles.companyName}>{project.role.trim()}</Text>
                    )}
                    <Text style={styles.projectDescription}>{project.description?.trim()}</Text>

                    {project.technologiesUsed && project.technologiesUsed.length > 0 && project.technologiesUsed.some(hasContent) && (
                      <View style={styles.techTagsContainer}>
                        {project.technologiesUsed.filter(hasContent).map((tech, techIdx) => (
                          <Text key={techIdx} style={styles.techTag}>{tech.trim()}</Text>
                        ))}
                      </View>
                    )}
                  </View>
                ))}
              </View>
            )}

            {/* Education */}
            {userdata.education.length > 0 && userdata.education.some(edu => hasContent(edu.degree) || hasContent(edu.institution)) && (
              <View style={styles.sectionBlock}>
                <View style={styles.sectionHeader}>
                  <View style={styles.sectionAccent} />
                  <Text style={styles.sectionTitle}>Formation</Text>
                </View>
                {userdata.education.map((edu, index) => (hasContent(edu.degree) || hasContent(edu.institution)) && (
                  <View key={index} style={styles.educationEntry}>
                    <Text style={styles.degreeText}>{edu.degree?.trim()}</Text>
                    <Text style={styles.institutionText}>{edu.institution?.trim()}</Text>
                    {hasContent(edu.location) && (
                      <Text style={styles.locationText}>📍 {edu.location.trim()}</Text>
                    )}
                    {hasContent(edu.graduationYear) && (
                      <Text style={styles.yearText}>{edu.graduationYear.trim()}</Text>
                    )}
                  </View>
                ))}
              </View>
            )}
          </View>

          {/* Sidebar Column (Right - Narrower) */}
          <View style={styles.sidebarColumn}>
            {/* Languages */}
            {userdata.skills.languages && userdata.skills.languages.length > 0 && userdata.skills.languages.some(hasContent) && (
              <View style={styles.sidebarSection}>
                <Text style={styles.sidebarTitle}>Langues</Text>
                {userdata.skills.languages.filter(hasContent).map((language, index) => (
                  <View key={index} style={styles.languageRow}>
                    <Text style={styles.languageNameText}>{language.trim()}</Text>
                  </View>
                ))}
              </View>
            )}

            {/* Skills */}
            {userdata.skills.technical && userdata.skills.technical.length > 0 && userdata.skills.technical.some(hasContent) && (
              <View style={styles.sidebarSection}>
                <Text style={styles.sidebarTitle}>Compétences</Text>
                <View style={styles.skillCategory}>
                  {userdata.skills.technical.filter(hasContent).map((skill, index) => (
                    <View key={index}>
                      <View style={styles.skillBullet} />
                      <Text style={styles.skillItem}>{skill.trim()}</Text>
                    </View>
                  ))}
                </View>
              </View>
            )}

            {/* Tools */}
            {userdata.tools && userdata.tools.length > 0 && userdata.tools.some(hasContent) && (
              <View style={styles.sidebarSection}>
                <Text style={styles.sidebarTitle}>Outils</Text>
                <View style={styles.tagContainer}>
                  {userdata.tools.filter(hasContent).map((tool, index) => (
                    <Text key={index} style={styles.tag}>{tool.trim()}</Text>
                  ))}
                </View>
              </View>
            )}

            {/* Certifications */}
            {userdata.certifications && userdata.certifications.length > 0 && userdata.certifications.some(c => hasContent(c.name)) && (
              <View style={styles.sidebarSection}>
                <Text style={styles.sidebarTitle}>Certifications</Text>
                {userdata.certifications.filter(c => hasContent(c.name)).map((cert, index) => (
                  <View key={index} style={styles.certificationEntry}>
                    <Text style={styles.certName}>{cert.name.trim()}</Text>
                    {hasContent(cert.issuer) && <Text style={styles.certIssuer}>{cert.issuer.trim()}</Text>}
                    {hasContent(cert.year) && <Text style={styles.certYear}>{cert.year.trim()}</Text>}
                  </View>
                ))}
              </View>
            )}

            {/* Hobbies */}
            {userdata.hobbies && userdata.hobbies.length > 0 && userdata.hobbies.some(hasContent) && (
              <View style={styles.sidebarSection}>
                <Text style={styles.sidebarTitle}>Loisirs</Text>
                <View style={styles.tagContainer}>
                  {userdata.hobbies.filter(hasContent).map((hobby, index) => (
                    <Text key={index} style={styles.tag}>{hobby.trim()}</Text>
                  ))}
                </View>
              </View>
            )}
          </View>
        </View>
      </Page>
    </Document>
  );
}