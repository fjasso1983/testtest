import { Renderer2 } from '@angular/core';
import { Uk2BrandTopBarLabeledIconButtonModel, Uk2BrandTopBarRedirectionUrlModel } from '@axos/uikit-v2-lib';

export class DefaultContextualBrandTopBarHandler {
  button: HTMLElement | null = null;

  constructor(private renderer: Renderer2) {}

  themeHandler(theme: string): { logo: string; isAxos: boolean } {
    const config = {
      logo: '',
      isAxos: theme === 'Axos',
    };
    switch (theme) {
      case 'Axos':
        config.logo = this.setAxosBranding();
        break;
      case 'Lexman Advisors':
        config.logo = './static-branding-assets/logos/lexman-advisors.svg';
        this.setButtonStyle('color', '#4A5560');
        break;
      case 'Nation Wide':
        config.logo = './static-branding-assets/logos/nation-wide.svg';
        this.setButtonStyle('color', '#4A5560');
        break;
      case 'Ufb Direct':
        config.logo = './static-branding-assets/logos/ufb.svg';
        this.setButtonStyle('color', '#4A5560');
        break;
      case '[No logo]':
        config.logo = '';
        this.setButtonStyle('color', '#4A5560');
        break;
      default:
        config.logo = this.setAxosBranding();
        break;
    }

    return config;
  }

  leftLabeledIconHandler(
    show: boolean,
    svg: string,
    labelText: string
  ): Uk2BrandTopBarLabeledIconButtonModel | undefined {
    if (show) {
      return this.leftLabeledIconButtonFactory(svg, labelText);
    }

    return undefined;
  }

  handleUrlConfig(hasUrlConfig: boolean): Uk2BrandTopBarRedirectionUrlModel | undefined {
    let urlConfig: Uk2BrandTopBarRedirectionUrlModel | undefined = undefined;
    if (hasUrlConfig) {
      urlConfig = this.urlConfigFactory();
    }

    return urlConfig;
  }

  private setAxosBranding(): string {
    this.setButtonStyle('color', '#2F5B88');

    return './static-branding-assets/logos/axos.svg';
  }

  private urlConfigFactory(): Uk2BrandTopBarRedirectionUrlModel {
    return new Uk2BrandTopBarRedirectionUrlModel({
      url: 'http://www.axosbank.com',
      openOnNewTab: true,
    });
  }

  private leftLabeledIconButtonFactory(svg: string, labelText: string): Uk2BrandTopBarLabeledIconButtonModel {
    return new Uk2BrandTopBarLabeledIconButtonModel({
      svgIconName: svg,
      labelText,
    });
  }

  private setButtonStyle(propertyName: string, propertyValue: string) {
    if (this.button) {
      this.renderer.setStyle(this.button, propertyName, propertyValue);
    }
  }
}
