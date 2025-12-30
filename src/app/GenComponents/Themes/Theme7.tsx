"use client"

import React from 'react';
import { Document, Page, Text, View, StyleSheet, Font, Image } from '@react-pdf/renderer';

// Register custom fonts
Font.register({
  family: 'Inter',
  fonts: [
    { src: 'https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiA.woff2', fontWeight: 'normal' },
    { src: 'https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuGKYAZ9hiA.woff2', fontWeight: 'bold' },
    { src: 'https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuI6fAZ9hiA.woff2', fontWeight: 600 },
  ],
});

const styles = StyleSheet.create({
  page: {
    backgroundColor: '#FFFFFF',
    fontFamily: 'Inter',
    padding: 0,
  },
  
  // Header Section
  header: {
    backgroundColor: '#2c3e50',
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
    border: '3px solid #ecf0f1',
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
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
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
    backgroundColor: '#ecf0f1',
    padding: 30,
    paddingTop: 35,
  },
  leftSection: {
    marginBottom: 28,
  },
  leftSectionHeading: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#2c3e50',
    textTransform: 'uppercase',
    marginBottom: 12,
    letterSpacing: 1.2,
    paddingBottom: 6,
    borderBottomWidth: 2,
    borderBottomColor: '#34495e',
  },
  skillItem: {
    fontSize: 9,
    color: '#2c3e50',
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
    backgroundColor: '#34495e',
    borderRadius: 2,
  },
  languageItem: {
    marginBottom: 10,
  },
  languageText: {
    fontSize: 9,
    color: '#2c3e50',
    fontWeight: 600,
  },
  toolTag: {
    fontSize: 8,
    color: '#2c3e50',
    backgroundColor: '#bdc3c7',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 4,
    marginBottom: 7,
    marginRight: 7,
    fontWeight: 600,
  },
  toolsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  hobbyTag: {
    fontSize: 8,
    color: '#2c3e50',
    backgroundColor: '#d5dbdb',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 12,
    marginBottom: 7,
    marginRight: 7,
  },
  hobbiesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
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
    color: '#2c3e50',
    textTransform: 'uppercase',
    marginBottom: 16,
    letterSpacing: 1.5,
    paddingBottom: 8,
    borderBottomWidth: 3,
    borderBottomColor: '#34495e',
  },
  profileText: {
    fontSize: 9.5,
    color: '#34495e',
    lineHeight: 1.7,
    textAlign: 'justify',
  },

  // Timeline Items
  timelineItem: {
    marginBottom: 20,
    paddingBottom: 18,
    borderBottomWidth: 1,
    borderBottomColor: '#ecf0f1',
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
    color: '#2c3e50',
    marginBottom: 4,
    lineHeight: 1.3,
  },
  itemSubtitle: {
    fontSize: 9.5,
    color: '#34495e',
    marginBottom: 3,
    fontWeight: 600,
  },
  itemLocation: {
    fontSize: 8.5,
    color: '#7f8c8d',
    marginTop: 2,
  },
  itemPeriod: {
    fontSize: 8.5,
    color: '#FFFFFF',
    backgroundColor: '#34495e',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 3,
    alignSelf: 'flex-start',
    fontWeight: 600,
    letterSpacing: 0.5,
  },
  bulletList: {
    marginTop: 8,
  },
  bulletItem: {
    fontSize: 9,
    color: '#34495e',
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
    color: '#34495e',
  },

  // Projects
  projectDescription: {
    fontSize: 9,
    color: '#34495e',
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
    color: '#2c3e50',
    backgroundColor: '#ecf0f1',
    paddingVertical: 4,
    paddingHorizontal: 9,
    borderRadius: 3,
    marginRight: 6,
    marginBottom: 6,
    fontWeight: 600,
    borderWidth: 1,
    borderColor: '#bdc3c7',
  },

  // Education
  educationItem: {
    marginBottom: 18,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ecf0f1',
  },
  educationRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  degreeTitle: {
    fontSize: 10.5,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 4,
    lineHeight: 1.3,
  },
  institutionName: {
    fontSize: 9.5,
    color: '#34495e',
    marginBottom: 3,
    fontWeight: 600,
  },
  educationYear: {
    fontSize: 8.5,
    color: '#FFFFFF',
    backgroundColor: '#34495e',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 3,
    alignSelf: 'flex-start',
    fontWeight: 600,
  },
});

const filterNA = (value) => (value && value !== 'N/A' ? value : '');

