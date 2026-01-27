import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Camera } from "lucide-react";
import PostsFeed from "@/functions/posts/components/PostFeed";
import { getFeed } from "@/services/posts.service";
import { useNavigate } from "react-router-dom";
import type { Post, User } from "@/types";

const mockUser: User = {
  id: "me",
  fullName: "Yuval Kot",
  avatar:
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop",
};

export default function Profile() {
  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState<User>(mockUser);
  const [tempName, setTempName] = useState(mockUser.fullName);
  const [tempAvatar, setTempAvatar] = useState<string | undefined>(
    mockUser.avatar
  );

  const [posts, setPosts] = useState<Post[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    void (async () => {
      const feed = await getFeed();
      setPosts(feed.filter((p) => p.createdBy.id === mockUser.id));
    })();
  }, []);

  const getInitials = (fullName: string) =>
    fullName
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);

  const handleEditToggle = () => {
    if (isEditing) {
      setUser((prev) => ({
        ...prev,
        fullName: tempName.trim() || prev.fullName,
        avatar: tempAvatar,
      }));
      setIsEditing(false);
      return;
    }

    setTempName(user.fullName);
    setTempAvatar(user.avatar);
    setIsEditing(true);
  };

  const handleCancel = () => {
    setTempName(user.fullName);
    setTempAvatar(user.avatar);
    setIsEditing(false);
  };

  const handleAvatarClick = () => {
    if (isEditing) fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setTempAvatar(url);
  };

  const handleOpenPost = (postId: string) => navigate(`/post/${postId}`);

  const handleLike = (postId: string) => {
    setPosts((prev) =>
      prev.map((p) =>
        p.id !== postId
          ? p
          : {
              ...p,
              isLikedByMe: !p.isLikedByMe,
              likesCount: p.isLikedByMe ? p.likesCount - 1 : p.likesCount + 1,
            }
      )
    );
  };

  return (
    <div className="min-h-screen pb-20 bg-background w-full max-w-3xl mx-auto">
      <header className="bg-card border-b border-border">
        <div className="px-4 py-6 flex items-center justify-between">
          <h1 className="text-xl font-semibold text-foreground">Profile</h1>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleEditToggle}
            className="text-primary font-medium"
          >
            {isEditing ? "Save" : "Edit"}
          </Button>
        </div>
      </header>

      <main className="w-full px-4 py-6">
        <div className="flex flex-col items-center mb-8">
          <div className="relative mb-4">
            <Avatar
              className={`size-24 ring-4 ring-primary/20 ${
                isEditing ? "cursor-pointer" : ""
              }`}
              onClick={handleAvatarClick}
            >
              <AvatarImage
                src={isEditing ? tempAvatar : user.avatar}
                alt={user.fullName}
              />
              <AvatarFallback className="text-2xl bg-primary/10 text-primary">
                {getInitials(isEditing ? tempName : user.fullName)}
              </AvatarFallback>
            </Avatar>

            {isEditing && (
              <button
                type="button"
                onClick={handleAvatarClick}
                className="absolute bottom-0 right-0 size-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-md"
                aria-label="Change profile picture"
              >
                <Camera className="size-4" />
              </button>
            )}

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
          </div>

          {isEditing ? (
            <input
              type="text"
              value={tempName}
              onChange={(e) => setTempName(e.target.value)}
              className="text-xl font-semibold text-foreground text-center bg-transparent border-b-2 border-primary outline-none px-2 py-1 mb-1"
              autoFocus
            />
          ) : (
            <h2 className="text-xl font-semibold text-foreground mb-1">
              {user.fullName}
            </h2>
          )}

          <p className="text-muted-foreground">Travel lover</p>

          {isEditing && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleCancel}
              className="mt-2 text-muted-foreground"
            >
              Cancel
            </Button>
          )}
        </div>

        <h3 className="text-lg font-semibold text-foreground mb-4">My Posts</h3>

        <PostsFeed
          posts={posts}
          onLike={handleLike}
          onOpenPost={handleOpenPost}
        />
      </main>
    </div>
  );
}
