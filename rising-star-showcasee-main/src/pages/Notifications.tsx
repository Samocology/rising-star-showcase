
import React from "react";
import { formatDistanceToNow } from "date-fns";
import { Heart, MessageCircle, UserPlus, Star, Music } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useData } from "@/context/DataContext";

// Mock notification data
const mockNotifications = [
  {
    id: "1",
    type: "like",
    userId: "1",
    postId: "3",
    read: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 10).toISOString(), // 10 minutes ago
  },
  {
    id: "2",
    type: "comment",
    userId: "2",
    postId: "1",
    read: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 minutes ago
  },
  {
    id: "3",
    type: "follow",
    userId: "4",
    read: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
  },
  {
    id: "4",
    type: "mention",
    userId: "3",
    postId: "2",
    read: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(), // 5 hours ago
  },
  {
    id: "5",
    type: "feature",
    userId: "5",
    read: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
  },
];

const NotificationItem = ({ notification, users, getPost }) => {
  const user = users.find((u) => u.id === notification.userId);
  const post = notification.postId ? getPost(notification.postId) : null;

  if (!user) return null;

  const getNotificationContent = () => {
    switch (notification.type) {
      case "like":
        return (
          <>
            <div className="mr-2 flex h-9 w-9 items-center justify-center rounded-full bg-red-100">
              <Heart className="h-5 w-5 text-red-500" />
            </div>
            <div className="flex-1">
              <p>
                <span className="font-medium">{user.name}</span> liked your post
              </p>
              {post && (
                <p className="text-sm text-muted-foreground line-clamp-1">
                  {post.content}
                </p>
              )}
            </div>
          </>
        );
      case "comment":
        return (
          <>
            <div className="mr-2 flex h-9 w-9 items-center justify-center rounded-full bg-blue-100">
              <MessageCircle className="h-5 w-5 text-blue-500" />
            </div>
            <div className="flex-1">
              <p>
                <span className="font-medium">{user.name}</span> commented on your post
              </p>
              {post && (
                <p className="text-sm text-muted-foreground line-clamp-1">
                  {post.content}
                </p>
              )}
            </div>
          </>
        );
      case "follow":
        return (
          <>
            <div className="mr-2 flex h-9 w-9 items-center justify-center rounded-full bg-green-100">
              <UserPlus className="h-5 w-5 text-green-500" />
            </div>
            <div className="flex-1">
              <p>
                <span className="font-medium">{user.name}</span> started following you
              </p>
            </div>
          </>
        );
      case "mention":
        return (
          <>
            <div className="mr-2 flex h-9 w-9 items-center justify-center rounded-full bg-purple-100">
              <MessageCircle className="h-5 w-5 text-purple-500" />
            </div>
            <div className="flex-1">
              <p>
                <span className="font-medium">{user.name}</span> mentioned you in a comment
              </p>
              {post && (
                <p className="text-sm text-muted-foreground line-clamp-1">
                  {post.content}
                </p>
              )}
            </div>
          </>
        );
      case "feature":
        return (
          <>
            <div className="mr-2 flex h-9 w-9 items-center justify-center rounded-full bg-yellow-100">
              <Star className="h-5 w-5 text-yellow-500" />
            </div>
            <div className="flex-1">
              <p>
                <span className="font-medium">{user.name}</span> featured your track in their playlist
              </p>
            </div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div
      className={`flex rounded-lg p-4 transition-colors ${
        !notification.read ? "bg-primary/5" : ""
      }`}
    >
      <Avatar className="mr-3">
        <AvatarImage src={user.avatar} alt={user.name} />
        <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
      </Avatar>
      <div className="flex flex-1 items-start">
        {getNotificationContent()}
        <div className="ml-2 text-xs text-muted-foreground">
          {formatDistanceToNow(new Date(notification.createdAt), {
            addSuffix: true,
          })}
        </div>
      </div>
    </div>
  );
};

const Notifications: React.FC = () => {
  const { users, getPost } = useData();
  const [notifications, setNotifications] = React.useState(mockNotifications);

  const markAllAsRead = () => {
    setNotifications(
      notifications.map((notification) => ({ ...notification, read: true }))
    );
  };

  return (
    <Layout>
      <div className="py-6">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold">Notifications</h1>
          <Button variant="outline" size="sm" onClick={markAllAsRead}>
            Mark all as read
          </Button>
        </div>

        <div className="space-y-2">
          {notifications.map((notification) => (
            <NotificationItem
              key={notification.id}
              notification={notification}
              users={users}
              getPost={getPost}
            />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Notifications;
