export class Uk2BrandTopBarRedirectionUrlModel {
  url: string;
  openOnNewTab: boolean;

  constructor(uk2BrandTopBarRedirectionUrlConfig: Partial<Uk2BrandTopBarRedirectionUrlModel> = {}) {
    this.url = uk2BrandTopBarRedirectionUrlConfig.url ?? '';
    this.openOnNewTab = uk2BrandTopBarRedirectionUrlConfig.openOnNewTab ?? true;
  }
}
