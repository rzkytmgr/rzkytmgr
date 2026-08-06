import type { Metadata } from "next";
import { HomeComponents } from "@/domain/home/components";
import { getLatestExplorations } from "@/domain/exploration/service";
import { getLatestExperiments } from "@/domain/laboratory/service";
import { getLatestShowcases } from "@/domain/showcase/service";
import { getLatestWriteups } from "@/domain/writeups/service";
import { config } from "@/lib/config";
import { cn } from "@/utils";

export const metadata: Metadata = {
    title: "Home",
    description: config.ui.home.hero.subheading,
};

export default async function AppPage() {
    const [showcases, laboratory, exploration, writeups] = await Promise.all([
        getLatestShowcases(),
        getLatestExperiments(),
        getLatestExplorations(),
        getLatestWriteups(),
    ]);

    const showcaseItems = Array.from(showcases.values());
    const laboratoryItems = Array.from(laboratory.values());
    const explorationItems = Array.from(exploration.values());
    const writeupItems = Array.from(writeups.values());

    return (
        <main
            id="main-content"
            className={cn(
                "mx-auto",
                "w-full",
                "max-w-6xl",
                "px-5",
                "py-20",
                "sm:px-6",
                "md:py-32",
            )}
        >
            <HomeComponents.Hero
                value={{
                    author: {
                        name: config.author.name,
                        title: config.author.title,
                    },
                    static: {
                        heading: config.ui.home.hero.heading,
                        subheading: config.ui.home.hero.subheading,
                    },
                }}
            />
            <HomeComponents.Writeups
                value={{
                    writeups: writeupItems,
                    title: config.ui.home.sections.writeups,
                }}
                animationDelay={0.1}
            />
            <HomeComponents.Showcases
                value={{
                    showcases: showcaseItems,
                    title: config.ui.home.sections.showcase,
                }}
                animationDelay={0.2}
            />
            <HomeComponents.Exploration
                value={{
                    exploration: explorationItems,
                    title: config.ui.home.sections.exploration,
                }}
                animationDelay={0.3}
            />
            <HomeComponents.Laboratory
                value={{
                    laboratory: laboratoryItems,
                    title: config.ui.home.sections.laboratory,
                }}
                animationDelay={0.4}
            />
        </main>
    );
}
