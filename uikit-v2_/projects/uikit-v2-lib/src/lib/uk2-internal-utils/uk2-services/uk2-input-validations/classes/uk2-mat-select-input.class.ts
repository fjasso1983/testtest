import { Uk2InputBehavior } from '../interfaces/uk2-input-behavior.interface';
import { MATERIAL_CLASSES } from '../../../uk2-constants/material-classes.constants';

export class Uk2MatSelectInput implements Uk2InputBehavior {
  constructor(private element: HTMLElement) {}

  isInputDisabled(): boolean {
    return this.element.classList.contains('mat-select-disabled');
  }

  isInputFilled(): boolean {
    const matSelect = this.element.closest('mat-select');

    return matSelect ? !matSelect.classList.contains(`${MATERIAL_CLASSES.selectEmpty}`) : false;
  }
}
