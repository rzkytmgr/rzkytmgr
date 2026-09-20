import Link from "next/link";
import { Typography } from "@/components/ui/typography";
import type { WriteupsCardType } from "@/types/global";
import { cn, parsePublishDate } from "@/utils";

type WriteupsListItemProps = Readonly<{
    data: WriteupsCardType;
}>;

export function WriteupsListItem({ data }: WriteupsListItemProps) {
    const published = parsePublishDate(data.date);

    return (
        <article
            className={cn(
                "group",
                "relative",
                "grid",
                "grid-cols-1",
                "gap-3",
                "border-b",
                "border-smooth-border",
                "py-8",
                "md:grid-cols-12",
            )}
        >
            <div
                aria-hidden="true"
                className={cn(
                    "pointer-events-none",
                    "absolute",
                    "inset-0",
                    "z-0",
                    "overflow-hidden",
                )}
            >
                <div
                    className={cn(
                        "absolute",
                        "-right-12",
                        "-top-12",
                        "size-40",
                        "rounded-full",
                        "opacity-0",
                        "transition-opacity",
                        "duration-150",
                        "group-hover:opacity-70",
                        "motion-reduce:transition-none",
                        "bg-[radial-gradient(closest-side,color-mix(in_oklab,var(--journal-accent)_30%,transparent),transparent)]",
                        "blur-2xl",
                    )}
                />
            </div>

            <div className={cn("relative", "col-span-1", "hidden", "lg:block")}>
                <div
                    className={cn(
                        "flex",
                        "items-center",
                        "font-mono",
                        "text-xs",
                        "text-neutral-500",
                    )}
                >
                    <Typography
                        as="span"
                        size="xs"
                        className={cn(
                            "whitespace-nowrap",
                            "text-zinc-950/60",
                            "dark:text-zinc-50/55",
                        )}
                    >
                        {published.day} {published.month}
                    </Typography>
                </div>
            </div>

            <div
                className={cn(
                    "relative",
                    "col-span-11",
                    "flex",
                    "flex-col",
                    "gap-2",
                    "md:gap-3",
                )}
            >
                <div
                    className={cn(
                        "flex",
                        "items-center",
                        "font-mono",
                        "text-xs",
                        "text-neutral-500",
                    )}
                >
                    <Typography
                        as="span"
                        size="xs"
                        className={cn("mr-2", "shrink-0", "lg:hidden")}
                    >
                        {published.label}
                    </Typography>

                    <Typography
                        as="span"
                        size="xs"
                        className={cn(
                            "line-clamp-1",
                            "text-journal-accent-text",
                        )}
                    >
                        {data.tag}
                    </Typography>
                </div>

                <Typography
                    as="h3"
                    size="xl"
                    weight="semibold"
                    className={cn("line-clamp-2", "max-w-4xl", "md:text-2xl")}
                >
                    <Link
                        href={`/blog/${data.slug}`}
                        className={cn(
                            "transition-colors",
                            "duration-100",
                            "hover:text-journal-accent-text",
                            "focus-visible:outline-2",
                            "focus-visible:outline-offset-4",
                            "focus-visible:outline-journal-accent",
                        )}
                    >
                        {data.title}
                    </Link>
                </Typography>

                <Typography
                    as="p"
                    className={cn(
                        "max-w-3xl",
                        "line-clamp-2",
                        "text-neutral-500",
                    )}
                >
                    {data.description}
                </Typography>

                <div
                    className={cn(
                        "mt-2",
                        "flex",
                        "items-center",
                        "justify-between",
                        "gap-3",
                    )}
                >
                    <Typography
                        as="span"
                        size="xs"
                        className={cn("font-mono", "text-neutral-500")}
                    >
                        {data.readingTime}
                    </Typography>

                    <Link
                        href={`/blog/${data.slug}`}
                        className={cn(
                            "inline-flex",
                            "items-center",
                            "font-mono",
                            "text-xs",
                            "font-medium",
                            "text-neutral-600",
                            "underline",
                            "transition-[color,transform]",
                            "duration-100",
                            "hover:text-journal-accent-text",
                            "group-hover:translate-x-1",
                            "motion-reduce:group-hover:translate-x-0",
                            "focus-visible:outline-2",
                            "focus-visible:outline-offset-4",
                            "focus-visible:outline-journal-accent",
                        )}
                        aria-label={`Read more about ${data.title}`}
                    >
                        read more
                    </Link>
                </div>
            </div>
        </article>
    );
}
