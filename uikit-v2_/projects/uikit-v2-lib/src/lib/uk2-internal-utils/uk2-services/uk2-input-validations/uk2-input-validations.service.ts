import { Injectable } from '@angular/core';

import { Uk2MatSelectInput } from './classes/uk2-mat-select-input.class';
import { Uk2MatInput } from './classes/uk2-mat-input.class';
import { Uk2InputBehavior } from './interfaces/uk2-input-behavior.interface';

@Injectable()
export class Uk2InputValidationsService {
  private input: Uk2InputBehavior | null = null;

  constructor() {}

  setStrategy(element: HTMLElement) {
    const nodeName = element.nodeName;
    switch (nodeName) {
      case 'MAT-SELECT': {
        this.input = new Uk2MatSelectInput(element);
        break;
      }
      default: {
        this.input = new Uk2MatInput(element);
      }
    }
  }

  isInputDisabled() {
    return this.input?.isInputDisabled();
  }

  isInputFilled() {
    return this.input?.isInputFilled();
  }
}