export default function Theme7({ userdata, userImage, themeName = 'modern' }) {
  const safeUserData = {
    personalInfo: {
      fullName: userdata?.personalInfo?.fullName || '',
      title: userdata?.personalInfo?.title || '',
      phone: userdata?.personalInfo?.phone || '',
      email: userdata?.personalInfo?.email || '',
      location: userdata?.personalInfo?.location || '',
      city: userdata?.personalInfo?.city || '',
      website: userdata?.personalInfo?.website || '',
      linkedin: userdata?.personalInfo?.linkedin || '',
      github: userdata?.personalInfo?.github || '',
      portfolio: userdata?.personalInfo?.portfolio || ''
    },
    professionalSummary: userdata?.professionalSummary || '',
    jobSearchTitle: userdata?.jobSearchTitle || '',
    skills: {
      technical: userdata?.skills?.technical || [],
      soft: userdata?.skills?.soft || [],
      languages: userdata?.skills?.languages || []
    },
    tools: userdata?.tools || [],
    hobbies: userdata?.hobbies || [],
    experience: userdata?.experience || [],
    education: userdata?.education || [],
    projects: userdata?.projects || [],
    certifications: userdata?.certifications || [],
    awards: userdata?.awards || [],
    publications: userdata?.publications || [],
    volunteerExperience: userdata?.volunteerExperience || [],
    image: userdata?.image || []
  };

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header Section */}
        <View style={styles.header}>
          <View style={styles.headerContent}>
            {safeUserData.image && safeUserData.image[0] && (
              <View style={styles.profileImageContainer}>
                <Image style={styles.profileImage} src={safeUserData.image[0]} />
              </View>
            )}
            
            <Text style={styles.name}>{filterNA(safeUserData.personalInfo.fullName)}</Text>
            <Text style={styles.jobTitle}>{filterNA(safeUserData.jobSearchTitle || safeUserData.personalInfo.title)}</Text>
            
            <View style={styles.contactBar}>
              {filterNA(safeUserData.personalInfo.phone) && (
                <>
                  <Text style={styles.contactText}>{safeUserData.personalInfo.phone}</Text>
                  <Text style={styles.contactSeparator}>•</Text>
                </>
              )}
              {filterNA(safeUserData.personalInfo.email) && (
                <>
                  <Text style={styles.contactText}>{safeUserData.personalInfo.email}</Text>
                  {(filterNA(safeUserData.personalInfo.city) || filterNA(safeUserData.personalInfo.location)) && (
                    <Text style={styles.contactSeparator}>•</Text>
                  )}
                </>
              )}
              {filterNA(safeUserData.personalInfo.city) && (
                <Text style={styles.contactText}>{safeUserData.personalInfo.city}</Text>
              )}
              {!filterNA(safeUserData.personalInfo.city) && filterNA(safeUserData.personalInfo.location) && (
                <Text style={styles.contactText}>{safeUserData.personalInfo.location}</Text>
              )}
            </View>
            
            {(filterNA(safeUserData.personalInfo.website) || filterNA(safeUserData.personalInfo.linkedin) || filterNA(safeUserData.personalInfo.github)) && (
              <View style={styles.contactBar}>
                {filterNA(safeUserData.personalInfo.website) && (
                  <>
                    <Text style={styles.contactText}>{safeUserData.personalInfo.website}</Text>
                    {(filterNA(safeUserData.personalInfo.linkedin) || filterNA(safeUserData.personalInfo.github)) && (
                      <Text style={styles.contactSeparator}>•</Text>
                    )}
                  </>
                )}
                {filterNA(safeUserData.personalInfo.linkedin) && (
                  <>
                    <Text style={styles.contactText}>{safeUserData.personalInfo.linkedin}</Text>
                    {filterNA(safeUserData.personalInfo.github) && (
                      <Text style={styles.contactSeparator}>•</Text>
                    )}
                  </>
                )}
                {filterNA(safeUserData.personalInfo.github) && (
                  <Text style={styles.contactText}>{safeUserData.personalInfo.github}</Text>
                )}
              </View>
            )}
          </View>
        </View>

        {/* Main Layout */}
        <View style={styles.mainLayout}>
          {/* Left Column */}
          <View style={styles.leftColumn}>
            {/* Languages */}
            {safeUserData.skills.languages.length > 0 && (
              <View style={styles.leftSection}>
                <Text style={styles.leftSectionHeading}>Langues</Text>
                {safeUserData.skills.languages.map((language, index) => (
                  <View key={index} style={styles.languageItem}>
                    <View style={styles.skillBullet} />
                    <Text style={styles.skillItem}>{language}</Text>
                  </View>
                ))}
              </View>
            )}

            {/* Technical Skills */}
            {safeUserData.skills.technical.length > 0 && (
              <View style={styles.leftSection}>
                <Text style={styles.leftSectionHeading}>Compétences Techniques</Text>
                {safeUserData.skills.technical.map((skill, index) => (
                  <View key={index}>
                    <View style={styles.skillBullet} />
                    <Text style={styles.skillItem}>{skill}</Text>
                  </View>
                ))}
              </View>
            )}

            {/* Soft Skills */}
            {safeUserData.skills.soft.length > 0 && (
              <View style={styles.leftSection}>
                <Text style={styles.leftSectionHeading}>Soft Skills</Text>
                {safeUserData.skills.soft.map((skill, index) => (
                  <View key={index}>
                    <View style={styles.skillBullet} />
                    <Text style={styles.skillItem}>{skill}</Text>
                  </View>
                ))}
              </View>
            )}

            {/* Tools */}
            {safeUserData.tools.length > 0 && (
              <View style={styles.leftSection}>
                <Text style={styles.leftSectionHeading}>Outils</Text>
                <View style={styles.toolsContainer}>
                  {safeUserData.tools.map((tool, index) => (
                    <Text key={index} style={styles.toolTag}>{tool}</Text>
                  ))}
                </View>
              </View>
            )}

            {/* Hobbies */}
            {safeUserData.hobbies.length > 0 && (
              <View style={styles.leftSection}>
                <Text style={styles.leftSectionHeading}>Loisirs</Text>
                <View style={styles.hobbiesContainer}>
                  {safeUserData.hobbies.map((hobby, index) => (
                    <Text key={index} style={styles.hobbyTag}>{hobby}</Text>
                  ))}
                </View>
              </View>
            )}
          </View>

          {/* Right Column */}
          <View style={styles.rightColumn}>
            {/* Professional Summary */}
            {filterNA(safeUserData.professionalSummary) && (
              <View style={styles.section}>
                <Text style={styles.sectionHeading}>Profil Professionnel</Text>
                <Text style={styles.profileText}>{safeUserData.professionalSummary}</Text>
              </View>
            )}

            {/* Work Experience */}
            {safeUserData.experience.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionHeading}>Expérience Professionnelle</Text>
                {safeUserData.experience.map((exp, index) => (
                  <View key={index} style={styles.timelineItem}>
                    <View style={styles.itemRow}>
                      <View style={styles.itemLeft}>
                        <Text style={styles.itemTitle}>{filterNA(exp.title)}</Text>
                        <Text style={styles.itemSubtitle}>{filterNA(exp.company)}</Text>
                        {filterNA(exp.location) && (
                          <Text style={styles.itemLocation}>📍 {exp.location}</Text>
                        )}
                      </View>
                      <Text style={styles.itemPeriod}>
                        {filterNA(exp.startDate)} - {filterNA(exp.endDate || 'Présent')}
                      </Text>
                    </View>
                    
                    {Array.isArray(exp.responsibilities) && exp.responsibilities.length > 0 && (
                      <View style={styles.bulletList}>
                        {exp.responsibilities.map((responsibility, idx) => (
                          <View key={idx}>
                            <Text style={styles.bullet}>•</Text>
                            <Text style={styles.bulletItem}>{responsibility}</Text>
                          </View>
                        ))}
                      </View>
                    )}
                    
                    {Array.isArray(exp.achievements) && exp.achievements.length > 0 && (
                      <View style={styles.bulletList}>
                        {exp.achievements.map((achievement, idx) => (
                          <View key={`ach-${idx}`}>
                            <Text style={styles.bullet}>•</Text>
                            <Text style={styles.bulletItem}>{achievement}</Text>
                          </View>
                        ))}
                      </View>
                    )}
                  </View>
                ))}
              </View>
            )}

            {/* Projects */}
            {safeUserData.projects.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionHeading}>Projets</Text>
                {safeUserData.projects.map((project, index) => (
                  <View key={index} style={styles.timelineItem}>
                    <Text style={styles.itemTitle}>{project.title || ''}</Text>
                    {project.role && <Text style={styles.itemSubtitle}>{project.role}</Text>}
                    <Text style={styles.projectDescription}>{project.description || ''}</Text>
                    
                    {Array.isArray(project.technologiesUsed) && project.technologiesUsed.length > 0 && (
                      <View style={styles.techContainer}>
                        {project.technologiesUsed.map((tech, techIdx) => (
                          <Text key={techIdx} style={styles.techTag}>{tech}</Text>
                        ))}
                      </View>
                    )}
                    
                    {project.github && (
                      <View style={styles.bulletList}>
                        <View>
                          <Text style={styles.bullet}>•</Text>
                          <Text style={styles.bulletItem}>GitHub: {project.github}</Text>
                        </View>
                      </View>
                    )}
                  </View>
                ))}
              </View>
            )}

            {/* Education */}
            {safeUserData.education.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionHeading}>Formation</Text>
                {safeUserData.education.map((edu, index) => (
                  <View key={index} style={styles.educationItem}>
                    <View style={styles.educationRow}>
                      <View style={styles.itemLeft}>
                        <Text style={styles.degreeTitle}>{filterNA(edu.degree)}</Text>
                        <Text style={styles.institutionName}>{filterNA(edu.institution)}</Text>
                        {filterNA(edu.location) && (
                          <Text style={styles.itemLocation}>📍 {edu.location}</Text>
                        )}
                      </View>
                      {filterNA(edu.graduationYear) && (
                        <Text style={styles.educationYear}>{edu.graduationYear}</Text>
                      )}
                    </View>
                    
                    {Array.isArray(edu.relevantCourses) && edu.relevantCourses.length > 0 && (
                      <View style={styles.bulletList}>
                        {edu.relevantCourses.map((course, idx) => (
                          <View key={idx}>
                            <Text style={styles.bullet}>•</Text>
                            <Text style={styles.bulletItem}>{course}</Text>
                          </View>
                        ))}
                      </View>
                    )}
                  </View>
                ))}
              </View>
            )}

            {/* Certifications */}
            {safeUserData.certifications.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionHeading}>Certifications</Text>
                {safeUserData.certifications.map((cert, index) => (
                  <View key={index} style={styles.timelineItem}>
                    <View style={styles.itemRow}>
                      <View style={styles.itemLeft}>
                        <Text style={styles.itemTitle}>{filterNA(cert.name)}</Text>
                        <Text style={styles.itemSubtitle}>{filterNA(cert.issuer)}</Text>
                        {cert.expiryDate && (
                          <Text style={styles.itemLocation}>Valide jusqu'à: {cert.expiryDate}</Text>
                        )}
                      </View>
                      {cert.year && <Text style={styles.itemPeriod}>{cert.year}</Text>}
                    </View>
                  </View>
                ))}
              </View>
            )}

            {/* Volunteer Experience */}
            {safeUserData.volunteerExperience.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionHeading}>Expérience Bénévole</Text>
                {safeUserData.volunteerExperience.map((vol, index) => (
                  <View key={index} style={styles.timelineItem}>
                    <Text style={styles.itemTitle}>{filterNA(vol.role)}</Text>
                    <Text style={styles.itemSubtitle}>{filterNA(vol.organization)}</Text>
                    <Text style={styles.projectDescription}>{filterNA(vol.description)}</Text>
                  </View>
                ))}
              </View>
            )}

            {/* Publications */}
            {safeUserData.publications.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionHeading}>Publications</Text>
                {safeUserData.publications.map((pub, index) => (
                  <View key={index} style={styles.timelineItem}>
                    <View style={styles.itemRow}>
                      <View style={styles.itemLeft}>
                        <Text style={styles.itemTitle}>{filterNA(pub.title)}</Text>
                        <Text style={styles.itemSubtitle}>{filterNA(pub.publisher)}</Text>
                      </View>
                      {pub.date && <Text style={styles.itemPeriod}>{pub.date}</Text>}
                    </View>
                  </View>
                ))}
              </View>
            )}

            {/* Awards */}
            {safeUserData.awards.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionHeading}>Récompenses</Text>
                {safeUserData.awards.map((award, index) => (
                  <View key={index} style={styles.timelineItem}>
                    <View style={styles.itemRow}>
                      <View style={styles.itemLeft}>
                        <Text style={styles.itemTitle}>{filterNA(award.title)}</Text>
                        <Text style={styles.itemSubtitle}>{filterNA(award.issuer)}</Text>
                      </View>
                      {award.year && <Text style={styles.itemPeriod}>{award.year}</Text>}
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