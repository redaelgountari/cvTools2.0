import React from 'react';
import { Document, Page, Text, View, StyleSheet, Font, Image } from '@react-pdf/renderer';
import { Resume } from '@/app/types/resume';
import { DEFAULT_THEME_COLORS } from './themeDefaults';
import { hasContent } from './contentVerification';

// Register fonts
Font.register({
  family: 'Roboto',
  fonts: [
    { src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-light-webfont.ttf', fontWeight: 'light' },
    { src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-regular-webfont.ttf', fontWeight: 'normal' },
    { src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-bold-webfont.ttf', fontWeight: 'bold' },
  ],
});

export default function Theme5({ userdata, colors = DEFAULT_THEME_COLORS.theme5 }: { userdata: Resume, colors?: any }) {
  const styles = StyleSheet.create({
    page: {
      flexDirection: 'row',
      backgroundColor: colors.background || '#FFFFFF',
      fontFamily: 'Roboto',
    },
    leftColumn: {
      width: '35%',
      backgroundColor: colors.sidebar || '#F8F8F8',
      padding: 0,
    },
    rightColumn: {
      width: '65%',
      padding: '40 35',
    },
    header: {
      marginBottom: 30,
    },
    imageContainer: {
      width: '100%',
      height: 200,
      marginBottom: 0,
      overflow: 'hidden',
    },
    image: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
    },
    name: {
      fontSize: 28,
      fontWeight: 'bold',
      color: colors.primary || '#000000',
      letterSpacing: 2,
      marginBottom: 5,
    },
    subtitle: {
      fontSize: 14,
      fontWeight: 'light',
      color: colors.accent || '#333333',
      letterSpacing: 1.5,
      marginTop: 3,
    },
    sectionTitle: {
      fontSize: 11,
      fontWeight: 'bold',
      color: colors.primary || '#000000',
      letterSpacing: 1.5,
      marginBottom: 12,
      marginTop: 12,
      borderBottomWidth: 1,
      borderBottomColor: colors.border || '#CCCCCC',
      borderBottomStyle: 'solid',
      paddingBottom: 5,
    },
    leftSectionTitle: {
      fontSize: 11,
      fontWeight: 'bold',
      color: colors.primary || '#000000',
      letterSpacing: 1.5,
      marginBottom: 12,
      marginTop: 25,
      paddingHorizontal: 30,
    },
    firstLeftSectionTitle: {
      fontSize: 11,
      fontWeight: 'bold',
      color: colors.primary || '#000000',
      letterSpacing: 1.5,
      marginBottom: 12,
      marginTop: 20,
      paddingHorizontal: 30,
    },
    contactItem: {
      fontSize: 9,
      color: colors.text || '#333333',
      marginBottom: 8,
      lineHeight: 1.4,
      paddingHorizontal: 30,
    },
    summary: {
      fontSize: 9,
      lineHeight: 1.6,
      color: colors.text || '#333333',
      textAlign: 'justify',
    },
    timelineItem: {
      flexDirection: 'row',
      marginBottom: 20,
    },
    timelineMarker: {
      width: 20,
      alignItems: 'center',
      marginRight: 15,
    },
    timelineDot: {
      width: 8,
      height: 8,
      borderRadius: 4,
      backgroundColor: colors.primary || '#000000',
      marginTop: 5,
    },
    timelineLine: {
      width: 1,
      backgroundColor: colors.border || '#CCCCCC',
      flex: 1,
      marginTop: 3,
    },
    timelineContent: {
      flex: 1,
    },
    jobTitle: {
      fontSize: 10,
      fontWeight: 'bold',
      color: colors.primary || '#000000',
      marginBottom: 2,
    },
    company: {
      fontSize: 9,
      color: colors.accent || '#666666',
      marginBottom: 5,
    },
    dateRange: {
      fontSize: 8,
      color: '#999999',
      marginBottom: 8,
    },
    bulletPoint: {
      fontSize: 8,
      marginLeft: 0,
      marginBottom: 4,
      color: colors.text || '#333333',
      lineHeight: 1.5,
    },
    skillItem: {
      fontSize: 11,
      color: colors.text || '#333333',
      marginBottom: 6,
      lineHeight: 1.4,
      paddingHorizontal: 30,
    },
    languageItem: {
      fontSize: 9,
      color: colors.text || '#333333',
      marginBottom: 6,
      paddingHorizontal: 30,
    },
    projectDescription: {
      fontSize: 8,
      color: colors.text || '#333333',
      marginBottom: 6,
      lineHeight: 1.5,
    },
  });

  const data = userdata;
  const hasValidImage = data.image && data.image[0] && hasContent(data.image[0]);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Left Column */}
        <View style={styles.leftColumn}>
          {hasValidImage && (
            <View style={styles.imageContainer}>
              <Image style={styles.image} src={data.image[0]} />
            </View>
          )}

          {/* Contact Section */}
          {(hasContent(data.personalInfo?.phone) || hasContent(data.personalInfo?.email) || hasContent(data.personalInfo?.location)) && (
            <View>
              <Text style={hasValidImage ? styles.leftSectionTitle : styles.firstLeftSectionTitle}>CONTACT</Text>
              {hasContent(data.personalInfo?.phone) && <Text style={styles.contactItem}>{data.personalInfo.phone.trim()}</Text>}
              {hasContent(data.personalInfo?.email) && <Text style={styles.contactItem}>{data.personalInfo.email.trim()}</Text>}
              {hasContent(data.personalInfo?.location) && <Text style={styles.contactItem}>{data.personalInfo.location.trim()}</Text>}
              {hasContent(data.personalInfo?.linkedin) && <Text style={styles.contactItem}>LinkedIn</Text>}
            </View>
          )}

          {data.skills && (data.skills.technical.some(hasContent) || data.skills.soft.some(hasContent)) && (
            <View>
              <Text style={styles.leftSectionTitle}>COMPÉTENCES</Text>
              {[...(data.skills?.technical || []), ...(data.skills?.soft || [])]
                .filter(hasContent)
                .map((skill, index) => (
                  <Text key={index} style={styles.skillItem}>• {skill.trim()}</Text>
                ))}
            </View>
          )}

          {data.skills?.languages && data.skills.languages.some(hasContent) && (
            <View>
              <Text style={styles.leftSectionTitle}>LANGUES</Text>
              {data.skills.languages
                .filter(hasContent)
                .map((language, index) => (
                  <Text key={index} style={styles.languageItem}>• {language.trim()}</Text>
                ))}
            </View>
          )}
        </View>

        {/* Right Column */}
        <View style={styles.rightColumn}>
          {/* Header */}
          <View style={styles.header}>
            {hasContent(data.personalInfo?.fullName) && (
              <Text style={styles.name}>{data.personalInfo.fullName.trim().toUpperCase()}</Text>
            )}
            {hasContent(data.jobSearchTitle) && (
              <Text style={styles.subtitle}>{data.jobSearchTitle.trim().toUpperCase()}</Text>
            )}
          </View>

          {hasContent(data.professionalSummary) && (
            <View>
              <Text style={styles.sectionTitle}>PROFIL</Text>
              <Text style={styles.summary}>{data.professionalSummary.trim()}</Text>
            </View>
          )}

          {data.experience && data.experience.some(exp => hasContent(exp.title) || hasContent(exp.company)) && (
            <View>
              <Text style={styles.sectionTitle}>EXPÉRIENCES PROFESSIONNELLES</Text>
              {data.experience.filter(exp => hasContent(exp.title) || hasContent(exp.company)).map((exp, index, arr) => (
                <View key={index} style={styles.timelineItem}>
                  <View style={styles.timelineMarker}>
                    <View style={styles.timelineDot} />
                    {index < arr.length - 1 && <View style={styles.timelineLine} />}
                  </View>
                  <View style={styles.timelineContent}>
                    <Text style={styles.jobTitle}>
                      {[exp.title, exp.company].filter(hasContent).join(' - ').toUpperCase()}
                    </Text>
                    <Text style={styles.dateRange}>
                      {[exp.startDate, exp.endDate].filter(hasContent).join(' - ') || (hasContent(exp.startDate) ? 'Présent' : '')}
                    </Text>
                    {exp.responsibilities && exp.responsibilities.filter(hasContent).map((resp, idx) => (
                      <Text key={idx} style={styles.bulletPoint}>• {resp.trim()}</Text>
                    ))}
                  </View>
                </View>
              ))}
            </View>
          )}

          {data.education && data.education.some(edu => hasContent(edu.degree) || hasContent(edu.institution)) && (
            <View>
              <Text style={styles.sectionTitle}>FORMATION</Text>
              {data.education.filter(edu => hasContent(edu.degree) || hasContent(edu.institution)).map((edu, index, arr) => (
                <View key={index} style={styles.timelineItem}>
                  <View style={styles.timelineMarker}>
                    <View style={styles.timelineDot} />
                    {index < arr.length - 1 && <View style={styles.timelineLine} />}
                  </View>
                  <View style={styles.timelineContent}>
                    <Text style={styles.jobTitle}>{edu.degree?.trim().toUpperCase() || 'DEGREE'}</Text>
                    <Text style={styles.company}>{edu.institution?.trim() || ''}</Text>
                    <Text style={styles.dateRange}>
                      {[edu.location, edu.graduationYear].filter(hasContent).join(' • ')}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          )}

          {data.projects && data.projects.some(p => hasContent(p.title) || hasContent(p.description)) && (
            <View>
              <Text style={styles.sectionTitle}>PROJETS</Text>
              {data.projects.filter(p => hasContent(p.title) || hasContent(p.description)).map((project, index, arr) => (
                <View key={index} style={styles.timelineItem}>
                  <View style={styles.timelineMarker}>
                    <View style={styles.timelineDot} />
                    {index < arr.length - 1 && <View style={styles.timelineLine} />}
                  </View>
                  <View style={styles.timelineContent}>
                    <Text style={styles.jobTitle}>{project.title?.trim().toUpperCase() || 'PROJET'}</Text>
                    {hasContent(project.description) && <Text style={styles.projectDescription}>{project.description.trim()}</Text>}
                    {(project.technologies || project.technologiesUsed) && (
                      <Text style={styles.company}>
                        Technologies: {(project.technologies || project.technologiesUsed).filter(hasContent).join(', ')}
                      </Text>
                    )}
                  </View>
                </View>
              ))}
            </View>
          )}
        </View>
      </Page>
    </Document>
  );
}