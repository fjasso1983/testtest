import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';

import { Uk2ListItem, Uk2IconRegistryService } from '@axos/uikit-v2-lib';

@Component({
  templateUrl: './mat-option-poc.component.html',
})
export class MatOptionPocComponent {
  credits: Uk2ListItem[] = [
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
      uk2IsDisabled: true,
      uk2IsPending: true,
      uk2ShowDividerLine: true,
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
  ];

  form = this.fb.group({
    toppings: 'No Chevron Credit',
  });

  constructor(private fb: FormBuilder, private iconRegistryService: Uk2IconRegistryService) {
    this.iconRegistryService.registerAllCategories();
  }

  updateCredits() {
    this.credits = [
      {
        showControl: true,
        imageUrl: 'https://v15.angular.io/assets/images/logos/angular/shield-large.svg',
        moneyAmount: 369.33,
        bodyText: 'Tolerably earnestly middleton extremely distrusts',
        headerLabelName: 'No Account number Credit',
        headerLabelIdentifier: '',
        uk2IsDisabled: true,
        uk2IsPending: true,
        uk2ShowDividerLine: true,
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
    ];
  }
}
