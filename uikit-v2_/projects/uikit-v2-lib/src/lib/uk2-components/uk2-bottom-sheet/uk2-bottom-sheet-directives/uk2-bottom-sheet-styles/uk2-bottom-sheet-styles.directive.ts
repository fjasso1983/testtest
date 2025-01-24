import { Directive, ElementRef, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

import { IUk2IsLoading, MATERIAL_CLASSES } from '@axos/uikit-v2-lib/src/lib/uk2-internal-utils';

@Directive({
  selector: '#uk2-bottom-sheet[uk2BottomSheetStyle]',
})
export class Uk2BottomSheetStyleDirective implements OnInit, OnChanges, IUk2IsLoading {
  @Input() uk2IsLoading!: boolean;
  el = this.elementRef.nativeElement as HTMLElement;
  bottomSheetContainerEl!: HTMLElement;

  constructor(private elementRef: ElementRef) {}

  ngOnInit(): void {
    this.bottomSheetContainerEl = this.el.closest(MATERIAL_CLASSES.matBottomSheetContainer) as HTMLElement;
    if (this.bottomSheetContainerEl) {
      this.setClasses();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.uk2IsLoading) {
      this.setSkeletonClass();
    }
  }

  setClasses() {
    this.bottomSheetContainerEl.classList.add('uk2-bottom-sheet-container');
  }

  setSkeletonClass() {
    this.bottomSheetContainerEl = this.el.closest(MATERIAL_CLASSES.matBottomSheetContainer) as HTMLElement;
    if (!this.bottomSheetContainerEl) return;
    if (this.uk2IsLoading) {
      this.bottomSheetContainerEl.classList.add('uk2-bottom-sheet-container-skeleton');
    } else {
      this.bottomSheetContainerEl.classList.remove('uk2-bottom-sheet-container-skeleton');
    }
  }
}
