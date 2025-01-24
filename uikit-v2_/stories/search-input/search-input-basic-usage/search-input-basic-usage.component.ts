import { ChangeDetectorRef, Component, Input, OnChanges, SimpleChanges, ViewChild, inject } from '@angular/core';
import { FormControl } from '@angular/forms';

import { Uk2InputSizeEnum, Uk2ListItem, Uk2SearchMenuDirective } from '@axos/uikit-v2-lib';

const OPTIONS: Uk2ListItem[] = [
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
    imageUrl: 'https://v15.angular.io/assets/images/logos/angular/shield-large.svg',
    moneyAmount: 100,
    svgIconName: 'uk2-location-pin',
    bodyText: '',
    headerLabelName: 'Option 5',
    headerLabelIdentifier: '34',
    value: '5',
  },
  {
    showControl: false,
    moneyAmount: 100,
    svgIconName: 'uk2-location-pin',
    bodyText: '',
    headerLabelName: 'Option 6',
    headerLabelIdentifier: '56',
    value: '6',
  },
  {
    showControl: false,
    imageUrl: 'https://v15.angular.io/assets/images/logos/angular/shield-large.svg',
    moneyAmount: 100,
    svgIconName: 'uk2-location-pin',
    bodyText: '',
    headerLabelName: 'Option 7',
    headerLabelIdentifier: '76',
    value: '7',
  },
  {
    showControl: false,
    moneyAmount: 100,
    svgIconName: 'uk2-location-pin',
    bodyText: '',
    headerLabelName: 'Option 8',
    headerLabelIdentifier: '98',
    value: '8',
  },
  {
    showControl: false,
    imageUrl: 'https://v15.angular.io/assets/images/logos/angular/shield-large.svg',
    moneyAmount: 100,
    svgIconName: 'uk2-location-pin',
    bodyText: '',
    headerLabelName: 'Option 9',
    headerLabelIdentifier: '34',
    value: '9',
  },
  {
    showControl: false,
    moneyAmount: 100,
    svgIconName: 'uk2-location-pin',
    bodyText: '',
    headerLabelName: 'Option 10',
    headerLabelIdentifier: '56',
    value: '10',
  },
];

const MORE_OPTIONS: Uk2ListItem[] = [
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
    imageUrl: 'https://v15.angular.io/assets/images/logos/angular/shield-large.svg',
    moneyAmount: 100,
    svgIconName: 'uk2-location-pin',
    bodyText: '',
    headerLabelName: 'Option 5',
    headerLabelIdentifier: '34',
    value: '5',
  },
  {
    showControl: false,
    moneyAmount: 100,
    svgIconName: 'uk2-location-pin',
    bodyText: '',
    headerLabelName: 'Option 6',
    headerLabelIdentifier: '56',
    value: '6',
  },
  {
    showControl: false,
    imageUrl: 'https://v15.angular.io/assets/images/logos/angular/shield-large.svg',
    moneyAmount: 100,
    svgIconName: 'uk2-location-pin',
    bodyText: '',
    headerLabelName: 'Option 7',
    headerLabelIdentifier: '76',
    value: '7',
  },
  {
    showControl: false,
    moneyAmount: 100,
    svgIconName: 'uk2-location-pin',
    bodyText: '',
    headerLabelName: 'Option 8',
    headerLabelIdentifier: '98',
    value: '8',
  },
  {
    showControl: false,
    imageUrl: 'https://v15.angular.io/assets/images/logos/angular/shield-large.svg',
    moneyAmount: 100,
    svgIconName: 'uk2-location-pin',
    bodyText: '',
    headerLabelName: 'Option 9',
    headerLabelIdentifier: '34',
    value: '9',
  },
  {
    showControl: false,
    moneyAmount: 100,
    svgIconName: 'uk2-location-pin',
    bodyText: '',
    headerLabelName: 'Option 10',
    headerLabelIdentifier: '56',
    value: '10',
  },
  {
    showControl: false,
    imageUrl: 'https://v15.angular.io/assets/images/logos/angular/shield-large.svg',
    moneyAmount: 100,
    svgIconName: 'uk2-location-pin',
    bodyText: '',
    headerLabelName: 'Option 11',
    headerLabelIdentifier: '76',
    value: '11',
  },
  {
    showControl: false,
    moneyAmount: 100,
    svgIconName: 'uk2-location-pin',
    bodyText: '',
    headerLabelName: 'Option 12',
    headerLabelIdentifier: '98',
    value: '12',
  },
  {
    showControl: false,
    imageUrl: 'https://v15.angular.io/assets/images/logos/angular/shield-large.svg',
    moneyAmount: 100,
    svgIconName: 'uk2-location-pin',
    bodyText: '',
    headerLabelName: 'Option 13',
    headerLabelIdentifier: '34',
    value: '13',
  },
  {
    showControl: false,
    moneyAmount: 100,
    svgIconName: 'uk2-location-pin',
    bodyText: '',
    headerLabelName: 'Option 14',
    headerLabelIdentifier: '56',
    value: '14',
  },
  {
    showControl: false,
    imageUrl: 'https://v15.angular.io/assets/images/logos/angular/shield-large.svg',
    moneyAmount: 100,
    svgIconName: 'uk2-location-pin',
    bodyText: '',
    headerLabelName: 'Option 15',
    headerLabelIdentifier: '76',
    value: '15',
  },
  {
    showControl: false,
    moneyAmount: 100,
    svgIconName: 'uk2-location-pin',
    bodyText: '',
    headerLabelName: 'Option 16',
    headerLabelIdentifier: '98',
    value: '16',
  },
];

@Component({
  selector: 'basic-usage-search-input',
  templateUrl: './search-input-basic-usage.component.html',
  styleUrls: ['./search-input-basic-usage.component.scss'],
})
export class SearchInputBasicUsageComponent implements OnChanges {
  @Input() filterDelay = 0;
  @Input() optionsLimit = 20;
  @Input() isLoading = false;
  @Input() inputSize: Uk2InputSizeEnum = Uk2InputSizeEnum.large;
  @Input() minimumLengthForSearch = 0;
  @Input() customFormLabel = '';
  @Input() formFieldLabel = '';
  @Input() placeholderText = '';
  @Input() toggleScroll = false;
  @ViewChild('inputElement', { read: Uk2SearchMenuDirective }) uk2SearchMenuDirective!: Uk2SearchMenuDirective;
  cdr = inject(ChangeDetectorRef);

  // hidden properties
  options: Uk2ListItem[] = [...OPTIONS];
  formControl = new FormControl('');

  ngOnChanges(changes: SimpleChanges): void {
    const { toggleScroll, formFieldLabel } = changes;
    if (formFieldLabel && this.uk2SearchMenuDirective) {
      this.uk2SearchMenuDirective['_floatingLabelText'] = changes.formFieldLabel.currentValue;
      this.cdr.markForCheck();
    }
    if (toggleScroll) {
      this.updateOptions();
    }
  }

  private updateOptions() {
    if (this.toggleScroll) {
      this.options = [...MORE_OPTIONS];
    } else {
      this.options = [...OPTIONS];
    }
    this.cdr.detectChanges();
  }
}
