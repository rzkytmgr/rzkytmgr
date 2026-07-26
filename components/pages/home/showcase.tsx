import { HomeSection } from "@/components/structured/home-section";
import { Typography } from "@/components/ui/typography";
import { ShowcaseCardType } from "@/types/global";
import { cn } from "@/utils";
import { ExternalLink } from "lucide-react";
import Link from "next/link";

type ShowcaseHomeSectionProps = {
    value: {
        showcases: ShowcaseCardType[];
    };
};

export const ShowcaseHomeSection = ({ value }: ShowcaseHomeSectionProps) => {
    return (
        <HomeSection
            id="showcase"
            title="Showcases & Projects"
            className="mb-8"
        >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                {value.showcases.map((data, index) => (
                    <article
                        key={index}
                        className={cn(
                            "p-6 border border-smooth-border/70 bg-white rounded-md",
                            index > 2 ? "block lg:hidden" : "",
                        )}
                    >
                        <div className="flex flex-col space-y-1 col-span-11">
                            <div
                                className={cn(
                                    "flex justify-between items-center",
                                    "text-xs font-mono text-neutral-500 min-h-7",
                                )}
                            >
                                <Typography
                                    as="span"
                                    size="xs"
                                    className="flex items-center"
                                >
                                    {data.id}
                                    {data.is_archive && (
                                        <Typography
                                            as="span"
                                            size="xs"
                                            className={cn(
                                                "inline-block ml-2 border px-2 py-1 rounded-full",
                                                "border-yellow-700 text-yellow-700 bg-orange-50 font-mono",
                                            )}
                                        >
                                            unmaintained
                                        </Typography>
                                    )}
                                </Typography>
                                <div className="flex items-center gap-3">
                                    <Link target="_blank" href={data.link}>
                                        <ExternalLink className="w-4 h-4" />
                                    </Link>
                                </div>
                            </div>
                            <Typography
                                as="h3"
                                size="lg"
                                weight="semibold"
                                className="line-clamp-2 mt-2"
                            >
                                <Link
                                    href={`/showcase/${data.slug}`}
                                    className={cn(
                                        "transition-transform cursor-pointer",
                                        "flex-inline items-center hover:underline line-clamp-1",
                                    )}
                                >
                                    <Typography
                                        as="span"
                                        size="lg"
                                        weight="semibold"
                                    >
                                        {data.title}
                                    </Typography>
                                </Link>
                            </Typography>
                            <div>
                                <Typography
                                    as="p"
                                    size="sm"
                                    className="text-gray-500 line-clamp-3 max-w-3xl"
                                >
                                    {data.description}
                                </Typography>
                            </div>
                            <div className="flex justify-between mt-3">
                                <Typography
                                    as="span"
                                    size="xs"
                                    className="font-mono text-neutral-500"
                                >
                                    {data.techstack[0]}
                                </Typography>
                                <Link
                                    href={`/showcase/${data.slug}`}
                                    className={cn(
                                        "group font-mono text-xs inline-flex items-center gap-2",
                                        "font-medium text-zinc-500 transition-transform hover:text-zinc-700 underline",
                                    )}
                                >
                                    read more
                                </Link>
                            </div>
                        </div>
                    </article>
                ))}
            </div>
        </HomeSection>
    );
};
