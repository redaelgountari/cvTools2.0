"use client"

import React from 'react';
import { Document, Page, Text, View, StyleSheet, Font, Image } from '@react-pdf/renderer';
import { Resume } from '@/app/types/resume';

// Register custom fonts with multi-language support
Font.register({
  family: 'Noto Sans',
  fonts: [
    { src: 'https://fonts.gstatic.com/s/notosans/v30/o-0IIpQlx3QUlC5A4PNr5TRA.ttf', fontWeight: 'normal' },
    { src: 'https://fonts.gstatic.com/s/notosans/v30/o-0NIpQlx3QUlC5A4PNjXhFVZNyE.ttf', fontWeight: 'bold' },
  ],
});

// Arabic font support - using better Arabic font support
Font.register({
  family: 'Noto Sans Arabic',
  fonts: [
    { src: 'https://fonts.gstatic.com/s/notosansarabic/v18/nwpxtLGrOAZMl5nJ_wfgRg3DrWFZWsnVBJ_sS6tlqHHFlhQ5l3sQWIHPqzCfyG2vu3CBFQLaig.ttf', fontWeight: 'normal' },
    { src: 'https://fonts.gstatic.com/s/notosansarabic/v18/nwpxtLGrOAZMl5nJ_wfgRg3DrWFZWsnVBJ_sS6tlqHHFlhQ5l3sQWIHPqzCfyG2vu3CBFQLaig.ttf', fontWeight: 'bold' },
  ],
});

// Create a dynamic stylesheet function that takes direction as parameter
const createStyles = (isRTL) => StyleSheet.create({
  page: {
    padding: 20,
    fontFamily: isRTL ? 'Noto Sans Arabic' : 'Noto Sans',
    backgroundColor: '#FFFFFF',
    fontSize: 12,
    direction: isRTL ? 'rtl' : 'ltr',
    textAlign: isRTL ? 'right' : 'left',
  },
  header: {
    marginBottom: 9,
    borderBottom: '1px solid #2D3748',
    paddingBottom: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerContent: {
    flex: 1,
  },
  imageContainer: {
    width: 60,
    height: 60,
    marginLeft: isRTL ? 0 : 10,
    marginRight: isRTL ? 10 : 0,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 30,
    objectFit: 'cover',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2D3748',
    marginBottom: 4,
    fontFamily: isRTL ? 'Noto Sans Arabic' : 'Noto Sans',
  },
  contactInfo: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    fontSize: 10,
    color: '#4A5568',
  },
  contactItem: {
    marginRight: isRTL ? 0 : 8,
    marginLeft: isRTL ? 8 : 0,
    marginBottom: 3,
    fontFamily: isRTL ? 'Noto Sans Arabic' : 'Noto Sans',
  },
  section: {
    marginBottom: 8,
  },
  skillsContainer: {
    flexDirection: 'column',
    marginBottom: 4,
  },
  skillCategory: {
    fontSize: 12,
    fontWeight: 'semibold',
    marginBottom: 3,
    color: '#4A5568',
    fontFamily: isRTL ? 'Noto Sans Arabic' : 'Noto Sans',
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#2D3748',
    borderBottom: '1px solid #E2E8F0',
    paddingBottom: 2,
    marginBottom: 6,
    // Keep section titles in selected language font regardless of content language
    fontFamily: 'Noto Sans',
  },
  summary: {
    fontSize: 10,
    lineHeight: 1.4,
    color: '#4A5568',
    marginBottom: 6,
    fontFamily: isRTL ? 'Noto Sans Arabic' : 'Noto Sans',
  },
  skillRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 4,
  },
  skillItem: {
    fontSize: 9,
    color: '#4A5568',
    backgroundColor: '#F7FAFC',
    padding: '2 5',
    borderRadius: 3,
    marginRight: isRTL ? 0 : 5,
    marginLeft: isRTL ? 5 : 0,
    marginBottom: 5,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    fontFamily: isRTL ? 'Noto Sans Arabic' : 'Noto Sans',
  },
  experienceItem: {
    marginBottom: 8,
  },
  experienceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 3,
  },
  jobTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#2D3748',
    fontFamily: isRTL ? 'Noto Sans Arabic' : 'Noto Sans',
  },
  jobPeriod: {
    fontSize: 9,
    color: '#718096',
    fontFamily: isRTL ? 'Noto Sans Arabic' : 'Noto Sans',
  },
  company: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#4A5568',
    marginBottom: 3,
    fontFamily: isRTL ? 'Noto Sans Arabic' : 'Noto Sans',
  },
  bulletPoint: {
    fontSize: 9,
    marginLeft: isRTL ? 0 : 8,
    marginRight: isRTL ? 8 : 0,
    marginBottom: 3,
    color: '#4A5568',
    fontFamily: isRTL ? 'Noto Sans Arabic' : 'Noto Sans',
  },
  educationItem: {
    marginBottom: 5,
  },
  degree: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#2D3748',
    fontFamily: isRTL ? 'Noto Sans Arabic' : 'Noto Sans',
  },
  institution: {
    fontSize: 9,
    marginTop: 1,
    color: '#4A5568',
    fontFamily: isRTL ? 'Noto Sans Arabic' : 'Noto Sans',
  },
  projectItem: {
    marginBottom: 5,
  },
  projectTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#2D3748',
    fontFamily: isRTL ? 'Noto Sans Arabic' : 'Noto Sans',
  },
  projectDescription: {
    fontSize: 9,
    marginTop: 1,
    marginBottom: 3,
    color: '#4A5568',
    fontFamily: isRTL ? 'Noto Sans Arabic' : 'Noto Sans',
  },
});

