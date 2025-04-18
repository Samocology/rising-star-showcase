import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useData } from "@/context/DataContext";
import Layout from "@/components/layout/Layout";
import ArtistCard from "@/components/artist/ArtistCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Discover: React.FC = () => {
  const { users, toggleFollowUser } = useData();
  const location = useLocation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("trending");
  
  const searchParams = new URLSearchParams(location.search);
  const categoryParam = searchParams.get("category") || "trending";
  
  useEffect(() => {
    if (["trending", "new", "artists", "genres"].includes(categoryParam)) {
      setActiveTab(categoryParam === "artists" ? "artists" : categoryParam);
    }
  }, [categoryParam]);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    navigate(`/discover?category=${value}`);
  };

  const artists = users.slice().sort(() => Math.random() - 0.5);
  const trendingArtists = artists.slice(0, 3);
  const newArtists = artists.slice(1, 4);
  const topArtists = artists.slice(2, 5);

  const genres = [
    "Hip Hop", "R&B", "Pop", "Rock", "Electronic", "Jazz",
    "Classical", "Indie", "Alternative", "Latin", "Reggae", "Country"
  ];

  return (
    <Layout>
      <div className="py-6">
        <h1 className="mb-6 text-2xl font-bold">Discover</h1>
        
        <Tabs value={activeTab} onValueChange={handleTabChange}>
          <TabsList className="mb-6">
            <TabsTrigger value="trending">Trending</TabsTrigger>
            <TabsTrigger value="new">New Releases</TabsTrigger>
            <TabsTrigger value="artists">Top Artists</TabsTrigger>
            <TabsTrigger value="genres">Genres</TabsTrigger>
          </TabsList>
          
          <TabsContent value="trending">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {trendingArtists.map((user) => (
                <ArtistCard
                  key={user.id}
                  user={user}
                  onFollow={() => toggleFollowUser(user.id)}
                />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="new">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {newArtists.map((user) => (
                <ArtistCard
                  key={user.id}
                  user={user}
                  onFollow={() => toggleFollowUser(user.id)}
                />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="artists">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {topArtists.map((user) => (
                <ArtistCard
                  key={user.id}
                  user={user}
                  onFollow={() => toggleFollowUser(user.id)}
                />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="genres">
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
              {genres.map((genre) => (
                <div
                  key={genre}
                  className="flex h-24 items-center justify-center rounded-lg bg-gradient-to-br from-primary/10 to-primary/30 p-4 text-center font-medium transition-transform hover:scale-105 cursor-pointer"
                  onClick={() => {
                    console.log(`Selected genre: ${genre}`);
                  }}
                >
                  {genre}
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Discover;
