import { scanCollection } from "@/lib/content/scanner";
import { ExplorationCardType } from "@/types/global";
import { parseSlug } from "@/utils";
import { loadCollectionEntries } from "@/utils/server/content";

const filenames = scanCollection("exploration");

export const getAllExplorationSlug = () => {
    return filenames.map((filename) => parseSlug(filename));
};

export const getAllExplorations = async () => {
    return new Map(
        await loadCollectionEntries<ExplorationCardType>(
            filenames,
            "exploration",
        ),
    );
};

export const getLatestExplorations = async (total = 4) => {
    return new Map(
        await loadCollectionEntries<ExplorationCardType>(
            filenames.slice(filenames.length - total),
            "exploration",
        ),
    );
};

export const getExplorationBySlug = async (slug: string) => {
    const explorations = await getAllExplorations();
    return explorations.get(slug);
};
