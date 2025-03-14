"use client"

import * as React from "react"
import {
    AudioWaveform,
    BookOpen,
    Bot,
    Command,
    Frame,
    GalleryVerticalEnd,
    Map,
    PieChart,
    Settings2,
    Footprints
} from "lucide-react"

import { NavMain } from "./nav-main"
import { NavProjects } from "./nav-projects"
import { NavUser } from "./nav-user"
import { TeamSwitcher } from "./team-switcher"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarRail,
} from "@/components/ui/sidebar"
import {useGlobalState} from "@/store/use-global";
import {Separator} from "@/components/ui/separator";

// This is sample data.
const data = {
    user: {
        name: "shadcn",
        email: "m@example.com",
        avatar: "/avatars/shadcn.jpg",
    },
    teams: [
        {
            name: "Acme Inc",
            logo: GalleryVerticalEnd,
            plan: "Enterprise",
        },
        {
            name: "Acme Corp.",
            logo: AudioWaveform,
            plan: "Startup",
        },
        {
            name: "Evil Corp.",
            logo: Command,
            plan: "Free",
        },
    ],
    navMain: [
        {
            title: "旅行记录",
            url: "#",
            icon: Bot,
            items: [
                {
                    title: "照片记录",
                    url: "#",
                },
                {
                    title: "视频记录",
                    url: "#",
                },
                {
                    title: "文字记录",
                    url: "#",
                },
            ],
        },
        {
            title: "旅行开支",
            url: "#",
            icon: BookOpen,
            items: [
                {
                    title: "必要支出",
                    url: "#",
                },
                {
                    title: "爱好支出",
                    url: "#",
                },
                {
                    title: "意外支出",
                    url: "#",
                }
            ],
        },
        {
            title: "Settings",
            url: "#",
            icon: Settings2,
            items: [
                {
                    title: "General",
                    url: "#",
                },
                {
                    title: "Team",
                    url: "#",
                },
                {
                    title: "Billing",
                    url: "#",
                },
                {
                    title: "Limits",
                    url: "#",
                },
            ],
        },
    ],
    projects: [
        {
            name: "路线规划",
            url: "#",
            icon: Map,
        },
        {
            name: "地点收集",
            url: "#",
            icon: PieChart,
        },
        {
            name: "行李check",
            url: "#",
            icon: Frame,
        },
        {
            name: "足迹",
            url: "#",
            icon: Footprints,
        },
    ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const {userData} =  useGlobalState()
    console.log(userData,'userData')
    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarHeader>
                <TeamSwitcher teams={data.teams} />
            </SidebarHeader>
            <SidebarContent>
                <NavProjects projects={data.projects} />
                <Separator className="my-4" />
                <NavMain items={data.navMain} />
            </SidebarContent>
            <SidebarFooter>
                <NavUser user={userData} />
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    )
}
