import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatCheckboxModule } from '@angular/material/checkbox';

import { Uk2DirectivesModule, Uk2MenuListItemModule } from '@axos/uikit-v2-lib/src/lib/uk2-directives';

import { Uk2FilterChipOverlayOptionComponent } from './uk2-filter-chip-overlay-option.component';

@NgModule({
  declarations: [Uk2FilterChipOverlayOptionComponent],
  imports: [CommonModule, MatCheckboxModule, Uk2DirectivesModule, Uk2MenuListItemModule],
  exports: [Uk2FilterChipOverlayOptionComponent],
})
export class Uk2FilterChipOverlayOptionModule {}
