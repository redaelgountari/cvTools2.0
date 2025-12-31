
import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';

// Register fonts would go here in production

const COLORS = {
  primary: '#1a1a2e',
  secondary: '#16213e',
  accent: '#0f3460',
  gold: '#e94560',
  textDark: '#1a1a2e',
  textMedium: '#4a4a68',
  textLight: '#6e6e8f',
  border: '#e8e8f0',
  background: '#fafafa',
  white: '#ffffff',
};

const styles = StyleSheet.create({
  page: {
    backgroundColor: COLORS.white,
    fontFamily: 'Helvetica',
  },

  // Top Header Band
  topBand: {
    backgroundColor: COLORS.primary,
    height: 8,
  },

  // Main Header
  headerContainer: {
    paddingHorizontal: 45,
    paddingVertical: 32,
    backgroundColor: COLORS.white,
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  profileImageWrapper: {
    marginRight: 22,
  },
  profileImage: {
    width: 95,
    height: 95,
    borderRadius: 48,
    border: `4px solid ${COLORS.gold}`,
    objectFit: 'cover',
  },
  headerInfo: {
    flex: 1,
  },
  fullName: {
    fontSize: 32,
    fontFamily: 'Helvetica-Bold',
    color: COLORS.primary,
    marginBottom: 6,
    letterSpacing: 0.5,
  },
  jobTitleHeader: {
    fontSize: 13,
    color: COLORS.gold,
    letterSpacing: 2,
    textTransform: 'uppercase',
    fontFamily: 'Helvetica-Bold',
  },
  contactGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    marginTop: 14,
    paddingTop: 14,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  contactColumn: {
    flexDirection: 'row',
    alignItems: 'center',
    minWidth: '23%',
  },
  contactDot: {
    width: 5,
    height: 5,
    backgroundColor: COLORS.gold,
    borderRadius: 3,
    marginRight: 8,
  },
  contactTextSmall: {
    fontSize: 8.5,
    color: COLORS.textMedium,
  },

  // Content Layout
  contentWrapper: {
    flexDirection: 'row',
    paddingHorizontal: 45,
    paddingTop: 28,
    paddingBottom: 40,
  },

  // Main Content (Left - Wider)
  mainColumn: {
    width: '67%',
    paddingRight: 28,
  },

  // Sidebar (Right - Narrower)
  sidebarColumn: {
    width: '33%',
    paddingLeft: 28,
    borderLeftWidth: 1,
    borderLeftColor: COLORS.border,
  },

  // Section Styles
  sectionBlock: {
    marginBottom: 26,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },
  sectionAccent: {
    width: 4,
    height: 16,
    backgroundColor: COLORS.gold,
    marginRight: 10,
  },
  sectionTitle: {
    fontSize: 11.5,
    fontFamily: 'Helvetica-Bold',
    color: COLORS.primary,
    textTransform: 'uppercase',
    letterSpacing: 1.5,
  },

  // Professional Summary
  summaryText: {
    fontSize: 9.5,
    lineHeight: 1.7,
    color: COLORS.textMedium,
    textAlign: 'justify',
  },

  // Experience Items
  experienceEntry: {
    marginBottom: 20,
    paddingBottom: 18,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  experienceHeader: {
    marginBottom: 8,
  },
  positionTitle: {
    fontSize: 11,
    fontFamily: 'Helvetica-Bold',
    color: COLORS.primary,
    marginBottom: 4,
    lineHeight: 1.3,
  },
  companyRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 3,
  },
  companyName: {
    fontSize: 9.5,
    color: COLORS.textMedium,
    fontFamily: 'Helvetica-Bold',
  },
  dateRangeText: {
    fontSize: 8.5,
    color: COLORS.textLight,
    fontStyle: 'italic',
  },
  locationText: {
    fontSize: 8.5,
    color: COLORS.textLight,
  },
  responsibilitiesList: {
    marginTop: 8,
  },
  responsibilityRow: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  responsibilityBullet: {
    width: 4,
    height: 4,
    backgroundColor: COLORS.gold,
    borderRadius: 2,
    marginRight: 10,
    marginTop: 5,
  },
  responsibilityText: {
    fontSize: 9,
    lineHeight: 1.6,
    color: COLORS.textMedium,
    flex: 1,
  },

  // Education Items
  educationEntry: {
    marginBottom: 16,
  },
  degreeText: {
    fontSize: 10,
    fontFamily: 'Helvetica-Bold',
    color: COLORS.primary,
    marginBottom: 3,
    lineHeight: 1.3,
  },
  institutionText: {
    fontSize: 9,
    color: COLORS.textMedium,
    marginBottom: 2,
  },
  yearText: {
    fontSize: 8,
    color: COLORS.textLight,
  },

  // Projects
  projectEntry: {
    marginBottom: 18,
  },
  projectTitle: {
    fontSize: 10,
    fontFamily: 'Helvetica-Bold',
    color: COLORS.primary,
    marginBottom: 5,
  },
  projectDescription: {
    fontSize: 9,
    lineHeight: 1.6,
    color: COLORS.textMedium,
    marginBottom: 6,
  },
  techTagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  techTag: {
    fontSize: 7.5,
    color: COLORS.primary,
    backgroundColor: COLORS.background,
    paddingVertical: 4,
    paddingHorizontal: 9,
    borderRadius: 3,
    borderWidth: 1,
    borderColor: COLORS.border,
  },

  // Sidebar Sections
  sidebarSection: {
    marginBottom: 24,
  },
  sidebarTitle: {
    fontSize: 10,
    fontFamily: 'Helvetica-Bold',
    color: COLORS.primary,
    textTransform: 'uppercase',
    marginBottom: 12,
    letterSpacing: 1.2,
    paddingBottom: 6,
    borderBottomWidth: 2,
    borderBottomColor: COLORS.gold,
  },

  // Skills
  skillCategory: {
    marginBottom: 14,
  },
  skillCategoryTitle: {
    fontSize: 9,
    fontFamily: 'Helvetica-Bold',
    color: COLORS.textDark,
    marginBottom: 6,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  skillItem: {
    fontSize: 8.5,
    color: COLORS.textMedium,
    marginBottom: 4,
    paddingLeft: 10,
    lineHeight: 1.4,
  },
  skillBullet: {
    position: 'absolute',
    left: 0,
    top: 4,
    width: 3,
    height: 3,
    backgroundColor: COLORS.gold,
    borderRadius: 2,
  },

  // Languages
  languageRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 7,
    paddingBottom: 6,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  languageNameText: {
    fontSize: 8.5,
    color: COLORS.textDark,
    fontFamily: 'Helvetica-Bold',
  },
  languageLevelText: {
    fontSize: 7.5,
    color: COLORS.textLight,
  },

  // Tools/Hobbies Tags
  tagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  tag: {
    fontSize: 7.5,
    color: COLORS.textDark,
    backgroundColor: COLORS.background,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.border,
  },

  // Certifications
  certificationEntry: {
    marginBottom: 14,
  },
  certName: {
    fontSize: 9,
    fontFamily: 'Helvetica-Bold',
    color: COLORS.primary,
    marginBottom: 3,
  },
  certIssuer: {
    fontSize: 8.5,
    color: COLORS.textMedium,
    marginBottom: 2,
  },
  certYear: {
    fontSize: 7.5,
    color: COLORS.textLight,
  },
});

const filterNA = (value) => (value && value !== 'N/A' ? value : '');

export default function Theme3({ userdata, userImage }) {
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
        {/* Top Accent Band */}
        <View style={styles.topBand} />

        {/* Header Section */}
        <View style={styles.headerContainer}>
          <View style={styles.headerTop}>
            {safeUserData.image && safeUserData.image[0] && (
              <View style={styles.profileImageWrapper}>
                <Image style={styles.profileImage} src={safeUserData.image[0]} />
              </View>
            )}
            
            <View style={styles.headerInfo}>
              <Text style={styles.fullName}>{filterNA(safeUserData.personalInfo.fullName)}</Text>
              <Text style={styles.jobTitleHeader}>
                {filterNA(safeUserData.jobSearchTitle || safeUserData.personalInfo.title)}
              </Text>
            </View>
          </View>

          <View style={styles.contactGrid}>
            {filterNA(safeUserData.personalInfo.email) && (
              <View style={styles.contactColumn}>
                <View style={styles.contactDot} />
                <Text style={styles.contactTextSmall}>{safeUserData.personalInfo.email}</Text>
              </View>
            )}
            {filterNA(safeUserData.personalInfo.phone) && (
              <View style={styles.contactColumn}>
                <View style={styles.contactDot} />
                <Text style={styles.contactTextSmall}>{safeUserData.personalInfo.phone}</Text>
              </View>
            )}
            {filterNA(safeUserData.personalInfo.location) && (
              <View style={styles.contactColumn}>
                <View style={styles.contactDot} />
                <Text style={styles.contactTextSmall}>{safeUserData.personalInfo.location}</Text>
              </View>
            )}
            {filterNA(safeUserData.personalInfo.linkedin) && (
              <View style={styles.contactColumn}>
                <View style={styles.contactDot} />
                <Text style={styles.contactTextSmall}>{safeUserData.personalInfo.linkedin}</Text>
              </View>
            )}
            {filterNA(safeUserData.personalInfo.website) && (
              <View style={styles.contactColumn}>
                <View style={styles.contactDot} />
                <Text style={styles.contactTextSmall}>{safeUserData.personalInfo.website}</Text>
              </View>
            )}
            {filterNA(safeUserData.personalInfo.github) && (
              <View style={styles.contactColumn}>
                <View style={styles.contactDot} />
                <Text style={styles.contactTextSmall}>{safeUserData.personalInfo.github}</Text>
              </View>
            )}
          </View>
        </View>

        {/* Main Content Area */}
        <View style={styles.contentWrapper}>
          {/* Main Column (Left - Wider) */}
          <View style={styles.mainColumn}>
            {/* Professional Summary */}
            {filterNA(safeUserData.professionalSummary) && (
              <View style={styles.sectionBlock}>
                <View style={styles.sectionHeader}>
                  <View style={styles.sectionAccent} />
                  <Text style={styles.sectionTitle}>Profil Professionnel</Text>
                </View>
                <Text style={styles.summaryText}>{safeUserData.professionalSummary}</Text>
              </View>
            )}

            {/* Work Experience */}
            {safeUserData.experience.length > 0 && (
              <View style={styles.sectionBlock}>
                <View style={styles.sectionHeader}>
                  <View style={styles.sectionAccent} />
                  <Text style={styles.sectionTitle}>Expérience Professionnelle</Text>
                </View>
                {safeUserData.experience.map((exp, index) => (
                  <View key={index} style={styles.experienceEntry}>
                    <View style={styles.experienceHeader}>
                      <Text style={styles.positionTitle}>{filterNA(exp.title)}</Text>
                      <View style={styles.companyRow}>
                        <Text style={styles.companyName}>{filterNA(exp.company)}</Text>
                        <Text style={styles.dateRangeText}>
                          {filterNA(exp.startDate)} - {filterNA(exp.endDate || 'Présent')}
                        </Text>
                      </View>
                      {filterNA(exp.location) && (
                        <Text style={styles.locationText}>📍 {exp.location}</Text>
                      )}
                    </View>

                    {Array.isArray(exp.responsibilities) && exp.responsibilities.length > 0 && (
                      <View style={styles.responsibilitiesList}>
                        {exp.responsibilities.map((resp, idx) => (
                          <View key={idx} style={styles.responsibilityRow}>
                            <View style={styles.responsibilityBullet} />
                            <Text style={styles.responsibilityText}>{resp}</Text>
                          </View>
                        ))}
                      </View>
                    )}

                    {Array.isArray(exp.achievements) && exp.achievements.length > 0 && (
                      <View style={styles.responsibilitiesList}>
                        {exp.achievements.map((achievement, idx) => (
                          <View key={`ach-${idx}`} style={styles.responsibilityRow}>
                            <View style={styles.responsibilityBullet} />
                            <Text style={styles.responsibilityText}>{achievement}</Text>
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
              <View style={styles.sectionBlock}>
                <View style={styles.sectionHeader}>
                  <View style={styles.sectionAccent} />
                  <Text style={styles.sectionTitle}>Projets</Text>
                </View>
                {safeUserData.projects.map((project, index) => (
                  <View key={index} style={styles.projectEntry}>
                    <Text style={styles.projectTitle}>{project.title || ''}</Text>
                    {project.role && (
                      <Text style={styles.companyName}>{project.role}</Text>
                    )}
                    <Text style={styles.projectDescription}>{project.description || ''}</Text>
                    
                    {Array.isArray(project.technologiesUsed) && project.technologiesUsed.length > 0 && (
                      <View style={styles.techTagsContainer}>
                        {project.technologiesUsed.map((tech, techIdx) => (
                          <Text key={techIdx} style={styles.techTag}>{tech}</Text>
                        ))}
                      </View>
                    )}

                    {project.github && (
                      <Text style={styles.locationText}>GitHub: {project.github}</Text>
                    )}
                  </View>
                ))}
              </View>
            )}

            {/* Education */}
            {safeUserData.education.length > 0 && (
              <View style={styles.sectionBlock}>
                <View style={styles.sectionHeader}>
                  <View style={styles.sectionAccent} />
                  <Text style={styles.sectionTitle}>Formation</Text>
                </View>
                {safeUserData.education.map((edu, index) => (
                  <View key={index} style={styles.educationEntry}>
                    <Text style={styles.degreeText}>{filterNA(edu.degree)}</Text>
                    <Text style={styles.institutionText}>{filterNA(edu.institution)}</Text>
                    {filterNA(edu.location) && (
                      <Text style={styles.locationText}>📍 {edu.location}</Text>
                    )}
                    {filterNA(edu.graduationYear) && (
                      <Text style={styles.yearText}>{edu.graduationYear}</Text>
                    )}
                    
                    {Array.isArray(edu.relevantCourses) && edu.relevantCourses.length > 0 && (
                      <View style={styles.responsibilitiesList}>
                        {edu.relevantCourses.map((course, idx) => (
                          <View key={idx} style={styles.responsibilityRow}>
                            <View style={styles.responsibilityBullet} />
                            <Text style={styles.responsibilityText}>{course}</Text>
                          </View>
                        ))}
                      </View>
                    )}
                  </View>
                ))}
              </View>
            )}

            {/* Publications */}
            {safeUserData.publications.length > 0 && (
              <View style={styles.sectionBlock}>
                <View style={styles.sectionHeader}>
                  <View style={styles.sectionAccent} />
                  <Text style={styles.sectionTitle}>Publications</Text>
                </View>
                {safeUserData.publications.map((pub, index) => (
                  <View key={index} style={styles.educationEntry}>
                    <Text style={styles.degreeText}>{filterNA(pub.title)}</Text>
                    <Text style={styles.institutionText}>{filterNA(pub.publisher)}</Text>
                    {pub.date && <Text style={styles.yearText}>{pub.date}</Text>}
                  </View>
                ))}
              </View>
            )}

            {/* Awards */}
            {safeUserData.awards.length > 0 && (
              <View style={styles.sectionBlock}>
                <View style={styles.sectionHeader}>
                  <View style={styles.sectionAccent} />
                  <Text style={styles.sectionTitle}>Récompenses</Text>
                </View>
                {safeUserData.awards.map((award, index) => (
                  <View key={index} style={styles.educationEntry}>
                    <Text style={styles.degreeText}>{filterNA(award.title)}</Text>
                    <Text style={styles.institutionText}>{filterNA(award.issuer)}</Text>
                    {award.year && <Text style={styles.yearText}>{award.year}</Text>}
                  </View>
                ))}
              </View>
            )}

            {/* Volunteer Experience */}
            {safeUserData.volunteerExperience.length > 0 && (
              <View style={styles.sectionBlock}>
                <View style={styles.sectionHeader}>
                  <View style={styles.sectionAccent} />
                  <Text style={styles.sectionTitle}>Expérience Bénévole</Text>
                </View>
                {safeUserData.volunteerExperience.map((vol, index) => (
                  <View key={index} style={styles.educationEntry}>
                    <Text style={styles.degreeText}>{filterNA(vol.role)}</Text>
                    <Text style={styles.institutionText}>{filterNA(vol.organization)}</Text>
                    {vol.description && (
                      <Text style={styles.projectDescription}>{filterNA(vol.description)}</Text>
                    )}
                  </View>
                ))}
              </View>
            )}
          </View>

          {/* Sidebar Column (Right - Narrower) */}
          <View style={styles.sidebarColumn}>
            {/* Languages */}
            {safeUserData.skills.languages.length > 0 && (
              <View style={styles.sidebarSection}>
                <Text style={styles.sidebarTitle}>Langues</Text>
                {safeUserData.skills.languages.map((language, index) => (
                  <View key={index} style={styles.languageRow}>
                    <Text style={styles.languageNameText}>{language}</Text>
                  </View>
                ))}
              </View>
            )}

            {/* Technical Skills */}
            {safeUserData.skills.technical.length > 0 && (
              <View style={styles.sidebarSection}>
                <Text style={styles.sidebarTitle}>Compétences Techniques</Text>
                <View style={styles.skillCategory}>
                  {safeUserData.skills.technical.map((skill, index) => (
                    <View key={index}>
                      <View style={styles.skillBullet} />
                      <Text style={styles.skillItem}>{skill}</Text>
                    </View>
                  ))}
                </View>
              </View>
            )}

            {/* Soft Skills */}
            {safeUserData.skills.soft.length > 0 && (
              <View style={styles.sidebarSection}>
                <Text style={styles.sidebarTitle}>Soft Skills</Text>
                <View style={styles.skillCategory}>
                  {safeUserData.skills.soft.map((skill, index) => (
                    <View key={index}>
                      <View style={styles.skillBullet} />
                      <Text style={styles.skillItem}>{skill}</Text>
                    </View>
                  ))}
                </View>
              </View>
            )}

            {/* Tools */}
            {safeUserData.tools.length > 0 && (
              <View style={styles.sidebarSection}>
                <Text style={styles.sidebarTitle}>Outils</Text>
                <View style={styles.tagContainer}>
                  {safeUserData.tools.map((tool, index) => (
                    <Text key={index} style={styles.tag}>{tool}</Text>
                  ))}
                </View>
              </View>
            )}

            {/* Certifications */}
            {safeUserData.certifications.length > 0 && (
              <View style={styles.sidebarSection}>
                <Text style={styles.sidebarTitle}>Certifications</Text>
                {safeUserData.certifications.map((cert, index) => (
                  <View key={index} style={styles.certificationEntry}>
                    <Text style={styles.certName}>{filterNA(cert.name)}</Text>
                    <Text style={styles.certIssuer}>{filterNA(cert.issuer)}</Text>
                    {cert.year && <Text style={styles.certYear}>{cert.year}</Text>}
                    {cert.expiryDate && (
                      <Text style={styles.certYear}>Valide jusqu'à: {cert.expiryDate}</Text>
                    )}
                  </View>
                ))}
              </View>
            )}

            {/* Hobbies */}
            {safeUserData.hobbies.length > 0 && (
              <View style={styles.sidebarSection}>
                <Text style={styles.sidebarTitle}>Loisirs</Text>
                <View style={styles.tagContainer}>
                  {safeUserData.hobbies.map((hobby, index) => (
                    <Text key={index} style={styles.tag}>{hobby}</Text>
                  ))}
                </View>
              </View>
            )}
          </View>
        </View>
      </Page>
    </Document>
  );
}