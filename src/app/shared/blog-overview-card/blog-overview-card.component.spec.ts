import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  //   Blog,
  BlogOverviewCardComponent,
} from './blog-overview-card.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { provideRouter, Router, UrlTree } from '@angular/router';
import { CommonModule } from '@angular/common';
import { By } from '@angular/platform-browser';

describe('BlogOverviewCardComponent', () => {
  let component: BlogOverviewCardComponent;
  let fixture: ComponentFixture<BlogOverviewCardComponent>;
  let routerMock: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideRouter([])],
      imports: [
        CommonModule,
        MatCardModule,
        MatButtonModule,
        MatIconModule,
        BlogOverviewCardComponent,
      ],
    });

    fixture = TestBed.createComponent(BlogOverviewCardComponent);
    component = fixture.componentInstance;
    routerMock = TestBed.inject(Router);

    // Mock a Blog
    fixture.componentRef.setInput('blog', {
      id: 1,
      title: 'Test Blog',
      contentPreview: 'This is a test preview.',
      author: 'Test Author',
      likes: 42,
      comments: 7,
      likedByMe: false,
      createdByMe: false,
      headerImageUrl: 'https://example.com/test-image.jpg',
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the blog title', () => {
    const titleElement = fixture.debugElement.query(
      By.css('[data-testid="blog-title"]'),
    ).nativeElement;
    expect(titleElement.textContent.trim()).toBe('Test Blog');
  });

  it('should navigate to the blog detail page when the title is clicked', () => {
    const navigateSpy = spyOn(routerMock, 'navigateByUrl');
    const titleElement = fixture.debugElement.query(
      By.css('[data-testid="blog-title"]'),
    ).nativeElement;
    titleElement.click();

    const urlTree: UrlTree = routerMock.createUrlTree(['/detail', 1]);
    expect(navigateSpy).toHaveBeenCalledWith(urlTree, jasmine.any(Object));
  });
});
