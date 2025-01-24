import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Uk2IconRegistryService, Uk2InputSizeEnum } from '@axos/uikit-v2-lib';

@Component({
  selector: 'storybook-datepicker-basic-usage',
  templateUrl: './datepicker-basic-usage.component.html',
  styleUrls: ['./datepicker-basic-usage.component.scss'],
})
export class DatepickerBasicUsageComponent implements OnChanges {
  @Input() uk2IsLoading = false;
  @Input() labelText = 'Date';
  @Input() placeholderText = 'MM/DD/YYYY';
  @Input() helperText = 'Please enter date';
  @Input() isDisabled = false;
  @Input() isRequired = true;
  @Input() errorText = 'This field is required';
  @Input() form!: FormGroup;
  @Input() svgIconName = 'uk2-calendar';
  @Input() svgIconHint = 'uk2-exclamation-triangle';
  @Input() uk2InputSize: Uk2InputSizeEnum = Uk2InputSizeEnum.large;
  valueInput = '';

  constructor(private iconRegistryService: Uk2IconRegistryService) {
    this.iconRegistryService.registerAllCategories();
  }

  get date1(): any {
    return this.form.get('date1');
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.form.previousValue != undefined) {
      this.form.setValue({
        date1: changes.form.previousValue.value.date1,
      });
    }
  }
}
