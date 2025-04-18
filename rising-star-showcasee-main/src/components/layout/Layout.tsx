
import React from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { cn } from "@/lib/utils";

interface LayoutProps {
  children: React.ReactNode;
  showSidebar?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ 
  children, 
  showSidebar = true 
}) => {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <div className="container flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10">
        {showSidebar && (
          <aside className="fixed top-14 z-30 -ml-2 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 md:sticky md:block">
            <Sidebar />
          </aside>
        )}
        <main className={cn(
          "flex w-full flex-col overflow-hidden", 
          showSidebar ? "md:col-span-1" : "md:col-span-2"
        )}>
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
