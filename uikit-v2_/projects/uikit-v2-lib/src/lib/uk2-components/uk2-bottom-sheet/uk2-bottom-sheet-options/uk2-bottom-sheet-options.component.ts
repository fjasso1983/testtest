import { Overlay } from '@angular/cdk/overlay';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  QueryList,
  SimpleChanges,
  ViewContainerRef,
  ElementRef,
} from '@angular/core';

import { IUk2IsLoading, Uk2BottomSheetService } from '@axos/uikit-v2-lib/src/lib/uk2-internal-utils';
import { MatOption } from '@angular/material/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { Uk2BottomSheetComponent } from '../uk2-bottom-sheet.component';

@Component({
  selector: 'uk2-bottom-sheet-options',
  templateUrl: './uk2-bottom-sheet-options.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Uk2BottomSheetOptionsComponent extends Uk2BottomSheetComponent implements OnChanges, IUk2IsLoading {
  @Input() options: QueryList<MatOption<any>> = new QueryList();
  @Input() uk2IsLoading!: boolean;
  @Input() title!: string;
  @Input() description!: string;
  @Input() headerTitle!: string;
  @Input() backButtonLabel!: string;
  @Input() showNavigationIcons!: boolean;
  @Input() showDivider!: boolean;
  optionHtmlElements: HTMLElement[] = [];

  constructor(
    public bottomSheetService: MatBottomSheet,
    public bottomSheetStackService: Uk2BottomSheetService,
    public overlay: Overlay,
    public viewContainerRef: ViewContainerRef,
    public elementRef: ElementRef
  ) {
    super(bottomSheetService, bottomSheetStackService, overlay, viewContainerRef, elementRef);
  }

  ngOnChanges(changes: SimpleChanges) {
    const { options } = changes;

    if (options) {
      this.optionHtmlElements = this.options.map(option => option._getHostElement());
    }
  }

  handleOptionSelected(option: MatOption) {
    option.select();
    this.bottomSheetStackService.closeBottomSheet();
  }

  handleCloseBottomSheet() {
    this.bottomSheetStackService.closeBottomSheet();
  }
}
