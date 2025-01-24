import {
  AfterViewInit,
  ChangeDetectorRef,
  Directive,
  ElementRef,
  HostBinding,
  Input,
  OnDestroy,
  OnInit,
  Output,
  TemplateRef,
  inject,
  EventEmitter,
  HostListener,
} from '@angular/core';
import { NgControl } from '@angular/forms';

import { MatInput } from '@angular/material/input';
import { CdkMenuTrigger, MENU_TRIGGER, PARENT_OR_NEW_MENU_STACK_PROVIDER } from '@angular/cdk/menu';
import { DOWN_ARROW, ENTER, ESCAPE, UP_ARROW } from '@angular/cdk/keycodes';
import {
  ConnectedPosition,
  FlexibleConnectedPositionStrategy,
  Overlay,
  OverlayConfig,
  OverlayRef,
} from '@angular/cdk/overlay';

import { Subject, fromEvent } from 'rxjs';
import { filter, takeUntil, debounceTime } from 'rxjs/operators';

import { MATERIAL_CLASSES } from '@axos/uikit-v2-lib/src/lib/uk2-internal-utils';

@Directive({
  selector: 'input[uk2SearchMenu]',
  exportAs: 'uk2SearchMenu',
  providers: [
    {
      provide: MENU_TRIGGER,
      useExisting: CdkMenuTrigger,
    },
    PARENT_OR_NEW_MENU_STACK_PROVIDER,
  ],
})
export class Uk2SearchMenuDirective extends CdkMenuTrigger implements OnInit, OnDestroy, AfterViewInit {
  /* eslint-disable @angular-eslint/no-input-rename */
  @Input('uk2SearchMenu') menuTemplateRef!: TemplateRef<unknown> | null;
  @Input('uk2SearchMenuPosition') menuPosition!: ConnectedPosition[];
  @Input('uk2SearchMenuTriggerData') menuData: unknown;
  @Input() uk2SearchMenuMinimumLength: number = 0;
  @Input() uk2SearchInputCustomLabel: string = '';
  /* eslint-disable @angular-eslint/no-output-rename */
  @Output('uk2SearchMenuOpened') opened = new EventEmitter<void>();
  @Output('uk2SearchMenuClosed') closed = new EventEmitter<void>();
  // public property used in Uk2SearchMenuOverlayDirective
  public nativeEl!: HTMLInputElement;

  private readonly elementRef: ElementRef<HTMLInputElement> = inject(ElementRef);
  private readonly _cdr = inject(ChangeDetectorRef);
  private _destroyed$ = new Subject<void>();
  private _matInput = inject(MatInput);
  private _ngControl = inject(NgControl, { optional: true });
  private _floatingLabelText!: string;

  constructor() {
    super();
    this.nativeEl = this.elementRef.nativeElement;
  }

  @HostBinding('attr.role') get role() {
    return 'searchbox';
  }

  @HostListener('click', ['$event']) preventInputClickEvent(event: Event) {
    event.preventDefault();
  }

  @HostListener('mousedown', ['$event']) preventInputMouseDown(event: Event) {
    event.preventDefault();
  }

  ngOnInit(): void {
    this.addUk2Class();
    this.listenTabKeydownEvent();
    this.listenKeyupEvents();
    this.listenWindowResize();
  }

  ngAfterViewInit(): void {
    const formField = this._matInput['_formField'] as any;
    this._floatingLabelText = formField._floatingLabel.element.innerText;
    this.listenClickEventsInMatFormField();

    this._matInput.stateChanges.pipe(takeUntil(this._destroyed$)).subscribe(() => {
      this.setFormFieldLabel();
      // listen inputs to change the overlay to error state styles if form field is invalid
      setTimeout(() => {
        this._updateOverlayStyles();
      });
    });
  }

  // Listen click events on form field to open the menu
  listenClickEventsInMatFormField() {
    const matFormField: HTMLElement | null = this._getMatFormFieldWrapper();
    if (matFormField) {
      fromEvent(matFormField, 'click')
        .pipe(
          takeUntil(this._destroyed$),
          filter(() => !this.elementRef.nativeElement.disabled)
        )
        .subscribe(() => {
          this.open();
          this._cdr.detectChanges();
        });
    }
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
    this._destroyed$.next();
    this._destroyed$.complete();
  }

  focusOverlay(event: Event) {
    if (this.isOpen()) {
      this['overlayRef']?.overlayElement.querySelector<HTMLElement>('.uk2-search-menu-overlay')?.focus();

      event.preventDefault();
    }
  }

  addUk2Class() {
    const formFieldEl = this._getMatFormField();
    if (formFieldEl) {
      formFieldEl.classList.add('uk2-search-menu-form-field');
    }
  }

  _handleClick(): void {
    if (this.isOpen()) return;
    this.open();
  }

  _toggleOnKeydown(event: KeyboardEvent) {
    if (event.keyCode === ESCAPE) {
      if (this.isOpen()) {
        this.close();
      }

      this._getMatFormField()?.querySelector<HTMLElement>('.uk2-search-input-icon')?.focus();
      return;
    }

    if (event.keyCode === DOWN_ARROW || event.keyCode === UP_ARROW) {
      event.preventDefault();

      return;
    }

    if (event.keyCode === ENTER) {
      event.preventDefault();

      return;
    }

    setTimeout(() => {
      if (this['_elementRef'].nativeElement.value !== '') {
        this.open();
      }
      this._cdr.detectChanges();
    });
  }

