import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from './material/material.module';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, FormsModule, MaterialModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'Demo App Alex';
  isVisible = true;
  items = ['Banane', 'Apfel', 'Orange'];
  inputText = '';

  // toggleVisibility for click and ngClass
  toggleVisibility() {
    this.isVisible = !this.isVisible;
  }
}
