import { Component, Input } from '@angular/core';
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
})
export class BlogDetailPageComponent {
  @Input() id!: number;
  @Input() blog!: BlogDetails;

  showComments = false;

  toggleComments() {
    this.showComments = !this.showComments;
  }
}
