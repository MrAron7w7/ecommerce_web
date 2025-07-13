import { Sidebar } from "@/components/dashboard/side-bar";
import React from "react";

function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-6 bg-gray-50">{children}</main>
    </div>
  );
}

export default layout;
