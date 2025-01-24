import { Component, Input, OnInit } from '@angular/core';
import { Uk2IconRegistryService, Uk2InputSizeEnum } from '@axos/uikit-v2-lib';

@Component({
  selector: 'storybook-input',
  templateUrl: './input-basic-usage.component.html',
  styleUrls: ['./input-basic-usage.component.scss'],
})
export class InputBasicUsageComponent implements OnInit {
  @Input() uk2IsLoading = false;
  @Input() labelText = 'First name';
  @Input() placeholderText = 'Some placeholder';
  @Input() helperText = 'Please enter your first name.';
  @Input() errorText = 'Your error message';
  @Input() isDisabled = false;
  @Input() inputSize = Uk2InputSizeEnum.large;

  valueInput = '';
  constructor(private iconRegistryService: Uk2IconRegistryService) {}

  ngOnInit(): void {
    this.iconRegistryService.registerAllCategories();
  }
}
