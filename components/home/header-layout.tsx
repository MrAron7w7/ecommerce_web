import React from "react";
import NavLink from "./nav-link";
import { auth } from "@/lib/auth";

async function HeaderLayout() {
  const session = await auth();
  return <NavLink session={session} />;
}

export default HeaderLayout;
