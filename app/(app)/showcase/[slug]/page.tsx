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
                <ShowcaseComponents.Header
                    title={data.title}
                    description={data.description}
                    date={data.date}
                    techstack={data.techstack}
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
                            message="This project is no longer maintained. Some information or links may be outdated."
                            className="mb-10"
                        />
                    )}

                    {}
                    <ShowcaseComponents.ProjectLinks
                        repository={data.link.repository}
                        preview={data.link.preview}
                        className="mb-10 lg:hidden"
                    />

                    <Markdown html={contentHtml} className="font-serif" />

                    <GiscusComments config={config.giscus} />

                    <ArticlePager
                        previous={adjacent.previous}
                        next={adjacent.next}
                    />
                </div>

                <aside className="hidden lg:flex lg:flex-col lg:sticky lg:top-24 lg:self-start lg:max-h-[calc(100vh-6rem)] lg:pl-6">
                    {}
                    <ShowcaseComponents.ProjectLinks
                        repository={data.link.repository}
                        preview={data.link.preview}
                        className="mb-10"
                    />

                    {headings.length > 0 && (
                        <TableOfContents headings={headings} />
                    )}
                </aside>
            </div>
        </main>
    );
}
