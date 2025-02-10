import { Injectable } from '@angular/core';
import { MatBottomSheet, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { IUk2BottomSheet } from '../../../../uk2-interfaces';

@Injectable()
export class Uk2BottomSheetStackService implements IUk2BottomSheet {
  private templateStack: any[] = [];
  private bottomSheetRef: MatBottomSheetRef<any> | undefined;
  private isOpeningNewBottomSheet = false;

  constructor(private bottomSheet: MatBottomSheet) {}

  get currentBottomSheet(): MatBottomSheetRef<any> | undefined {
    return this.bottomSheetRef;
  }

  openBottomSheet(template: any, config?: any): void {
    this.bottomSheetRef = this.bottomSheet.open(template, config);
    this.templateStack.push(template);
    this.isOpeningNewBottomSheet = this.templateIsInStack(template);

    this.handleBackDropClick();
    this.handleAfterDismissed();
  }

  closeBottomSheet(): void {
    this.templateStack.pop();
    this.bottomSheetRef?.dismiss();
  }

  private handleBackDropClick(): void {
    this.bottomSheetRef!.backdropClick().subscribe(() => {
      this.templateStack.pop();
    });
  }

  private handleAfterDismissed(): void {
    this.bottomSheetRef!.afterDismissed().subscribe(() => {
      if (this.isOpeningNewBottomSheet) {
        this.isOpeningNewBottomSheet = false;
        return;
      }

      const previousTemplate = this.getPreviousTemplate();
      if (previousTemplate) {
        this.bottomSheetRef = this.bottomSheet.open(previousTemplate);
      } else {
        this.bottomSheetRef = undefined;
      }
    });
  }

  private getPreviousTemplate(): any | null {
    if (this.templateStack.length < 1) return null;

    return this.templateStack.pop();
  }

  private templateIsInStack(template: any): boolean {
    return this.templateStack.includes(template);
  }
}
