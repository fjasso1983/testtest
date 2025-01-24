import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  OnDestroy,
  OnChanges,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';

import tippy, { Props } from 'tippy.js';
import { IUk2IsLoading, UK2_BREAKPOINTS } from '@axos/uikit-v2-lib/src/lib/uk2-internal-utils';
import {
  Uk2TooltipPlacementEnum,
  Uk2TooltipTriggerEnum,
  Uk2TooltipArrowEnum,
  Uk2TooltipStrategyEnum,
  Uk2TooltipSizeEnum,
} from './enums';
import { BreakpointObserver } from '@angular/cdk/layout';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { uk2TooltipErrorConstants } from './constants';

@Component({
  selector: 'uk2-tooltip',
  templateUrl: './uk2-tooltip.component.html',
})
export class Uk2TooltipComponent implements OnInit, OnDestroy, OnChanges, AfterViewInit, IUk2IsLoading {
  @Input() labelText = '';
  @Input() svgIconName = 'uk2-info-circle';
  @Input() bodyText = '';
  @Input() uk2IsLoading = false;
  @Input() arrowOffset = 0;
  @Input() displayCloseButton = false;
  @Input() desktopOpenMode: Uk2TooltipTriggerEnum = Uk2TooltipTriggerEnum.hover;
  @Input() placement: Uk2TooltipPlacementEnum = Uk2TooltipPlacementEnum.auto;
  @Input() strategy: Uk2TooltipStrategyEnum = Uk2TooltipStrategyEnum.absolute;
  @Input() size: Uk2TooltipSizeEnum = Uk2TooltipSizeEnum.large;

  @Output() closeButtonClick: EventEmitter<void> = new EventEmitter();

  @ViewChild('uk2TooltipContainer', { read: ElementRef }) uk2TooltipContainer!: ElementRef;
  @ViewChild('uk2TooltipSkeletonContainer', { read: ElementRef }) uk2TooltipSkeletonContainer!: ElementRef;
  @ViewChild('uk2Tooltip', { read: ElementRef }) uk2Tooltip!: ElementRef;
  @ViewChild('uk2TooltipIconButton', { read: ElementRef }) uk2TooltipIconButton!: ElementRef;
  @ViewChild('uk2TooltipHtmlContent', { read: ElementRef }) uk2TooltipHtmlContent!: ElementRef;

  destroyed = new Subject<void>();
  showOverlay = false;
  mobileMode = false;
  displayBodyText = true;
  uk2TooltipSizeEnum = Uk2TooltipSizeEnum;
  options: Partial<Props> = {
    interactive: true,
    appendTo: 'parent',
    arrow: Uk2TooltipArrowEnum.default,
    role: 'tooltip',
    delay: 0,
    duration: 0,
    maxWidth: 253,
    offset: [this.arrowOffset, 16],
    onShow: () => {
      this.tooltipOnShow();
    },
    onHide: () => {
      this.tooltipOnHide();
    },
    popperOptions: {
      strategy: this.strategy,
    },
  };
  tippyInstance!: any;
  tooltipIsShown = false;

  constructor(private changeDetectorRef: ChangeDetectorRef, private breakpointObserver: BreakpointObserver) {}

  ngOnInit(): void {
    this.breakpointObserver
      .observe(['(max-width: ' + UK2_BREAKPOINTS.md + 'px)'])
      .pipe(takeUntil(this.destroyed))
      .subscribe(result => {
        if (result.matches) {
          this.mobileMode = true;
        } else {
          this.mobileMode = false;
        }

        if (this.tippyInstance) {
          this._setDisplaySizeConfiguration();
        }
      });
  }

  ngAfterViewInit(): void {
    this.options.placement = this.placement;
    this.options.offset = [this.arrowOffset, 16];
    this.options.popperOptions = { strategy: this.strategy };
    this.tippyInstance = tippy(this.uk2TooltipIconButton.nativeElement, this.options);
    this._setTooltipTheme(this.uk2IsLoading);
    this._setDisplaySizeConfiguration();
    this._validateInputs();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this._checkIsLoading(changes);
    this._checkArrowOffset(changes);
    this._checkPlacement(changes);
    this._checkStrategy(changes);
    this._checkDesktopOpenMode(changes);
  }

