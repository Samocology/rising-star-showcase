
import React from "react";
import { useData } from "@/context/DataContext";
import Layout from "@/components/layout/Layout";
import Post from "@/components/post/Post";
import CreatePost from "@/components/post/CreatePost";

const Home: React.FC = () => {
  const { feedPosts } = useData();

  return (
    <Layout>
      <div className="py-6">
        <h1 className="mb-6 text-2xl font-bold">Home Feed</h1>
        
        <CreatePost />
        
        <div className="space-y-4">
          {feedPosts.length > 0 ? (
            feedPosts.map((post) => (
              <Post key={post.id} post={post} />
            ))
          ) : (
            <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
              <h3 className="text-lg font-medium">No posts yet</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Follow some artists to see their posts here.
              </p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Home;
