
import React from "react";
import { Link } from "react-router-dom";
import { User } from "@/context/DataContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface ArtistCardProps {
  user: User;
  onFollow: () => void;
}

const ArtistCard: React.FC<ArtistCardProps> = ({ user, onFollow }) => {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <div className="relative h-32 w-full bg-gradient-to-r from-primary/20 to-secondary/20"></div>
      <CardContent className="-mt-8 flex flex-col items-center p-6">
        <Avatar className="h-16 w-16 border-4 border-background">
          <AvatarImage src={user.avatar} alt={user.name} />
          <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <Link to={`/profile/${user.id}`}>
          <h3 className="mt-2 flex items-center text-lg font-medium hover:underline">
            {user.name}
            {user.isVerified && (
              <span className="ml-1 inline-flex items-center text-blue-500">
                ✓
              </span>
            )}
          </h3>
        </Link>
        <span className="text-sm text-muted-foreground">@{user.username}</span>
        <p className="mt-2 text-center text-sm line-clamp-2">{user.bio}</p>
        <div className="mt-3 flex w-full justify-between text-center text-sm">
          <div>
            <p className="font-medium">{user.followerCount.toLocaleString()}</p>
            <p className="text-xs text-muted-foreground">Followers</p>
          </div>
          <div>
            <p className="font-medium">{user.followingCount.toLocaleString()}</p>
            <p className="text-xs text-muted-foreground">Following</p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="border-t px-6 py-3">
        <Button
          className="w-full"
          variant={user.isFollowing ? "outline" : "default"}
          onClick={onFollow}
        >
          {user.isFollowing ? "Following" : "Follow"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ArtistCard;
