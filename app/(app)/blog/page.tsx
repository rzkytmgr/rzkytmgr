import type { Metadata } from "next";
import { Typography } from "@/components/ui/typography";
import { WriteupsComponent } from "@/domain/writeups/components";
import { getAllWriteups } from "@/domain/writeups/service";
import { config } from "@/lib/config";
import { cn } from "@/utils";

export const metadata: Metadata = {
    title: config.ui.pages.writeups.heading,
    description: config.ui.pages.writeups.description,
};

export default async function WriteupsPage() {
    const writeups = await getAllWriteups();
    const items = Array.from(writeups.values());

    return (
        <main
            id="main-content"
            className={cn(
                "max-w-6xl",
                "w-full",
                "m-auto",
                "px-5",
                "sm:px-6",
                "pt-0",
                "pb-16",
                "md:pb-24",
            )}
        >
            <Typography as="h1" className={cn("sr-only")}>
                {config.ui.pages.writeups.heading}
            </Typography>

            <WriteupsComponent.FilterGrid items={items} rssHref={config.rss} />
        </main>
    );
}
