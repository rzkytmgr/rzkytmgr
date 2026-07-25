import { cn } from "@/utils";
import { HTMLAttributes } from "react";
import { Typography } from "../ui/typography";

type HomeSectionProps = {
    id: string;
    title: string;
    children: React.ReactNode;
    className?: string;
} & HTMLAttributes<HTMLDivElement>;

export const HomeSection = ({
    id,
    title,
    children,
    className,
    ...props
}: HomeSectionProps) => {
    return (
        <section id={id}>
            <div
                className={cn(
                    "flex items-center justify-between border-b",
                    "border-smooth-border/70 mb-3 pb-3",
                    className,
                )}
                {...props}
            >
                <Typography
                    as="h2"
                    size="xs"
                    className="font-mono uppercase text-neutral-500 tracking-wider"
                >
                    {title}
                </Typography>
            </div>

            {children}
        </section>
    );
};
