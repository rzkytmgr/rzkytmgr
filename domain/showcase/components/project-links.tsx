import { ExternalLink, FolderGit2 } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/utils";

type ProjectLinksProps = Readonly<{
    repository?: string;
    preview?: string;
    className?: string;
}>;

const isMissing = (href?: string): href is undefined =>
    !href || href.trim() === "";

type ProjectLinkSlotProps = Readonly<{
    href?: string;
    label: string;
    icon: ReactNode;

    missingNote: string;

    primary?: boolean;
}>;

function ProjectLinkSlot({
    href,
    label,
    icon,
    missingNote,
    primary = false,
}: ProjectLinkSlotProps) {
    const baseClassName = cn(
        "inline-flex",
        "w-full",
        "items-center",
        "justify-center",
        "gap-2",
        "rounded-md",
        "border",
        "px-4",
        "py-2",
        "text-sm",
        "font-medium",
        "transition-colors",
    );

    if (isMissing(href)) {
        return (
            <div className={cn("flex", "flex-col", "gap-1.5")}>
                <span
                    aria-disabled="true"
                    className={cn(
                        baseClassName,
                        "cursor-not-allowed",
                        "border-smooth-border",
                        "bg-neutral-100/60",
                        "text-neutral-400",
                        "dark:border-neutral-300",
                        "dark:bg-neutral-100/60",
                        "dark:text-neutral-500",
                    )}
                >
                    {icon}
                    {label}
                </span>
                <p
                    className={cn(
                        "text-center",
                        "text-[11px]",
                        "leading-tight",
                        "text-neutral-400",
                        "dark:text-neutral-500",
                    )}
                >
                    {missingNote}
                </p>
            </div>
        );
    }

    return (
        <Link
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
                baseClassName,
                "group",
                primary
                    ? cn(
                          "border-journal-accent/60",
                          "bg-journal-accent/5",
                          "text-journal-accent",
                          "hover:bg-journal-accent/10",
                          "dark:border-journal-accent/50",
                          "dark:bg-journal-accent/10",
                          "dark:text-journal-accent",
                          "dark:hover:bg-journal-accent/20",
                      )
                    : cn(
                          "border-smooth-border",
                          "bg-transparent",
                          "text-zinc-700",
                          "hover:border-journal-accent/60",
                          "hover:bg-neutral-100",
                          "hover:text-journal-accent",
                          "dark:border-neutral-300",
                          "dark:text-zinc-300",
                          "dark:hover:border-journal-accent/50",
                          "dark:hover:bg-neutral-100",
                          "dark:hover:text-journal-accent",
                      ),
            )}
        >
            {icon}
            {label}
        </Link>
    );
}

export function ProjectLinks({
    repository,
    preview,
    className,
}: ProjectLinksProps) {
    return (
        <div className={cn("flex", "w-full", "flex-col", "gap-3", className)}>
            <ProjectLinkSlot
                href={preview}
                label="Live preview"
                icon={
                    <ExternalLink aria-hidden="true" className={cn("size-4")} />
                }
                missingNote="This project has no live preview."
                primary
            />
            <ProjectLinkSlot
                href={repository}
                label="Repository"
                icon={
                    <FolderGit2 aria-hidden="true" className={cn("size-4")} />
                }
                missingNote="This project has no repository."
            />
        </div>
    );
}
