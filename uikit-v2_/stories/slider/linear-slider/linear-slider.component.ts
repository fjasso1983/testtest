import { Component, Input } from '@angular/core';

import { Uk2SliderVariantEnum } from '@axos/uikit-v2-lib';

@Component({
  selector: 'slider-component',
  templateUrl: './linear-slider.component.html',
  styleUrls: ['./linear-slider.component.css'],
})
export class LinearSliderComponent {
  @Input() maxText = 'Max';
  @Input() minText = 'Min';
  @Input() minValue = 0;
  @Input() maxValue = 100;
  @Input() step = 1;
  @Input() value = 44;
  @Input() variant: Uk2SliderVariantEnum = Uk2SliderVariantEnum.solid;
  @Input() isLoading = false;

  constructor() {}
}
