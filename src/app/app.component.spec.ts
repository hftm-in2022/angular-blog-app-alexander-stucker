import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { BlogService } from './service/blog.service';

describe('AppComponent', () => {
  let blogServiceMock: jasmine.SpyObj<BlogService>;

  beforeEach(async () => {
    // Create a mock BlogService with the `getBlogs` method
    blogServiceMock = jasmine.createSpyObj('BlogService', ['getBlogs']);

    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [{ provide: BlogService, useValue: blogServiceMock }],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have the title 'Blogg App Alex'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('Blogg App Alex');
  });
});
