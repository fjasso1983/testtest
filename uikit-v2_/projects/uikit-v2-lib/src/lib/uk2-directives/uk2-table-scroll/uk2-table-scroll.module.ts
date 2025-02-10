import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Uk2TableScrollDirective } from './uk2-table-scroll.directive';

@NgModule({
  declarations: [Uk2TableScrollDirective],
  imports: [CommonModule],
  exports: [Uk2TableScrollDirective],
})
export class Uk2TableScrollerModule {}
