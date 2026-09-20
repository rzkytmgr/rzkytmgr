import Link from "next/link";
import type { HTMLAttributes, ReactNode } from "react";
import { FadeUp } from "./fade-up";
import { Typography } from "../ui/typography";
import { cn } from "@/utils";

type HomeSectionProps = Readonly<
    {
        id: string;
        title: string;
        children: ReactNode;
        className?: string;

        linkHref?: string;
        linkLabel?: string;
        animationDelay?: number;
    } & HTMLAttributes<HTMLElement>
>;

export function HomeSection({
    id,
    title,
    children,
    className,
    linkHref,
    linkLabel = "view more",
    animationDelay = 0,
    ...props
}: HomeSectionProps) {
    return (
        <section id={id} className={cn("pt-32", className)} {...props}>
            <FadeUp delay={animationDelay}>
                <div
                    className={cn(
                        "flex",
                        "items-center",
                        "justify-between",
                        "border-b",
                        "border-smooth-border",
                        "pb-3",
                    )}
                >
                    <Typography
                        as="h2"
                        size="xs"
                        className={cn(
                            "font-mono",
                            "uppercase",
                            "tracking-wider",
                            "text-neutral-500",
                        )}
                    >
                        {title}
                    </Typography>

                    {linkHref && (
                        <Link
                            href={linkHref}
                            className={cn(
                                "inline-flex",
                                "items-center",
                                "shrink-0",
                                "whitespace-nowrap",
                                "font-mono",
                                "text-xs",
                                "text-neutral-500",
                                "transition-colors",
                                "duration-200",
                                "hover:text-journal-accent-text",
                                "hover:underline",
                                "underline-offset-4",
                                "decoration-1",
                                "focus-visible:outline-2",
                                "focus-visible:outline-offset-4",
                                "focus-visible:outline-journal-accent",
                            )}
                        >
                            {linkLabel}
                        </Link>
                    )}
                </div>
                {children}
            </FadeUp>
        </section>
    );
}
