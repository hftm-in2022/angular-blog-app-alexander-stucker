import { Component, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

export interface Blog {
  author: string;
  comments: number;
  headerImageUrl?: string;
  contentPreview: string;
  createdByMe: boolean;
  id: number;
  likedByMe: boolean;
  likes: number;
  title: string;
}

@Component({
  selector: 'app-blog-overview-card',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatIcon, RouterLink],
  templateUrl: './blog-overview-card.component.html',
  styleUrl: './blog-overview-card.component.scss',
})
export class BlogOverviewCardComponent {
  blog = input.required<Blog>();
}
