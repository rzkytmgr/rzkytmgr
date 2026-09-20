import Link from "next/link";
import { Typography } from "@/components/ui/typography";
import type { WriteupsCardType } from "@/types/global";
import { cn, parsePublishDate } from "@/utils";

type WriteupCardProps = Readonly<{
    data: WriteupsCardType;
}>;

export function WriteupCard({ data }: WriteupCardProps) {
    const published = parsePublishDate(data.date);

    return (
        <article
            className={cn(
                "group",
                "relative",
                "h-full",
                "overflow-visible",
                "rounded-md",
                "border",
                "border-smooth-border",
                "bg-surface",
                "p-6",
                "transition-colors",
                "duration-100",
                "hover:border-journal-accent/60",
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
                    "rounded-md",
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
                        "bg-[radial-gradient(closest-side,color-mix(in_oklab,var(--journal-accent)_35%,transparent),transparent)]",
                        "blur-2xl",
                    )}
                />
            </div>

            <div
                className={cn(
                    "relative",
                    "flex",
                    "h-full",
                    "flex-col",
                    "gap-3",
                )}
            >
                <div
                    className={cn(
                        "flex",
                        "min-h-7",
                        "flex-wrap",
                        "items-center",
                        "justify-between",
                        "gap-x-3",
                        "gap-y-1",
                        "font-mono",
                        "text-xs",
                        "text-neutral-500",
                    )}
                >
                    <Typography
                        as="span"
                        size="xs"
                        className={cn("min-w-0", "whitespace-nowrap")}
                    >
                        {published.full}
                    </Typography>

                    <Typography
                        as="span"
                        size="xs"
                        className={cn("shrink-0", "whitespace-nowrap")}
                    >
                        {" "}
                        {data.readingTime}
                    </Typography>
                </div>

                <div className={cn("mb-2", "flex", "flex-col", "gap-1.5")}>
                    <Typography
                        as="h3"
                        size="lg"
                        weight="semibold"
                        className={cn("line-clamp-2")}
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
                        size="sm"
                        className={cn(
                            "max-w-3xl",
                            "line-clamp-3",
                            "text-neutral-500",
                        )}
                    >
                        {data.description}
                    </Typography>
                </div>

                <div
                    className={cn(
                        "mt-auto",
                        "flex",
                        "items-center",
                        "justify-between",
                        "gap-3",
                        "border-t",
                        "border-smooth-border",
                        "pt-4",
                    )}
                >
                    <Typography
                        as="span"
                        size="xs"
                        className={cn("font-mono", "text-journal-accent-text")}
                    >
                        {data.tag}
                    </Typography>

                    <Link
                        href={`/blog/${data.slug}`}
                        className={cn(
                            "inline-flex",
                            "shrink-0",
                            "items-center",
                            "gap-1",
                            "font-mono",
                            "text-xs",
                            "font-medium",
                            "text-neutral-600",
                            "underline",
                            "transition-[color,transform]",
                            "duration-100",
                            "group-hover:translate-x-1",
                            "motion-reduce:group-hover:translate-x-0",
                            "hover:text-journal-accent-text",
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
