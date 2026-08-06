import { ExternalLink } from "lucide-react";
import Link from "next/link";
import { Shape3D } from "@/components/structured/shape-3d";
import { Typography } from "@/components/ui/typography";
import type { ShowcaseCardType } from "@/types/global";
import { cn } from "@/utils";

type ShowcaseCardProps = Readonly<{
    data: ShowcaseCardType;
    hideOnMobile?: boolean;
}>;

export function ShowcaseCard({
    data,
    hideOnMobile = false,
}: ShowcaseCardProps) {
    const externalHref = data.link.repository ?? data.link.preview;

    return (
        <article
            className={cn(
                "rounded-md",
                "border",
                "border-smooth-border/70",
                "bg-background",
                "p-6",
                hideOnMobile && "block lg:hidden",
            )}
        >
            <div className={cn("flex", "flex-col", "gap-3")}>
                <div
                    className={cn(
                        "flex",
                        "min-h-7",
                        "items-center",
                        "justify-between",
                        "font-mono",
                        "text-xs",
                        "text-neutral-500",
                    )}
                >
                    <div className={cn("flex", "items-center")}>
                        <Typography as="span" size="xs">
                            {data.id}
                        </Typography>
                        {data.is_archive && (
                            <Typography
                                as="span"
                                size="xs"
                                className={cn(
                                    "ml-2",
                                    "inline-block",
                                    "rounded-full",
                                    "border",
                                    "border-yellow-700",
                                    "bg-orange-50",
                                    "px-2",
                                    "py-1",
                                    "font-mono",
                                    "text-yellow-700",
                                    "dark:border-yellow-500",
                                    "dark:bg-yellow-500/10",
                                    "dark:text-yellow-400",
                                )}
                            >
                                Unmaintained
                            </Typography>
                        )}
                    </div>

                    {externalHref ? (
                        <Link
                            href={externalHref}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`Open ${data.title} in a new tab`}
                            className={cn(
                                "transition-colors",
                                "hover:text-journal-accent",
                            )}
                        >
                            <ExternalLink
                                aria-hidden="true"
                                className={cn("size-4")}
                            />
                        </Link>
                    ) : (
                        <span
                            aria-hidden="true"
                            title="No external link available"
                            className={cn(
                                "text-neutral-300",
                                "dark:text-neutral-500",
                            )}
                        >
                            <ExternalLink
                                aria-hidden="true"
                                className={cn("size-4")}
                            />
                        </span>
                    )}
                </div>

                <div
                    className={cn(
                        "my-2",
                        "aspect-video",
                        "overflow-hidden",
                        "rounded-md",
                        "border",
                        "border-smooth-border/70",
                    )}
                >
                    <Shape3D seed={data.slug} label={data.title} />
                </div>

                <Typography
                    as="h3"
                    size="lg"
                    weight="semibold"
                    className={cn("mt-2")}
                >
                    <Link
                        href={`/showcase/${data.slug}`}
                        className={cn(
                            "inline-flex",
                            "items-center",
                            "transition-colors",
                            "hover:underline",
                            "line-clamp-1",
                        )}
                    >
                        {data.title}
                    </Link>
                </Typography>

                <Typography
                    as="p"
                    size="sm"
                    className={cn("max-w-3xl", "line-clamp-3", "text-gray-500")}
                >
                    {data.description}
                </Typography>

                <div
                    className={cn(
                        "mt-3",
                        "flex",
                        "items-center",
                        "justify-between",
                        "gap-3",
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
                                "rounded-full",
                                "border",
                                "border-smooth-border/70",
                                "bg-neutral-100/60",
                                "px-2",
                                "py-0.5",
                                "font-mono",
                                "text-xs",
                                "text-neutral-500",
                            )}
                        >
                            {data.techstack[0] ?? "General"}
                        </span>

                        {data.techstack.length > 1 && (
                            <span
                                className={cn(
                                    "rounded-full",
                                    "px-2",
                                    "py-0.5",
                                    "font-mono",
                                    "text-xs",
                                    "text-neutral-400",
                                )}
                            >
                                +{data.techstack.length - 1}
                            </span>
                        )}
                    </div>

                    <Link
                        href={`/showcase/${data.slug}`}
                        className={cn(
                            "group",
                            "inline-flex",
                            "shrink-0",
                            "items-center",
                            "gap-2",
                            "font-mono",
                            "text-xs",
                            "font-medium",
                            "text-zinc-500",
                            "underline",
                            "transition-colors",
                            "hover:text-zinc-700",
                            "dark:text-zinc-400",
                            "dark:hover:text-zinc-200",
                        )}
                    >
                        Read more
                    </Link>
                </div>
            </div>
        </article>
    );
}
