import { Injectable, Optional } from '@angular/core';
import { IUk2BottomSheet } from '../../uk2-interfaces';
import { Uk2BottomSheetSingleModeService, Uk2BottomSheetStackService } from './services';

@Injectable()
export class Uk2BottomSheetService {
  private bottomSheet: IUk2BottomSheet | null = null;

  constructor(
    @Optional() private bottomSheetSingleMode: Uk2BottomSheetSingleModeService,
    @Optional() private bottomSheetStack: Uk2BottomSheetStackService
  ) {}

  setStrategy(uk2IsStacked: boolean): void {
    this.bottomSheet = uk2IsStacked ? this.bottomSheetStack : this.bottomSheetSingleMode;
  }

  openBottomSheet(template: any, config?: any): void {
    this.bottomSheet?.openBottomSheet(template, config);
  }

  closeBottomSheet(): void {
    this.bottomSheet?.closeBottomSheet();
  }

  get currentBottomSheet() {
    return this.bottomSheet?.currentBottomSheet;
  }
}
