import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useData } from "@/context/DataContext";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { TrendingUp, Music, Mic, Hash } from "lucide-react";
import { VerificationBadge } from "@/components/ui/verification-badge";

const Sidebar: React.FC = () => {
  const { discoverUsers } = useData();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const currentCategory = searchParams.get("category");

  return (
    <ScrollArea className="h-full py-6 pr-6">
      <div className="space-y-6">
        <div className="space-y-3">
          <h3 className="text-sm font-medium">Discover</h3>
          <div className="space-y-1">
            <Button 
              variant={currentCategory === "trending" ? "secondary" : "ghost"} 
              size="sm" 
              className="w-full justify-start" 
              asChild
            >
              <Link to="/discover?category=trending">
                <TrendingUp className="mr-2 h-4 w-4" />
                Trending
              </Link>
            </Button>
            <Button 
              variant={currentCategory === "new" ? "secondary" : "ghost"} 
              size="sm" 
              className="w-full justify-start" 
              asChild
            >
              <Link to="/discover?category=new">
                <Music className="mr-2 h-4 w-4" />
                New Releases
              </Link>
            </Button>
            <Button 
              variant={currentCategory === "artists" ? "secondary" : "ghost"} 
              size="sm" 
              className="w-full justify-start" 
              asChild
            >
              <Link to="/discover?category=artists">
                <Mic className="mr-2 h-4 w-4" />
                Top Artists
              </Link>
            </Button>
            <Button 
              variant={currentCategory === "genres" ? "secondary" : "ghost"} 
              size="sm" 
              className="w-full justify-start" 
              asChild
            >
              <Link to="/discover?category=genres">
                <Hash className="mr-2 h-4 w-4" />
                Genres
              </Link>
            </Button>
          </div>
        </div>
        
        <div className="space-y-3">
          <h3 className="text-sm font-medium">Suggested Artists</h3>
          <div className="space-y-2">
            {discoverUsers.map((user) => (
              <Button
                key={user.id}
                variant="ghost"
                size="sm"
                className="w-full justify-start"
                asChild
              >
                <Link to={`/profile/${user.id}`} className="flex items-center">
                  <div className="relative mr-2 h-6 w-6 overflow-hidden rounded-full">
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="truncate flex items-center gap-1">
                    <span className="truncate font-medium">{user.name}</span>
                    {user.isVerified && <VerificationBadge className="h-3 w-3" />}
                  </div>
                </Link>
              </Button>
            ))}
          </div>
        </div>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium">Popular Tags</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {["#newmusic", "#indie", "#hiphop", "#electronic", "#jazz", "#rock", "#vocals", "#producer"].map((tag) => (
              <Button
                key={tag}
                variant="secondary"
                size="sm"
                className="rounded-full text-xs"
                asChild
              >
                <Link to={`/tags/${tag.substring(1)}`}>{tag}</Link>
              </Button>
            ))}
          </div>
        </div>
        
        <div className="space-y-2 pt-4 text-xs text-muted-foreground">
          <p>© 2025 RisingStar. All rights reserved. Made By Sam-Tech Innovations</p>
          <div className="flex space-x-3">
            <Link to="/about" className="hover:underline">About</Link>
            <Link to="/terms" className="hover:underline">Terms</Link>
            <Link to="/privacy" className="hover:underline">Privacy</Link>
          </div>
        </div>
      </div>
    </ScrollArea>
  );
};

export default Sidebar;

