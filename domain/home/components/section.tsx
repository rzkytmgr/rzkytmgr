import type { HTMLAttributes, ReactNode } from "react";
import { Typography } from "@/components/ui/typography";
import { cn } from "@/utils";

type HomeSectionProps = Readonly<
    {
        title: string;
        children: ReactNode;
        headerClassName?: string;
    } & HTMLAttributes<HTMLElement>
>;

export function HomeSection({
    title,
    children,
    className,
    headerClassName,
    ...props
}: HomeSectionProps) {
    return (
        <section className={cn("pt-32", className)} {...props}>
            <div
                className={cn(
                    "mb-3",
                    "flex",
                    "items-center",
                    "justify-between",
                    "border-b",
                    "border-smooth-border/70",
                    "pb-3",
                    headerClassName,
                )}
            >
                <Typography
                    as="h2"
                    size="xs"
                    className={cn(
                        "font-mono",
                        "uppercase",
                        "tracking-wider",
                        "text-neutral-500",
                    )}
                >
                    {title}{" "}
                </Typography>{" "}
            </div>

            {children}
        </section>
    );
}
