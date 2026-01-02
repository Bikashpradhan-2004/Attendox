"use client";
import Image from "next/image";
import { MdDashboard } from "react-icons/md";
import { PiStudent } from "react-icons/pi";
import { HiOutlineHandRaised } from "react-icons/hi2";
import { IoSettingsOutline } from "react-icons/io5";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSidebarStore } from "@/zustand/useSidebarStore";
import clsx from "clsx";
import { useCallback } from "react";

const SideNav = () => {
  const {
    isExpanded,
    isMobileOpen,
    isHovered,
    setIsHovered,
    toggleMobileSidebar,
  } = useSidebarStore();

  const pathname = usePathname();
  const isActive = useCallback((path) => path === pathname, [pathname]);

  const isFullWidth = isExpanded || isMobileOpen || isHovered;

  const { user } = useKindeBrowserClient();
  const profileImageUrl = user?.picture;

  const handleLinkClick = () => {

    if (window.innerWidth < 1024 && isMobileOpen) {
      toggleMobileSidebar();
    }
  };

  const navItems = [
    {
      name: "Dashboard",
      icon: <MdDashboard className="text-2xl" />,
      path: "/dashboard",
    },
    {
      name: "Students",
      icon: <PiStudent className="text-2xl" />,
      path: "/dashboard/students",
    },
    {
      name: "Attendance",
      icon: <HiOutlineHandRaised className="text-2xl" />,
      path: "/dashboard/attendance",
    },
    {
      name: "Settings",
      icon: <IoSettingsOutline className="text-2xl" />,
      path: "/dashboard/settings",
    },
  ];

  return (
    <aside
      className={clsx(
        "fixed top-0 left-0 flex flex-col bg-white h-screen transition-all duration-300 ease-in-out z-50 border-r border-gray-300 shadow-2xl",
        {
          "w-[290px]": isFullWidth,
          "w-[90px]": !isFullWidth,
        },
        {
          "translate-x-0": isMobileOpen,
          "-translate-x-full": !isMobileOpen,
        },
        "lg:translate-x-0",
        "mt-16 lg:mt-0"
      )}
      onMouseEnter={() => !isExpanded && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={clsx(
          "border-b border-gray-300 flex transition-all duration-300",
          {
            "justify-start px-5": isFullWidth,
            "justify-center": !isFullWidth,
          }
        )}
      >
        <Link
          href="/dashboard"
          onClick={handleLinkClick}
          className="flex items-center"
        >
          {isFullWidth ? (
            <Image
              src="/images/attendox-logo.png"
              alt="Logo"
              width={178}
              height={20}
              className="py-4"
            />
          ) : (
            <Image
              src="/images/logo-icon.png"
              alt="Logo"
              width={44}
              height={44}
              className="py-5"
            />
          )}
        </Link>
      </div>

      <nav className="flex-1 overflow-y-auto px-5">
        <ul className="flex flex-col gap-3 mt-4 no-scrollbar">
          {navItems.map(({ name, icon, path }) => (
            <li
              key={name}
              className={clsx(
                "rounded-lg font-medium transition-all duration-200",
                {
                  "bg-blue-700 text-white shadow-sm": isActive(path),
                  "text-gray-600 hover:bg-blue-700 hover:text-white hover:shadow-sm":
                    !isActive(path),
                }
              )}
            >
              <Link
                href={path}
                onClick={handleLinkClick}
                className="flex items-center gap-3 py-4 px-3"
              >
                <span className="shrink-0">{icon}</span>
                <span
                  className={clsx(
                    "whitespace-nowrap transition-opacity duration-300",
                    {
                      "opacity-100": isFullWidth,
                      "opacity-0 hidden": !isFullWidth,
                    }
                  )}
                >
                  {name}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div
        className={clsx(
          "border-t border-gray-300 py-4 transition-all duration-300 mb-16   lg:mb-0",
          {
            "px-5": isFullWidth,
            "px-3": !isFullWidth,
          }
        )}
      >
        <div
          className={clsx("flex items-center gap-3", {
            "justify-start": isFullWidth,
            "justify-center": !isFullWidth,
          })}
        >
          {profileImageUrl && (
            <Image
              src={profileImageUrl}
              width={35}
              height={35}
              alt="user"
              className="rounded-full shrink-0"
            />
          )}
          <div
            className={clsx("transition-opacity duration-300 overflow-hidden", {
              "opacity-100": isFullWidth,
              "opacity-0 w-0 hidden": !isFullWidth,
            })}
          >
            <h2 className="text-sm font-bold truncate">
              {user?.given_name} {user?.family_name}
            </h2>
            <h2 className="text-xs text-slate-400 truncate">{user?.email}</h2>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default SideNav;
