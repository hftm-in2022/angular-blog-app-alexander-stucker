import { Component, Input } from '@angular/core';
import { Entries } from '../../core/service/blog.service';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { AsyncPipe, NgIf } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-blog-overview-page',
  standalone: true,
  imports: [
    NgIf,
    AsyncPipe,
    MatCardModule,
    MatButtonModule,
    MatIcon,
    RouterLink,
  ],
  templateUrl: './blog-overview-page.component.html',
  styleUrl: './blog-overview-page.component.scss',
})
export class BlogOverviewPageComponent {
  @Input({ required: true }) model!: Entries;
}
