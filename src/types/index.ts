// src/types/index.ts

export interface User {
  id: string;
  fullName: string;
  avatar?: string;
}

export interface Comment {
  id: string;
  postId: string;
  content: string;
  createdBy: User;
  createdAt: string;
}

export interface Post {
  id: string;
  content: string;
  image?: string;
  location?: string;
  createdBy: User;
  createdAt: string;

  likesCount: number;
  commentsCount: number;
  isLikedByMe: boolean;
  comments?: Comment[];
}
