import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { HomeSection } from "@/components/structured/home-section";
import { Typography } from "@/components/ui/typography";
import type { ExplorationCardType } from "@/types/global";
import { cn } from "@/utils";

type ExplorationHomeSectionProps = Readonly<{
    value: {
        exploration: ExplorationCardType[];
    };
}>;

export function ExplorationHomeSection({ value }: ExplorationHomeSectionProps) {
    return (
        <HomeSection id="exploration" title="Worth to Explore" className="mb-8">
            {value.exploration.map((data) => {
                const year = data.date.slice(0, -6);

                return (
                    <article
                        key={data.id}
                        className={cn(
                            "grid",
                            "grid-cols-1",
                            "gap-3",
                            "border-b",
                            "border-smooth-border/70",
                            "py-5",
                            "md:grid-cols-12",
                            "md:gap-2",
                        )}
                    >
                        <Typography
                            as="span"
                            size="xs"
                            className={cn(
                                "col-span-1",
                                "hidden",
                                "font-mono",
                                "text-neutral-500",
                                "lg:flex",
                            )}
                        >
                            {year}
                        </Typography>

                        <div
                            className={cn(
                                "col-span-11",
                                "flex",
                                "flex-col",
                                "gap-1",
                            )}
                        >
                            <Typography
                                as="span"
                                size="xs"
                                className={cn("font-mono", "text-neutral-500")}
                            >
                                <span className="lg:hidden">
                                    {year}
                                    {" · "}
                                </span>

                                {data.category}
                            </Typography>

                            <Link
                                href={data.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={cn(
                                    "inline-flex",
                                    "items-center",
                                    "gap-2",
                                    "hover:underline",
                                )}
                            >
                                <Typography
                                    as="h3"
                                    weight="semibold"
                                    className={cn("line-clamp-1", "md:text-lg")}
                                >
                                    {data.title}
                                </Typography>

                                <ExternalLink
                                    aria-hidden="true"
                                    className="size-4 shrink-0"
                                />
                            </Link>
                        </div>
                    </article>
                );
            })}
        </HomeSection>
    );
}
