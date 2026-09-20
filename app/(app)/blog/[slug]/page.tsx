import type { Metadata } from "next";
import { ArticlePager } from "@/components/structured/article-pager";
import { FadeUp } from "@/components/structured/fade-up";
import { GiscusComments } from "@/components/structured/giscus-comments";
import { ReadingProgress } from "@/components/structured/reading-progress";
import { TableOfContents } from "@/components/structured/table-of-contents";
import { Markdown } from "@/components/ui/markdown";
import { config } from "@/lib/config";
import { WriteupsComponent } from "@/domain/writeups/components";
import {
    getAllWriteupSlug,
    getAdjacentWriteup,
    getWriteupBySlug,
} from "@/domain/writeups/service";
import { cn } from "@/utils";
import { extractHeadings } from "@/utils/markdown";
import { renderMarkdown } from "@/utils/server/markdown-render";

export const dynamicParams = false;

type BlogPageProps = {
    params: Promise<{
        slug: string;
    }>;
};

export async function generateStaticParams() {
    const writeupSlug = getAllWriteupSlug();
    return writeupSlug.map((slug) => ({ slug }));
}

export async function generateMetadata({
    params,
}: BlogPageProps): Promise<Metadata> {
    const { slug } = await params;
    const post = await getWriteupBySlug(slug);

    return {
        title: post.data.title,
        description: post.data.description,
    };
}

export default async function BlogPage({ params }: BlogPageProps) {
    const { slug } = await params;
    const post = await getWriteupBySlug(slug);
    const metadata = post.data;
    const headings = extractHeadings(post.content);
    const adjacent = await getAdjacentWriteup(slug);
    const contentHtml = await renderMarkdown(post.content);

    return (
        <main
            id="main-content"
            className={cn(
                "max-w-7xl w-full m-auto px-6 pt-6 pb-20",
                "md:pt-8 md:pb-32",
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
                    <WriteupsComponent.Header
                        date={metadata.date}
                        description={metadata.description}
                        readingTime={metadata.readingTime}
                        tag={metadata.tag}
                        title={metadata.title}
                        thumbnail={metadata.thumbnail}
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
                        <Markdown html={contentHtml} className="font-serif" />

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
                        <div
                            className={cn(
                                "xl:sticky",
                                "xl:flex",
                                "xl:flex-col",
                                "xl:top-24",
                                "xl:max-h-[calc(100vh_-_8rem)]",
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
    );
}
