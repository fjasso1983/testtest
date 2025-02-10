import { AfterViewInit, Directive, ElementRef, Input } from '@angular/core';
import { Uk2TableHeaderRowColorEnum } from '../../enums';
import { Uk2BaseRowDirective } from '../uk2-base-row';

@Directive({
  selector: 'mat-header-row[uk2HeaderRow]',
})
export class Uk2HeaderRowDirective extends Uk2BaseRowDirective implements AfterViewInit {
  private _uk2ColorVariant: Uk2TableHeaderRowColorEnum = Uk2TableHeaderRowColorEnum.grey;
  @Input()
  public set uk2ColorVariant(colorVariant: Uk2TableHeaderRowColorEnum) {
    this._uk2ColorVariant = colorVariant;
    Object.keys(Uk2TableHeaderRowColorEnum).map(colorVariant =>
      this.elementRef.nativeElement.classList.remove(`${this.baseCSSClass}-${colorVariant}`)
    );
    this.elementRef.nativeElement.classList.add(`${this.baseCSSClass}-${colorVariant}`);
  }

  constructor(protected elementRef: ElementRef<HTMLElement>) {
    super(elementRef, 'uk2-header-row');
  }

  override ngAfterViewInit(): void {
    this.elementRef.nativeElement.classList.add(this.baseCSSClass);
    this.elementRef.nativeElement.classList.add(`${this.baseCSSClass}-${this._uk2ColorVariant}`);
  }
}
