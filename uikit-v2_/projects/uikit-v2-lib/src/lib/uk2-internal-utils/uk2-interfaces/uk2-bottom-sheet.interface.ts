import { MatBottomSheetRef } from '@angular/material/bottom-sheet';

export interface IUk2BottomSheet {
  openBottomSheet(template: any, config?: any): void;
  closeBottomSheet(): void;

  get currentBottomSheet(): MatBottomSheetRef<any> | undefined;
}