const filterNA = (value: string | undefined): string => (value && value !== 'N/A' ? value : '');

// Dictionary for section titles in different languages
const sectionTitles = {
  en: {
    professionalProfile: 'Professional Profile',
    skills: 'Skills',
    technicalSkills: 'Technical Skills',
    tools: 'Tools',
    experience: 'Professional Experience',
    education: 'Education',
    projects: 'Projects',
    languages: 'Languages'
  },
  fr: {
    professionalProfile: 'Profil Professionnel',
    skills: 'Compétences',
    technicalSkills: 'Compétences Techniques',
    tools: 'OUTILS',
    experience: 'Expérience Professionnelle',
    education: 'Formation',
    projects: 'Projets',
    languages: 'Langues'
  },
  ar: {
    professionalProfile: 'الملف المهني',
    skills: 'المهارات',
    technicalSkills: 'المهارات التقنية',
    tools: 'الأدوات',
    experience: 'الخبرة المهنية',
    education: 'التعليم',
    projects: 'المشاريع',
    languages: 'اللغات'
  }
};

interface Theme5Props {
  userdata: Resume;
  userImage: any;
  language?: 'en' | 'fr' | 'ar';  // Support for English, French, Arabic
  rtl?: boolean;  // Explicit RTL support
  contentLanguage?: 'en' | 'fr' | 'ar'; // New prop to control content language independently
}

