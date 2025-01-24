import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  Renderer2,
  SimpleChanges,
} from '@angular/core';
import {
  Uk2BrandTopBarLabeledIconButtonModel,
  Uk2BrandTopBarRedirectionUrlModel,
  Uk2IconRegistryService,
} from '@axos/uikit-v2-lib';
@Component({
  selector: 'app-brand-top-bar',
  templateUrl: './brand-top-bar-basic-usage.component.html',
})
export class BrandTopBarBasicUsageComponent implements OnInit, OnChanges, AfterViewInit, OnDestroy {
  @Input() isComponent = false;
  @Input() uk2IsLoading = false;
  @Input() uk2IsAxos = false;
  @Input() theme = 'Axos';
  @Input() withButton = true;
  @Input() labelText = 'Lorem ipsum';
  @Input() svgIconName = 'uk2-chevron-left';
  @Input() organizationName = 'Axos';
  @Input() showCloseButton = false;
  @Input() urlRedirection = 'http://www.axosbank.com';
  @Input() openOnNewTab = true;
  @Output() clickEventButtonTopBar = new EventEmitter();
  @Output() clickEventCloseButtonTopBar = new EventEmitter();

  logo = './static-branding-assets/logos/axos.svg';
  labeledIconButton: Uk2BrandTopBarLabeledIconButtonModel | undefined = undefined;
  urlRedirectionConfig: Uk2BrandTopBarRedirectionUrlModel | undefined = new Uk2BrandTopBarRedirectionUrlModel({
    url: 'http://www.axosbank.com',
    openOnNewTab: true,
  });
  button: any;

  constructor(
    private elementRef: ElementRef,
    private iconRegistryService: Uk2IconRegistryService,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    this.elementRef.nativeElement.closest('.sb-show-main.sb-main-padded').classList.add('no-padding');
    this.iconRegistryService.registerAllCategories();
  }

  ngOnChanges(changes: SimpleChanges) {
    this.button = this.elementRef.nativeElement.querySelector('#uk2BrandTopBarButton');
    if (changes.theme) {
      this.handleThemeChange(changes);
    }

    this.changeWithButton(changes);
    this.changeLabelText(changes);
    this.changeSvgIconName(changes);
    this.changeUrlRedirectionConfig(changes);
  }

  ngAfterViewInit(): void {
    this.button = this.elementRef.nativeElement.querySelector('#uk2BrandTopBarButton');
  }

  ngOnDestroy(): void {
    this.elementRef.nativeElement.closest('.sb-show-main.sb-main-padded').classList.remove('no-padding');
  }

  clickButtonTopBar() {
    this.clickEventButtonTopBar.emit('Click on brand top bar button');
  }

  clickCloseButtonTopBar() {
    this.clickEventCloseButtonTopBar.emit('Click on close brand top bar button');
  }

  private handleThemeChange(changes: SimpleChanges) {
    switch (changes.theme.currentValue) {
      case 'Axos':
        this.setAxosBranding();
        break;
      case 'Lexman Advisors':
        this.logo = './static-branding-assets/logos/lexman-advisors.svg';
        this.setButtonStyle('color', '#4A5560');
        break;
      case 'Nation Wide':
        this.logo = './static-branding-assets/logos/nation-wide.svg';
        this.setButtonStyle('color', '#4A5560');
        break;
      case 'Ufb Direct':
        this.logo = './static-branding-assets/logos/ufb.svg';
        this.setButtonStyle('color', '#4A5560');
        break;
      case '[No logo]':
        this.logo = '';
        this.setButtonStyle('color', '#4A5560');
        break;
      default:
        this.setAxosBranding();
        break;
    }
  }

  private setAxosBranding() {
    this.logo = './static-branding-assets/logos/axos.svg';
    this.setButtonStyle('color', '#2F5B88');
  }

  private setButtonStyle(propertyName: string, propertyValue: string) {
    if (this.button) {
      this.renderer.setStyle(this.button, propertyName, propertyValue);
    }
  }

  private changeWithButton(changes: SimpleChanges) {
    if (changes.withButton) {
      if (changes.withButton.currentValue) {
        this.labeledIconButton = new Uk2BrandTopBarLabeledIconButtonModel({
          svgIconName: this.svgIconName,
          labelText: this.labelText,
        });
      } else {
        this.labeledIconButton = undefined;
      }
    }
  }

  private changeLabelText(changes: SimpleChanges) {
    if (changes.labelText) {
      if (this.labeledIconButton && changes.labelText.currentValue) {
        this.labeledIconButton.labelText = changes.labelText.currentValue;
      }
    }
  }

  private changeSvgIconName(changes: SimpleChanges) {
    if (changes.svgIconName) {
      if (this.labeledIconButton && changes.svgIconName.currentValue) {
        this.labeledIconButton.svgIconName = changes.svgIconName.currentValue;
      }
    }
  }

  private changeUrlRedirectionConfig(changes: SimpleChanges) {
    if (changes.urlRedirection) {
      if (changes.urlRedirection.currentValue != '') {
        this.urlRedirectionConfig = new Uk2BrandTopBarRedirectionUrlModel({
          url: changes.urlRedirection.currentValue,
          openOnNewTab: this.openOnNewTab,
        });
      } else {
        this.urlRedirectionConfig = undefined;
      }
    }

    if (changes.openOnNewTab) {
      this.urlRedirectionConfig = new Uk2BrandTopBarRedirectionUrlModel({
        url: this.urlRedirectionConfig?.url,
        openOnNewTab: changes.openOnNewTab?.currentValue,
      });
    }
  }
}
