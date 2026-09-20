import type { Metadata } from "next";
import { ArrowUpRight, MapPin } from "lucide-react";
import { FadeUp } from "@/components/structured/fade-up";
import { SocialIcon } from "@/components/structured/social-icon";
import { Typography } from "@/components/ui/typography";
import type { ResumeEntryType } from "@/lib/config";
import { config } from "@/lib/config";
import { cn } from "@/utils";

export const metadata: Metadata = {
    title: config.ui.pages.about.heading,
    description: config.ui.pages.about.description,
};

type ResumeSectionProps = Readonly<{
    label: string;
    entries: readonly ResumeEntryType[];
}>;

function ResumeSection({ label, entries }: ResumeSectionProps) {
    if (entries.length === 0) {
        return null;
    }

    return (
        <section className={cn("scroll-mt-24")}>
            <div
                className={cn(
                    "mb-5",
                    "flex",
                    "items-center",
                    "gap-4",
                    "border-b",
                    "border-smooth-border",
                    "pb-2",
                )}
            >
                <Typography
                    as="h2"
                    className={cn(
                        "font-mono",
                        "text-xs",
                        "uppercase",
                        "tracking-wider",
                        "text-neutral-500",
                        "dark:text-neutral-400",
                    )}
                >
                    {label}
                </Typography>
                <span
                    aria-hidden="true"
                    className={cn("h-px", "flex-1", "bg-smooth-border/70")}
                />
            </div>

            <ol className={cn("space-y-6")}>
                {entries.map((entry) => (
                    <li
                        key={`${entry.role}-${entry.company ?? entry.org ?? entry.school ?? ""}`}
                        className={cn(
                            "grid",
                            "gap-1",
                            "sm:grid-cols-[1fr_auto]",
                        )}
                    >
                        <div className={cn("min-w-0")}>
                            <p
                                className={cn(
                                    "text-sm",
                                    "font-semibold",
                                    "text-zinc-900",
                                    "dark:text-zinc-100",
                                )}
                            >
                                {entry.role}
                                {entry.company && (
                                    <span
                                        className={cn(
                                            "font-normal",
                                            "text-zinc-600",
                                            "dark:text-zinc-400",
                                        )}
                                    >
                                        {" "}
                                        · {entry.company}
                                    </span>
                                )}
                            </p>
                            {(entry.degree || entry.school) && (
                                <p
                                    className={cn(
                                        "text-sm",
                                        "text-zinc-700",
                                        "dark:text-zinc-300",
                                    )}
                                >
                                    {[entry.degree, entry.school]
                                        .filter(Boolean)
                                        .join(" — ")}
                                </p>
                            )}
                            {entry.points && entry.points.length > 0 && (
                                <ul
                                    className={cn(
                                        "mt-2",
                                        "space-y-1.5",
                                        "text-sm",
                                        "leading-relaxed",
                                        "text-zinc-700",
                                        "dark:text-zinc-300",
                                    )}
                                >
                                    {entry.points.map((point) => (
                                        <li
                                            key={point}
                                            className={cn("flex", "gap-2")}
                                        >
                                            <span
                                                aria-hidden="true"
                                                className={cn(
                                                    "mt-[0.55em]",
                                                    "size-1",
                                                    "flex-none",
                                                    "rounded-full",
                                                    "bg-journal-accent",
                                                )}
                                            />
                                            <span className={cn("min-w-0")}>
                                                {point}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>

                        <div
                            className={cn(
                                "flex",
                                "items-baseline",
                                "gap-3",
                                "sm:flex-col",
                                "sm:items-end",
                            )}
                        >
                            <span
                                className={cn(
                                    "font-mono",
                                    "text-xs",
                                    "text-neutral-500",
                                    "dark:text-neutral-400",
                                )}
                            >
                                {entry.period}
                            </span>
                            {entry.location && (
                                <span
                                    className={cn(
                                        "font-mono",
                                        "text-xs",
                                        "text-neutral-400",
                                        "dark:text-neutral-500",
                                    )}
                                >
                                    {entry.location}
                                </span>
                            )}
                        </div>
                    </li>
                ))}
            </ol>
        </section>
    );
}

export default function AboutPage() {
    const about = config.ui.pages.about;
    const resume = config.resume;

    const github = config.author.social.find(
        ({ name }) => name.toLowerCase() === "github",
    );
    const linkedin = config.author.social.find(
        ({ name }) => name.toLowerCase() === "linkedin",
    );

    const contactRows = [
        {
            name: "Email",
            value: config.author.email,
            href: `mailto:${config.author.email}`,
        },
        github && {
            name: "Github",
            value: "github.com/rzkytmgr",
            href: github.href,
        },
        linkedin && {
            name: "LinkedIn",
            value: "linkedin.com/in/rzkytmgr",
            href: linkedin.href,
        },
    ].filter(Boolean) as ReadonlyArray<{
        name: string;
        value: string;
        href: string;
    }>;

    return (
        <main
            id="main-content"
            className={cn(
                "max-w-6xl",
                "w-full",
                "m-auto",
                "px-6",
                "py-20",
                "md:py-32",
            )}
        >
            <div className={cn("max-w-3xl")}>
                {/* Header resume: nama, title, lokasi */}
                <FadeUp>
                    <header className={cn("space-y-3")}>
                        <Typography
                            as="h1"
                            weight="bold"
                            className={cn(
                                "text-3xl",
                                "tracking-tight",
                                "text-zinc-950",
                                "md:text-4xl",
                                "dark:text-zinc-50",
                            )}
                        >
                            {config.author.name}
                        </Typography>

                        <p
                            className={cn(
                                "text-base",
                                "text-zinc-700",
                                "dark:text-zinc-300",
                            )}
                        >
                            {config.author.title}
                        </p>

                        {config.author.location && (
                            <p
                                className={cn(
                                    "flex",
                                    "items-center",
                                    "gap-1.5",
                                    "font-mono",
                                    "text-xs",
                                    "text-neutral-500",
                                    "dark:text-neutral-400",
                                )}
                            >
                                <MapPin
                                    aria-hidden="true"
                                    className={cn("size-3.5")}
                                />
                                {config.author.location}
                            </p>
                        )}
                    </header>
                </FadeUp>

                {/* Overview */}
                {resume?.overview && (
                    <FadeUp delay={0.08}>
                        <p
                            className={cn(
                                "mt-8",
                                "leading-relaxed",
                                "text-zinc-700",
                                "dark:text-zinc-300",
                            )}
                        >
                            {resume.overview}
                        </p>
                    </FadeUp>
                )}

                {/* Contact strip */}
                <FadeUp delay={0.12}>
                    <div
                        className={cn(
                            "mt-6",
                            "flex",
                            "flex-wrap",
                            "items-center",
                            "gap-x-5",
                            "gap-y-2",
                            "border-y",
                            "border-smooth-border/70",
                            "py-3",
                        )}
                    >
                        {contactRows.map(({ name, value, href }) => (
                            <a
                                key={name}
                                href={href}
                                {...(href.startsWith("mailto:")
                                    ? {}
                                    : {
                                          target: "_blank",
                                          rel: "noopener noreferrer",
                                      })}
                                className={cn(
                                    "group/contact",
                                    "inline-flex",
                                    "items-center",
                                    "gap-1.5",
                                    "font-mono",
                                    "text-xs",
                                    "text-neutral-500",
                                    "transition-colors",
                                    "hover:text-journal-accent-text",
                                    "dark:text-neutral-400",
                                    "motion-reduce:transition-none",
                                )}
                            >
                                <SocialIcon
                                    name={name}
                                    className={cn("size-3.5", "flex-none")}
                                />
                                {value}
                                {!href.startsWith("mailto:") && (
                                    <ArrowUpRight
                                        aria-hidden="true"
                                        className={cn(
                                            "size-3",
                                            "transition-transform",
                                            "duration-300",
                                            "group-hover/contact:-translate-y-0.5",
                                            "group-hover/contact:translate-x-0.5",
                                            "motion-reduce:transition-none",
                                            "motion-reduce:group-hover/contact:translate-x-0",
                                            "motion-reduce:group-hover/contact:translate-y-0",
                                        )}
                                    />
                                )}
                            </a>
                        ))}
                    </div>
                </FadeUp>

                {/* Sections resume */}
                <div className={cn("mt-12", "space-y-12")}>
                    {resume && (
                        <FadeUp delay={0.16}>
                            <ResumeSection
                                label="Work Experience"
                                entries={resume.workExperience}
                            />
                        </FadeUp>
                    )}

                    {resume && (
                        <FadeUp delay={0.2}>
                            <ResumeSection
                                label="Education"
                                entries={resume.education}
                            />
                        </FadeUp>
                    )}

                    {resume && (
                        <FadeUp delay={0.24}>
                            <ResumeSection
                                label="Other Experience"
                                entries={resume.otherExperience}
                            />
                        </FadeUp>
                    )}
                </div>

                {/* Bio naratif dari config lama tetap tersedia di bawah */}
                <FadeUp delay={0.28}>
                    <section
                        className={cn(
                            "mt-12",
                            "border-t",
                            "border-smooth-border/70",
                            "pt-8",
                        )}
                    >
                        <Typography
                            as="h2"
                            className={cn(
                                "mb-4",
                                "font-mono",
                                "text-xs",
                                "uppercase",
                                "tracking-wider",
                                "text-neutral-500",
                            )}
                        >
                            About this place
                        </Typography>
                        <div className={cn("space-y-4")}>
                            {about.paragraphs.map((paragraph) => (
                                <Typography
                                    key={paragraph}
                                    as="p"
                                    className={cn(
                                        "leading-relaxed",
                                        "text-zinc-700",
                                        "dark:text-zinc-300",
                                    )}
                                >
                                    {paragraph}
                                </Typography>
                            ))}
                        </div>
                    </section>
                </FadeUp>
            </div>
        </main>
    );
}
