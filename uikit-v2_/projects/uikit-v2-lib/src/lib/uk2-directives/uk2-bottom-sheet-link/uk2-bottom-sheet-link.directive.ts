import { Directive, HostListener, Input, OnDestroy, OnInit, Optional, TemplateRef } from '@angular/core';

import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatSelect } from '@angular/material/select';

import { Uk2BottomSheetHandler } from './interface/Uk2BottomSheetHandler.interface';
import { Uk2DropdownHandler } from './bottom-sheet-handlers/uk2-dropdown-handler';

export const UK2_BOTTOM_SHEET_VIEWPORT = 768;

@Directive({
  selector: '[uk2BottomSheetLink]',
})
export class Uk2BottomSheetLinkDirective implements OnInit, OnDestroy {
  @Input() uk2BottomSheetRef!: TemplateRef<any>;

  private handler!: Uk2BottomSheetHandler;

  constructor(@Optional() public matSelect: MatSelect, @Optional() private bottomSheetService: MatBottomSheet) {
    if (matSelect) {
      this.handler = new Uk2DropdownHandler(this.bottomSheetService, this.matSelect);
    }
  }

  ngOnInit(): void {
    if (!this.uk2BottomSheetRef) return;
    this.handler.onInit();
  }

  ngOnDestroy(): void {
    this.handler.onDestroy();
  }

  @HostListener('click') onClick() {
    if (window.innerWidth < UK2_BOTTOM_SHEET_VIEWPORT) {
      this.openBottomSheet();
      this.handler.onClick();
    }
  }

  @HostListener('blur') onBlur() {
    if (window.innerWidth < UK2_BOTTOM_SHEET_VIEWPORT) {
      this.handler.onBlur();
    }
  }

  private openBottomSheet() {
    if (this.bottomSheetService) {
      this.bottomSheetService.open(this.uk2BottomSheetRef);
    }
  }
}
