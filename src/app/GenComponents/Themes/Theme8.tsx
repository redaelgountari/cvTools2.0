import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image, Font } from '@react-pdf/renderer';
import { Resume } from '@/app/types/resume';
import { DEFAULT_THEME_COLORS } from './themeDefaults';
import { hasContent } from './contentVerification';

export default function Theme8({ userdata, colors = DEFAULT_THEME_COLORS.theme8 }: { userdata: Resume; colors?: any }) {
  const styles = StyleSheet.create({
    page: {
      padding: 30,
      fontFamily: 'Helvetica',
      backgroundColor: colors.background || '#FFFFFF',
    },
    header: {
      marginBottom: 20,
    },
    name: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 5,
      textTransform: 'uppercase',
      color: colors.primary || '#000000',
    },
    title: {
      fontSize: 14,
      marginBottom: 5,
      color: colors.secondary || '#4A5568',
    },
    contactInfo: {
      marginBottom: 15,
      flexDirection: 'row',
      justifyContent: 'space-between',
      borderTopWidth: 1,
      borderTopColor: colors.border || '#000',
      borderBottomWidth: 1,
      borderBottomColor: colors.border || '#000',
      paddingTop: 8,
      paddingBottom: 8,
      flexWrap: 'wrap',
      gap: 10
    },
    contactItem: {
      fontSize: 10,
      color: colors.text || '#4A5568',
    },
    section: {
      marginBottom: 20,
    },
    sectionTitle: {
      fontSize: 14,
      fontWeight: 'bold',
      marginBottom: 10,
      textTransform: 'uppercase',
      borderBottomWidth: 1,
      borderBottomColor: colors.border || '#000',
      paddingBottom: 4,
      color: colors.primary || '#000',
    },
    summary: {
      fontSize: 10,
      lineHeight: 1.5,
      color: colors.text || '#4A5568',
      marginBottom: 10,
      textAlign: 'justify',
    },
    experienceItem: {
      marginBottom: 12,
    },
    experienceHeader: {
      marginBottom: 3,
    },
    dateLocation: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      fontSize: 10,
      color: '#718096',
      marginBottom: 4,
    },
    jobTitle: {
      fontSize: 12,
      fontWeight: 'bold',
      color: colors.primary || '#2D3748',
    },
    company: {
      fontSize: 11,
      marginBottom: 4,
      color: colors.text || '#4A5568',
    },
    bulletList: {
      marginLeft: 10,
    },
    bulletPoint: {
      fontSize: 10,
      marginBottom: 3,
      color: colors.text || '#4A5568',
    },
    skillsContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 15
    },
    skillItem: {
      fontSize: 10,
      color: colors.text || '#4A5568',
    },
    educationItem: {
      marginBottom: 10,
    },
    degreeTitle: {
      fontSize: 11,
      fontWeight: 'bold',
      color: colors.primary || '#2D3748',
    },
    institution: {
      fontSize: 10,
      color: colors.text || '#4A5568',
    },
    hobbiesText: {
      fontSize: 10,
      color: colors.text || '#4A5568',
    }
  });

  const displayName = hasContent(userdata.personalInfo?.fullName) ? userdata.personalInfo.fullName.trim() : 'Your Name';
  const displayTitle = hasContent(userdata.jobSearchTitle) ? userdata.jobSearchTitle.trim() : (hasContent(userdata.personalInfo?.title) ? userdata.personalInfo.title.trim() : 'Professional');

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.name}>{displayName}</Text>
          <Text style={styles.title}>{displayTitle}</Text>
        </View>

        <View style={styles.contactInfo}>
          {hasContent(userdata.personalInfo?.location) && (
            <Text style={styles.contactItem}>{userdata.personalInfo.location.trim()}</Text>
          )}
          {hasContent(userdata.personalInfo?.phone) && (
            <Text style={styles.contactItem}>{userdata.personalInfo.phone.trim()}</Text>
          )}
          {hasContent(userdata.personalInfo?.email) && (
            <Text style={styles.contactItem}>{userdata.personalInfo.email.trim()}</Text>
          )}
          {hasContent(userdata.personalInfo?.linkedin) && (
            <Text style={styles.contactItem}>LinkedIn</Text>
          )}
        </View>

        {hasContent(userdata.professionalSummary) && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>About Me</Text>
            <Text style={styles.summary}>{userdata.professionalSummary.trim()}</Text>
          </View>
        )}

        {userdata.experience.some(exp => hasContent(exp.title) || hasContent(exp.company)) && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Professional Experience</Text>
            {userdata.experience.filter(exp => hasContent(exp.title) || hasContent(exp.company)).map((exp, index) => (
              <View key={index} style={styles.experienceItem}>
                <View style={styles.experienceHeader}>
                  <Text style={styles.jobTitle}>{exp.title?.trim()}</Text>
                  <Text style={styles.company}>{exp.company?.trim()}</Text>
                  <View style={styles.dateLocation}>
                    <Text>{[exp.startDate, exp.endDate].filter(hasContent).join(' - ') || (hasContent(exp.startDate) ? 'Present' : '')}</Text>
                    <Text>{exp.location?.trim() || ''}</Text>
                  </View>
                </View>
                {exp.responsibilities && exp.responsibilities.some(hasContent) && (
                  <View style={styles.bulletList}>
                    {exp.responsibilities.filter(hasContent).map((responsibility, idx) => (
                      <Text key={idx} style={styles.bulletPoint}>• {responsibility.trim()}</Text>
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
              <View key={index} style={styles.educationItem}>
                <Text style={styles.degreeTitle}>{edu.degree?.trim()}</Text>
                <Text style={styles.institution}>{[edu.institution, edu.location].filter(hasContent).join(', ')}</Text>
                <Text style={styles.institution}>{edu.graduationYear?.trim() || ''}</Text>
              </View>
            ))}
          </View>
        )}

        {(userdata.skills.technical.some(hasContent) || userdata.skills.soft.some(hasContent) || userdata.skills.languages.some(hasContent)) && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Skills & Languages</Text>
            <View style={styles.skillsContainer}>
              {[...userdata.skills.technical, ...userdata.skills.soft, ...userdata.skills.languages].filter(hasContent).map((skill, index) => (
                <Text key={index} style={styles.skillItem}>• {skill.trim()}</Text>
              ))}
            </View>
          </View>
        )}

        {userdata.hobbies.some(hasContent) && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Interests</Text>
            <Text style={styles.hobbiesText}>
              {userdata.hobbies.filter(hasContent).join(', ')}
            </Text>
          </View>
        )}

        {userdata.certifications.some(cert => hasContent(cert.name)) && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Certifications</Text>
            {userdata.certifications.filter(cert => hasContent(cert.name)).map((cert, index) => (
              <View key={index} style={styles.educationItem}>
                <Text style={styles.degreeTitle}>{cert.name.trim()}</Text>
                <Text style={styles.institution}>
                  {[cert.issuer, cert.year].filter(hasContent).join(', ')}
                  {hasContent(cert.expiryDate) && ` - ${cert.expiryDate.trim()}`}
                </Text>
              </View>
            ))}
          </View>
        )}

        {userdata.projects && userdata.projects.some(p => hasContent(p.title) || hasContent(p.description)) && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Projects</Text>
            {userdata.projects.filter(p => hasContent(p.title) || hasContent(p.description)).map((project, index) => (
              <View key={index} style={styles.experienceItem}>
                <Text style={styles.jobTitle}>{project.title?.trim()}</Text>
                <Text style={styles.bulletPoint}>{project.description?.trim()}</Text>
                {(project.technologies || project.technologiesUsed) && (
                  <Text style={styles.institution}>Technologies: {(project.technologies || project.technologiesUsed).filter(hasContent).join(', ')}</Text>
                )}
              </View>
            ))}
          </View>
        )}
      </Page>
    </Document>
  );
}