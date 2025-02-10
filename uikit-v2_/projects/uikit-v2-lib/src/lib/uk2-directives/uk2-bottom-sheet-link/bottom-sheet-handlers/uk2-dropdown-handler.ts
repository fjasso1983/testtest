import { MatSelect } from '@angular/material/select';

import { debounceTime, take, takeUntil } from 'rxjs/operators';

import { Uk2BottomSheetHandler } from '../interface/Uk2BottomSheetHandler.interface';
import { UK2_BOTTOM_SHEET_VIEWPORT } from '../uk2-bottom-sheet-link.directive';
import { Subject, fromEvent } from 'rxjs';
import { Uk2BottomSheetService } from '@axos/uikit-v2-lib/src/lib/uk2-internal-utils';

export class Uk2DropdownHandler implements Uk2BottomSheetHandler {
  private _destroy = new Subject<void>();
  private _open: any;

  constructor(private bottomSheetService: Uk2BottomSheetService, private matSelect: MatSelect) {}

  onInit(): void {
    this._open = this.matSelect?.open;
    this.chooseSelectionOption();
    fromEvent(window, 'resize')
      .pipe(takeUntil(this._destroy), debounceTime(50))
      .subscribe(() => {
        this.closeResponsiveFlyDown();
        this.chooseSelectionOption();
      });
  }

  onDestroy(): void {
    this._destroy.next();
    this._destroy.complete();
  }

  onBlur(): void {
    this.bottomSheetService.currentBottomSheet
      ?.afterOpened()
      .pipe(take(1))
      .subscribe(() => {
        this.matSelect?.ngControl?.control?.markAsUntouched();
      });
  }

  onClick(): void {
    return;
  }

  chooseSelectionOption() {
    if (window.innerWidth >= UK2_BOTTOM_SHEET_VIEWPORT && this.matSelect) {
      this.matSelect.open = this._open;
    } else {
      this.matSelect.open = () => {};
    }
  }

  closeResponsiveFlyDown() {
    this.matSelect?.close();
    if (this.bottomSheetService) {
      this.bottomSheetService.closeBottomSheet();
    }
  }
}
