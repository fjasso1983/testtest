import { Component, Input, EventEmitter, Output, OnInit } from '@angular/core';

import { IUk2IsLoading } from '@axos/uikit-v2-lib/src/lib/uk2-internal-utils';

import { Uk2SliderVariantEnum } from './enums';

@Component({
  selector: 'uk2-slider',
  templateUrl: './uk2-slider.component.html',
})
export class Uk2SliderComponent implements OnInit, IUk2IsLoading {
  @Input() maxValueLabel!: string;
  @Input() minValueLabel!: string;
  @Input() minValue!: number;
  @Input() maxValue!: number;
  @Input() step!: number;
  @Input() variant: Uk2SliderVariantEnum = Uk2SliderVariantEnum.solid;
  @Input() value = 0;
  @Input() uk2IsLoading = false;
  @Output() valueChange = new EventEmitter<number>();

  readonly uk2SliderVariantEnum = Uk2SliderVariantEnum;

  ngOnInit(): void {
    this.valueChange.emit(this.value);
  }

  onValueChange(value: number) {
    this.valueChange.emit(value);
  }
}
