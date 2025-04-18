
import React, { createContext, useContext, useState, useEffect } from "react";

// Types
export interface User {
  id: string;
  name: string;
  username: string;
  avatar: string;
  bio: string;
  isVerified: boolean;
  followerCount: number;
  followingCount: number;
  isFollowing: boolean;
}

export interface Post {
  id: string;
  userId: string;
  user?: User;
  content: string;
  mediaUrl?: string;
  mediaType?: "image" | "audio" | "video";
  likeCount: number;
  commentCount: number;
  isLiked: boolean;
  createdAt: string;
}

export interface Comment {
  id: string;
  postId: string;
  userId: string;
  user?: User;
  content: string;
  likeCount: number;
  isLiked: boolean;
  createdAt: string;
}

// Mock data
const mockUsers: User[] = [
  {
    id: "1",
    name: "Alex Johnson",
    username: "alexj_music",
    avatar: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=150&q=80",
    bio: "Indie producer and vocalist. Creating melodies that move you. 🎵",
    isVerified: true,
    followerCount: 12500,
    followingCount: 532,
    isFollowing: false,
  },
  {
    id: "2",
    name: "Maya Rivera",
    username: "maya_beats",
    avatar: "https://images.unsplash.com/photo-1569913486515-b74bf7751574?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=150&q=80",
    bio: "Beatmaker and DJ from Chicago. Let the rhythm guide you.",
    isVerified: false,
    followerCount: 3200,
    followingCount: 645,
    isFollowing: true,
  },
  {
    id: "3",
    name: "Jamal Wilson",
    username: "jamal_keys",
    avatar: "https://images.unsplash.com/photo-1504257432389-52343af06ae3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=150&q=80",
    bio: "Jazz pianist and composer. Music is the universal language.",
    isVerified: false,
    followerCount: 5600,
    followingCount: 425,
    isFollowing: false,
  },
  {
    id: "4",
    name: "Sophie Chen",
    username: "sophie_sound",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=150&q=80",
    bio: "Electronic music producer. Turning binary into beats.",
    isVerified: true,
    followerCount: 28900,
    followingCount: 312,
    isFollowing: true,
  },
  {
    id: "5",
    name: "David Kim",
    username: "dave_guitar",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=150&q=80",
    bio: "Guitarist and songwriter. Strumming through life one chord at a time.",
    isVerified: false,
    followerCount: 7450,
    followingCount: 853,
    isFollowing: false,
  },
];

const mockPosts: Post[] = [
  {
    id: "1",
    userId: "1",
    content: "Just dropped my latest track! Link in bio. Would love to hear your thoughts! #newmusic #indie",
    mediaUrl: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    mediaType: "image",
    likeCount: 324,
    commentCount: 42,
    isLiked: false,
    createdAt: "2023-06-15T10:30:00Z",
  },
  {
    id: "2",
    userId: "2",
    content: "Been working on this beat for days. Finally happy with how it turned out! #beatmaking #production",
    mediaUrl: "https://images.unsplash.com/photo-1571330735066-03aaa9429d89?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    mediaType: "image",
    likeCount: 187,
    commentCount: 23,
    isLiked: true,
    createdAt: "2023-06-14T14:45:00Z",
  },
  {
    id: "3",
    userId: "4",
    content: "Studio session vibes. Creating something special for you all. Stay tuned! ✨ #studiolife #newmusic",
    mediaUrl: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    mediaType: "image",
    likeCount: 567,
    commentCount: 89,
    isLiked: false,
    createdAt: "2023-06-13T20:15:00Z",
  },
  {
    id: "4",
    userId: "3",
    content: "Exploring new jazz harmonies on the piano today. Music theory is a never-ending journey. #jazz #piano",
    mediaUrl: "https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    mediaType: "image",
    likeCount: 243,
    commentCount: 31,
    isLiked: true,
    createdAt: "2023-06-12T09:20:00Z",
  },
  {
    id: "5",
    userId: "5",
    content: "New guitar day! This beauty sounds incredible. Can't wait to write some songs with it. #newgear #musician",
    mediaUrl: "https://images.unsplash.com/photo-1550291652-6ea9114a47b1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    mediaType: "image",
    likeCount: 412,
    commentCount: 56,
    isLiked: false,
    createdAt: "2023-06-11T16:35:00Z",
  },
];

const mockComments: Comment[] = [
  {
    id: "1",
    postId: "1",
    userId: "2",
    content: "This is fire! 🔥 The production quality is insane.",
    likeCount: 24,
    isLiked: false,
    createdAt: "2023-06-15T11:30:00Z",
  },
  {
    id: "2",
    postId: "1",
    userId: "3",
    content: "Loving the melody on this one. Would be down to collab sometime!",
    likeCount: 16,
    isLiked: true,
    createdAt: "2023-06-15T12:45:00Z",
  },
  {
    id: "3",
    postId: "2",
    userId: "4",
    content: "Those drums are hitting just right. What plugins are you using?",
    likeCount: 8,
    isLiked: false,
    createdAt: "2023-06-14T15:20:00Z",
  },
  {
    id: "4",
    postId: "3",
    userId: "5",
    content: "Can't wait to hear what you're working on!",
    likeCount: 21,
    isLiked: true,
    createdAt: "2023-06-13T21:10:00Z",
  },
  {
    id: "5",
    postId: "3",
    userId: "1",
    content: "Studio looking clean! What DAW do you use?",
    likeCount: 13,
    isLiked: false,
    createdAt: "2023-06-13T22:05:00Z",
  },
];

