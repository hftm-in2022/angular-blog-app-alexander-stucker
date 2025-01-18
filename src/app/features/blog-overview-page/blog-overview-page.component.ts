import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Entries } from '../../core/service/blog.service';
import { BlogOverviewCardComponent } from '../../shared/blog-overview-card/blog-overview-card.component';

@Component({
  selector: 'app-blog-overview-page',
  standalone: true,
  imports: [BlogOverviewCardComponent],
  templateUrl: './blog-overview-page.component.html',
  styleUrl: './blog-overview-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlogOverviewPageComponent {
  model = input.required<Entries>();
}
