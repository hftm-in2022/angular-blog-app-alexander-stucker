import { TestBed } from '@angular/core/testing';
import { BlogService } from './blog.service';
import { Blog } from '../interface/blog';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

describe('BlogService', () => {
  let service: BlogService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;

  const apiUrl =
    'https://d-cap-blog-backend---v2.whitepond-b96fee4b.westeurope.azurecontainerapps.io/entries';

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);

    TestBed.configureTestingModule({
      providers: [
        BlogService,
        { provide: HttpClient, useValue: httpClientSpy },
      ],
    });

    service = TestBed.inject(BlogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return a list of blogs when data is valid', (done: DoneFn) => {
    const mockResponse = {
      data: [
        {
          id: 1,
          title: 'Test Blog Title',
          author: 'Test',
          comments: 5,
          contentPreview: 'This is a test content preview.',
          createdAt: '2024-01-01T00:00:00.000Z',
          createdByMe: false,
          headerImageUrl: 'https://example.com/image.jpg',
          likedByMe: true,
          likes: 10,
          updatedAt: '2024-01-02T00:00:00.000Z',
        },
      ],
    };

    httpClientSpy.get.and.returnValue(of(mockResponse));

    service.getBlogs().subscribe((blogs: Blog[]) => {
      expect(blogs.length).toBe(1);
      expect(blogs[0].title).toEqual('Test Blog Title');
      expect(blogs[0].author).toEqual('Test');
      expect(blogs[0].likes).toEqual(10);
      done();
    });

    expect(httpClientSpy.get.calls.count()).toBe(1);
    expect(httpClientSpy.get).toHaveBeenCalledWith(apiUrl);
  });

  it('should log an error and throw an exception when data validation fails', (done: DoneFn) => {
    const mockInvalidResponse = {
      data: [
        {
          id: 1,
          title: 'Invalid Blog Title',
          // Missing required fields
          comments: 5,
          createdAt: '2024-01-01T00:00:00.000Z',
          createdByMe: false,
          headerImageUrl: 'https://example.com/image.jpg',
          likedByMe: true,
          likes: 10,
          updatedAt: '2024-01-02T00:00:00.000Z',
        },
      ],
    };

    spyOn(console, 'error');

    httpClientSpy.get.and.returnValue(of(mockInvalidResponse));

    service.getBlogs().subscribe({
      next: () => fail('Expected error to be thrown'),
      error: (error) => {
        expect(error).toBeInstanceOf(Error);
        expect(error.message).toBe('Data validation failed');
        expect(console.error).toHaveBeenCalledWith(
          'Data validation failed:',
          jasmine.anything(),
        );
        done();
      },
    });

    expect(httpClientSpy.get.calls.count()).toBe(1);
    expect(httpClientSpy.get).toHaveBeenCalledWith(apiUrl);
  });
});
