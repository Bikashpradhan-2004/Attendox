"use client";
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

const UserNav = () => {
  const { user } = useKindeBrowserClient();
  const profileImageUrl = user?.picture;

  const handleLogout = () => {
    window.location.replace("/api/auth/logout");
  };

  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="cursor-pointer bg-blue-100 py-5 px-3 rounded-full">
            <div>
              {profileImageUrl && (
                <Image
                  src={profileImageUrl}
                  width={35}
                  height={35}
                  alt="user"
                  className="rounded-full"
                />
              )}
            </div>
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="w-40 flex flex-col gap-1 text-lg font-semibold">
              <NavigationMenuLink href="/dashboard">
                Dashboard
              </NavigationMenuLink>
              <NavigationMenuLink href="/dashboard/students">
                Students
              </NavigationMenuLink>
              <NavigationMenuLink href="/dashboard/attendance">
                Attendance
              </NavigationMenuLink>

              <LogoutConfirmDialog
                onConfirm={handleLogout}
                triggerButton={
                  <div className="w-40 flex flex-col gap-1 text-lg font-semibold">
                    <button className="hover:bg-blue-700 hover:text-white focus:bg-blue-600 rounded-sm p-2 text-sm transition-all text-left w-full cursor-pointer">
                      Signout
                    </button>
                  </div>
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
