import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import { Resume } from '@/app/types/resume';
import { DEFAULT_THEME_COLORS } from './themeDefaults';
import { hasContent } from './contentVerification';

// ======= MAIN COMPONENT =======
export default function Theme6({
  userdata,
  colors = DEFAULT_THEME_COLORS.theme6
}: {
  userdata: Resume;
  colors?: any
}) {
  const styles = StyleSheet.create({
    page: {
      padding: 0,
      fontFamily: 'Helvetica',
      backgroundColor: colors.white || '#FFFFFF',
      fontSize: 9,
    },

    // Header styles
    header: {
      flexDirection: 'row',
      paddingTop: 28,
      paddingBottom: 20,
      paddingHorizontal: 36,
      borderBottomWidth: 1.5,
      borderBottomColor: colors.border || '#CFD8DC',
      alignItems: 'center',
      backgroundColor: colors.background || '#F8FAFB',
    },
    photoContainer: {
      width: 85,
      height: 85,
      marginRight: 20,
      borderRadius: 43,
      overflow: 'hidden',
      borderWidth: 2.5,
      borderColor: colors.primary || '#0F4C81',
    },
    photo: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
    },
    nameAndTitle: {
      flex: 1,
      justifyContent: 'center',
    },
    name: {
      fontSize: 26,
      fontFamily: 'Helvetica-Bold',
      color: colors.primary || '#0F4C81',
      marginBottom: 5,
      textTransform: 'uppercase',
      letterSpacing: 2,
      lineHeight: 1.1,
    },
    jobTitle: {
      fontSize: 10.5,
      color: colors.text || '#37474F',
      textTransform: 'uppercase',
      letterSpacing: 1.1,
      fontFamily: 'Helvetica',
    },
    contactInfo: {
      justifyContent: 'flex-start',
      alignItems: 'flex-end',
      paddingTop: 2,
    },
    contactItem: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 4.5,
    },
    contactText: {
      fontSize: 9,
      color: colors.text || '#37474F',
    },

    // Layout
    mainContent: {
      flexDirection: 'row',
    },
    leftColumn: {
      width: '35%',
      paddingTop: 26,
      paddingLeft: 36,
      paddingRight: 20,
      paddingBottom: 32,
      backgroundColor: colors.background || '#F8FAFB',
    },
    rightColumn: {
      width: '65%',
      paddingTop: 26,
      paddingLeft: 26,
      paddingRight: 36,
      paddingBottom: 32,
      backgroundColor: colors.white || '#FFFFFF',
    },

    // Section styles
    section: {
      marginBottom: 22,
    },
    sectionTitle: {
      fontSize: 10,
      fontFamily: 'Helvetica-Bold',
      color: colors.primary || '#0F4C81',
      textTransform: 'uppercase',
      marginBottom: 11,
      letterSpacing: 1.2,
      paddingBottom: 5,
      borderBottomWidth: 2,
      borderBottomColor: colors.primary || '#0F4C81',
    },

    // Profile/Summary
    profileText: {
      fontSize: 9,
      lineHeight: 1.65,
      color: colors.text || '#37474F',
      textAlign: 'justify',
      fontFamily: 'Helvetica',
    },

    // Education styles
    educationItem: {
      marginBottom: 13,
    },
    degree: {
      fontSize: 9.5,
      fontFamily: 'Helvetica-Bold',
      color: colors.primary || '#0F4C81',
      marginBottom: 3,
      letterSpacing: 0.2,
      lineHeight: 1.3,
    },
    institution: {
      fontSize: 9,
      color: colors.text || '#37474F',
      marginBottom: 2,
      fontFamily: 'Helvetica',
      lineHeight: 1.3,
    },
    eduYear: {
      fontSize: 8,
      color: '#546E7A',
      fontFamily: 'Helvetica',
    },

    // Skills styles
    skillsList: {
      marginBottom: 11,
    },
    skillsSubtitle: {
      fontSize: 9,
      fontFamily: 'Helvetica-Bold',
      color: colors.secondary || '#1E88E5',
      marginBottom: 7,
      textTransform: 'uppercase',
      letterSpacing: 0.5,
    },
    skillItem: {
      fontSize: 9,
      color: colors.text || '#37474F',
      marginBottom: 3.5,
      paddingLeft: 8,
      fontFamily: 'Helvetica',
      lineHeight: 1.35,
    },

    // Languages
    languageItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 5,
      paddingLeft: 8,
      alignItems: 'center',
    },
    languageName: {
      fontSize: 9,
      color: colors.text || '#37474F',
      fontFamily: 'Helvetica-Bold',
    },
    languageLevel: {
      fontSize: 7.5,
      color: '#546E7A',
      fontStyle: 'italic',
    },

    // Experience styles
    experienceItem: {
      marginBottom: 18,
    },
    expTitle: {
      fontSize: 10,
      fontFamily: 'Helvetica-Bold',
      color: colors.primary || '#0F4C81',
      marginBottom: 3,
      letterSpacing: 0.3,
      lineHeight: 1.25,
    },
    companyLine: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 2,
      alignItems: 'baseline',
    },
    companyName: {
      fontSize: 9,
      color: colors.text || '#37474F',
      fontStyle: 'italic',
      flex: 1,
    },
    dateRange: {
      fontSize: 9,
      color: '#546E7A',
      marginLeft: 10,
      fontFamily: 'Helvetica-Bold',
    },

    // Bullet list
    bulletList: {
      marginTop: 6,
    },
    bulletItem: {
      flexDirection: 'row',
      marginBottom: 3.5,
    },
    bullet: {
      fontSize: 9,
      color: colors.primary || '#0F4C81',
      marginRight: 7,
      width: 6,
      fontFamily: 'Helvetica-Bold',
    },
    bulletText: {
      fontSize: 9,
      color: colors.text || '#37474F',
      lineHeight: 1.55,
      flex: 1,
      fontFamily: 'Helvetica',
    },

    // Expertise/Skills list
    expertiseList: {
      marginTop: 0,
    },
    expertiseItem: {
      flexDirection: 'row',
      marginBottom: 4,
    },
    expertiseBullet: {
      fontSize: 9,
      marginRight: 7,
      color: colors.primary || '#0F4C81',
      width: 6,
      fontFamily: 'Helvetica-Bold',
    },
    expertiseText: {
      fontSize: 9,
      color: colors.text || '#37474F',
      lineHeight: 1.45,
      flex: 1,
    },

    // Certifications
    certificationItem: {
      marginBottom: 13,
    },
    certName: {
      fontSize: 9.5,
      fontFamily: 'Helvetica-Bold',
      color: colors.primary || '#0F4C81',
      marginBottom: 3,
      letterSpacing: 0.2,
      lineHeight: 1.3,
    },
    certIssuer: {
      fontSize: 9,
      color: colors.text || '#37474F',
      marginBottom: 2,
    },
    certYear: {
      fontSize: 8,
      color: '#546E7A',
    },

    // Projects
    projectTech: {
      fontSize: 8,
      color: '#546E7A',
      marginTop: 4,
      fontStyle: 'italic',
    },
  });

  const displayName = hasContent(userdata.personalInfo?.fullName) ? userdata.personalInfo.fullName.trim() : 'Your Name';
  const displayTitle = hasContent(userdata.experience?.[0]?.title) ? userdata.experience[0].title.trim() : 'Professional';
  const hasValidImage = userdata.image && userdata.image[0] && hasContent(userdata.image[0]);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          {hasValidImage && (
            <View style={styles.photoContainer}>
              <Image style={styles.photo} src={userdata.image[0]} />
            </View>
          )}
          <View style={styles.nameAndTitle}>
            <Text style={styles.name}>{displayName}</Text>
            <Text style={styles.jobTitle}>{displayTitle}</Text>
          </View>
          <View style={styles.contactInfo}>
            {hasContent(userdata.personalInfo?.email) && (
              <View style={styles.contactItem}>
                <Text style={styles.contactText}>{userdata.personalInfo.email.trim()}</Text>
              </View>
            )}
            {hasContent(userdata.personalInfo?.phone) && (
              <View style={styles.contactItem}>
                <Text style={styles.contactText}>{userdata.personalInfo.phone.trim()}</Text>
              </View>
            )}
            {hasContent(userdata.personalInfo?.location) && (
              <View style={styles.contactItem}>
                <Text style={styles.contactText}>{userdata.personalInfo.location.trim()}</Text>
              </View>
            )}
          </View>
        </View>

        <View style={styles.mainContent}>
          {/* Left Column */}
          <View style={styles.leftColumn}>
            {/* Profile */}
            {hasContent(userdata.professionalSummary) && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>PROFIL</Text>
                <Text style={styles.profileText}>{userdata.professionalSummary.trim()}</Text>
              </View>
            )}

            {/* Languages */}
            {userdata.skills.languages.some(hasContent) && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>LANGUES</Text>
                {userdata.skills.languages.filter(hasContent).map((lang, index) => (
                  <View key={`lang-${index}`} style={styles.languageItem}>
                    <Text style={styles.languageName}>{lang.trim()}</Text>
                  </View>
                ))}
              </View>
            )}

            {/* Certifications */}
            {userdata.certifications.some(cert => hasContent(cert.name)) && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>CERTIFICATIONS</Text>
                {userdata.certifications.filter(cert => hasContent(cert.name)).map((cert, index) => (
                  <View key={`cert-${index}`} style={styles.certificationItem}>
                    <Text style={styles.certName}>{cert.name.trim()}</Text>
                    <Text style={styles.certIssuer}>{cert.issuer?.trim() || ''}</Text>
                    <Text style={styles.certYear}>{cert.year?.trim() || ''}</Text>
                  </View>
                ))}
              </View>
            )}

            {/* Skills */}
            {(userdata.tools.some(hasContent) || userdata.skills.technical.some(hasContent)) && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>COMPÉTENCES</Text>
                <View style={styles.skillsList}>
                  {[...userdata.tools, ...userdata.skills.technical].filter(hasContent).map((tool, index) => (
                    <Text key={`tool-${index}`} style={styles.skillItem}>• {tool.trim()}</Text>
                  ))}
                </View>
              </View>
            )}

            {/* Expertise */}
            {userdata.skills.soft.some(hasContent) && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>EXPERTISE</Text>
                <View style={styles.expertiseList}>
                  {userdata.skills.soft.filter(hasContent).map((skill, index) => (
                    <View key={`soft-${index}`} style={styles.expertiseItem}>
                      <Text style={styles.expertiseBullet}>•</Text>
                      <Text style={styles.expertiseText}>{skill.trim()}</Text>
                    </View>
                  ))}
                </View>
              </View>
            )}
          </View>

          {/* Right Column */}
          <View style={styles.rightColumn}>
            {/* Experience */}
            {userdata.experience.some(exp => hasContent(exp.title) || hasContent(exp.company)) && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>EXPÉRIENCE PROFESSIONNELLE</Text>
                {userdata.experience.filter(exp => hasContent(exp.title) || hasContent(exp.company)).map((exp, index) => (
                  <View key={`exp-${index}`} style={styles.experienceItem}>
                    <Text style={styles.expTitle}>{exp.title?.trim()}</Text>
                    <View style={styles.companyLine}>
                      <Text style={styles.companyName}>
                        {[exp.company, exp.location].filter(hasContent).join(', ')}
                      </Text>
                      <Text style={styles.dateRange}>
                        {[exp.startDate, exp.endDate].filter(hasContent).join(' - ') || (hasContent(exp.startDate) ? 'Présent' : '')}
                      </Text>
                    </View>

                    {exp.responsibilities && exp.responsibilities.some(hasContent) && (
                      <View style={styles.bulletList}>
                        {exp.responsibilities.filter(hasContent).map((resp, idx) => (
                          <View key={`resp-${idx}`} style={styles.bulletItem}>
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

            {/* Education */}
            {userdata.education.some(edu => hasContent(edu.degree) || hasContent(edu.institution)) && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>FORMATION</Text>
                {userdata.education.filter(edu => hasContent(edu.degree) || hasContent(edu.institution)).map((edu, index) => (
                  <View key={`edu-${index}`} style={styles.educationItem}>
                    <Text style={styles.degree}>{edu.degree?.trim()}</Text>
                    <Text style={styles.institution}>{edu.institution?.trim()}</Text>
                    <Text style={styles.eduYear}>{edu.graduationYear?.trim()}</Text>
                  </View>
                ))}
              </View>
            )}

            {/* Projects */}
            {userdata.projects && userdata.projects.some(p => hasContent(p.title) || hasContent(p.description)) && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>PROJETS NOTABLES</Text>
                {userdata.projects.filter(p => hasContent(p.title) || hasContent(p.description)).map((project, index) => (
                  <View key={`proj-${index}`} style={styles.experienceItem}>
                    <Text style={styles.expTitle}>{project.title?.trim()}</Text>
                    <Text style={styles.profileText}>{project.description?.trim()}</Text>
                    {(project.technologies || project.technologiesUsed) && (
                      <Text style={styles.projectTech}>
                        Technologies: {(project.technologies || project.technologiesUsed).filter(hasContent).join(', ')}
                      </Text>
                    )}
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