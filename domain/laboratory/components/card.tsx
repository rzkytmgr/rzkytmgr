import { FlaskConical } from "lucide-react";
import Link from "next/link";
import { Typography } from "@/components/ui/typography";
import type { LaboratoryCardType } from "@/types/global";
import { cn } from "@/utils";

type LaboratoryCardProps = Readonly<{
    data: LaboratoryCardType;
}>;

const MAX_STACK_PILLS = 1;

export function LaboratoryCard({ data }: LaboratoryCardProps) {
    const stackPills = data.stack.slice(0, MAX_STACK_PILLS);
    const hiddenStackCount = data.stack.length - stackPills.length;

    return (
        <article
            className={cn(
                "rounded-md",
                "border",
                "border-smooth-border/70",
                "bg-background",
                "p-6",
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
                    <div
                        className={cn(
                            "flex",
                            "min-w-0",
                            "items-center",
                            "gap-2",
                        )}
                    >
                        <Typography as="span" size="xs">
                            {data.id}
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
                                    "dark:border-yellow-500",
                                    "dark:bg-yellow-500/10",
                                    "dark:text-yellow-400",
                                )}
                            >
                                Archived
                            </Typography>
                        )}
                    </div>

                    <div
                        className={cn(
                            "flex",
                            "shrink-0",
                            "items-center",
                            "gap-3",
                        )}
                    >
                        <Typography
                            as="span"
                            size="xs"
                            className={cn("font-mono", "text-neutral-500")}
                        >
                            {data.date}
                        </Typography>

                        <FlaskConical
                            aria-hidden="true"
                            className={cn(
                                "size-4",
                                "shrink-0",
                                "text-neutral-400",
                                "dark:text-neutral-500",
                            )}
                        />
                    </div>
                </div>

                <Typography
                    as="h3"
                    size="lg"
                    weight="semibold"
                    className={cn("mt-1")}
                >
                    <Link
                        href={`/lab/${data.slug}`}
                        className={cn(
                            "inline-flex",
                            "items-center",
                            "underline-offset-4",
                            "decoration-current",
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
                    {stackPills.length > 0 && (
                        <div
                            className={cn(
                                "flex",
                                "flex-wrap",
                                "items-center",
                                "gap-1.5",
                            )}
                        >
                            {stackPills.map((item) => (
                                <span
                                    key={item}
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
                                    {item}
                                </span>
                            ))}

                            {hiddenStackCount > 0 && (
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
                                    +{hiddenStackCount}
                                </span>
                            )}
                        </div>
                    )}

                    <Link
                        href={`/lab/${data.slug}`}
                        className={cn(
                            "ml-auto",
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
                            "hover:text-journal-accent",
                            "dark:text-zinc-400",
                            "dark:hover:text-journal-accent",
                        )}
                    >
                        Read more
                    </Link>
                </div>
            </div>
        </article>
    );
}
