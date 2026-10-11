const tocNav = document.querySelector<HTMLElement>("[data-toc-for]");

if (tocNav) {
    const links = Array.from(
        tocNav.querySelectorAll<HTMLAnchorElement>("[data-toc-link]"),
    );
    const elements = links
        .map((link) => document.getElementById(link.dataset.tocLink ?? ""))
        .filter((el): el is HTMLElement => el !== null);

    const SCROLL_OFFSET = 96;

    if (elements.length > 0) {
        let ticking = false;

        const update = () => {
            ticking = false;

            let currentId: string | null = null;

            for (const element of elements) {
                if (element.getBoundingClientRect().top <= SCROLL_OFFSET) {
                    currentId = element.id;
                }
            }

            links.forEach((link) => {
                const isActive = link.dataset.tocLink === currentId;
                link.setAttribute(
                    "aria-current",
                    isActive ? "location" : "false",
                );

                const marker =
                    link.querySelector<HTMLElement>("[data-toc-marker]");

                if (marker) {
                    marker.style.opacity = isActive ? "1" : "0";
                }

                if (isActive) {
                    link.classList.add("text-journal-accent-text");
                    link.classList.remove("text-zinc-500");
                } else {
                    link.classList.remove("text-journal-accent-text");
                    link.classList.add("text-zinc-500");
                }
            });
        };

        const onScroll = () => {
            if (!ticking) {
                ticking = true;
                requestAnimationFrame(update);
            }
        };

        update();
        window.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener("resize", onScroll, { passive: true });
    }
}

const actions = document.querySelector<HTMLElement>("[data-article-actions]");

if (actions) {
    const commentCount = actions.querySelector<HTMLElement>(
        "[data-comment-count]",
    );

    const setCount = (value: number) => {
        if (!commentCount) {
            return;
        }

        commentCount.textContent = String(value);
        commentCount.removeAttribute("hidden");
    };

    window.addEventListener("message", (event) => {
        if (event.origin !== "https://giscus.app") {
            return;
        }

        const data = event.data as {
            giscus?: {
                discussion?: { totalCommentCount?: number };
                error?: string;
            };
        };

        if (data?.giscus?.discussion) {
            setCount(data.giscus.discussion.totalCommentCount ?? 0);
        } else if (
            typeof data?.giscus?.error === "string" &&
            data.giscus.error.includes("Discussion not found")
        ) {
            setCount(0);
        }
    });

    actions
        .querySelector<HTMLElement>("[data-jump-comments]")
        ?.addEventListener("click", () => {
            const comments = document.getElementById("comments");

            if (!comments) {
                return;
            }

            const prefersReducedMotion = window.matchMedia(
                "(prefers-reduced-motion: reduce)",
            ).matches;

            comments.scrollIntoView({
                behavior: prefersReducedMotion ? "auto" : "smooth",
            });
        });

    actions
        .querySelector<HTMLElement>("[data-share]")
        ?.addEventListener("click", () => {
            const url = window.location.href;
            const title = document.title;

            if (navigator.share) {
                navigator.share({ title, url }).catch(() => {});
                return;
            }

            navigator.clipboard?.writeText(url);
        });
}

export {};
