
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
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    fontFamily: 'Inter',
  },
  
  // Sidebar
  sidebar: {
    width: '33%',
    backgroundColor: '#1a1f36',
    padding: 0,
  },
  sidebarContent: {
    padding: 20,
    paddingTop: 28,
  },
  profileImageContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 22,
  },
  profileImage: {
    width: 90,
    height: 90,
    borderRadius: 45,
    border: '3px solid #4f46e5',
    objectFit: 'cover',
  },
  sidebarSection: {
    marginBottom: 20,
  },
  sidebarHeading: {
    fontSize: 9,
    fontWeight: 'bold',
    color: '#818cf8',
    textTransform: 'uppercase',
    marginBottom: 10,
    letterSpacing: 1.5,
    paddingBottom: 6,
    borderBottomWidth: 1.5,
    borderBottomColor: '#2d3347',
  },
  contactItem: {
    marginBottom: 9,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  contactIcon: {
    width: 3.5,
    height: 3.5,
    backgroundColor: '#818cf8',
    borderRadius: 2,
    marginRight: 9,
    marginTop: 5,
  },
  contactText: {
    fontSize: 8.5,
    color: '#d1d5db',
    lineHeight: 1.5,
    flex: 1,
  },
  skillsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 5,
  },
  skillTag: {
    fontSize: 7.5,
    color: '#e0e7ff',
    backgroundColor: '#312e81',
    paddingVertical: 4,
    paddingHorizontal: 9,
    borderRadius: 4,
    marginBottom: 5,
    marginRight: 5,
    borderWidth: 0.5,
    borderColor: '#4f46e5',
  },
  languageItem: {
    marginBottom: 9,
    paddingBottom: 7,
    borderBottomWidth: 0.5,
    borderBottomColor: '#2d3347',
    flexDirection: 'row',
    alignItems: 'center',
  },
  languageText: {
    fontSize: 8.5,
    color: '#d1d5db',
    marginLeft: 9,
  },
  toolItem: {
    fontSize: 8.5,
    color: '#d1d5db',
    marginBottom: 8,
    paddingLeft: 12,
    position: 'relative',
  },
  toolBullet: {
    position: 'absolute',
    left: 0,
    top: 5,
    width: 3.5,
    height: 3.5,
    backgroundColor: '#818cf8',
    borderRadius: 2,
  },
  hobbyItem: {
    fontSize: 7.5,
    color: '#e0e7ff',
    backgroundColor: '#2d3347',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 10,
    marginBottom: 6,
    marginRight: 6,
  },
  hobbiesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },

  // Main Content
  mainContent: {
    width: '67%',
    padding: 0,
  },
  headerSection: {
    backgroundColor: '#f8fafc',
    padding: 30,
    paddingVertical: 26,
    borderBottomWidth: 2,
    borderBottomColor: '#4f46e5',
  },
  name: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 6,
    letterSpacing: -0.5,
    lineHeight: 1.2,
  },
  jobTitle: {
    fontSize: 13,
    color: '#4f46e5',
    fontWeight: 600,
    marginBottom: 5,
    letterSpacing: 0.5,
  },
  locationText: {
    fontSize: 9.5,
    color: '#6b7280',
    marginTop: 2,
  },
  mainContentPadding: {
    padding: 26,
    paddingTop: 22,
  },
  mainSection: {
    marginBottom: 22,
  },
  sectionHeading: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#111827',
    textTransform: 'uppercase',
    marginBottom: 12,
    letterSpacing: 1.2,
    paddingBottom: 5,
    borderBottomWidth: 2,
    borderBottomColor: '#e5e7eb',
  },
  profileText: {
    fontSize: 9.5,
    color: '#4b5563',
    lineHeight: 1.65,
    textAlign: 'justify',
  },
  
  // Timeline
  timelineItem: {
    marginBottom: 16,
    paddingLeft: 18,
    position: 'relative',
  },
  timelineDot: {
    position: 'absolute',
    left: 0,
    top: 4,
    width: 7,
    height: 7,
    backgroundColor: '#4f46e5',
    borderRadius: 4,
    borderWidth: 1.5,
    borderColor: '#c7d2fe',
  },
  timelineLine: {
    position: 'absolute',
    left: 2.5,
    top: 11,
    width: 1.5,
    bottom: -16,
    backgroundColor: '#e5e7eb',
  },
  itemHeader: {
    marginBottom: 6,
  },
  itemTitle: {
    fontSize: 10.5,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 3,
    lineHeight: 1.4,
  },
  itemSubtitle: {
    fontSize: 9.5,
    color: '#4f46e5',
    marginBottom: 3,
    fontWeight: 600,
  },
  itemLocation: {
    fontSize: 8.5,
    color: '#6b7280',
    marginBottom: 4,
  },
  itemPeriod: {
    fontSize: 8,
    color: '#FFFFFF',
    backgroundColor: '#4f46e5',
    paddingVertical: 3,
    paddingHorizontal: 9,
    borderRadius: 8,
    marginTop: 4,
    alignSelf: 'flex-start',
    fontWeight: 600,
  },
  bulletList: {
    marginTop: 6,
  },
  bulletItem: {
    fontSize: 9,
    color: '#4b5563',
    marginBottom: 5,
    paddingLeft: 12,
    position: 'relative',
    lineHeight: 1.6,
  },
  bullet: {
    position: 'absolute',
    left: 0,
    top: 0,
    fontSize: 8,
    color: '#4f46e5',
    fontWeight: 'bold',
  },
  
  // Projects
  projectDescription: {
    fontSize: 9,
    color: '#4b5563',
    marginBottom: 6,
    lineHeight: 1.6,
    marginTop: 3,
  },
  techContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 6,
  },
  techTag: {
    fontSize: 7,
    color: '#1e40af',
    backgroundColor: '#dbeafe',
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: 4,
    marginRight: 5,
    marginBottom: 5,
    fontWeight: 600,
    borderWidth: 0.5,
    borderColor: '#93c5fd',
  },
  
  // Education
  degreeTitle: {
    fontSize: 10.5,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 3,
    lineHeight: 1.4,
  },
  institutionName: {
    fontSize: 9.5,
    color: '#4f46e5',
    marginBottom: 3,
    fontWeight: 600,
  },
  educationDetails: {
    marginTop: 2,
  },
  educationPeriod: {
    fontSize: 8,
    color: '#FFFFFF',
    backgroundColor: '#4f46e5',
    paddingVertical: 3,
    paddingHorizontal: 9,
    borderRadius: 8,
    marginTop: 4,
    alignSelf: 'flex-start',
    fontWeight: 600,
  },
});

