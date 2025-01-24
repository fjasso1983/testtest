import {
  ContentChild,
  Directive,
  ElementRef,
  HostListener,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';

import { MatCheckbox } from '@angular/material/checkbox';
import { MatRadioButton } from '@angular/material/radio';

import { IUk2IsLoading, MATERIAL_CLASSES } from '@axos/uikit-v2-lib/src/lib/uk2-internal-utils';

@Directive({
  selector: 'uk2-list-item[uk2Clickable]',
})
export class Uk2ListItemClickableDirective implements OnInit, OnChanges, IUk2IsLoading {
  @Input() uk2IsLoading!: boolean;
  @Input() uk2IsDisabled!: boolean;
  @ContentChild(MatRadioButton) radioButton: MatRadioButton | undefined;
  @ContentChild(MatCheckbox) checkbox: MatCheckbox | undefined;

  constructor(private el: ElementRef) {}

  ngOnInit(): void {
    this.setCursorStyles();
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { uk2IsLoading, uk2IsDisabled } = changes;
    if (uk2IsLoading || uk2IsDisabled) {
      this.setCursorStyles();
    }
  }

  setCursorStyles() {
    if (this.uk2IsLoading || this.uk2IsDisabled) {
      this.el.nativeElement.style.cursor = 'default';
      this.el.nativeElement.style.pointerEvents = 'none';
    } else {
      this.el.nativeElement.style.cursor = 'pointer';
      this.el.nativeElement.style.pointerEvents = 'auto';
    }
  }

  @HostListener('click', ['$event']) onClick({ target }: PointerEvent): void {
    const element = target as HTMLElement;

    if (element.tagName.toLowerCase() === 'input') return;

    if (this.checkbox) {
      this.checkbox._elementRef.nativeElement.querySelector(`.${MATERIAL_CLASSES.matCheckboxTouchTarget}`)?.click();
    } else if (this.radioButton) {
      this.radioButton._elementRef.nativeElement.querySelector(`.${MATERIAL_CLASSES.matRadioTouchTarget}`)?.click();
    }
  }
}
