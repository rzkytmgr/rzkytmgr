import { MoveLeft, MoveRight } from "lucide-react";
import Link from "next/link";
import { Typography } from "../ui/typography";
import { cn } from "@/utils";

type PagerItem = {
    href: string;
    title: string;
};

type ArticlePagerProps = Readonly<{
    previous?: PagerItem | null;
    next?: PagerItem | null;
}>;

export function ArticlePager({ previous, next }: ArticlePagerProps) {
    if (!previous && !next) {
        return null;
    }

    return (
        <nav
            aria-label="Article navigation"
            className={cn(
                "mt-16",
                "grid",
                "grid-cols-1",
                "gap-6",
                "border-t",
                "border-smooth-border/70",
                "pt-8",
                "sm:grid-cols-2",
            )}
        >
            <Typography
                as="h2"
                size="xs"
                className={cn(
                    "mb-2",
                    "font-mono",
                    "uppercase",
                    "tracking-wider",
                    "text-neutral-500",
                    "sm:col-span-2",
                )}
            >
                More articles
            </Typography>
            {previous ? (
                <Link
                    href={previous.href}
                    className={cn(
                        "group",
                        "flex",
                        "flex-col",
                        "gap-1.5",
                        "justify-self-start",
                    )}
                >
                    <span
                        className={cn(
                            "inline-flex",
                            "items-center",
                            "gap-2",
                            "font-mono",
                            "text-xs",
                            "uppercase",
                            "tracking-wider",
                            "text-neutral-500",
                        )}
                    >
                        <MoveLeft
                            aria-hidden="true"
                            className={cn(
                                "size-3",
                                "transition-transform",
                                "group-hover:-translate-x-1",
                            )}
                        />
                        Previous
                    </span>
                    <Typography
                        as="span"
                        weight="medium"
                        className={cn(
                            "line-clamp-2",
                            "text-zinc-900",
                            "transition-colors",
                            "group-hover:text-journal-accent",
                            "dark:text-zinc-100",
                        )}
                    >
                        {previous.title}
                    </Typography>
                </Link>
            ) : (
                <span />
            )}

            {next ? (
                <Link
                    href={next.href}
                    className={cn(
                        "group",
                        "flex",
                        "flex-col",
                        "gap-1.5",
                        "items-start",
                        "sm:items-end",
                        "sm:text-right",
                        "sm:justify-self-end",
                    )}
                >
                    <span
                        className={cn(
                            "inline-flex",
                            "items-center",
                            "gap-2",
                            "font-mono",
                            "text-xs",
                            "uppercase",
                            "tracking-wider",
                            "text-neutral-500",
                        )}
                    >
                        Next
                        <MoveRight
                            aria-hidden="true"
                            className={cn(
                                "size-3",
                                "transition-transform",
                                "group-hover:translate-x-1",
                            )}
                        />
                    </span>
                    <Typography
                        as="span"
                        weight="medium"
                        className={cn(
                            "line-clamp-2",
                            "text-zinc-900",
                            "transition-colors",
                            "group-hover:text-journal-accent",
                            "dark:text-zinc-100",
                        )}
                    >
                        {next.title}
                    </Typography>
                </Link>
            ) : (
                <span />
            )}
        </nav>
    );
}
