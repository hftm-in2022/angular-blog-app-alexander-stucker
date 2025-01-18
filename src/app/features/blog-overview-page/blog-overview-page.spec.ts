import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BlogOverviewPageComponent } from './blog-overview-page.component';
import { BlogOverviewCardComponent } from '../../shared/blog-overview-card/blog-overview-card.component';
import { Entries } from '../../core/service/blog.service';
import { By } from '@angular/platform-browser';
import { MockComponent } from 'ng-mocks';

describe('BlogOverviewPageComponent', () => {
  let component: BlogOverviewPageComponent;
  let fixture: ComponentFixture<BlogOverviewPageComponent>;

  // Mock-Daten nötig? Als Arrange verwenden?
  const mockEntries: Entries = {
    data: [
      {
        id: 1,
        title: 'Blog 1',
        contentPreview: 'Preview 1',
        author: 'Author 1',
        likes: 10,
        comments: 5,
        likedByMe: false,
        createdByMe: true,
        headerImageUrl: 'https://example.com/image1.jpg',
      },
      {
        id: 2,
        title: 'Blog 2',
        contentPreview: 'Preview 2',
        author: 'Author 2',
        likes: 20,
        comments: 10,
        likedByMe: true,
        createdByMe: false,
      },
    ],
    pageIndex: 0,
    pageSize: 2,
    totalCount: 2,
    maxPageSize: 10,
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        BlogOverviewPageComponent,
        MockComponent(BlogOverviewCardComponent),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(BlogOverviewPageComponent);
    component = fixture.componentInstance;

    Object.defineProperty(component, 'model', {
      value: () => mockEntries,
      writable: true,
    });
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render a BlogOverviewCardComponent for each blog entry', () => {
    // Act
    fixture.detectChanges();

    // Assert
    const blogContainer = fixture.debugElement.query(
      By.css('[data-testid="blog-container"]'),
    );
    const blogCards = blogContainer.queryAll(
      By.directive(BlogOverviewCardComponent),
    );

    expect(blogCards.length).toBe(mockEntries.data.length);

    mockEntries.data.forEach((blog, index) => {
      const blogCardInstance = blogCards[index]
        .componentInstance as BlogOverviewCardComponent;
      expect(blogCardInstance.blog).toEqual(blog);
    });
  });
});
