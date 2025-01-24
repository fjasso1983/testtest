import { Component, Input, OnChanges, OnDestroy, OnInit, Renderer2, SimpleChanges, ViewChild } from '@angular/core';

import {
  Uk2BrandTopBarLabeledIconButtonModel,
  Uk2BrandTopBarRedirectionUrlModel,
  Uk2BreadcrumbsComponent,
  Uk2BreadcrumbsItem,
  Uk2ButtonSizeEnum,
  Uk2ContextualTopBarDirective,
  Uk2IconRegistryService,
  Uk2Tier1AlertsEnum,
  Uk2Tier1NavigationEnum,
} from '@axos/uikit-v2-lib';
import { DefaultContextualBrandTopBarHandler } from './contextual-top-bar-brand-top-bar-basic-usage-handler.class';

@Component({
  selector: 'contextual-top-bar-basic-usage',
  templateUrl: './contextual-top-bar-basic-usage.component.html',
  styleUrls: ['./contextual-top-bar-basic-usage.component.scss'],
})
export class ContextualTopBarBasicUsageComponent implements OnChanges, OnInit, OnDestroy {
  readonly items: Uk2BreadcrumbsItem[] = [
    {
      url: '/component/1',
      label: 'Home',
    },
    {
      url: '/component/2',
      label: 'All items',
    },
    {
      url: '/component/3',
      label: 'TVs and Games consoles',
    },
    {
      url: '/component/4',
      label: 'Microsoft',
    },
    {
      url: '/component/5',
      label: 'XBox Series X',
    },
  ];
  horizontalTabsDisabled = false;
  horizontalTabsIconsHidden = true;
  horizontalTabsBadgesHidden = true;
  @Input() hasBreadCrumbs = false;
  @Input() hasGlobalTabs = true;
  @Input() isLoading = false;
  @Input() hasTopBar = false;
  @Input() isSticky = false;
  @Input() title = 'Title';
  @Input() showBackButton = false;
  @Input() showCloseButton = false;
  @Input() itHasContextualArea = false;
  @Input() theme = 'Axos';
  @Input() organizationName = 'Axos';

  @ViewChild('uk2Breadcrumbs') breadcrumbs?: Uk2BreadcrumbsComponent;
  @ViewChild(Uk2ContextualTopBarDirective) uk2ContextualTopBar!: Uk2ContextualTopBarDirective;

  readonly leftButtonIcon = new Uk2BrandTopBarLabeledIconButtonModel({
    icon: Uk2Tier1NavigationEnum.chevronLeft,
    label: 'Back',
  });

  get alertIcons() {
    return Uk2Tier1AlertsEnum;
  }

  selectedTab = 0;
  breadcrumbItems = this.items;
  logoUrl = './static-branding-assets/logos/axos.svg';
  mobileLogoUrl = '';
  uk2ButtonSize = Uk2ButtonSizeEnum.small;
  isAxos = true;
  uk2BackButtonSize: Uk2ButtonSizeEnum;
  labeledIconButton: Uk2BrandTopBarLabeledIconButtonModel | undefined = undefined;
  urlRedirectionConfig: Uk2BrandTopBarRedirectionUrlModel = new Uk2BrandTopBarRedirectionUrlModel({
    url: 'http://www.axosbank.com',
    openOnNewTab: true,
  });
  readonly arrowBackIcon = Uk2Tier1NavigationEnum.chevronLeft;
  readonly closeIconButton: Uk2Tier1NavigationEnum = Uk2Tier1NavigationEnum.x;
  readonly leftButtonSize: Uk2ButtonSizeEnum = Uk2ButtonSizeEnum.medium;

  private readonly brandedTopBarHandler = new DefaultContextualBrandTopBarHandler(this.renderer);

  constructor(private iconRegistryService: Uk2IconRegistryService, private readonly renderer: Renderer2) {
    document.querySelector('.sb-show-main.sb-main-padded')?.classList.add('no-padding');
    this.iconRegistryService.registerAllCategories();
    this.uk2BackButtonSize = Uk2ButtonSizeEnum.medium;
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.uk2ContextualTopBar.handleContextualAreaPosition();
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.theme) {
      const { logo, isAxos } = this.brandedTopBarHandler.themeHandler(this.theme);
      this.logoUrl = logo;
      this.isAxos = isAxos;
    }

    if (changes.hasTopBar) {
      if (changes.hasTopBar.currentValue) {
        this.handleTopBarLogo();
      } else {
        this.mobileLogoUrl = '';
      }
    }

    if (changes.theme) {
      if (this.hasTopBar) {
        this.handleTopBarLogo();
      } else {
        this.mobileLogoUrl = '';
      }
    }

    if (changes.showBackButton) {
      this.labeledIconButton = this.brandedTopBarHandler.leftLabeledIconHandler(
        changes.showBackButton.currentValue,
        Uk2Tier1NavigationEnum.chevronLeft,
        'Lorem Ipsum'
      );
    }

    if (changes.hasGlobalTabs) {
      if (this.uk2ContextualTopBar != undefined) {
        setTimeout(() => {
          this.uk2ContextualTopBar.handleContextualAreaPosition();
        });
      }
    }
  }

  updateItems(href: string) {
    const idx = this.breadcrumbItems.findIndex(item => item.url === href);
    this.tabChange(idx);
  }

  resetItems() {
    this.breadcrumbItems = this.items;
  }

  tabChange(index: number): void {
    this.selectedTab = index;
  }

  goBack() {
    if (this.breadcrumbItems.length > 1) {
      this.updateItems(this.breadcrumbItems[this.breadcrumbItems.length - 2].url!);
    }
  }

  ngOnDestroy(): void {
    document.querySelector('.sb-show-main.sb-main-padded')?.classList.remove('no-padding');
  }

  onItemSelected(item: Uk2BreadcrumbsItem) {
    this.updateItems(item.url!);
  }

  private handleTopBarLogo() {
    switch (this.theme) {
      case 'Axos':
        this.mobileLogoUrl = './static-branding-assets/logos/axos-secondary.svg';
        break;
      case 'Lexman Advisors':
        this.mobileLogoUrl = './static-branding-assets/logos/lexmans-advisors-mobile-logo.svg';
        break;
      case 'Nation Wide':
        this.mobileLogoUrl = './static-branding-assets/logos/nationwide-secondary.svg';
        break;
      case 'Ufb Direct':
        this.mobileLogoUrl = './static-branding-assets/logos/ufb-secondary.svg';
        break;
      case '[No logo]':
        this.mobileLogoUrl = '';
        break;
      default:
        this.mobileLogoUrl = '';
    }
  }
}
