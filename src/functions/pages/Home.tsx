import PostsFeed, { type Post } from "@/components/posts-feed";

const mockPosts: Post[] = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=1200&h=900&fit=crop",
    title: "Paris Sunset",
    location: "Paris, France",
    author: {
      name: "John Doe",
      avatar: "https://via.placeholder.com/50",
    },
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=1200&h=900&fit=crop",
    title: "London Bridge",
    location: "London, UK",
    author: {
      name: "Jane Smith",
      avatar: "https://via.placeholder.com/50",
    },
  },
];

export default function Home() {
  return (
    <div className="min-h-screen pb-20 bg-background w-full max-w-97.5 mx-auto">
      <header className="bg-card border-b border-border">
        <div className="px-4 py-6">
          <h1 className="text-xl font-semibold text-foreground">Home</h1>
        </div>
      </header>

      <main className="w-full px-4 py-6">
        <PostsFeed posts={mockPosts} showAuthor />
      </main>
    </div>
  );
}
