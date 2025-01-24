import { NO_ERRORS_SCHEMA } from '@angular/core';
import { inject, TestBed } from '@angular/core/testing';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { uk2IconSetsSvgFileNames } from './constants/constants';

import { Uk2IconRegistryService } from './uk2-icon-registry.service';

enum MockIcons {
  infoCircle = 'fake-icon',
}

const fakeIconsUrl = '../fake/icons/path';
const fakeIconsSetUrl = '../assets/svg/icons/sets/fake-icon-set.svg';

describe('Uk2IconRegistryService', () => {
  let service: Uk2IconRegistryService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Uk2IconRegistryService],
      schemas: [NO_ERRORS_SCHEMA],
    });
    service = TestBed.inject(Uk2IconRegistryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('registerIconsFromEnumValues should set iconsUrl', () => {
    service.registerIconsFromEnumValues(Object.values(MockIcons), fakeIconsUrl);
    expect(service.iconsUrl).toBe(fakeIconsUrl);
  });

  it('registerIconsFromEnumValues should call DomSanitizer.bypassSecurityTrustResourceUrl foreach enum item', inject(
    [DomSanitizer],
    (sanitizer: DomSanitizer) => {
      var bypassSecuritySpy = spyOn(sanitizer, 'bypassSecurityTrustResourceUrl');

      service.registerIconsFromEnumValues(Object.values(MockIcons), fakeIconsUrl);

      expect(bypassSecuritySpy).toHaveBeenCalledTimes(Object.values(MockIcons).length);
    }
  ));

  it('registerIconsFromEnumValues should call MatIconRegistry.addSvgIcon foreach enum item', inject(
    [MatIconRegistry],
    (mir: MatIconRegistry) => {
      var addSvgIconSpy = spyOn(mir, 'addSvgIcon');

      service.registerIconsFromEnumValues(Object.values(MockIcons), fakeIconsUrl);

      expect(addSvgIconSpy).toHaveBeenCalledTimes(Object.values(MockIcons).length);
    }
  ));

  it('registerIconSet should call MatIconRegistry.addSvgIconSet', inject([MatIconRegistry], (mir: MatIconRegistry) => {
    var addSvgIconSetSpy = spyOn(mir, 'addSvgIconSet');

    service.registerIconSet(fakeIconsSetUrl);

    expect(addSvgIconSetSpy).toHaveBeenCalledTimes(Object.values(MockIcons).length);
  }));

  it('registerIconsFromAllCategories should call MatIconRegistry.addSvgIconSet foreach const item', inject(
    [MatIconRegistry],
    (mir: MatIconRegistry) => {
      var addSvgIconSpy = spyOn(mir, 'addSvgIconSet');

      service.registerAllCategories();

      expect(addSvgIconSpy).toHaveBeenCalledTimes(Object.values(uk2IconSetsSvgFileNames).length);
    }
  ));
});
