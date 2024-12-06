import {
  ChangeDetectionStrategy,
  Component,
  input,
  signal,
  computed,
} from '@angular/core';
import { BlogDetails } from '../../core/service/blog.service';
import { MatIcon } from '@angular/material/icon';
import { MatCard } from '@angular/material/card';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-blog-detail-page',
  standalone: true,
  imports: [MatIcon, MatCard, RouterLink],
  templateUrl: './blog-detail-page.component.html',
  styleUrl: './blog-detail-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlogDetailPageComponent {
  id = input.required<number>();
  blog = input.required<BlogDetails>();

  showComments = signal(false);

  toggleComments() {
    this.showComments.update((value) => !value);
  }

  selectedComments = computed(() => {
    return this.blog().comments.filter((c) => c); // Filter for visible comments
  });
}
