import { NgModule } from '@angular/core';
//  Material Modules
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';

const MaterialComponents = [
  MatSlideToggleModule,
  MatButtonModule,
  MatCardModule,
  MatInputModule,
  MatListModule,
];

@NgModule({
  declarations: [],
  imports: [MaterialComponents],
  exports: [MaterialComponents],
})
export class MaterialModule {}
