import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { LoginResponse, OidcSecurityService } from 'angular-auth-oidc-client';
import { provideRouter } from '@angular/router';
import { MockComponent } from 'ng-mocks';
import { SidebarComponent } from './features/sidebar/sidebar.component';
import { of } from 'rxjs';

describe('AppComponent', () => {
  let oidcSecurityServiceMock: jasmine.SpyObj<OidcSecurityService>;

  beforeEach(() => {
    oidcSecurityServiceMock = jasmine.createSpyObj('OidcSecurityService', [
      'checkAuth',
    ]);
    oidcSecurityServiceMock.checkAuth.and.returnValue(of({} as LoginResponse));

    TestBed.configureTestingModule({
      imports: [AppComponent, MockComponent(SidebarComponent)],
      providers: [
        provideRouter([]),
        { provide: OidcSecurityService, useValue: oidcSecurityServiceMock },
      ],
    });
  });

  it('should render the sidebar component', () => {
    // Arrange
    const fixture = TestBed.createComponent(AppComponent);

    // Act
    fixture.detectChanges();

    //Assert
    const compiled = fixture.nativeElement as HTMLElement;
    const sidebarElement = compiled.querySelector('app-sidebar');
    expect(sidebarElement).toBeTruthy();
  });
});
