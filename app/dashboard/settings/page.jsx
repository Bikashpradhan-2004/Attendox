"use client";
import LogoutConfirmDialog from "@/components/dashboard/Header/LogoutConfirmDialog";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const Settings = () => {
  const router = useRouter();
  const handleLogout = () => {
    router.push("/api/auth/logout");
  };
  return (
    <div className="h-screen flex items-center justify-center">
      <LogoutConfirmDialog
        onConfirm={handleLogout}
        triggerButton={
          <Button className="shadow-lg shadow-blue-400/50">Signout</Button>
        }
      />
    </div>
  );
};
export default Settings;
