import { InteractiveGrid } from "@/components/structured/interactive-grid";
import { Typography } from "@/components/ui/typography";
import { cn } from "@/utils";

type MainHeadProps = Readonly<{
    title: string;
    date: string;
    readingTime: string;
    tag: string;
    description: string;
}>;

export function MainHead({
    title,
    date,
    readingTime,
    tag,
    description,
}: MainHeadProps) {
    return (
        <section
            aria-labelledby="article-title"
            className={cn(
                "relative",
                "mb-12",
                "space-y-3",

                "overflow-hidden",
            )}
        >
            <InteractiveGrid />
            <div
                className={cn(
                    "relative",
                    "z-10",
                    "flex",
                    "items-center",
                    "font-mono",
                    "text-xs",
                    "leading-relaxed",
                    "text-zinc-600",
                    "dark:text-zinc-400",
                )}
            >
                <Typography as="p" size="xs">
                    {date} · {readingTime}
                </Typography>

                <Typography
                    as="span"
                    size="xs"
                    className={cn(
                        "ml-2",
                        "inline-block",
                        "rounded-full",
                        "border",
                        "border-gray-700",
                        "bg-gray-50",
                        "px-2",
                        "py-1",
                        "font-mono",
                        "text-gray-700",
                        "dark:border-neutral-500",
                        "dark:bg-neutral-100",
                        "dark:text-neutral-700",
                    )}
                >
                    {tag}
                </Typography>
            </div>
            <Typography
                id="article-title"
                as="h1"
                weight="bold"
                className={cn(
                    "relative",
                    "z-10",
                    "max-w-2xl",
                    "text-3xl",
                    "leading-[1.25]",
                    "tracking-tight",
                    "text-zinc-950",
                    "dark:text-zinc-50",
                    "md:text-4xl",
                )}
            >
                {title}
            </Typography>
            <Typography
                as="p"
                className={cn(
                    "relative",
                    "z-10",
                    "mt-5",
                    "max-w-2xl",
                    "text-base",
                    "leading-relaxed",
                    "text-zinc-600",
                    "dark:text-zinc-400",
                    "md:text-lg",
                )}
            >
                {description}
            </Typography>
        </section>
    );
}
