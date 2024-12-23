import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { BlogService } from '../../core/service/blog.service';

@Component({
  selector: 'app-add-blog-page',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './add-blog-page.component.html',
  styleUrl: './add-blog-page.component.scss',
})
export class AddBlogPageComponent {
  blogForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private blogService: BlogService,
    private router: Router,
  ) {
    this.blogForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      content: ['', [Validators.required, Validators.minLength(10)]],
      headerImageUrl: [''],
    });
  }

  onSubmit() {
    if (this.blogForm.valid) {
      const newBlog = this.blogForm.value;
      this.blogService.addBlog(newBlog).subscribe({
        next: () => {
          this.router.navigate(['/overview']);
        },
        error: (err) => {
          console.error('Failed to create blog:', err);
        },
      });
    }
  }
}
