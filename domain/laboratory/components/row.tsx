import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Typography } from "@/components/ui/typography";
import type { LaboratoryCardType } from "@/types/global";
import { cn, parsePublishDate } from "@/utils";

type LaboratoryRowProps = Readonly<{
    data: LaboratoryCardType;
    index: number;
}>;

export function LaboratoryRow({ data, index }: LaboratoryRowProps) {
    const published = parsePublishDate(data.date);

    return (
        <article
            className={cn(
                "group",
                "relative",
                "border-b",
                "border-smooth-border",
                "py-5",
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
                        "group-hover:opacity-50",
                        "motion-reduce:transition-none",
                        "bg-[radial-gradient(closest-side,color-mix(in_oklab,var(--journal-accent)_30%,transparent),transparent)]",
                        "blur-2xl",
                    )}
                />
            </div>

            <div
                className={cn(
                    "relative",
                    "z-10",
                    "flex",
                    "items-baseline",
                    "gap-4",
                    "md:grid",
                    "md:grid-cols-[2.5rem_7.5rem_minmax(0,1fr)_auto]",
                    "md:gap-x-6",
                )}
            >
                <span
                    aria-hidden="true"
                    className={cn(
                        "font-mono",
                        "text-xs",
                        "text-neutral-400",
                        "dark:text-neutral-600",
                    )}
                >
                    {String(index + 1).padStart(2, "0")}
                </span>

                <Typography
                    as="span"
                    size="xs"
                    className={cn(
                        "hidden",
                        "whitespace-nowrap",
                        "font-mono",
                        "text-neutral-500",
                        "md:block",
                    )}
                >
                    {published.full}
                </Typography>

                <div className={cn("min-w-0", "flex-1")}>
                    <Typography
                        as="h3"
                        weight="semibold"
                        className={cn("line-clamp-1", "md:text-lg")}
                    >
                        <Link
                            href={`/lab/${data.slug}`}
                            className={cn(
                                "after:absolute",
                                "after:inset-0",
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
                            "mt-1",
                            "line-clamp-1",
                            "text-neutral-500",
                        )}
                    >
                        {data.description}
                    </Typography>

                    {/* Meta mobile: tanggal, stack, waktu, status */}
                    <Typography
                        as="span"
                        size="xs"
                        className={cn(
                            "mt-2",
                            "flex",
                            "flex-wrap",
                            "items-center",
                            "gap-x-3",
                            "font-mono",
                            "text-neutral-500",
                            "md:hidden",
                        )}
                    >
                        <span>{published.full}</span>
                        {data.is_archive && (
                            <span
                                className={cn(
                                    "rounded-full",
                                    "border",
                                    "border-warning-border",
                                    "bg-warning-bg",
                                    "px-2.5",
                                    "py-0.5",
                                    "text-warning-text",
                                )}
                            >
                                archived
                            </span>
                        )}
                        <span className={cn("text-journal-accent-text")}>
                            {data.stack[0]}
                        </span>
                        <span>{data.readingTime}</span>
                    </Typography>
                </div>

                <div
                    className={cn(
                        "hidden",
                        "items-center",
                        "gap-4",
                        "font-mono",
                        "text-xs",
                        "md:flex",
                    )}
                >
                    {data.is_archive && (
                        <span
                            className={cn(
                                "shrink-0",
                                "rounded-full",
                                "border",
                                "border-warning-border",
                                "bg-warning-bg",
                                "px-2.5",
                                "py-0.5",
                                "text-warning-text",
                            )}
                        >
                            archived
                        </span>
                    )}

                    <span
                        className={cn(
                            "whitespace-nowrap",
                            "text-journal-accent-text",
                        )}
                    >
                        {data.stack[0]}
                    </span>

                    <span
                        className={cn("whitespace-nowrap", "text-neutral-500")}
                    >
                        {data.readingTime}
                    </span>

                    <ArrowUpRight
                        aria-hidden="true"
                        className={cn(
                            "size-4",
                            "shrink-0",
                            "text-neutral-400",
                            "transition-colors",
                            "duration-100",
                            "group-hover:text-journal-accent-text",
                        )}
                    />
                </div>
            </div>
        </article>
    );
}
