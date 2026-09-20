import { ArticleActions } from "@/components/structured/article-actions";
import { BlurUpImage } from "@/components/structured/blur-up-image";
import { IMAGE_BLUR_DATA_URL } from "@/utils/blur";
import { Typography } from "@/components/ui/typography";
import { cn } from "@/utils";

type ShowcaseHeaderProps = Readonly<{
    title: string;
    description: string;
    date: string;
    techstack: string[];
    readingTime?: string;

    slug: string;

    thumbnail: string;
}>;

export function ShowcaseHeader({
    title,
    description,
    date,
    techstack,
    readingTime,
    thumbnail,
}: ShowcaseHeaderProps) {
    return (
        <section aria-labelledby="project-title" className={cn("relative")}>
            {techstack.length > 0 && (
                <Typography
                    as="p"
                    size="xs"
                    className={cn(
                        "font-mono",
                        "capitalize",
                        "tracking-wider",
                        "text-journal-accent-text",
                    )}
                >
                    {techstack.join(" · ")}
                </Typography>
            )}

            <Typography
                id="project-title"
                as="h1"
                weight="bold"
                className={cn(
                    "mt-3",
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
                size="xs"
                className={cn(
                    "mt-4",
                    "font-mono",
                    "leading-relaxed",
                    "text-zinc-600",
                    "dark:text-zinc-400",
                )}
            >
                {readingTime}
                {date && ` · ${date}`}
            </Typography>

            <ArticleActions className={cn("mt-6")} />

            <div
                className={cn(
                    "relative",
                    "mt-8",
                    "aspect-video",
                    "w-full",
                    "overflow-hidden",
                    "rounded-md",
                )}
            >
                <BlurUpImage
                    src={thumbnail}
                    alt=""
                    fill
                    priority
                    placeholder="blur"
                    blurDataURL={IMAGE_BLUR_DATA_URL}
                    sizes="(min-width: 1280px) 680px, 100vw"
                    className={cn("object-cover")}
                />
            </div>

            <Typography
                as="p"
                className={cn(
                    "mt-6",
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
