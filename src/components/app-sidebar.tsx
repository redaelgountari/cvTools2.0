"use client"
import { useContext, useMemo } from 'react';
import * as React from "react"
import {
  SquareTerminal,
} from "lucide-react"
import { ModeToggle } from "./ModeToggle"
import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { ReadContext } from '@/app/GenComponents/ReadContext';

const data = {
  user: {
    name: "RE",
    avatar: "/avatars/RE.jpg",
  },
}

export function AppSidebar({ ...props }) {
  const { AnlysedCV } = useContext(ReadContext);
  
  // Check if CV is properly analyzed by verifying essential fields exist
  const isCVAnalyzed = useMemo(() => {
    if (!AnlysedCV) return false;
    
    // Check if the object has more than just the basic fields (_id, userId, updatedAt)
    const essentialFields = ['personalInfo', 'skills', 'experience', 'education'];
    const hasEssentialData = essentialFields.some(field => 
      AnlysedCV[field] && 
      (Array.isArray(AnlysedCV[field]) ? AnlysedCV[field].length > 0 : Object.keys(AnlysedCV[field]).length > 0)
    );
    
    return hasEssentialData;
  }, [AnlysedCV]);

  const navMain = useMemo(() => [
    {
      title: "Creating",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "Read CV",
          url: "/ReadCV",
          disabled: false,
        },
        {
          title: "Cover Letter",
          url: isCVAnalyzed ? "/CoverLetter" : "#",
          disabled: !isCVAnalyzed,
          tooltip: !isCVAnalyzed ? "Please analyze your CV first to unlock this feature" : undefined,
        },
        {
          title: "Resume",
          url: isCVAnalyzed ? "/Resume" : "#",
          disabled: !isCVAnalyzed,
          tooltip: !isCVAnalyzed ? "Please analyze your CV first to unlock this feature" : undefined,
        },
        {
          title: "Portfolio",
          url: isCVAnalyzed ? "/portfolios" : "#",
          disabled: !isCVAnalyzed,
          tooltip: !isCVAnalyzed ? "Please analyze your CV first to unlock this feature" : undefined,
        },
        {
          title: "Settings",
          url: "/Settings",
          disabled: false,
        }
      ],
    },
  ], [isCVAnalyzed]);

  return (
    <Sidebar collapsible="icon" {...props}>
      <div className="right-4">
        <ModeToggle/>
      </div>
      <SidebarHeader>
        {/* <TeamSwitcher teams={data.teams} /> */}
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navMain} />
        {/* <NavProjects projects={data.projects} /> */}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}