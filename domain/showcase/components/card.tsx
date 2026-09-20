import { BlurUpImage } from "@/components/structured/blur-up-image";
import Link from "next/link";
import { Shape3D } from "@/components/structured/shape-3d";
import { Typography } from "@/components/ui/typography";
import type { ShowcaseCardType } from "@/types/global";
import { IMAGE_BLUR_DATA_URL } from "@/utils/blur";
import { cn, parsePublishDate } from "@/utils";

type ShowcaseCardProps = Readonly<{
    data: ShowcaseCardType;

    showShape?: boolean;
    showThumbnail?: boolean;
    featured?: boolean;
}>;

export function ShowcaseCard({
    data,
    showShape = true,
    showThumbnail = false,
    featured = false,
}: ShowcaseCardProps) {
    const published = parsePublishDate(data.date);

    return (
        <article
            className={cn(
                "group",
                "relative",
                "overflow-visible",
                "rounded-md",
                data.is_archive ? "border-[1.5px]" : "border",
                data.is_archive ? "border-warning/60" : "border-smooth-border",
                "bg-surface",
                "p-6",
                "transition-colors",
                "duration-100",
                !data.is_archive && "hover:border-journal-accent/60",
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
                        {data.readingTime}
                    </Typography>
                </div>

                {showThumbnail && (
                    <div
                        className={cn(
                            "overflow-hidden",
                            "rounded-md",
                            "border",
                            "border-smooth-border",
                        )}
                    >
                        <BlurUpImage
                            src={data.thumbnail}
                            alt=""
                            width={1200}
                            height={675}
                            placeholder="blur"
                            blurDataURL={IMAGE_BLUR_DATA_URL}
                            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            className={cn(
                                "aspect-video",
                                "h-auto",
                                "w-full",
                                "object-cover",
                            )}
                        />
                    </div>
                )}

                {showShape && (
                    <div
                        className={cn(
                            "aspect-video",
                            "overflow-hidden",
                            "rounded-md",
                            "border",
                            "border-smooth-border",
                        )}
                    >
                        <Shape3D seed={data.slug} label={data.title} />
                    </div>
                )}

                <div className={cn("mb-2", "flex", "flex-col", "gap-1.5")}>
                    <Typography
                        as="h3"
                        size={featured ? "xl" : "lg"}
                        weight="semibold"
                        className={cn(
                            featured ? "line-clamp-2" : "line-clamp-1",
                        )}
                    >
                        <Link
                            href={`/showcase/${data.slug}`}
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
                    <div
                        className={cn(
                            "flex",
                            "flex-wrap",
                            "items-center",
                            "gap-1.5",
                        )}
                    >
                        <span
                            className={cn(
                                "font-mono",
                                "text-xs",
                                "text-journal-accent-text",
                            )}
                        >
                            {data.techstack[0] ?? "General"}
                        </span>

                        {data.techstack.length > 1 && (
                            <span
                                className={cn(
                                    "font-mono",
                                    "text-xs",
                                    "text-neutral-500",
                                )}
                            >
                                +{data.techstack.length - 1}
                            </span>
                        )}
                    </div>

                    <Link
                        href={`/showcase/${data.slug}`}
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

            {data.is_archive && (
                <span
                    className={cn(
                        "absolute",
                        "-top-3",
                        "right-4",
                        "rounded-full",
                        "border",
                        "border-warning-border",
                        "bg-warning-bg",
                        "px-2.5",
                        "py-0.5",
                        "font-mono",
                        "text-xs",
                        "text-warning-text",
                    )}
                >
                    unmaintained
                </span>
            )}
        </article>
    );
}
