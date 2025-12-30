"use client"

import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image, Font } from '@react-pdf/renderer';
import { Resume } from '@/app/types/resume';

// Register Inter font for a modern look
Font.register({
  family: 'Inter',
  fonts: [
    { src: 'https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hjp-Ek-_0ew.ttf', fontWeight: 'normal' },
    { src: 'https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuGKYAZ9hjp-Ek-_0ew.ttf', fontWeight: 'bold' },
    { src: 'https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuI6fAZ9hjp-Ek-_0ew.ttf', fontWeight: 'semibold' },
  ],
});

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: 'Inter',
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    marginBottom: 30,
    borderBottom: '2px solid #2563EB',
    paddingBottom: 20,
  },
  headerLeft: {
    flex: 1,
  },
  headerRight: {
    width: 100,
    alignItems: 'center',
  },
  imageContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    overflow: 'hidden',
    border: '2px solid #2563EB',
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1E293B',
    marginBottom: 4,
  },
  title: {
    fontSize: 14,
    color: '#2563EB',
    marginBottom: 12,
  },
  contactInfo: {
    fontSize: 10,
    color: '#475569',
    marginBottom: 3,
  },
  mainContent: {
    flexDirection: 'row',
    gap: 30,
  },
  leftColumn: {
    width: '30%',
  },
  rightColumn: {
    flex: 1,
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2563EB',
    marginBottom: 12,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  skillCategory: {
    fontSize: 12,
    fontWeight: 'semibold',
    color: '#1E293B',
    marginBottom: 8,
  },
  skillGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  skillItem: {
    fontSize: 9,
    padding: '4 8',
    backgroundColor: '#EFF6FF',
    borderRadius: 12,
    color: '#2563EB',
  },
  experienceItem: {
    marginBottom: 15,
  },
  experienceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  jobTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#1E293B',
  },
  company: {
    fontSize: 11,
    color: '#475569',
    marginBottom: 6,
  },
  period: {
    fontSize: 10,
    color: '#64748B',
  },
  bulletPoint: {
    fontSize: 10,
    marginLeft: 12,
    marginBottom: 3,
    color: '#475569',
    lineHeight: 1.4,
  },
  summary: {
    fontSize: 10,
    lineHeight: 1.6,
    color: '#475569',
    textAlign: 'justify',
  },
  languageItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  languageDot: {
    width: 4,
    height: 4,
    backgroundColor: '#2563EB',
    borderRadius: 2,
    marginRight: 6,
  },
  languageText: {
    fontSize: 10,
    color: '#475569',
  },
  certificationItem: {
    marginBottom: 8,
  },
  certName: {
    fontSize: 11,
    fontWeight: 'semibold',
    color: '#1E293B',
  },
  certDetails: {
    fontSize: 10,
    color: '#64748B',
  },
  projectItem: {
    marginBottom: 12,
    padding: 10,
    backgroundColor: '#F8FAFC',
    borderRadius: 6,
  },
  projectTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#1E293B',
    marginBottom: 4,
  },
  projectDesc: {
    fontSize: 10,
    color: '#475569',
    marginBottom: 6,
  },
  projectTech: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 4,
  },
  projectTechItem: {
    fontSize: 8,
    padding: '2 6',
    backgroundColor: '#E0E7FF',
    color: '#4F46E5',
    borderRadius: 8,
  },
});

const filterNA = (value: string | undefined): string => (value && value !== 'N/A' ? value : '');

