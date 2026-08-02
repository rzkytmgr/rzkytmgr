"use client";

import { ExternalLink } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { HomeSection } from "@/components/structured/home-section";
import { Typography } from "@/components/ui/typography";
import { getPlaceholderImage } from "@/lib/placeholder";
import type { ShowcaseCardType } from "@/types/global";
import { cn } from "@/utils";

type ShowcaseHomeSectionProps = Readonly<{
    value: {
        showcases: ShowcaseCardType[];
    };
}>;

export function ShowcaseHomeSection({ value }: ShowcaseHomeSectionProps) {
    return (
        <HomeSection
            id="showcase"
            title="Showcases & Projects"
            className={cn("mb-8")}
        >
            <div
                className={cn(
                    "grid",
                    "grid-cols-1",
                    "gap-2",
                    "md:grid-cols-2",
                    "lg:grid-cols-3",
                )}
            >
                {value.showcases.map((data, index) => (
                    <article
                        key={data.id}
                        className={cn(
                            "rounded-md",
                            "border",
                            "border-smooth-border/70",
                            "bg-white",
                            "p-6",
                            index > 2 && "hidden lg:block",
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
                                    {" "}
                                    <Typography as="span" size="xs">
                                        {data.id}{" "}
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
                                            )}
                                        >
                                            Unmaintained
                                        </Typography>
                                    )}
                                </div>

                                <Link
                                    href={data.link}
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
                            </div>

                            <div
                                className={cn(
                                    "relative",
                                    "my-2",
                                    "aspect-video",
                                    "overflow-hidden",
                                    "rounded-md",
                                    "border",
                                    "border-smooth-border/70",
                                )}
                            >
                                <Image
                                    fill
                                    src={getPlaceholderImage(
                                        data.slug,
                                        "d1d1d1",
                                    )}
                                    alt={data.title}
                                    sizes="
                                    (max-width: 768px) 100vw,
                                    (max-width: 1024px) 50vw,
                                    33vw
                                "
                                    className={cn("object-cover")}
                                />
                            </div>

                            <Typography
                                as="h3"
                                size="lg"
                                weight="semibold"
                                className={cn("mt-2", "line-clamp-2")}
                            >
                                <Link
                                    href={`/showcase/${data.slug}`}
                                    className={cn(
                                        "inline-flex",
                                        "items-center",
                                        "transition-colors",
                                        "hover:underline",
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
                                    "text-gray-500",
                                )}
                            >
                                {data.description}
                            </Typography>

                            <div
                                className={cn(
                                    "mt-3",
                                    "flex",
                                    "justify-between",
                                )}
                            >
                                <Typography
                                    as="span"
                                    size="xs"
                                    className={cn(
                                        "font-mono",
                                        "text-neutral-500",
                                    )}
                                >
                                    {data.techstack[0] ?? "General"}
                                </Typography>

                                <Link
                                    href={`/showcase/${data.slug}`}
                                    className={cn(
                                        "group",
                                        "inline-flex",
                                        "items-center",
                                        "gap-2",
                                        "font-mono",
                                        "text-xs",
                                        "font-medium",
                                        "text-zinc-500",
                                        "underline",
                                        "transition-colors",
                                        "hover:text-zinc-700",
                                    )}
                                >
                                    Read more
                                </Link>
                            </div>
                        </div>
                    </article>
                ))}
            </div>
        </HomeSection>
    );
}
