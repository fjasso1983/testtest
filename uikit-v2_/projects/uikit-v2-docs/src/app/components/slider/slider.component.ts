import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

import { Uk2SliderVariantEnum } from '@axos/uikit-v2-lib';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss'],
})
export class SliderComponent {
  maxText = new FormControl('Max value of amount in dollars $$$ 000,00.00');
  minText = new FormControl('Min value of amount in dollars $$$ 000,00.00');
  minValue = 0;
  maxValue = 100;
  step = 1;
  sliderValue = 0;
  value = new FormControl(0);
  variant = Uk2SliderVariantEnum.solid;
  isLoading = false;
  readonly uk2SliderVariantEnum = Uk2SliderVariantEnum;

  onValueUpdate(val: number) {
    this.value.setValue(val);
  }

  toggleVariant() {
    this.variant =
      this.variant === Uk2SliderVariantEnum.solid ? Uk2SliderVariantEnum.gradient : Uk2SliderVariantEnum.solid;
  }

  toggleSkeleton() {
    this.isLoading = !this.isLoading;
  }
}
