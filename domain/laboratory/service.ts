import { scanCollection } from "@/lib/content/scanner";
import type { AdjacentType, LaboratoryCardType } from "@/types/global";
import { parseSlug } from "@/utils";
import { loadCollectionEntries } from "@/utils/server/content";
import { GrayMatterFile } from "gray-matter";

const filenames = scanCollection("laboratory");

export const getAllExperimentSlug = () => {
    return filenames.map((filename) => parseSlug(filename));
};

export const getAllExperiments = async () => {
    return new Map(
        await loadCollectionEntries<LaboratoryCardType>(
            filenames,
            "laboratory",
        ),
    );
};

export const getLatestExperiments = async (total = 4) => {
    return new Map(
        await loadCollectionEntries<LaboratoryCardType>(
            filenames.slice(filenames.length - total),
            "laboratory",
        ),
    );
};

export const getAllExperimentContents = async () => {
    return new Map(await loadCollectionEntries(filenames, "laboratory", true));
};

export const getExperimentBySlug = async (slug: string) => {
    const experiments = await getAllExperiments();
    return experiments.get(slug);
};

export const getExperimentContentBySlug = async (slug: string) => {
    return (await getAllExperimentContents()).get(
        slug,
    ) as GrayMatterFile<string>;
};

export const getAdjacentExperiment = async (
    slug: string,
): Promise<AdjacentType> => {
    const slugs = getAllExperimentSlug();
    const index = slugs.indexOf(slug);
    const experiments = await getAllExperiments();

    const item = (target: string) => ({
        href: `/lab/${target}`,
        title: experiments.get(target)?.title ?? "",
    });

    return {
        previous: index > 0 ? item(slugs[index - 1]) : null,
        next:
            index >= 0 && index < slugs.length - 1
                ? item(slugs[index + 1])
                : null,
    };
};
