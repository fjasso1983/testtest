import { AfterViewInit, Directive, ElementRef, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

import { IUk2IsInlineLoadingActive } from '@axos/uikit-v2-lib/src/lib/uk2-internal-utils';

@Directive({
  selector:
    'button[uk2PrimaryButton][uk2InlineLoadingStateText][uk2IsInlineLoadingActive], button[uk2SecondaryButton][uk2InlineLoadingStateText][uk2IsInlineLoadingActive], button[uk2TextButton][uk2InlineLoadingStateText][uk2IsInlineLoadingActive]',
})
export class Uk2ButtonInlineLoadingDirective implements OnChanges, OnInit, AfterViewInit, IUk2IsInlineLoadingActive {
  @Input() uk2InlineLoadingStateText!: string;
  @Input() uk2IsInlineLoadingActive = false;

  private buttonElement!: HTMLButtonElement;

  constructor(private elementRef: ElementRef) {}

  ngOnChanges(changes: SimpleChanges) {
    const { uk2IsInlineLoadingActive, uk2InlineLoadingStateText } = changes;

    setTimeout(() => {
      if (uk2IsInlineLoadingActive && uk2IsInlineLoadingActive.currentValue === true) {
        this.activateInlineLoading();
      } else if (uk2IsInlineLoadingActive && uk2IsInlineLoadingActive.currentValue === false) {
        this.deactivateInlineLoading();
      }

      if (this.uk2IsInlineLoadingActive && uk2InlineLoadingStateText) {
        this.updateInlineLoadingText();
      }
    });
  }

  ngOnInit() {
    if (!this.uk2InlineLoadingStateText) {
      throw new Error(
        '[inlineLoadingStateText] is a required property for Uk2ButtonInlineLoadingDirective please provide a valid string value'
      );
    }
    if (typeof this.uk2IsInlineLoadingActive !== 'boolean') {
      throw new Error(
        '[uk2IsInlineLoadingActive] is a required property for Uk2ButtonInlineLoadingDirective please provide a boolean value'
      );
    }
  }

  ngAfterViewInit() {
    this.buttonElement = this.elementRef.nativeElement;
  }

  activateInlineLoading() {
    this.buttonElement.classList.add('uk2-inline-loading-button');
    this.addInlineLoadingButtonText();
    this.buttonElement.addEventListener('keydown', this.handleKeyboardDownEvent);
  }

  deactivateInlineLoading() {
    this.buttonElement.classList.remove('uk2-inline-loading-button');
    this.buttonElement.removeEventListener('keydown', this.handleKeyboardDownEvent);
    this.buttonElement.querySelector('.uk2-inline-loading-button-container')?.remove();
  }

  handleKeyboardDownEvent(keyDownEvent: KeyboardEvent) {
    const key = keyDownEvent.key.toLowerCase();
    if (key === 'enter') {
      keyDownEvent.stopPropagation();
      keyDownEvent.preventDefault();
    }
  }

  addInlineLoadingButtonText(): void {
    const container = document.createElement('span');
    container.classList.add('uk2-inline-loading-button-container');
    const label = document.createElement('span');
    label.classList.add('uk2-inline-loading-button-text');
    label.innerText = this.uk2InlineLoadingStateText;
    container.classList.add('mdc-button__label');
    const dot = document.createElement('span');
    dot.innerText = '.';
    dot.classList.add('uk2-inline-loading-dot-1');
    const dot2 = document.createElement('span');
    dot2.innerText = '.';
    dot2.classList.add('uk2-inline-loading-dot-2');
    const dot3 = document.createElement('span');
    dot3.innerText = '.';
    dot3.classList.add('uk2-inline-loading-dot-3');

    container.appendChild(label);
    container.appendChild(dot);
    container.appendChild(dot2);
    container.appendChild(dot3);

    this.buttonElement.appendChild(container);
  }

  updateInlineLoadingText(): void {
    const labelEl = this.buttonElement.querySelector('.uk2-inline-loading-button-text') as HTMLElement;
    if (!labelEl) return;

    labelEl.innerText = this.uk2InlineLoadingStateText;
  }
}
