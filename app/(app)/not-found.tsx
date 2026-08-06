import { NotFoundContent } from "@/components/structured/not-found-content";
import { cn } from "@/utils";

export default function NotFound() {
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
            <NotFoundContent />
        </main>
    );
}
