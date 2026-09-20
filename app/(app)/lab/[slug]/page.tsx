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
        <>
            {data.is_archive && (
                <ArchiveNotice message="This experiment has been archived and is no longer maintained. Some information or links may be outdated." />
            )}

            <main
                id="main-content"
                className={cn(
                    "max-w-7xl",
                    "w-full",
                    "m-auto",
                    "px-6",
                    "pt-6",
                    "pb-20",
                    "md:pt-8",
                    "md:pb-32",
                )}
            >
                <ReadingProgress />

                {}
                <div
                    className={cn(
                        "mx-auto",
                        "grid",
                        "w-full",
                        "grid-cols-1",
                        "gap-y-12",
                        "xl:grid-cols-[minmax(0,1fr)_680px_minmax(0,1fr)]",
                        "xl:gap-x-10",
                    )}
                >
                    <FadeUp
                        className={cn(
                            "mx-auto",
                            "w-full",
                            "max-w-[680px]",
                            "xl:col-start-2",
                            "xl:row-start-1",
                            "xl:max-w-none",
                        )}
                    >
                        <LaboratoryComponents.Header
                            title={data.title}
                            description={data.description}
                            date={data.date}
                            stack={data.stack}
                            readingTime={readingTime}
                            slug={data.slug}
                            thumbnail={data.thumbnail}
                        />
                    </FadeUp>

                    <div
                        className={cn(
                            "mx-auto",
                            "w-full",
                            "max-w-[680px]",
                            "xl:col-start-2",
                            "xl:row-start-2",
                            "xl:max-w-none",
                        )}
                    >
                        <FadeUp delay={0.15}>
                            <Markdown
                                html={contentHtml}
                                className="font-serif"
                            />

                            <GiscusComments config={config.giscus} />

                            <ArticlePager
                                previous={adjacent.previous}
                                next={adjacent.next}
                            />
                        </FadeUp>
                    </div>

                    {headings.length > 0 && (
                        <aside
                            className={cn(
                                "hidden",
                                "xl:col-start-3",
                                "xl:row-start-1",
                                "xl:row-span-2",
                                "xl:block",
                            )}
                        >
                            {}
                            {}
                            {}
                            <div
                                className={cn(
                                    "xl:sticky",
                                    "xl:flex",
                                    "xl:flex-col",
                                    data.is_archive ? "xl:top-28" : "xl:top-24",
                                    data.is_archive
                                        ? "xl:max-h-[calc(100vh_-_9rem)]"
                                        : "xl:max-h-[calc(100vh_-_8rem)]",
                                )}
                            >
                                <FadeUp
                                    delay={0.2}
                                    className={cn(
                                        "xl:flex",
                                        "xl:flex-col",
                                        "xl:min-h-0",
                                    )}
                                >
                                    <TableOfContents headings={headings} />
                                </FadeUp>
                            </div>
                        </aside>
                    )}
                </div>
            </main>
        </>
    );
}
