import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  Renderer2,
  SimpleChanges,
  EventEmitter,
} from '@angular/core';

import {
  Uk2BrandTopBarLabeledIconButtonModel,
  Uk2IconRegistryService,
  Uk2ProgressBarLabeledIconButtonModel,
} from '@axos/uikit-v2-lib';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar-basic-usage.component.html',
})
export class ProgressBarBasicUsageComponent implements OnInit, OnChanges, AfterViewInit, OnDestroy {
  @Input() theme = 'Axos';
  @Input() uk2IsLoading = false;
  @Input() uk2OrganizationName = 'Axos';
  @Input() uk2ProgressBarValue = 70;
  @Input() uk2HeaderText = 'Lorem ipsum dolor';

  @Input() withFooterButton = true;
  @Input() svgIconNameFooterButton = 'uk2-chevron-left';
  @Input() labelTextFooterButton = 'Lorem Ipsum';

  @Input() withHeaderButton = true;
  @Input() svgIconNameHeaderButton = 'uk2-log-out-R';
  @Input() labelTextHeaderButton = 'Save & Exit';

  @Output() uk2HeaderCallBackButton = new EventEmitter();
  @Output() uk2FooterCallBackButton = new EventEmitter();

  uk2HeaderIconButton: Uk2ProgressBarLabeledIconButtonModel | undefined = undefined;
  uk2FooterIconButton: Uk2ProgressBarLabeledIconButtonModel | undefined = undefined;

  uk2LogoImgPath = './static-branding-assets/logos/axos.svg';
  buttons?: any[];

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
    this.buttons = this.elementRef.nativeElement.querySelectorAll('button');

    if (changes.theme) {
      this.handleThemeChange(changes);
    }

    this.uk2HeaderIconButtonChange(changes);
    this.uk2FooterIconButtonChange(changes);
  }

  uk2HeaderIconButtonChange(changes: SimpleChanges) {
    if (changes.withHeaderButton) {
      if (changes.withHeaderButton.currentValue) {
        this.uk2HeaderIconButton = new Uk2BrandTopBarLabeledIconButtonModel({
          svgIconName: this.svgIconNameHeaderButton,
          labelText: this.labelTextHeaderButton,
        });
      } else {
        this.uk2HeaderIconButton = undefined;
      }
    }
    if (this.uk2HeaderIconButton) {
      if (changes.labelTextHeaderButton) {
        if (this.labelTextHeaderButton && changes.labelTextHeaderButton.currentValue) {
          this.uk2HeaderIconButton.labelText = changes.labelTextHeaderButton.currentValue;
        }
      }
      if (changes.svgIconNameHeaderButton) {
        if (this.svgIconNameHeaderButton && changes.svgIconNameHeaderButton.currentValue) {
          this.uk2HeaderIconButton.svgIconName = changes.svgIconNameHeaderButton.currentValue;
        }
      }
    }
  }

  uk2FooterIconButtonChange(changes: SimpleChanges) {
    if (changes.withFooterButton) {
      if (changes.withFooterButton.currentValue) {
        this.uk2FooterIconButton = new Uk2BrandTopBarLabeledIconButtonModel({
          svgIconName: this.svgIconNameFooterButton,
          labelText: this.labelTextFooterButton,
        });
      } else {
        this.uk2FooterIconButton = undefined;
      }
    }
    if (this.uk2FooterIconButton) {
      if (changes.labelTextFooterButton) {
        if (this.labelTextFooterButton && changes.labelTextFooterButton.currentValue) {
          this.uk2FooterIconButton.labelText = changes.labelTextFooterButton.currentValue;
        }
      }
      if (changes.svgIconNameFooterButton) {
        if (this.svgIconNameFooterButton && changes.svgIconNameFooterButton.currentValue) {
          this.uk2FooterIconButton.svgIconName = changes.svgIconNameFooterButton.currentValue;
        }
      }
    }
  }

  ngAfterViewInit(): void {
    this.buttons = this.elementRef.nativeElement.querySelectorAll('button');
  }

  ngOnDestroy(): void {
    this.elementRef.nativeElement.closest('.sb-show-main.sb-main-padded').classList.remove('no-padding');
  }

  private handleThemeChange(changes: SimpleChanges) {
    switch (changes.theme.currentValue) {
      case 'Axos':
        this.setAxosBranding();
        break;
      case 'Lexman Advisors':
        this.uk2LogoImgPath = './static-branding-assets/logos/lexman-advisors.svg';
        break;
      case 'Nation Wide':
        this.uk2LogoImgPath = './static-branding-assets/logos/nation-wide.svg';
        break;
      case 'Ufb Direct':
        this.uk2LogoImgPath = './static-branding-assets/logos/ufb.svg';
        break;
      case '[No logo]':
        this.uk2LogoImgPath = '';
        break;
      default:
        this.setAxosBranding();
        break;
    }
  }

  private setAxosBranding() {
    this.uk2LogoImgPath = './static-branding-assets/logos/axos.svg';
  }
}
