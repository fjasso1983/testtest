import { ElementRef, SimpleChanges } from '@angular/core';
import { Uk2ButtonSizeEnum } from './enums';

export class ButtonAbstractDirective {
  constructor(
    protected el: ElementRef<HTMLButtonElement>,
    protected smallClass: string,
    protected mediumClass: string,
    protected largeClass: string,
    protected skeletonClass: string
  ) {}

  protected changeButtonSize(changes: SimpleChanges, uk2ButtonSize: Uk2ButtonSizeEnum): void {
    if (changes.uk2ButtonSize) {
      this.applyButtonSize(uk2ButtonSize);
    }
  }

  protected toggleIsLoading(changes: SimpleChanges, uk2IsLoading: boolean): void {
    if (changes.uk2IsLoading) {
      if (uk2IsLoading) this.el.nativeElement.classList.add(this.skeletonClass);
      else this.el.nativeElement.classList.remove(this.skeletonClass);
    }
  }

  protected applyButtonSize(uk2ButtonSize: Uk2ButtonSizeEnum): void {
    this.el.nativeElement.classList.add(this.getTextButtonClass(uk2ButtonSize));
  }

  private getTextButtonClass(buttonSize: Uk2ButtonSizeEnum): string {
    let cssClass;

    this.el.nativeElement.classList.remove(this.smallClass);
    this.el.nativeElement.classList.remove(this.mediumClass);
    this.el.nativeElement.classList.remove(this.largeClass);

    switch (buttonSize) {
      case Uk2ButtonSizeEnum.small:
        cssClass = this.smallClass;
        break;
      case Uk2ButtonSizeEnum.medium:
        cssClass = this.mediumClass;
        break;
      default:
        cssClass = this.largeClass;
        break;
    }

    return cssClass;
  }
}
