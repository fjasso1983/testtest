import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  OnInit,
  AfterViewInit,
  Renderer2,
  ElementRef,
  HostListener,
} from '@angular/core';
import {
  IUk2IsAxos,
  IUk2IsLoading,
  UK2_BREAKPOINTS,
  Uk2DestroyService,
  Uk2IsNullOrEmptyPipe,
} from '@axos/uikit-v2-lib/src/lib/uk2-internal-utils';
import { Uk2BrandTopBarLabeledIconButtonModel, Uk2BrandTopBarRedirectionUrlModel } from './models';
import { uk2BrandTopBarConstants } from './constants/constants';
import { Uk2ButtonSizeEnum } from '@axos/uikit-v2-lib/src/lib/uk2-directives';
import { Uk2Tier1NavigationEnum } from '@axos/uikit-v2-lib/src/lib/uk2-services';
import { fromEvent } from 'rxjs';
import { startWith, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'uk2-brand-top-bar',
  templateUrl: './uk2-brand-top-bar.component.html',
  providers: [Uk2DestroyService],
})
export class Uk2BrandTopBarComponent implements OnChanges, OnInit, AfterViewInit, IUk2IsLoading, IUk2IsAxos {
  @Input() uk2LogoImgPath = '';
  @Input() uk2MobileLogoPath = '';
  @Input() uk2OrganizationName = '';
  @Input() uk2MobilePageTitle = '';
  @Input() uk2IsLoading = false;
  @Input() uk2LabeledIconButton: Uk2BrandTopBarLabeledIconButtonModel | undefined = undefined;
  @Input() uk2IsAxos = true;
  @Input() uk2ShowCloseButton = false;
  @Input() uk2LogoRedirectionUrl: Uk2BrandTopBarRedirectionUrlModel | undefined = undefined;
  @Input() uk2HasContextualTopBar = false;
  @Output() uk2CallBackButton: EventEmitter<any> = new EventEmitter();
  @Output() uk2CallBackCloseButton: EventEmitter<any> = new EventEmitter();
  buttonSize: Uk2ButtonSizeEnum = Uk2ButtonSizeEnum.small;
  leftButtonSize: Uk2ButtonSizeEnum = Uk2ButtonSizeEnum.medium;
  closeButtonSize: Uk2ButtonSizeEnum = Uk2ButtonSizeEnum.medium;
  closeIconButton: Uk2Tier1NavigationEnum = Uk2Tier1NavigationEnum.x;
  isMobileScreen = false;
  readonly uk2ColorBarBackgroundColor = '--uk2-brand-top-bar-color-bar-color';
  displayButton = false;
  contextualTopBarElement: HTMLElement | null = null;
  contextualTopBarTabsElement: HTMLElement | null = null;
  targetElementBottomBorder: HTMLElement | null = null;
  private readonly mediumBreakpoint = UK2_BREAKPOINTS.md;
  private readonly uk2IsNullOrEmpty = new Uk2IsNullOrEmptyPipe();
  constructor(private destroy$: Uk2DestroyService, private renderer: Renderer2, private el: ElementRef) {}

  ngOnChanges() {
    this.validateLabeledIconButton();
    this.validateRedirectionUrl();
  }

  ngOnInit(): void {
    this.listenToWindowResize();
  }

  ngAfterViewInit() {
    this.checkContextualTopBarTabs();
    this.onWindowScroll();
  }

  @HostListener('window:scroll', [])
  onWindowEvent() {
    this.checkContextualTopBarTabs();
    this.onWindowScroll();
  }

  get hasEmptyOrNullUk2LogoImgPath(): boolean {
    return this.uk2IsNullOrEmpty.transform(this.uk2LogoImgPath);
  }

  get uk2ImageResponsiveLogoSRC(): string {
    return this.isMobileScreen
      ? this.uk2IsNullOrEmpty.transform(this.uk2MobileLogoPath)
        ? this.uk2LogoImgPath
        : this.uk2MobileLogoPath
      : this.uk2LogoImgPath;
  }

  actionButtonClick() {
    this.uk2CallBackButton.emit();
  }

  actionCloseButtonClick() {
    this.uk2CallBackCloseButton.emit();
  }

  showRedirectionLink(): boolean {
    return !!this.uk2LogoRedirectionUrl && this.uk2LogoRedirectionUrl?.url?.length > 0;
  }

  setRedirectionTarget(): string {
    let redirectionTarget = '';
    if (this.uk2LogoRedirectionUrl?.openOnNewTab) {
      redirectionTarget = '_blank';
    }

    return redirectionTarget;
  }

  private validateLabeledIconButton() {
    this.displayButton = this.uk2LabeledIconButton !== undefined;
    /* istanbul ignore else */
    if (this.uk2LabeledIconButton !== undefined) {
      /* istanbul ignore else */
      if (
        this.uk2LabeledIconButton.svgIconName == undefined ||
        this.uk2LabeledIconButton.svgIconName == '' ||
        this.uk2LabeledIconButton.svgIconName === null
      ) {
        throw new Error(uk2BrandTopBarConstants.errorMessages.svgIconName);
      }

      /* istanbul ignore else */
      if (
        this.uk2LabeledIconButton.labelText == undefined ||
        this.uk2LabeledIconButton.labelText == '' ||
        this.uk2LabeledIconButton.labelText === null
      ) {
        throw new Error(uk2BrandTopBarConstants.errorMessages.labelText);
      }
    }
  }

  private validateRedirectionUrl() {
    if (this.uk2LogoRedirectionUrl !== undefined) {
      /* istanbul ignore else */
      if (
        this.uk2LogoRedirectionUrl.url == undefined ||
        this.uk2LogoRedirectionUrl.url == '' ||
        this.uk2LogoRedirectionUrl.url === null
      ) {
        throw new Error(uk2BrandTopBarConstants.errorMessages.url);
      }
    }
  }

  /**
   * Listen to window resize event to determine if the screen is mobile or not
   */
  private listenToWindowResize() {
    fromEvent(window, 'resize')
      .pipe(startWith(null), takeUntil(this.destroy$))
      .subscribe(() => {
        this.isMobileScreen = window.innerWidth < this.mediumBreakpoint;
        this.onWindowScroll();
      });
  }

  private checkContextualTopBarTabs() {
    this.contextualTopBarElement = document.querySelector('[uk2ContextualTopBar]');
    this.contextualTopBarTabsElement = document.querySelector('.uk2-contextual-top-tabs-section');
    this.targetElementBottomBorder = this.el.nativeElement.querySelector('.uk2-with-contextual-top-bar');
  }

  private onWindowScroll() {
    if (this.contextualTopBarElement && this.contextualTopBarTabsElement && this.targetElementBottomBorder) {
      const rect = this.contextualTopBarElement.getBoundingClientRect();
      const isBelowViewport = rect.top < 24;

      if (!isBelowViewport && this.isMobileScreen) {
        this.renderer.addClass(this.targetElementBottomBorder, 'uk2-top-bar-above-contextual-bar');
      } else {
        this.renderer.removeClass(this.targetElementBottomBorder, 'uk2-top-bar-above-contextual-bar');
      }
    }
  }
}