const filterNA = (value) => (value && value !== 'N/A' ? value : '');

export default function AdaptiveResume({ userdata, userImage, themeName = 'modern' }) {
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
        {/* Sidebar */}
        <View style={styles.sidebar}>
          <View style={styles.sidebarContent}>
            {/* Profile Image */}
            {safeUserData.image && safeUserData.image[0] && (
              <View style={styles.profileImageContainer}>
                <Image style={styles.profileImage} src={safeUserData.image[0]} />
              </View>
            )}

            {/* Contact Section */}
            <View style={styles.sidebarSection}>
              <Text style={styles.sidebarHeading}>Contact</Text>
              
              {filterNA(safeUserData.personalInfo.phone) && (
                <View style={styles.contactItem}>
                  <View style={styles.contactIcon} />
                  <Text style={styles.contactText}>{safeUserData.personalInfo.phone}</Text>
                </View>
              )}
              
              {filterNA(safeUserData.personalInfo.email) && (
                <View style={styles.contactItem}>
                  <View style={styles.contactIcon} />
                  <Text style={styles.contactText}>{safeUserData.personalInfo.email}</Text>
                </View>
              )}
              
              {filterNA(safeUserData.personalInfo.location) && (
                <View style={styles.contactItem}>
                  <View style={styles.contactIcon} />
                  <Text style={styles.contactText}>{safeUserData.personalInfo.location}</Text>
                </View>
              )}
              
              {filterNA(safeUserData.personalInfo.linkedin) && (
                <View style={styles.contactItem}>
                  <View style={styles.contactIcon} />
                  <Text style={styles.contactText}>{safeUserData.personalInfo.linkedin}</Text>
                </View>
              )}
              
              {filterNA(safeUserData.personalInfo.github) && (
                <View style={styles.contactItem}>
                  <View style={styles.contactIcon} />
                  <Text style={styles.contactText}>{safeUserData.personalInfo.github}</Text>
                </View>
              )}
              
              {filterNA(safeUserData.personalInfo.website) && (
                <View style={styles.contactItem}>
                  <View style={styles.contactIcon} />
                  <Text style={styles.contactText}>{safeUserData.personalInfo.website}</Text>
                </View>
              )}
              
              {filterNA(safeUserData.personalInfo.portfolio) && (
                <View style={styles.contactItem}>
                  <View style={styles.contactIcon} />
                  <Text style={styles.contactText}>{safeUserData.personalInfo.portfolio}</Text>
                </View>
              )}
            </View>

            {/* Technical Skills */}
            {safeUserData.skills.technical.length > 0 && (
              <View style={styles.sidebarSection}>
                <Text style={styles.sidebarHeading}>Compétences Techniques</Text>
                <View style={styles.skillsGrid}>
                  {safeUserData.skills.technical.map((skill, index) => (
                    <Text key={index} style={styles.skillTag}>{skill}</Text>
                  ))}
                </View>
              </View>
            )}

            {/* Soft Skills */}
            {safeUserData.skills.soft.length > 0 && (
              <View style={styles.sidebarSection}>
                <Text style={styles.sidebarHeading}>Soft Skills</Text>
                <View style={styles.skillsGrid}>
                  {safeUserData.skills.soft.map((skill, index) => (
                    <Text key={index} style={styles.skillTag}>{skill}</Text>
                  ))}
                </View>
              </View>
            )}

            {/* Languages */}
            {safeUserData.skills.languages.length > 0 && (
              <View style={styles.sidebarSection}>
                <Text style={styles.sidebarHeading}>Langues</Text>
                {safeUserData.skills.languages.map((language, index) => (
                  <View key={index} style={styles.languageItem}>
                    <View style={styles.contactIcon} />
                    <Text style={styles.languageText}>{language}</Text>
                  </View>
                ))}
              </View>
            )}

            {/* Tools */}
            {safeUserData.tools.length > 0 && (
              <View style={styles.sidebarSection}>
                <Text style={styles.sidebarHeading}>Outils</Text>
                {safeUserData.tools.map((tool, index) => (
                  <View key={index}>
                    <View style={styles.toolBullet} />
                    <Text style={styles.toolItem}>{tool}</Text>
                  </View>
                ))}
              </View>
            )}

            {/* Hobbies */}
            {safeUserData.hobbies.length > 0 && (
              <View style={styles.sidebarSection}>
                <Text style={styles.sidebarHeading}>Loisirs</Text>
                <View style={styles.hobbiesContainer}>
                  {safeUserData.hobbies.map((hobby, index) => (
                    <Text key={index} style={styles.hobbyItem}>{hobby}</Text>
                  ))}
                </View>
              </View>
            )}
          </View>
        </View>

        {/* Main Content */}
        <View style={styles.mainContent}>
          {/* Header */}
          <View style={styles.headerSection}>
            <Text style={styles.name}>{filterNA(safeUserData.personalInfo.fullName)}</Text>
            <Text style={styles.jobTitle}>{filterNA(safeUserData.jobSearchTitle || safeUserData.personalInfo.title)}</Text>
            {filterNA(safeUserData.personalInfo.city) && (
              <Text style={styles.locationText}>📍 {safeUserData.personalInfo.city}</Text>
            )}
          </View>

          <View style={styles.mainContentPadding}>
            {/* Professional Summary */}
            {filterNA(safeUserData.professionalSummary) && (
              <View style={styles.mainSection}>
                <Text style={styles.sectionHeading}>Profil Professionnel</Text>
                <Text style={styles.profileText}>{safeUserData.professionalSummary}</Text>
              </View>
            )}

            {/* Work Experience */}
            {safeUserData.experience.length > 0 && (
              <View style={styles.mainSection}>
                <Text style={styles.sectionHeading}>Expérience Professionnelle</Text>
                {safeUserData.experience.map((exp, index) => (
                  <View key={index} style={styles.timelineItem}>
                    <View style={styles.timelineDot} />
                    {index !== safeUserData.experience.length - 1 && <View style={styles.timelineLine} />}
                    
                    <View style={styles.itemHeader}>
                      <Text style={styles.itemTitle}>{filterNA(exp.title)}</Text>
                      <Text style={styles.itemSubtitle}>{filterNA(exp.company)}</Text>
                      {filterNA(exp.location) && (
                        <Text style={styles.itemLocation}>📍 {exp.location}</Text>
                      )}
                      <Text style={styles.itemPeriod}>
                        {filterNA(exp.startDate)} - {filterNA(exp.endDate || 'Présent')}
                      </Text>
                    </View>
                    
                    {Array.isArray(exp.responsibilities) && exp.responsibilities.length > 0 && (
                      <View style={styles.bulletList}>
                        {exp.responsibilities.map((responsibility, idx) => (
                          <View key={idx}>
                            <Text style={styles.bullet}>▸</Text>
                            <Text style={styles.bulletItem}>{responsibility}</Text>
                          </View>
                        ))}
                      </View>
                    )}
                    
                    {Array.isArray(exp.achievements) && exp.achievements.length > 0 && (
                      <View style={styles.bulletList}>
                        {exp.achievements.map((achievement, idx) => (
                          <View key={`ach-${idx}`}>
                            <Text style={styles.bullet}>▸</Text>
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
              <View style={styles.mainSection}>
                <Text style={styles.sectionHeading}>Projets</Text>
                {safeUserData.projects.map((project, index) => (
                  <View key={index} style={styles.timelineItem}>
                    <View style={styles.timelineDot} />
                    {index !== safeUserData.projects.length - 1 && <View style={styles.timelineLine} />}
                    
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
                          <Text style={styles.bullet}>▸</Text>
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
              <View style={styles.mainSection}>
                <Text style={styles.sectionHeading}>Formation</Text>
                {safeUserData.education.map((edu, index) => (
                  <View key={index} style={styles.timelineItem}>
                    <View style={styles.timelineDot} />
                    {index !== safeUserData.education.length - 1 && <View style={styles.timelineLine} />}
                    
                    <Text style={styles.degreeTitle}>{filterNA(edu.degree)}</Text>
                    <Text style={styles.institutionName}>{filterNA(edu.institution)}</Text>
                    
                    <View style={styles.educationDetails}>
                      {filterNA(edu.location) && <Text style={styles.itemLocation}>📍 {edu.location}</Text>}
                      {filterNA(edu.graduationYear) && (
                        <Text style={styles.educationPeriod}>Année: {edu.graduationYear}</Text>
                      )}
                    </View>
                    
                    {Array.isArray(edu.relevantCourses) && edu.relevantCourses.length > 0 && (
                      <View style={styles.bulletList}>
                        {edu.relevantCourses.map((course, idx) => (
                          <View key={idx}>
                            <Text style={styles.bullet}>▸</Text>
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
              <View style={styles.mainSection}>
                <Text style={styles.sectionHeading}>Certifications</Text>
                {safeUserData.certifications.map((cert, index) => (
                  <View key={index} style={styles.timelineItem}>
                    <View style={styles.timelineDot} />
                    {index !== safeUserData.certifications.length - 1 && <View style={styles.timelineLine} />}
                    
                    <Text style={styles.itemTitle}>{filterNA(cert.name)}</Text>
                    <Text style={styles.itemSubtitle}>{filterNA(cert.issuer)}</Text>
                    {cert.year && <Text style={styles.itemPeriod}>Année: {cert.year}</Text>}
                    {cert.expiryDate && <Text style={styles.itemLocation}>Valide jusqu'à: {cert.expiryDate}</Text>}
                  </View>
                ))}
              </View>
            )}

            {/* Volunteer Experience */}
            {safeUserData.volunteerExperience.length > 0 && (
              <View style={styles.mainSection}>
                <Text style={styles.sectionHeading}>Expérience Bénévole</Text>
                {safeUserData.volunteerExperience.map((vol, index) => (
                  <View key={index} style={styles.timelineItem}>
                    <View style={styles.timelineDot} />
                    {index !== safeUserData.volunteerExperience.length - 1 && <View style={styles.timelineLine} />}
                    
                    <Text style={styles.itemTitle}>{filterNA(vol.role)}</Text>
                    <Text style={styles.itemSubtitle}>{filterNA(vol.organization)}</Text>
                    <Text style={styles.projectDescription}>{filterNA(vol.description)}</Text>
                  </View>
                ))}
              </View>
            )}

            {/* Publications */}
            {safeUserData.publications.length > 0 && (
              <View style={styles.mainSection}>
                <Text style={styles.sectionHeading}>Publications</Text>
                {safeUserData.publications.map((pub, index) => (
                  <View key={index} style={styles.timelineItem}>
                    <View style={styles.timelineDot} />
                    {index !== safeUserData.publications.length - 1 && <View style={styles.timelineLine} />}
                    
                    <Text style={styles.itemTitle}>{filterNA(pub.title)}</Text>
                    <Text style={styles.itemSubtitle}>{filterNA(pub.publisher)}</Text>
                    {pub.date && <Text style={styles.itemPeriod}>{pub.date}</Text>}
                  </View>
                ))}
              </View>
            )}

            {/* Awards */}
            {safeUserData.awards.length > 0 && (
              <View style={styles.mainSection}>
                <Text style={styles.sectionHeading}>Récompenses</Text>
                {safeUserData.awards.map((award, index) => (
                  <View key={index} style={styles.timelineItem}>
                    <View style={styles.timelineDot} />
                    {index !== safeUserData.awards.length - 1 && <View style={styles.timelineLine} />}
                    
                    <Text style={styles.itemTitle}>{filterNA(award.title)}</Text>
                    <Text style={styles.itemSubtitle}>{filterNA(award.issuer)}</Text>
                    {award.year && <Text style={styles.itemPeriod}>{award.year}</Text>}
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