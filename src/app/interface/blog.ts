export interface Comment {
  author: string;
  content: string;
  createdAt: string;
  id: number;
  updatedAt: string;
}

export interface Blog {
  author: string;
  comments: Comment[];
  content?: string;
  contentPreview: string;
  createdAt: string;
  createdByMe: boolean;
  headerImageUrl: string;
  id: number;
  likedByMe: boolean;
  likes: number;
  title: string;
  updatedAt: string;
}
