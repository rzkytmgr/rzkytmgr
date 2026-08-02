import Link from "next/link";
import type { AnchorHTMLAttributes, ReactNode } from "react";
import { cn } from "@/utils";

type NavbarItemProps = Readonly<
    Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "children" | "href"> & {
        href: string;
        children: ReactNode;
    }
>;

export function NavbarItem({
    href,
    children,
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
                className,
            )}
            {...props}
        >
            {children}
        </Link>
    );
}
