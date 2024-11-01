import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Blog, blogSchema } from '../interface/blog';
import { z } from 'zod';

@Injectable({
  providedIn: 'root',
})
export class BlogService {
  private apiUrl =
    'https://d-cap-blog-backend---v2.whitepond-b96fee4b.westeurope.azurecontainerapps.io';

  constructor(private http: HttpClient) {}

  getBlogs(): Observable<Blog[]> {
    return this.http.get<{ data: Blog[] }>(this.apiUrl + '/entries').pipe(
      map((response) => {
        const parsed = z.array(blogSchema).safeParse(response.data);
        if (parsed.success) {
          return parsed.data;
        } else {
          console.error('Data validation failed:', parsed.error);
          throw new Error('Data validation failed');
        }
      }),
    );
  }
}
