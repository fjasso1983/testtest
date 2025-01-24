import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

import { Uk2FormFieldHintDisplayPatternEnum, Uk2InputSizeEnum, Uk2ListItem } from '@axos/uikit-v2-lib';

@Component({
  selector: 'app-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.scss'],
})
export class SearchInputComponent {
  /**
   * Uk2 Fields
   */
  uk2ListItems: Uk2ListItem[] = [
    {
      showControl: false,
      imageUrl: 'https://v15.angular.io/assets/images/logos/angular/shield-large.svg',
      moneyAmount: 100,
      svgIconName: 'uk2-location-pin',
      bodyText: '',
      headerLabelName: 'Option 1',
      headerLabelIdentifier: '34',
      value: '1',
    },
    {
      showControl: false,
      moneyAmount: 100,
      svgIconName: 'uk2-location-pin',
      bodyText: '',
      headerLabelName: 'Option 2',
      headerLabelIdentifier: '56',
      value: '2',
    },
    {
      showControl: false,
      imageUrl: 'https://v15.angular.io/assets/images/logos/angular/shield-large.svg',
      moneyAmount: 100,
      svgIconName: 'uk2-location-pin',
      bodyText: '',
      headerLabelName: 'Option 3',
      headerLabelIdentifier: '76',
      value: '3',
    },
    {
      showControl: false,
      moneyAmount: 100,
      svgIconName: 'uk2-location-pin',
      bodyText: '',
      headerLabelName: 'Option 4',
      headerLabelIdentifier: '98',
      value: '4',
    },
    {
      showControl: false,
      moneyAmount: 100,
      svgIconName: 'uk2-location-pin',
      bodyText: '',
      headerLabelName: 'Option 4',
      headerLabelIdentifier: '98',
      value: '4',
    },
    {
      showControl: false,
      moneyAmount: 100,
      svgIconName: 'uk2-location-pin',
      bodyText: '',
      headerLabelName: 'Option 4',
      headerLabelIdentifier: '98',
      value: '4',
    },
  ];
  uk2AlwaysVisible = Uk2FormFieldHintDisplayPatternEnum.alwaysVisible;
  uk2InputIsLoading = false;

  /**
   * Form fields
   */
  inputFormControl = new FormControl('');
  extraFormControl = new FormControl('');
  stateDelayControl = new FormControl(500, { nonNullable: true });
  stateLimitControl = new FormControl(3, { nonNullable: true });
  stateMinimumLengthControl = new FormControl(2, { nonNullable: true });
  customLabel = new FormControl('');
  inputSize: Uk2InputSizeEnum = Uk2InputSizeEnum.medium;
  inputDisabled = false;

  onClick(listItem: any) {
    this.inputFormControl.setValue(listItem.headerLabelName);
  }

  toggleDisable() {
    this.inputDisabled = !this.inputDisabled;
    this.inputDisabled ? this.inputFormControl.disable() : this.inputFormControl.enable();
  }

  toggleLoading() {
    this.uk2InputIsLoading = !this.uk2InputIsLoading;
  }

  setDensitySmall() {
    this.inputSize = Uk2InputSizeEnum.small;
  }
  setDensityMedium() {
    this.inputSize = Uk2InputSizeEnum.medium;
  }
  setDensityLarge() {
    this.inputSize = Uk2InputSizeEnum.large;
  }
}
