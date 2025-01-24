import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
  OnDestroy,
  OnChanges,
  SimpleChanges,
  Output,
  EventEmitter,
  ElementRef,
} from '@angular/core';

import { MatBottomSheetRef, MatBottomSheet } from '@angular/material/bottom-sheet';

import { IUk2IsLoading } from '@axos/uikit-v2-lib/src/lib/uk2-internal-utils';

import { uk2ElementPositionResize } from '@axos/uikit-v2-lib/src/lib/uk2-directives';

@Component({
  selector: 'uk2-bottom-sheet',
  templateUrl: './uk2-bottom-sheet.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Uk2BottomSheetComponent implements OnChanges, OnDestroy, IUk2IsLoading {
  @ViewChild('uk2BottomSheetTemplate') uk2BottomSheetTemplate!: TemplateRef<any>;

  @Input() title!: string;
  @Input() description!: string;
  @Input() uk2IsLoading!: boolean;
  @Input() titleheadericon!: string;
  @Input() showTitleDivider!: boolean;

  @Input() uk2BottomSheetPosition: uk2ElementPositionResize = uk2ElementPositionResize.Right;
  @Input() uk2BottomSheetWidth: string | number | undefined = '100%';
  @Input() uk2BottomSheetMaxWidth: string | number | undefined = 1280;
  @Input() uk2BottomSheetMinWidth: string | number | undefined = 496;
  @Input() uk2IsBottomSeetResizable = true;

  @Input() uk2BackdropClass = 'uk2-overlay';
  @Input() uk2BottomSheetClass: string | undefined = 'uk2-bottomsheet-custom-class';

  protected bottomSheetStyles: string[] = [];

  private bottomSheetOverlayRef: OverlayRef | undefined;
  //private destroy$ = new Subject();
  // private overlayClose$ = new Subject();

  //@Output() close: EventEmitter<Function> = new EventEmitter();

  constructor(
    public bottomSheetService: MatBottomSheet,
    public ref: MatBottomSheetRef,
    public overlay: Overlay,
    public viewContainerRef: ViewContainerRef,
    public elementRef: ElementRef
  ) {}
  ngOnDestroy(): void {
    //throw new Error('Method not implemented.');
    console.log('implement destroy');
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('on ngOnChanges');

    //console.log(changes);

    //this.updateOverlaySize(changes);
    //this.updateWidth(50);
  }

  private updateWidth(width: string | number): void {
    console.log('updateWidth', this.elementRef.nativeElement.style);

    //this.elementRef.nativeElement.style.width = typeof width === 'number' ? `${width}px` : width;
    this.elementRef.nativeElement.style.width = typeof width === 'number' ? `${width}%` : width;
  }

  private updateOverlaySize(changes: SimpleChanges): void {
    if (this.bottomSheetOverlayRef) {
      if (changes.uk2BottomSheetWidth) {
        this.bottomSheetOverlayRef.updateSize({
          width: changes.uk2BottomSheetWidth.currentValue,
        });
      }
      if (changes.uk2BottomSheetMaxWidth) {
        this.bottomSheetOverlayRef.updateSize({
          maxWidth: changes.uk2BottomSheetMaxWidth.currentValue,
        });
      }
      if (changes.uk2BottomSheetMinWidth) {
        this.bottomSheetOverlayRef.updateSize({
          minWidth: changes.uk2BottomSheetMinWidth.currentValue,
        });
      }
    }
  }

  openBottomSheet() {
    /*  console.log(
      'size properties',
      this.uk2BottomSheetWidth,
      ' ',
      this.uk2BottomSheetMaxWidth,
      ' ',
      this.uk2BottomSheetMinWidth
    ); */
  }

  closeBottomSheet(): void {
    this.ref.dismiss();
  }

  /*  close(): void {
    this.closeButtonCallback.emit();
    this.ref.dismiss();
  } */
}
