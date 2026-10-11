export interface NavItemType {
    href: string;
    label: string;
}

export const NAV_ITEMS: NavItemType[] = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/blog", label: "Writeups" },
    { href: "/showcase", label: "Showcase" },
    { href: "/lab", label: "Laboratory" },
];
