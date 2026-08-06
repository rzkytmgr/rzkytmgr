import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/structured/page-header";
import { Typography } from "@/components/ui/typography";
import { config } from "@/lib/config";
import { cn } from "@/utils";

export const metadata: Metadata = {
    title: config.ui.pages.contact.heading,
    description: config.ui.pages.contact.description,
};

export default function ContactPage() {
    const contact = config.ui.pages.contact;

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
            <PageHeader
                title={contact.heading}
                description={contact.description}
            />

            <div className={cn("max-w-3xl", "space-y-12")}>
                <section className={cn("space-y-4")}>
                    <Typography
                        as="h2"
                        className={cn(
                            "font-mono",
                            "text-xs",
                            "uppercase",
                            "tracking-wider",
                            "text-neutral-500",
                        )}
                    >
                        Email
                    </Typography>

                    <Link
                        href={`mailto:${config.author.email}`}
                        className={cn(
                            "text-lg",
                            "font-medium",
                            "text-zinc-900",
                            "underline",
                            "underline-offset-4",
                            "decoration-zinc-400",
                            "transition-colors",
                            "hover:text-journal-accent",
                            "hover:decoration-journal-accent",
                            "dark:text-zinc-200",
                        )}
                    >
                        {config.author.email}
                    </Link>
                </section>

                <section className={cn("space-y-4")}>
                    <Typography
                        as="h2"
                        className={cn(
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
                    </div>
                </section>
            </div>
        </main>
    );
}
