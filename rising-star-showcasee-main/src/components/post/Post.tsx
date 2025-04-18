
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import { Heart, MessageCircle, Share2, MoreHorizontal } from "lucide-react";
import { useData, Post as PostType } from "@/context/DataContext";
import { VerificationBadge } from "@/components/ui/verification-badge";
import { AnimatedLikeButton } from "@/components/ui/animated-like-button";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import CommentSection from "./CommentSection";

interface PostProps {
  post: PostType & { user: any };
  showComments?: boolean;
}

const Post: React.FC<PostProps> = ({ post, showComments = false }) => {
  const { toggleLikePost } = useData();
  const [commentsVisible, setCommentsVisible] = useState(showComments);

  const handleLike = () => {
    toggleLikePost(post.id);
  };

  const toggleComments = () => {
    setCommentsVisible(!commentsVisible);
  };

  return (
    <Card className="mb-4 overflow-hidden shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 px-4 py-3">
        <div className="flex items-center space-x-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src={post.user.avatar} alt={post.user.name} />
            <AvatarFallback>{post.user.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <Link
              to={`/profile/${post.user.id}`}
              className="font-medium hover:underline"
            >
              {post.user.name}
              {post.user.isVerified && (
                <VerificationBadge />
              )}
            </Link>
            <p className="text-xs text-muted-foreground">
              {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
            </p>
          </div>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreHorizontal className="h-4 w-4" />
              <span className="sr-only">More options</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Save Post</DropdownMenuItem>
            <DropdownMenuItem>Copy Link</DropdownMenuItem>
            <DropdownMenuItem>Follow {post.user.name}</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive">
              Report
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>

      <CardContent className="px-4 py-0">
        <p className="mb-3 whitespace-pre-line text-sm">{post.content}</p>
        {post.mediaUrl && (
          <div className="relative -mx-4 mb-3 aspect-video sm:aspect-auto sm:mx-0 sm:rounded-md overflow-hidden">
            {post.mediaType === "image" ? (
              <img
                src={post.mediaUrl}
                alt="Post content"
                className="h-full w-full object-cover"
              />
            ) : post.mediaType === "video" ? (
              <video
                src={post.mediaUrl}
                controls
                className="h-full w-full object-cover"
              />
            ) : post.mediaType === "audio" ? (
              <div className="flex h-full w-full items-center justify-center bg-black/5 p-4">
                <audio src={post.mediaUrl} controls className="w-full" />
              </div>
            ) : null}
          </div>
        )}
      </CardContent>

      <CardFooter className="flex items-center justify-between px-4 py-3">
        <div className="flex space-x-4">
          <AnimatedLikeButton 
            isLiked={post.isLiked}
            likeCount={post.likeCount}
            onToggleLike={handleLike}
          />
          <Button
            variant="ghost"
            size="sm"
            className="flex items-center space-x-1"
            onClick={toggleComments}
          >
            <MessageCircle className="h-4 w-4" />
            <span>{post.commentCount}</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="flex items-center space-x-1"
          >
            <Share2 className="h-4 w-4" />
            <span>Share</span>
          </Button>
        </div>
      </CardFooter>

      {commentsVisible && <CommentSection postId={post.id} />}
    </Card>
  );
};

export default Post;