// Context interface
interface DataContextType {
  users: User[];
  posts: Post[];
  comments: Comment[];
  currentUser: User | null;
  feedPosts: (Post & { user: User })[];
  userPosts: (postUserId: string) => (Post & { user: User })[];
  postComments: (postId: string) => (Comment & { user: User })[];
  toggleLikePost: (postId: string) => void;
  toggleLikeComment: (commentId: string) => void;
  toggleFollowUser: (userId: string) => void;
  addComment: (postId: string, content: string) => void;
  createPost: (content: string, mediaUrl?: string, mediaType?: "image" | "audio" | "video") => void;
  getUser: (userId: string) => User | undefined;
  getPost: (postId: string) => (Post & { user: User }) | undefined;
  discoverUsers: User[];
}

// Create context
const DataContext = createContext<DataContextType | undefined>(undefined);

// Provider component
export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [posts, setPosts] = useState<Post[]>(mockPosts);
  const [comments, setComments] = useState<Comment[]>(mockComments);
  
  // For demo purposes, we'll set a mock current user
  const [currentUser, setCurrentUser] = useState<User | null>({
    id: "6",
    name: "Current User",
    username: "current_user",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=150&q=80",
    bio: "Rising artist trying to make it. Follow my journey!",
    isVerified: false,
    followerCount: 120,
    followingCount: 342,
    isFollowing: false,
  });

  // Process posts with user data for the feed
  const feedPosts = posts.map(post => ({
    ...post,
    user: users.find(u => u.id === post.userId) || mockUsers[0]
  })).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  // Get posts for a specific user
  const userPosts = (userId: string) => {
    return posts
      .filter(post => post.userId === userId)
      .map(post => ({
        ...post,
        user: users.find(u => u.id === post.userId) || mockUsers[0]
      }))
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  };

  // Get comments for a specific post
  const postComments = (postId: string) => {
    return comments
      .filter(comment => comment.postId === postId)
      .map(comment => ({
        ...comment,
        user: users.find(u => u.id === comment.userId) || mockUsers[0]
      }))
      .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
  };

  // Toggle like on a post
  const toggleLikePost = (postId: string) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { 
            ...post, 
            isLiked: !post.isLiked, 
            likeCount: post.isLiked ? post.likeCount - 1 : post.likeCount + 1 
          } 
        : post
    ));
  };

  // Toggle like on a comment
  const toggleLikeComment = (commentId: string) => {
    setComments(comments.map(comment => 
      comment.id === commentId 
        ? { 
            ...comment, 
            isLiked: !comment.isLiked, 
            likeCount: comment.isLiked ? comment.likeCount - 1 : comment.likeCount + 1 
          } 
        : comment
    ));
  };

  // Toggle follow on a user
  const toggleFollowUser = (userId: string) => {
    setUsers(users.map(user => 
      user.id === userId 
        ? { 
            ...user, 
            isFollowing: !user.isFollowing, 
            followerCount: user.isFollowing ? user.followerCount - 1 : user.followerCount + 1 
          } 
        : user
    ));
  };

  // Add a comment to a post
  const addComment = (postId: string, content: string) => {
    if (!currentUser) return;
    
    const newComment: Comment = {
      id: `comment-${Date.now()}`,
      postId,
      userId: currentUser.id,
      content,
      likeCount: 0,
      isLiked: false,
      createdAt: new Date().toISOString(),
    };
    
    setComments([...comments, newComment]);
    
    // Update comment count on the post
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, commentCount: post.commentCount + 1 } 
        : post
    ));
  };

  // Create a new post
  const createPost = (content: string, mediaUrl?: string, mediaType?: "image" | "audio" | "video") => {
    if (!currentUser) return;
    
    const newPost: Post = {
      id: `post-${Date.now()}`,
      userId: currentUser.id,
      content,
      mediaUrl,
      mediaType,
      likeCount: 0,
      commentCount: 0,
      isLiked: false,
      createdAt: new Date().toISOString(),
    };
    
    setPosts([newPost, ...posts]);
  };

  // Get a user by ID
  const getUser = (userId: string) => {
    return users.find(user => user.id === userId);
  };

  // Get a post by ID with user data
  const getPost = (postId: string) => {
    const post = posts.find(post => post.id === postId);
    if (!post) return undefined;
    
    return {
      ...post,
      user: users.find(u => u.id === post.userId) || mockUsers[0]
    };
  };

  // Get users for discover section (excluding current user)
  const discoverUsers = users
    .filter(user => currentUser && user.id !== currentUser.id)
    .sort(() => Math.random() - 0.5) // Randomize order
    .slice(0, 5); // Limit to 5 users for discover section

  return (
    <DataContext.Provider
      value={{
        users,
        posts,
        comments,
        currentUser,
        feedPosts,
        userPosts,
        postComments,
        toggleLikePost,
        toggleLikeComment,
        toggleFollowUser,
        addComment,
        createPost,
        getUser,
        getPost,
        discoverUsers
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

// Custom hook to use the data context
export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
};
