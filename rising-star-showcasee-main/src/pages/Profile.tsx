import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Music, Users, Settings, Calendar, Link as LinkIcon } from "lucide-react";
import { useData } from "@/context/DataContext";
import { useAuth } from "@/contexts/AuthContext";
import { VerificationBadge } from "@/components/ui/verification-badge";
import Layout from "@/components/layout/Layout";
import Post from "@/components/post/Post";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";

const Profile: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { getUser, userPosts, toggleFollowUser, currentUser } = useData();
  const { user: authUser } = useAuth();
  const [activeTab, setActiveTab] = useState("posts");
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // If no ID is provided, use the current user's profile
  // Check both authentication contexts to ensure we're getting a user
  const profileId = id || (currentUser?.id || (authUser?.id || ""));
  const user = getUser(profileId);
  const posts = userPosts(profileId);
  
  // Check if this is the current user's profile
  const isCurrentUser = (currentUser && user && currentUser.id === user.id) || 
                        (authUser && user && authUser.id === user.id);
  
  useEffect(() => {
    // If we're trying to view our own profile and there's no profile data yet,
    // we can show a toast message suggesting to complete profile setup
    if (!id && !user && (currentUser || authUser)) {
      toast({
        title: "Profile Setup",
        description: "Your profile is being set up. Some features may be limited until setup is complete.",
      });
    }
  }, [id, user, currentUser, authUser, toast]);

  // Handle share profile
  const handleShareProfile = () => {
    if (navigator.share) {
      navigator.share({
        title: `${user?.name}'s Profile`,
        url: window.location.href,
      }).catch(err => console.error("Error sharing:", err));
    } else {
      // Fallback to copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link copied",
        description: "Profile link copied to clipboard",
      });
    }
  };

  if (!user) {
    return (
      <Layout>
        <div className="flex flex-col items-center justify-center py-12">
          <h1 className="text-2xl font-bold">User not found</h1>
          <p className="mt-2 text-muted-foreground">
            The user you're looking for doesn't exist or has been removed.
          </p>
          <Button 
            variant="outline" 
            className="mt-4"
            onClick={() => navigate("/")}
          >
            Return to Home
          </Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div>
        {/* Cover Photo */}
        <div className="relative h-32 w-full bg-gradient-to-r from-primary/20 to-primary/5 sm:h-48">
          {isCurrentUser && (
            <Button
              size="sm"
              variant="secondary"
              className="absolute bottom-4 right-4"
            >
              Edit Cover
            </Button>
          )}
        </div>

        {/* Profile Header */}
        <div className="border-b">
          <div className="container relative px-4">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between">
              <div className="flex items-end -mt-10 sm:-mt-16">
                <Avatar className="mr-4 h-20 w-20 border-4 border-background sm:h-32 sm:w-32">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback>{user.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div className="mb-4">
                  <h1 className="text-xl font-bold sm:text-2xl">
                    {user.name}
                    {user.isVerified && <VerificationBadge />}
                  </h1>
                  <p className="text-muted-foreground">@{user.username}</p>
                </div>
              </div>

              <div className="mb-4 mt-2 flex items-center sm:mb-6">
                {isCurrentUser ? (
                  <Button variant="outline" className="mr-2">
                    <Settings className="mr-2 h-4 w-4" />
                    Edit Profile
                  </Button>
                ) : (
                  <Button
                    variant={user.isFollowing ? "outline" : "default"}
                    onClick={() => toggleFollowUser(user.id)}
                    className="mr-2"
                  >
                    {user.isFollowing ? "Following" : "Follow"}
                  </Button>
                )}
                <Button variant="outline" onClick={handleShareProfile}>
                  <LinkIcon className="mr-2 h-4 w-4" />
                  Share
                </Button>
              </div>
            </div>

            <div className="mb-4 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <div>
                <h2 className="text-sm font-medium text-muted-foreground">
                  Followers
                </h2>
                <p className="text-xl font-bold">
                  {user.followerCount.toLocaleString()}
                </p>
              </div>
              <div>
                <h2 className="text-sm font-medium text-muted-foreground">
                  Following
                </h2>
                <p className="text-xl font-bold">
                  {user.followingCount.toLocaleString()}
                </p>
              </div>
            </div>

            <div className="mb-6">
              <p className="whitespace-pre-line">{user.bio}</p>
            </div>
          </div>

          <Tabs
            defaultValue="posts"
            value={activeTab}
            onValueChange={setActiveTab}
            className="container px-4"
          >
            <TabsList className="grid w-full grid-cols-3 sm:w-auto">
              <TabsTrigger value="posts" className="flex items-center space-x-2">
                <Music className="h-4 w-4" />
                <span>Posts</span>
              </TabsTrigger>
              <TabsTrigger value="about" className="flex items-center space-x-2">
                <Users className="h-4 w-4" />
                <span>About</span>
              </TabsTrigger>
              <TabsTrigger value="archive" className="flex items-center space-x-2">
                <Calendar className="h-4 w-4" />
                <span>Archive</span>
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Profile Content */}
        <div className="container px-4 py-6">
          <Tabs value={activeTab} className="mt-6">
            <TabsContent value="posts" className="mt-0">
              {posts.length > 0 ? (
                posts.map((post) => <Post key={post.id} post={post} />)
              ) : (
                <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
                  <h3 className="text-lg font-medium">No posts yet</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    This artist hasn't shared any posts yet.
                  </p>
                </div>
              )}
            </TabsContent>
            <TabsContent value="about" className="mt-0">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium">About {user.name}</h3>
                  <p className="mt-2 whitespace-pre-line text-muted-foreground">
                    {user.bio || "No bio provided."}
                  </p>
                </div>
                <Separator />
                <div>
                  <h3 className="text-lg font-medium">Links</h3>
                  <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2">
                    <Button
                      variant="outline"
                      className="justify-start"
                      asChild
                    >
                      <a
                        href="#"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center"
                      >
                        <Music className="mr-2 h-4 w-4" />
                        <span>Spotify</span>
                      </a>
                    </Button>
                    <Button
                      variant="outline"
                      className="justify-start"
                      asChild
                    >
                      <a
                        href="#"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center"
                      >
                        <Users className="mr-2 h-4 w-4" />
                        <span>SoundCloud</span>
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="archive" className="mt-0">
              <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
                <h3 className="text-lg font-medium">No archived posts</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Archived posts will appear here.
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
