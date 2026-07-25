import { HomeSection } from "@/components/structured/home-section";
import { Typography } from "@/components/ui/typography";
import { ReadingCardType } from "@/types/global";
import { cn } from "@/utils";
import { ExternalLink } from "lucide-react";
import Link from "next/link";

type ReadingHomeSectionProps = {
    value: {
        reading: ReadingCardType[];
    };
};

export const ReadingHomeSection = ({ value }: ReadingHomeSectionProps) => {
    return (
        <HomeSection id="reading" title="Worth to Explore" className="mb-8">
            <div className="flex flex-col">
                {value.reading.map((data) => (
                    <article
                        key={data.id}
                        className={cn(
                            "grid grid-cols-1 md:grid-cols-12 gap-3",
                            "md:gap-2 py-5 border-b border-smooth-border/70",
                        )}
                    >
                        <Typography
                            as="span"
                            size="xs"
                            className="hidden lg:flex font-mono text-neutral-500 col-span-1"
                        >
                            {data.date}
                        </Typography>
                        <div className="flex flex-col col-span-11">
                            <Typography
                                as="span"
                                size="xs"
                                className="font-mono text-neutral-500 mb-1"
                            >
                                <span className="lg:hidden">
                                    {data.date} ·{" "}
                                </span>
                                {data.category}
                            </Typography>
                            <Link
                                target="_blank"
                                href={data.link}
                                className="flex items-center hover:underline"
                            >
                                <Typography
                                    as="h3"
                                    size="default"
                                    weight="semibold"
                                    className="line-clamp-1 md:text-lg"
                                >
                                    {data.title}
                                </Typography>
                                <ExternalLink className="min-w-4 w-4 min-h-4 h-4 ml-2" />
                            </Link>
                        </div>
                    </article>
                ))}
            </div>
        </HomeSection>
    );
};
