import { Directive, ElementRef, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { IUk2IsLoading, MATERIAL_CLASSES } from '@axos/uikit-v2-lib/src/lib/uk2-internal-utils';
import { Uk2ButtonToggleGroupSizeEnum } from './enums';
import { UK2_BUTTON_TOGGLE_GROUP_CLASSES } from './constants/constants';

@Directive({
  selector: 'mat-button-toggle-group[uk2ButtonToggleGroup]:not([appearance]):not([multiple]):not([vertical])',
})
export class Uk2ButtonToggleGroupDirective implements OnInit, OnChanges, IUk2IsLoading {
  @Input() uk2IsLoading = false;
  @Input() size = Uk2ButtonToggleGroupSizeEnum.medium;

  constructor(private elementRef: ElementRef) {}

  ngOnChanges(changes: SimpleChanges): void {
    this.changeButtonSize(changes, this.size);
    this.toggleIsLoading(changes, this.uk2IsLoading);
  }

  ngOnInit(): void {
    this.elementRef.nativeElement.classList.add(UK2_BUTTON_TOGGLE_GROUP_CLASSES.group);
    this.elementRef.nativeElement.querySelectorAll(MATERIAL_CLASSES.matButtonToggle).forEach((element: HTMLElement) => {
      element.classList.add(UK2_BUTTON_TOGGLE_GROUP_CLASSES.item);
      element
        .querySelector(UK2_BUTTON_TOGGLE_GROUP_CLASSES.selectorLabel)
        ?.classList.add(UK2_BUTTON_TOGGLE_GROUP_CLASSES.label);
      element
        .querySelector(UK2_BUTTON_TOGGLE_GROUP_CLASSES.selectorCounter)
        ?.classList.add(UK2_BUTTON_TOGGLE_GROUP_CLASSES.counter);
    });
  }

  changeButtonSize(changes: SimpleChanges, uk2ButtonSize: Uk2ButtonToggleGroupSizeEnum): void {
    if (changes.size) {
      this.elementRef.nativeElement.classList.add(this.getTextButtonClass(uk2ButtonSize));
    }
  }

  toggleIsLoading(changes: SimpleChanges, uk2IsLoading: boolean): void {
    if (changes.uk2IsLoading) {
      if (uk2IsLoading) this.elementRef.nativeElement.classList.add(UK2_BUTTON_TOGGLE_GROUP_CLASSES.skeleton);
      else this.elementRef.nativeElement.classList.remove(UK2_BUTTON_TOGGLE_GROUP_CLASSES.skeleton);
    }
  }

  getTextButtonClass(buttonSize: Uk2ButtonToggleGroupSizeEnum): string {
    let cssClass;

    this.elementRef.nativeElement.classList.remove(UK2_BUTTON_TOGGLE_GROUP_CLASSES.small);
    this.elementRef.nativeElement.classList.remove(UK2_BUTTON_TOGGLE_GROUP_CLASSES.medium);

    switch (buttonSize) {
      case Uk2ButtonToggleGroupSizeEnum.medium:
        cssClass = UK2_BUTTON_TOGGLE_GROUP_CLASSES.medium;
        break;
      default:
        cssClass = UK2_BUTTON_TOGGLE_GROUP_CLASSES.small;
        break;
    }

    return cssClass;
  }
}
