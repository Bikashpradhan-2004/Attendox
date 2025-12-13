"use client";
import Image from "next/image";
import { MdDashboard } from "react-icons/md";
import { PiStudent } from "react-icons/pi";
import { HiOutlineHandRaised } from "react-icons/hi2";
import { IoSettingsOutline } from "react-icons/io5";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import Link from "next/link";
import { usePathname } from "next/navigation";

const SideNav = () => {
  const { user } = useKindeBrowserClient();
  const profileImageUrl = user?.picture;
  const pathname = usePathname();

  const menuList = [
    {
      name: "Dashboard",
      icon: <MdDashboard />,
      path: "/dashboard",
    },
    {
      name: "Students",
      icon: <PiStudent />,
      path: "/dashboard/students",
    },
    {
      name: "Attendance",
      icon: <HiOutlineHandRaised />,
      path: "/dashboard/attendance",
    },
    {
      name: "Settings",
      icon: <IoSettingsOutline />,
      path: "/dashboard/settings",
    },
  ];

  return (
    <div className="border shadow-md h-screen p-5 relative">
      <Image src="/images/attendox.png" width={180} height={50} alt="logo" />
      <hr className="my-5"></hr>
      {menuList.map((menu) => (
        <Link href={menu.path} key={menu.name}>
          <h2
            className={`flex items-center gap-3 text-md px-3 py-4 text-slate-500 hover:bg-primary hover:text-white cursor-pointer rounded-lg my-2 transition ${
              pathname === menu.path && "bg-primary text-white"
            }`}
          >
            <div className="text-2xl">{menu.icon}</div>
            {menu.name}
          </h2>
        </Link>
      ))}
      <div className="flex gap-2 items-center absolute bottom-10 left-5">
        {profileImageUrl && (
          <Image
            src={profileImageUrl}
            width={35}
            height={35}
            alt="user"
            className="rounded-full"
          />
        )}
        <div>
          <h2 className="text-sm font-bold">
            {user?.given_name} {user?.family_name}
          </h2>
          <h2 className="text-xs text-slate-400">{user?.email}</h2>
        </div>
      </div>
    </div>
  );
};

export default SideNav;
