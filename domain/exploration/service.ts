import { scanCollection } from "@/lib/content/scanner";
import { ExplorationCardType } from "@/types/global";
import { loadCollectionEntries } from "@/utils/server/content";

const filenames = scanCollection("exploration");

export const getLatestExplorations = async (total = 4) => {
    return new Map(
        await loadCollectionEntries<ExplorationCardType>(
            filenames.slice(filenames.length - total),
            "exploration",
        ),
    );
};
