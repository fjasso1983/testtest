import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  HostListener,
  Input,
  Output,
} from '@angular/core';
import { Uk2ChipSizesEnum, Uk2ChipTypesEnum } from './enums';
import { Uk2Icon } from '@axos/uikit-v2-lib/src/lib/uk2-services';
import { IUk2IsLoading } from '@axos/uikit-v2-lib/src/lib/uk2-internal-utils';

@Component({
  selector: 'uk2-chip',
  templateUrl: './uk2-chip.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Uk2ChipComponent implements AfterViewInit, IUk2IsLoading {
  @Input() uk2ChipSize: Uk2ChipSizesEnum = Uk2ChipSizesEnum.small;
  @Input() uk2ChipType: Uk2ChipTypesEnum = Uk2ChipTypesEnum.square;
  @Input() uk2ChipTrailingIcon: Uk2Icon | undefined;
  @Input() uk2ChipLeadingIcon: Uk2Icon | undefined;
  @Input() uk2HasChipIndicator = false;
  @Input() uk2ShowBorder = true;
  @Input() uk2IsDisabled = false;
  @Input() uk2IsActive = false;
  @Input() uk2ChipClass: string | undefined;
  @Input() uk2IsLoading = false;

  @Output() uk2ChipClick: EventEmitter<void> = new EventEmitter<void>();

  private isHoverable: boolean = false;

  constructor(private cd: ChangeDetectorRef) {}

  @HostListener('click', ['$event']) onClick(event: Event): void {
    event.preventDefault();
    if (this.uk2IsDisabled) return;
    this.uk2ChipClick.emit();
  }

  ngAfterViewInit(): void {
    this.isHoverable = this.uk2ChipClick.observers.length > 0;
    this.cd.detectChanges();
  }

  get hasChipLeadingIcon(): boolean {
    return this.uk2ChipLeadingIcon! && this.uk2ChipType === Uk2ChipTypesEnum.square;
  }

  get hasChipIndicator(): boolean {
    return this.uk2HasChipIndicator && this.uk2ChipType === Uk2ChipTypesEnum.rounded;
  }

  get hasChipTrailingIcon(): boolean {
    return this.uk2ChipTrailingIcon! && this.uk2ChipType === Uk2ChipTypesEnum.square;
  }

  public getChipClass() {
    const chipClasses = [`uk2-chip-size-${this.uk2ChipSize}`];
    switch (this.uk2ChipType) {
      case Uk2ChipTypesEnum.rounded: {
        chipClasses.push('rounded');
        break;
      }
      case Uk2ChipTypesEnum.square: {
        chipClasses.push('square');
        break;
      }
    }
    if (this.uk2ChipClass) chipClasses.push(this.uk2ChipClass);
    if (this.uk2IsLoading) {
      chipClasses.push('uk2-loading-chip');
    } else {
      if (this.uk2ShowBorder) chipClasses.push('uk2-bordered-chip');
      if (this.uk2IsDisabled) {
        chipClasses.push('uk2-disabled-chip');
      } else {
        if (this.isHoverable) chipClasses.push('uk2-hover-chip');
        if (this.uk2IsActive) chipClasses.push('uk2-active-chip');
      }
    }

    return chipClasses.join(' ').trim();
  }
}
