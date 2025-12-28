"use client";
import {
  TbLayoutSidebarLeftCollapseFilled,
  TbLayoutSidebarLeftExpandFilled,
} from "react-icons/tb";
import UserNav from "./UserNav";
import { useSidebarStore } from "@/zustand/useSidebarStore";

const Header = () => {
  const { isExpanded, isMobileOpen, toggleSidebar, toggleMobileSidebar, isHovered } =
    useSidebarStore();

  const handleToggle = () => {
    if (window.innerWidth >= 1024) {
      toggleSidebar();
    } else {
      toggleMobileSidebar();
    }
  };

  return (
    <header className="sticky top-0 border-gray-300 border-b flex items-center justify-between p-3 lg:p-5 z-50 bg-white shadow-lg">
      <button
        className="flex items-center justify-center w-11 aspect-square text-gray-500 border-gray-200 border rounded-lg z-99 text-4xl cursor-pointer bg-blue-100"
        onClick={handleToggle}
        aria-label="Toggle Sidebar"
      >
        <span className="lg:hidden">
          {isMobileOpen ? (
            <TbLayoutSidebarLeftCollapseFilled />
          ) : (
            <TbLayoutSidebarLeftExpandFilled />
          )}
        </span>

        <span className="hidden lg:block">
          {isExpanded || isHovered ? (
            <TbLayoutSidebarLeftCollapseFilled />
          ) : (
            <TbLayoutSidebarLeftExpandFilled />
          )}
        </span>
      </button>
      <UserNav />
    </header>
  );
};

export default Header;
