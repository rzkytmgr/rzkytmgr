import { Typography } from "@/components/ui/typography";
import { cn } from "@/utils";
import { MoveRight } from "lucide-react";
import Link from "next/link";

type HeroSectionProps = {
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
};

export async function HeroSection({ value }: HeroSectionProps) {
    return (
        <section id="hero-content" className="space-y-6">
            <Typography
                as="h1"
                weight="bold"
                aria-label="Hero section heading"
                className={cn(
                    "text-4xl md:text-5xl leading-[1.15] text-zinc-950",
                    "tracking-tight max-w-2xl",
                )}
            >
                {value.static.heading}
            </Typography>

            <Typography
                as="p"
                aria-label="Hero section subheading"
                className={cn(
                    "text-base mb-8 md:text-lg text-zinc-600",
                    "max-w-3xl leading-relaxed",
                )}
            >
                {value.static.subheading}
            </Typography>

            <div className="flex flex-wrap items-center gap-x-8 gap-y-3 mb-10">
                <Link
                    href="#writeups"
                    className={cn(
                        "group inline-flex items-center gap-2 py-1",
                        "text-sm text-zinc-700 font-medium ",
                        "border-b border-dashed border-zinc-700",
                    )}
                >
                    Start reading
                    <MoveRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
                </Link>

                <Link
                    href="#laboratory"
                    className={cn(
                        "group inline-flex items-center gap-2 py-1 transition-transform",
                        "text-sm text-zinc-500 font-medium hover:text-zinc-700",
                        "border-b border-dashed border-zinc-700",
                    )}
                >
                    Browse Experiment
                    <MoveRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
                </Link>
            </div>

            <Typography
                as="p"
                size="xs"
                className="font-mono text-neutral-500 leading-relaxed"
            >
                Written by {value.author.name}{" "}
                <span className="hidden md:inline-block">
                    · {value.author.title}
                </span>
            </Typography>
        </section>
    );
}