export default function Theme7({ userdata, userImage }: { userdata: Resume; userImage: any }) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header Section */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Text style={styles.name}>{filterNA(userdata.personalInfo.fullName)}</Text>
            {userdata.experience[0]?.title && (
              <Text style={styles.title}>{userdata.experience[0].title}</Text>
            )}
            <Text style={styles.contactInfo}>{filterNA(userdata.personalInfo.email)}</Text>
            <Text style={styles.contactInfo}>{filterNA(userdata.personalInfo.phone)}</Text>
            <Text style={styles.contactInfo}>{filterNA(userdata.personalInfo.location)}</Text>
            {filterNA(userdata.personalInfo.linkedin) && (
              <Text style={styles.contactInfo}>{userdata.personalInfo.linkedin}</Text>
            )}
          </View>
          <View style={styles.headerRight}>
            <View style={styles.imageContainer}>
              <Image style={styles.profileImage} src={userImage} />
            </View>
          </View>
        </View>

        <View style={styles.mainContent}>
          {/* Left Column */}
          <View style={styles.leftColumn}>
            {/* Skills Section */}
            {(userdata.skills.technical.length > 0 || userdata.skills.soft.length > 0) && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Compétences</Text>
                
                {userdata.skills.technical.length > 0 && (
                  <View style={{ marginBottom: 15 }}>
                    <Text style={styles.skillCategory}>Techniques</Text>
                    <View style={styles.skillGrid}>
                      {userdata.skills.technical.map((skill, index) => (
                        <Text key={index} style={styles.skillItem}>{skill}</Text>
                      ))}
                    </View>
                  </View>
                )}
                
                {userdata.skills.soft.length > 0 && (
                  <View>
                    <Text style={styles.skillCategory}>Soft Skills</Text>
                    <View style={styles.skillGrid}>
                      {userdata.skills.soft.map((skill, index) => (
                        <Text key={index} style={styles.skillItem}>{skill}</Text>
                      ))}
                    </View>
                  </View>
                )}
              </View>
            )}

            {/* Languages Section */}
            {userdata.skills.languages.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Langues</Text>
                {userdata.skills.languages.map((language, index) => (
                  <View key={index} style={styles.languageItem}>
                    <View style={styles.languageDot} />
                    <Text style={styles.languageText}>{language}</Text>
                  </View>
                ))}
              </View>
            )}

            {/* Hobbies Section */}
            {userdata.hobbies.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Centres d'intérêt</Text>
                {userdata.hobbies.map((hobby, index) => (
                  <View key={index} style={styles.languageItem}>
                    <View style={styles.languageDot} />
                    <Text style={styles.languageText}>{hobby}</Text>
                  </View>
                ))}
              </View>
            )}

            {/* Certifications Section */}
            {userdata.certifications && userdata.certifications.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Certifications</Text>
                {userdata.certifications.map((cert, index) => (
                  <View key={index} style={styles.certificationItem}>
                    <Text style={styles.certName}>{filterNA(cert.name)}</Text>
                    <Text style={styles.certDetails}>
                      {filterNA(cert.issuer)} • {filterNA(cert.year)}
                    </Text>
                  </View>
                ))}
              </View>
            )}
          </View>

          {/* Right Column */}
          <View style={styles.rightColumn}>
            {/* Professional Summary */}
            {filterNA(userdata.professionalSummary) && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Profil Professionnel</Text>
                <Text style={styles.summary}>{userdata.professionalSummary}</Text>
              </View>
            )}

            {/* Experience Section */}
            {userdata.experience.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Expérience Professionnelle</Text>
                {userdata.experience.map((exp, index) => (
                  <View key={index} style={styles.experienceItem}>
                    <View style={styles.experienceHeader}>
                      <Text style={styles.jobTitle}>{filterNA(exp.title)}</Text>
                      <Text style={styles.period}>
                        {filterNA(exp.startDate)} - {filterNA(exp.endDate)}
                      </Text>
                    </View>
                    <Text style={styles.company}>
                      {filterNA(exp.company)} • {filterNA(exp.location)}
                    </Text>
                    {exp.responsibilities.map((resp, idx) => (
                      <Text key={idx} style={styles.bulletPoint}>• {resp}</Text>
                    ))}
                  </View>
                ))}
              </View>
            )}

            {/* Education Section */}
            {userdata.education.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Formation</Text>
                {userdata.education.map((edu, index) => (
                  <View key={index} style={styles.experienceItem}>
                    <View style={styles.experienceHeader}>
                      <Text style={styles.jobTitle}>{filterNA(edu.degree)}</Text>
                      <Text style={styles.period}>{filterNA(edu.graduationYear)}</Text>
                    </View>
                    <Text style={styles.company}>
                      {filterNA(edu.institution)} • {filterNA(edu.location)}
                    </Text>
                    {edu.relevantCourses && edu.relevantCourses.map((course, idx) => (
                      <Text key={idx} style={styles.bulletPoint}>• {course}</Text>
                    ))}
                  </View>
                ))}
              </View>
            )}

            {/* Projects Section */}
            {userdata.projects && userdata.projects.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Projets</Text>
                {userdata.projects.map((project, index) => (
                  <View key={index} style={styles.projectItem}>
                    <Text style={styles.projectTitle}>{project.title}</Text>
                    <Text style={styles.projectDesc}>{project.description}</Text>
                    <View style={styles.projectTech}>
                      {project.technologies.map((tech, idx) => (
                        <Text key={idx} style={styles.projectTechItem}>{tech}</Text>
                      ))}
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