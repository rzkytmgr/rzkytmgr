export type NavbarItemType = {
    href: string;
    label: string;
};

export type AdjacentItemType = {
    href: string;
    title: string;
};

export type AdjacentType = {
    previous: AdjacentItemType | null;
    next: AdjacentItemType | null;
};

export type SocialType = {
    href: string;
    name: string;
};

export type WriteupsCardType = {
    id: string;
    tag: string;
    slug: string;
    title: string;
    description: string;
    thumbnail: string;
    date: string;
    readingTime: string;
};

export type ShowcaseCardType = {
    id: string;
    link: {
        repository?: string;

        preview?: string;
    };
    title: string;
    description: string;
    thumbnail: string;
    techstack: string[];
    date: string;
    readingTime: string;
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
    thumbnail: string;
    is_archive: boolean;
    stack: string[];
    date: string;
    readingTime: string;
};
