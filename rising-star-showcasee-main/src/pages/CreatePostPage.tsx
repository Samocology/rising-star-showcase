
import React from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import CreatePost from "@/components/post/CreatePost";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const CreatePostPage: React.FC = () => {
  const navigate = useNavigate();

  const handlePostSuccess = () => {
    navigate("/");
  };

  return (
    <Layout>
      <div className="container max-w-2xl py-6">
        <h1 className="mb-6 text-2xl font-bold">Create New Post</h1>
        
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Share your work</CardTitle>
            <CardDescription>
              Post your music, videos, images, or thoughts to connect with your audience.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <CreatePost onSuccess={handlePostSuccess} />
          </CardContent>
        </Card>

        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Posting Tips</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4 text-sm">
              <div className="grid grid-cols-[25px_1fr] items-start pb-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  1
                </span>
                <div className="space-y-1">
                  <p className="font-medium">Use hashtags</p>
                  <p className="text-muted-foreground">
                    Add relevant hashtags to help other users discover your content.
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-[25px_1fr] items-start pb-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  2
                </span>
                <div className="space-y-1">
                  <p className="font-medium">Add media</p>
                  <p className="text-muted-foreground">
                    Posts with images, audio, or video get more engagement.
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-[25px_1fr] items-start">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  3
                </span>
                <div className="space-y-1">
                  <p className="font-medium">Be consistent</p>
                  <p className="text-muted-foreground">
                    Regular posting helps build your audience and keeps them engaged.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default CreatePostPage;
