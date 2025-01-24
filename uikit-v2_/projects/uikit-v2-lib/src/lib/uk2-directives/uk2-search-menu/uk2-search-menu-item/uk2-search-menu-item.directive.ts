import {
  AfterViewInit,
  Directive,
  ElementRef,
  EventEmitter,
  HostBinding,
  HostListener,
  Output,
  Renderer2,
  inject,
} from '@angular/core';

import { FocusableOption } from '@angular/cdk/a11y';

@Directive({
  selector: '[uk2SearchMenuItem]',
})
export class Uk2SearchMenuItemDirective implements AfterViewInit, FocusableOption {
  @Output() uk2SearchMenuItemSelected = new EventEmitter<void>();
  disabled?: boolean | undefined;
  textContent = '';

  private elementRef = inject(ElementRef);
  private renderer = inject(Renderer2);

  @HostBinding('class.uk2-search-menu-item') get uk2SearchMenuItemClass() {
    return true;
  }

  @HostListener('click') handleClick() {
    this.uk2SearchMenuItemSelected.emit();
  }

  @HostListener('keyup.enter', ['$event']) handleEnterKey(event: Event) {
    event.preventDefault();
    this.uk2SearchMenuItemSelected.emit();
  }

  @HostBinding('attr.role') get role() {
    return 'option';
  }

  ngAfterViewInit(): void {
    this.textContent = this.elementRef.nativeElement.innerText
      .replace(/ /gm, '') // eslint-disable-line no-irregular-whitespace
      .replace(/\r?\n|\r/gm, ' ')
      .trim()
      .toLowerCase();
  }

  focus(): void {
    this.elementRef.nativeElement.focus();
  }

  hide(): void {
    this.renderer.setAttribute(this.elementRef.nativeElement, 'tabindex', '-1');
    this.renderer.addClass(this.elementRef.nativeElement, 'cdk-visually-hidden');
    this.renderer.setStyle(this.elementRef.nativeElement, 'display', 'none');
    this.disabled = true;
  }

  show(): void {
    this.renderer.setAttribute(this.elementRef.nativeElement, 'tabindex', '0');
    this.renderer.removeClass(this.elementRef.nativeElement, 'cdk-visually-hidden');
    this.renderer.setStyle(this.elementRef.nativeElement, 'display', 'block');
    this.disabled = false;
  }
}
