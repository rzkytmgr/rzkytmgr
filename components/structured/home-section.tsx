import type { HTMLAttributes, ReactNode } from "react";
import { Typography } from "../ui/typography";
import { cn } from "@/utils";

type HomeSectionProps = Readonly<
    {
        id: string;
        title: string;
        children: ReactNode;
        className?: string;
    } & HTMLAttributes<HTMLElement>
>;

export function HomeSection({
    id,
    title,
    children,
    className,
    ...props
}: HomeSectionProps) {
    return (
        <section id={id} className={cn("pt-32", className)} {...props}>
            <div
                className={cn(
                    "flex",
                    "items-center",
                    "justify-between",
                    "mb-3",
                    "border-b",
                    "border-smooth-border/70",
                    "pb-3",
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
                    {title}
                </Typography>
            </div>
            {children}
        </section>
    );
}
