"use client"

import React from 'react';
import { Document, Page, Text, View, StyleSheet, Font, Image } from '@react-pdf/renderer';

// Register fonts
Font.register({
  family: 'Roboto',
  fonts: [
    { src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-light-webfont.ttf', fontWeight: 'light' },
    { src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-regular-webfont.ttf', fontWeight: 'normal' },
    { src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-bold-webfont.ttf', fontWeight: 'bold' },
  ],
});

const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    fontFamily: 'Roboto',
  },
  leftColumn: {
    width: '35%',
    backgroundColor: '#F8F8F8',
    padding: 0,
  },
  leftColumnNarrow: {
    width: '25%',
    backgroundColor: '#F8F8F8',
    padding: 0,
  },
  rightColumn: {
    width: '65%',
    padding: '40 35',
  },
  rightColumnWide: {
    width: '75%',
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
    color: '#000000',
    letterSpacing: 2,
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 14,
    fontWeight: 'light',
    color: '#333333',
    letterSpacing: 1.5,
    marginTop: 3,
  },
  verticalLine: {
    width: 1,
    backgroundColor: '#000000',
    height: 25,
    marginLeft: 0,
    marginVertical: 8,
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#000000',
    letterSpacing: 1.5,
    marginBottom: 12,
    marginTop: 12,
    borderBottom: '1 solid #CCCCCC',
    paddingBottom: 5,
  },
  leftSectionTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#000000',
    letterSpacing: 1.5,
    marginBottom: 12,
    marginTop: 25,
    paddingHorizontal: 30,
  },
  firstLeftSectionTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#000000',
    letterSpacing: 1.5,
    marginBottom: 12,
    marginTop: 20,
    paddingHorizontal: 30,
  },
  contactItem: {
    fontSize: 9,
    color: '#333333',
    marginBottom: 8,
    lineHeight: 1.4,
    paddingHorizontal: 30,
  },
  summary: {
    fontSize: 9,
    lineHeight: 1.6,
    color: '#333333',
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
    backgroundColor: '#000000',
    marginTop: 5,
  },
  timelineLine: {
    width: 1,
    backgroundColor: '#CCCCCC',
    flex: 1,
    marginTop: 3,
  },
  timelineContent: {
    flex: 1,
  },
  jobTitle: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 2,
  },
  company: {
    fontSize: 9,
    color: '#666666',
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
    color: '#333333',
    lineHeight: 1.5,
  },
  skillItem: {
    fontSize: 11,
    color: '#333333',
    marginBottom: 6,
    lineHeight: 1.4,
    paddingHorizontal: 30,
  },
  educationItem: {
    marginBottom: 15,
    paddingHorizontal: 30,
  },
  degree: {
    fontSize: 9,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 2,
  },
  institution: {
    fontSize: 8,
    color: '#666666',
    marginBottom: 2,
  },
  educationDate: {
    fontSize: 8,
    color: '#999999',
  },
  languageItem: {
    fontSize: 9,
    color: '#333333',
    marginBottom: 6,
    paddingHorizontal: 30,
  },
  projectDescription: {
    fontSize: 8,
    color: '#333333',
    marginBottom: 6,
    lineHeight: 1.5,
  },
});

// Utility functions
const filterNA = (value) => {
  if (!value || value === 'N/A' || value === 'n/a' || value.trim() === '') return '';
  return value;
};

const hasValue = (value) => {
  return !!filterNA(value);
};

const formatDate = (date) => {
  if (!date) return '';
  const filtered = filterNA(date);
  if (!filtered) return '';

  // Handle "present" variations
  if (filtered.toLowerCase() === 'present' || filtered.toLowerCase() === 'présent') {
    return 'Présent';
  }

  // Format YYYY-MM to a more readable format
  if (/^\d{4}-\d{2}$/.test(filtered)) {
    const [year, month] = filtered.split('-');
    const months = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Août', 'Sep', 'Oct', 'Nov', 'Déc'];
    const monthIndex = parseInt(month) - 1;
    return `${months[monthIndex]} ${year}`;
  }

  // Format YYYY
  if (/^\d{4}$/.test(filtered)) {
    return filtered;
  }

  return filtered;
};

