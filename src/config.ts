import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

export type AuthorSocialType = Readonly<{
    name: string;
    href: string;
}>;

export type AuthorType = Readonly<{
    name: string;
    title: string;
    location?: string;
    email: string;
    social: AuthorSocialType[];
}>;

export type GiscusConfigType = Readonly<{
    repo: string;
    repoId: string;
    category: string;
    categoryId: string;
    mapping: string;
    reactionsEnabled: boolean;
    inputPosition: "top" | "bottom";
    lang: string;
}>;

export type ResumeItemType = Readonly<{
    role: string;
    company?: string;
    org?: string;
    period?: string;
    location?: string;
    points: string[];
}>;

export type ResumeType = Readonly<{
    overview: string;
    workExperience: ResumeItemType[];
    education: Readonly<{
        degree: string;
        school?: string;
        period?: string;
        location?: string;
        points: string[];
    }>[];
    otherExperience: ResumeItemType[];
}>;

export type AppConfigType = Readonly<{
    title: string;
    description: string;
    url: string;
    author: AuthorType;
    rss: string;
    giscus?: GiscusConfigType;
    resume?: ResumeType;
    ui: Readonly<{
        home: Readonly<{
            hero: Readonly<{
                heading: string;
                subheading: string;
            }>;
            sections: Readonly<{
                writeups: string;
                showcase: string;
                exploration: string;
                laboratory: string;
            }>;
        }>;
        pages: Readonly<{
            showcase: Readonly<{
                heading: string;
                description: string;
            }>;
            writeups: Readonly<{
                heading: string;
                description: string;
            }>;
            laboratory: Readonly<{
                heading: string;
                description: string;
            }>;
            about: Readonly<{
                heading: string;
                description: string;
                paragraphs: readonly string[];
            }>;
        }>;
        footer: Readonly<{
            description: string;
        }>;
    }>;
}>;

const contentPath = path.resolve("contents");

const raw = fs.readFileSync(path.join(contentPath, "config.yaml"), "utf8");

export const config = matter(raw).data as AppConfigType;
