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
                "max-w-6xl w-full m-auto px-5 sm:px-6 py-20",
                "md:py-32",
            )}
        >
            <ReadingProgress />

            <FadeUp>
                <WriteupsComponent.Header
                    date={metadata.date}
                    description={metadata.description}
                    readingTime={metadata.readingTime}
                    tag={metadata.tag}
                    title={metadata.title}
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
