
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import { Heart } from "lucide-react";
import { useData } from "@/context/DataContext";
import { VerificationBadge } from "@/components/ui/verification-badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";

interface CommentSectionProps {
  postId: string;
}

const CommentSection: React.FC<CommentSectionProps> = ({ postId }) => {
  const { currentUser, postComments, addComment, toggleLikeComment } = useData();
  const [commentText, setCommentText] = useState("");
  const comments = postComments(postId);

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (commentText.trim()) {
      addComment(postId, commentText);
      setCommentText("");
    }
  };

  return (
    <div className="border-t px-4 py-3">
      <div className="mb-4">
        <form onSubmit={handleSubmitComment} className="flex items-start space-x-2">
          {currentUser && (
            <Avatar className="h-8 w-8">
              <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
              <AvatarFallback>{currentUser.name.charAt(0)}</AvatarFallback>
            </Avatar>
          )}
          <div className="flex-1">
            <Textarea
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Add a comment..."
              className="min-h-[60px] resize-none"
            />
            <div className="mt-2 flex justify-end">
              <Button type="submit" size="sm" disabled={!commentText.trim()}>
                Post
              </Button>
            </div>
          </div>
        </form>
      </div>

      {comments.length > 0 && (
        <div className="space-y-4">
          <Separator />
          <h4 className="text-sm font-medium">Comments ({comments.length})</h4>
          <div className="space-y-4">
            {comments.map((comment) => (
              <div key={comment.id} className="flex space-x-2">
                <Link to={`/profile/${comment.user.id}`}>
                  <Avatar className="h-8 w-8">
                    <AvatarImage
                      src={comment.user.avatar}
                      alt={comment.user.name}
                    />
                    <AvatarFallback>{comment.user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                </Link>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center space-x-2">
                    <Link
                      to={`/profile/${comment.user.id}`}
                      className="text-sm font-medium hover:underline"
                    >
                      {comment.user.name}
                      {comment.user.isVerified && (
                        <VerificationBadge />
                      )}
                    </Link>
                    <span className="text-xs text-muted-foreground">
                      {formatDistanceToNow(new Date(comment.createdAt), {
                        addSuffix: true,
                      })}
                    </span>
                  </div>
                  <p className="text-sm">{comment.content}</p>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className={`flex h-6 items-center space-x-1 px-2 text-xs ${
                        comment.isLiked ? "text-red-500" : ""
                      }`}
                      onClick={() => toggleLikeComment(comment.id)}
                    >
                      <Heart
                        className={`h-3 w-3 ${
                          comment.isLiked ? "fill-current text-red-500" : ""
                        }`}
                      />
                      <span>{comment.likeCount}</span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 px-2 text-xs"
                    >
                      Reply
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CommentSection;
