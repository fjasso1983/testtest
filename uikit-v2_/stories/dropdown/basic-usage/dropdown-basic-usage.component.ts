import { Component, Input, OnChanges, OnInit, SimpleChange, SimpleChanges } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Uk2DropdownSizeEnum, Uk2FormFieldHintDisplayPatternEnum } from '@axos/uikit-v2-lib';

@Component({
  selector: 'lib-dropdown',
  templateUrl: './dropdown-basic-usage.component.html',
  styleUrls: ['./dropdown-basic-usage.component.scss'],
})
export class DropdownComponent implements OnInit, OnChanges {
  @Input() isLoading!: boolean;
  @Input() isRequired = false;
  @Input() disabled = false;
  @Input() dropdownSize = Uk2DropdownSizeEnum.large;
  @Input() hintText = 'Please select an option';
  @Input() placeholderText = 'Lorem ipsum';
  @Input() labelText = 'Options';
  @Input() bottomSheetListHeader = 'Options';
  @Input() bottomSheetListDescription = 'Please select an option';
  behavior: Uk2FormFieldHintDisplayPatternEnum = Uk2FormFieldHintDisplayPatternEnum.alwaysVisible;
  control!: FormControl;
  controlRequired!: FormControl;

  constructor() {
    this.control = new FormControl({
      value: '',
      disabled: this.disabled,
    });
    this.controlRequired = new FormControl('', Validators.required);
    this.controlRequired.markAsTouched();
  }

  ngOnInit(): void {
    if (this.isRequired) {
      this.markAsError();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { isRequired, isLoading, disabled } = changes;

    if (disabled) this.handleDisabled(disabled);
    if (isRequired) this.handleError(isRequired);
    if (isLoading) this.handleIsLoading(isLoading);
  }

  private markAsError() {
    this.control.setValidators(Validators.required);
    this.control.updateValueAndValidity();
    this.control.markAsDirty();
    this.control.markAsTouched();
  }

  private markAsNormal() {
    this.control.clearValidators();
    this.control.updateValueAndValidity();
    this.control.markAsPristine();
    this.control.markAsUntouched();
  }

  private handleError(change: SimpleChange) {
    this.isRequired = change.currentValue;
    if (this.isRequired && !this.disabled) {
      this.markAsError();
    } else {
      this.markAsNormal();
    }
  }

  private handleIsLoading(change: SimpleChange) {
    this.isLoading = change.currentValue;
  }

  private handleDisabled(change: SimpleChange) {
    this.disabled = change.currentValue;
    if (this.disabled) {
      this.control.disable();
    } else {
      this.control.enable();
    }
    if (this.disabled && this.isRequired) {
      this.markAsNormal();
      this.control.disable();
    }
  }
}
