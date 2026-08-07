import { InteractiveGrid } from "@/components/structured/interactive-grid";
import { Shape3D } from "@/components/structured/shape-3d";
import { Typography } from "@/components/ui/typography";
import { cn } from "@/utils";

type ShowcaseHeaderProps = Readonly<{
    title: string;
    description: string;
    date: string;
    techstack: string[];
    readingTime?: string;

    slug: string;
}>;

export function ShowcaseHeader({
    title,
    description,
    date,
    techstack,
    readingTime,
    slug,
}: ShowcaseHeaderProps) {
    return (
        <section
            aria-labelledby="project-title"
            className={cn(
                "relative",
                "mb-12",
                "space-y-3",

                "overflow-hidden",
            )}
        >
            <InteractiveGrid className="lg:hidden" />

            <Shape3D
                seed={slug}
                className={cn(
                    "pointer-events-none",
                    "absolute",

                    "hidden",
                    "inset-y-0",
                    "right-0",
                    "z-0",
                    "mr-6",
                    "w-[min(34vw,440px)]",

                    "lg:block",
                    "lg:pointer-events-auto",
                )}
            />
            <div
                className={cn(
                    "relative",
                    "z-10",
                    "flex",
                    "flex-wrap",
                    "items-center",
                    "font-mono",
                    "text-xs",
                    "leading-relaxed",
                    "text-zinc-600",
                    "dark:text-zinc-400",
                )}
            >
                <Typography as="p" size="xs">
                    {date}
                    {readingTime && ` · ${readingTime}`}
                </Typography>
            </div>
            <Typography
                id="project-title"
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
                    "md:text-4xl",
                    "dark:text-zinc-50",
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
                    "md:text-lg",
                    "dark:text-zinc-400",
                )}
            >
                {description}
            </Typography>
            {techstack.length > 0 && (
                <Typography
                    as="p"
                    className={cn(
                        "relative",
                        "z-10",
                        "pt-2",
                        "font-mono",
                        "text-xs",
                        "leading-relaxed",
                        "text-zinc-600",
                        "dark:text-zinc-400",
                    )}
                >
                    {techstack.join(" · ")}
                </Typography>
            )}
        </section>
    );
}
