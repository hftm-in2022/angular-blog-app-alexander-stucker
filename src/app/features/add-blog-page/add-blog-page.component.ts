import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-add-blog-page',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './add-blog-page.component.html',
  styleUrl: './add-blog-page.component.scss',
})
export class AddBlogPageComponent {}
