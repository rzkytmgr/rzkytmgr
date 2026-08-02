import { scanCollection } from "@/lib/content/scanner";
import { LaboratoryCardType } from "@/types/global";
import { parseSlug } from "@/utils";
import { loadCollectionEntries } from "@/utils/server/content";

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

export const getExperimentBySlug = async (slug: string) => {
    const experiments = await getAllExperiments();
    return experiments.get(slug);
};
