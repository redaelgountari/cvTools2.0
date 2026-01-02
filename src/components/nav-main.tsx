"use client"

import { ChevronRight, type LucideIcon, Lock } from "lucide-react"
import NextLink from "next/link" 
import { usePathname } from "next/navigation"

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"

export function NavMain({
  items,
}: {
  items: {
    title: string
    url: string
    icon?: LucideIcon
    isActive?: boolean
    items?: {
      title: string
      url: string
      disabled?: boolean
      icon?: LucideIcon
      tooltip?: string
    }[]
  }[]
}) {
  const pathname = usePathname()

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Platform</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => (
          <Collapsible
            key={item.title}
            asChild
            defaultOpen={item.isActive}
            className="group/collapsible"
          >
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton tooltip={item.title}>
                  {item.icon && <item.icon />}
                  <span>{item.title}</span>
                  <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                  {item.items?.map((subItem) => {
                    const isActive = pathname === subItem.url
                    
                    // If the item is disabled, show it with lock icon and disabled styling
                    if (subItem.disabled) {
                      return (
                        <SidebarMenuSubItem key={subItem.title}>
                          <div 
                            className="relative flex h-8 min-w-8 items-center gap-2 overflow-hidden rounded-md px-2 text-xs outline-none cursor-not-allowed opacity-50 hover:opacity-50"
                            title={subItem.tooltip || "This feature is currently unavailable"}
                          >
                            <Lock className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                            <div className="flex flex-1 overflow-hidden">
                              <div className="line-clamp-1 pr-6 text-muted-foreground">
                                {subItem.title}
                              </div>
                            </div>
                          </div>
                        </SidebarMenuSubItem>
                      )
                    }

                    // Active enabled item
                    return (
                      <SidebarMenuSubItem key={subItem.title}>
                        <SidebarMenuSubButton asChild isActive={isActive}>
                          <NextLink 
                            href={subItem.url} 
                            className="flex items-center w-full"
                          >
                            <span>{subItem.title}</span>
                          </NextLink>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    )
                  })}
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}