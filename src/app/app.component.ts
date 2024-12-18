import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { LoadingStateService } from './core/service/loading-state.service';
import { inject } from '@angular/core';
import { NavBarComponent } from './features/nav-bar/nav-bar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, FormsModule, NavBarComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  private loadingStateService = inject(LoadingStateService);
  isLoading = this.loadingStateService.isLoading;
}
