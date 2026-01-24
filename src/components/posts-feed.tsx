import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MapPin } from "lucide-react";

export interface Post {
  id: number;
  image: string;
  title: string;
  location: string;
  author?: {
    name: string;
    avatar: string;
  };
}

interface PostsFeedProps {
  posts: Post[];
  showAuthor?: boolean;
}

export default function PostsFeed({
  posts,
  showAuthor = false,
}: PostsFeedProps) {
  return (
    <div className="w-full flex flex-col gap-6">
      {posts.map((post) => (
        <Card
          key={post.id}
          className="w-full rounded-xl bg-card border border-border shadow-sm overflow-hidden"
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
          <div className="aspect-4/3 relative">
            <img
              src={post.image || "/placeholder.svg"}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Post Content */}
          <div className="p-4">
            <h4 className="font-semibold text-foreground">{post.title}</h4>
            {!showAuthor && (
              <div className="flex items-center gap-1 mt-1">
                <MapPin className="size-3 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  {post.location}
                </span>
              </div>
            )}
          </div>
        </Card>
      ))}
    </div>
  );
}
