import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PostsFeed from "../components/PostFeed";
import { getFeed, toggleLike } from "@/services/posts.service";
import type { Post } from "@/types";

export default function Home() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    void (async () => {
      try {
        const data = await getFeed();
        setPosts(data);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handleOpenPost = (postId: string) => {
    navigate(`/post/${postId}`);
  };

  const handleLike = async (postId: string) => {
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
    const updated = await toggleLike(postId);
    if (!updated) return;

    setPosts((prev) =>
      prev.map((p) =>
        p.id !== postId
          ? p
          : {
              ...p,
              isLikedByMe: updated.isLikedByMe,
              likesCount: updated.likesCount,
            }
      )
    );
  };

  return (
    <div className="min-h-screen pb-20 bg-background w-full max-w-3xl mx-auto">
      <header className="bg-card border-b border-border">
        <div className="px-4 py-6">
          <h1 className="text-xl font-semibold text-foreground">Home</h1>
        </div>
      </header>

      <main className="w-full px-4 py-6">
        {loading ? (
          <p className="text-muted-foreground">Loading…</p>
        ) : (
          <PostsFeed
            posts={posts}
            onLike={handleLike}
            onOpenPost={handleOpenPost}
          />
        )}
      </main>
    </div>
  );
}
