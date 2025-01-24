import { Component, Input, TemplateRef, ViewChild } from '@angular/core';

import { MatBottomSheet, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { Uk2RadioButtonAlignmentEnum, Uk2RadioButtonSizeEnum } from '@axos/uikit-v2-lib';

@Component({
  selector: 'storybook-bottom-sheet',
  styles: [
    `
      mat-radio-group {
        display: flex;
        flex-direction: column;
        gap: 15px;
        padding: 16px 0;
      }
      mat-radio-group {
        margin: 0 16px;
      }
      mat-radio-group mat-radio-button {
        display: block;
      }
      .radio-label-description {
        margin: 0;
        font-size: 0.5rem;
        color: grey;
      }
    `,
  ],
  templateUrl: './bottom-sheet.component.html',
})
export class BottomSheetComponent {
  @Input() uk2IsLoading = false;
  @Input() title = 'Lorem ipsum dolor sit amet consecteur augu turpis';
  @Input() description =
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Purus neque et amet consequat nam pulvinar ipsum turpis ipsum dolor sit amet, consectetur adipiscing elit. Purus neque et amet consequat nam pulvinar ipsum turpis.';
  @Input() showPrimaryButton = true;
  @Input() showSecondaryButton = false;
  @ViewChild('complete') completeTemplate!: TemplateRef<any>;

  alignment = Uk2RadioButtonAlignmentEnum.left;
  size = Uk2RadioButtonSizeEnum.medium;

  completeTemplateRef!: MatBottomSheetRef;

  constructor(private bottomSheetService: MatBottomSheet) {}

  onClickComplete() {
    this.completeTemplateRef = this.bottomSheetService.open(this.completeTemplate);
  }
}
