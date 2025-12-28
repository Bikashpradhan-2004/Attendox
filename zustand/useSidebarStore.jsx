"use client";
import { create } from "zustand";

export const useSidebarStore = create((set) => ({
  isExpanded: true ,
  isMobileOpen: false,
  isHovered: false,

  toggleSidebar: () => set((state) => ({ isExpanded: !state.isExpanded })),

  toggleMobileSidebar: () =>
    set((state) => ({ isMobileOpen: !state.isMobileOpen })),

  setIsHovered: (isHovered) => set({ isHovered }),
}));
