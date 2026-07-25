import Link from "next/link";
import { HTMLAttributes } from "react";
import { cn } from "@/utils";

type NavbarItemProps = {
    href: string;
    className?: string;
    children?: React.ReactNode;
} & HTMLAttributes<HTMLAnchorElement>;

export const NavbarItem = ({
    href,
    children,
    className,
    ...props
}: NavbarItemProps) => {
    return (
        <Link
            href={href}
            className={cn(
                "text-sm text-foreground border-journal-accent pb-1",
                className,
            )}
            {...props}
        >
            {children}
        </Link>
    );
};
