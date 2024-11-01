import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BlogCardComponent } from './blog-card.component';

describe('BlogCardComponent', () => {
  let component: BlogCardComponent;
  let fixture: ComponentFixture<BlogCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlogCardComponent], // Standalone component
    }).compileComponents();

    fixture = TestBed.createComponent(BlogCardComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display title, author, content preview, and createdAt correctly', () => {
    // Set input properties
    component.title = 'Test Blog Title';
    component.author = 'Test';
    component.contentPreview = 'This is a preview of the blog content.';
    component.createdAt = '2024-01-01T00:00:00.000Z';

    fixture.detectChanges();

    // Check if the HTML displays the title, author, content preview, and created date
    const titleElement = fixture.debugElement.query(
      By.css('mat-card-title'),
    ).nativeElement;
    const authorElement = fixture.debugElement.query(
      By.css('.author-date span'),
    ).nativeElement;
    const contentPreviewElement = fixture.debugElement.query(
      By.css('.content-preview'),
    ).nativeElement;
    const createdAtElement = fixture.debugElement.query(
      By.css('.author-date p'),
    ).nativeElement;

    expect(titleElement.textContent).toContain('Test Blog Title');
    expect(authorElement.textContent).toContain('Test');
    expect(contentPreviewElement.textContent).toContain(
      'This is a preview of the blog content.',
    );
    expect(createdAtElement.textContent).toContain('2024-01-01');
  });
});
