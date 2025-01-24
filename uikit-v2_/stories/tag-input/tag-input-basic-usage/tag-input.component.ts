import { Component, Input, OnChanges, OnInit, SimpleChange, SimpleChanges } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Uk2DropdownSizeEnum } from '@axos/uikit-v2-lib';
import { Uk2IconRegistryService } from '@axos/uikit-v2-lib';

@Component({
  selector: 'storybook-tag-input',
  templateUrl: './tag-input.component.html',
})
export class TagInputComponent implements OnInit, OnChanges {
  @Input() isLoading!: boolean;
  @Input() isRequired = false;
  @Input() disabled = false;
  @Input() hintText = 'Please select an option';
  @Input() placeholderText = 'Lorem ipsum';
  @Input() labelText = 'Options';
  @Input() dropdownSize = Uk2DropdownSizeEnum.large;

  control!: FormControl;
  controlRequired!: FormControl;

  optionList = ['Option 1', 'Option 2', 'Option 3', 'Option 4', 'Option 5', 'Option 6', 'Option 7'];

  constructor(private iconRegistryService: Uk2IconRegistryService) {
    this.control = new FormControl({
      value: [],
      disabled: this.disabled,
    });
    this.controlRequired = new FormControl([], Validators.required);
    this.controlRequired.markAsTouched();
  }

  ngOnInit(): void {
    this.iconRegistryService.registerAllCategories();
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

  onItemRemoved(item: string) {
    const items = this.control.value!;
    this.removeFirst(items, item);
    this.control.setValue(items);
  }

  removeFirst<T>(array: T[], toRemove: T): void {
    const index = array.indexOf(toRemove);
    if (index !== -1) {
      array.splice(index, 1);
    }
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
