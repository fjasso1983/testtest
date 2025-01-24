import { NgModule } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { A11yModule } from '@angular/cdk/a11y';

@NgModule({
  imports: [MatFormFieldModule, MatIconModule, MatInputModule, MatMenuModule, MatButtonModule, A11yModule],
  exports: [MatFormFieldModule, MatIconModule, MatInputModule, MatMenuModule, MatButtonModule, A11yModule],
})
export class SearchInputMaterialModule {}
