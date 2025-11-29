"use client";
import Image from "next/image";
import { MdDashboard } from "react-icons/md";
import { PiStudent } from "react-icons/pi";
import { HiOutlineHandRaised } from "react-icons/hi2";
import { IoSettingsOutline } from "react-icons/io5";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";

const SideNav = () => {
  const { user } = useKindeBrowserClient();
  const profileImageUrl = user?.picture;
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
    <div className="border shadow-md h-screen p-5">
      <Image src="/images/attendox.png" width={180} height={50} alt="logo" />
      <hr className="my-5"></hr>
      {menuList.map((menu) => (
        <h2
          key={menu.name}
          className="flex items-center gap-3 text-md px-3 py-4 text-slate-500 hover:bg-primary hover:text-white cursor-pointer rounded-lg my-2 transition"
        >
          <div className="text-2xl">{menu.icon}</div>
          {menu.name}
        </h2>
      ))}
      <div className="flex gap-2 items-center bottom-10 fixed">
        {profileImageUrl && (
          <Image
            src={user?.picture}
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
