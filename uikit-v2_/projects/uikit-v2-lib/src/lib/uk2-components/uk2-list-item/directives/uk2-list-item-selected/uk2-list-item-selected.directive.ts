import { AfterContentInit, ContentChild, Directive, ElementRef, Input, OnDestroy, Optional } from '@angular/core';

import { MatCheckbox } from '@angular/material/checkbox';
import { MatOption } from '@angular/material/core';
import { MatRadioButton, MatRadioChange, MatRadioGroup } from '@angular/material/radio';

import { Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';

import { Uk2ListItem } from '../../types';

@Directive({
  selector: 'uk2-list-item[uk2ListItem]',
})
export class Uk2ListItemSelectedDirective implements AfterContentInit, OnDestroy {
  @Input() uk2ListItem!: Uk2ListItem;

  @ContentChild(MatRadioButton) matRadioButton: MatRadioButton | undefined;
  @ContentChild(MatCheckbox) checkbox: MatCheckbox | undefined;

  private destroy$ = new Subject<void>();

  constructor(
    private el: ElementRef,
    @Optional() private matOption: MatOption,
    @Optional() private matRadioGroup: MatRadioGroup
  ) {}

  ngAfterContentInit(): void {
    this.matOption?.onSelectionChange
      .pipe(
        takeUntil(this.destroy$),
        tap(() => this.handleOptionChange())
      )
      .subscribe();
    this.checkbox?.change
      .pipe(
        takeUntil(this.destroy$),
        tap(() => this.handleCheckboxChange())
      )
      .subscribe();
    this.matRadioGroup?.change
      .pipe(
        takeUntil(this.destroy$),
        tap(({ value: radioValue }: MatRadioChange) => this.handleRadioGroupChange(radioValue))
      )
      .subscribe();
    if (!this.matRadioGroup) {
      this.matRadioButton?.change
        .pipe(
          takeUntil(this.destroy$),
          tap(() => this.handleRadioChange())
        )
        .subscribe();
    }

    this.compareListItemValueWithInputValue();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  compareListItemValueWithInputValue() {
    setTimeout(() => {
      if (this.matRadioGroup?.value === this.uk2ListItem.value) {
        this.addSelectedClass();
        this.el.nativeElement.click();

        return;
      }

      if (this.checkbox?.checked) {
        this.addSelectedClass();

        return;
      }

      if (this.matOption?.selected) {
        this.addSelectedClass();

        return;
      }
    });
  }

  private addSelectedClass() {
    this.el.nativeElement.classList.add('uk2-list-item-selected');
  }

  private removeSelectedClass() {
    this.el.nativeElement.classList.remove('uk2-list-item-selected');
  }

  private handleRadioGroupChange(radioValue: any): void {
    if (radioValue === this.matRadioButton?.value) {
      this.addSelectedClass();

      return;
    }

    this.removeSelectedClass();
  }

  private handleCheckboxChange() {
    if (this.checkbox?.checked) {
      this.addSelectedClass();

      return;
    }

    this.removeSelectedClass();
  }

  private handleOptionChange() {
    if (this.matOption?.selected) {
      this.addSelectedClass();

      return;
    }

    this.removeSelectedClass();
  }

  private handleRadioChange() {
    if (this.matRadioButton?.checked) {
      this.addSelectedClass();

      return;
    }
  }
}
