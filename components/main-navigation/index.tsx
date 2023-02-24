"use client";

import Link from "next/link";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import Button from "../ui/button";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import withSession from "@/hoc/with-session";

function MainNavigation() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const session = useSession();
  const router = useRouter();
  async function logoutHandler() {
    await signOut({
      redirect: false,
    });
    router.replace("/");
  }
  useEffect(() => {
    if (session.status === "authenticated") {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [session]);
  return (
    <nav className="text-white font-bold py-4">
      <ul className="flex items-center">
        {isLoggedIn ? (
          <>
            <li>
              <Link href="/posts" className="m-2 px-3 py-2 flex">
                <MagnifyingGlassIcon className="w-6 h-6 items-center" />
                Search
              </Link>
            </li>
            <li>
              <Button theme="light" onClick={logoutHandler}>
                Logout
              </Button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link href="/register" className="m-2 px-3 py-2">
                Sign up
              </Link>
            </li>
            <li>
              <Link href="/login" className="m-2 px-3 py-2">
                Login
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default withSession(MainNavigation);
