import { NgModule } from '@angular/core';

import { Uk2SliderThumbDirective } from './uk2-slider-thumb-directive';
import { Uk2DetectTouchDirective } from './uk2-detect-touch-directive';

@NgModule({
  declarations: [Uk2SliderThumbDirective, Uk2DetectTouchDirective],
  exports: [Uk2SliderThumbDirective, Uk2DetectTouchDirective],
})
export class Uk2InternalUtilsModule {}
