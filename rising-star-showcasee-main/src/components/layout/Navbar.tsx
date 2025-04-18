
import React from "react";
import { Link } from "react-router-dom";
import { Bell, Home, PlusSquare, Search, LogOut } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const Navbar: React.FC = () => {
  const { user, signOut } = useAuth();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-4 flex">
          <Link to="/" className="flex items-center">
            <span className="text-xl font-bold text-primary">
              RisingStar
            </span>
          </Link>
        </div>
        
        <div className="flex w-full justify-center md:justify-start">
          <nav className="flex items-center space-x-1 md:space-x-2">
            <Button variant="ghost" size="icon" asChild>
              <Link to="/" className="group">
                <Home className="h-5 w-5 transition-colors group-hover:text-primary" />
                <span className="sr-only">Home</span>
              </Link>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <Link to="/discover" className="group">
                <Search className="h-5 w-5 transition-colors group-hover:text-primary" />
                <span className="sr-only">Discover</span>
              </Link>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <Link to="/create" className="group">
                <PlusSquare className="h-5 w-5 transition-colors group-hover:text-primary" />
                <span className="sr-only">Create</span>
              </Link>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <Link to="/notifications" className="group relative">
                <Bell className="h-5 w-5 transition-colors group-hover:text-primary" />
                <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-white">
                  3
                </span>
                <span className="sr-only">Notifications</span>
              </Link>
            </Button>
          </nav>
        </div>
        
        <div className="flex items-center justify-end space-x-4">
          {user ? (
            <>
              <Button variant="ghost" size="sm" onClick={signOut}>
                <LogOut className="h-5 w-5" />
                <span className="sr-only">Sign Out</span>
              </Button>
              <Button variant="ghost" size="sm" asChild>
                <Link to="/profile" className="flex items-center space-x-2">
                  <div className="relative h-8 w-8 overflow-hidden rounded-full">
                    <img 
                      src={user.user_metadata?.avatar_url || 'https://github.com/shadcn.png'} 
                      alt={user.email || 'User'} 
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <span className="hidden md:inline-block">
                    {user.email}
                  </span>
                </Link>
              </Button>
            </>
          ) : (
            <Button variant="ghost" size="sm" asChild>
              <Link to="/login">Login</Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
