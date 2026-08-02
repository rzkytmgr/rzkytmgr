import { MoveRight } from "lucide-react";
import Link from "next/link";
import { HeroTypeMark } from "@/components/structured/hero-type-mark";
import { Typography } from "@/components/ui/typography";
import { cn } from "@/utils";

type HeroSectionProps = Readonly<{
    value: {
        author: {
            name: string;
            title: string;
        };
        static: {
            heading: string;
            subheading: string;
        };
    };
}>;

export function HeroSection({ value }: HeroSectionProps) {
    return (
        <section
            id="hero-content"
            aria-labelledby="hero-heading"
            className={cn("relative")}
        >
            <HeroTypeMark />
            <div className={cn("relative", "z-10", "space-y-6")}>
                <Typography
                    id="hero-heading"
                    as="h1"
                    weight="bold"
                    className={cn(
                        "max-w-2xl",
                        "text-4xl",
                        "leading-[1.15]",
                        "tracking-tight",
                        "text-zinc-950",
                        "md:text-5xl",
                    )}
                >
                    {value.static.heading}
                </Typography>

                <Typography
                    as="p"
                    className={cn(
                        "max-w-3xl",
                        "text-base",
                        "leading-relaxed",
                        "text-zinc-600",
                        "md:text-lg",
                    )}
                >
                    {value.static.subheading}
                </Typography>

                <div
                    className={cn(
                        "flex",
                        "flex-wrap",
                        "items-center",
                        "gap-x-8",
                        "gap-y-3",
                        "pt-2",
                    )}
                >
                    <Link
                        href="#writeups"
                        className={cn(
                            "group",
                            "inline-flex",
                            "items-center",
                            "gap-2",
                            "border-b",
                            "border-dashed",
                            "border-zinc-700",
                            "py-1",
                            "text-sm",
                            "font-medium",
                            "text-zinc-700",
                        )}
                    >
                        Start reading
                        <MoveRight
                            aria-hidden="true"
                            className={cn(
                                "size-3",
                                "transition-transform",
                                "group-hover:translate-x-1",
                            )}
                        />
                    </Link>

                    <Link
                        href="#laboratory"
                        className={cn(
                            "group",
                            "inline-flex",
                            "items-center",
                            "gap-2",
                            "border-b",
                            "border-dashed",
                            "border-zinc-700",
                            "py-1",
                            "text-sm",
                            "font-medium",
                            "text-zinc-500",
                            "transition-colors",
                            "hover:text-zinc-700",
                        )}
                    >
                        Browse experiments
                        <MoveRight
                            aria-hidden="true"
                            className={cn(
                                "size-3",
                                "transition-transform",
                                "group-hover:translate-x-1",
                            )}
                        />
                    </Link>
                </div>

                <Typography
                    as="p"
                    size="xs"
                    className={cn(
                        "font-mono",
                        "leading-relaxed",
                        "text-neutral-500",
                    )}
                >
                    Written by {value.author.name}
                    <span className={cn("hidden", "md:inline")}>
                        {" · "}
                        {value.author.title}
                    </span>
                </Typography>
            </div>
        </section>
    );
}
