import { getConfig } from "./content/loader";

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

export type ResumeEntryType = Readonly<{
    role: string;
    company?: string;
    org?: string;
    school?: string;
    degree?: string;
    period: string;
    location?: string;
    points?: readonly string[];
}>;

export type ResumeConfigType = Readonly<{
    overview: string;
    workExperience: ResumeEntryType[];
    education: ResumeEntryType[];
    otherExperience: ResumeEntryType[];
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

export type AppConfigType = Readonly<{
    title: string;
    description: string;
    url: string;
    author: AuthorType;
    rss: string;

    giscus?: GiscusConfigType;
    resume?: ResumeConfigType;
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

export const config = getConfig() as AppConfigType;
