import { AfterViewInit, Directive, ElementRef, HostListener, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { Subject } from 'rxjs';
import { take, takeUntil, tap } from 'rxjs/operators';

import { MatChipListbox, MatChipOption } from '@angular/material/chips';
import { MatSelect } from '@angular/material/select';

import { MATERIAL_CLASSES, Uk2FormField } from '@axos/uikit-v2-lib/src/lib/uk2-internal-utils';
import { UK2_TAG_INPUT_CHIPS_CLASSES } from './constants';
import { UK2_DROPDOWN_CLASSES } from '../uk2-dropdown/uk2-dropdown-single/constants';

@Directive({
  selector: 'mat-chip-option[uk2TagInputChips]',
})
export class Uk2TagInputChipsDirective extends Uk2FormField implements OnInit, AfterViewInit, OnDestroy {
  private destroy$ = new Subject<void>();

  constructor(
    elementRef: ElementRef,
    renderer: Renderer2,
    public host: MatChipOption,
    public select: MatSelect,
    public chipListHost: MatChipListbox
  ) {
    super(renderer, elementRef);
  }

  @HostListener('destroyed') onDestroyed() {
    this.chipListHost.chipFocusChanges
      .pipe(
        take(1),
        tap(() => {
          this.select.focus();
        })
      )
      .subscribe();
    this.inputFilled();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  ngAfterViewInit(): void {
    this.addClass();
    this.initialConfigChip();
  }

  ngOnInit(): void {
    if (this.host) {
      this.select.stateChanges.pipe(takeUntil(this.destroy$)).subscribe(() => {
        this.host.disabled = this.select.disabled;
      });
    }
  }

  addClass() {
    const listBox = this.element.closest(`.${MATERIAL_CLASSES.chipListBox}`);

    this.element.classList.add(UK2_TAG_INPUT_CHIPS_CLASSES.tagInputChips);
    listBox?.classList.add(UK2_TAG_INPUT_CHIPS_CLASSES.tagInputListBox);
  }

  initialConfigChip() {
    this.host.removable = true;
    this.host.selectable = false;
  }

  private get element(): HTMLElement {
    return this.elementRef.nativeElement;
  }

  inputFilled() {
    const isArrayWithValues = this.select.value instanceof Array && this.select.value.length > 0;
    if (isArrayWithValues) {
      this.renderer.addClass(this.getFormField(), UK2_DROPDOWN_CLASSES.filled);
    } else {
      this.renderer.removeClass(this.getFormField(), UK2_DROPDOWN_CLASSES.filled);
    }
  }
}
