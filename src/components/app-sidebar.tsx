"use client"
import { useMemo } from 'react';
import * as React from "react"
import {
  LayoutDashboard,
  FileText,
  Palette,
  Globe,
  Settings,
  Lock,
  Sparkles
} from "lucide-react"
import { ModeToggle } from "./ModeToggle"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar"
import { useIsCVAnalyzed } from '@/hooks/useIsCVAnalyzed';
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import NextLink from "next/link";

export function AppSidebar({ ...props }) {
  const { isCVAnalyzed } = useIsCVAnalyzed();
  const { data: session } = useSession();
  const pathname = usePathname();

  const user = useMemo(() => ({
    name: session?.user?.name || "User",
    email: session?.user?.email || "",
    avatar: session?.user?.image || "/avatars/default.jpg",
  }), [session?.user?.name, session?.user?.email, session?.user?.image]);

  const navGroups = useMemo(() => [
    {
      label: "Overview",
      items: [
        { title: "Dashboard", url: "/Home", icon: LayoutDashboard }
      ]
    },
    {
      label: "Creation",
      items: [
        { title: "CV Manager", url: "/ReadCV", icon: FileText },
        {
          title: "Resume Builder",
          url: isCVAnalyzed ? "/Resume" : "#",
          icon: Palette,
          disabled: !isCVAnalyzed,
          tooltip: !isCVAnalyzed ? "Analyze your CV first to unlock" : undefined
        },
        {
          title: "Cover Letter",
          url: isCVAnalyzed ? "/CoverLetter" : "#",
          icon: Sparkles,
          disabled: !isCVAnalyzed,
          tooltip: !isCVAnalyzed ? "Analyze your CV first to unlock" : undefined
        }
      ]
    },
    {
      label: "Growth",
      items: [
        {
          title: "Portfolio",
          url: isCVAnalyzed ? "/portfolios" : "#",
          icon: Globe,
          disabled: !isCVAnalyzed,
          tooltip: !isCVAnalyzed ? "Analyze your CV first to unlock" : undefined
        },
      ]
    },
    {
      label: "Preferences",
      items: [
        { title: "Settings", url: "/Settings", icon: Settings }
      ]
    }
  ], [isCVAnalyzed]);

  return (
    <Sidebar collapsible="icon" className="border-r border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-[#0f0f11]" {...props}>
      <SidebarHeader className="h-16 flex justify-center px-4 pt-4 pb-2">
        <div className="flex items-center gap-3 font-semibold text-gray-900 dark:text-white overflow-hidden transition-all group-data-[collapsible=icon]:w-auto group-data-[collapsible=icon]:justify-center">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center shrink-0 shadow-sm">
            <span className="text-white font-bold text-lg leading-none tracking-tighter">C</span>
          </div>
          <span className="truncate group-data-[collapsible=icon]:hidden font-bold tracking-tight text-lg">
            CV Tools
          </span>
        </div>
      </SidebarHeader>

      <SidebarContent className="px-3 py-2 scrollbar-none space-y-5 my-2">
        {navGroups.map((group, index) => (
          <SidebarGroup key={index} className="p-0">
            <SidebarGroupLabel className="px-3 text-[11px] font-semibold tracking-wider text-muted-foreground uppercase mb-1.5 group-data-[collapsible=icon]:hidden h-auto py-0">
              {group.label}
            </SidebarGroupLabel>
            <SidebarMenu className="gap-1">
              {group.items.map((item) => {
                const isActive = pathname === item.url || (pathname === '/' && item.url === '/Home');

                if (item.disabled) {
                  return (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        tooltip={item.tooltip}
                        disabled
                        className="opacity-50 cursor-not-allowed text-muted-foreground px-3 py-2 h-[36px]"
                      >
                        <item.icon className="w-[18px] h-[18px]" strokeWidth={1.5} />
                        <span className="font-medium text-[13px] tracking-wide">{item.title}</span>
                        <Lock className="w-3.5 h-3.5 ml-auto text-muted-foreground/50" />
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  )
                }

                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive}
                      tooltip={item.title}
                      className={`px-3 py-2 h-[36px] transition-colors group/menu-item relative ${isActive
                          ? "bg-blue-50/80 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400 font-semibold hover:bg-blue-50/80 dark:hover:bg-blue-500/10"
                          : "text-muted-foreground hover:text-foreground hover:bg-black/5 dark:hover:bg-white/5 font-medium"
                        }`}
                    >
                      <NextLink href={item.url} className="flex items-center gap-3">
                        <item.icon
                          className={`w-[18px] h-[18px] shrink-0 ${isActive ? 'text-blue-600 dark:text-blue-400' : 'text-muted-foreground group-hover/menu-item:text-foreground'} transition-colors`}
                          strokeWidth={isActive ? 2 : 1.5}
                        />
                        <span className="text-[13px] tracking-wide">
                          {item.title}
                        </span>
                        {/* Modern left-active indicator */}
                        {isActive && (
                          <span className="absolute left-0 top-1/2 -translate-y-1/2 h-5 w-[3px] rounded-r-full bg-blue-600 dark:bg-blue-400 opacity-100 transition-all duration-300" />
                        )}
                      </NextLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <div className="mt-auto px-4 py-3 flex justify-end">
        <ModeToggle />
      </div>

      <SidebarFooter className="border-t border-gray-200 dark:border-gray-800 p-3 bg-transparent">
        <NavUser user={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}