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
import { useRouter } from "next/navigation";
import LogoutConfirmDialog from "./LogoutConfirmDialog";

const UserNav = () => {
  const { user } = useKindeBrowserClient();
  const router = useRouter();
  const profileImageUrl = user?.picture;

  const handleLogout = () => {
    router.push("/api/auth/logout");
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
                    <button className="data-[active=true]:focus:bg-blue-500 data-[active=true]:hover:bg-blue-500 data-[active=true]:bg-blue-500/50 data-[active=true]:text-white hover:bg-blue-500 hover:text-white focus:bg-blue-500 focus:text-white focus-visible:ring-ring/50 [&_svg:not([class*='text-'])]:text-muted-foreground flex flex-col gap-1 rounded-sm p-2 text-sm transition-all outline-none focus-visible:ring-[3px] focus-visible:outline-1 [&_svg:not([class*='size-'])]:size-4 text-left w-full">
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
