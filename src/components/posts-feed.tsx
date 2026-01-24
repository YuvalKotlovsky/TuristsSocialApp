import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MapPin, MessageCircle, Heart } from "lucide-react";
import { Link } from "react-router-dom";

export interface Comment {
  id: number;
  author: string;
  text: string;
}

export interface Post {
  id: number;
  image: string;
  title: string;
  location: string;
  author?: {
    name: string;
    avatar: string;
  };
  comments?: Comment[];
  likes?: number;
  isLiked?: boolean;
}

interface PostsFeedProps {
  posts: Post[];
  showAuthor?: boolean;
}

export default function PostsFeed({
  posts,
  showAuthor = false,
}: PostsFeedProps) {
  const [likedPosts, setLikedPosts] = useState<Record<number, boolean>>(() => {
    const initial: Record<number, boolean> = {};
    for (const post of posts) {
      initial[post.id] = post.isLiked || false;
    }
    return initial;
  });

  const [likeCounts, setLikeCounts] = useState<Record<number, number>>(() => {
    const initial: Record<number, number> = {};
    for (const post of posts) {
      initial[post.id] = post.likes || 0;
    }
    return initial;
  });

  const handleLike = (postId: number) => {
    const isCurrentlyLiked = likedPosts[postId];
    setLikedPosts((prev) => ({
      ...prev,
      [postId]: !isCurrentlyLiked,
    }));
    setLikeCounts((prev) => ({
      ...prev,
      [postId]: isCurrentlyLiked ? prev[postId] - 1 : prev[postId] + 1,
    }));
  };

  return (
    <div className="flex flex-col gap-6">
      {posts.map((post) => {
        const commentsCount = post.comments?.length || 0;
        const isLiked = likedPosts[post.id];
        const likeCount = likeCounts[post.id];

        return (
          <Card
            key={post.id}
            className="rounded-xl bg-card border border-border shadow-sm overflow-hidden"
          >
            {/* Author Header */}
            {showAuthor && post.author && (
              <div className="flex items-center gap-3 p-4 border-b border-border">
                <Avatar className="size-10">
                  <AvatarImage
                    src={post.author.avatar || "/placeholder.svg"}
                    alt={post.author.name}
                  />
                  <AvatarFallback className="bg-primary/10 text-primary text-sm">
                    {post.author.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium text-foreground text-sm">
                    {post.author.name}
                  </p>
                  <div className="flex items-center gap-1">
                    <MapPin className="size-3 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">
                      {post.location}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Post Image */}
            <Link to={`/post/${post.id}`}>
              <div className="aspect-4/3 relative">
                <img
                  src={post.image || "/placeholder.svg"}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </Link>

            {/* Post Content */}
            <div className="p-4">
              <Link to={`/post/${post.id}`}>
                <h4 className="font-semibold text-foreground hover:text-primary transition-colors">
                  {post.title}
                </h4>
              </Link>
              {!showAuthor && (
                <div className="flex items-center gap-1 mt-1">
                  <MapPin className="size-3 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    {post.location}
                  </span>
                </div>
              )}

              {/* Actions Row */}
              <div className="flex items-center gap-4 mt-3">
                {/* Like Button */}
                <button
                  type="button"
                  onClick={() => handleLike(post.id)}
                  className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Heart
                    className={`size-5 transition-colors ${
                      isLiked ? "fill-red-500 text-red-500" : ""
                    }`}
                  />
                  <span className="text-sm">{likeCount}</span>
                </button>

                {/* Comments Link */}
                <Link
                  to={`/post/${post.id}`}
                  className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <MessageCircle className="size-5" />
                  <span className="text-sm">{commentsCount}</span>
                </Link>
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
}
