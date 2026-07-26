import { getConfig } from "./content";

type AuthorSocialType = {
    name: string;
    href: string;
};

type AuthorType = {
    name: string;
    title: string;
    email: string;
    social: AuthorSocialType[];
};

export type AppConfigType = {
    title: string;
    author: AuthorType;
    rss: string;
    ui: {
        home: {
            hero: {
                heading: string;
                subheading: string;
            };
        };
        footer: {
            description: string;
            copyright: string;
        };
    };
};

export const config = getConfig() as AppConfigType;
