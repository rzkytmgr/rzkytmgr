import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";

export type NavbarItemType = {
    href: string;
    label: string;
};

export type SocialType = {
    href: string;
    name: string;
};

export type TranslatorReturnType =
    | Awaited<ReturnType<typeof getTranslations>>
    | ReturnType<typeof useTranslations>;

export type WriteupsCardType = {
    id: string;
    tag: string;
    slug: string;
    title: string;
    description: string;
    date: string;
    readingTime: string;
};

export type ShowcaseCardType = {
    id: string;
    link: string;
    title: string;
    description: string;
    techstack: string[];
    date: string;
    slug: string;
    is_archive: boolean;
};

export type ExplorationCardType = {
    id: string;
    link: string;
    category: string;
    title: string;
    date: string;
};

export type LaboratoryCardType = {
    id: string;
    slug: string;
    title: string;
    description: string;
    is_archive: boolean;
    stack: string[];
    date: string;
};
