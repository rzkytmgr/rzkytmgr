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
            seeAllHref="/lab"
            animationDelay={animationDelay}
        >
            <div
                className={cn(
                    "mt-10",
                    "grid",
                    "grid-cols-1",
                    "gap-6",
                    "md:grid-cols-2",
                )}
            >
                {value.laboratory.map((data) => (
                    <LaboratoryCard key={data.id} data={data} />
                ))}
            </div>
        </HomeSection>
    );
}
