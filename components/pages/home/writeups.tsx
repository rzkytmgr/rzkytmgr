import { HomeSection } from "@/components/structured/home-section";
import { Typography } from "@/components/ui/typography";
import { WriteupsCardType } from "@/types/global";
import { cn } from "@/utils";
import Link from "next/link";

type WriteupsHomeSectionProps = {
    value: {
        writeups: WriteupsCardType[];
    };
};

export const WriteupsHomeSection = ({ value }: WriteupsHomeSectionProps) => {
    return (
        <HomeSection id="writeups" title="Latest Writeups">
            <div>
                {value.writeups.map((data) => (
                    <article
                        key={data.id}
                        className={cn(
                            "grid grid-cols-1 md:grid-cols-12 gap-3",
                            "py-5 border-b border-smooth-border/70",
                        )}
                    >
                        <div className="col-span-1 hidden lg:flex">
                            <Typography
                                as="span"
                                size="xs"
                                className="font-mono text-neutral-500"
                            >
                                [{data.id}]
                            </Typography>
                        </div>
                        <div className="flex flex-col space-y-2 md:space-y-3 col-span-11">
                            <div
                                className={cn(
                                    "flex items-center",
                                    "text-xs font-mono text-neutral-500",
                                )}
                            >
                                <Typography
                                    size="xs"
                                    as="span"
                                    className="mr-2 shrink-0 lg:hidden"
                                >
                                    [{data.id}]
                                </Typography>
                                <Typography
                                    size="xs"
                                    as="span"
                                    className="line-clamp-1"
                                >
                                    {data.tags.join(" · ")}
                                </Typography>
                            </div>
                            <Typography
                                as="h3"
                                size="xl"
                                weight="semibold"
                                className="md:text-2xl line-clamp-2"
                            >
                                <Link
                                    href={`/blog/${data.slug}`}
                                    className="transition-transform cursor-pointer hover:underline"
                                >
                                    {data.title}
                                </Link>
                            </Typography>
                            <div>
                                <Typography
                                    as="p"
                                    className="text-gray-500 line-clamp-2 max-w-3xl"
                                >
                                    {data.description}
                                </Typography>
                            </div>
                            <div className="flex justify-between mt-2">
                                <Typography
                                    as="span"
                                    size="xs"
                                    className="font-mono text-neutral-500"
                                >
                                    {data.date} · {data.readingTime}
                                </Typography>
                                <Link
                                    href={`/blog/${data.slug}`}
                                    className={cn(
                                        "group font-mono text-xs inline-flex items-center underline",
                                        "gap-2 font-medium text-zinc-500 transition-transform hover:text-zinc-700",
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
