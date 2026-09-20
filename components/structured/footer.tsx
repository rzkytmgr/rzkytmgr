import { Fingerprint, Ghost, KeyRound } from "lucide-react";
import Link from "next/link";
import type { SocialType } from "@/types/global";
import { cn } from "@/utils";
import { SocialIcon } from "./social-icon";
import { Typography } from "../ui/typography";

type FooterProps = Readonly<{
    value: {
        title: string;
        social: SocialType[];
        static: {
            description: string;
            copyright: string;
        };
    };
}>;

const socialIconButtonClass = cn(
    "inline-flex",
    "size-8",
    "items-center",
    "justify-center",
    "text-neutral-500",
    "transition-colors",
    "duration-150",
    "hover:text-journal-accent-text",
    "motion-reduce:transition-none",
    "focus-visible:outline-2",
    "focus-visible:outline-offset-2",
    "focus-visible:outline-journal-accent",
);

export function Footer({ value }: FooterProps) {
    return (
        <>
            <hr className={cn("border-smooth-border")} />

            <footer
                className={cn(
                    "mx-auto",
                    "w-full",
                    "max-w-6xl",
                    "space-y-16",
                    "px-5",
                    "sm:px-6",
                    "pt-16",
                )}
            >
                <section
                    className={cn(
                        "flex",
                        "flex-col",
                        "gap-8",
                        "md:flex-row",
                        "md:items-center",
                        "md:justify-between",
                        "md:gap-12",
                    )}
                >
                    <div className={cn("flex", "flex-col")}>
                        <Link
                            href="/"
                            className={cn(
                                "flex",
                                "w-fit",
                                "items-center",
                                "gap-1.5",
                                "font-sans",
                                "text-sm",
                                "font-bold",
                                "tracking-tight",
                                "transition-colors",
                                "hover:text-journal-accent-text",
                                "focus-visible:text-journal-accent-text",
                            )}
                        >
                            <Ghost
                                aria-hidden="true"
                                className={cn("size-4")}
                            />
                            {value.title}
                        </Link>

                        <Typography
                            as="p"
                            size="sm"
                            className={cn(
                                "mt-3",
                                "max-w-xs",
                                "text-neutral-500",
                            )}
                        >
                            {value.static.description}
                        </Typography>

                        <ul
                            className={cn(
                                "mt-5",
                                "flex",
                                "items-center",
                                "gap-2.5",
                            )}
                        >
                            {value.social.map(({ name, href }) => (
                                <li key={name}>
                                    <Link
                                        href={href}
                                        aria-label={name}
                                        title={name}
                                        target={
                                            href.startsWith("http")
                                                ? "_blank"
                                                : undefined
                                        }
                                        rel={
                                            href.startsWith("http")
                                                ? "noopener noreferrer"
                                                : undefined
                                        }
                                        className={socialIconButtonClass}
                                    >
                                        <SocialIcon
                                            name={name}
                                            className={cn("size-4")}
                                        />
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className={cn("flex", "items-center", "gap-3")}>
                        <a
                            href="/public.asc.txt"
                            className={cn(
                                "inline-flex",
                                "items-center",
                                "gap-1.5",
                                "rounded-md",
                                "border",
                                "border-smooth-border",
                                "px-3.5",
                                "py-2",
                                "font-mono",
                                "text-xs",
                                "text-neutral-600",
                                "transition-colors",
                                "duration-150",
                                "hover:border-journal-accent/50",
                                "hover:bg-journal-accent/10",
                                "hover:text-journal-accent-text",
                                "focus-visible:outline-2",
                                "focus-visible:outline-offset-2",
                                "focus-visible:outline-journal-accent",
                                "motion-reduce:transition-none",
                                "dark:text-neutral-400",
                            )}
                        >
                            <KeyRound
                                aria-hidden="true"
                                className={cn("size-3.5")}
                            />
                            GPG Key
                        </a>

                        <a
                            href="/fingerprint.txt"
                            className={cn(
                                "inline-flex",
                                "items-center",
                                "gap-1.5",
                                "rounded-md",
                                "border",
                                "border-smooth-border",
                                "px-3.5",
                                "py-2",
                                "font-mono",
                                "text-xs",
                                "text-neutral-600",
                                "transition-colors",
                                "duration-150",
                                "hover:border-journal-accent/50",
                                "hover:bg-journal-accent/10",
                                "hover:text-journal-accent-text",
                                "focus-visible:outline-2",
                                "focus-visible:outline-offset-2",
                                "focus-visible:outline-journal-accent",
                                "motion-reduce:transition-none",
                                "dark:text-neutral-400",
                            )}
                        >
                            <Fingerprint
                                aria-hidden="true"
                                className={cn("size-3.5")}
                            />
                            Fingerprint
                        </a>
                    </div>
                </section>

                <section
                    className={cn(
                        "flex",
                        "flex-col",
                        "gap-4",
                        "border-t",
                        "border-smooth-border",
                        "py-8",
                        "font-mono",
                        "text-xs",
                        "text-neutral-500",
                        "sm:flex-row",
                        "sm:items-center",
                        "sm:justify-between",
                    )}
                >
                    <Typography as="span" size="xs">
                        © {new Date().getFullYear()} {value.static.copyright}
                    </Typography>

                    <Typography as="span" size="xs">
                        Made in Indonesia
                    </Typography>
                </section>
            </footer>
        </>
    );
}
