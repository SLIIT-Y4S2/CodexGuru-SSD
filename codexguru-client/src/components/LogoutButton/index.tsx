"use client";
import { useLogout } from "@/hooks/auth/useLogout";
import { Button } from "antd";
import { useRouter } from "next/navigation";

const LogoutButton = () => {
  const { logout } = useLogout();
  const router = useRouter();
  const handleLogout = async () => {
    logout();
    router.push("/login");
  };
  return (
    <Button type="primary" onClick={handleLogout}>
      Logout
    </Button>
  );
};

export default LogoutButton;
