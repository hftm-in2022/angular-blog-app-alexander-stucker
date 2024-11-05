import { ResolveFn, Routes } from '@angular/router';
import { BlogDetails, BlogService, Entries } from './core/service/blog.service';
import { lastValueFrom } from 'rxjs';
import { inject } from '@angular/core';

export const entriesResolver: ResolveFn<Entries> = async () => {
  const blogService = inject(BlogService);
  return await lastValueFrom(blogService.getBlogs());
};

export const blogDetailResolver: ResolveFn<BlogDetails> = (route) => {
  const blogService = inject(BlogService);
  const idParam = route.paramMap.get('id');
  const blogId = Number(idParam);
  return blogService.getBlogById(blogId);
};

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'overview',
    pathMatch: 'full',
  },
  {
    path: 'overview',
    loadChildren: () =>
      import('./features/blog-overview-page/blog-overview-page.routes'),
    resolve: { model: entriesResolver },
  },
  {
    path: 'detail',
    loadChildren: () =>
      import('./features/blog-detail-page/blog-detail-page.routes'),
  },
];
