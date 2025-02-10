import { Component, Input, TemplateRef, ViewChild } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { Uk2DropdownSizeEnum, Uk2ListItem } from '@axos/uikit-v2-lib';
import {
  Uk2BottomSheetService,
  Uk2BottomSheetSingleModeService,
  Uk2BottomSheetStackService,
} from '@axos/uikit-v2-lib/src/lib/uk2-internal-utils';

@Component({
  selector: 'storybook-bottom-sheet-multi-stack',
  templateUrl: './bottom-sheet-multi-stack.component.html',
  providers: [Uk2BottomSheetService, Uk2BottomSheetSingleModeService, Uk2BottomSheetStackService],
})
export class BottomSheetMultiStackComponent {
  @Input() uk2IsLoading = false;
  @Input() isDisabled = false;
  @Input() title = 'Lorem ipsum dolor sit amet consecteur augu turpis';
  @Input() headerTitle = 'Lorem ipsum dolor';
  @Input() showNavigationIcons = false;
  @Input() showDivider = false;
  @Input() description =
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Purus neque et amet consequat nam pulvinar ipsum turpis ipsum dolor sit amet, consectetur adipiscing elit. Purus neque et amet consequat nam pulvinar ipsum turpis.';
  @Input() isUk2Stack = false;
  @ViewChild('multiStack') multiStackTemplate!: TemplateRef<any>;
  dropdownSize = Uk2DropdownSizeEnum.medium;
  listItems: Uk2ListItem[] = [
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

  constructor(private bottomSheetService: Uk2BottomSheetService) {}

  openBottomSheet() {
    this.bottomSheetService.setStrategy(this.isUk2Stack);
    this.bottomSheetService.openBottomSheet(this.multiStackTemplate);
  }
}
