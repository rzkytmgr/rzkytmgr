import type { Metadata } from "next";
import { PageHeader } from "@/components/structured/page-header";
import { ShowcaseComponents } from "@/domain/showcase/components";
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
                "py-20",
                "md:py-32",
            )}
        >
            <PageHeader
                title={config.ui.pages.showcase.heading}
                description={config.ui.pages.showcase.description}
            />

            <ShowcaseComponents.Grid items={items} />
        </main>
    );
}
