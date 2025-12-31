// app/Resume/PDFPreviewWrapper.tsx
"use client";

import React from 'react';
import dynamic from 'next/dynamic';

const Theme1 = dynamic(() => import('@/app/GenComponents/Themes/Theme1'), { ssr: false });
const Theme2 = dynamic(() => import('@/app/GenComponents/Themes/Theme2'), { ssr: false });
const Theme3 = dynamic(() => import('@/app/GenComponents/Themes/Theme3'), { ssr: false });
const Theme4 = dynamic(() => import('@/app/GenComponents/Themes/Theme4'), { ssr: false });
const Theme5 = dynamic(() => import('@/app/GenComponents/Themes/Theme5'), { ssr: false });
const Theme6 = dynamic(() => import('@/app/GenComponents/Themes/Theme6'), { ssr: false });
const Theme7 = dynamic(() => import('@/app/GenComponents/Themes/Theme7'), { ssr: false });
const Theme8 = dynamic(() => import('@/app/GenComponents/Themes/Theme8'), { ssr: false });
const Theme9 = dynamic(() => import('@/app/GenComponents/Themes/Theme9'), { ssr: false });
const Theme10 = dynamic(() => import('@/app/GenComponents/Themes/Theme10'), { ssr: false });
const Theme11 = dynamic(() => import('@/app/GenComponents/Themes/Theme11'), { ssr: false });

const PDFViewer = dynamic(() => import('@/app/GenComponents/PDFViewer'), { ssr: false });

interface PDFPreviewWrapperProps {
  resumeData: any;
  userImage: string;
  activeTheme: string;
}

export default function PDFPreviewWrapper({ resumeData, userImage, activeTheme }: PDFPreviewWrapperProps) {
  const renderThemeComponent = () => {
    if (!resumeData) return null;
    const themeProps = { userdata: resumeData, userImage };
    
    switch (activeTheme) {
      case 'theme1': return <Theme1 {...themeProps} />;
      case 'theme2': return <Theme2 {...themeProps} />;
      case 'theme3': return <Theme3 {...themeProps} />;
      case 'theme4': return <Theme4 {...themeProps} />;
      case 'theme5': return <Theme5 {...themeProps} />;
      case 'theme6': return <Theme6 {...themeProps} />;
      case 'theme7': return <Theme7 {...themeProps} />;
      case 'theme8': return <Theme8 {...themeProps} />;
      case 'theme9': return <Theme9 {...themeProps} />;
      case 'theme10': return <Theme10 {...themeProps} />;
      case 'theme11': return <Theme11 {...themeProps} />;
      default: return <Theme2 {...themeProps} />;
    }
  };

  return (
    <PDFViewer width="100%" height="800px">
      {renderThemeComponent()}
    </PDFViewer>
  );
}