import { FadeUp } from "@/components/structured/fade-up";
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
            linkHref="/showcase"
            className={cn("mb-8")}
            animationDelay={animationDelay}
        >
            <div
                className={cn(
                    "mt-8",
                    "grid",
                    "grid-cols-1",
                    "gap-6",
                    "md:grid-cols-2",
                    "lg:grid-cols-3",
                )}
            >
                {value.showcases.map((data, index) => (
                    <FadeUp
                        key={data.id}
                        delay={(animationDelay ?? 0) + 0.1 + 0.08 * index}
                    >
                        <ShowcaseCard data={data} showShape={false} />
                    </FadeUp>
                ))}
            </div>
        </HomeSection>
    );
}
