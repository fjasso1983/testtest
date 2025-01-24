import { AfterViewInit, Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

import { MatSelect } from '@angular/material/select';
import { CdkConnectedOverlay } from '@angular/cdk/overlay';

import { Uk2FormField } from '@axos/uikit-v2-lib/src/lib/uk2-internal-utils';
import { UK2_DROPDOWN_MULTIPLE_CLASSES } from './constants';

@Directive({
  selector: 'mat-select[uk2Dropdown][multiple]',
})
export class Uk2DropdownMultipleDirective extends Uk2FormField implements AfterViewInit {
  constructor(elementRef: ElementRef<HTMLInputElement>, renderer: Renderer2, public host: MatSelect) {
    super(renderer, elementRef);
  }

  ngAfterViewInit(): void {
    this.addClass();
  }

  @HostListener('selectionChange') onChange() {
    this.updateOverlayPosition();
  }

  addClass() {
    const formField = this.getFormField();
    formField.classList.add(UK2_DROPDOWN_MULTIPLE_CLASSES.tagInput);
  }

  updateOverlayPosition(): void {
    setTimeout(() => {
      const hostSelect = this.host as any;
      const overlayDir: CdkConnectedOverlay = hostSelect._overlayDir;
      overlayDir.overlayRef.updatePosition();
    }, 10);
  }
}
