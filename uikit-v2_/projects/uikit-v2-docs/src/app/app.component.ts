import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Uk2IconRegistryService } from '@axos/uikit-v2-lib';
import { BrandTopBarService } from './components/brand-top-bar/brand-top-bar.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  title = 'uikit-v2-lib documentation app';
  themesList = ['Default', 'Lexman', 'Axos', 'RIA 1', 'RIA 2', 'RIA 3'];
  currentTheme = this.themesList[0]; // Default
  routes: { route: string; label: string }[] = [
    {
      route: '/components/theming',
      label: 'Theming',
    },
    {
      route: '/components/filter-chip/label',
      label: 'Filter chip label',
    },
    {
      route: '/components/file-viewer',
      label: 'File viewer',
    },
    {
      route: '/components/table',
      label: 'Table',
    },
    {
      route: '/components/loading-spinner',
      label: 'Loading spinner',
    },
    {
      route: '/components/file-upload-drag-drop',
      label: 'File uploader',
    },
    {
      route: '/components/currency',
      label: 'Currency',
    },
    {
      route: '/components/timer',
      label: 'Timer',
    },
    {
      route: '/components/scrollbar',
      label: 'Scrollbar',
    },
    {
      route: '/components/panel',
      label: 'Panel',
    },
    {
      route: '/components/messaging-card',
      label: 'Messaging Card',
    },
    {
      route: '/components/alert-banner',
      label: 'Alert Banner',
    },
    {
      route: '/components/typography',
      label: 'Typography',
    },
    {
      route: '/components/bottomSheet',
      label: 'Bottom Sheet',
    },
    {
      route: '/components/tabs',
      label: 'Tabs',
    },
    {
      route: '/components/chip',
      label: 'Chip',
    },
    {
      route: '/components/tooltip',
      label: 'Tooltip',
    },
    {
      route: '/components/toast',
      label: 'Toast',
    },
    {
      route: '/components/icon',
      label: 'Icon',
    },
    {
      route: '/components/hyperlink',
      label: 'Hyperlink',
    },
    {
      route: '/components/form-field',
      label: 'Form field',
    },
    {
      route: '/components/input',
      label: 'Input',
    },
    {
      route: '/components/checkbox',
      label: 'Checkbox',
    },
    {
      route: '/components/checkbox-selection-cards',
      label: 'Check Selection Cards',
    },
    {
      route: '/components/password-rules',
      label: 'Password rules',
    },
    {
      route: '/components/value-movement',
      label: 'Value movement',
    },
    {
      route: '/components/text-button',
      label: 'Text Button',
    },
    {
      route: '/components/primary-button',
      label: 'Primary Button',
    },
    {
      route: '/components/secondary-button',
      label: 'Secondary Button',
    },
    {
      route: '/components/flyout',
      label: 'Flyout Button',
    },
    {
      route: '/components/menu-button',
      label: 'Menu Button',
    },
    {
      route: '/components/suggested-action',
      label: 'Suggested Action',
    },
    {
      route: '/components/brand-top-bar',
      label: 'Brand Top Bar',
    },
    {
      route: '/components/datepicker',
      label: 'Datepicker',
    },
    {
      route: '/components/modal',
      label: 'Modal',
    },
    {
      route: '/components/note-card',
      label: 'Note Card',
    },
    {
      route: '/components/breadcrumbs',
      label: 'Breadcrumbs',
    },
    {
      route: '/components/contextual-top-bar',
      label: 'Contextual Top Bar',
    },
    {
      route: '/components/button-toggle-group',
      label: 'Button Toggle Group',
    },
    {
      route: '/components/powered-by',
      label: 'Powered by',
    },
    {
      route: '/components/primary-icon-button',
      label: 'Primary Icon Button',
    },
    {
      route: '/components/secondary-icon-button',
      label: 'Secondary Icon Button',
    },
    {
      route: '/components/progress-bar',
      label: 'Progress Bar',
    },
    {
      route: '/components/labeled-icon-button',
      label: 'Labeled Icon Button',
    },
    {
      route: '/components/slider',
      label: 'Slider',
    },
    {
      route: '/components/radio-button',
      label: 'Radio Button',
    },
    {
      route: '/components/mat-option',
      label: 'Mat Option Item',
    },
    {
      route: '/components/text-tile',
      label: 'Text Tile',
    },
    {
      route: '/components/product-tile',
      label: 'Product Tile',
    },
    {
      route: '/components/search-input',
      label: 'Search Input',
    },
    {
      route: '/components/table',
      label: 'Table',
    },
  ];

  private themeWrapper = document.querySelector('body');

  constructor(private iconRegistryService: Uk2IconRegistryService, private brandTopBarService: BrandTopBarService) {}

  ngOnInit(): void {
    this.iconRegistryService.registerAllCategories();
    this.loadDefaultTheme();
  }

  loadTheme(theme: string) {
    this.currentTheme = theme;
    switch (theme) {
      case 'Default':
        this.loadDefaultTheme();
        break;
      case 'Axos':
        this.loadAxosTheme();
        break;
      case 'Lexman':
        this.loadLexmanTheme();
        break;
      case 'RIA 1':
        this.loadRIA1Theme();
        break;
      case 'RIA 2':
        this.loadRIA2Theme();
        break;
      case 'RIA 3':
        this.loadRIA3Theme();
        break;
    }
  }

  loadDefaultTheme() {
    this.themeWrapper?.style.removeProperty('--uk2-accent-color-hsl');
    this.themeWrapper?.style.removeProperty('--uk2-accent-color-hsl-h');
    this.themeWrapper?.style.removeProperty('--uk2-accent-color-hsl-s');
    this.themeWrapper?.style.removeProperty('--uk2-accent-color-hsl-l');

    this.brandTopBarService.setTopBar({
      logoUrl: '',
      organizationName: 'Axos',
    });
  }

  setPrimaryAccentHsl(hue: number, saturation: number, lightness: number) {
    this.themeWrapper?.style.setProperty(
      '--uk2-accent-color-hsl',
      'hsl(' + hue + ',' + saturation + '%,' + lightness + '%)'
    );
    this.themeWrapper?.style.setProperty('--uk2-accent-color-hsl-h', '' + hue + '');
    this.themeWrapper?.style.setProperty('--uk2-accent-color-hsl-s', '' + saturation + '%');
    this.themeWrapper?.style.setProperty('--uk2-accent-color-hsl-l', '' + lightness + '%');
  }

  loadAxosTheme() {
    var primaryAccentHsl = this.hexToHsl('#2F5B88'); // primary/blue 400
    this.setPrimaryAccentHsl(primaryAccentHsl.h, primaryAccentHsl.s, primaryAccentHsl.l);
    this.brandTopBarService.setTopBar({
      logoUrl: './assets/logos/axos.svg',
      organizationName: 'Axos',
    });
    this.resetComponentSpecificVariables();
    this.themeWrapper?.style.setProperty('--uk2-form-field-general-active-color', '#2F5B88');
    this.themeWrapper?.style.setProperty('--uk2-tooltip-label-color', '#2F5B88');
    this.themeWrapper?.style.setProperty('--uk2-tooltip-icon-color', '#2F5B88');
    this.themeWrapper?.style.setProperty('--uk2-labeled-icon-button-color', '#2F5B88');
    this.themeWrapper?.style.setProperty('--uk2-checkbox-selection-cards-label-selected', '#2F5B88');
    this.themeWrapper?.style.setProperty('--uk2-checkbox-selection-cards-text-selected', '#2F5B88');
    this.themeWrapper?.style.setProperty('--uk2-checkbox-selection-cards-left-icon-selected', '#2F5B88');
    this.themeWrapper?.style.setProperty('--uk2-checkbox-selection-cards-chevron-icon-selected', '#2F5B88');
    this.themeWrapper?.style.setProperty(
      '--uk2-brand-top-bar-color-bar-color',
      'linear-gradient(45deg, var(--uk2-axos-primary-blue-600) 14.64%, var(--uk2-axos-primary-blue-500) 48.42%, var(--uk2-axos-primary-blue-300) 85.36%)'
    );
  }

  loadLexmanTheme() {
    var primaryAccentHsl = this.hexToHsl('#B68E54');
    this.setPrimaryAccentHsl(primaryAccentHsl.h, primaryAccentHsl.s, primaryAccentHsl.l);
    this.brandTopBarService.setTopBar({
      logoUrl: './assets/logos/lexman-advisors.svg',
      organizationName: 'Lexman Advisors',
    });
    this.resetComponentSpecificVariables();
    this.themeWrapper?.style.setProperty('--uk2-form-field-general-active-color', '#4A5560');
    this.themeWrapper?.style.setProperty('--uk2-tooltip-label-color', '#4A5560');
    this.themeWrapper?.style.setProperty('--uk2-tooltip-icon-color', '#4A5560');
    this.themeWrapper?.style.setProperty('--uk2-labeled-icon-button-color', '#4A5560');
    this.themeWrapper?.style.setProperty('--uk2-checkbox-selection-cards-label-selected', '#333D46');
    this.themeWrapper?.style.setProperty('--uk2-checkbox-selection-cards-text-selected', '#4A5560');
    this.themeWrapper?.style.setProperty('--uk2-checkbox-selection-cards-left-icon-selected', '#4A5560');
    this.themeWrapper?.style.setProperty('--uk2-checkbox-selection-cards-chevron-icon-selected', '#333D46');
    this.themeWrapper?.style.setProperty('--uk2-brand-top-bar-color-bar-color', '#1F3D2B');
  }

  loadRIA1Theme() {
    var primaryAccentHsl = this.hexToHsl('#E1A67F');
    this.setPrimaryAccentHsl(primaryAccentHsl.h, primaryAccentHsl.s, primaryAccentHsl.l);
    this.brandTopBarService.setTopBar({
      logoUrl: './assets/logos/nation-wide.svg',
      organizationName: 'Nation Wide',
    });
    this.resetComponentSpecificVariables();
    this.themeWrapper?.style.setProperty('--uk2-form-field-general-active-color', '#4A5560');
    this.themeWrapper?.style.setProperty('--uk2-tooltip-label-color', '#4A5560');
    this.themeWrapper?.style.setProperty('--uk2-tooltip-icon-color', '#4A5560');
    this.themeWrapper?.style.setProperty('--uk2-labeled-icon-button-color', '#4A5560');
    this.themeWrapper?.style.setProperty('--uk2-checkbox-selection-cards-label-selected', '#333D46');
    this.themeWrapper?.style.setProperty('--uk2-checkbox-selection-cards-text-selected', '#4A5560');
    this.themeWrapper?.style.setProperty('--uk2-checkbox-selection-cards-left-icon-selected', '#4A5560');
    this.themeWrapper?.style.setProperty('--uk2-checkbox-selection-cards-chevron-icon-selected', '#333D46');
    this.themeWrapper?.style.setProperty('--uk2-brand-top-bar-color-bar-color', '#00f0f0');
  }

  loadRIA2Theme() {
    var primaryAccentHsl = this.hexToHsl('#46F0E3');
    this.setPrimaryAccentHsl(primaryAccentHsl.h, primaryAccentHsl.s, primaryAccentHsl.l);
    this.brandTopBarService.setTopBar({
      logoUrl: './assets/logos/ufb.svg',
      organizationName: 'Ufb Direct',
    });
    this.resetComponentSpecificVariables();
    this.themeWrapper?.style.setProperty('--uk2-form-field-general-active-color', '#4A5560');
    this.themeWrapper?.style.setProperty('--uk2-tooltip-label-color', '#4A5560');
    this.themeWrapper?.style.setProperty('--uk2-tooltip-icon-color', '#4A5560');
    this.themeWrapper?.style.setProperty('--uk2-labeled-icon-button-color', '#4A5560');
    this.themeWrapper?.style.setProperty('--uk2-checkbox-selection-cards-label-selected', '#333D46');
    this.themeWrapper?.style.setProperty('--uk2-checkbox-selection-cards-text-selected', '#4A5560');
    this.themeWrapper?.style.setProperty('--uk2-checkbox-selection-cards-left-icon-selected', '#4A5560');
    this.themeWrapper?.style.setProperty('--uk2-checkbox-selection-cards-chevron-icon-selected', '#333D46');
    this.themeWrapper?.style.setProperty('--uk2-brand-top-bar-color-bar-color', '#FF00ff');
  }

  loadRIA3Theme() {
    var primaryAccentHsl = this.hexToHsl('#2F836C');
    this.setPrimaryAccentHsl(primaryAccentHsl.h, primaryAccentHsl.s, primaryAccentHsl.l);
    this.brandTopBarService.setTopBar({
      logoUrl: '',
      organizationName: 'RIA 3',
    });
    this.resetComponentSpecificVariables();
    this.themeWrapper?.style.setProperty('--uk2-form-field-general-active-color', '#4A5560');
    this.themeWrapper?.style.setProperty('--uk2-tooltip-label-color', '#4A5560');
    this.themeWrapper?.style.setProperty('--uk2-tooltip-icon-color', '#4A5560');
    this.themeWrapper?.style.setProperty('--uk2-labeled-icon-button-color', '#4A5560');
    this.themeWrapper?.style.setProperty('--uk2-checkbox-selection-cards-label-selected', '#333D46');
    this.themeWrapper?.style.setProperty('--uk2-checkbox-selection-cards-text-selected', '#4A5560');
    this.themeWrapper?.style.setProperty('--uk2-checkbox-selection-cards-left-icon-selected', '#4A5560');
    this.themeWrapper?.style.setProperty('--uk2-checkbox-selection-cards-chevron-icon-selected', '#333D46');
    this.themeWrapper?.style.setProperty('--uk2-brand-top-bar-color-bar-color', '#0000ff');
  }

  private resetComponentSpecificVariables() {
    this.themeWrapper?.style.removeProperty('--uk2-form-field-general-active-color');
    this.themeWrapper?.style.removeProperty('--uk2-tooltip-label-color');
    this.themeWrapper?.style.removeProperty('--uk2-tooltip-icon-color');
    this.themeWrapper?.style.removeProperty('--uk2-labeled-icon-button-color');
    this.themeWrapper?.style.removeProperty('--uk2-checkbox-selection-cards-label-selected');
    this.themeWrapper?.style.removeProperty('--uk2-checkbox-selection-cards-text-selected');
    this.themeWrapper?.style.removeProperty('--uk2-checkbox-selection-cards-left-icon-selected');
    this.themeWrapper?.style.removeProperty('--uk2-checkbox-selection-cards-chevron-icon-selected');
    this.themeWrapper?.style.removeProperty('--uk2-text-icon-button-neutral-color');
    this.themeWrapper?.style.removeProperty('--uk2-chips-default-stroke-color');
    this.themeWrapper?.style.removeProperty('--uk2-chips-selected-stroke-color');
    this.themeWrapper?.style.removeProperty('--uk2-chips-hover-stroke-color');
    this.themeWrapper?.style.removeProperty('--uk2-chips-default-surface-color');
    this.themeWrapper?.style.removeProperty('--uk2-chips-selected-surface-color');
    this.themeWrapper?.style.removeProperty('--uk2-chips-disabled-stroke-color');
    this.themeWrapper?.style.removeProperty('--uk2-chips-text-color');
    this.themeWrapper?.style.removeProperty('--uk2-chips-icon-color');
    this.themeWrapper?.style.removeProperty('--uk2-chips-text-disabled-color');
    this.themeWrapper?.style.removeProperty('--uk2-chips-icon-disabled-color');
    this.themeWrapper?.style.removeProperty('--uk2-file-uploader-drag-drop-interacted-stroke-color');
    this.themeWrapper?.style.removeProperty('--uk2-file-uploader-drag-drop-header-color');
    this.themeWrapper?.style.removeProperty('--uk2-file-uploader-drag-drop-text-color');
    this.themeWrapper?.style.removeProperty('--uk2-file-uploader-drag-drop-stroke-color');
    this.themeWrapper?.style.removeProperty('--uk2-file-uploader-drag-drop-icon-color');
    this.themeWrapper?.style.removeProperty('--uk2-file-uploader-drag-drop-surface-color');
    this.themeWrapper?.style.removeProperty('--uk2-loading-spinner-stroke-color');
    this.themeWrapper?.style.removeProperty('--uk2-file-uploader-display-icon-color');
    this.themeWrapper?.style.removeProperty('--uk2-file-uploader-display-surface-color');
    this.themeWrapper?.style.removeProperty('--uk2-file-uploader-display-text-color');
    this.themeWrapper?.style.removeProperty('--uk2-file-uploader-display-stroke-color');
  }

  private hexToHsl(hex: string) {
    var r = parseInt(hex.slice(1, 3), 16);
    var g = parseInt(hex.slice(3, 5), 16);
    var b = parseInt(hex.slice(5, 7), 16);

    r /= 255;
    g /= 255;
    b /= 255;

    var max = Math.max(r, g, b);
    var min = Math.min(r, g, b);
    var h = 0;
    var s = 0;
    var l = (max + min) / 2;

    if (max == min) {
      h = s = 0;
    } else {
      var d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0);
          break;
        case g:
          h = (b - r) / d + 2;
          break;
        case b:
          h = (r - g) / d + 4;
          break;
      }
      h /= 6;
    }

    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100),
    };
  }
}
