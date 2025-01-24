import {
  AfterViewInit,
  Directive,
  ElementRef,
  HostListener,
  Input,
  OnChanges,
  OnDestroy,
  Renderer2,
  SimpleChanges,
} from '@angular/core';

import { MatSelect, MAT_SELECT_CONFIG } from '@angular/material/select';
import { MatFormField } from '@angular/material/form-field';

import { Subject } from 'rxjs';

import { IUk2IsLoading, MATERIAL_CLASSES, Uk2FormField } from '@axos/uikit-v2-lib/src/lib/uk2-internal-utils';

import { UK2_DROPDOWN_CLASSES } from './constants/constants';
import { Uk2DropdownSizeEnum } from './enums';
import { Uk2DropdownCSSProperty } from './types';

@Directive({
  selector: 'mat-select[uk2Dropdown]',
  providers: [
    {
      provide: MAT_SELECT_CONFIG,
      useValue: {
        overlayPanelClass: UK2_DROPDOWN_CLASSES.overlay,
        disableOptionCentering: true,
      },
    },
  ],
})
export class Uk2DropdownDirective extends Uk2FormField implements AfterViewInit, OnChanges, OnDestroy, IUk2IsLoading {
  @Input() uk2IsLoading = false;
  @Input() uk2DropdownSize = Uk2DropdownSizeEnum.large;
  @Input() uk2CSSProperties: Uk2DropdownCSSProperty[] = [];
  private _destroy = new Subject<void>();
  private _labelAboveEl: any;
  private _panelParent: any;
  private _panelHint: any;

  constructor(
    elementRef: ElementRef<HTMLInputElement>,
    renderer: Renderer2,
    public parent: MatFormField,
    public host: MatSelect
  ) {
    super(renderer, elementRef);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes?.uk2IsLoading || changes?.uk2DropdownSize) {
      this.handleSkeleton(this.uk2IsLoading, this.uk2DropdownSize);
      this.replaceSizeClass('form-field');
      this.replaceSizeClass('dropdown');
    }

