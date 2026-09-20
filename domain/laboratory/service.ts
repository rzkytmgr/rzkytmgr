import { scanCollection } from "@/lib/content/scanner";
import type { AdjacentType, LaboratoryCardType } from "@/types/global";
import { parseSlug } from "@/utils";
import { loadCollectionEntries } from "@/utils/server/content";
import { GrayMatterFile } from "gray-matter";

const filenames = scanCollection("laboratory");

export const getAllExperimentSlug = () => {
    return filenames.map((filename) => parseSlug(filename));
};

const byNewest = (
    a: [string, LaboratoryCardType],
    b: [string, LaboratoryCardType],
) => Date.parse(b[1].date) - Date.parse(a[1].date);

export const getAllExperiments = async () => {
    return new Map(
        (
            await loadCollectionEntries<LaboratoryCardType>(
                filenames,
                "laboratory",
            )
        ).sort(byNewest),
    );
};

export const getLatestExperiments = async (total = 4) => {
    const all = await getAllExperiments();
    return new Map([...all].slice(0, total));
};

export const getExperimentContentBySlug = async (slug: string) => {
    return new Map(
        await loadCollectionEntries(filenames, "laboratory", true),
    ).get(slug) as GrayMatterFile<string>;
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
