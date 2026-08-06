import Link from "next/link";
import type { AnchorHTMLAttributes, ReactNode } from "react";
import { cn } from "@/utils";

type NavbarItemProps = Readonly<
    Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "children" | "href"> & {
        href: string;
        children: ReactNode;
        active?: boolean;
    }
>;

export function NavbarItem({
    href,
    children,
    active = false,
    className,
    ...props
}: NavbarItemProps) {
    return (
        <Link
            href={href}
            className={cn(
                "border-journal-accent",
                "pb-1",
                "text-sm",
                "text-foreground",
                "transition-colors",
                "hover:text-journal-accent",
                active && "font-medium text-journal-accent",
                className,
            )}
            aria-current={active ? "page" : undefined}
            {...props}
        >
            {children}
        </Link>
    );
}
