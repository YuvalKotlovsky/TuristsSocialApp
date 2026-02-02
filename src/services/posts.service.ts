import type { Comment, Post } from "@/types";

const clone = <T>(data: T): T => JSON.parse(JSON.stringify(data)) as T;

let MOCK_POSTS: Post[] = [
  {
    id: "1",
    content:
      "Paris Sunset – one of the most beautiful evenings ever. Highly recommended spot for a sunset walk.",
    image:
      "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&h=600&fit=crop",
    location: "Paris, France",
    createdBy: {
      id: "u1",
      fullName: "Yuval Kot",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop",
    },
    createdAt: new Date().toISOString(),
    likesCount: 42,
    commentsCount: 2,
    isLikedByMe: false,
    comments: [
      {
        id: "c1",
        postId: "1",
        content: "Beautiful shot!",
        createdBy: { id: "u3", fullName: "Sarah" },
        createdAt: new Date().toISOString(),
      },
      {
        id: "c2",
        postId: "1",
        content: "I was there last summer, amazing place!",
        createdBy: { id: "u4", fullName: "Mike" },
        createdAt: new Date().toISOString(),
      },
    ],
  },
  {
    id: "2",
    content: "London Bridge vibes. The city is amazing.",
    image:
      "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&h=600&fit=crop",
    location: "London, UK",
    createdBy: {
      id: "u2",
      fullName: "Jane Smith",
      avatar: "https://via.placeholder.com/50",
    },
    createdAt: new Date().toISOString(),
    likesCount: 28,
    commentsCount: 1,
    isLikedByMe: false,
    comments: [
      {
        id: "c3",
        postId: "2",
        content: "Love the perspective!",
        createdBy: { id: "u5", fullName: "Emma" },
        createdAt: new Date().toISOString(),
      },
    ],
  },
];

export async function getFeed(): Promise<Post[]> {
  // feed doesn't need comments array, but returning it doesn't hurt for mock
  return clone(MOCK_POSTS);
}

export async function getPostById(postId: string): Promise<Post | null> {
  const post = MOCK_POSTS.find((p) => p.id === postId);
  return post ? clone(post) : null;
}

export async function toggleLike(postId: string): Promise<Post | null> {
  const idx = MOCK_POSTS.findIndex((p) => p.id === postId);
  if (idx === -1) return null;

  const prev = MOCK_POSTS[idx];
  const next: Post = {
    ...prev,
    isLikedByMe: !prev.isLikedByMe,
    likesCount: prev.isLikedByMe ? prev.likesCount - 1 : prev.likesCount + 1,
  };

  MOCK_POSTS = [
    ...MOCK_POSTS.slice(0, idx),
    next,
    ...MOCK_POSTS.slice(idx + 1),
  ];
  return clone(next);
}

export async function addComment(
  postId: string,
  content: string
): Promise<Post | null> {
  const text = content.trim();
  if (!text) return getPostById(postId);

  const idx = MOCK_POSTS.findIndex((p) => p.id === postId);
  if (idx === -1) return null;

  const prev = MOCK_POSTS[idx];

  const newComment: Comment = {
    id: `c-${Date.now()}`,
    postId,
    content: text,
    createdBy: { id: "me", fullName: "You" },
    createdAt: new Date().toISOString(),
  };

  const next: Post = {
    ...prev,
    commentsCount: prev.commentsCount + 1,
    comments: [newComment, ...(prev.comments ?? [])],
  };

  MOCK_POSTS = [
    ...MOCK_POSTS.slice(0, idx),
    next,
    ...MOCK_POSTS.slice(idx + 1),
  ];
  return clone(next);
}
type UpdatePostInput = {
  content: string;
  location?: string;
  image?: string;
};

export async function updatePost(
  postId: string,
  data: UpdatePostInput
): Promise<Post | null> {
  const idx = MOCK_POSTS.findIndex((p) => p.id === postId);
  if (idx === -1) return null;

  const prev = MOCK_POSTS[idx];

  const next: Post = {
    ...prev,
    content: data.content.trim(),
    location: data.location?.trim() || undefined,
    image: data.image || undefined,
  };

  MOCK_POSTS = [
    ...MOCK_POSTS.slice(0, idx),
    next,
    ...MOCK_POSTS.slice(idx + 1),
  ];

  return clone(next);
}
type CreatePostInput = {
  content: string;
  location?: string;
  image?: string;
};

export async function createPost(data: CreatePostInput): Promise<Post> {
  const now = new Date().toISOString();

  const newPost: Post = {
    id: `${Date.now()}`,
    content: data.content.trim(),
    location: data.location?.trim() || undefined,
    image: data.image || undefined,
    createdBy: { id: "me", fullName: "You" },
    createdAt: now,
    likesCount: 0,
    commentsCount: 0,
    isLikedByMe: false,
    comments: [],
  };

  MOCK_POSTS = [newPost, ...MOCK_POSTS];
  return clone(newPost);
}
