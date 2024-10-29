import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BlogService } from './service/blog.service';
import { Blog } from './interface/blog';
import { BlogCardComponent } from './blog-card/blog-card.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, FormsModule, BlogCardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'Blogg App Alex';
  blogs: Blog[] = [];
  fallBackImageUrl = 'https://picsum.photos/800/200';

  constructor(private blogService: BlogService) {}

  ngOnInit(): void {
    this.onGetBlogs();
  }

  onGetBlogs(): void {
    this.blogService.getBlogs().subscribe({
      next: (response) => {
        this.blogs = response.map((blog) => ({
          ...blog,
          headerImageUrl: blog.headerImageUrl || this.fallBackImageUrl,
        }));
      },
    });
  }
}
