
import React from 'react';
import { Resume } from '@/app/types/resume';

interface Theme1Props {
  userdata: Resume;
}

const filterEmpty = (value?: string | null): string => {
  if (!value || value === 'N/A' || value.trim() === '') return '';
  return value.trim();
};

const hasContent = (value?: string | null): boolean => {
  return filterEmpty(value) !== '';
};

const Theme1: React.FC<Theme1Props> = ({ userdata }) => {
  const renderContactInfo = () => {
    const contactItems = [
      { value: userdata.personalInfo?.location, label: null },
      { value: userdata.personalInfo?.phone, label: null },
      { value: userdata.personalInfo?.email, label: null },
      { value: userdata.personalInfo?.linkedin, label: 'LinkedIn' },
      { value: userdata.personalInfo?.website, label: 'Website' },
    ];

    const validItems = contactItems.filter(item => hasContent(item.value));
    
    if (validItems.length === 0) return null;

    return (
      <div className="mb-6">
        <h2 className="text-sm font-bold mb-2.5 text-white border-b border-gray-500 pb-1 uppercase tracking-wider">Contact</h2>
        {validItems.map((item, index) => (
          <div key={index} className="mb-2.5">
            <p className="text-xs text-gray-200 leading-snug">{filterEmpty(item.value)}</p>
          </div>
        ))}
      </div>
    );
  };

  const renderSkills = () => {
    const hasTechnical = userdata.skills?.technical && userdata.skills.technical.length > 0;
    const hasSoft = userdata.skills?.soft && userdata.skills.soft.length > 0;
    
    if (!hasTechnical && !hasSoft) return null;

    return (
      <div className="mb-6">
        <h2 className="text-sm font-bold mb-2.5 text-white border-b border-gray-500 pb-1 uppercase tracking-wider">Skills</h2>
        
        {hasTechnical && (
          <div>
            <h3 className="text-xs font-semibold mb-1.5 mt-0.5 text-gray-200 uppercase tracking-wide">Technical</h3>
            <ul className="list-none pl-0">
              {userdata.skills.technical.map((skill, index) => (
                skill && skill.trim() && (
                  <li key={index} className="text-xs mb-1.5 text-gray-200 leading-tight pl-3 relative before:content-['•'] before:absolute before:left-0 before:text-gray-200">{skill.trim()}</li>
                )
              ))}
            </ul>
          </div>
        )}
        
        {hasSoft && (
          <div className={hasTechnical ? "mt-3" : ""}>
            <h3 className="text-xs font-semibold mb-1.5 text-gray-200 uppercase tracking-wide">Soft Skills</h3>
            <ul className="list-none pl-0">
              {userdata.skills.soft.map((skill, index) => (
                skill && skill.trim() && (
                  <li key={index} className="text-xs mb-1.5 text-gray-200 leading-tight pl-3 relative before:content-['•'] before:absolute before:left-0 before:text-gray-200">{skill.trim()}</li>
                )
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  };

  const renderLanguages = () => {
    if (!userdata.skills?.languages || userdata.skills.languages.length === 0) return null;
    
    const validLanguages = userdata.skills.languages.filter(lang => lang && lang.trim());
    if (validLanguages.length === 0) return null;

    return (
      <div className="mb-6">
        <h2 className="text-sm font-bold mb-2.5 text-white border-b border-gray-500 pb-1 uppercase tracking-wider">Languages</h2>
        <ul className="list-none pl-0">
          {validLanguages.map((language, index) => (
            <li key={index} className="text-xs mb-1.5 text-gray-200 leading-tight pl-3 relative before:content-['•'] before:absolute before:left-0 before:text-gray-200">{language.trim()}</li>
          ))}
        </ul>
      </div>
    );
  };

  const renderExperience = () => {
    if (!userdata.experience || userdata.experience.length === 0) return null;
    
    const validExperiences = userdata.experience.filter(exp => 
      hasContent(exp.title) || hasContent(exp.company)
    );
    
    if (validExperiences.length === 0) return null;

    return (
      <div className="mb-5">
        <h2 className="text-sm font-bold mb-2.5 text-gray-800 border-b-2 border-blue-600 pb-1 uppercase tracking-wider">Professional Experience</h2>
        {validExperiences.map((exp, index) => {
          const dateRange = [filterEmpty(exp.startDate), filterEmpty(exp.endDate)]
            .filter(d => d)
            .join(' - ') || '';
          
          const companyLocation = [filterEmpty(exp.company), filterEmpty(exp.location)]
            .filter(c => c)
            .join(' • ');

          return (
            <div key={index} className="mb-4">
              <div className="flex justify-between items-start mb-1 gap-2.5">
                <h3 className="text-xs font-bold text-gray-800 leading-snug flex-1">{filterEmpty(exp.title) || 'Position'}</h3>
                {dateRange && <p className="text-[10px] font-semibold text-blue-600 text-right whitespace-nowrap shrink-0">{dateRange}</p>}
              </div>
              {companyLocation && (
                <p className="text-[11px] font-semibold text-gray-500 mb-1.5 leading-snug">{companyLocation}</p>
              )}
              {exp.responsibilities && exp.responsibilities.length > 0 && (
                <ul className="list-none pl-0">
                  {exp.responsibilities
                    .filter(r => r && r.trim())
                    .map((responsibility, idx) => (
                      <li key={idx} className="text-[10px] leading-relaxed text-gray-800 mb-1"> • {responsibility.trim()}</li>
                    ))}
                </ul>
              )}
            </div>
          );
        })}
      </div>
    );
  };

  const renderEducation = () => {
    if (!userdata.education || userdata.education.length === 0) return null;
    
    const validEducation = userdata.education.filter(edu => 
      hasContent(edu.degree) || hasContent(edu.institution)
    );
    
    if (validEducation.length === 0) return null;

    return (
      <div className="mb-5">
        <h2 className="text-sm font-bold mb-2.5 text-gray-800 border-b-2 border-blue-600 pb-1 uppercase tracking-wider">Education</h2>
        {validEducation.map((edu, index) => {
          const institutionLocation = [filterEmpty(edu.institution), filterEmpty(edu.location)]
            .filter(i => i)
            .join(' • ');

          return (
            <div key={index} className="mb-3">
              <h3 className="text-[12px] font-bold text-gray-800 mb-0.5 leading-snug">{filterEmpty(edu.degree) || 'Degree'}</h3>
              {institutionLocation && (
                <p className="text-xs text-gray-500 mb-0.5 leading-snug">{institutionLocation}</p>
              )}
              {hasContent(edu.graduationYear) && (
                <p className="text-[10px] font-semibold text-blue-600">{filterEmpty(edu.graduationYear)}</p>
              )}
              {hasContent(edu.gpa) && (
                <p className="text-[10px] leading-relaxed text-gray-800 mb-1">GPA: {edu.gpa}</p>
              )}
            </div>
          );
        })}
      </div>
    );
  };

  const renderProjects = () => {
    if (!userdata.projects || userdata.projects.length === 0) return null;
    
    const validProjects = userdata.projects.filter(project => 
      hasContent(project.title) || hasContent(project.description)
    );
    
    if (validProjects.length === 0) return null;

    return (
      <div className="mb-5">
        <h2 className="text-sm font-bold mb-2.5 text-gray-800 border-b-2 border-blue-600 pb-1 uppercase tracking-wider">Projects</h2>
        {validProjects.map((project, index) => (
          <div key={index} className="mb-3.5">
            <h3 className="text-xs font-bold text-gray-800 mb-1 leading-snug">{filterEmpty(project.title) || 'Project'}</h3>
            {hasContent(project.description) && (
              <p className="text-xs text-gray-800 mb-1.5 leading-relaxed">{filterEmpty(project.description)}</p>
            )}
            {project.technologies && project.technologies.length > 0 && (
              <div className="flex flex-wrap mt-1">
                {project.technologies
                  .filter(tech => tech && tech.trim())
                  .map((tech, idx) => (
                    <span key={idx} className="text-[9px] bg-gray-100 text-gray-600 px-2 py-1 rounded-full mr-1.5 mb-1.5 border border-gray-200">{tech.trim()}</span>
                  ))}
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };

  const displayName = filterEmpty(userdata.personalInfo?.fullName) || 'Your Name';
  const displayTitle = filterEmpty(userdata.experience?.[0]?.title) || '';
  const hasValidImage = userdata.image && userdata.image.length > 0 && hasContent(userdata.image[0]);

  const getInitials = (name: string): string => {
    const parts = name.trim().split(' ').filter(p => p);
    if (parts.length === 0) return '?';
    if (parts.length === 1) return parts[0][0].toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  const initials = getInitials(displayName);

  return (
    <div className="font-sans bg-white">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-[35%] bg-gray-800 text-white p-8">
          <div className={`text-center ${hasValidImage ? 'mb-8' : 'mb-6'}`}>
            {hasValidImage ? (
              <img className="w-24 h-24 rounded-full mb-4 border-2 object-cover border-white mx-auto" src={userdata.image[0]} alt="Avatar" />
            ) : (
              <div className="w-20 h-20 rounded-full mb-3 border-2 border-blue-600 bg-gray-500 flex items-center justify-center mx-auto">
                <span className="text-3xl font-bold text-white">{initials}</span>
              </div>
            )}
            <h1 className="text-xl font-bold mb-1 text-white text-center leading-tight">{displayName}</h1>
            {displayTitle && (
              <p className="text-xs font-semibold text-gray-200 text-center opacity-95 leading-snug">{displayTitle}</p>
            )}
          </div>

          {renderContactInfo()}
          {renderSkills()}
          {renderLanguages()}
        </div>

        {/* Main Content */}
        <div className="w-[65%] p-8">
          {hasContent(userdata.professionalSummary) && (
            <div className="mb-5">
              <h2 className="text-sm font-bold mb-2.5 text-gray-800 border-b-2 border-blue-600 pb-1 uppercase tracking-wider">Professional Profile</h2>
              <p className="text-[10px] leading-relaxed text-gray-800 text-justify">
                {filterEmpty(userdata.professionalSummary)}
              </p>
            </div>
          )}

          {renderExperience()}
          {renderEducation()}
          {renderProjects()}
        </div>
      </div>
    </div>
  );
};

export default Theme1;
