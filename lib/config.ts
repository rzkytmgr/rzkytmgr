import { getConfig } from "./content";

export type AuthorSocialType = Readonly<{
    name: string;
    href: string;
}>;

export type AuthorType = Readonly<{
    name: string;
    title: string;
    email: string;
    social: AuthorSocialType[];
}>;

export type AppConfigType = Readonly<{
    title: string;
    author: AuthorType;
    rss: string;
    ui: Readonly<{
        home: Readonly<{
            hero: Readonly<{
                heading: string;
                subheading: string;
            }>;
        }>;
        footer: Readonly<{
            description: string;
            copyright: string;
        }>;
    }>;
}>;

export const config = getConfig() as AppConfigType;
