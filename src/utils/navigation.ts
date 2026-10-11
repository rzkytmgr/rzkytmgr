export function isNavItemActive(pathname: string, href: string): boolean {
    if (href === "/") {
        return pathname === "/";
    }

    if (href === "/blog") {
        return pathname === "/blog" || pathname.startsWith("/blog/");
    }

    return pathname === href || pathname.startsWith(`${href}/`);
}