function Theme5({ userdata , userImage }) {
  const data = userdata

  // Check if left sidebar has content
  const hasContactInfo = hasValue(data.personalInfo?.phone) ||
    hasValue(data.personalInfo?.email) ||
    hasValue(data.personalInfo?.location) ||
    hasValue(data.personalInfo?.linkedin) ||
    hasValue(data.personalInfo?.website);

  const hasEducation = data.education && data.education.length > 0;
  const hasSkills = (data.skills?.technical && data.skills.technical.length > 0) ||
    (data.skills?.soft && data.skills.soft.length > 0);
  const hasLanguages = data.skills?.languages && data.skills.languages.length > 0;
  const hasTools = data.tools && data.tools.length > 0;
  const hasImage = data.image && data.image.length > 0;

  const hasLeftContent = hasContactInfo || hasEducation || hasSkills || hasLanguages || hasTools || hasImage;

  // Adjust column widths based on content
  const leftColumnStyle = hasLeftContent ?
    (hasContactInfo && hasEducation && hasSkills ? styles.leftColumn : styles.leftColumnNarrow) :
    { width: 0 };

  const rightColumnStyle = hasLeftContent ?
    (hasContactInfo && hasEducation && hasSkills ? styles.rightColumn : styles.rightColumnWide) :
    { width: '100%', padding: '40 50' };

  return (
    <Document>
      <Page size="LETTER" style={styles.page}>
        {/* Left Column */}
        {hasLeftContent && (
          <View style={leftColumnStyle}>
            {/* Image */}
            {hasImage && (
              <View style={styles.imageContainer}>
                <Image style={styles.image} src={data.image[0]} />
              </View>
            )}

            {/* Contact Section */}
            {hasContactInfo && (
              <View>
                <Text style={hasImage ? styles.leftSectionTitle : styles.firstLeftSectionTitle}>
                  CONTACT
                </Text>
                {hasValue(data.personalInfo?.phone) && (
                  <Text style={styles.contactItem}>{data.personalInfo.phone}</Text>
                )}
                {hasValue(data.personalInfo?.email) && (
                  <Text style={styles.contactItem}>{data.personalInfo.email}</Text>
                )}
                {hasValue(data.personalInfo?.location) && (
                  <Text style={styles.contactItem}>{data.personalInfo.location}</Text>
                )}
                {hasValue(data.personalInfo?.linkedin) && (
                  <Text style={styles.contactItem}>{data.personalInfo.linkedin}</Text>
                )}
                {hasValue(data.personalInfo?.website) && (
                  <Text style={styles.contactItem}>{data.personalInfo.website}</Text>
                )}
                {hasValue(data.personalInfo?.github) && (
                  <Text style={styles.contactItem}>{data.personalInfo.github}</Text>
                )}
              </View>
            )}
          
            {hasSkills && (
              <View>
                <Text style={styles.leftSectionTitle}>COMPÉTENCES</Text>
                {[...(data.skills?.technical || []), ...(data.skills?.soft || [])]
                  .filter(skill => hasValue(skill))
                  .map((skill, index) => (
                    <Text key={index} style={styles.skillItem}>• {skill}</Text>
                  ))}
              </View>
            )}

            {/* Tools Section */}
            {hasTools && (
              <View>
                <Text style={styles.leftSectionTitle}>OUTILS</Text>
                {data.tools
                  .filter(tool => hasValue(tool))
                  .map((tool, index) => (
                    <Text key={index} style={styles.skillItem}>• {tool}</Text>
                  ))}
              </View>
            )}

            {/* Languages Section */}
            {hasLanguages && (
              <View>
                <Text style={styles.leftSectionTitle}>LANGUES</Text>
                {data.skills.languages
                  .filter(language => hasValue(language))
                  .map((language, index) => (
                    <Text key={index} style={styles.languageItem}>• {language}</Text>
                  ))}
              </View>
            )}
          </View>
        )}

        {/* Right Column */}
        <View style={rightColumnStyle}>
          {/* Header */}
          <View style={styles.header}>
            {hasValue(data.personalInfo?.fullName) && (
              <Text style={styles.name}>
                {filterNA(data.personalInfo.fullName).toUpperCase()}
              </Text>
            )}
            {hasValue(data.jobSearchTitle) && (
              <Text style={styles.subtitle}>
                {data.jobSearchTitle.toUpperCase()}
              </Text>
            )}
          </View>

         {/* Professional Summary */}
          {hasValue(data.professionalSummary) && (
            <View>
              <Text style={styles.sectionTitle}>PROFIL</Text>
              <Text style={styles.summary}>{data.professionalSummary}</Text>
            </View>
          )}

          {/* Education Section */}
          {data.education && data.education.length > 0 && (
            <View>
              <Text style={styles.sectionTitle}>FORMATION</Text>
              {data.education.map((edu, index) => {
                const degree = filterNA(edu.degree);
                const institution = filterNA(edu.institution);
                const location = filterNA(edu.location);
                const year = formatDate(edu.graduationYear);

                if (!degree && !institution) return null;

                return (
                  <View key={index} style={styles.timelineItem}>
                    <View style={styles.timelineMarker}>
                      <View style={styles.timelineDot} />
                      {index < data.education.length - 1 && (
                        <View style={styles.timelineLine} />
                      )}
                    </View>
                    <View style={styles.timelineContent}>
                      {degree && <Text style={styles.jobTitle}>{degree.toUpperCase()}</Text>}
                      {institution && <Text style={styles.company}>{institution}</Text>}
                      {(location || year) && (
                        <Text style={styles.dateRange}>
                          {location}{location && year && ' • '}{year}
                        </Text>
                      )}
                    </View>
                  </View>
                );
              })}
            </View>
          )}
          
          {data.experience && data.experience.length > 0 && (
            <View>
              <Text style={styles.sectionTitle}>EXPÉRIENCES PROFESSIONNELLES</Text>
              {data.experience.map((exp, index) => {
                const title = filterNA(exp.title);
                const company = filterNA(exp.company);
                const startDate = formatDate(exp.startDate);
                const endDate = formatDate(exp.endDate);

                if (!title && !company) return null;

                return (
                  <View key={index} style={styles.timelineItem}>
                    <View style={styles.timelineMarker}>
                      <View style={styles.timelineDot} />
                      {index < data.experience.length - 1 && (
                        <View style={styles.timelineLine} />
                      )}
                    </View>
                    <View style={styles.timelineContent}>
                      <Text style={styles.jobTitle}>
                        {title && company ? `${title.toUpperCase()} - ${company.toUpperCase()}` :
                          title ? title.toUpperCase() :
                            company ? company.toUpperCase() : ''}
                      </Text>
                      {(startDate || endDate) && (
                        <Text style={styles.dateRange}>
                          {startDate} {startDate && endDate && '- '} {endDate}
                        </Text>
                      )}
                      {exp.responsibilities && exp.responsibilities
                        .filter(resp => hasValue(resp))
                        .map((responsibility, idx) => (
                          <Text key={idx} style={styles.bulletPoint}>• {responsibility}</Text>
                        ))}
                    </View>
                  </View>
                );
              })}
            </View>
          )}

          {/* Projects Section */}
          {data.projects && data.projects.length > 0 && (
            <View>
              <Text style={styles.sectionTitle}>PROJETS</Text>
              {data.projects.map((project, index) => {
                if (!hasValue(project.title)) return null;

                // Handle both 'technologies', 'technologiesUsed', and 'technology' fields
                const technologies = project.technologies || project.technologiesUsed || project.technology || [];
                const techArray = Array.isArray(technologies) ? technologies : [technologies];

                return (
                  <View key={index} style={styles.timelineItem}>
                    <View style={styles.timelineMarker}>
                      <View style={styles.timelineDot} />
                      {index < data.projects.length - 1 && (
                        <View style={styles.timelineLine} />
                      )}
                    </View>
                    <View style={styles.timelineContent}>
                      <Text style={styles.jobTitle}>{project.title.toUpperCase()}</Text>
                      {hasValue(project.role) && (
                        <Text style={styles.company}>Rôle: {project.role}</Text>
                      )}
                      {hasValue(project.description) && (
                        <Text style={styles.projectDescription}>{project.description}</Text>
                      )}
                      {techArray && techArray.length > 0 && techArray.some(t => hasValue(t)) && (
                        <Text style={styles.company}>
                          Technologies: {techArray.filter(tech => hasValue(tech)).join(', ')}
                        </Text>
                      )}
                      {hasValue(project.github) && (
                        <Text style={styles.company}>GitHub: {project.github}</Text>
                      )}
                    </View>
                  </View>
                );
              })}
            </View>
          )}
        </View>
      </Page>
    </Document>
  );
}

export default Theme5;