import { HomeSection } from "@/components/structured/home-section";
import { ShowcaseCard } from "@/domain/showcase/components/card";
import type { ShowcaseCardType } from "@/types/global";
import { cn } from "@/utils";

type ShowcaseHomeSectionProps = Readonly<{
    value: {
        showcases: ShowcaseCardType[];
        title: string;
    };
    animationDelay?: number;
}>;

export function ShowcaseHomeSection({
    value,
    animationDelay,
}: ShowcaseHomeSectionProps) {
    return (
        <HomeSection
            id="showcase"
            title={value.title}
            className={cn("mb-8")}
            animationDelay={animationDelay}
        >
            <div
                className={cn(
                    "mt-10",
                    "grid",
                    "grid-cols-1",
                    "gap-6",
                    "md:grid-cols-2",
                    "lg:grid-cols-3",
                )}
            >
                {value.showcases.map((data, index) => (
                    <ShowcaseCard
                        key={data.id}
                        data={data}
                        hideOnMobile={index > 2}
                    />
                ))}
            </div>
        </HomeSection>
    );
}
