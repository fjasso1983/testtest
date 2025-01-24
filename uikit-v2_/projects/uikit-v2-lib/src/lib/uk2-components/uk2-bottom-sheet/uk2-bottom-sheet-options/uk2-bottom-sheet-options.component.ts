import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  QueryList,
  SimpleChanges,
  ViewContainerRef,
  OnDestroy,
  ElementRef,
} from '@angular/core';

import { IUk2IsLoading } from '@axos/uikit-v2-lib/src/lib/uk2-internal-utils';

import { MatOption } from '@angular/material/core';
import { MatBottomSheetRef, MatBottomSheet } from '@angular/material/bottom-sheet';

import { Uk2BottomSheetComponent } from '../uk2-bottom-sheet.component';

@Component({
  selector: 'uk2-bottom-sheet-options',
  templateUrl: './uk2-bottom-sheet-options.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Uk2BottomSheetOptionsComponent
  extends Uk2BottomSheetComponent
  implements OnDestroy, OnChanges, IUk2IsLoading
{
  @Input() options: QueryList<MatOption<any>> = new QueryList();
  optionHtmlElements: HTMLElement[] = [];

  constructor(
    public bottomSheetService: MatBottomSheet,
    private matBottomSheet: MatBottomSheetRef,
    public overlay: Overlay,
    public viewContainerRef: ViewContainerRef,
    public elementRef: ElementRef
  ) {
    super(bottomSheetService, matBottomSheet, overlay, viewContainerRef, elementRef);
  }

  ngOnChanges(changes: SimpleChanges) {
    const { options } = changes;

    if (options) {
      this.optionHtmlElements = this.options.map(option => option._getHostElement());
    }
  }

  handleOptionSelected(option: MatOption) {
    option.select();
    this.matBottomSheet.dismiss();
  }
}
