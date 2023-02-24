"use client";

import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import Button from "../ui/button";

function LogoutButton() {
  const router = useRouter();
  async function logoutHandler() {
    await signOut({
      redirect: false,
    });
    router.replace("/");
  }
  return (
    <Button theme="light" onClick={logoutHandler}>
      Logout
    </Button>
  );
}

export default LogoutButton;
