import { Component, Input, OnChanges } from '@angular/core';

import { MatBottomSheet } from '@angular/material/bottom-sheet';

import {
  Uk2ListItem,
  Uk2ListItemCurrencyOptions,
  Uk2DropdownSizeEnum,
  Uk2IconRegistryService,
} from '@axos/uikit-v2-lib';

@Component({
  selector: 'lib-dropdown',
  templateUrl: './list-item-chevron.component.html',
  styleUrls: ['./list-item-chevron.component.scss'],
})
export class ListItemChevronComponent implements OnChanges {
  @Input() isLoading!: boolean;
  @Input() disabled = false;
  @Input() pending = false;
  @Input() chevronIcon = true;
  @Input() imageUrl = '';
  @Input() moneyAmount = 0;
  @Input() svgIconName = '';
  @Input() bodyText = '';
  @Input() headerLabelName = 'Custom Item';
  @Input() headerLabelIdentifier = '';
  @Input() showDivider = false;
  @Input() currencyOptions: Uk2ListItemCurrencyOptions = {
    currencyCode: 'USD',
    display: 'none',
    digitsInfo: '1',
  };

  bottomSheetListHeader = 'Options';
  bottomSheetListDescription = 'Please select an option';
  dropdownSize = Uk2DropdownSizeEnum.large;
  listItems: Uk2ListItem[] = [
    // custom item
    {
      showControl: this.chevronIcon,
      imageUrl: this.imageUrl,
      moneyAmount: this.moneyAmount,
      svgIconName: this.svgIconName,
      bodyText: this.bodyText,
      headerLabelName: this.headerLabelName,
      headerLabelIdentifier: this.headerLabelIdentifier,
      uk2IsDisabled: this.disabled,
      uk2IsPending: this.pending,
      value: 'Lorem Ipsum',
    },
    // complete item
    {
      showControl: true,
      imageUrl: 'https://v15.angular.io/assets/images/logos/angular/shield-large.svg',
      moneyAmount: 926122.99,
      svgIconName: 'uk2-location-pin',
      bodyText: 'Consecutar sit perlabum',
      headerLabelName: 'Image Credit',
      headerLabelIdentifier: '1234',
      value: '1234',
    },
    // complete item with no identifier
    {
      showControl: true,
      imageUrl: 'https://v15.angular.io/assets/images/logos/angular/shield-large.svg',
      moneyAmount: 369.33,
      bodyText: 'Tolerably earnestly middleton extremely distrusts',
      headerLabelName: 'No Account number Credit',
      headerLabelIdentifier: '',
      value: 'No Account',
    },
    // svg item
    {
      showControl: true,
      imageUrl: '',
      moneyAmount: 10684.5,
      svgIconName: 'uk2-location-pin',
      bodyText: 'Up am intention on dependent questions oh elsewhere september',
      headerLabelName: 'SVG Credit',
      headerLabelIdentifier: '8899',
      value: '8899',
    },
    // no logos item
    {
      showControl: true,
      moneyAmount: 120,
      bodyText: 'In reasonable compliment favourable is connection',
      headerLabelName: 'No Logos Credit',
      headerLabelIdentifier: '6750',
      value: '6750',
    },
    // no logos no chevron item
    {
      showControl: false,
      moneyAmount: 1000000,
      bodyText: 'Two assure edward whence the was',
      headerLabelName: 'No Chevron Credit',
      headerLabelIdentifier: '0077',
      value: '0077',
    },
    // just header text
    {
      showControl: false,
      headerLabelName: 'Text Credit',
      value: 'Text Credit',
    },
    // only description
    {
      showControl: false,
      bodyText:
        'Body text only lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      value: '445',
    },
    {
      showControl: false,
      bodyText: 'Body text only',
      value: '446',
    },
    // only description with chevron
    {
      showControl: true,
      bodyText:
        'Body text only lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      value: '447',
    },
    {
      showControl: true,
      bodyText: 'Body text only',
      value: '448',
    },
    // complete without title
    {
      showControl: true,
      imageUrl: 'https://v15.angular.io/assets/images/logos/angular/shield-large.svg',
      moneyAmount: 926122.99,
      svgIconName: 'uk2-location-pin',
      bodyText: 'Body text only',
      value: '449',
    },
    {
      showControl: true,
      imageUrl: 'https://v15.angular.io/assets/images/logos/angular/shield-large.svg',
      moneyAmount: 926122.99,
      svgIconName: 'uk2-location-pin',
      bodyText:
        'Body text only lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      value: '450',
    },
  ];

  constructor(private iconRegistryService: Uk2IconRegistryService, private bottomSheetService: MatBottomSheet) {
    this.iconRegistryService.registerAllCategories();
  }

  ngOnChanges(): void {
    this.updateCustomOption();
    this.bottomSheetService.dismiss();
  }

  private updateCustomOption() {
    const [_, ...list] = this.listItems;
    this.listItems = [
      {
        showControl: this.chevronIcon,
        imageUrl: this.imageUrl,
        moneyAmount: this.moneyAmount,
        svgIconName: this.svgIconName,
        bodyText: this.bodyText,
        headerLabelName: this.headerLabelName === '' ? 'Empty' : this.headerLabelName,
        headerLabelIdentifier: this.headerLabelIdentifier,
        value: 'Lorem Ipsum',
      },
      ...list,
    ];
  }
}
