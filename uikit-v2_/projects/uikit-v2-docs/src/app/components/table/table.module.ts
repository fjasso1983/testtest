import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';

import {
  Uk2DirectivesModule,
  Uk2FlyoutMenuModule,
  Uk2MenuListItemModule,
  Uk2TableColumnResizeDirectiveModule,
  Uk2TableDirectiveModule,
  Uk2TableHeaderFlyoutModule,
  Uk2TableInlineActionsModule,
  Uk2TableScrollerModule,
  Uk2TableSortingDirectiveModule,
} from '@axos/uikit-v2-lib';

import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { HeaderFlyoutComponent } from './header-flyout/header-flyout.component';
import { InlineTableComponent } from './inline-actions/table-inline-actions.component';
import { TableScrollingResizeComponent } from './scrolling-resize/table-scrolling-resize.component';
import { TableRoutingModule } from './table-routing.module';
import { TableComponent } from './table.component';

const materialImports = [
  MatFormFieldModule,
  MatIconModule,
  MatSortModule,
  MatInputModule,
  MatSelectModule,
  MatTableModule,
  MatCheckboxModule,
  MatSlideToggleModule,
];

const uk2Imports = [
  Uk2DirectivesModule,
  Uk2TableColumnResizeDirectiveModule,
  Uk2TableDirectiveModule,
  Uk2TableInlineActionsModule,
  Uk2FlyoutMenuModule,
  Uk2MenuListItemModule,
  Uk2TableScrollerModule,
  Uk2TableHeaderFlyoutModule,
  Uk2TableSortingDirectiveModule,
];

@NgModule({
  declarations: [TableComponent, InlineTableComponent, TableScrollingResizeComponent, HeaderFlyoutComponent],
  imports: [CommonModule, ReactiveFormsModule, TableRoutingModule, ...materialImports, ...uk2Imports],
})
export class TableModule {}
