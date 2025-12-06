"use client";

import { useSidebar } from "@/context/SidebarContext";
import AppHeader from "@/layout/AppHeader";
import AppSidebar from "@/layout/AppSidebar";
import Backdrop from "@/layout/Backdrop";
import React from "react";

interface AdminLayoutClientProps {
  children: React.ReactNode;
  authUser?: { name?: string | null; email?: string | null; userId?: string } | null;
}


export default function AdminLayoutClient({ children, authUser }: AdminLayoutClientProps) {
  const { isExpanded, isHovered, isMobileOpen } = useSidebar();

  const mainContentMargin = isMobileOpen
    ? "ml-0"
    : isExpanded || isHovered
      ? "lg:ml-[290px]"
      : "lg:ml-[90px]";

  return (
    <div className="min-h-screen xl:flex">
      <AppSidebar />
      <Backdrop />

      {/* Main content: pass authUser into AppHeader and render children */}
      <div className={`flex-1 transition-all duration-300 ease-in-out ${mainContentMargin}`}>
        <AppHeader authUser={authUser as { name?: string | null } | undefined} />
        <main className="p-4 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}