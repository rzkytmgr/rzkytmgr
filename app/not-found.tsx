import { MainLayout } from "@/components/layouts/main-layout";
import { NotFoundContent } from "@/components/structured/not-found-content";
import { config } from "@/lib/config";
import { cn } from "@/utils";

export default function NotFound() {
    return (
        <MainLayout config={config}>
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
                <NotFoundContent />
            </main>
        </MainLayout>
    );
}
