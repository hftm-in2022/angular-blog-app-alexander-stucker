import { z } from 'zod';

export const commentSchema = z.object({
  author: z.string(),
  content: z.string(),
  createdAt: z.string(),
  id: z.number(),
  updatedAt: z.string(),
});

export const blogSchema = z.object({
  author: z.string(),
  comments: z.array(commentSchema),
  content: z.string().optional(),
  contentPreview: z.string(),
  createdAt: z.string(),
  createdByMe: z.boolean(),
  headerImageUrl: z.string(),
  id: z.number(),
  likedByMe: z.boolean(),
  likes: z.number(),
  title: z.string(),
  updatedAt: z.string(),
});

export type Comment = z.infer<typeof commentSchema>;
export type Blog = z.infer<typeof blogSchema>;
