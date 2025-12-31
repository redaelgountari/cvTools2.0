
import React from 'react';
import { Document, Page, Text, View, StyleSheet, Font, Image } from '@react-pdf/renderer';

// Register custom fonts
Font.register({
  family: 'Open Sans',
  fonts: [
    { src: 'https://fonts.gstatic.com/s/opensans/v28/memSYaGs126MiZpBA-UvWbX2vVnXBbObj2OVZyOOSr4dVJWUgsjZ0B4gaVc.ttf', fontWeight: 'normal' },
    { src: 'https://fonts.gstatic.com/s/opensans/v28/memSYaGs126MiZpBA-UvWbX2vVnXBbObj2OVZyOOSr4dVJWUgsg-1x4gaVc.ttf', fontWeight: 'bold' },
    { src: 'https://fonts.gstatic.com/s/opensans/v28/memSYaGs126MiZpBA-UvWbX2vVnXBbObj2OVZyOOSr4dVJWUgsgH1x4gaVc.ttf', fontWeight: 'semibold' },
  ],
});

const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    fontFamily: 'Open Sans',
  },
  sidebar: {
    width: '35%',
    backgroundColor: '#F8FAFC',
    padding: 30,
    paddingTop: 40,
  },
  mainContent: {
    width: '65%',
    padding: 30,
    paddingTop: 40,
  },
  header: {
    marginBottom: 30,
  },
  name: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1E293B',
    marginBottom: 6,
    letterSpacing: 0.5,
  },
  title: {
    fontSize: 14,
    color: '#64748B',
    marginBottom: 20,
    letterSpacing: 0.3,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
    objectFit: 'cover',
  },
  sidebarSection: {
    marginBottom: 24,
  },
  sidebarHeading: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#1E293B',
    textTransform: 'uppercase',
    marginBottom: 12,
    letterSpacing: 1,
    borderBottomWidth: 2,
    borderBottomColor: '#3B82F6',
    paddingBottom: 4,
  },
  contactItem: {
    marginBottom: 10,
  },
  contactLabel: {
    fontSize: 8,
    color: '#64748B',
    textTransform: 'uppercase',
    marginBottom: 2,
    letterSpacing: 0.5,
  },
  contactText: {
    fontSize: 10,
    color: '#334155',
    lineHeight: 1.4,
  },
  skillItem: {
    fontSize: 10,
    color: '#334155',
    marginBottom: 8,
    paddingLeft: 12,
    position: 'relative',
    lineHeight: 1.4,
  },
  skillBullet: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: 6,
    height: 6,
    backgroundColor: '#3B82F6',
    borderRadius: 3,
    marginTop: 4,
  },
  languageItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
    fontSize: 10,
    color: '#334155',
  },
  mainSection: {
    marginBottom: 28,
  },
  sectionHeading: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1E293B',
    textTransform: 'uppercase',
    marginBottom: 16,
    letterSpacing: 1.2,
    borderBottomWidth: 2,
    borderBottomColor: '#3B82F6',
    paddingBottom: 6,
  },
  profileText: {
    fontSize: 10.5,
    color: '#475569',
    lineHeight: 1.6,
    textAlign: 'justify',
  },
  timelineItem: {
    marginBottom: 20,
    paddingLeft: 20,
    position: 'relative',
  },
  timelineDot: {
    position: 'absolute',
    left: 0,
    top: 6,
    width: 8,
    height: 8,
    backgroundColor: '#3B82F6',
    borderRadius: 4,
  },
  timelineLine: {
    position: 'absolute',
    left: 3.5,
    top: 14,
    width: 1,
    bottom: -20,
    backgroundColor: '#CBD5E1',
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 4,
  },
  itemTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#1E293B',
    flex: 1,
    lineHeight: 1.3,
  },
  itemPeriod: {
    fontSize: 9,
    color: '#64748B',
    backgroundColor: '#F1F5F9',
    padding: '3 8',
    borderRadius: 4,
    marginLeft: 8,
  },
  itemSubtitle: {
    fontSize: 10.5,
    color: '#475569',
    marginBottom: 8,
    lineHeight: 1.3,
  },
  bulletList: {
    marginTop: 6,
  },
  bulletItem: {
    fontSize: 10,
    color: '#475569',
    marginBottom: 5,
    paddingLeft: 14,
    position: 'relative',
    lineHeight: 1.5,
  },
  bullet: {
    position: 'absolute',
    left: 0,
    top: 0,
    fontSize: 10,
    color: '#3B82F6',
  },
  projectDescription: {
    fontSize: 10,
    color: '#475569',
    marginBottom: 8,
    lineHeight: 1.5,
  },
  techContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 6,
    gap: 4,
  },
  techTag: {
    fontSize: 8,
    color: '#3B82F6',
    backgroundColor: '#EFF6FF',
    padding: '3 8',
    borderRadius: 4,
    marginRight: 4,
    marginBottom: 4,
  },
  referenceCard: {
    backgroundColor: '#F8FAFC',
    padding: 12,
    borderRadius: 6,
    marginBottom: 12,
    borderLeftWidth: 3,
    borderLeftColor: '#3B82F6',
  },
  referenceName: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#1E293B',
    marginBottom: 3,
  },
  referenceTitle: {
    fontSize: 9,
    color: '#64748B',
    fontStyle: 'italic',
    marginBottom: 6,
  },
  referenceContact: {
    fontSize: 8.5,
    color: '#475569',
    marginBottom: 2,
  },
  educationItem: {
    marginBottom: 20,
    paddingLeft: 20,
    position: 'relative',
  },
  degreeTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#1E293B',
    marginBottom: 4,
    lineHeight: 1.3,
  },
  universityName: {
    fontSize: 10.5,
    color: '#475569',
    marginBottom: 2,
  },
  gpaText: {
    fontSize: 9.5,
    color: '#64748B',
    marginTop: 6,
  },
});

