import type { Metadata } from "next";
import { Typography } from "@/components/ui/typography";
import { LaboratoryComponents } from "@/domain/laboratory/components";
import { getAllExperiments } from "@/domain/laboratory/service";
import { config } from "@/lib/config";
import { cn } from "@/utils";

export const metadata: Metadata = {
    title: config.ui.pages.laboratory.heading,
    description: config.ui.pages.laboratory.description,
};

export default async function LaboratoryPage() {
    const experiments = await getAllExperiments();
    const items = Array.from(experiments.values());

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
                {config.ui.pages.laboratory.heading}
            </Typography>

            <LaboratoryComponents.Grid items={items} />
        </main>
    );
}
