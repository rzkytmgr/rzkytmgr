import { create } from "zustand";

interface SidebarStore {
    open: boolean;
    openSidebar: () => void;
    closeSidebar: () => void;
    toggleSidebar: () => void;
}

export const useSidebarStore = create<SidebarStore>((set) => ({
    open: false,
    openSidebar: () => set({ open: true }),
    closeSidebar: () => set({ open: false }),
    toggleSidebar: () =>
        set((state) => ({
            open: !state.open,
        })),
}));
