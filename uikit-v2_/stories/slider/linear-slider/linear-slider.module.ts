import { NgModule } from '@angular/core';

import { Uk2SliderModule } from '@axos/uikit-v2-lib';

import { LinearSliderComponent } from './linear-slider.component';

@NgModule({
  declarations: [LinearSliderComponent],
  imports: [Uk2SliderModule],
  exports: [LinearSliderComponent],
})
export class LinearSliderModule {}
