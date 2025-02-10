import { Injectable } from '@angular/core';
import { IUk2BottomSheet } from '../../../../uk2-interfaces';
import { MatBottomSheet, MatBottomSheetRef } from '@angular/material/bottom-sheet';

@Injectable()
export class Uk2BottomSheetSingleModeService implements IUk2BottomSheet {
  private bottomSheetRef: MatBottomSheetRef<any> | undefined;

  constructor(private bottomSheetService: MatBottomSheet) {}

  get currentBottomSheet(): MatBottomSheetRef<any> | undefined {
    return this.bottomSheetRef;
  }

  openBottomSheet(template: any, config?: any): void {
    this.bottomSheetRef = this.bottomSheetService.open(template, config);
  }

  closeBottomSheet(): void {
    this.bottomSheetRef?.dismiss();
  }
}