  // Open overlay and config overlay styles
  open() {
    if (this.elementRef.nativeElement.value.length >= this.uk2SearchMenuMinimumLength) {
      if (!this.isOpen() && this.menuTemplateRef !== null) {
        this.overlayRef = this.overlayRef || (this['_overlay'].create(this.getOverlayConfig()) as OverlayRef);
        this._setOverlayWidth();
        this._addUk2OverlayClass();
        this._addUk2ActiveClassFormField();
        this._updateOverlayStyles();
        this.overlayRef.attach(this.getMenuContentPortal());
        this.opened.next();

        // Subscribe to the overlayRef's outsidePointerEvents to close the menu when clicking outside of it
        this.overlayRef
          .outsidePointerEvents()
          .pipe(takeUntil(this.closed))
          .subscribe((ev: any) => {
            // If click is targeting form field, avoid closing the menu
            if (ev.target.closest('.uk2-search-menu-form-field')) return;

            this.close();
          });
      }
    }
  }

  // Close overlay and change form field styles
  close() {
    if (this.isOpen()) {
      this.closed.next();

      this._removeUk2ActiveClassFormField();
      this.overlayRef!.detach();

      setTimeout(() => {
        this.setFormFieldLabel();
        this.elementRef.nativeElement.focus();
      });
    }
  }

  clearInputAndFocus() {
    if (this.elementRef.nativeElement) {
      if (this._ngControl?.control) {
        this._ngControl.control.setValue('');
      } else {
        this.elementRef.nativeElement.value = '';
      }
      this.elementRef.nativeElement.focus();
    }
  }

  private _updateOverlayStyles() {
    // Set error state to overlay if matInput has errors
    if (this.isOpen()) {
      this._matInput.errorState
        ? this.overlayRef?.addPanelClass('uk2-search-menu-overlay-pane-error')
        : this.overlayRef?.removePanelClass('uk2-search-menu-overlay-pane-error');
    }
    this._cdr.detectChanges();
  }

  private _getMatFormFieldWrapper(): HTMLElement | null {
    return this.elementRef.nativeElement.closest(`.${MATERIAL_CLASSES.matTextFieldWrapper}`);
  }

  private _getMatFormField(): HTMLElement | null {
    return this.elementRef.nativeElement.closest(`.${MATERIAL_CLASSES.formField}`);
  }

  private _setOverlayWidth(): void {
    const matFormFieldWrapperEl = this._getMatFormFieldWrapper();
    const overlayRef = this['overlayRef'];
    if (matFormFieldWrapperEl && overlayRef) {
      const width = matFormFieldWrapperEl.getBoundingClientRect().width;
      overlayRef.updateSize({ width });
    }
  }

  private _addUk2OverlayClass() {
    this['overlayRef']?.addPanelClass('uk2-search-menu-overlay-pane');
  }

  private _removeUk2ActiveClassFormField() {
    this._getMatFormField()?.classList.remove('uk2-search-menu-form-field-active');
  }
  private _addUk2ActiveClassFormField() {
    this._getMatFormField()?.classList.add('uk2-search-menu-form-field-active');
  }

  private setFormFieldLabel() {
    const formField = this._matInput['_formField'] as any;
    if (this._matInput.focused) {
      formField._floatingLabel.element.querySelector('mat-label').innerText =
        this.uk2SearchInputCustomLabel || this._matInput.placeholder;
    } else if (!this.isOpen()) {
      formField._floatingLabel.element.querySelector('mat-label').innerText = this._floatingLabelText;
    }
  }

  private listenWindowResize() {
    // listen window resize to update overlay width
    fromEvent(window, 'resize')
      .pipe(takeUntil(this.destroyed), debounceTime(50))
      .subscribe(() => {
        this._setOverlayWidth();
      });
  }

  private listenKeyupEvents() {
    // listen all keyup events to close the menu when input is less than the minimum length
    fromEvent<KeyboardEvent>(this.elementRef.nativeElement, 'keyup')
      .pipe(takeUntil(this._destroyed$))
      .subscribe(() => {
        if (this.elementRef.nativeElement.value.length < this.uk2SearchMenuMinimumLength) {
          this.close();
        }
      });
  }

  private listenTabKeydownEvent() {
    // Focus overlay when tab is pressed and input is empty
    fromEvent<KeyboardEvent>(this.elementRef.nativeElement, 'keydown')
      .pipe(
        takeUntil(this._destroyed$),
        filter(event => event.key === 'Tab' && !this.elementRef.nativeElement.value)
      )
      .subscribe(event => {
        this.focusOverlay(event);
      });
  }

  private getOverlayConfig() {
    return new OverlayConfig({
      positionStrategy: this.getOverlayPositionStrategy(),
      scrollStrategy: this['_overlay'].scrollStrategies.reposition(),
      direction: super['_directionality'] || undefined,
    });
  }

  private getOverlayPositionStrategy(): FlexibleConnectedPositionStrategy {
    const connectedPosition: ConnectedPosition = {
      originX: 'start',
      originY: 'bottom',
      overlayX: 'start',
      overlayY: 'top',
    };
    const matFormFieldWrapperEl = this._getMatFormFieldWrapper() as HTMLElement;
    return (this['_overlay'] as Overlay)
      .position()
      .flexibleConnectedTo(matFormFieldWrapperEl)
      .withLockedPosition()
      .withPush(false)
      .withGrowAfterOpen()
      .withPositions([connectedPosition]);
  }
}
