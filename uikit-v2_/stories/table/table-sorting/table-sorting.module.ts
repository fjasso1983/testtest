import { CommonModule } from '@angular/common';
import { TableSortingComponent } from './table-sorting.component';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { NgModule } from '@angular/core';
import { Uk2DirectivesModule, Uk2TableDirectiveModule, Uk2TableSortingDirectiveModule } from '@axos/uikit-v2-lib';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { HttpClientModule } from '@angular/common/http';
import { MatSortModule } from '@angular/material/sort';

@NgModule({
  declarations: [TableSortingComponent],
  imports: [
    CommonModule,
    MatIconModule,
    MatSortModule,
    MatTableModule,
    MatCheckboxModule,
    HttpClientModule,
    Uk2DirectivesModule,
    Uk2TableDirectiveModule,
    Uk2TableSortingDirectiveModule,
  ],
  exports: [TableSortingComponent],
})
export class TableSortingModule {}
