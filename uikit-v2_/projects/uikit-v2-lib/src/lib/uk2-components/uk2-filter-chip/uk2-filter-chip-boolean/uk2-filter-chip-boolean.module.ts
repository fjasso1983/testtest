import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { Uk2FilterChipBooleanComponent } from './uk2-filter-chip-boolean.component';
import { Uk2FilterChipButtonModule } from '../uk2-filter-chip-button';
import { Uk2FilterChipOverlayModule } from '../uk2-filter-chip-overlay';
import { Uk2FilterChipOverlayLabelModule } from '../uk2-filter-chip-overlay-label';
import { Uk2FilterChipOverlayOptionModule } from '../uk2-filter-chip-overlay-option';
import { Uk2FilterChipLabelModule } from '../uk2-filter-chip-label';

@NgModule({
  declarations: [Uk2FilterChipBooleanComponent],
  imports: [
    CommonModule,
    Uk2FilterChipButtonModule,
    Uk2FilterChipLabelModule,
    Uk2FilterChipOverlayModule,
    Uk2FilterChipOverlayLabelModule,
    Uk2FilterChipOverlayOptionModule,
  ],
  exports: [Uk2FilterChipBooleanComponent],
})
export class Uk2FilterChipBooleanModule {}
