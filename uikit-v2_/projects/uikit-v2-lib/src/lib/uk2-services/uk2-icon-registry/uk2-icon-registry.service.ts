import { Injectable } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { uk2IconSetsSvgFileNames } from './constants/constants';

@Injectable()
export class Uk2IconRegistryService {
  registeredIconsUrl = '';
  svgPaths = Object.values(uk2IconSetsSvgFileNames);

  constructor(private iconRegistry: MatIconRegistry, private sanitizer: DomSanitizer) {}

  get iconsUrl() {
    return this.registeredIconsUrl;
  }

  registerIconsFromEnumValues(iconNames: string[], iconsUrl: string) {
    this.registeredIconsUrl = iconsUrl;
    iconNames.forEach(key => {
      this.iconRegistry.addSvgIcon(key, this.sanitizer.bypassSecurityTrustResourceUrl(`${iconsUrl}/${key}.svg`));
    });
  }

  registerIconSet(iconSetUrl: string) {
    this.registeredIconsUrl = iconSetUrl;
    this.iconRegistry.addSvgIconSet(this.sanitizer.bypassSecurityTrustResourceUrl(iconSetUrl));
  }

  registerAllCategories() {
    this.svgPaths.forEach(value => {
      this.iconRegistry.addSvgIconSet(
        this.sanitizer.bypassSecurityTrustResourceUrl(`../uk2/assets/svg/icons/${value}.svg`)
      );
    });
  }
}
