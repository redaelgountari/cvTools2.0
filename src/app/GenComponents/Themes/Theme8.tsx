
import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image, Font } from '@react-pdf/renderer';
import { Resume } from '@/app/types/resume';

// Register custom fonts
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
  header: {
    marginBottom: 20,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
    textTransform: 'uppercase',
  },
  title: {
    fontSize: 14,
    marginBottom: 5,
    color: '#4A5568',
  },
  contactInfo: {
    marginBottom: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTop: '1px solid #000',
    borderBottom: '1px solid #000',
    paddingTop: 8,
    paddingBottom: 8,
  },
  contactItem: {
    fontSize: 10,
    color: '#4A5568',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 10,
    textTransform: 'uppercase',
    borderBottom: '1px solid #000',
    paddingBottom: 4,
  },
  summary: {
    fontSize: 10,
    lineHeight: 1.5,
    color: '#4A5568',
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
    color: '#2D3748',
  },
  company: {
    fontSize: 11,
    marginBottom: 4,
    color: '#4A5568',
  },
  bulletList: {
    marginLeft: 10,
  },
  bulletPoint: {
    fontSize: 10,
    marginBottom: 3,
    color: '#4A5568',
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  skillItem: {
    fontSize: 10,
    marginRight: 20,
    marginBottom: 5,
    color: '#4A5568',
  },
  educationItem: {
    marginBottom: 10,
  },
  degreeTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#2D3748',
  },
  institution: {
    fontSize: 10,
    color: '#4A5568',
  },
  hobbiesText: {
    fontSize: 10,
    color: '#4A5568',
  }
});

// Helper function to filter out N/A values
const filterNA = (value: string | undefined): string => (value && value !== 'N/A' ? value : '');

export default function Theme8({ userdata, userImage }: { userdata: Resume; userImage: any }) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header with name and title */}
        <View style={styles.header}>
          <Text style={styles.name}>{filterNA(userdata.personalInfo.fullName)}</Text>
          {userdata.experience[0]?.title && <Text style={styles.title}>{userdata.experience[0].title}</Text>}
        </View>

        {/* Contact Information */}
        <View style={styles.contactInfo}>
          {filterNA(userdata.personalInfo.location) && (
            <Text style={styles.contactItem}>{userdata.personalInfo.location}</Text>
          )}
          {filterNA(userdata.personalInfo.phone) && (
            <Text style={styles.contactItem}>{userdata.personalInfo.phone}</Text>
          )}
          {filterNA(userdata.personalInfo.email) && (
            <Text style={styles.contactItem}>{userdata.personalInfo.email}</Text>
          )}
          {filterNA(userdata.personalInfo.linkedin) && (
            <Text style={styles.contactItem}>{userdata.personalInfo.linkedin}</Text>
          )}
        </View>

        {/* Professional Summary */}
        {filterNA(userdata.professionalSummary) && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>About Me</Text>
            <Text style={styles.summary}>{userdata.professionalSummary}</Text>
          </View>
        )}

        {/* Experience */}
        {userdata.experience.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Professional Experience</Text>
            {userdata.experience.map((exp, index) => (
              <View key={index} style={styles.experienceItem}>
                <View style={styles.experienceHeader}>
                  <Text style={styles.jobTitle}>{filterNA(exp.title)}</Text>
                  <Text style={styles.company}>{filterNA(exp.company)}</Text>
                  <View style={styles.dateLocation}>
                    <Text>{filterNA(exp.startDate)} - {filterNA(exp.endDate)}</Text>
                    <Text>{filterNA(exp.location)}</Text>
                  </View>
                </View>
                {exp.responsibilities.length > 0 && (
                  <View style={styles.bulletList}>
                    {exp.responsibilities.map((responsibility, idx) => (
                      <Text key={idx} style={styles.bulletPoint}>• {responsibility}</Text>
                    ))}
                  </View>
                )}
              </View>
            ))}
          </View>
        )}

        {/* Education */}
        {userdata.education.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Education</Text>
            {userdata.education.map((edu, index) => (
              <View key={index} style={styles.educationItem}>
                <Text style={styles.degreeTitle}>{filterNA(edu.degree)}</Text>
                <Text style={styles.institution}>{filterNA(edu.institution)}, {filterNA(edu.location)}</Text>
                <Text style={styles.institution}>{filterNA(edu.graduationYear)}</Text>
                {edu.relevantCourses && edu.relevantCourses.length > 0 && (
                  <View style={styles.bulletList}>
                    {edu.relevantCourses.map((course, idx) => (
                      <Text key={idx} style={styles.bulletPoint}>• {course}</Text>
                    ))}
                  </View>
                )}
              </View>
            ))}
          </View>
        )}

        {/* Skills Section */}
        {(userdata.skills.technical.length > 0 || userdata.skills.soft.length > 0) && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Skills</Text>
            
            {userdata.skills.technical.length > 0 && (
              <View style={styles.skillsContainer}>
                {userdata.skills.technical.map((skill, index) => (
                  <Text key={index} style={styles.skillItem}>• {skill}</Text>
                ))}
              </View>
            )}
            
            {userdata.skills.soft.length > 0 && (
              <View style={styles.skillsContainer}>
                {userdata.skills.soft.map((skill, index) => (
                  <Text key={index} style={styles.skillItem}>• {skill}</Text>
                ))}
              </View>
            )}
          </View>
        )}

        {/* Languages */}
        {userdata.skills.languages.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Languages</Text>
            <View style={styles.skillsContainer}>
              {userdata.skills.languages.map((language, index) => (
                <Text key={index} style={styles.skillItem}>• {language}</Text>
              ))}
            </View>
          </View>
        )}
        
        {/* Hobbies */}
        {userdata.hobbies.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Interests</Text>
            <Text style={styles.hobbiesText}>
              {userdata.hobbies.join(', ')}
            </Text>
          </View>
        )}

        {/* Certifications */}
        {userdata.certifications && userdata.certifications.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Certifications</Text>
            {userdata.certifications.map((cert, index) => (
              <View key={index} style={styles.educationItem}>
                <Text style={styles.degreeTitle}>{filterNA(cert.name)}</Text>
                <Text style={styles.institution}>
                  {filterNA(cert.issuer)}, {filterNA(cert.year)}
                  {cert.expiryDate && ` - ${cert.expiryDate}`}
                </Text>
              </View>
            ))}
          </View>
        )}

        {/* Projects (optional) */}
        {userdata.projects && userdata.projects.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Projects</Text>
            {userdata.projects.map((project, index) => (
              <View key={index} style={styles.experienceItem}>
                <Text style={styles.jobTitle}>{project.title}</Text>
                <Text style={styles.bulletPoint}>{project.description}</Text>
                <Text style={styles.institution}>Technologies: {project.technologies.join(', ')}</Text>
                {project.link && <Text style={styles.institution}>Link: {project.link}</Text>}
              </View>
            ))}
          </View>
        )}
      </Page>
    </Document>
  );
}