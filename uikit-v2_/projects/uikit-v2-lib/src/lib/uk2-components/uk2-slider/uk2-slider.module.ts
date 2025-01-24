import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatSliderModule } from '@angular/material/slider';

import { Uk2InternalUtilsModule } from '@axos/uikit-v2-lib/src/lib/uk2-internal-utils';

import { Uk2SliderComponent } from './uk2-slider.component';

@NgModule({
  declarations: [Uk2SliderComponent],
  imports: [CommonModule, MatSliderModule, Uk2InternalUtilsModule],
  exports: [Uk2SliderComponent],
})
export class Uk2SliderModule {}
