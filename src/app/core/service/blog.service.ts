import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { z } from 'zod';
import { environment } from '../../../environments/environment.development';

const BlogSchema = z.object({
  id: z.number(),
  title: z.string(),
  contentPreview: z.string().optional(),
  author: z.string(),
  likes: z.number(),
  comments: z.union([z.number(), z.array(z.any())]),
  likedByMe: z.boolean(),
  createdByMe: z.boolean(),
  headerImageUrl: z.string().optional(),
});

const BlogArraySchema = z.array(BlogSchema);

const EntriesSchema = z.object({
  data: BlogArraySchema,
  pageIndex: z.number(),
  pageSize: z.number(),
  totalCount: z.number(),
  maxPageSize: z.number(),
});

const CommentSchema = z.object({
  id: z.number(),
  content: z.string(),
  author: z.string(),
  updatedAt: z.string(),
  createdAt: z.string(),
});

const BlogDetailsSchema = BlogSchema.extend({
  updatedAt: z.string(),
  createdAt: z.string(),
  content: z.string(),
  comments: z.array(CommentSchema),
});

export type Blog = z.infer<typeof BlogSchema>;

export type Entries = z.infer<typeof EntriesSchema>;

export type BlogDetails = z.infer<typeof BlogDetailsSchema>;

@Injectable({
  providedIn: 'root',
})
export class BlogService {
  httpClient = inject(HttpClient);

  getBlogs(): Observable<Entries> {
    return this.httpClient
      .get<Entries>(`${environment.serviceUrl}/entries`)
      .pipe(map((entries) => EntriesSchema.parse(entries)));
  }

  getBlogById(id: number): Observable<BlogDetails> {
    return this.httpClient
      .get<BlogDetails>(`${environment.serviceUrl}/entries/${id}`)
      .pipe(map((blogDetails) => BlogDetailsSchema.parse(blogDetails)));
  }
}
