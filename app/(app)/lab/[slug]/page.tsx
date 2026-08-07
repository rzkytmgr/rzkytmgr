import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArchiveNotice } from "@/components/structured/archive-notice";
import { ArticlePager } from "@/components/structured/article-pager";
import { FadeUp } from "@/components/structured/fade-up";
import { GiscusComments } from "@/components/structured/giscus-comments";
import { ReadingProgress } from "@/components/structured/reading-progress";
import { TableOfContents } from "@/components/structured/table-of-contents";
import { Markdown } from "@/components/ui/markdown";
import { LaboratoryComponents } from "@/domain/laboratory/components";
import { config } from "@/lib/config";
import {
    getAllExperimentSlug,
    getAdjacentExperiment,
    getExperimentContentBySlug,
} from "@/domain/laboratory/service";
import { cn } from "@/utils";
import { estimateReadingTime, extractHeadings } from "@/utils/markdown";
import { renderMarkdown } from "@/utils/server/markdown-render";

export const dynamicParams = false;

type LaboratoryDetailPageProps = {
    params: Promise<{
        slug: string;
    }>;
};

export function generateStaticParams() {
    return getAllExperimentSlug().map((slug) => ({ slug }));
}

export async function generateMetadata({
    params,
}: LaboratoryDetailPageProps): Promise<Metadata> {
    const { slug } = await params;
    const post = await getExperimentContentBySlug(slug);

    if (!post) {
        return {};
    }

    return {
        title: post.data.title,
        description: post.data.description,
    };
}

export default async function LaboratoryDetailPage({
    params,
}: LaboratoryDetailPageProps) {
    const { slug } = await params;
    const post = await getExperimentContentBySlug(slug);

    if (!post) {
        notFound();
    }

    const data = post.data;
    const headings = extractHeadings(post.content);
    const readingTime = estimateReadingTime(post.content);
    const adjacent = await getAdjacentExperiment(slug);
    const contentHtml = await renderMarkdown(post.content);

    return (
        <main
            id="main-content"
            className={cn(
                "max-w-6xl",
                "w-full",
                "m-auto",
                "px-5",
                "sm:px-6",
                "py-20",
                "md:py-32",
            )}
        >
            <ReadingProgress />

            <FadeUp>
                <LaboratoryComponents.Header
                    title={data.title}
                    description={data.description}
                    date={data.date}
                    stack={data.stack}
                    readingTime={readingTime}
                    slug={data.slug}
                />
            </FadeUp>

            <hr className={cn("border-smooth-border/70")} />

            <div
                className={cn(
                    "grid",
                    "grid-cols-1",
                    "gap-12",
                    "pt-12",
                    "lg:grid-cols-3",
                )}
            >
                <div className="lg:col-span-2">
                    {data.is_archive && (
                        <ArchiveNotice
                            message="This experiment has been archived and is no longer maintained. Some information or links may be outdated."
                            className="mb-10"
                        />
                    )}

                    <Markdown html={contentHtml} className="font-serif" />

                    <GiscusComments config={config.giscus} />

                    <ArticlePager
                        previous={adjacent.previous}
                        next={adjacent.next}
                    />
                </div>

                {headings.length > 0 && (
                    <aside className="hidden lg:block lg:sticky lg:top-24 lg:self-start lg:pl-6">
                        <TableOfContents headings={headings} />
                    </aside>
                )}
            </div>
        </main>
    );
}
