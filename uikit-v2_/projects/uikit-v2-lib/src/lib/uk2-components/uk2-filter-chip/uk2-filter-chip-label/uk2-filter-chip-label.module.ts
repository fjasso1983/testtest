import { NgModule } from '@angular/core';

import { MatIconModule } from '@angular/material/icon';

import { Uk2FilterChipLabelComponent } from './uk2-filter-chip-label.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [Uk2FilterChipLabelComponent],
  exports: [Uk2FilterChipLabelComponent],
  imports: [CommonModule, MatIconModule],
})
export class Uk2FilterChipLabelModule {}
