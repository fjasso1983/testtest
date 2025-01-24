import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { DragDropModule } from '@angular/cdk/drag-drop';

import {
  Uk2ChipModule,
  Uk2DirectivesModule,
  Uk2FilterBarDirectiveModule,
  Uk2FilterChipBooleanModule,
  Uk2MenuListItemModule,
} from '@axos/uikit-v2-lib';

import { FilterChipLabelComponent } from './filter-chip-label.component';
import { FilterChipLabelRoutingModule } from './filter-chip-label-routing.module';
import { OverlayModule } from '@angular/cdk/overlay';

@NgModule({
  declarations: [FilterChipLabelComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTableModule,
    MatIconModule,
    DragDropModule,
    OverlayModule,
    Uk2DirectivesModule,
    Uk2MenuListItemModule,
    FilterChipLabelRoutingModule,
    Uk2FilterChipBooleanModule,
    Uk2ChipModule,
    Uk2FilterBarDirectiveModule,
  ],
})
export class FilterChipLabelModule {}
