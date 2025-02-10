import { Overlay } from '@angular/cdk/overlay';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
  ElementRef,
} from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { IUk2IsLoading, Uk2BottomSheetService } from '@axos/uikit-v2-lib/src/lib/uk2-internal-utils';

@Component({
  selector: 'uk2-bottom-sheet',
  templateUrl: './uk2-bottom-sheet.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Uk2BottomSheetComponent implements IUk2IsLoading {
  @ViewChild('uk2BottomSheetTemplate') uk2BottomSheetTemplate!: TemplateRef<any>;

  @Input() title!: string;
  @Input() description!: string;
  @Input() headerTitle!: string;
  @Input() backButtonLabel!: string;
  @Input() uk2IsLoading!: boolean;
  @Input() uk2BottomSheetHeight: string | number | undefined = '100%';
  @Input() uk2BottomSheetMaxHeight!: number;
  @Input() uk2BottomSheetMinHeight!: number;
  @Input() uk2IsBottomSheetResizable = true;
  @Input() uk2BackdropClass = 'uk2-overlay';
  @Input() uk2BottomSheetClass: string | undefined = 'uk2-bottomsheet-custom-class';
  @Input() showNavigationIcons!: boolean;
  @Input() showDivider!: boolean;
  protected bottomSheetStyles: string[] = [];

  private element: HTMLElement = this.elementRef.nativeElement;
  constructor(
    public bottomSheetService: MatBottomSheet,
    public bottomSheetStackService: Uk2BottomSheetService,
    public overlay: Overlay,
    public viewContainerRef: ViewContainerRef,
    public elementRef: ElementRef
  ) {}

  ngAfterViewInit() {
    const elementC = this.element.querySelector('#uk2-bottom-sheet') as HTMLElement;
    elementC.style.borderTopLeftRadius = '10px';
  }

  closeBottomSheet(): void {
    this.bottomSheetStackService.closeBottomSheet();
  }
}
