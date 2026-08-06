import type { Metadata } from "next";
import { PageHeader } from "@/components/structured/page-header";
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
                "py-20",
                "md:py-32",
            )}
        >
            <PageHeader
                title={config.ui.pages.writeups.heading}
                description={config.ui.pages.writeups.description}
            />

            <div className={cn("mt-14")}>
                <WriteupsComponent.FilterGrid items={items} />
            </div>
        </main>
    );
}
