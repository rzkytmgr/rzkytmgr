import type { Metadata } from "next";
import { Typography } from "@/components/ui/typography";
import { ShowcaseIndex } from "@/domain/showcase/components/index-list";
import { getAllShowcases } from "@/domain/showcase/service";
import { config } from "@/lib/config";
import { cn } from "@/utils";

export const metadata: Metadata = {
    title: config.ui.pages.showcase.heading,
    description: config.ui.pages.showcase.description,
};

export default async function ShowcasePage() {
    const showcases = await getAllShowcases();
    const items = Array.from(showcases.values());

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
                {config.ui.pages.showcase.heading}
            </Typography>

            <ShowcaseIndex items={items} />
        </main>
    );
}
