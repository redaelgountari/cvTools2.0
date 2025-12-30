"use client"

import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image, Font } from '@react-pdf/renderer';
import { Resume } from '@/app/types/resume';

// Register custom fonts for a more professional look
Font.register({
  family: 'Montserrat',
  fonts: [
    { src: 'https://fonts.gstatic.com/s/montserrat/v15/JTUSjIg1_i6t8kCHKm459Wlhzg.ttf', fontWeight: 'normal' },
    { src: 'https://fonts.gstatic.com/s/montserrat/v15/JTURjIg1_i6t8kCHKm45_bZF3gnD-w.ttf', fontWeight: 'bold' },
    { src: 'https://fonts.gstatic.com/s/montserrat/v15/JTURjIg1_i6t8kCHKm45_c5H3gnD-w.ttf', fontWeight: 'semibold' },
    { src: 'https://fonts.gstatic.com/s/montserrat/v15/JTUQjIg1_i6t8kCHKm459WxRxy7j.ttf', fontStyle: 'italic' },
  ],
});

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: 'Montserrat',
    backgroundColor: '#FFFFFF',
  },
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  leftColumn: {
    width: '30%',
    paddingRight: 15,
    backgroundColor: '#F5F7FA',
    padding: 15,
  },
  rightColumn: {
    width: '70%',
    paddingLeft: 15,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  imageContainer: {
    width: 100,
    height: 100,
    marginBottom: 10,
    borderRadius: 50,
    overflow: 'hidden',
    alignSelf: 'center',
  },
  profileImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  avatarPlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: '#3182CE',
    backgroundColor: '#CBD5E0',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  avatarInitials: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#2D3748',
  },
  name: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#2D3748',
    textAlign: 'center',
  },
  title: {
    fontSize: 12,
    marginBottom: 10,
    color: '#4A5568',
    textAlign: 'center',
    lineHeight: 1.3,
  },
  contactContainer: {
    marginBottom: 20,
  },
  contactItem: {
    marginBottom: 6,
  },
  contactText: {
    fontSize: 9.5,
    color: '#4A5568',
    lineHeight: 1.4,
  },
  section: {
    marginBottom: 18,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#2D3748',
    borderBottom: '1px solid #E2E8F0',
    paddingBottom: 4,
  },
  leftSectionTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#2D3748',
    borderBottom: '1px solid #E2E8F0',
    paddingBottom: 4,
  },
  skillCategory: {
    fontSize: 10,
    fontWeight: 'semibold',
    marginBottom: 5,
    marginTop: 8,
    color: '#4A5568',
  },
  skillItem: {
    fontSize: 9,
    marginBottom: 3,
    color: '#4A5568',
    padding: 3,
    backgroundColor: '#EDF2F7',
    borderRadius: 3,
    marginRight: 3,
  },
  skillRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 5,
  },
  bulletPoint: {
    fontSize: 9.5,
    marginLeft: 10,
    marginBottom: 3,
    color: '#4A5568',
    lineHeight: 1.4,
  },
  experienceItem: {
    marginBottom: 12,
  },
  experienceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 3,
    gap: 8,
  },
  jobTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#2D3748',
    flex: 1,
    lineHeight: 1.3,
  },
  jobPeriod: {
    fontSize: 9,
    fontStyle: 'italic',
    color: '#718096',
    flexShrink: 0,
    textAlign: 'right',
  },
  company: {
    fontSize: 10,
    marginBottom: 4,
    color: '#4A5568',
    lineHeight: 1.3,
  },
  bulletList: {
    marginLeft: 10,
  },
  summary: {
    fontSize: 9.5,
    lineHeight: 1.6,
    color: '#4A5568',
    marginBottom: 10,
    textAlign: 'justify',
  },
  languageItem: {
    marginBottom: 5,
  },
  languageName: {
    fontSize: 9.5,
    color: '#4A5568',
  },
  achievementText: {
    fontSize: 9.5,
    fontStyle: 'italic',
    color: '#38A169',
    marginLeft: 10,
    marginBottom: 3,
    lineHeight: 1.4,
  },
  certificationItem: {
    marginBottom: 8,
  },
  certificationName: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#2D3748',
    marginBottom: 2,
  },
  certificationDetails: {
    fontSize: 9,
    color: '#4A5568',
  },
  projectItem: {
    marginBottom: 10,
  },
  projectTitle: {
    fontSize: 10.5,
    fontWeight: 'bold',
    color: '#2D3748',
    marginBottom: 2,
  },
  projectDescription: {
    fontSize: 9.5,
    marginTop: 2,
    marginBottom: 4,
    color: '#4A5568',
    lineHeight: 1.5,
  },
  projectTech: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  projectTechItem: {
    fontSize: 8,
    color: '#4A5568',
    backgroundColor: '#EDF2F7',
    padding: 2,
    borderRadius: 3,
    marginRight: 3,
    marginBottom: 3,
  },
  projectLink: {
    fontSize: 8.5,
    color: '#3182CE',
    textDecoration: 'underline',
    marginTop: 2,
  },
});

