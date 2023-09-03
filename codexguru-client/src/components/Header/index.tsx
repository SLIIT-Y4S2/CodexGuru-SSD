"use client";
import React, { useEffect } from "react";
import { useCurrentUser } from "@/hooks/auth/useCurrentUser";
import { redirect } from "next/navigation";

const Header = () => {
  const { user: currentUser } = useCurrentUser();

  return (
    <div className="bg-black text-white">Header {currentUser?.firstName}</div>
  );
};

export default Header;
