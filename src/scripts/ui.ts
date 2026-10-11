const LIGHT_THEME = "clean-light";
const DARK_THEME = "charcoal";
const SITE_THEMES = [LIGHT_THEME, DARK_THEME] as const;
const THEME_STORAGE_KEY = "theme";

const DAWN_HOUR = 6;
const DUSK_HOUR = 18;

function isSiteTheme(value: string): value is (typeof SITE_THEMES)[number] {
    return (SITE_THEMES as readonly string[]).includes(value);
}

function isDaytime(date = new Date()): boolean {
    const hour = date.getHours();

    return hour >= DAWN_HOUR && hour < DUSK_HOUR;
}

function getDefaultTheme(): string {
    return isDaytime() ? LIGHT_THEME : DARK_THEME;
}

function applyTheme(theme: string) {
    document.documentElement.setAttribute("data-theme", theme);
    document
        .getElementById("theme-toggle")
        ?.setAttribute("aria-pressed", String(theme === DARK_THEME));
}

function getInitialTheme(): string {
    if (typeof localStorage === "undefined") {
        return getDefaultTheme();
    }

    const stored = localStorage.getItem(THEME_STORAGE_KEY);

    return stored && isSiteTheme(stored) ? stored : getDefaultTheme();
}

applyTheme(getInitialTheme());

document.getElementById("theme-toggle")?.addEventListener("click", () => {
    const current =
        document.documentElement.getAttribute("data-theme") ?? LIGHT_THEME;
    const next = current === DARK_THEME ? LIGHT_THEME : DARK_THEME;

    localStorage.setItem(THEME_STORAGE_KEY, next);
    applyTheme(next);
});

function setSidebarOpen(open: boolean) {
    if (open) {
        document.documentElement.setAttribute("data-sidebar-open", "");
    } else {
        document.documentElement.removeAttribute("data-sidebar-open");
    }

    document
        .getElementById("sidebar-toggle")
        ?.setAttribute("aria-expanded", String(open));
    document
        .getElementById("sidebar")
        ?.setAttribute("aria-hidden", String(!open));
}

document
    .getElementById("sidebar-toggle")
    ?.addEventListener("click", (event) => {
        event.stopPropagation();
        setSidebarOpen(
            !document.documentElement.hasAttribute("data-sidebar-open"),
        );
    });

document.getElementById("app")?.addEventListener("click", () => {
    if (document.documentElement.hasAttribute("data-sidebar-open")) {
        setSidebarOpen(false);
    }
});

document.getElementById("sidebar")?.addEventListener("click", (event) => {
    const target = event.target as HTMLElement | null;

    if (target?.closest("a")) {
        setSidebarOpen(false);
    }
});

document.addEventListener("keydown", (event) => {
    if (
        event.key === "Escape" &&
        document.documentElement.hasAttribute("data-sidebar-open")
    ) {
        setSidebarOpen(false);
    }
});

document
    .querySelectorAll<HTMLButtonElement>("[data-code-block-copy]")
    .forEach((button) => {
        button.addEventListener("click", () => {
            const figure = button.closest("figure");
            const code = figure?.querySelector("pre > code");

            if (!code) {
                return;
            }

            navigator.clipboard.writeText(code.textContent ?? "").then(() => {
                button.setAttribute("data-copied", "true");
                window.setTimeout(() => {
                    button.removeAttribute("data-copied");
                }, 2000);
            });
        });
    });

export {};
