import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { OidcSecurityService, UserDataResult } from 'angular-auth-oidc-client';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss',
})
export class NavBarComponent {
  title = 'Blogg App Alex';
  userName = signal<string | null>(null);
  isAuthenticated = signal<boolean>(false);
  hasUserRole = signal<boolean>(false);

  constructor(private oidcSecurityService: OidcSecurityService) {
    this.checkAuthentication();
  }

  checkAuthentication() {
    this.oidcSecurityService.checkAuth().subscribe(({ isAuthenticated }) => {
      this.isAuthenticated.set(isAuthenticated);

      if (isAuthenticated) {
        this.oidcSecurityService.userData$.subscribe(
          (userData: UserDataResult) => {
            this.userName.set(
              userData?.userData?.name ||
                userData?.userData?.preferred_username ||
                'Unknown User',
            );
          },
        );

        this.oidcSecurityService.getAccessToken().subscribe((accessToken) => {
          if (accessToken) {
            const decodedToken = JSON.parse(atob(accessToken.split('.')[1]));
            // console.log('Decoded Access Token:', decodedToken);
            const roles: string[] = decodedToken?.realm_access?.roles || [];
            console.log('Extracted Roles:', roles);

            this.hasUserRole.set(roles.includes('user'));
          }
        });
      } else {
        this.userName.set(null);
        this.hasUserRole.set(false);
      }
    });
  }

  login() {
    this.oidcSecurityService.authorize();
  }

  logout() {
    this.oidcSecurityService
      .logoff()
      .subscribe((result) => console.log(result));
  }
}
