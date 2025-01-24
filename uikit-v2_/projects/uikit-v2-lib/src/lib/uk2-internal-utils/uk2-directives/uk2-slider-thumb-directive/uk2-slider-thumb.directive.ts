import { Directive, OnInit } from '@angular/core';

import { MaterialSliderPosition } from '../../uk2-constants';

import { MatSlider } from '@angular/material/slider';

@Directive({
  selector: 'mat-slider[uk2SliderThumbStyle]',
})
export class Uk2SliderThumbDirective implements OnInit {
  constructor(private host: MatSlider) {}

  ngOnInit(): void {
    // Prevents mat-slider thumb to move further from the progress bar and not be aligned with min/max labels
    this.host._updateThumbUI = (source: any) => {
      if (this.host['_skipUpdate']()) {
        return;
      }
      const thumb = this.host._thumbs?.first;
      const MAX = this.host._cachedWidth - MaterialSliderPosition.MAX;
      const val = Math.min(Math.max(source.translateX, MaterialSliderPosition.MIN), MAX);

      thumb._hostElement.style.transform = `translateX(${val}px)`;
    };
  }
}
