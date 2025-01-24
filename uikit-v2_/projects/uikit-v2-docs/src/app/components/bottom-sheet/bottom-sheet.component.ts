import { Component, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { MatBottomSheet, MatBottomSheetRef } from '@angular/material/bottom-sheet';
//import { uk2ElementResizePosition } from '@axos/uikit-v2-lib';

import { Uk2BottomSheetComponent } from '@axos/uikit-v2-lib';

@Component({
  templateUrl: './bottom-sheet.component.html',
  styles: [
    `
      mat-form-field {
        margin: 15px 0;
      }
    `,
  ],
})
export class BottomSheetComponent {
  //bottomSheetPosition = uk2ElementResizePosition.Right;
  title = 'Lorem ipsum dolor sit amet consecteur augu turpis';
  description =
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Purus neque et amet consequat nam pulvinar ipsum turpis ipsum dolor sit amet, consectetur adipiscing elit. Purus neque et amet consequat nam pulvinar ipsum turpis.';
  titleheadericon = 'Lorem ipsum dolor sit amet consecteur augu turpis (Header2 new)';

  isLoading = true;
  completeTemplateRef!: MatBottomSheetRef;
  group = this.fb.group({
    userType: ['', [Validators.required]],
    options: ['', [Validators.required]],
  });
  @ViewChild('complete') completeTemplate!: TemplateRef<any>;
  @ViewChild('noDescription') noDescriptionTemplate!: TemplateRef<any>;
  @ViewChild('noTitle') noTitleTemplate!: TemplateRef<any>;
  @ViewChild('noFooter') noFooterTemplate!: TemplateRef<any>;
  @ViewChild('skeleton') skeletonTemplate!: TemplateRef<any>;
  @ViewChild('shortContent') shortContentTemplate!: TemplateRef<any>;

  @ViewChild('sidePanelRef') sidePanelRef!: Uk2BottomSheetComponent;

  constructor(private bottomSheetService: MatBottomSheet, private fb: FormBuilder) {}
  /* 
  openOverlay() {
    //this.completeTemplateRef = this.bottomSheetService.open(this.completeTemplate);
    this.sidePanelRef.openBottomSheet();
  } */

  /*   openOverlay() {
    this.completeTemplateRef = this.bottomSheetService.open(this.completeTemplate);
  }
 */
  onClickComplete() {
    this.completeTemplateRef = this.bottomSheetService.open(this.completeTemplate);
  }

  onClickNoDescription() {
    this.bottomSheetService.open(this.noDescriptionTemplate);
  }

  onClickNoTitle() {
    this.bottomSheetService.open(this.noTitleTemplate);
  }

  onClickNoFooter() {
    this.bottomSheetService.open(this.noFooterTemplate);
  }

  onClickSkeleton() {
    this.isLoading = true;
    this.bottomSheetService.open(this.skeletonTemplate);
    setTimeout(() => {
      this.isLoading = false;
    }, 5000);
  }

  onClickShortContent() {
    this.bottomSheetService.open(this.shortContentTemplate);
  }

  openAlert(templateName: string, message: string) {
    alert(`${templateName}: ${message}`);
    if (this.completeTemplateRef) {
      this.completeTemplateRef.dismiss();
    }
  }

  onSubmit() {
    alert(JSON.stringify(this.group.value));
  }
}
