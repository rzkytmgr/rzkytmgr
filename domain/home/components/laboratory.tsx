import Link from "next/link";
import { HomeSection } from "@/components/structured/home-section";
import { Typography } from "@/components/ui/typography";
import type { LaboratoryCardType } from "@/types/global";
import { cn } from "@/utils";

type LaboratoryHomeSectionProps = Readonly<{
    value: {
        laboratory: LaboratoryCardType[];
    };
}>;

export function LaboratoryHomeSection({ value }: LaboratoryHomeSectionProps) {
    return (
        <HomeSection id="laboratory" title="Laboratory & Experiments">
            <div
                className={cn(
                    "mt-10",
                    "grid",
                    "grid-cols-1",
                    "gap-px",
                    "bg-[var(--smooth-border)]/70",
                    "md:grid-cols-2",
                )}
            >
                {value.laboratory.map((data) => (
                    <article
                        key={data.id}
                        className={cn(
                            "flex",
                            "flex-col",
                            "gap-4",
                            "bg-[var(--background)]",
                            "py-8",
                            "md:px-6",
                            "lg:px-10",
                        )}
                    >
                        <div
                            className={cn(
                                "flex",
                                "min-h-7",
                                "items-center",
                                "justify-between",
                                "mb-2",
                            )}
                        >
                            <Typography
                                as="span"
                                size="xs"
                                className={cn("font-mono", "text-neutral-500")}
                            >
                                {data.id}{" "}
                            </Typography>

                            {data.is_archive && (
                                <Typography
                                    as="span"
                                    size="xs"
                                    className={cn(
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
                                    Archived
                                </Typography>
                            )}
                        </div>

                        <div
                            className={cn(
                                "flex",
                                "flex-col",
                                "gap-1",
                                "font-sans",
                            )}
                        >
                            <Typography
                                as="h3"
                                size="lg"
                                weight="semibold"
                                className={cn("line-clamp-1")}
                            >
                                <Link
                                    href={`/lab/${data.slug}`}
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
                                className={cn("line-clamp-2", "text-gray-500")}
                            >
                                {data.description}
                            </Typography>
                        </div>

                        <dl
                            className={cn(
                                "flex",
                                "flex-col",
                                "gap-2",
                                "font-mono",
                                "text-xs",
                            )}
                        >
                            <div className={cn("flex", "gap-2")}>
                                <dt
                                    className={cn(
                                        "w-16",
                                        "shrink-0",
                                        "text-neutral-500",
                                    )}
                                >
                                    Stack
                                </dt>

                                <dd
                                    className={cn(
                                        "line-clamp-1",
                                        "text-neutral-400",
                                    )}
                                >
                                    {data.stack.join(" · ") || "Not specified"}
                                </dd>
                            </div>

                            <div className={cn("flex", "gap-2")}>
                                <dt
                                    className={cn(
                                        "w-16",
                                        "shrink-0",
                                        "text-neutral-500",
                                    )}
                                >
                                    Logged
                                </dt>

                                <dd className={cn("text-neutral-400")}>
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