const filterNA = (value) => (value && value !== 'N/A' ? value : '');

const safeConcat = (arr1, arr2) => {
  const safeArr1 = Array.isArray(arr1) ? arr1 : [];
  const safeArr2 = Array.isArray(arr2) ? arr2 : [];
  return safeArr1.concat(safeArr2);
};

export default function AdaptiveResume({ userdata, userImage, themeName = 'modern' }) {
  const safeUserData = {
    personalInfo: {
      fullName: userdata?.personalInfo?.fullName || '',
      title: userdata?.personalInfo?.title || '',
      phone: userdata?.personalInfo?.phone || '',
      email: userdata?.personalInfo?.email || '',
      location: userdata?.personalInfo?.location || '',
      website: userdata?.personalInfo?.website || ''
    },
    professionalSummary: userdata?.professionalSummary || '',
    skills: {
      technical: userdata?.skills?.technical || [],
      soft: userdata?.skills?.soft || [],
      languages: userdata?.skills?.languages || []
    },
    experience: userdata?.experience || [],
    education: userdata?.education || [],
    projects: userdata?.projects || [],
    certifications: userdata?.certifications || [],
    references: userdata?.references || [],
    image: userdata?.image || []
  };

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Sidebar */}
        <View style={styles.sidebar}>
          {/* Profile Image */}
          {safeUserData.image && safeUserData.image[0] && (
            <Image style={styles.profileImage} src={safeUserData.image[0]} />
          )}

          {/* Contact Section */}
          <View style={styles.sidebarSection}>
            <Text style={styles.sidebarHeading}>Contact</Text>
            
            {filterNA(safeUserData.personalInfo.phone) && (
              <View style={styles.contactItem}>
                <Text style={styles.contactLabel}>Phone</Text>
                <Text style={styles.contactText}>{safeUserData.personalInfo.phone}</Text>
              </View>
            )}
            
            {filterNA(safeUserData.personalInfo.email) && (
              <View style={styles.contactItem}>
                <Text style={styles.contactLabel}>Email</Text>
                <Text style={styles.contactText}>{safeUserData.personalInfo.email}</Text>
              </View>
            )}
            
            {filterNA(safeUserData.personalInfo.location) && (
              <View style={styles.contactItem}>
                <Text style={styles.contactLabel}>Location</Text>
                <Text style={styles.contactText}>{safeUserData.personalInfo.location}</Text>
              </View>
            )}
            
            {filterNA(safeUserData.personalInfo.website) && (
              <View style={styles.contactItem}>
                <Text style={styles.contactLabel}>Website</Text>
                <Text style={styles.contactText}>{safeUserData.personalInfo.website}</Text>
              </View>
            )}
          </View>

          {/* Skills Section */}
          {(safeUserData.skills.technical.length > 0 || safeUserData.skills.soft.length > 0) && (
            <View style={styles.sidebarSection}>
              <Text style={styles.sidebarHeading}>Skills</Text>
              {safeConcat(safeUserData.skills.technical, safeUserData.skills.soft).map((skill, index) => (
                <View key={index}>
                  <View style={styles.skillBullet} />
                  <Text style={styles.skillItem}>{skill}</Text>
                </View>
              ))}
            </View>
          )}

          {/* Languages Section */}
          {safeUserData.skills.languages.length > 0 && (
            <View style={styles.sidebarSection}>
              <Text style={styles.sidebarHeading}>Languages</Text>
              {safeUserData.skills.languages.map((language, index) => (
                <View key={index} style={styles.languageItem}>
                  <Text>{language}</Text>
                </View>
              ))}
            </View>
          )}

          {/* References Section */}
          {safeUserData.references.length > 0 && (
            <View style={styles.sidebarSection}>
              <Text style={styles.sidebarHeading}>References</Text>
              {safeUserData.references.map((ref, index) => (
                <View key={index} style={styles.referenceCard}>
                  <Text style={styles.referenceName}>{ref.name || ''}</Text>
                  <Text style={styles.referenceTitle}>{ref.title || ''}</Text>
                  {ref.phone && <Text style={styles.referenceContact}>{ref.phone}</Text>}
                  {ref.email && <Text style={styles.referenceContact}>{ref.email}</Text>}
                </View>
              ))}
            </View>
          )}
        </View>

        {/* Main Content */}
        <View style={styles.mainContent}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.name}>{filterNA(safeUserData.personalInfo.fullName)}</Text>
            <Text style={styles.title}>{filterNA(safeUserData.personalInfo.title)}</Text>
          </View>

          {/* Professional Summary */}
          {filterNA(safeUserData.professionalSummary) && (
            <View style={styles.mainSection}>
              <Text style={styles.sectionHeading}>Profile</Text>
              <Text style={styles.profileText}>{safeUserData.professionalSummary}</Text>
            </View>
          )}

          {/* Work Experience */}
          {safeUserData.experience.length > 0 && (
            <View style={styles.mainSection}>
              <Text style={styles.sectionHeading}>Work Experience</Text>
              {safeUserData.experience.map((exp, index) => (
                <View key={index} style={styles.timelineItem}>
                  <View style={styles.timelineDot} />
                  {index !== safeUserData.experience.length - 1 && <View style={styles.timelineLine} />}
                  
                  <View style={styles.itemHeader}>
                    <Text style={styles.itemTitle}>{filterNA(exp.title)}</Text>
                    <Text style={styles.itemPeriod}>
                      {filterNA(exp.startDate)} - {filterNA(exp.endDate || 'Present')}
                    </Text>
                  </View>
                  
                  <Text style={styles.itemSubtitle}>
                    {filterNA(exp.company)}
                    {exp.position ? ` | ${exp.position}` : ''}
                  </Text>
                  
                  <View style={styles.bulletList}>
                    {Array.isArray(exp.responsibilities) && exp.responsibilities.map((responsibility, idx) => (
                      <View key={idx}>
                        <Text style={styles.bullet}>•</Text>
                        <Text style={styles.bulletItem}>{responsibility}</Text>
                      </View>
                    ))}
                    {Array.isArray(exp.achievements) && exp.achievements.map((achievement, idx) => (
                      <View key={`ach-${idx}`}>
                        <Text style={styles.bullet}>•</Text>
                        <Text style={styles.bulletItem}>{achievement}</Text>
                      </View>
                    ))}
                  </View>
                </View>
              ))}
            </View>
          )}

          {/* Education */}
          {safeUserData.education.length > 0 && (
            <View style={styles.mainSection}>
              <Text style={styles.sectionHeading}>Education</Text>
              {safeUserData.education.map((edu, index) => (
                <View key={index} style={styles.educationItem}>
                  <View style={styles.timelineDot} />
                  {index !== safeUserData.education.length - 1 && <View style={styles.timelineLine} />}
                  
                  <View style={styles.itemHeader}>
                    <Text style={styles.degreeTitle}>{filterNA(edu.degree)}</Text>
                    <Text style={styles.itemPeriod}>
                      {filterNA(edu.startDate || edu.graduationYear)} - {filterNA(edu.endDate || 'Present')}
                    </Text>
                  </View>
                  
                  <Text style={styles.universityName}>
                    {edu.fieldOfStudy ? `${edu.fieldOfStudy} | ` : ''}
                    {filterNA(edu.institution)}
                  </Text>
                  
                  {edu.gpa && <Text style={styles.gpaText}>GPA: {edu.gpa}</Text>}
                  
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

          {/* Projects */}
          {safeUserData.projects.length > 0 && (
            <View style={styles.mainSection}>
              <Text style={styles.sectionHeading}>Projects</Text>
              {safeUserData.projects.map((project, index) => (
                <View key={index} style={styles.timelineItem}>
                  <View style={styles.timelineDot} />
                  {index !== safeUserData.projects.length - 1 && <View style={styles.timelineLine} />}
                  
                  <Text style={styles.itemTitle}>{project.title || ''}</Text>
                  <Text style={styles.projectDescription}>{project.description || ''}</Text>
                  
                  {Array.isArray(project.technologies) && project.technologies.length > 0 && (
                    <View style={styles.techContainer}>
                      {project.technologies.map((tech, techIdx) => (
                        <Text key={techIdx} style={styles.techTag}>{tech}</Text>
                      ))}
                    </View>
                  )}
                  
                  {project.link && (
                    <View>
                      <Text style={styles.bullet}>•</Text>
                      <Text style={styles.bulletItem}>Link: {project.link}</Text>
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
                  <Text style={styles.itemSubtitle}>
                    {filterNA(cert.issuer)}
                    {cert.year ? `, ${cert.year}` : ''}
                    {cert.expiryDate ? ` (Valid until ${cert.expiryDate})` : ''}
                  </Text>
                </View>
              ))}
            </View>
          )}
        </View>
      </Page>
    </Document>
  );
}