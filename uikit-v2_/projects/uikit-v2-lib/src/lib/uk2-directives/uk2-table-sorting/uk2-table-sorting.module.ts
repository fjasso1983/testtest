import { NgModule } from '@angular/core';
import { MatSortModule } from '@angular/material/sort';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { Uk2TableSortingDirective } from './uk2-table-sorting.directive';
import { Uk2TableHeaderSortingDirective } from './uk2-table-header-sorting';

@NgModule({
  imports: [CommonModule, MatSortModule, MatIconModule],
  declarations: [Uk2TableHeaderSortingDirective, Uk2TableSortingDirective],
  exports: [Uk2TableHeaderSortingDirective, Uk2TableSortingDirective],
})
export class Uk2TableSortingDirectiveModule {}
