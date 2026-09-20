import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { FadeUp } from "@/components/structured/fade-up";
import { HomeSection } from "@/components/structured/home-section";
import { Typography } from "@/components/ui/typography";
import type { ExplorationCardType } from "@/types/global";
import { cn } from "@/utils";

type ExplorationHomeSectionProps = Readonly<{
    value: {
        exploration: ExplorationCardType[];
        title: string;
    };
    animationDelay?: number;
}>;

export function ExplorationHomeSection({
    value,
    animationDelay,
}: ExplorationHomeSectionProps) {
    return (
        <HomeSection
            id="exploration"
            title={value.title}
            className="mb-8"
            animationDelay={animationDelay}
        >
            {value.exploration.map((data, index) => {
                const year = new Date(data.date).getFullYear();

                return (
                    <FadeUp
                        key={data.id}
                        delay={(animationDelay ?? 0) + 0.1 + 0.08 * index}
                    >
                        <article
                            className={cn(
                                "grid",
                                "grid-cols-1",
                                "gap-3",
                                "border-b",
                                "border-smooth-border",
                                "py-5",
                                "first:pt-8",
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
                                    className={cn(
                                        "font-mono",
                                        "text-neutral-500",
                                    )}
                                >
                                    <span className="lg:hidden">
                                        {year}
                                        {" · "}
                                    </span>

                                    <span className="text-journal-accent-text">
                                        {data.category}
                                    </span>
                                </Typography>

                                <Link
                                    href={data.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={cn(
                                        "inline-flex",
                                        "items-center",
                                        "gap-2",
                                        "transition-colors",
                                        "duration-100",
                                        "hover:text-journal-accent-text",
                                        "focus-visible:outline-2",
                                        "focus-visible:outline-offset-4",
                                        "focus-visible:outline-journal-accent",
                                    )}
                                >
                                    <Typography
                                        as="h3"
                                        weight="semibold"
                                        className={cn(
                                            "line-clamp-1",
                                            "md:text-lg",
                                        )}
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
                    </FadeUp>
                );
            })}
        </HomeSection>
    );
}
