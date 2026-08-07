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

        seeAllHref?: string;
        animationDelay?: number;
    } & HTMLAttributes<HTMLElement>
>;

export function HomeSection({
    id,
    title,
    children,
    className,
    seeAllHref,
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
                        "mb-3",
                        "border-b",
                        "border-smooth-border/70",
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

                    {seeAllHref && (
                        <Link
                            href={seeAllHref}
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
                                "hover:text-journal-accent",
                                "hover:underline",
                                "underline-offset-4",
                                "decoration-1",
                                "dark:hover:text-journal-accent",
                            )}
                        >
                            See all
                        </Link>
                    )}
                </div>
                {children}
            </FadeUp>
        </section>
    );
}