// Helper function to filter out N/A and empty values
const filterEmpty = (value?: string | null): string => {
  if (!value || value === 'N/A' || value.trim() === '') return '';
  return value.trim();
};

const hasContent = (value?: string | null): boolean => {
  return filterEmpty(value) !== '';
};

// Create Document Component
export default function Theme2({ userdata, userImage }: { userdata: Resume; userImage?: any }) {
  // Get initials for placeholder
  const getInitials = (name: string): string => {
    const parts = name.trim().split(' ').filter(p => p);
    if (parts.length === 0) return '?';
    if (parts.length === 1) return parts[0][0].toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  const displayName = filterEmpty(userdata.personalInfo?.fullName) || 'Your Name';
  const displayTitle = filterEmpty(userdata.experience?.[0]?.title) || '';
  const hasValidImage = userdata.image[0] && hasContent(userdata.image[0]);
  const initials = getInitials(displayName);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.container}>
          {/* Left Column - Personal Info, Skills, Languages */}
          <View style={styles.leftColumn}>
            {/* Header with profile image and name */}
            <View style={styles.header}>
              {hasValidImage ? (
                <View style={styles.imageContainer}>
                  <Image style={styles.profileImage} src={userdata.image[0]} />
                </View>
              ) : (
                <View style={styles.avatarPlaceholder}>
                  <Text style={styles.avatarInitials}>{initials}</Text>
                </View>
              )}
              <Text style={styles.name}>{displayName}</Text>
              {displayTitle && <Text style={styles.title}>{displayTitle}</Text>}
            </View>

            {/* Contact Information */}
            {(hasContent(userdata.personalInfo?.location) ||
              hasContent(userdata.personalInfo?.phone) ||
              hasContent(userdata.personalInfo?.email) ||
              hasContent(userdata.personalInfo?.linkedin) ||
              hasContent(userdata.personalInfo?.website)) && (
              <View style={styles.contactContainer}>
                <Text style={styles.leftSectionTitle}>Contact</Text>
                {hasContent(userdata.personalInfo?.location) && (
                  <View style={styles.contactItem}>
                    <Text style={styles.contactText}>{filterEmpty(userdata.personalInfo.location)}</Text>
                  </View>
                )}
                {hasContent(userdata.personalInfo?.phone) && (
                  <View style={styles.contactItem}>
                    <Text style={styles.contactText}>{filterEmpty(userdata.personalInfo.phone)}</Text>
                  </View>
                )}
                {hasContent(userdata.personalInfo?.email) && (
                  <View style={styles.contactItem}>
                    <Text style={styles.contactText}>{filterEmpty(userdata.personalInfo.email)}</Text>
                  </View>
                )}
                {hasContent(userdata.personalInfo?.linkedin) && (
                  <View style={styles.contactItem}>
                    <Text style={styles.contactText}>{filterEmpty(userdata.personalInfo.linkedin)}</Text>
                  </View>
                )}
                {hasContent(userdata.personalInfo?.website) && (
                  <View style={styles.contactItem}>
                    <Text style={styles.contactText}>{filterEmpty(userdata.personalInfo.website)}</Text>
                  </View>
                )}
              </View>
            )}

            {/* Skills Section */}
            {((userdata.skills?.technical && userdata.skills.technical.length > 0) || 
              (userdata.skills?.soft && userdata.skills.soft.length > 0)) && (
              <View style={styles.section}>
                <Text style={styles.leftSectionTitle}>Compétences</Text>
                
                {userdata.skills.technical && userdata.skills.technical.length > 0 && (
                  <View>
                    <Text style={styles.skillCategory}>Techniques</Text>
                    <View style={styles.skillRow}>
                      {userdata.skills.technical
                        .filter(skill => skill && skill.trim())
                        .map((skill, index) => (
                          <Text key={index} style={styles.skillItem}>{skill.trim()}</Text>
                        ))}
                    </View>
                  </View>
                )}
                
                {userdata.skills.soft && userdata.skills.soft.length > 0 && (
                  <View>
                    <Text style={styles.skillCategory}>Soft Skills</Text>
                    <View style={styles.skillRow}>
                      {userdata.skills.soft
                        .filter(skill => skill && skill.trim())
                        .map((skill, index) => (
                          <Text key={index} style={styles.skillItem}>{skill.trim()}</Text>
                        ))}
                    </View>
                  </View>
                )}
              </View>
            )}

            {/* Languages */}
            {userdata.skills?.languages && userdata.skills.languages.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.leftSectionTitle}>Langues</Text>
                {userdata.skills.languages
                  .filter(lang => lang && lang.trim())
                  .map((language, index) => (
                    <View key={index} style={styles.languageItem}>
                      <Text style={styles.languageName}>• {language.trim()}</Text>
                    </View>
                  ))}
              </View>
            )}
            
            {userdata.hobbies && userdata.hobbies.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.leftSectionTitle}>Hobbies</Text>
                {userdata.hobbies
                  .filter(hobby => hobby && hobby.trim())
                  .map((hobby, index) => (
                    <View key={index} style={styles.languageItem}>
                      <Text style={styles.languageName}>• {hobby.trim()}</Text>
                    </View>
                  ))}
              </View>
            )}

            {/* Certifications */}
            {userdata.certifications && userdata.certifications.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.leftSectionTitle}>Certifications</Text>
                {userdata.certifications
                  .filter(cert => hasContent(cert.name) || hasContent(cert.issuer))
                  .map((cert, index) => (
                    <View key={index} style={styles.certificationItem}>
                      <Text style={styles.certificationName}>{filterEmpty(cert.name) || 'Certification'}</Text>
                      <Text style={styles.certificationDetails}>
                        {[filterEmpty(cert.issuer), filterEmpty(cert.year)].filter(x => x).join(', ')}
                        {hasContent(cert.expiryDate) && ` - ${filterEmpty(cert.expiryDate)}`}
                      </Text>
                    </View>
                  ))}
              </View>
            )}
          </View>

          {/* Right Column - Summary, Experience, Education, Projects */}
          <View style={styles.rightColumn}>
            {/* Professional Summary */}
            {hasContent(userdata.professionalSummary) && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Profil Professionnel</Text>
                <Text style={styles.summary}>{filterEmpty(userdata.professionalSummary)}</Text>
              </View>
            )}

            {/* Experience */}
            {userdata.experience && userdata.experience.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Expérience Professionnelle</Text>
                {userdata.experience
                  .filter(exp => hasContent(exp.title) || hasContent(exp.company))
                  .map((exp, index) => {
                    const dateRange = [filterEmpty(exp.startDate), filterEmpty(exp.endDate)]
                      .filter(d => d)
                      .join(' - ');
                    const companyLocation = [filterEmpty(exp.company), filterEmpty(exp.location)]
                      .filter(c => c)
                      .join(', ');

                    return (
                      <View key={index} style={styles.experienceItem}>
                        <View style={styles.experienceHeader}>
                          <Text style={styles.jobTitle}>{filterEmpty(exp.title) || 'Position'}</Text>
                          {dateRange && <Text style={styles.jobPeriod}>{dateRange}</Text>}
                        </View>
                        {companyLocation && <Text style={styles.company}>{companyLocation}</Text>}
                        {exp.responsibilities && exp.responsibilities.length > 0 && (
                          <View style={styles.bulletList}>
                            {exp.responsibilities
                              .filter(r => r && r.trim())
                              .map((responsibility, idx) => (
                                <Text key={idx} style={styles.bulletPoint}>• {responsibility.trim()}</Text>
                              ))}
                          </View>
                        )}
                        {exp.achievements && exp.achievements.length > 0 && (
                          <View style={styles.bulletList}>
                            {exp.achievements
                              .filter(a => a && a.trim())
                              .map((achievement, idx) => (
                                <Text key={idx} style={styles.achievementText}>✓ {achievement.trim()}</Text>
                              ))}
                          </View>
                        )}
                      </View>
                    );
                  })}
              </View>
            )}

            {/* Education */}
            {userdata.education && userdata.education.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Formation</Text>
                {userdata.education
                  .filter(edu => hasContent(edu.degree) || hasContent(edu.institution))
                  .map((edu, index) => {
                    const institutionLocation = [filterEmpty(edu.institution), filterEmpty(edu.location)]
                      .filter(i => i)
                      .join(', ');

                    return (
                      <View key={index} style={styles.experienceItem}>
                        <View style={styles.experienceHeader}>
                          <Text style={styles.jobTitle}>{filterEmpty(edu.degree) || 'Degree'}</Text>
                          {hasContent(edu.graduationYear) && (
                            <Text style={styles.jobPeriod}>{filterEmpty(edu.graduationYear)}</Text>
                          )}
                        </View>
                        {institutionLocation && <Text style={styles.company}>{institutionLocation}</Text>}
                        {hasContent(edu.gpa) && <Text style={styles.bulletPoint}>• GPA: {edu.gpa}</Text>}
                        {edu.relevantCourses && edu.relevantCourses.length > 0 && (
                          <View style={styles.bulletList}>
                            {edu.relevantCourses
                              .filter(course => course && course.trim())
                              .map((course, idx) => (
                                <Text key={idx} style={styles.bulletPoint}>• {course.trim()}</Text>
                              ))}
                          </View>
                        )}
                      </View>
                    );
                  })}
              </View>
            )}

            {/* Projects */}
            {userdata.projects && userdata.projects.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Projets</Text>
                {userdata.projects
                  .filter(project => hasContent(project.title) || hasContent(project.description))
                  .map((project, index) => (
                    <View key={index} style={styles.projectItem}>
                      <Text style={styles.projectTitle}>{filterEmpty(project.title) || 'Project'}</Text>
                      {hasContent(project.description) && (
                        <Text style={styles.projectDescription}>{filterEmpty(project.description)}</Text>
                      )}
                      {project.technologies && project.technologies.length > 0 && (
                        <View style={styles.projectTech}>
                          {project.technologies
                            .filter(tech => tech && tech.trim())
                            .map((tech, idx) => (
                              <Text key={idx} style={styles.projectTechItem}>{tech.trim()}</Text>
                            ))}
                        </View>
                      )}
                      {hasContent(project.link) && (
                        <Text style={styles.projectLink}>{filterEmpty(project.link)}</Text>
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