"use client";
import { useState } from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import Image from "next/image";
import LogoutConfirmDialog from "./LogoutConfirmDialog";
import { Loader2 } from "lucide-react";

const UserNav = () => {
  const { user } = useKindeBrowserClient();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const profileImageUrl = user?.picture;

  const handleLogout = () => {
    setIsLoggingOut(true);
    window.location.href = "/api/auth/logout";
  };

  const menuItemClass =
    "hover:bg-blue-700 hover:text-white focus:bg-blue-600 rounded-sm p-2 text-sm transition-all text-left w-full cursor-pointer block";

  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="cursor-pointer bg-blue-100 py-5 px-3 rounded-full">
            <div>
              {profileImageUrl ? (
                <Image
                  src={profileImageUrl}
                  width={35}
                  height={35}
                  alt="user"
                  className="rounded-full"
                />
              ) : (
                <div className="w-[35px] h-[35px] rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold">
                  {user?.given_name?.[0] || "U"}
                </div>
              )}
            </div>
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="w-40 flex flex-col gap-1 p-2">
              <NavigationMenuLink href="/dashboard" className={menuItemClass}>
                Dashboard
              </NavigationMenuLink>
              <NavigationMenuLink
                href="/dashboard/students"
                className={menuItemClass}
              >
                Students
              </NavigationMenuLink>
              <NavigationMenuLink
                href="/dashboard/attendance"
                className={menuItemClass}
              >
                Attendance
              </NavigationMenuLink>

              <LogoutConfirmDialog
                onConfirm={handleLogout}
                triggerButton={
                  <button className={menuItemClass} disabled={isLoggingOut}>
                    {isLoggingOut ? (
                      <span className="flex items-center">
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Signing out...
                      </span>
                    ) : (
                      "Signout"
                    )}
                  </button>
                }
              />
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default UserNav;
