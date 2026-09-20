import type { NavbarItemType } from "@/types/global";

export const NAV_ITEMS: NavbarItemType[] = [
    {
        href: "/",
        label: "Home",
    },
    {
        href: "/about",
        label: "About",
    },
    {
        href: "/blog",
        label: "Writeups",
    },
    {
        href: "/showcase",
        label: "Showcase",
    },
    {
        href: "/lab",
        label: "Laboratory",
    },
];

export function isNavItemActive(pathname: string, href: string): boolean {
    if (href === "/") {
        return pathname === "/";
    }

    if (href === "/blog") {
        return pathname === "/blog" || pathname.startsWith("/blog/");
    }

    return pathname === href || pathname.startsWith(`${href}/`);
}
