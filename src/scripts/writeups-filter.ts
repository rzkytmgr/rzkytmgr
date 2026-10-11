const root = document.querySelector<HTMLElement>("[data-writeups-filter]");

if (root) {
    const cards = Array.from(
        root.querySelectorAll<HTMLElement>(".writeup-card"),
    );
    const pills = Array.from(
        root.querySelectorAll<HTMLButtonElement>("[data-filter-key]"),
    );
    const indicator = root.querySelector<HTMLElement>(
        "[data-filter-indicator]",
    );
    const searchInput =
        root.querySelector<HTMLInputElement>("#writeups-search");
    const clearButton = root.querySelector<HTMLElement>("[data-clear-search]");
    const emptyMessage = root.querySelector<HTMLElement>(
        "[data-empty-message]",
    );

    let selected: string | null = null;
    let query = "";

    const pillActiveClasses = ["text-zinc-950", "dark:text-zinc-50"];
    const pillIdleClasses = [
        "text-zinc-700",
        "hover:text-zinc-950",
        "dark:text-zinc-300",
        "dark:hover:text-zinc-50",
    ];

    function measureIndicator() {
        if (!indicator) {
            return;
        }

        const activeKey = selected ?? "all";
        const active = pills.find(
            (pill) => pill.dataset.filterKey === activeKey,
        );

        if (!active) {
            indicator.style.opacity = "0";
            return;
        }

        indicator.style.opacity = "1";
        indicator.style.transform = `translateX(${active.offsetLeft}px)`;
        indicator.style.width = `${active.offsetWidth}px`;
    }

    function update() {
        const normalized = query.trim().toLowerCase();

        const visible = cards.filter((card) => {
            const matchesTag = !selected || card.dataset.tag === selected;
            const matchesQuery =
                !normalized || (card.dataset.search ?? "").includes(normalized);

            return matchesTag && matchesQuery;
        });

        cards.forEach((card) => {
            card.toggleAttribute("hidden", !visible.includes(card));
        });

        pills.forEach((pill) => {
            const active =
                (pill.dataset.filterKey ?? "all") === (selected ?? "all");

            pill.setAttribute("aria-pressed", String(active));
            pill.classList.remove(
                ...(active ? pillIdleClasses : pillActiveClasses),
            );
            pill.classList.add(
                ...(active ? pillActiveClasses : pillIdleClasses),
            );
        });

        emptyMessage?.toggleAttribute("hidden", visible.length > 0);

        measureIndicator();
    }

    pills.forEach((pill) => {
        pill.addEventListener("click", () => {
            const key = pill.dataset.filterKey ?? "all";

            selected = key === "all" || key === selected ? null : key;
            update();
        });
    });

    searchInput?.addEventListener("input", () => {
        query = searchInput.value;
        clearButton?.toggleAttribute("hidden", query.length === 0);
        update();
    });

    searchInput?.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            searchInput.value = "";
            query = "";
            clearButton?.setAttribute("hidden", "");
            update();
        }
    });

    clearButton?.addEventListener("click", () => {
        searchInput!.value = "";
        query = "";
        clearButton.setAttribute("hidden", "");
        searchInput?.focus();
        update();
    });

    window.addEventListener("resize", measureIndicator);
    document.fonts?.ready.then(() => measureIndicator());

    measureIndicator();
}

export {};