    if (changes?.uk2CSSProperties) {
      this.setCSSVariables(changes.uk2CSSProperties.currentValue);
    }
  }

  ngAfterViewInit(): void {
    this.validate();
    this.addClass();
    this.addMaskIcon();
    this.inputFilled();
  }

  ngOnDestroy(): void {
    this._destroy.next();
    this._destroy.complete();
  }

  @HostListener('openedChange') onOpen() {
    this.changeOpenCloseClass();
    this.inputFilled();
    this.hideDisplayPanel();
    this.changePanelClass();
    this.addHint();
    this.toggleHint();
    this.resizePanel();
    this.addGradientEffect();
    this.addScrollEvent();
  }

  @HostListener('selectionChange') onChange() {
    this.inputFilled();
    this.hideDisplayPanelOnClose();
    this.changePanelClass();
  }

  addMaskIcon() {
    const formField = this.getFormField();
    this.renderer.setStyle(
      formField.querySelector(`.${MATERIAL_CLASSES.selectArrowIcon}`),
      '-webkit-mask-image',
      "url('/uk2/assets/svg/icons/uk2-dropdown-chevron-icon.svg')"
    );

    this.renderer.setStyle(
      formField.querySelector(`.${MATERIAL_CLASSES.selectArrowIcon}`),
      'mask-image',
      "url('/uk2/assets/svg/icons/uk2-dropdown-chevron-icon.svg')"
    );
  }

  hideDisplayPanel() {
    if (!this.host.panelOpen || this.host.panel === undefined) {
      return;
    }

    const panel = this.getDropDownPanel().closest('.uk2-dropdown-overlay');
    if (panel) {
      this.renderer.setStyle(panel, 'opacity', 0);
    }
  }

  hideDisplayPanelOnClose() {
    if (!this.host.panelOpen || this.host.panel === undefined) {
      return;
    }
    const panel = this.getDropDownPanel().closest('.uk2-dropdown-overlay');
    if (panel && !this.host.multiple) {
      this.renderer.setStyle(panel, 'opacity', 0);
    }
  }

  renderDisplayPanel() {
    const panel = this.getDropDownPanel().closest('.uk2-dropdown-overlay');
    if (panel) {
      this.renderer.setStyle(panel, 'opacity', 1);
    }
  }

  inputFilled() {
    const isStringWithValue = this.host.value && typeof this.host.value === 'string';
    const isArrayWithValues = this.host.value instanceof Array && this.host.value.length > 0;
    if (isStringWithValue || isArrayWithValues) {
      this.renderer.addClass(this.getFormField(), UK2_DROPDOWN_CLASSES.filled);
    } else {
      this.renderer.removeClass(this.getFormField(), UK2_DROPDOWN_CLASSES.filled);
    }
  }

  addClass() {
    const formField = this.getFormField();
    formField.classList.add(UK2_DROPDOWN_CLASSES.formField);
    formField.classList.add(UK2_DROPDOWN_CLASSES.dropdown);
    formField.classList.add('uk2-form-field-size-' + this.uk2DropdownSize);
    formField.classList.add('uk2-dropdown-size-' + this.uk2DropdownSize);
  }

  getDropDownPanel(): HTMLDivElement {
    return this.host.panel.nativeElement as HTMLDivElement;
  }

  changeOpenCloseClass() {
    const formField = this.getFormField();
    if (this.host.panelOpen) {
      this.renderer.addClass(this.getFormField(), UK2_DROPDOWN_CLASSES.open);
      const panel = this.getDropDownPanel().closest('.uk2-dropdown-overlay');
      if (!panel) return;
      if (this.host.multiple) {
        panel.classList.add(UK2_DROPDOWN_CLASSES.multi);
      }
      this.setCSSVariables(this.uk2CSSProperties);
      if (this.isFlyDownAbove()) {
        this.renderer.setStyle(panel, 'opacity', 0);
        panel.classList.add('uk2-dropdown-overlay-above');
        panel.classList.add('uk2-dropdown-overlay-' + this.uk2DropdownSize);
        panel.classList.remove('uk2-dropdown-overlay-below');
        formField.classList.add('uk2-dropdown-flyout-above');
        this.createDropdownLabelSection();
      } else {
        this.renderer.setStyle(panel, 'opacity', 0);
        panel.classList.add('uk2-dropdown-overlay-below');
        panel.classList.add('uk2-dropdown-overlay-' + this.uk2DropdownSize);
        panel.classList.remove('uk2-dropdown-overlay-above');
        formField.classList.add('uk2-dropdown-flyout-bellow');
      }
    } else {
      this.renderer.removeClass(this.getFormField(), UK2_DROPDOWN_CLASSES.open);
      formField.classList.remove('uk2-dropdown-flyout-above');
      formField.classList.remove('uk2-dropdown-flyout-bellow');
      this.deleteLabelSection();
    }
  }

  changePanelClass() {
    if (!this.host.panelOpen || this.host.panel === undefined || !this.host.ngControl) {
      return;
    }

    const panel = this.getDropDownPanel().closest('.uk2-dropdown-overlay');

    if (!panel) return;
    if (this.host.ngControl.invalid && this.host.ngControl.touched) {
      panel.classList.add('uk2-dropdown-overlay-error');
      panel.classList.remove('uk2-dropdown-overlay-valid');
    } else {
      panel.classList.remove('uk2-dropdown-overlay-error');
      panel.classList.add('uk2-dropdown-overlay-valid');
    }
  }

  resizePanel() {
    if (!this.host.panelOpen || this.host.panel === undefined) {
      return;
    }

    const panel = this.getDropDownPanel();
    const formField = this.getFormField();
    panel.style.minWidth = `${formField.clientWidth - 4}px`;
  }

  addGradientEffect() {
    if (!this.host.panelOpen) {
      return;
    }

    const panel = this.getDropDownPanel();
    if (panel.scrollHeight > panel.clientHeight) {
      panel.classList.add('uk2-dropdown-gradient-margin');
    }
  }

  addScrollEvent() {
    if (!this.host.panelOpen) {
      return;
    }

    const panel = this.getDropDownPanel();
    if (panel.onscroll) {
      return;
    }

    panel.onscroll = () => {
      if (panel.scrollTop >= panel.scrollHeight - panel.offsetHeight - 5) {
        panel.classList.remove('uk2-dropdown-gradient-margin');
      } else {
        panel.classList.add('uk2-dropdown-gradient-margin');
      }
    };

    this.renderDisplayPanel();
  }

  addHint() {
    if (!this.host.panelOpen || this.host.panel === undefined) {
      return;
    }
    if (this.isFlyDownAbove()) {
      return;
    }

    if (!this.hasHint()) {
      this._panelHint = null;

      return;
    }

    const panel = this.getDropDownPanel();
    if (!this._panelParent) {
      this._panelParent = panel.parentNode;
    }

    let hintEl = this._panelHint ? this._panelHint : this._panelParent?.querySelector('#uk2-dropdown-hint');
    if (!hintEl) {
      hintEl = this.renderer.createElement('div') as HTMLDivElement;
      hintEl.classList.add('uk2-dropdown-hint-option');
      hintEl.classList.add(`uk2-dropdown-hint-option-size-${this.uk2DropdownSize}`);
      hintEl.innerText = this.parent.hintLabel;
      this._panelHint = hintEl;
    } else {
      const partialClassName = 'uk2-dropdown-hint-option-size-';
      const hintElSizeClass = Array.from((hintEl as HTMLElement).classList).find(className =>
        className.startsWith(partialClassName)
      );
      hintEl.classList.replace(hintElSizeClass!, partialClassName + this.uk2DropdownSize);
      hintEl.innerText = this.parent.hintLabel;
    }
  }

  toggleHint() {
    if (!this.host.panelOpen && this._panelHint) {
      this.renderer.removeChild(this._panelParent, this._panelHint);
      this.renderer.removeStyle(this._panelParent, 'opacity');
    }
    if (this.host.panelOpen && this._panelHint && !this.isFlyDownAbove()) {
      this.renderer.insertBefore(this._panelParent, this._panelHint, this.host.panel.nativeElement);
    }
  }

  isFlyDownAbove() {
    return this.getDropDownPanel()?.parentElement?.classList.contains(MATERIAL_CLASSES.selectOverlayAbove);
  }

  hasHint() {
    return this.getFormField()?.querySelector(`.${MATERIAL_CLASSES.matHint}`);
  }

  createDropdownLabelSection(): void {
    const panel = this.getDropDownPanel();
    const panelContainer = panel.parentNode;
    if (this.host.panelOpen) {
      this._panelParent = panelContainer;
      this._labelAboveEl = this.createLabelContainer();

      this.renderer.appendChild(panelContainer, this._labelAboveEl);
    }
  }

  deleteLabelSection(): void {
    if (this._labelAboveEl && this._panelParent) {
      this.renderer.removeChild(this._panelParent, this._labelAboveEl);
    }
  }

  createLabelContainer(): Element {
    const divEl = this.renderer.createElement('div') as HTMLElement;
    const labelEl = this.renderer.createElement('span') as HTMLElement;
    this.renderer.appendChild(divEl, labelEl);
    labelEl.innerText = this.getLabelText();
    this.renderer.addClass(divEl, 'uk2-dropdown-overlay-label-container');
    this.renderer.addClass(labelEl, 'uk2-dropdown-overlay-label');

    return divEl;
  }

  getLabelText(): string {
    return this.getFormField().querySelector('label')?.textContent || '';
  }

  replaceSizeClass(target: string): void {
    const formField = this.getFormField();
    const partialClassName = 'uk2-' + target + '-size-';
    const tagInputSizeClass = Array.from(formField.classList).find(className => className.startsWith(partialClassName));
    formField.classList.replace(tagInputSizeClass!, partialClassName + this.uk2DropdownSize);
  }

  private setCSSVariables(properties: Uk2DropdownCSSProperty[]): void {
    if (!this.host.panelOpen || this.host.panel === undefined) {
      return;
    }

    const panel = this.getDropDownPanel().closest('.uk2-dropdown-overlay');
    for (const property of properties) {
      this.renderer.setStyle(panel, property.name, property.value, 2);
    }
  }
}
