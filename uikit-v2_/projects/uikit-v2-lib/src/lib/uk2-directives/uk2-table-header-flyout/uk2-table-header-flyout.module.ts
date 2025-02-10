import { NgModule } from '@angular/core';
import { Uk2TableHeaderFlyoutDirective } from './uk2-table-header-flyout.directive';
import { Uk2FlyoutMenuModule } from '../uk2-flyout-menu';

@NgModule({
  declarations: [Uk2TableHeaderFlyoutDirective],
  imports: [Uk2FlyoutMenuModule],
  exports: [Uk2TableHeaderFlyoutDirective],
})
export class Uk2TableHeaderFlyoutModule {}
