import type { Metadata } from "next";
import { PageHeader } from "@/components/structured/page-header";
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
                "py-20",
                "md:py-32",
            )}
        >
            <PageHeader
                title={config.ui.pages.laboratory.heading}
                description={config.ui.pages.laboratory.description}
            />

            <LaboratoryComponents.Grid items={items} />
        </main>
    );
}
