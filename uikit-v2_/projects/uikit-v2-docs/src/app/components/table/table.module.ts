import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatFormFieldModule } from '@angular/material/form-field';

import {
  Uk2DirectivesModule,
  Uk2TableColumnResizeDirectiveModule,
  Uk2TableDirectiveModule,
  Uk2TableInlineActionsModule,
} from '@axos/uikit-v2-lib';

import { TableComponent } from './table.component';
import { TableRoutingModule } from './table-routing.module';
import { InlineTableComponent } from './inline-actions/table-inline-actions.component';

@NgModule({
  declarations: [TableComponent, InlineTableComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    Uk2DirectivesModule,
    MatTableModule,
    TableRoutingModule,
    MatSlideToggleModule,
    Uk2TableColumnResizeDirectiveModule,
    Uk2TableDirectiveModule,
    Uk2TableInlineActionsModule,
  ],
})
export class TableModule {}
