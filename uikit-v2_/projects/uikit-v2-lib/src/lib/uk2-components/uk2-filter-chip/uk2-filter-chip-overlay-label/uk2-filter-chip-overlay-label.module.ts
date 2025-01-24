import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatIconModule } from '@angular/material/icon';
import { OverlayModule } from '@angular/cdk/overlay';

import { Uk2FilterChipOverlayLabelComponent } from './uk2-filter-chip-overlay-label.component';

@NgModule({
  declarations: [Uk2FilterChipOverlayLabelComponent],
  exports: [Uk2FilterChipOverlayLabelComponent],
  imports: [CommonModule, MatIconModule, OverlayModule],
})
export class Uk2FilterChipOverlayLabelModule {}
