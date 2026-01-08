"use client";
import { useState } from "react";
import LogoutConfirmDialog from "@/components/dashboard/Header/LogoutConfirmDialog";
import { Button } from "@/components/ui/button";
import { LogOut, Loader2 } from "lucide-react";

const Settings = () => {
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = () => {
    setIsLoggingOut(true);
    window.location.href = "/api/auth/logout";
  };

  return (
    <div className="h-screen flex items-center justify-center">
      <LogoutConfirmDialog
        onConfirm={handleLogout}
        triggerButton={
          <Button 
            className="shadow-lg shadow-blue-400/50"
            disabled={isLoggingOut}
          >
            {isLoggingOut ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Signing out...
              </>
            ) : (
              <>
                <LogOut className="mr-2 h-4 w-4" />
                Signout
              </>
            )}
          </Button>
        }
      />
    </div>
  );
};

export default Settings;