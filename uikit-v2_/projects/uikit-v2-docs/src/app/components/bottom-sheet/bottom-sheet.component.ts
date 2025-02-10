import { Component, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { Uk2DropdownSizeEnum, Uk2ListItem, Uk2ListItemCurrencyOptions } from '@axos/uikit-v2-lib';
import {
  Uk2BottomSheetService,
  Uk2BottomSheetSingleModeService,
  Uk2BottomSheetStackService,
} from '@axos/uikit-v2-lib/src/lib/uk2-internal-utils';

@Component({
  templateUrl: './bottom-sheet.component.html',
  styles: [
    `
      mat-form-field {
        margin: 15px 0;
      }
    `,
  ],
  providers: [Uk2BottomSheetService, Uk2BottomSheetSingleModeService, Uk2BottomSheetStackService],
})
export class BottomSheetComponent {
  description =
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Purus neque et amet consequat nam pulvinar ipsum turpis ipsum dolor sit amet, consectetur adipiscing elit. Purus neque et amet consequat nam pulvinar ipsum turpis.';
  headerTitle = 'Lorem ipsum dolor';
  title = 'Lorem ipsum dolor sit amet consecteur augu turpis';

  isLoading = true;
  isRounded: boolean = true;
  completeTemplateRef!: MatBottomSheetRef;
  group = this.fb.group({
    userType: ['', [Validators.required]],
    options: ['', [Validators.required]],
  });
  dropdownSize = Uk2DropdownSizeEnum.large;
  currencyOptions: Uk2ListItemCurrencyOptions = {
    currencyCode: 'USD',
    display: 'none',
    digitsInfo: '1',
  };
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
  @ViewChild('complete') completeTemplate!: TemplateRef<any>;
  @ViewChild('noDescription') noDescriptionTemplate!: TemplateRef<any>;
  @ViewChild('noTitle') noTitleTemplate!: TemplateRef<any>;
  @ViewChild('noFooter') noFooterTemplate!: TemplateRef<any>;
  @ViewChild('skeleton') skeletonTemplate!: TemplateRef<any>;
  @ViewChild('shortContent') shortContentTemplate!: TemplateRef<any>;
  @ViewChild('multipleBottomSheets') multipleBottomSheetsTemplate!: TemplateRef<any>;

  constructor(private bottomSheetService: Uk2BottomSheetService, private fb: FormBuilder) {}

  onClickComplete() {
    this.bottomSheetService.setStrategy(false);
    this.bottomSheetService.openBottomSheet(this.completeTemplate, {
      panelClass: this.isRounded ? 'rounded-border' : 'flat-border',
    });
  }

  onClickNoDescription() {
    this.bottomSheetService.setStrategy(false);
    this.bottomSheetService.openBottomSheet(this.noDescriptionTemplate, {
      panelClass: this.isRounded ? 'rounded-border' : 'flat-border',
    });
  }

  onClickNoTitle() {
    this.bottomSheetService.setStrategy(false);
    this.bottomSheetService.openBottomSheet(this.noTitleTemplate, {
      panelClass: this.isRounded ? 'rounded-border' : 'flat-border',
    });
  }

  onClickNoFooter() {
    this.bottomSheetService.setStrategy(false);
    this.bottomSheetService.openBottomSheet(this.noFooterTemplate, {
      panelClass: this.isRounded ? 'rounded-border' : 'flat-border',
    });
  }

  onClickSkeleton() {
    this.bottomSheetService.setStrategy(false);
    this.isLoading = true;
    this.bottomSheetService.openBottomSheet(this.skeletonTemplate, {
      panelClass: this.isRounded ? 'rounded-border' : 'flat-border',
    });

    setTimeout(() => {
      this.isLoading = false;
    }, 5000);
  }

  onClickShortContent() {
    this.bottomSheetService.setStrategy(false);
    this.bottomSheetService.openBottomSheet(this.shortContentTemplate, {
      panelClass: this.isRounded ? 'rounded-border' : 'flat-border',
    });
  }

  onClickMultipleBottomSheets() {
    this.bottomSheetService.setStrategy(true);
    this.bottomSheetService.openBottomSheet(this.multipleBottomSheetsTemplate, {
      panelClass: this.isRounded ? 'rounded-border' : 'flat-border',
    });
  }

  openAlert(templateName: string, message: string) {
    alert(`${templateName}: ${message}`);
    if (this.completeTemplateRef) {
      this.bottomSheetService.closeBottomSheet();
    }
  }

  onSubmit() {
    alert(JSON.stringify(this.group.value));
  }
}
