import { Component, inject, signal } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { AsyncPipe } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { Observable, Subject } from 'rxjs';
import { map, shareReplay, takeUntil } from 'rxjs/operators';
import { RouterLink, RouterOutlet } from '@angular/router';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { LoadingStateService } from '../../core/service/loading-state.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    AsyncPipe,
    RouterLink,
    RouterOutlet,
  ],
})
export class SidebarComponent {
  title = 'Blogg App Alex';
  userName = signal<string | null>(null);
  isAuthenticated = signal<boolean>(false);

  private breakpointObserver = inject(BreakpointObserver);
  private oidcSecurityService = inject(OidcSecurityService);
  private loadingStateService = inject(LoadingStateService);
  private destroy$ = new Subject<void>();
  isLoading = this.loadingStateService.isLoading;

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(['(max-width: 900px)'])
    .pipe(
      map((result) => result.matches),
      shareReplay(),
    );

  constructor() {
    this.oidcSecurityService
      .checkAuth()
      .pipe(takeUntil(this.destroy$))
      .subscribe(({ isAuthenticated }) => {
        this.isAuthenticated.set(isAuthenticated);

        if (isAuthenticated) {
          this.oidcSecurityService.userData$
            .pipe(takeUntil(this.destroy$))
            .subscribe((userData) => {
              this.userName.set(
                userData?.userData?.preferred_username || 'Unknown User',
              );
            });
        } else {
          this.userName.set(null);
        }
      });
  }

  ngonDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
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
