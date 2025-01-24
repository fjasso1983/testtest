import { Uk2InputBehavior } from '../interfaces/uk2-input-behavior.interface';

export class Uk2MatInput implements Uk2InputBehavior {
  constructor(private element: HTMLElement) {}

  isInputDisabled(): boolean {
    return this.element.hasAttribute('disabled');
  }

  isInputFilled(): boolean {
    const input = this.element.closest('input');

    return !!input?.value;
  }
}
