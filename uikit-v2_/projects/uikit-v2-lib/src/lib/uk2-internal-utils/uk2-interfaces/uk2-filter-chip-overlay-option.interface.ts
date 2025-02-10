import { ElementRef } from '@angular/core';

export interface IUK2FilterChipOverlayOption {
  uk2Multiple: boolean;
  uk2Value: string;
  uk2IsDisabled: boolean;
  uk2Selected: boolean;
  disabled?: boolean;
  checked: boolean;
  elementRef: ElementRef;

  onClick(): void;
  focus(): void;
}
