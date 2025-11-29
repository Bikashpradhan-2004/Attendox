"use client";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import Image from "next/image";
const Header = () => {
  const { user } = useKindeBrowserClient();

  const profileImageUrl = user?.picture;
  return (
    <div className="p-4 shadow-sm border flex justify-between">
      <div></div>
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
    </div>
  );
};

export default Header;
