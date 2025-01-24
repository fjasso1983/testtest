import { NgModule } from '@angular/core';

import { Uk2FlyoutMenuDirective } from './uk2-flyout-container';
import { Uk2FlyoutMenuHeaderDirective } from './uk2-flyout-header';
import { Uk2FlyoutMenuFooterDirective } from './uk2-flyout-footer';
import { Uk2FlyoutMenuBodyDirective } from './uk2-flyout-body';

@NgModule({
  declarations: [
    Uk2FlyoutMenuDirective,
    Uk2FlyoutMenuHeaderDirective,
    Uk2FlyoutMenuFooterDirective,
    Uk2FlyoutMenuBodyDirective,
  ],
  exports: [
    Uk2FlyoutMenuDirective,
    Uk2FlyoutMenuHeaderDirective,
    Uk2FlyoutMenuFooterDirective,
    Uk2FlyoutMenuBodyDirective,
  ],
})
export class Uk2FlyoutMenuModule {}
