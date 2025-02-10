import { AfterViewInit, ChangeDetectorRef, Directive, ElementRef, OnDestroy, Renderer2 } from '@angular/core';
import { Uk2BaseHeaderCellDirective } from '../uk2-base-header-cell';

@Directive({
  selector: 'mat-header-cell[uk2HeaderInlineActionsCell]',
})
export class Uk2HeaderInlineActionsCellDirective
  extends Uk2BaseHeaderCellDirective
  implements AfterViewInit, OnDestroy
{
  private inlineActionsCellElement: HTMLElement | null = null;
  private onResizeUnsubscribeFn: Function | undefined;
  constructor(
    protected elementRef: ElementRef<HTMLElement>,
    private renderer: Renderer2,
    private changeDetector: ChangeDetectorRef
  ) {
    super(elementRef, 'uk2-header-inline-actions-cell');
  }

  override ngAfterViewInit(): void {
    this.elementRef.nativeElement.classList.add(this.baseCSSClass);
    const rowElement = this.renderer.parentNode(this.elementRef.nativeElement) as HTMLElement;
    const tableElement = this.renderer.parentNode(rowElement) as HTMLElement;
    this.inlineActionsCellElement = tableElement.querySelector('mat-cell[uk2InlineActionsCell]');
    if (this.inlineActionsCellElement) {
      this.fixHeaderCellWidth(this.inlineActionsCellElement);
      this.onResizeUnsubscribeFn = this.renderer.listen(window, 'resize', this.fixHeaderCellWidth.bind(this));
    }
  }

  ngOnDestroy(): void {
    this.onResizeUnsubscribeFn && this.onResizeUnsubscribeFn();
  }

  private fixHeaderCellWidth(inlineActionsCell: HTMLElement): void {
    this.changeDetector.detectChanges();
    const inlineActionCellWidth = inlineActionsCell.offsetWidth + 'px';
    this.renderer.setStyle(this.elementRef.nativeElement, 'width', inlineActionCellWidth);
    this.renderer.setStyle(this.elementRef.nativeElement, 'min-width', inlineActionCellWidth);
    this.renderer.setStyle(this.elementRef.nativeElement, 'max-width', inlineActionCellWidth);
  }
}
