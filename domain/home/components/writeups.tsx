import { HomeSection } from "@/components/structured/home-section";
import { WriteupsListItem } from "@/domain/writeups/components/list-item";
import type { WriteupsCardType } from "@/types/global";
import { cn } from "@/utils";

type WriteupsHomeSectionProps = Readonly<{
    value: {
        writeups: WriteupsCardType[];
        title: string;
    };
    animationDelay?: number;
}>;

export function WriteupsHomeSection({
    value,
    animationDelay,
}: WriteupsHomeSectionProps) {
    return (
        <HomeSection
            id="writeups"
            title={value.title}
            seeAllHref="/writeups"
            className={cn("mb-8")}
            animationDelay={animationDelay}
        >
            <div>
                {value.writeups.map((data) => (
                    <WriteupsListItem key={data.id} data={data} />
                ))}
            </div>
        </HomeSection>
    );
}
