"use client";
import { signOut } from "next-auth/react";
import { LogIn } from "lucide-react";
function SignOutButton() {
  return (
    <button className="flex items-center space-x-2" onClick={() => signOut()}>
      <LogIn />
      <span>SignOut</span>
    </button>
  );
}

export default SignOutButton;
