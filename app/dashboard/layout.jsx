"use client";
import clsx from "clsx";
import Header from "@/components/dashboard/Header";
import SideNav from "@/components/dashboard/SideNav";

import { useSidebarStore } from "@/zustand/useSidebarStore";

const UserLayout = ({ children }) => {
  const { isExpanded, isHovered, isMobileOpen } = useSidebarStore();

  return (
    <div>
      <SideNav />
      <div
        className={clsx("flex-1 transition-all duration-300 ease-in-out", {
          "ml-0": isMobileOpen,
          "lg:ml-[290px]": !isMobileOpen && (isExpanded || isHovered),
          "lg:ml-[90px]": !isMobileOpen && !isExpanded && !isHovered,
        })}
      >
        <Header />
        <div>{children}</div>
      </div>
    </div>
  );
};

export default UserLayout;
