import { FadeUp } from "@/components/structured/fade-up";
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
            linkHref="/blog"
            className={cn("mb-8")}
            animationDelay={animationDelay}
        >
            <div>
                {value.writeups.map((data, index) => (
                    <FadeUp
                        key={data.id}
                        delay={(animationDelay ?? 0) + 0.1 + 0.08 * index}
                    >
                        <WriteupsListItem data={data} />{" "}
                    </FadeUp>
                ))}
            </div>
        </HomeSection>
    );
}
