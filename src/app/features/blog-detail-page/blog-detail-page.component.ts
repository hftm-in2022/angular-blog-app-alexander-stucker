import { Component, Input } from '@angular/core';
import { BlogDetails } from '../../core/service/blog.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-blog-detail-page',
  standalone: true,
  imports: [NgIf],
  templateUrl: './blog-detail-page.component.html',
  styleUrl: './blog-detail-page.component.scss',
})
export class BlogDetailPageComponent {
  @Input() id!: number;
  @Input() blog!: BlogDetails;
}
