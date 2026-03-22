import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import { Resume } from '@/app/types/resume';
import { hasContent, checkOnlinePresence } from './contentVerification';

export const THEME11_COLORS = {
  headerBand: '#c9b99a',
  sidebarBg:  '#e8dece',
  pageBg:     '#faf7f2',
  primary:    '#2c2318',
  accent:     '#7a6050',
  border:     '#c9b99a',
  muted:      '#5a4a3a',
  text:       '#3c2e20',
};

export default function Theme11({
  userdata,
  colors = THEME11_COLORS,
}: {
  userdata: Resume;
  colors?: typeof THEME11_COLORS;
}) {
  const styles = StyleSheet.create({

    /* ── PAGE ── */
    page: {
      flexDirection: 'column',
      backgroundColor: colors.pageBg,
      fontFamily: 'Helvetica',
      fontSize: 10,
      color: colors.primary,
    },

    /* ── HEADER BAND (full width) ── */
    headerBand: {
      flexDirection: 'row',
      backgroundColor: colors.headerBand,
      alignItems: 'center',
      padding: '22 32 22 28',
      minHeight: 155,
    },
    photoWrap: {
      width: 110,
      height: 110,
      borderRadius: 55,
      overflow: 'hidden',
      border: `3 solid ${colors.pageBg}`,
      marginRight: 24,
      flexShrink: 0,
      backgroundColor: '#a89070',
    },
    profileImage: {
      width: 110,
      height: 110,
      borderRadius: 55,
      objectFit: 'cover',
    },
    photoPlaceholder: {
      width: 110,
      height: 110,
      borderRadius: 55,
      backgroundColor: '#a89070',
    },
    headerInfo: {
      flex: 1,
    },
    headerName: {
      fontSize: 10,
      fontFamily: 'Helvetica',
      letterSpacing: 2.5,
      color: colors.primary,
      marginBottom: 3,
      textTransform: 'uppercase',
    },
    headerTitle: {
      fontSize: 22,
      fontFamily: 'Helvetica-Bold',
      color: colors.primary,
      lineHeight: 1.05,
      textTransform: 'uppercase',
      marginBottom: 8,
    },
    headerDivider: {
      width: 36,
      height: 1,
      backgroundColor: colors.accent,
      marginBottom: 8,
      opacity: 0.6,
    },
    headerSummary: {
      fontSize: 9,
      color: colors.muted,
      lineHeight: 1.6,
      textAlign: 'justify',
      fontFamily: 'Helvetica',
    },

    /* ── BODY ── */
    body: {
      flexDirection: 'row',
      flex: 1,
    },

    /* ── SIDEBAR ── */
    sidebar: {
      width: 185,
      backgroundColor: colors.sidebarBg,
      padding: '18 15 28 15',
    },
    sidebarSectionTitle: {
      fontSize: 8,
      fontFamily: 'Helvetica-Bold',
      letterSpacing: 2,
      textTransform: 'uppercase',
      color: colors.accent,
      paddingBottom: 4,
      borderBottomWidth: 0.75,
      borderBottomColor: colors.border,
      marginBottom: 8,
      marginTop: 14,
    },
    contactRow: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      marginBottom: 6,
    },
    contactDot: {
      width: 14,
      height: 14,
      borderRadius: 7,
      backgroundColor: colors.primary,
      marginRight: 7,
      marginTop: 1,
      flexShrink: 0,
    },
    contactText: {
      fontSize: 9,
      color: colors.primary,
      lineHeight: 1.4,
      flex: 1,
      fontFamily: 'Helvetica',
    },
    skillRow: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      marginBottom: 5,
    },
    skillDot: {
      width: 4,
      height: 4,
      borderRadius: 2,
      backgroundColor: colors.accent,
      marginRight: 6,
      marginTop: 3.5,
      flexShrink: 0,
    },
    skillText: {
      flex: 1,
      fontSize: 9.5,
      color: colors.primary,
      lineHeight: 1.35,
      fontFamily: 'Helvetica',
    },
    langText: {
      fontSize: 9.5,
      color: colors.primary,
      lineHeight: 1.4,
      fontFamily: 'Helvetica',
      marginBottom: 3,
    },
    toolText: {
      fontSize: 9.5,
      color: colors.primary,
      marginBottom: 3,
      fontFamily: 'Helvetica',
    },

    /* ── MAIN ── */
    main: {
      flex: 1,
      padding: '18 24 24 18',
      backgroundColor: colors.pageBg,
    },
    mainSectionTitle: {
      fontSize: 8.5,
      fontFamily: 'Helvetica-Bold',
      letterSpacing: 2,
      textTransform: 'uppercase',
      color: colors.accent,
      paddingBottom: 4,
      borderBottomWidth: 0.75,
      borderBottomColor: colors.border,
      marginBottom: 10,
      marginTop: 14,
    },

    /* ── TIMELINE ITEM ── */
    itemContainer: {
      flexDirection: 'row',
      marginBottom: 10,
    },
    itemBorderBar: {
      width: 2,
      backgroundColor: colors.border,
      marginRight: 10,
      borderRadius: 1,
    },
    itemContent: {
      flex: 1,
    },
    itemTitle: {
      fontSize: 10,
      fontFamily: 'Helvetica-Bold',
      color: colors.primary,
      marginBottom: 1,
    },
    itemSubtitle: {
      fontSize: 9,
      fontFamily: 'Helvetica-Oblique',
      color: colors.accent,
      marginBottom: 2,
    },
    itemDate: {
      fontSize: 8.5,
      color: colors.accent,
      marginBottom: 4,
      fontFamily: 'Helvetica',
    },
    bulletList: {
      marginTop: 1,
    },
    bulletItem: {
      flexDirection: 'row',
      marginBottom: 2,
    },
    bullet: {
      fontSize: 9,
      color: colors.border,
      marginRight: 4,
      fontFamily: 'Helvetica',
      lineHeight: 1.5,
    },
    bulletText: {
      flex: 1,
      fontSize: 9,
      color: colors.text,
      lineHeight: 1.5,
      fontFamily: 'Helvetica',
    },
    projectText: {
      fontSize: 9,
      color: colors.text,
      lineHeight: 1.5,
      fontFamily: 'Helvetica',
      marginBottom: 2,
    },
    stackText: {
      fontSize: 8.5,
      color: colors.accent,
      fontFamily: 'Helvetica-Oblique',
      marginTop: 2,
    },
    onlineLinkText: {
      fontSize: 9,
      color: colors.primary,
      fontFamily: 'Helvetica',
      marginBottom: 2,
    },
  });

  const hasOnlinePresence = checkOnlinePresence(userdata);

  return (
    <Document>
      <Page size="A4" style={styles.page}>

        {/* ══ FULL-WIDTH HEADER BAND ══ */}
        <View style={styles.headerBand}>
          {/* Profile photo */}
          <View style={styles.photoWrap}>
            {userdata.image && userdata.image[0] ? (
              <Image style={styles.profileImage} src={userdata.image[0]} />
            ) : (
              <View style={styles.photoPlaceholder} />
            )}
          </View>

          {/* Name / Job title / Summary */}
          <View style={styles.headerInfo}>
            <Text style={styles.headerName}>
              {hasContent(userdata.personalInfo.fullName)
                ? userdata.personalInfo.fullName
                : 'NAME'}
            </Text>
            <Text style={styles.headerTitle}>
              {userdata.experience[0]?.title || ''}
            </Text>
            <View style={styles.headerDivider} />
            {hasContent(userdata.professionalSummary) && (
              <Text style={styles.headerSummary}>
                {userdata.professionalSummary}
              </Text>
            )}
          </View>
        </View>

        {/* ══ BODY ══ */}
        <View style={styles.body}>

          {/* ── LEFT SIDEBAR ── */}
          <View style={styles.sidebar}>

            {/* Contact */}
            <Text style={styles.sidebarSectionTitle}>Contact</Text>
            {hasContent(userdata.personalInfo.phone) && (
              <View style={styles.contactRow}>
                <View style={styles.contactDot} />
                <Text style={styles.contactText}>{userdata.personalInfo.phone}</Text>
              </View>
            )}
            {hasContent(userdata.personalInfo.email) && (
              <View style={styles.contactRow}>
                <View style={styles.contactDot} />
                <Text style={styles.contactText}>{userdata.personalInfo.email}</Text>
              </View>
            )}
            {hasContent(userdata.personalInfo.portfolio) && (
              <View style={styles.contactRow}>
                <View style={styles.contactDot} />
                <Text style={styles.contactText}>{userdata.personalInfo.portfolio}</Text>
              </View>
            )}
            {hasContent(userdata.personalInfo.website) && (
              <View style={styles.contactRow}>
                <View style={styles.contactDot} />
                <Text style={styles.contactText}>{userdata.personalInfo.website}</Text>
              </View>
            )}
            {hasContent(userdata.personalInfo.location) && (
              <View style={styles.contactRow}>
                <View style={styles.contactDot} />
                <Text style={styles.contactText}>{userdata.personalInfo.location}</Text>
              </View>
            )}
            {hasContent(userdata.personalInfo.city) && (
              <View style={styles.contactRow}>
                <View style={styles.contactDot} />
                <Text style={styles.contactText}>{userdata.personalInfo.city}</Text>
              </View>
            )}
            {hasContent(userdata.personalInfo.linkedin) && (
              <View style={styles.contactRow}>
                <View style={styles.contactDot} />
                <Text style={styles.contactText}>LinkedIn: {userdata.personalInfo.linkedin}</Text>
              </View>
            )}
            {hasContent(userdata.personalInfo.github) && (
              <View style={styles.contactRow}>
                <View style={styles.contactDot} />
                <Text style={styles.contactText}>GitHub: {userdata.personalInfo.github}</Text>
              </View>
            )}

            {/* Technical Skills */}
            {userdata.skills.technical && userdata.skills.technical.some(hasContent) && (
              <>
                <Text style={styles.sidebarSectionTitle}>Compétences</Text>
                {userdata.skills.technical.filter(hasContent).map((skill, i) => (
                  <View key={i} style={styles.skillRow}>
                    <View style={styles.skillDot} />
                    <Text style={styles.skillText}>{skill}</Text>
                  </View>
                ))}
              </>
            )}

            {/* Soft Skills */}
            {userdata.skills.soft && userdata.skills.soft.some(hasContent) && (
              <>
                <Text style={styles.sidebarSectionTitle}>Qualités</Text>
                {userdata.skills.soft.filter(hasContent).map((skill, i) => (
                  <View key={i} style={styles.skillRow}>
                    <View style={styles.skillDot} />
                    <Text style={styles.skillText}>{skill}</Text>
                  </View>
                ))}
              </>
            )}

            {/* Tools */}
            {userdata.tools && userdata.tools.some(hasContent) && (
              <>
                <Text style={styles.sidebarSectionTitle}>Outils & Technologies</Text>
                {userdata.tools.filter(hasContent).map((tool, i) => (
                  <Text key={i} style={styles.toolText}>• {tool}</Text>
                ))}
              </>
            )}

            {/* Languages */}
            {userdata.skills.languages && userdata.skills.languages.some(hasContent) && (
              <>
                <Text style={styles.sidebarSectionTitle}>Langues</Text>
                {userdata.skills.languages.filter(hasContent).map((lang, i) => (
                  <Text key={i} style={styles.langText}>• {lang}</Text>
                ))}
              </>
            )}

            {/* Hobbies */}
            {userdata.hobbies && userdata.hobbies.some(hasContent) && (
              <>
                <Text style={styles.sidebarSectionTitle}>Centres d'intérêt</Text>
                {userdata.hobbies.filter(hasContent).map((hobby, i) => (
                  <View key={i} style={styles.skillRow}>
                    <View style={styles.skillDot} />
                    <Text style={styles.skillText}>{hobby}</Text>
                  </View>
                ))}
              </>
            )}

            {/* Online Presence */}
            {hasOnlinePresence && (
              <>
                <Text style={styles.sidebarSectionTitle}>Présence en ligne</Text>
                {hasContent(userdata.onlinePresence?.twitter) && (
                  <Text style={styles.onlineLinkText}>Twitter: {userdata.onlinePresence.twitter}</Text>
                )}
                {hasContent(userdata.onlinePresence?.stackOverflow) && (
                  <Text style={styles.onlineLinkText}>Stack Overflow: {userdata.onlinePresence.stackOverflow}</Text>
                )}
                {hasContent(userdata.onlinePresence?.medium) && (
                  <Text style={styles.onlineLinkText}>Medium: {userdata.onlinePresence.medium}</Text>
                )}
              </>
            )}

          </View>

          {/* ── RIGHT MAIN ── */}
          <View style={styles.main}>

            {/* Work Experience */}
            {userdata.experience.length > 0 &&
              userdata.experience.some(exp => hasContent(exp.title) || hasContent(exp.company)) && (
              <>
                <Text style={styles.mainSectionTitle}>Expérience Professionnelle</Text>
                {userdata.experience.map((exp, index) =>
                  (hasContent(exp.title) || hasContent(exp.company)) && (
                    <View key={index} style={styles.itemContainer}>
                      <View style={styles.itemBorderBar} />
                      <View style={styles.itemContent}>
                        <Text style={styles.itemTitle}>{exp.title}</Text>
                        <Text style={styles.itemSubtitle}>
                          {[exp.company, exp.location].filter(hasContent).join(' | ')}
                        </Text>
                        <Text style={styles.itemDate}>
                          {exp.startDate}
                          {exp.startDate && exp.endDate ? ' - ' : ''}
                          {exp.endDate || (exp.startDate ? 'Present' : '')}
                        </Text>
                        {exp.responsibilities && exp.responsibilities.length > 0 && (
                          <View style={styles.bulletList}>
                            {exp.responsibilities.map((resp, idx) =>
                              hasContent(resp) && (
                                <View key={idx} style={styles.bulletItem}>
                                  <Text style={styles.bullet}>•</Text>
                                  <Text style={styles.bulletText}>{resp}</Text>
                                </View>
                              )
                            )}
                          </View>
                        )}
                      </View>
                    </View>
                  )
                )}
              </>
            )}

            {/* Education */}
            {userdata.education.length > 0 &&
              userdata.education.some(edu => hasContent(edu.degree) || hasContent(edu.institution)) && (
              <>
                <Text style={styles.mainSectionTitle}>Formations</Text>
                {userdata.education.map((edu, index) =>
                  (hasContent(edu.degree) || hasContent(edu.institution)) && (
                    <View key={index} style={styles.itemContainer}>
                      <View style={styles.itemBorderBar} />
                      <View style={styles.itemContent}>
                        <Text style={styles.itemTitle}>{edu.degree}</Text>
                        <Text style={styles.itemSubtitle}>
                          {[edu.institution, edu.location].filter(hasContent).join(' | ')}
                        </Text>
                        <Text style={styles.itemDate}>
                          {edu.graduationYear || edu.endDate || ''}
                        </Text>
                        {hasContent(edu.fieldOfStudy) && (
                          <Text style={styles.projectText}>{edu.fieldOfStudy}</Text>
                        )}
                        {hasContent(edu.gpa) && (
                          <Text style={styles.projectText}>GPA: {edu.gpa}</Text>
                        )}
                      </View>
                    </View>
                  )
                )}
              </>
            )}

            {/* Projects */}
            {userdata.projects.length > 0 &&
              userdata.projects.some(p => hasContent(p.title) || hasContent(p.description)) && (
              <>
                <Text style={styles.mainSectionTitle}>Projets</Text>
                {userdata.projects.map((project, index) =>
                  (hasContent(project.title) || hasContent(project.description)) && (
                    <View key={index} style={styles.itemContainer}>
                      <View style={styles.itemBorderBar} />
                      <View style={styles.itemContent}>
                        <Text style={styles.itemTitle}>{project.title}</Text>
                        {hasContent(project.role) && (
                          <Text style={styles.itemSubtitle}>{project.role}</Text>
                        )}
                        {hasContent(project.description) && (
                          <Text style={styles.projectText}>{project.description}</Text>
                        )}
                        {(project.technologiesUsed?.some(hasContent) || project.technologies?.some(hasContent)) && (
                          <Text style={styles.stackText}>
                            Stack: {(project.technologiesUsed?.filter(hasContent) || project.technologies?.filter(hasContent) || []).join(', ')}
                          </Text>
                        )}
                        {hasContent(project.github) && (
                          <Text style={styles.projectText}>GitHub: {project.github}</Text>
                        )}
                        {(hasContent(project.link) || hasContent(project.url)) && (
                          <Text style={styles.projectText}>Lien: {project.link || project.url}</Text>
                        )}
                      </View>
                    </View>
                  )
                )}
              </>
            )}

            {/* Certifications */}
            {userdata.certifications.length > 0 &&
              userdata.certifications.some(c => hasContent(c.name)) && (
              <>
                <Text style={styles.mainSectionTitle}>Certifications</Text>
                {userdata.certifications.map((cert, index) =>
                  hasContent(cert.name) && (
                    <View key={index} style={styles.itemContainer}>
                      <View style={styles.itemBorderBar} />
                      <View style={styles.itemContent}>
                        <Text style={styles.itemTitle}>{cert.name}</Text>
                        <Text style={styles.itemSubtitle}>
                          {[cert.issuer, cert.year].filter(hasContent).join(' | ')}
                          {hasContent(cert.expiryDate) ? ` | Valide jusqu'au ${cert.expiryDate}` : ''}
                        </Text>
                      </View>
                    </View>
                  )
                )}
              </>
            )}

          </View>
        </View>
      </Page>
    </Document>
  );
}