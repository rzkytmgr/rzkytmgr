import { FadeUp } from "@/components/structured/fade-up";
import { HomeSection } from "@/components/structured/home-section";
import { LaboratoryCard } from "@/domain/laboratory/components/card";
import type { LaboratoryCardType } from "@/types/global";
import { cn } from "@/utils";

type LaboratoryHomeSectionProps = Readonly<{
    value: {
        laboratory: LaboratoryCardType[];
        title: string;
    };
    animationDelay?: number;
}>;

export function LaboratoryHomeSection({
    value,
    animationDelay,
}: LaboratoryHomeSectionProps) {
    return (
        <HomeSection
            id="laboratory"
            title={value.title}
            linkHref="/lab"
            linkLabel="view archived"
            animationDelay={animationDelay}
        >
            <div
                className={cn(
                    "mt-8",
                    "grid",
                    "grid-cols-1",
                    "gap-6",
                    "md:grid-cols-2",
                )}
            >
                {value.laboratory.map((data, index) => (
                    <FadeUp
                        key={data.id}
                        delay={(animationDelay ?? 0) + 0.1 + 0.08 * index}
                    >
                        <LaboratoryCard data={data} />
                    </FadeUp>
                ))}
            </div>
        </HomeSection>
    );
}
