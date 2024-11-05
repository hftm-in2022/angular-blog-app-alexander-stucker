import { blogDetailResolver } from '../../app.routes';
import { BlogDetailPageComponent } from './blog-detail-page.component';
import { Routes } from '@angular/router';

const BlogDetailPageRoutes: Routes = [
  {
    path: ':id',
    component: BlogDetailPageComponent,
    resolve: { blog: blogDetailResolver },
  },
];
export default BlogDetailPageRoutes;
