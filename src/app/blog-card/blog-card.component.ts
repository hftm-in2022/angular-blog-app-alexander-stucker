import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-blog-card',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule],
  templateUrl: './blog-card.component.html',
  styleUrls: ['./blog-card.component.scss'],
})
export class BlogCardComponent {
  @Input() title!: string;
  @Input() author!: string;
  @Input() comments!: number;
  @Input() contentPreview!: string;
  @Input() createdAt!: string;
  @Input() headerImageUrl!: string;
  @Input() likes!: number;
}
