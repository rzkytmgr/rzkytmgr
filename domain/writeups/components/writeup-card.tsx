import Link from "next/link";
import { Typography } from "@/components/ui/typography";
import type { WriteupsCardType } from "@/types/global";
import { cn } from "@/utils";

type WriteupCardProps = Readonly<{
    data: WriteupsCardType;
}>;

export function WriteupCard({ data }: WriteupCardProps) {
    return (
        <article
            className={cn(
                "flex",
                "flex-col",
                "gap-3",
                "rounded-md",
                "border",
                "border-smooth-border/70",
                "bg-background",
                "p-6",
            )}
        >
            <div
                className={cn(
                    "flex",
                    "items-center",
                    "justify-between",
                    "font-mono",
                    "text-xs",
                    "text-neutral-500",
                )}
            >
                <Typography as="span" size="xs">
                    [{data.id}]
                </Typography>

                <Typography
                    as="span"
                    size="xs"
                    className={cn("line-clamp-1", "text-right")}
                >
                    {data.tag}
                </Typography>
            </div>

            <Typography
                as="h3"
                size="lg"
                weight="semibold"
                className={cn("line-clamp-2")}
            >
                <Link
                    href={`/blog/${data.slug}`}
                    className={cn("transition-colors", "hover:underline")}
                >
                    {data.title}
                </Link>
            </Typography>

            <Typography
                as="p"
                size="sm"
                className={cn("line-clamp-3", "text-gray-500")}
            >
                {data.description}
            </Typography>

            <div
                className={cn(
                    "mt-auto",
                    "flex",
                    "items-center",
                    "justify-between",
                    "pt-3",
                )}
            >
                <Typography
                    as="span"
                    size="xs"
                    className={cn("font-mono", "text-neutral-500")}
                >
                    {data.date}
                </Typography>

                <Typography
                    as="span"
                    size="xs"
                    className={cn("font-mono", "text-neutral-500")}
                >
                    {data.readingTime}
                </Typography>
            </div>
        </article>
    );
}
