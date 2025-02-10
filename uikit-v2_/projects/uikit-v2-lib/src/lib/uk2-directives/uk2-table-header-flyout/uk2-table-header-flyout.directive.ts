import {
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
  Optional,
  Output,
  Renderer2,
} from '@angular/core';
import { Uk2FlyoutMenuDirective, Uk2FlyoutMenuXPosition } from '../uk2-flyout-menu';
import { Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';
import { uk2TableHeaderFlyoutConstant } from './constants';

@Directive({
  selector: 'mat-header-cell[uk2TableHeaderFlyout][uk2FlyoutMenu]',
})
export class Uk2TableHeaderFlyoutDirective implements OnInit, OnDestroy {
  @Input() uk2DisableFlyoutPositionOverride = false;
  @Input() uk2DisableFlyoutClassOverride = false;
  @Input() uk2DisableOpeningFlyout = false;

  @Output() uk2HeaderCellWasClicked = new EventEmitter<void>();

  private destroy$ = new Subject<void>();

  constructor(
    @Optional() private flyoutMenuDirective: Uk2FlyoutMenuDirective,
    private el: ElementRef<HTMLElement>,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    if (!this.flyoutMenuDirective) {
      throw new Error(uk2TableHeaderFlyoutConstant.errorMessages.undefinedFlyoutDirective);
    }

    this.el.nativeElement.classList.add('uk2-table-header-flyout-cell');
    this.setInitialFlyoutPosition();
    this.setInitialFlyoutClass();
    this.setFlyoutCloseListener();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  @HostListener('click', ['$event'])
  @HostListener('contextmenu', ['$event'])
  onClick(event: Event): void {
    event.preventDefault();
    this.handleElementClick();
  }

  private setInitialFlyoutPosition() {
    if (this.uk2DisableFlyoutPositionOverride) {
      return;
    }

    this.flyoutMenuDirective.uk2OriginXPosition = Uk2FlyoutMenuXPosition.start;
    this.flyoutMenuDirective.uk2OverlayXPosition = Uk2FlyoutMenuXPosition.start;
    this.flyoutMenuDirective.uk2OverlayYOffset = 2;
  }

  private setInitialFlyoutClass() {
    if (this.uk2DisableFlyoutClassOverride) {
      return;
    }

    this.flyoutMenuDirective.uk2OverlayPanelClass = 'uk2-header-flyout-menu';
  }

  private setFlyoutCloseListener() {
    this.flyoutMenuDirective.uk2OverlayClosed
      .pipe(
        takeUntil(this.destroy$),
        tap(() => {
          this.toggleActiveClass(false);
        })
      )
      .subscribe();
  }

  private handleElementClick() {
    if (!this.uk2DisableOpeningFlyout) {
      this.flyoutMenuDirective.open();
      this.toggleActiveClass(true);
    }
    this.uk2HeaderCellWasClicked.emit();
  }

  private toggleActiveClass(isActive: boolean) {
    if (isActive) {
      this.renderer.addClass(this.el.nativeElement, 'uk2-table-header-cell-active');
    } else {
      this.renderer.removeClass(this.el.nativeElement, 'uk2-table-header-cell-active');
    }
  }
}
