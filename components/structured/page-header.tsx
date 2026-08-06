import { FadeUp } from "./fade-up";
import { Typography } from "../ui/typography";
import { cn } from "@/utils";

type PageHeaderProps = Readonly<{
    title: string;
    description?: string;
    className?: string;
}>;

export function PageHeader({ title, description, className }: PageHeaderProps) {
    return (
        <FadeUp>
            <header className={cn("mb-16", "space-y-4", className)}>
                <Typography
                    as="h1"
                    weight="bold"
                    className={cn(
                        "text-3xl",
                        "tracking-tight",
                        "text-zinc-950",
                        "md:text-4xl",
                        "dark:text-zinc-50",
                    )}
                >
                    {title}
                </Typography>

                {description && (
                    <Typography
                        as="p"
                        className={cn(
                            "max-w-3xl",
                            "text-base",
                            "leading-relaxed",
                            "text-zinc-600",
                            "md:text-lg",
                            "dark:text-zinc-400",
                        )}
                    >
                        {description}
                    </Typography>
                )}
            </header>
        </FadeUp>
    );
}
