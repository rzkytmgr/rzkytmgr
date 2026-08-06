import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/structured/page-header";
import { Typography } from "@/components/ui/typography";
import { config } from "@/lib/config";
import { cn } from "@/utils";

export const metadata: Metadata = {
    title: config.ui.pages.about.heading,
    description: config.ui.pages.about.description,
};

export default function AboutPage() {
    const about = config.ui.pages.about;

    return (
        <main
            id="main-content"
            className={cn(
                "max-w-6xl",
                "w-full",
                "m-auto",
                "px-5",
                "sm:px-6",
                "py-20",
                "md:py-32",
            )}
        >
            <PageHeader title={about.heading} description={about.description} />

            <div className={cn("max-w-3xl", "space-y-6")}>
                <Typography
                    as="p"
                    className={cn(
                        "text-lg",
                        "leading-relaxed",
                        "text-zinc-700",
                        "dark:text-zinc-300",
                    )}
                >
                    Hi, I&apos;m {config.author.name} — a {config.author.title}.
                </Typography>

                {about.paragraphs.map((paragraph) => (
                    <Typography
                        key={paragraph}
                        as="p"
                        className={cn(
                            "leading-relaxed",
                            "text-zinc-700",
                            "dark:text-zinc-300",
                        )}
                    >
                        {paragraph}
                    </Typography>
                ))}

                <section className={cn("pt-8")}>
                    <Typography
                        as="h2"
                        className={cn(
                            "mb-4",
                            "font-mono",
                            "text-xs",
                            "uppercase",
                            "tracking-wider",
                            "text-neutral-500",
                        )}
                    >
                        Elsewhere
                    </Typography>

                    <div
                        className={cn(
                            "flex",
                            "flex-wrap",
                            "gap-x-8",
                            "gap-y-3",
                        )}
                    >
                        {config.author.social.map(({ name, href }) => (
                            <Link
                                key={name}
                                href={href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={cn(
                                    "border-b",
                                    "border-dashed",
                                    "border-zinc-700",
                                    "py-1",
                                    "text-sm",
                                    "font-medium",
                                    "text-zinc-700",
                                    "transition-colors",
                                    "hover:text-journal-accent",
                                    "dark:border-zinc-300",
                                    "dark:text-zinc-300",
                                )}
                            >
                                {name}
                            </Link>
                        ))}

                        <Link
                            href={`mailto:${config.author.email}`}
                            className={cn(
                                "border-b",
                                "border-dashed",
                                "border-zinc-700",
                                "py-1",
                                "text-sm",
                                "font-medium",
                                "text-zinc-700",
                                "transition-colors",
                                "hover:text-journal-accent",
                                "dark:border-zinc-300",
                                "dark:text-zinc-300",
                            )}
                        >
                            Email
                        </Link>
                    </div>
                </section>
            </div>
        </main>
    );
}
