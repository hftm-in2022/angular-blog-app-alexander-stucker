import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Blog } from '../interface/blog';

@Injectable({
  providedIn: 'root',
})
export class BlogService {
  private apiUrl =
    'https://d-cap-blog-backend---v2.whitepond-b96fee4b.westeurope.azurecontainerapps.io';

  constructor(private http: HttpClient) {}

  getBlogs(): Observable<Blog[]> {
    return this.http.get<Blog[]>(this.apiUrl + '/entries/264');
  }

  getBlog(): Observable<Blog> {
    return this.http.get<Blog>(this.apiUrl + '/entries');
  }
}
