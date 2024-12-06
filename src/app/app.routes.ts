import { ResolveFn, Routes } from '@angular/router';
import { BlogDetails, BlogService, Entries } from './core/service/blog.service';
import { LoadingStateService } from './core/service/loading-state.service';
import { finalize, lastValueFrom } from 'rxjs';
import { inject } from '@angular/core';

export const entriesResolver: ResolveFn<Entries> = async () => {
  const blogService = inject(BlogService);
  const loadingService = inject(LoadingStateService);

  loadingService.setLoadingState(true);
  return await lastValueFrom(
    blogService
      .getBlogs()
      .pipe(finalize(() => loadingService.setLoadingState(false))),
  );
};

export const blogDetailResolver: ResolveFn<BlogDetails> = (route) => {
  const blogService = inject(BlogService);
  const idParam = route.paramMap.get('id');
  const loadingService = inject(LoadingStateService);
  const blogId = Number(idParam);

  loadingService.setLoadingState(true);
  return blogService
    .getBlogById(blogId)
    .pipe(finalize(() => loadingService.setLoadingState(false)));
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
