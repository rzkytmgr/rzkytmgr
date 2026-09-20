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
                "group/item",
                "inline-flex",
                "items-center",
                "px-2.5",
                "py-1.5",
                "text-sm",
                className,
            )}
            aria-current={active ? "page" : undefined}
            {...props}
        >
            <span
                className={cn(
                    "transition-colors",
                    "duration-100",
                    "group-hover/item:text-journal-accent-text",
                    active && "font-medium text-journal-accent-text",
                )}
            >
                {children}
            </span>
        </Link>
    );
}
