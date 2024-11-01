import { z } from 'zod';

export const blogSchema = z.object({
  author: z.string(),
  comments: z.number(),
  contentPreview: z.string(),
  createdAt: z.string(),
  createdByMe: z.boolean(),
  headerImageUrl: z.string().optional(),
  id: z.number(),
  likedByMe: z.boolean(),
  likes: z.number(),
  title: z.string(),
  updatedAt: z.string(),
});

export type Blog = z.infer<typeof blogSchema>;
