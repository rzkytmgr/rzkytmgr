import { HomeSection } from "@/components/structured/home-section";
import { Typography } from "@/components/ui/typography";
import { LaboratoryCardType } from "@/types/global";
import { cn } from "@/utils";
import Link from "next/link";

type LaboratoryHomeSectionProps = {
    value: {
        laboratory: LaboratoryCardType[];
    };
};

export function LaboratoryHomeSection({ value }: LaboratoryHomeSectionProps) {
    return (
        <HomeSection id="laboratory" title="Laboratory & Experiments">
            <div className="grid grid-cols-1 md:mt-10 md:grid-cols-2 gap-[1px] bg-[var(--smooth-border)]/70">
                {value.laboratory.map((data) => (
                    <article
                        key={data.id}
                        className="py-8 md:px-6 md:py-8 lg:px-10 bg-[var(--background)] space-y-4"
                    >
                        <div className="flex justify-between items-center min-h-7 mb-2">
                            <Typography
                                as="span"
                                size="xs"
                                className="font-mono text-neutral-500"
                            >
                                {data.id}
                            </Typography>
                            {data.is_archive && (
                                <Typography
                                    as="span"
                                    size="xs"
                                    className={cn(
                                        "inline-block ml-2 text-xs border px-2 py-1 rounded-full",
                                        "border-yellow-700 text-yellow-700 bg-orange-50 font-mono",
                                    )}
                                >
                                    archived
                                </Typography>
                            )}
                        </div>

                        <div className="space-y-1 font-sans">
                            <Typography
                                as="h3"
                                size="lg"
                                weight="semibold"
                                className="line-clamp-1"
                            >
                                <Link
                                    href={`/lab/${data.slug}`}
                                    className="transition-transform cursor-pointer hover:underline"
                                >
                                    {data.title}
                                </Link>
                            </Typography>
                            <Typography
                                as="p"
                                className="line-clamp-2 text-gray-500"
                            >
                                {data.description}
                            </Typography>
                        </div>

                        <dl className="font-mono text-xs space-y-2">
                            <div className="flex gap-2">
                                <dt className="w-16 text-neutral-500">stack</dt>
                                <dd className="text-neutral-400 line-clamp-1">
                                    {data.stack.join(" · ")}
                                </dd>
                            </div>
                            <div className="flex gap-2">
                                <dt className="w-16 text-neutral-500">
                                    logged
                                </dt>
                                <dd className="text-neutral-400">
                                    {data.date}
                                </dd>
                            </div>
                        </dl>
                    </article>
                ))}
            </div>
        </HomeSection>
    );
}
