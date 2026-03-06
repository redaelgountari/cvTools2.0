import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import { Resume } from '@/app/types/resume';
import { hasContent, checkOnlinePresence } from './contentVerification';

export const THEME11_COLORS = {
  primary: '#0f2557',
  secondary: '#0f172a',
  accent: '#3b6fd4',
  accentLight: '#e8eef8',
  text: '#1e293b',
  muted: '#64748b',
  background: '#FFFFFF',
  border: '#dde4f0',
  chipBg: '#f0f4fb',
  gold: '#c9a84c',
};

export default function Theme11({ userdata, colors = THEME11_COLORS }: { userdata: Resume, colors?: typeof THEME11_COLORS }) {
  const styles = StyleSheet.create({
    page: {
      backgroundColor: colors.background,
      fontFamily: 'Helvetica',
      paddingTop: 0,
      paddingBottom: 28,
      paddingLeft: 0,
      paddingRight: 0,
      fontSize: 10,
      lineHeight: 1.4,
      color: colors.text,
    },

    /* ─── HEADER BAND ─────────────────────────────────── */
    headerBand: {
      backgroundColor: colors.primary,
      paddingTop: 28,
      paddingBottom: 22,
      paddingLeft: 36,
      paddingRight: 36,
      flexDirection: 'row',
      alignItems: 'flex-start',
      marginBottom: 0,
    },
    headerLeft: {
      flex: 1,
    },
    profileImage: {
      width: 64,
      height: 64,
      borderRadius: 32,
      marginLeft: 18,
      objectFit: 'cover',
      borderWidth: 2,
      borderColor: colors.gold,
    },
    name: {
      fontSize: 22,
      fontWeight: 'bold',
      color: '#FFFFFF',
      letterSpacing: 0.8,
      marginBottom: 3,
    },
    profiletitle: {
      fontSize: 11,
      fontWeight: 'bold',
      color: colors.gold,
      letterSpacing: 1.2,
      marginBottom: 10,
      textTransform: 'uppercase',
    },
    contactRow: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      alignItems: 'center',
      marginTop: 2,
    },
    contactItem: {
      fontSize: 8.5,
      color: 'rgba(255,255,255,0.85)',
      marginRight: 5,
    },
    contactDivider: {
      fontSize: 8.5,
      color: colors.gold,
      marginRight: 5,
      opacity: 0.7,
    },
    onlineLinkRow: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      alignItems: 'center',
      marginTop: 4,
    },

    /* ─── THIN ACCENT STRIPE ──────────────────────────── */
    accentStripe: {
      backgroundColor: colors.gold,
      height: 3,
      marginBottom: 20,
    },

    /* ─── BODY WRAPPER ────────────────────────────────── */
    body: {
      paddingLeft: 36,
      paddingRight: 36,
    },

    /* ─── SECTION ─────────────────────────────────────── */
    section: {
      marginBottom: 16,
    },
    sectionTitle: {
      fontSize: 8,
      fontWeight: 'bold',
      color: colors.accent,
      textTransform: 'uppercase',
      letterSpacing: 2,
      marginBottom: 8,
      flexDirection: 'row',
      alignItems: 'center',
    },
    sectionTitleDot: {
      width: 5,
      height: 5,
      backgroundColor: colors.gold,
      borderRadius: 2.5,
      marginRight: 6,
    },
    sectionRule: {
      height: 0.75,
      backgroundColor: colors.border,
      marginBottom: 8,
      marginTop: -4,
    },

    /* ─── SUMMARY ─────────────────────────────────────── */
    summaryText: {
      fontSize: 9.5,
      color: colors.text,
      lineHeight: 1.55,
      textAlign: 'justify',
      backgroundColor: colors.chipBg,
      padding: '8 10',
      borderLeftWidth: 2.5,
      borderLeftColor: colors.accent,
    },

    /* ─── EXPERIENCE / EDU ITEMS ──────────────────────── */
    itemContainer: {
      marginBottom: 10,
      paddingLeft: 10,
      borderLeftWidth: 1,
      borderLeftColor: colors.border,
    },
    itemHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: 1,
    },
    itemTitleRow: {
      flexDirection: 'row',
      flex: 1,
      flexWrap: 'wrap',
      alignItems: 'center',
    },
    jobTitle: {
      fontSize: 10,
      fontWeight: 'bold',
      color: colors.secondary,
    },
    separator: {
      fontSize: 10,
      color: colors.muted,
    },
    companyName: {
      fontSize: 9.5,
      color: colors.accent,
      fontWeight: 'bold',
    },
    locationText: {
      fontSize: 8.5,
      color: colors.muted,
      marginLeft: 4,
    },
    itemDateBadge: {
      fontSize: 7.5,
      color: colors.accent,
      backgroundColor: colors.accentLight,
      paddingLeft: 5,
      paddingRight: 5,
      paddingTop: 2,
      paddingBottom: 2,
      borderRadius: 3,
      marginLeft: 8,
      whiteSpace: 'nowrap',
    },

    /* ─── BULLETS ─────────────────────────────────────── */
    bulletList: {
      marginTop: 4,
      paddingLeft: 4,
    },
    bulletItem: {
      fontSize: 9,
      color: colors.text,
      marginBottom: 2.5,
      flexDirection: 'row',
      lineHeight: 1.4,
    },
    bullet: {
      width: 10,
      color: colors.gold,
      fontWeight: 'bold',
    },
    bulletText: {
      flex: 1,
      color: colors.text,
    },

    /* ─── SKILLS ──────────────────────────────────────── */
    skillsGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 4,
    },
    skillChip: {
      fontSize: 8.5,
      color: colors.secondary,
      backgroundColor: colors.chipBg,
      paddingLeft: 7,
      paddingRight: 7,
      paddingTop: 3,
      paddingBottom: 3,
      borderRadius: 3,
      borderWidth: 0.5,
      borderColor: colors.border,
      marginRight: 4,
      marginBottom: 4,
    },

    /* ─── LANGUAGES ───────────────────────────────────── */
    languagesText: {
      fontSize: 9.5,
      color: colors.text,
      lineHeight: 1.4,
    },

    /* ─── PROJECTS ────────────────────────────────────── */
    projectTitle: {
      fontSize: 10,
      fontWeight: 'bold',
      color: colors.secondary,
      marginBottom: 2,
    },
    projectText: {
      fontSize: 9,
      color: colors.text,
      marginBottom: 2,
      lineHeight: 1.35,
    },
    stackText: {
      fontSize: 8.5,
      color: colors.muted,
      lineHeight: 1.3,
    },
  });

  const hasOnlinePresence = checkOnlinePresence(userdata);

  const SectionHeader = ({ label }: { label: string }) => (
    <View>
      <View style={styles.sectionTitle}>
        <View style={styles.sectionTitleDot} />
        <Text>{label}</Text>
      </View>
      <View style={styles.sectionRule} />
    </View>
  );

  return (
    <Document>
      <Page size="A4" style={styles.page}>

        {/* ── HEADER ── */}
        <View style={styles.headerBand}>
          <View style={styles.headerLeft}>
            <Text style={styles.name}>
              {hasContent(userdata.personalInfo.fullName) ? userdata.personalInfo.fullName : 'NAME'}
            </Text>
            <Text style={styles.profiletitle}>
              {userdata.experience[0]?.title || ''}
            </Text>

            <View style={styles.contactRow}>
              {hasContent(userdata.personalInfo.email) && (
                <Text style={styles.contactItem}>{userdata.personalInfo.email}</Text>
              )}
              {hasContent(userdata.personalInfo.email) && (hasContent(userdata.personalInfo.phone) || hasContent(userdata.personalInfo.location)) && (
                <Text style={styles.contactDivider}>·</Text>
              )}
              {hasContent(userdata.personalInfo.phone) && (
                <Text style={styles.contactItem}>{userdata.personalInfo.phone}</Text>
              )}
              {hasContent(userdata.personalInfo.phone) && hasContent(userdata.personalInfo.location) && (
                <Text style={styles.contactDivider}>·</Text>
              )}
              {hasContent(userdata.personalInfo.location) && (
                <Text style={styles.contactItem}>{userdata.personalInfo.location}</Text>
              )}
              {hasContent(userdata.personalInfo.city) && (
                <>
                  <Text style={styles.contactDivider}>·</Text>
                  <Text style={styles.contactItem}>{userdata.personalInfo.city}</Text>
                </>
              )}
            </View>

            {(hasContent(userdata.personalInfo.linkedin) || hasContent(userdata.personalInfo.github)) && (
              <View style={styles.onlineLinkRow}>
                {hasContent(userdata.personalInfo.linkedin) && (
                  <Text style={styles.contactItem}>LinkedIn: {userdata.personalInfo.linkedin}</Text>
                )}
                {hasContent(userdata.personalInfo.linkedin) && hasContent(userdata.personalInfo.github) && (
                  <Text style={styles.contactDivider}>·</Text>
                )}
                {hasContent(userdata.personalInfo.github) && (
                  <Text style={styles.contactItem}>GitHub: {userdata.personalInfo.github}</Text>
                )}
              </View>
            )}
          </View>

          {userdata.image && userdata.image[0] && (
            <Image style={styles.profileImage} src={userdata.image[0]} />
          )}
        </View>

        {/* ── GOLD STRIPE ── */}
        <View style={styles.accentStripe} />

        {/* ── BODY ── */}
        <View style={styles.body}>

          {/* Professional Summary */}
          {hasContent(userdata.professionalSummary) && (
            <View style={styles.section}>
              <SectionHeader label="Profil Professionnel" />
              <Text style={styles.summaryText}>{userdata.professionalSummary}</Text>
            </View>
          )}

          {/* Work Experience */}
          {userdata.experience.length > 0 && userdata.experience.some(exp => hasContent(exp.title) || hasContent(exp.company)) && (
            <View style={styles.section}>
              <SectionHeader label="Expérience Professionnelle" />
              {userdata.experience.map((exp, index) => (hasContent(exp.title) || hasContent(exp.company)) && (
                <View key={index} style={styles.itemContainer}>
                  <View style={styles.itemHeader}>
                    <View style={styles.itemTitleRow}>
                      <Text style={styles.jobTitle}>{exp.title}</Text>
                      {hasContent(exp.company) && <Text style={styles.separator}> — </Text>}
                      <Text style={styles.companyName}>{exp.company}</Text>
                      {hasContent(exp.location) && <Text style={styles.locationText}>· {exp.location}</Text>}
                    </View>
                    <Text style={styles.itemDateBadge}>
                      {exp.startDate}{exp.startDate && exp.endDate && ' – '}{exp.endDate || (exp.startDate ? 'Present' : '')}
                    </Text>
                  </View>

                  {exp.responsibilities && exp.responsibilities.length > 0 && (
                    <View style={styles.bulletList}>
                      {exp.responsibilities.map((resp, idx) => hasContent(resp) && (
                        <View key={idx} style={styles.bulletItem}>
                          <Text style={styles.bullet}>›</Text>
                          <Text style={styles.bulletText}>{resp}</Text>
                        </View>
                      ))}
                    </View>
                  )}
                </View>
              ))}
            </View>
          )}

          {/* Education */}
          {userdata.education.length > 0 && userdata.education.some(edu => hasContent(edu.degree) || hasContent(edu.institution)) && (
            <View style={styles.section}>
              <SectionHeader label="Éducation" />
              {userdata.education.map((edu, index) => (hasContent(edu.degree) || hasContent(edu.institution)) && (
                <View key={index} style={styles.itemContainer}>
                  <View style={styles.itemHeader}>
                    <Text style={styles.jobTitle}>{edu.degree}</Text>
                    <Text style={styles.itemDateBadge}>
                      {edu.graduationYear || edu.endDate || ''}
                    </Text>
                  </View>
                  <Text style={styles.projectText}>
                    {edu.institution}
                    {hasContent(edu.location) && ` · ${edu.location}`}
                  </Text>
                  {hasContent(edu.fieldOfStudy) && (
                    <Text style={styles.projectText}>{edu.fieldOfStudy}</Text>
                  )}
                  {hasContent(edu.gpa) && (
                    <Text style={styles.projectText}>GPA: {edu.gpa}</Text>
                  )}
                </View>
              ))}
            </View>
          )}

          {/* Technical Skills */}
          {userdata.skills.technical && userdata.skills.technical.length > 0 && userdata.skills.technical.some(hasContent) && (
            <View style={styles.section}>
              <SectionHeader label="Compétences Techniques" />
              <View style={styles.skillsGrid}>
                {userdata.skills.technical.map((skill, index) => hasContent(skill) && (
                  <Text key={index} style={styles.skillChip}>{skill}</Text>
                ))}
              </View>
            </View>
          )}

          {/* Tools */}
          {userdata.tools && userdata.tools.length > 0 && userdata.tools.some(hasContent) && (
            <View style={styles.section}>
              <SectionHeader label="Tools & Technologies" />
              <View style={styles.skillsGrid}>
                {userdata.tools.map((tool, index) => hasContent(tool) && (
                  <Text key={index} style={styles.skillChip}>{tool}</Text>
                ))}
              </View>
            </View>
          )}

          {/* Languages */}
          {userdata.skills.languages && userdata.skills.languages.length > 0 && userdata.skills.languages.some(hasContent) && (
            <View style={styles.section}>
              <SectionHeader label="Langues" />
              <Text style={styles.languagesText}>
                {userdata.skills.languages.filter(hasContent).join('  ·  ')}
              </Text>
            </View>
          )}

          {/* Projects */}
          {userdata.projects.length > 0 && userdata.projects.some(p => hasContent(p.title) || hasContent(p.description)) && (
            <View style={styles.section}>
              <SectionHeader label="Projects" />
              {userdata.projects.map((project, index) => (hasContent(project.title) || hasContent(project.description)) && (
                <View key={index} style={styles.itemContainer}>
                  <Text style={styles.projectTitle}>{project.title}</Text>
                  {hasContent(project.role) && <Text style={styles.projectText}>Role: {project.role}</Text>}
                  {hasContent(project.description) && <Text style={styles.projectText}>{project.description}</Text>}
                  {project.technologiesUsed && project.technologiesUsed.length > 0 && project.technologiesUsed.some(hasContent) && (
                    <Text style={styles.stackText}>Stack: {project.technologiesUsed.filter(hasContent).join(', ')}</Text>
                  )}
                  {project.technologies && project.technologies.length > 0 && project.technologies.some(hasContent) && (
                    <Text style={styles.stackText}>Stack: {project.technologies.filter(hasContent).join(', ')}</Text>
                  )}
                  {hasContent(project.github) && <Text style={styles.projectText}>GitHub: {project.github}</Text>}
                  {(hasContent(project.link) || hasContent(project.url)) && (
                    <Text style={styles.projectText}>Link: {project.link || project.url}</Text>
                  )}
                </View>
              ))}
            </View>
          )}

          {/* Soft Skills */}
          {userdata.skills.soft && userdata.skills.soft.length > 0 && userdata.skills.soft.some(hasContent) && (
            <View style={styles.section}>
              <SectionHeader label="Soft Skills" />
              <View style={styles.skillsGrid}>
                {userdata.skills.soft.map((skill, index) => hasContent(skill) && (
                  <Text key={index} style={styles.skillChip}>{skill}</Text>
                ))}
              </View>
            </View>
          )}

          {/* Certifications */}
          {userdata.certifications.length > 0 && userdata.certifications.some(c => hasContent(c.name)) && (
            <View style={styles.section}>
              <SectionHeader label="Certifications" />
              {userdata.certifications.map((cert, index) => hasContent(cert.name) && (
                <View key={index} style={styles.itemContainer}>
                  <Text style={styles.projectTitle}>{cert.name}</Text>
                  <Text style={styles.projectText}>
                    {cert.issuer}
                    {hasContent(cert.year) && ` · ${cert.year}`}
                    {hasContent(cert.expiryDate) && ` · Valid until: ${cert.expiryDate}`}
                  </Text>
                </View>
              ))}
            </View>
          )}

          {/* Online Presence */}
          {hasOnlinePresence && (
            <View style={styles.section}>
              <SectionHeader label="Online Presence" />
              <View style={styles.skillsGrid}>
                {hasContent(userdata.personalInfo.linkedin) && (
                  <Text style={styles.skillChip}>LinkedIn: {userdata.personalInfo.linkedin}</Text>
                )}
                {hasContent(userdata.personalInfo.github) && (
                  <Text style={styles.skillChip}>GitHub: {userdata.personalInfo.github}</Text>
                )}
                {hasContent(userdata.personalInfo.portfolio) && (
                  <Text style={styles.skillChip}>Portfolio: {userdata.personalInfo.portfolio}</Text>
                )}
                {hasContent(userdata.personalInfo.website) && (
                  <Text style={styles.skillChip}>Website: {userdata.personalInfo.website}</Text>
                )}
                {hasContent(userdata.onlinePresence.twitter) && (
                  <Text style={styles.skillChip}>Twitter: {userdata.onlinePresence.twitter}</Text>
                )}
                {hasContent(userdata.onlinePresence.stackOverflow) && (
                  <Text style={styles.skillChip}>Stack Overflow: {userdata.onlinePresence.stackOverflow}</Text>
                )}
                {hasContent(userdata.onlinePresence.medium) && (
                  <Text style={styles.skillChip}>Medium: {userdata.onlinePresence.medium}</Text>
                )}
              </View>
            </View>
          )}

          {/* Hobbies */}
          {userdata.hobbies && userdata.hobbies.length > 0 && userdata.hobbies.some(hasContent) && (
            <View style={styles.section}>
              <SectionHeader label="Interests & Hobbies" />
              <View style={styles.skillsGrid}>
                {userdata.hobbies.map((hobby, index) => hasContent(hobby) && (
                  <Text key={index} style={styles.skillChip}>{hobby}</Text>
                ))}
              </View>
            </View>
          )}

        </View>
      </Page>
    </Document>
  );
}