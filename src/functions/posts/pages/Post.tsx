import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { MapPin, ArrowLeft, Heart, Send } from "lucide-react";
import { addComment, getPostById, toggleLike } from "@/services/posts.service";
import type { Comment, Post } from "@/types";
import { getInitials } from "@/lib/utils";

export default function Post() {
  const navigate = useNavigate();
  const { postId } = useParams<{ postId: string }>();

  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);

  const [newComment, setNewComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    void (async () => {
      if (!postId) return;
      try {
        const data = await getPostById(postId);
        setPost(data);
      } finally {
        setLoading(false);
      }
    })();
  }, [postId]);

  const comments = useMemo<Comment[]>(
    () => post?.comments ?? [],
    [post?.comments]
  );

  const handleLike = async () => {
    if (!post) return;

    setPost((prev) =>
      !prev
        ? prev
        : {
            ...prev,
            isLikedByMe: !prev.isLikedByMe,
            likesCount: prev.isLikedByMe
              ? prev.likesCount - 1
              : prev.likesCount + 1,
          }
    );

    try {
      const updated = await toggleLike(post.id);
      if (updated) setPost(updated);
    } catch {
      const fresh = await getPostById(post.id);
      setPost(fresh);
    }
  };

  const handleAddComment = async () => {
    if (!post) return;
    const text = newComment.trim();
    if (!text) return;

    setIsSubmitting(true);

    const optimistic: Comment = {
      id: `tmp-${Date.now()}`,
      postId: post.id,
      content: text,
      createdAt: new Date().toISOString(),
      createdBy: { id: "me", fullName: "You" },
    };

    setPost((prev) =>
      !prev
        ? prev
        : {
            ...prev,
            commentsCount: prev.commentsCount + 1,
            comments: [optimistic, ...(prev.comments ?? [])],
          }
    );

    setNewComment("");

    try {
      const updated = await addComment(post.id, text);
      if (updated) setPost(updated);
    } catch {
      const fresh = await getPostById(post.id);
      setPost(fresh);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Loading…</p>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-xl font-semibold text-foreground">
            Post not found
          </h1>
          <Button variant="ghost" onClick={() => navigate(-1)} className="mt-4">
            <ArrowLeft className="size-4 mr-2" />
            Go back
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-card border-b border-border sticky top-0 z-50">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(-1)}
            className="shrink-0"
          >
            <ArrowLeft className="size-5" />
            <span className="sr-only">Go back</span>
          </Button>
          <h1 className="text-lg font-semibold text-foreground truncate">
            Post
          </h1>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-6 space-y-4">
        {/* Post Card */}
        <Card className="rounded-xl bg-card border border-border shadow-sm overflow-hidden">
          {/* Author */}
          <div className="flex items-center gap-3 p-4 border-b border-border">
            <Avatar className="size-10">
              <AvatarImage
                src={post.createdBy.avatar}
                alt={post.createdBy.fullName}
              />
              <AvatarFallback className="bg-primary/10 text-primary text-sm">
                {getInitials(post.createdBy.fullName)}
              </AvatarFallback>
            </Avatar>

            <div className="min-w-0">
              <p className="font-medium text-foreground text-sm truncate">
                {post.createdBy.fullName}
              </p>
              {post.location && (
                <div className="flex items-center gap-1">
                  <MapPin className="size-3 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground truncate">
                    {post.location}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Image */}
          {post.image && (
            <div className="aspect-4/3 relative">
              <img
                src={post.image}
                alt="Post"
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Content + actions */}
          <div className="p-4">
            <p className="text-foreground leading-relaxed">{post.content}</p>

            <div className="flex items-center gap-4 mt-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLike}
                className="flex items-center gap-2 text-muted-foreground"
              >
                <Heart
                  className={`size-5 ${
                    post.isLikedByMe ? "fill-red-500 text-red-500" : ""
                  }`}
                />
                <span className="text-sm">{post.likesCount}</span>
              </Button>

              <div className="flex items-center gap-2 text-muted-foreground">
                <span className="text-sm">{post.commentsCount}</span>
                <span className="text-sm">Comments</span>
              </div>
            </div>
          </div>
        </Card>

        {/* Add Comment */}
        <Card className="rounded-xl bg-card border border-border shadow-sm overflow-hidden">
          <div className="p-4 space-y-3">
            <p className="font-semibold text-foreground">Add a comment</p>

            <Textarea
              placeholder="Write your comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="min-h-24 resize-none"
              onKeyDown={(e) => {
                if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
                  e.preventDefault();
                  void handleAddComment();
                }
              }}
            />

            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">
                Ctrl+Enter to submit
              </span>
              <Button
                size="sm"
                onClick={handleAddComment}
                disabled={!newComment.trim() || isSubmitting}
              >
                <Send className="size-4 mr-2" />
                {isSubmitting ? "Posting..." : "Post"}
              </Button>
            </div>
          </div>
        </Card>

        {/* Comments list */}
        <Card className="rounded-xl bg-card border border-border shadow-sm overflow-hidden">
          <div className="p-4">
            <p className="font-semibold text-foreground mb-3">Comments</p>

            {comments.length === 0 ? (
              <p className="text-sm text-muted-foreground">No comments yet.</p>
            ) : (
              <div className="space-y-4">
                {comments.map((c, idx) => (
                  <div key={c.id}>
                    {idx > 0 && <Separator className="my-4" />}

                    <div className="flex gap-3">
                      <Avatar className="size-8 shrink-0">
                        <AvatarImage
                          src={c.createdBy.avatar}
                          alt={c.createdBy.fullName}
                        />
                        <AvatarFallback className="text-xs bg-muted text-muted-foreground">
                          {getInitials(c.createdBy.fullName)}
                        </AvatarFallback>
                      </Avatar>

                      <div className="min-w-0">
                        <p className="text-sm font-medium text-foreground">
                          {c.createdBy.fullName}
                        </p>
                        <p className="text-sm text-muted-foreground wrap-break-word">
                          {c.content}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </Card>
      </main>
    </div>
  );
}
