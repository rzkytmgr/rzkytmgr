import { Components } from "@/components/pages/home/_components";
import { config } from "@/lib/config";
import { getLatestExperiments, getLatestShowcases } from "@/services";
import { getLatestExplorations } from "@/services/exploration";
import {
    LaboratoryCardType,
    ExplorationCardType,
    ShowcaseCardType,
    WriteupsCardType,
} from "@/types/global";
import { cn } from "@/utils";

export default async function AppPage() {
    const showcases = await getLatestShowcases();
    const laboratory = await getLatestExperiments();
    const exploration = await getLatestExplorations();

    const writeups: WriteupsCardType[] = [
        {
            id: "WU-01",
            title: "Building a Personal Website That Actually Feels Personal Instead of Looking Like Every Other Developer Portfolio",
            tags: ["Web Development", "Distributed System"],
            slug: "building-a-personal-website-that-actually-feels-personal-instead-of-looking-like-every-other-developer-portfolio",
            description:
                "Creating a personal website is more than displaying projects and adding a contact form. In this article, I share the design decisions, development process, and lessons I learned while building a website that reflects my personality, tells my story, and creates a memorable experience for visitors without sacrificing performance or accessibility.",
            date: "Jun 26, 2026",
            readingTime: "12 min read",
        },
        {
            id: "WU-02",
            title: "Why Simplicity Wins in Modern UI Design",
            tags: ["UI/UX"],
            slug: "why-simplicity-wins-in-modern-ui-design",
            description:
                "Minimal interfaces often outperform visually complex designs because they reduce cognitive load and help users focus on what truly matters. This post explores practical design principles, real-world examples, and small improvements that can dramatically increase usability while maintaining a clean and polished aesthetic.",
            date: "Jul 08, 2026",
            readingTime: "9 min read",
        },
        {
            id: "WU-03",
            title: "The Developer Tools, Browser Extensions, and Terminal Utilities I Use Every Single Day to Stay Productive",
            tags: ["Productivity"],
            slug: "the-developer-tools-browser-extensions-and-terminal-utilities-i-use-every-single-day-to-stay-productive",
            description:
                "Over the years I've experimented with dozens of development tools, but only a handful have earned a permanent place in my workflow. From code editors and browser extensions to terminal utilities and automation scripts, this article covers the tools that consistently help me write cleaner code, debug faster, and enjoy the development process.",
            date: "Aug 14, 2026",
            readingTime: "15 min read",
        },
        {
            id: "WU-04",
            title: "Five Unexpected Lessons I Learned After Shipping Multiple Side Projects That Nobody Initially Used",
            tags: ["Side Projects"],
            slug: "five-unexpected-lessons-i-learned-after-shipping-multiple-side-projects-that-nobody-initially-used",
            description:
                "Launching side projects taught me far more than reading tutorials ever could. Some projects failed, others gained traction months later, and every single one revealed something valuable about product development, user feedback, consistency, and managing expectations. Here are the biggest lessons that changed the way I approach building software.",
            date: "Sep 03, 2026",
            readingTime: "14 min read",
        },
    ];

    return (
        <main
            id="main-content"
            className={cn(
                "max-w-6xl w-full m-auto px-5 sm:px-6 py-20",
                "md:py-32 space-y-24 md:space-y-32",
            )}
        >
            <Components.Hero
                value={{
                    author: {
                        name: config.author.name,
                        title: config.author.title,
                    },
                    static: {
                        heading: config.ui.home.hero.heading,
                        subheading: config.ui.home.hero.subheading,
                    },
                }}
            />
            <Components.Writeups
                value={{
                    writeups,
                }}
            />

            <Components.Showcases
                value={{
                    showcases: [...showcases.values()] as ShowcaseCardType[],
                }}
            />

            <Components.Exploration
                value={{
                    exploration: [
                        ...exploration.values(),
                    ] as ExplorationCardType[],
                }}
            />

            <Components.Laboratory
                value={{
                    laboratory: [
                        ...laboratory.values(),
                    ] as LaboratoryCardType[],
                }}
            />
        </main>
    );
}
