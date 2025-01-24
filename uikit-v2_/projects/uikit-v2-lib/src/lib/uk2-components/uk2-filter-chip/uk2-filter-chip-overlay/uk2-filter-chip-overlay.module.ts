import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OverlayModule } from '@angular/cdk/overlay';
import { A11yModule } from '@angular/cdk/a11y';
import { MatIconModule } from '@angular/material/icon';

import { Uk2FilterChipOverlayComponent } from './uk2-filter-chip-overlay.component';

@NgModule({
  declarations: [Uk2FilterChipOverlayComponent],
  exports: [Uk2FilterChipOverlayComponent],
  imports: [CommonModule, OverlayModule, MatIconModule, A11yModule],
})
export class Uk2FilterChipOverlayModule {}
