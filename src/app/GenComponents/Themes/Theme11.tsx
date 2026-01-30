import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import { Resume } from '@/app/types/resume';
import { hasContent, checkOnlinePresence } from './contentVerification';

export const THEME11_COLORS = {
  primary: '#1e3a8a',
  secondary: '#000000',
  accent: '#64748b',
  text: '#1a1a1a',
  background: '#FFFFFF',
  border: '#cbd5e1'
};

export default function Theme11({ userdata, colors = THEME11_COLORS }: { userdata: Resume, colors?: typeof THEME11_COLORS }) {
  const styles = StyleSheet.create({
    page: {
      backgroundColor: colors.background,
      fontFamily: 'Helvetica',
      padding: '25 35',
      fontSize: 11,
      lineHeight: 1.2,
      color: colors.text,
    },
    headerContainer: {
      flexDirection: 'row',
      marginBottom: 12,
      paddingBottom: 8,
      borderBottomWidth: 1.5,
      borderBottomColor: colors.primary,
    },
    headerLeft: {
      flex: 1,
    },
    profileImage: {
      width: 55,
      height: 55,
      borderRadius: 28,
      marginLeft: 12,
      objectFit: 'cover',
    },
    name: {
      fontSize: 15,
      fontWeight: 'bold',
      color: colors.secondary,
      marginBottom: 4,
      letterSpacing: 0.3,
    },
    profiletitle: {
      fontSize: 12,
      fontWeight: 'bold',
      color: colors.secondary,
      marginTop: 4,
      letterSpacing: 0.3,
    },
    contactInfo: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      fontSize: 9.5,
      color: colors.text,
      marginTop: 8,
      lineHeight: 1.3,
    },
    contactItem: {
      marginRight: 6,
    },
    contactDivider: {
      marginRight: 6,
      color: colors.accent,
    },
    onlineLinks: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      fontSize: 8,
      color: colors.primary,
      marginTop: 2,
    },
    section: {
      marginBottom: 13,
    },
    sectionTitle: {
      fontSize: 10,
      fontWeight: 'bold',
      color: colors.primary,
      textTransform: 'uppercase',
      marginBottom: 4,
      letterSpacing: 0.6,
      paddingBottom: 1,
      borderBottomWidth: 0.5,
      borderBottomColor: colors.border,
    },
    summaryText: {
      fontSize: 11,
      color: colors.text,
      lineHeight: 1.3,
      textAlign: 'justify',
    },
    itemContainer: {
      marginBottom: 6,
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
    },
    jobTitle: {
      fontSize: 9.5,
      fontWeight: 'bold',
      color: colors.secondary,
    },
    companyName: {
      fontSize: 10,
      fontWeight: 'bold',
      color: colors.text,
    },
    locationText: {
      fontSize: 10,
      color: colors.accent,
    },
    itemDate: {
      fontSize: 8.5,
      color: colors.accent,
      marginLeft: 8,
      whiteSpace: 'nowrap',
    },
    bulletList: {
      marginTop: 2,
      paddingLeft: 10,
    },
    bulletItem: {
      fontSize: 9.5,
      color: colors.text,
      marginBottom: 2,
      flexDirection: 'row',
      lineHeight: 1.25,
    },
    bullet: {
      width: 8,
      color: colors.text,
    },
    bulletText: {
      flex: 1,
    },
    skillsGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 2,
    },
    skillItem: {
      fontSize: 10,
      color: colors.text,
      marginRight: 6,
      marginBottom: 1,
    },
    languagesText: {
      fontSize: 11,
      color: colors.text,
      lineHeight: 1.2,
    },
    projectTitle: {
      fontSize: 10,
      fontWeight: 'bold',
      color: colors.secondary,
      marginBottom: 2,
    },
    projectText: {
      fontSize: 10,
      color: colors.text,
      marginBottom: 2,
      lineHeight: 1.25,
    },
    stackText: {
      fontSize: 9.1,
      color: colors.accent,
      lineHeight: 1.2,
    },
  });

  const hasOnlinePresence = checkOnlinePresence(userdata);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header with Name, Contact, and Image */}
        <View style={styles.headerContainer}>
          <View style={styles.headerLeft}>
            <Text style={styles.name}>{hasContent(userdata.personalInfo.fullName) ? userdata.personalInfo.fullName : 'NAME'}</Text>
            <Text style={styles.profiletitle}>{userdata.experience[0]?.title || ''}</Text>

            <View style={styles.contactInfo}>
              {hasContent(userdata.personalInfo.email) && (
                <Text style={styles.contactItem}>{userdata.personalInfo.email}</Text>
              )}
              {hasContent(userdata.personalInfo.email) && (hasContent(userdata.personalInfo.phone) || hasContent(userdata.personalInfo.location)) && (
                <Text style={styles.contactDivider}>|</Text>
              )}
              {hasContent(userdata.personalInfo.phone) && (
                <Text style={styles.contactItem}>{userdata.personalInfo.phone}</Text>
              )}
              {hasContent(userdata.personalInfo.phone) && hasContent(userdata.personalInfo.location) && (
                <Text style={styles.contactDivider}>|</Text>
              )}
              {hasContent(userdata.personalInfo.location) && (
                <Text style={styles.contactItem}>{userdata.personalInfo.location}</Text>
              )}
              {hasContent(userdata.personalInfo.city) && (
                <>
                  <Text style={styles.contactDivider}>|</Text>
                  <Text style={styles.contactItem}>{userdata.personalInfo.city}</Text>
                </>
              )}
            </View>

            {(hasContent(userdata.personalInfo.linkedin) || hasContent(userdata.personalInfo.github)) && (
              <View style={styles.onlineLinks}>
                {hasContent(userdata.personalInfo.linkedin) && (
                  <Text style={styles.contactItem}>LinkedIn: {userdata.personalInfo.linkedin}</Text>
                )}
                {hasContent(userdata.personalInfo.linkedin) && hasContent(userdata.personalInfo.github) && (
                  <Text style={styles.contactDivider}>|</Text>
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

        {/* Professional Summary */}
        {hasContent(userdata.professionalSummary) && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Profil Professionnel</Text>
            <Text style={styles.summaryText}>{userdata.professionalSummary}</Text>
          </View>
        )}

        {/* Work Experience */}
        {userdata.experience.length > 0 && userdata.experience.some(exp => hasContent(exp.title) || hasContent(exp.company)) && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Expérience Professionnelle</Text>
            {userdata.experience.map((exp, index) => (hasContent(exp.title) || hasContent(exp.company)) && (
              <View key={index} style={styles.itemContainer}>
                <View style={styles.itemHeader}>
                  <View style={styles.itemTitleRow}>
                    <Text style={styles.jobTitle}>{exp.title}</Text>
                    {hasContent(exp.company) && <Text style={styles.jobTitle}> — </Text>}
                    <Text style={styles.companyName}>{exp.company}</Text>
                    {hasContent(exp.location) && <Text style={styles.locationText}> | {exp.location}</Text>}
                  </View>
                  <Text style={styles.itemDate}>
                    {exp.startDate} {exp.startDate && exp.endDate && ' - '} {exp.endDate || (exp.startDate ? 'Present' : '')}
                  </Text>
                </View>

                {exp.responsibilities && exp.responsibilities.length > 0 && (
                  <View style={styles.bulletList}>
                    {exp.responsibilities.map((resp, idx) => hasContent(resp) && (
                      <View key={idx} style={styles.bulletItem}>
                        <Text style={styles.bullet}>•</Text>
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
            <Text style={styles.sectionTitle}>ÉDUCATION</Text>
            {userdata.education.map((edu, index) => (hasContent(edu.degree) || hasContent(edu.institution)) && (
              <View key={index} style={styles.itemContainer}>
                <View style={styles.itemHeader}>
                  <Text style={styles.jobTitle}>{edu.degree}</Text>
                  <Text style={styles.itemDate}>
                    {edu.graduationYear || edu.endDate || ''}
                  </Text>
                </View>
                <Text style={styles.projectText}>
                  {edu.institution}
                  {hasContent(edu.location) && ` | ${edu.location}`}
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
            <Text style={styles.sectionTitle}>COMPÉTENCES TECHNIQUES</Text>
            <View style={styles.skillsGrid}>
              {userdata.skills.technical.map((skill, index) => hasContent(skill) && (
                <Text key={index} style={styles.skillItem}>• {skill}</Text>
              ))}
            </View>
          </View>
        )}

        {/* Tools */}
        {userdata.tools && userdata.tools.length > 0 && userdata.tools.some(hasContent) && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Tools & Technologies</Text>
            <View style={styles.skillsGrid}>
              {userdata.tools.map((tool, index) => hasContent(tool) && (
                <Text key={index} style={styles.skillItem}>• {tool}</Text>
              ))}
            </View>
          </View>
        )}

        {/* Languages */}
        {userdata.skills.languages && userdata.skills.languages.length > 0 && userdata.skills.languages.some(hasContent) && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>LANGUES</Text>
            <Text style={styles.languagesText}>
              {userdata.skills.languages.filter(hasContent).join(', ')}
            </Text>
          </View>
        )}

        {/* Projects */}
        {userdata.projects.length > 0 && userdata.projects.some(p => hasContent(p.title) || hasContent(p.description)) && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>PROJECTS</Text>
            {userdata.projects.map((project, index) => (hasContent(project.title) || hasContent(project.description)) && (
              <View key={index} style={styles.itemContainer}>
                <Text style={styles.projectTitle}>{project.title}</Text>
                {hasContent(project.role) && <Text style={styles.projectText}>Role: {project.role}</Text>}
                {hasContent(project.description) && <Text style={styles.projectText}>{project.description}</Text>}
                {project.technologiesUsed && project.technologiesUsed.length > 0 && project.technologiesUsed.some(hasContent) && (
                  <Text style={styles.stackText}>
                    Stack: {project.technologiesUsed.filter(hasContent).join(', ')}
                  </Text>
                )}
                {project.technologies && project.technologies.length > 0 && project.technologies.some(hasContent) && (
                  <Text style={styles.stackText}>
                    Stack: {project.technologies.filter(hasContent).join(', ')}
                  </Text>
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
            <Text style={styles.sectionTitle}>Soft Skills</Text>
            <View style={styles.skillsGrid}>
              {userdata.skills.soft.map((skill, index) => hasContent(skill) && (
                <Text key={index} style={styles.skillItem}>• {skill}</Text>
              ))}
            </View>
          </View>
        )}

        {/* Certifications */}
        {userdata.certifications.length > 0 && userdata.certifications.some(c => hasContent(c.name)) && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Certifications</Text>
            {userdata.certifications.map((cert, index) => hasContent(cert.name) && (
              <View key={index} style={styles.itemContainer}>
                <Text style={styles.projectTitle}>{cert.name}</Text>
                <Text style={styles.projectText}>
                  {cert.issuer}
                  {hasContent(cert.year) && ` | ${cert.year}`}
                  {hasContent(cert.expiryDate) && ` | Valid until: ${cert.expiryDate}`}
                </Text>
              </View>
            ))}
          </View>
        )}

        {/* Online Presence */}
        {hasOnlinePresence && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Online Presence</Text>
            <View style={styles.skillsGrid}>
              {hasContent(userdata.personalInfo.linkedin) && (
                <Text style={styles.skillItem}>LinkedIn: {userdata.personalInfo.linkedin}</Text>
              )}
              {hasContent(userdata.personalInfo.github) && (
                <Text style={styles.skillItem}>GitHub: {userdata.personalInfo.github}</Text>
              )}
              {hasContent(userdata.personalInfo.portfolio) && (
                <Text style={styles.skillItem}>Portfolio: {userdata.personalInfo.portfolio}</Text>
              )}
              {hasContent(userdata.personalInfo.website) && (
                <Text style={styles.skillItem}>Website: {userdata.personalInfo.website}</Text>
              )}
              {hasContent(userdata.onlinePresence.twitter) && (
                <Text style={styles.skillItem}>Twitter: {userdata.onlinePresence.twitter}</Text>
              )}
              {hasContent(userdata.onlinePresence.stackOverflow) && (
                <Text style={styles.skillItem}>Stack Overflow: {userdata.onlinePresence.stackOverflow}</Text>
              )}
              {hasContent(userdata.onlinePresence.medium) && (
                <Text style={styles.skillItem}>Medium: {userdata.onlinePresence.medium}</Text>
              )}
            </View>
          </View>
        )}

        {/* Hobbies */}
        {userdata.hobbies && userdata.hobbies.length > 0 && userdata.hobbies.some(hasContent) && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Interests & Hobbies</Text>
            <View style={styles.skillsGrid}>
              {userdata.hobbies.map((hobby, index) => hasContent(hobby) && (
                <Text key={index} style={styles.skillItem}>• {hobby}</Text>
              ))}
            </View>
          </View>
        )}
      </Page>
    </Document>
  );
}