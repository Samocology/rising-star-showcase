import React, { useState } from "react";
import { Image, Music, Video, X, Send } from "lucide-react";
import { useData } from "@/context/DataContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

interface CreatePostProps {
  onSuccess?: () => void;
}

const CreatePost: React.FC<CreatePostProps> = ({ onSuccess }) => {
  const { currentUser, createPost } = useData();
  const [content, setContent] = useState("");
  const [mediaUrl, setMediaUrl] = useState<string | undefined>(undefined);
  const [mediaType, setMediaType] = useState<"image" | "audio" | "video" | undefined>(undefined);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim() && !mediaUrl) return;

    setIsSubmitting(true);
    createPost(content, mediaUrl, mediaType);
    
    // Reset form
    setContent("");
    setMediaUrl(undefined);
    setMediaType(undefined);
    setIsSubmitting(false);
    
    if (onSuccess) {
      onSuccess();
    }
  };

  const handleFileUpload = (type: "image" | "audio" | "video") => {
    if (type === "image") {
      setMediaUrl("https://images.unsplash.com/photo-1511379938547-c1f69419868d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80");
      setMediaType("image");
    } else if (type === "audio") {
      setMediaUrl("https://example.com/audio.mp3");
      setMediaType("audio");
    } else if (type === "video") {
      setMediaUrl("https://example.com/video.mp4");
      setMediaType("video");
    }
  };

  const clearMedia = () => {
    setMediaUrl(undefined);
    setMediaType(undefined);
  };

  if (!currentUser) return null;

  return (
    <Card className="mb-6 border-2 border-border/50 bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <form onSubmit={handleSubmit}>
        <CardContent className="p-4">
          <div className="flex gap-4">
            <Avatar className="h-10 w-10 shrink-0">
              <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
              <AvatarFallback>{currentUser.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-4">
              <Textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Share your music, thoughts, or updates..."
                className="min-h-[120px] resize-none border-none bg-transparent p-0 text-base focus-visible:ring-0 md:text-sm"
              />
              
              {mediaUrl && mediaType === "image" && (
                <div className="group relative mt-3 rounded-lg overflow-hidden">
                  <img 
                    src={mediaUrl} 
                    alt="Upload preview" 
                    className="max-h-[300px] w-full object-cover rounded-lg border border-border/50"
                  />
                  <Button
                    size="icon"
                    variant="secondary"
                    className="absolute right-2 top-2 h-8 w-8 rounded-full opacity-0 transition-opacity group-hover:opacity-100"
                    onClick={clearMedia}
                    type="button"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              )}
              
              {mediaUrl && mediaType === "audio" && (
                <div className="relative mt-3 rounded-lg bg-muted p-4">
                  <div className="flex items-center gap-2">
                    <Music className="h-8 w-8 text-primary" />
                    <span className="text-sm">Audio file ready to upload</span>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="absolute right-2 top-2 h-6 w-6"
                      onClick={clearMedia}
                      type="button"
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              )}
              
              {mediaUrl && mediaType === "video" && (
                <div className="relative mt-3 rounded-lg bg-muted p-4">
                  <div className="flex items-center gap-2">
                    <Video className="h-8 w-8 text-primary" />
                    <span className="text-sm">Video file ready to upload</span>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="absolute right-2 top-2 h-6 w-6"
                      onClick={clearMedia}
                      type="button"
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </CardContent>
        
        <CardFooter className="flex flex-wrap items-center justify-between gap-2 border-t px-4 py-3">
          <div className="flex flex-wrap gap-2">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="flex items-center gap-2"
              onClick={() => handleFileUpload("image")}
            >
              <Image className="h-4 w-4" />
              <span className="hidden sm:inline">Image</span>
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="flex items-center gap-2"
              onClick={() => handleFileUpload("audio")}
            >
              <Music className="h-4 w-4" />
              <span className="hidden sm:inline">Audio</span>
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="flex items-center gap-2"
              onClick={() => handleFileUpload("video")}
            >
              <Video className="h-4 w-4" />
              <span className="hidden sm:inline">Video</span>
            </Button>
          </div>
          <Button
            type="submit"
            className="flex items-center gap-2"
            disabled={isSubmitting || (!content.trim() && !mediaUrl)}
          >
            <Send className="h-4 w-4" />
            <span>Post</span>
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default CreatePost;
