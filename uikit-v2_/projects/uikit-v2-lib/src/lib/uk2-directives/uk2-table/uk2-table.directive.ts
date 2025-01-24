import { Directive, ElementRef, Input, OnInit, inject } from '@angular/core';

import { Uk2TableBorderStyleEnum, Uk2TableDensityEnum, Uk2TableTextBehaviorEnum } from './enums';
import { IUk2IsLoading } from '@axos/uikit-v2-lib/src/lib/uk2-internal-utils';

@Directive({
  selector: 'mat-table[uk2Table]',
})
export class Uk2TableDirective implements OnInit, IUk2IsLoading {
  @Input()
  set uk2TableBorderType(borderType: Uk2TableBorderStyleEnum) {
    this._uk2TableBorderType = borderType;

    this.addBorderTypeClass();
  }
  @Input()
  set uk2TableDensity(density: Uk2TableDensityEnum) {
    this._uk2TableDensity = density;

    this.addDensityClass();
  }
  @Input()
  set uk2IsLoading(isLoading: boolean) {
    if (isLoading) {
      this.table?.classList.add('uk2-table-loading');
    } else {
      this.table?.classList.remove('uk2-table-loading');
    }
  }
  @Input()
  set uk2TextBehavior(textBehavior: Uk2TableTextBehaviorEnum) {
    switch (textBehavior) {
      case Uk2TableTextBehaviorEnum.wrap: {
        this.table?.classList.add('uk2-table-text-behavior-wrap');
        this.table?.classList.remove('uk2-table-text-behavior-truncate');

        break;
      }
      case Uk2TableTextBehaviorEnum.truncate: {
        this.table?.classList.add('uk2-table-text-behavior-truncate');
        this.table?.classList.remove('uk2-table-text-behavior-wrap');

        break;
      }
    }
  }

  elementRef = inject(ElementRef<HTMLElement>);
  table = this.elementRef.nativeElement as HTMLElement;
  private _uk2TableBorderType: Uk2TableBorderStyleEnum = Uk2TableBorderStyleEnum.none;
  private _uk2TableDensity: Uk2TableDensityEnum = Uk2TableDensityEnum.small;

  ngOnInit(): void {
    this.table.classList.add('uk2-table');
    this.addBorderTypeClass();
    this.addDensityClass();
  }

  private addBorderTypeClass() {
    switch (this._uk2TableBorderType) {
      case Uk2TableBorderStyleEnum.none: {
        this.table.classList.add('uk2-no-borders');
        this.table.classList.remove('uk2-8px-borders');
        this.table.classList.remove('uk2-16px-borders');
        break;
      }
      case Uk2TableBorderStyleEnum.borderRadius8: {
        this.table.classList.add('uk2-8px-borders');
        this.table.classList.remove('uk2-16px-borders');
        this.table.classList.remove('uk2-no-borders');
        break;
      }
      case Uk2TableBorderStyleEnum.borderRadius16: {
        this.table.classList.add('uk2-16px-borders');
        this.table.classList.remove('uk2-8px-borders');
        this.table.classList.remove('uk2-no-borders');
        break;
      }
    }
  }

  private addDensityClass() {
    switch (this._uk2TableDensity) {
      case Uk2TableDensityEnum.small: {
        this.table.classList.add('uk2-table-small');
        this.table.classList.remove('uk2-table-medium');
        this.table.classList.remove('uk2-table-large');
        break;
      }
      case Uk2TableDensityEnum.medium: {
        this.table.classList.add('uk2-table-medium');
        this.table.classList.remove('uk2-table-small');
        this.table.classList.remove('uk2-table-large');
        break;
      }
      case Uk2TableDensityEnum.large: {
        this.table.classList.add('uk2-table-large');
        this.table.classList.remove('uk2-table-medium');
        this.table.classList.remove('uk2-table-small');
        break;
      }
    }
  }
}
