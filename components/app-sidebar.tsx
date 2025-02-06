"use client";

import {
  Activity,
  BarChart,
  Bell,
  Bookmark,
  BookOpen,
  Command,
  CreditCard,
  FileText,
  HeadphonesIcon,
  HelpCircle,
  LayoutGrid,
  LifeBuoy,
  Lightbulb,
  Link,
  Send,
  Settings,
  Shield,
  Sparkles,
  Telescope,
  TrendingUp,
  User,
  Users,
} from "lucide-react";
import * as React from "react";

import { NavMain } from "@/components/nav-main";
import { NavSecondary } from "@/components/nav-secondary";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Home",
      url: "/home",
      icon: LayoutGrid,
      isActive: true,
      items: [],
    },
    {
      title: "Support",
      url: "#",
      icon: Telescope,
      items: [
        {
          title: "Help Center & Documentation",
          url: "#",
          icon: BookOpen,
        },
        {
          title: "Contact Support",
          url: "#",
          icon: HeadphonesIcon,
        },
        {
          title: "Status & Service Updates",
          url: "#",
          icon: Activity,
        },
        {
          title: "Community & Self-Help",
          url: "#",
          icon: Users,
        },
        {
          title: "Legal & Policies",
          url: "#",
          icon: FileText,
        },
      ],
    },
    {
      title: "Profile",
      url: "#",
      icon: Bookmark,
      items: [
        {
          title: "Personal Information",
          url: "#",
          icon: User,
        },
        {
          title: "Account Settings",
          url: "#",
          icon: Settings,
        },
        {
          title: "Subscription & Billing",
          url: "#",
          icon: CreditCard,
        },
        {
          title: "Connected Accounts & Integrations",
          url: "#",
          icon: Link,
        },
        {
          title: "Notifications & Preferences",
          url: "#",
          icon: Bell,
        },
        {
          title: "Security & Privacy",
          url: "#",
          icon: Shield,
        },
        {
          title: "Support & Help",
          url: "#",
          icon: HelpCircle,
        },
      ],
    },
    {
      title: "Insights",
      url: "#",
      icon: Lightbulb,
      items: [
        {
          title: "Subscription Overview",
          url: "#",
          icon: CreditCard,
        },
        {
          title: "AI-Powered Recommendations",
          url: "#",
          icon: Sparkles,
        },
        {
          title: "Spending Trends & Analytics",
          url: "#",
          icon: TrendingUp,
        },
        {
          title: "Personalized Alerts & Actions",
          url: "#",
          icon: Bell,
        },
        {
          title: "Financial Wellness Score",
          url: "#",
          icon: BarChart,
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: "Support",
      url: "#",
      icon: LifeBuoy,
    },
    {
      title: "Feedback",
      url: "#",
      icon: Send,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar variant="floating" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <Command className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">Cordon</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
