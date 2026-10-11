const root = document.querySelector<HTMLElement>("[data-showcase-index]");

if (root) {
    const rows = Array.from(
        root.querySelectorAll<HTMLElement>("[data-showcase-row]"),
    );
    const pills = Array.from(
        root.querySelectorAll<HTMLButtonElement>("[data-filter-key]"),
    );
    const indicator = root.querySelector<HTMLElement>(
        "[data-filter-indicator]",
    );
    const searchInput = root.querySelector<HTMLInputElement>(
        "[data-showcase-search]",
    );
    const clearButton = root.querySelector<HTMLElement>("[data-clear-search]");
    const emptyMessage = root.querySelector<HTMLElement>(
        "[data-empty-message]",
    );
    const previewPanels = Array.from(
        root.querySelectorAll<HTMLElement>("[data-preview-panel]"),
    );

    const titleIdleClass = "text-neutral-400";
    const titleIdleDarkClass = "dark:text-neutral-500";

    const pillActiveClasses = ["text-zinc-950", "dark:text-zinc-50"];
    const pillIdleClasses = [
        "text-zinc-700",
        "hover:text-zinc-950",
        "dark:text-zinc-300",
        "dark:hover:text-zinc-50",
    ];

    let selected: string | null = null;
    let query = "";

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

    function setActiveRow(row: HTMLElement | null) {
        rows.forEach((item) => {
            const isActive = item === row;
            const visible = !item.hasAttribute("hidden");
            const index = item.querySelector<HTMLElement>("[data-row-index]");
            const title = item.querySelector<HTMLElement>("[data-row-title]");

            if (!visible) {
                index?.classList.remove("text-journal-accent-text");
                title?.classList.remove("text-zinc-950", "dark:text-zinc-50");
                title?.classList.add(titleIdleClass, titleIdleDarkClass);
                return;
            }

            if (isActive) {
                index?.classList.add("text-journal-accent-text");
                title?.classList.add("text-zinc-950", "dark:text-zinc-50");
                title?.classList.remove(titleIdleClass, titleIdleDarkClass);
            } else {
                index?.classList.remove("text-journal-accent-text");
                title?.classList.remove("text-zinc-950", "dark:text-zinc-50");
                title?.classList.add(titleIdleClass, titleIdleDarkClass);
            }
        });
    }

    function showPreview(projectId: string | null) {
        previewPanels.forEach((panel) => {
            panel.toggleAttribute(
                "hidden",
                panel.dataset.previewPanel !== projectId,
            );
        });
    }

    function update() {
        const normalized = query.trim().toLowerCase();

        const visible = rows.filter((row) => {
            const matchesCategory =
                !selected || row.dataset.filterTag === selected;
            const matchesQuery =
                !normalized || (row.dataset.search ?? "").includes(normalized);

            return matchesCategory && matchesQuery;
        });

        rows.forEach((row) => {
            row.toggleAttribute("hidden", !visible.includes(row));
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

        const first = visible[0] ?? null;
        setActiveRow(first);
        showPreview(first?.dataset.projectId ?? null);
        measureIndicator();
    }

    rows.forEach((row) => {
        row.addEventListener("mouseenter", () => {
            setActiveRow(row);
            showPreview(row.dataset.projectId ?? null);
        });

        row.addEventListener("focusin", () => {
            setActiveRow(row);
            showPreview(row.dataset.projectId ?? null);
        });
    });

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

    update();
}

export {};
