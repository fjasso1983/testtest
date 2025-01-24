import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  Renderer2,
  SimpleChanges,
} from '@angular/core';
import { Uk2ButtonSizeEnum } from '@axos/uikit-v2-lib/src/lib/uk2-directives';
import { MATERIAL_CLASSES } from '@axos/uikit-v2-lib/src/lib/uk2-internal-utils';
import { Uk2TooltipSuggestedActionConfigModel } from './models';
@Component({
  selector: 'uk2-suggested-action[headerSvgIconName][panelTitle]',
  templateUrl: './uk2-suggested-action.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Uk2SuggestedActionComponent implements OnInit, OnChanges, AfterViewInit {
  @Input() headerSvgIconName = '';
  @Input() panelTitle = '';
  @Input() panelSubtitle = '';
  @Input() buttonText: string | undefined = undefined;
  @Input() isExpandable = true;
  @Input() isExpanded = false;
  @Input() tooltipConfig: Uk2TooltipSuggestedActionConfigModel | undefined = undefined;
  @Input() hideButton = false;
  @Output() buttonClickEvent = new EventEmitter<void>();
  clickButton = false;
  clickTooltip = false;
  displayTooltip = false;
  displayButton = false;
  hideToggle = false;
  displayResponsiveButton = false;
  innerWidth = window.innerWidth;
  buttonSize = Uk2ButtonSizeEnum.medium;

  constructor(private element: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
    this.hideToggle = !this.isExpandable;
    this.displayButton = !this.hideButton;
    this.validateLength();
  }

  ngOnChanges(changes: SimpleChanges) {
    this.displayTooltip = this.tooltipConfig !== undefined;
    if (changes.isExpandable) {
      this.hideToggle = !changes.isExpandable.currentValue;
    }

    if (changes.tooltipConfig) {
      this.tooltipConfig = changes.tooltipConfig.currentValue;
    }

    if (changes.hideButton) {
      this.displayButton = !changes.hideButton.currentValue;
    }
  }

  ngAfterViewInit() {
    this.addButtonBackground();
  }

  buttonClicked() {
    this.clickButton = true;
    this.buttonClickEvent.emit();
  }

  private addButtonBackground() {
    const expandButton = this.element.nativeElement.querySelector(`.${MATERIAL_CLASSES.expansionIndicator}`);
    if (expandButton) {
      const buttonBackground = this.renderer.createElement('div');
      this.renderer.addClass(buttonBackground, MATERIAL_CLASSES.expansionIndicatorBackground);
      this.renderer.insertBefore(this.renderer.parentNode(expandButton), buttonBackground, expandButton);
    }
  }

  private validateLength() {
    if (this.panelTitle.length < 1) {
      throw new Error('panelTitle property value must be at lease one character long');
    }
  }
}
