import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BlogService } from './service/blog.service';
import { Blog } from './interface/blog';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'Demo App Alex';
  blogs: Blog[] = [];

  constructor(private blogService: BlogService) {}

  ngOnInit(): void {
    this.onGetBlogs();
    this.onGetBlog();
  }

  onGetBlogs(): void {
    this.blogService.getBlogs().subscribe({
      next: (response) => {
        console.log(response);
        this.blogs = Array.isArray(response) ? response : [response];
      },
      error: (error) => console.log(error),
      complete: () => console.log('Done'),
    });
  }

  onGetBlog(): void {
    this.blogService.getBlogs().subscribe({
      next: (response) => console.log(response),
      error: (error) => console.log(error),
      complete: () => console.log('Done'),
    });
  }
}