export default function Theme5({ 
  userdata, 
  userImage, 
  language = 'en',
  rtl = false,  // Don't auto-set RTL based on language to allow more control
  contentLanguage = 'ar'  // Default to Arabic for content as requested
}: Theme5Props) {
  // Get the section titles based on language, default to English if not found
  const titles = sectionTitles[language] || sectionTitles.en;
  
  // If content is Arabic, enforce RTL for layout
  const useRTL = rtl || contentLanguage === 'ar';
  
  // Create styles based on text direction
  const styles = createStyles(useRTL);

  // Choose font family based on content language
  const contentFontFamily = contentLanguage === 'ar' ? 'Noto Sans Arabic' : 'Noto Sans';

  return (
    <Document>
      <Page size="LETTER" style={styles.page}>
        <View style={styles.header}>
          {!useRTL && (
            <View style={styles.headerContent}>
              <Text style={styles.name}>{filterNA(userdata.personalInfo.fullName)}</Text>
              <View style={styles.contactInfo}>
                {[ 
                  userdata.personalInfo.location,
                  userdata.personalInfo.phone,
                  userdata.personalInfo.email,
                  userdata.personalInfo.linkedin,
                  userdata.personalInfo.website
                ].filter(Boolean).map((item, index) => (
                  <Text key={index} style={styles.contactItem}>{item}</Text>
                ))}
              </View>
            </View>
          )}
          
          {userImage && (
            <View style={styles.imageContainer}>
              <Image style={styles.image} src={userImage} />
            </View>
          )}
          
          {useRTL && (
            <View style={styles.headerContent}>
              <Text style={styles.name}>{filterNA(userdata.personalInfo.fullName)}</Text>
              <View style={styles.contactInfo}>
                {[ 
                  userdata.personalInfo.location,
                  userdata.personalInfo.phone,
                  userdata.personalInfo.email,
                  userdata.personalInfo.linkedin,
                  userdata.personalInfo.website
                ].filter(Boolean).map((item, index) => (
                  <Text key={index} style={styles.contactItem}>{item}</Text>
                ))}
              </View>
            </View>
          )}
        </View>

        {userdata.professionalSummary && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{titles.professionalProfile}</Text>
            <Text style={{...styles.summary, fontFamily: contentFontFamily}}>{userdata.professionalSummary}</Text>
          </View>
        )}

        {(userdata.skills.technical.length > 0 || userdata.skills.soft.length > 0) && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{titles.skills}</Text>
            
            {userdata.skills.technical.length > 0 && (
              <View style={styles.skillsContainer}>
                <Text style={styles.skillCategory}>{titles.technicalSkills}</Text>
                <View style={styles.skillRow}>
                  {userdata.skills.technical.map((skill, index) => (
                    <Text key={index} style={{...styles.skillItem, fontFamily: contentFontFamily}}>{skill}</Text>
                  ))}
                </View>
              </View>
            )}
            
            {userdata.skills.soft.length > 0 && (
              <View style={styles.skillsContainer}>
                <Text style={styles.skillCategory}>{titles.tools}</Text>
                <View style={styles.skillRow}>
                  {userdata.skills.soft.map((skill, index) => (
                    <Text key={index} style={{...styles.skillItem, fontFamily: contentFontFamily}}>{skill}</Text>
                  ))}
                </View>
              </View>
            )}
          </View>
        )}
        
        {userdata.experience.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{titles.experience}</Text>
            {userdata.experience.map((exp, index) => (
              <View key={index} style={styles.experienceItem}>
                <View style={styles.experienceHeader}>
                  <Text style={{...styles.jobTitle, fontFamily: contentFontFamily}}>{filterNA(exp.title)}</Text>
                  <Text style={{...styles.jobPeriod, fontFamily: contentFontFamily}}>{filterNA(exp.startDate)} - {filterNA(exp.endDate)}</Text>
                </View>
                <Text style={{...styles.company, fontFamily: contentFontFamily}}>
                  {filterNA(exp.company)}, {filterNA(exp.location)}
                </Text>
                {exp.responsibilities.map((responsibility, idx) => (
                  <Text key={idx} style={{...styles.bulletPoint, fontFamily: contentFontFamily}}>• {responsibility}</Text>
                ))}
              </View>
            ))}
          </View>
        )}

        {userdata.education.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{titles.education}</Text>
            {userdata.education.map((edu, index) => (
              <View key={index} style={styles.educationItem}>
                <Text style={{...styles.degree, fontFamily: contentFontFamily}}>
                  {filterNA(edu.degree)} - {filterNA(edu.graduationYear)}
                </Text>
                <Text style={{...styles.institution, fontFamily: contentFontFamily}}>
                  {filterNA(edu.institution)}, {filterNA(edu.location)}
                </Text>
              </View>
            ))}
          </View>
        )}

        {userdata.projects && userdata.projects.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{titles.projects}</Text>
            {userdata.projects.map((project, index) => (
              <View key={index} style={styles.projectItem}>
                <Text style={{...styles.projectTitle, fontFamily: contentFontFamily}}>{project.title}</Text>
                <Text style={{...styles.projectDescription, fontFamily: contentFontFamily}}>{project.description}</Text>
                <View style={styles.skillRow}>
                  {project.technologies.map((tech, idx) => (
                    <Text key={idx} style={{...styles.skillItem, fontFamily: contentFontFamily}}>{tech}</Text>
                  ))}
                </View>
              </View>
            ))}
          </View>
        )}

        {userdata.skills.languages.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{titles.languages}</Text>
            <View style={styles.skillRow}>
              {userdata.skills.languages.map((language, index) => (
                <Text key={index} style={{...styles.skillItem, fontFamily: contentFontFamily}}>{language}</Text>
              ))}
            </View>
          </View>
        )}
      </Page>
    </Document>
  );
}