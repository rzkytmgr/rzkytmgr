import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArchiveNotice } from "@/components/structured/archive-notice";
import { ArticlePager } from "@/components/structured/article-pager";
import { FadeUp } from "@/components/structured/fade-up";
import { GiscusComments } from "@/components/structured/giscus-comments";
import { ReadingProgress } from "@/components/structured/reading-progress";
import { TableOfContents } from "@/components/structured/table-of-contents";
import { Markdown } from "@/components/ui/markdown";
import { ShowcaseComponents } from "@/domain/showcase/components";
import { config } from "@/lib/config";
import {
    getAllShowcaseSlug,
    getAdjacentShowcase,
    getShowcaseContentBySlug,
} from "@/domain/showcase/service";
import { cn } from "@/utils";
import { estimateReadingTime, extractHeadings } from "@/utils/markdown";
import { renderMarkdown } from "@/utils/server/markdown-render";

export const dynamicParams = false;

type ShowcaseDetailPageProps = {
    params: Promise<{
        slug: string;
    }>;
};

export function generateStaticParams() {
    return getAllShowcaseSlug().map((slug) => ({ slug }));
}

export async function generateMetadata({
    params,
}: ShowcaseDetailPageProps): Promise<Metadata> {
    const { slug } = await params;
    const post = await getShowcaseContentBySlug(slug);

    if (!post) {
        return {};
    }

    return {
        title: post.data.title,
        description: post.data.description,
    };
}

export default async function ShowcaseDetailPage({
    params,
}: ShowcaseDetailPageProps) {
    const { slug } = await params;
    const post = await getShowcaseContentBySlug(slug);

    if (!post) {
        notFound();
    }

    const data = post.data;
    const headings = extractHeadings(post.content);
    const readingTime = estimateReadingTime(post.content);
    const adjacent = await getAdjacentShowcase(slug);
    const contentHtml = await renderMarkdown(post.content);

    return (
        <>
            {data.is_archive && (
                <ArchiveNotice message="This project is no longer maintained. Some information or links may be outdated." />
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
                        <ShowcaseComponents.Header
                            title={data.title}
                            description={data.description}
                            date={data.date}
                            techstack={data.techstack}
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
                            <ShowcaseComponents.ProjectLinks
                                repository={data.link.repository}
                                preview={data.link.preview}
                                className="mb-10 xl:hidden"
                            />

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

                    <aside
                        className={cn(
                            "hidden",
                            "xl:col-start-3",
                            "xl:row-start-1",
                            "xl:row-span-2",
                            "xl:flex",
                            "xl:flex-col",
                        )}
                    >
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
                                <ShowcaseComponents.ProjectLinks
                                    repository={data.link.repository}
                                    preview={data.link.preview}
                                    className="mb-10"
                                />

                                {headings.length > 0 && (
                                    <TableOfContents headings={headings} />
                                )}
                            </FadeUp>
                        </div>
                    </aside>
                </div>
            </main>
        </>
    );
}
