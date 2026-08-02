import Link from "next/link";
import { HomeSection } from "@/components/structured/home-section";
import { Typography } from "@/components/ui/typography";
import type { WriteupsCardType } from "@/types/global";
import { cn } from "@/utils";

type WriteupsHomeSectionProps = Readonly<{
    value: {
        writeups: WriteupsCardType[];
    };
}>;

export function WriteupsHomeSection({ value }: WriteupsHomeSectionProps) {
    return (
        <HomeSection id="writeups" title="Latest Writeups">
            <div>
                {value.writeups.map((data) => (
                    <article
                        key={data.id}
                        className={cn(
                            "grid",
                            "grid-cols-1",
                            "gap-3",
                            "border-b",
                            "border-smooth-border/70",
                            "py-8",
                            "md:grid-cols-12",
                        )}
                    >
                        <div className={cn("col-span-1", "hidden", "lg:flex")}>
                            <Typography
                                as="span"
                                size="xs"
                                className={cn("font-mono", "text-neutral-500")}
                            >
                                [{data.id}]
                            </Typography>
                        </div>

                        <div
                            className={cn(
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
                                    className={cn(
                                        "mr-2",
                                        "shrink-0",
                                        "lg:hidden",
                                    )}
                                >
                                    [{data.id}]
                                </Typography>

                                <Typography
                                    as="span"
                                    size="xs"
                                    className={cn("line-clamp-1")}
                                >
                                    {data.tag}
                                </Typography>
                            </div>

                            <Typography
                                as="h3"
                                size="xl"
                                weight="semibold"
                                className={cn("line-clamp-2", "md:text-2xl")}
                            >
                                <Link
                                    href={`/blog/${data.slug}`}
                                    className={cn(
                                        "transition-colors",
                                        "hover:underline",
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
                                    "text-gray-500",
                                )}
                            >
                                {data.description}
                            </Typography>

                            <div
                                className={cn(
                                    "mt-2",
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
                                    {data.date}
                                    {" · "}
                                    {data.readingTime}
                                </Typography>

                                <Link
                                    href={`/blog/${data.slug}`}
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
