"use client";

import {
  BarChart,
  Bell,
  Bookmark,
  Command,
  CreditCard,
  LayoutGrid,
  LifeBuoy,
  Lightbulb,
  Link,
  Send,
  Sparkles,
  Telescope,
  TrendingUp,
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
      title: "Connected Accounts & Integrations",
      url: "/connected-accounts",
      icon: Link,
      items: [],
    },
    //support
    {
      title: "Support",
      url: "#",
      icon: Telescope,
    },
    // insights
    {
      title: "Profile",
      url: "profile",
      icon: Bookmark,
    },
    {
      title: "Pricing",
      url: "/pricing",
      icon: LayoutGrid,
      isActive: true,
      items: [],
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
