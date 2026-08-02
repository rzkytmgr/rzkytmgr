import { WriteupsComponent } from "@/domain/writeups/components";
import { getAllWriteupSlug, getWriteupBySlug } from "@/domain/writeups/service";
import { cn } from "@/utils";

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

export default async function BlogPage({ params }: BlogPageProps) {
    const { slug } = await params;
    const post = await getWriteupBySlug(slug);
    const metadata = post.data;

    return (
        <main
            id="main-content"
            className={cn(
                "max-w-6xl w-full m-auto px-5 sm:px-6 py-20",
                "md:py-32",
            )}
        >
            <WriteupsComponent.Header
                date={metadata.date}
                description={metadata.description}
                readingTime={metadata.readingTime}
                tag={metadata.tag}
                title={metadata.title}
            />

            <div className="grid grid-cols-3 gap-16 lg:gap-12">
                <div className="lg:col-span-2">
                    <section>{post.content}</section>
                </div>
                <aside className="space-y-16 lg:pl-6 border-t lg:border-t-0 lg:border-l border-neutral-200 dark:border-neutral-800 pt-12 lg:pt-0"></aside>
            </div>
        </main>
    );
}
