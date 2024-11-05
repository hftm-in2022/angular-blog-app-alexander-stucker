import { Component, Input } from '@angular/core';
import { Entries } from '../../core/service/blog.service';
import { AsyncPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { BlogOverviewCardComponent } from '../../shared/blog-overview-card/blog-overview-card.component';

@Component({
  selector: 'app-blog-overview-page',
  standalone: true,
  imports: [AsyncPipe, RouterLink, BlogOverviewCardComponent],
  templateUrl: './blog-overview-page.component.html',
  styleUrl: './blog-overview-page.component.scss',
})
export class BlogOverviewPageComponent {
  @Input({ required: true }) model!: Entries;
}
