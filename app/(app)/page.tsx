import { Components } from "@/components/pages/home/_components";
import { config } from "@/lib/config";
import {
    LaboratoryCardType,
    ReadingCardType,
    ShowcaseCardType,
    WriteupsCardType,
} from "@/types/global";
import { cn } from "@/utils";

export default function AppPage() {
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

    const showcases: ShowcaseCardType[] = [
        {
            id: "SCPR-03",
            link: "https://github.com/nestjs/nest",
            title: "Commerce API",
            description:
                "A scalable REST API built for modern e-commerce platforms, providing secure authentication, product management, order processing, and payment integration while following a modular architecture for long-term maintainability.",
            techstack: "NestJS",
            date: "Aug 03, 2026",
            slug: "SCPR-03-commerce-api",
            is_archive: false,
        },
        {
            id: "SCPR-04",
            link: "https://github.com/supabase/supabase",
            title: "Pulse CMS",
            description:
                "A lightweight content management system focused on simplicity and speed. It enables developers to manage blog posts, media assets, and user permissions through an elegant interface backed by a modern backend infrastructure.",
            techstack: "Supabase",
            date: "Sep 18, 2026",
            slug: "SCPR-04-pulse-cms",
            is_archive: true,
        },
        {
            id: "SCPR-05",
            link: "https://github.com/tailwindlabs/tailwindcss",
            title: "Portfolio Studio",
            description:
                "A customizable portfolio template for developers and designers featuring smooth animations, dark mode support, SEO optimization, and a modular component system that makes personalization quick and effortless.",
            techstack: "Tailwind CSS",
            date: "Oct 05, 2026",
            slug: "SCPR-05-portfolio-studio",
            is_archive: false,
        },
        {
            id: "SCPR-06",
            link: "https://github.com/prisma/prisma",
            title: "Invoice Hub",
            description:
                "A web application for generating and managing invoices with support for recurring billing, client management, payment tracking, and downloadable PDF invoices. The project emphasizes reliability and a straightforward user experience.",
            techstack: "Prisma",
            date: "Nov 21, 2026",
            slug: "SCPR-06-invoice-hub",
            is_archive: true,
        },
    ];

    const reading: ReadingCardType[] = [
        {
            id: "ACH-01",
            link: "https://github.com/",
            category: "Open Source",
            title: "Released My First Open Source Project on GitHub",
            date: "Jun 27",
        },
        {
            id: "ACH-02",
            link: "https://dev.to/",
            category: "Writing",
            title: "Published an Article About Modern Frontend Development",
            date: "Jul 09",
        },
        {
            id: "ACH-03",
            link: "https://www.producthunt.com/",
            category: "Product Launch",
            title: "Launched a Developer Portfolio Template",
            date: "Aug 16",
        },
        {
            id: "ACH-04",
            link: "https://www.linkedin.com/",
            category: "Career",
            title: "Started a New Role as Full Stack Developer",
            date: "Sep 03",
        },
    ];

    const laboratory: LaboratoryCardType[] = [
        {
            id: "EXP-01",
            slug: "building-scalable-rest-api-with-nestjs",
            title: "Building a Scalable REST API with NestJS",
            description:
                "Designed and developed a modular REST API that supports authentication, role-based authorization, request validation, and database abstraction. The project focused on maintainability, scalability, and clean architecture while serving as the backend for multiple frontend applications.",
            is_archive: false,
            stack: ["NestJS", "PostgreSQL", "Prisma", "JWT", "Docker"],
            date: "Jun 26, 2026",
        },
        {
            id: "EXP-02",
            slug: "developing-modern-dashboard-with-nextjs",
            title: "Developing a Modern Analytics Dashboard with Next.js",
            description:
                "Created a responsive analytics dashboard featuring server-side rendering, interactive charts, authentication, and optimized performance. The application provides real-time insights while maintaining an intuitive user experience across desktop and mobile devices.",
            is_archive: false,
            stack: [
                "Next.js",
                "TypeScript",
                "Tailwind CSS",
                "Recharts",
                "Supabase",
            ],
            date: "Jul 18, 2026",
        },
        {
            id: "EXP-03",
            slug: "designing-reusable-ui-component-library",
            title: "Designing a Reusable UI Component Library",
            description:
                "Built a collection of reusable UI components with a consistent design system, accessibility support, and comprehensive documentation. The library reduced development time and ensured a unified user interface across multiple projects.",
            is_archive: true,
            stack: ["React", "TypeScript", "Tailwind CSS", "Storybook", "Vite"],
            date: "Sep 02, 2026",
        },
        {
            id: "EXP-04",
            slug: "automating-ci-cd-deployment-pipeline",
            title: "Automating CI/CD Deployment Pipeline for Web Applications",
            description:
                "Implemented an automated deployment workflow that performs testing, code quality checks, containerization, and production deployment. The pipeline significantly reduced manual deployment effort while improving reliability and release consistency.",
            is_archive: false,
            stack: ["GitHub Actions", "Docker", "Nginx", "Linux", "AWS"],
            date: "Oct 21, 2026",
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
                    showcases,
                }}
            />
            <Components.Reading
                value={{
                    reading,
                }}
            />
            <Components.Laboratory
                value={{
                    laboratory,
                }}
            />
        </main>
    );
}