  tooltipOnShow(): void {
    if (this.mobileMode) {
      this.showOverlay = true;
    }
    this.changeDetectorRef.detectChanges();
  }

  tooltipOnHide(): void {
    this.showOverlay = false;
    this.changeDetectorRef.detectChanges();
  }

  onCloseButtonClick(): void {
    this.tippyInstance.hide();
    this.closeButtonClick.emit();
  }

  getLabelCssClass() {
    if (this.size === this.uk2TooltipSizeEnum.small) {
      return 'uk2-tooltip-label-text-small';
    } else if (this.size === this.uk2TooltipSizeEnum.medium) {
      return 'uk2-tooltip-label-text-medium';
    } else {
      return 'uk2-tooltip-label-text-large';
    }
  }

  getIconButtonCssClass() {
    if (this.size === this.uk2TooltipSizeEnum.small) {
      return 'uk2-tooltip-button-small';
    } else if (this.size === this.uk2TooltipSizeEnum.medium) {
      return 'uk2-tooltip-button-medium';
    } else {
      return 'uk2-tooltip-button-large';
    }
  }

  ngOnDestroy(): void {
    this.destroyed.next();
    this.destroyed.complete();
  }

  private _validateInputs(): void {
    this.displayBodyText = this.uk2TooltipHtmlContent.nativeElement.childNodes.length === 0;

    if (
      this.uk2TooltipHtmlContent.nativeElement.childNodes.length === 0 &&
      (!this.bodyText || this.bodyText.length === 0)
    ) {
      throw new Error(uk2TooltipErrorConstants.errorBodyText);
    }

    if (!this.svgIconName || this.svgIconName.length === 0) {
      throw new Error(uk2TooltipErrorConstants.errorSvgIconName);
    }
  }

  private _setTooltipTheme(isLoading: boolean): void {
    if (isLoading) {
      this.tippyInstance.setProps({
        theme: 'uk2TooltipSkeletonTheme',
        content: this.uk2TooltipSkeletonContainer.nativeElement,
      });
    } else {
      this.tippyInstance.setProps({
        theme: 'uk2TooltipTheme',
        content: this.uk2TooltipContainer.nativeElement,
      });
    }
  }

  private _setTooltipProperty(property: any, value: any): void {
    this.tippyInstance.setProps({
      [property]: value,
    });
  }

  private _setDisplaySizeConfiguration(): void {
    if (this.mobileMode) {
      this.tippyInstance.setProps({
        trigger: Uk2TooltipTriggerEnum.click,
        triggerTarget: this.uk2Tooltip.nativeElement,
        hideOnClick: true,
      });
    } else {
      this.tippyInstance.setProps({
        trigger: this.desktopOpenMode,
        triggerTarget: this.uk2TooltipIconButton.nativeElement,
      });

      if (this.desktopOpenMode == Uk2TooltipTriggerEnum.hover) {
        this._setTooltipProperty('hideOnClick', false);
      } else {
        this._setTooltipProperty('hideOnClick', true);
      }
    }
  }

  private _checkIsLoading(changes: SimpleChanges): void {
    if (changes.uk2IsLoading && !changes.uk2IsLoading.firstChange) {
      this._setTooltipTheme(changes.uk2IsLoading.currentValue);
    }
  }

  private _checkArrowOffset(changes: SimpleChanges): void {
    if (changes.arrowOffset && !changes.arrowOffset.firstChange) {
      this._setTooltipProperty('offset', [changes.arrowOffset.currentValue, 16]);
    }
  }

  private _checkPlacement(changes: SimpleChanges): void {
    if (changes.placement && !changes.placement.firstChange) {
      this._setTooltipProperty('placement', changes.placement.currentValue);
    }
  }

  private _checkStrategy(changes: SimpleChanges): void {
    if (changes.strategy && !changes.strategy.firstChange) {
      this.tippyInstance.setProps({
        popperOptions: {
          strategy: changes.strategy.currentValue,
        },
      });
    }
  }

  private _checkDesktopOpenMode(changes: SimpleChanges): void {
    if (changes.desktopOpenMode && !changes.desktopOpenMode.firstChange) {
      this.desktopOpenMode = changes.desktopOpenMode.currentValue;
      this._setDisplaySizeConfiguration();
    }
  }
}
