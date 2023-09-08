"use client";
import React from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import Link from "next/link";

const Header = () => {
  const { data: session } = useSession();
  const pathname = usePathname();

  const hideHeader = pathname === "/login";
  if (hideHeader) return null;
  return (
    <div className="bg-black text-white flex justify-between items-center">
      <Link
        href={
          session?.user.role == "admin"
            ? "/admin"
            : session?.user.role == "instructor"
            ? "/instructor"
            : "/"
        }
      >
        <h1 className=" text-4xl font-bold p-2 cursor-pointer">CodexGuru</h1>
      </Link>
      <div className="flex justify-center align-middle gap-2">
        <p className="text-yellow-50">
          {session?.user?.firstName} {session?.user?.lastName}
        </p>
        {!session && (
          <Link href="login">
            <button>Sign in</button>
          </Link>
        )}
        <button onClick={() => signOut()}>Sign out</button>
      </div>
    </div>
  );
};

export default Header;
