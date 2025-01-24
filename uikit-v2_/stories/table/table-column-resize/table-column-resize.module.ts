import { NgModule } from '@angular/core';
import { TableColumnResizeComponent } from './table-column-resize.component';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';
import { Uk2DirectivesModule, Uk2TableColumnResizeDirectiveModule, Uk2TableDirectiveModule } from '@axos/uikit-v2-lib';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';

@NgModule({
  declarations: [TableColumnResizeComponent],
  imports: [
    CommonModule,
    MatIconModule,
    MatTableModule,
    MatCheckboxModule,
    HttpClientModule,
    Uk2DirectivesModule,
    Uk2TableDirectiveModule,
    Uk2TableColumnResizeDirectiveModule,
  ],
  exports: [TableColumnResizeComponent],
})
export class TableColumnResizeModule {}
