import { HttpErrorResponse } from '@angular/common/http';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { inject, TestBed } from '@angular/core/testing';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { of } from 'rxjs';
import { Uk2IconRegistryService } from '../../../uk2-services/uk2-icon-registry/uk2-icon-registry.service';
import { uk2IconValidationConstants } from './constants/constants';
import { Uk2IconValidationService } from './uk2-icon-validation.service';

const fakeIconName = 'test-icon';
const fakeIconsPath = '/fake/path';
describe('Uk2IconValidationService', () => {
  let service: Uk2IconValidationService;
  let iconRegistry: MatIconRegistry;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Uk2IconValidationService, Uk2IconRegistryService],
      schemas: [NO_ERRORS_SCHEMA],
    });
    service = TestBed.inject(Uk2IconValidationService);
    iconRegistry = TestBed.inject(MatIconRegistry);
  });

  beforeEach(inject([MatIconRegistry, DomSanitizer], (mir: MatIconRegistry, sanitizer: DomSanitizer) => {
    const fakeIconPath = `${fakeIconsPath}/${fakeIconName}.svg`;
    const sanitizedUrl = sanitizer.bypassSecurityTrustResourceUrl(fakeIconPath);
    mir.addSvgIcon(fakeIconName, sanitizedUrl);
  }));

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should NOT throw notDefinedInIconsRegistryModule error message if icon IS registered', () => {
    const errorMessage = uk2IconValidationConstants.errorMessages.notDefinedInIconsRegistryService;
    expect(() => {
      service.isValidIconName('test-icon'); // trying to access test-icon which is the one registered in MatIconRegistry
    }).not.toThrowError(errorMessage);
  });

  it('should throw notDefinedInIconsRegistryModule error message if icon is not registered', () => {
    const errorMessage = uk2IconValidationConstants.errorMessages.notDefinedInIconsRegistryService;
    spyOn(iconRegistry, 'getNamedSvgIcon').and.throwError(errorMessage);
    expect(() => {
      service.isValidIconName('not-registered-icon'); //trying to access an icon that has not been registered in MatIconRegistry
    }).toThrowError(errorMessage);
  });

  it('should NOT throw fileNotFound error message if icon file IS found', () => {
    const errorMessage = uk2IconValidationConstants.errorMessages.fileNotFound(fakeIconName, fakeIconsPath);
    spyOn(iconRegistry, 'getNamedSvgIcon').and.callThrough();
    expect(() => {
      service.isValidIconName('test-icon');
    }).not.toThrowError(errorMessage);
  });

  it('should throw fileNotFound error message if icon file is not found', () => {
    const errorMessage = uk2IconValidationConstants.errorMessages.fileNotFound(fakeIconName, fakeIconsPath);
    spyOn(iconRegistry, 'getNamedSvgIcon').and.throwError(errorMessage);
    expect(() => {
      service.isValidIconName('test-icon');
    }).toThrowError(errorMessage);
  });

  it('should return true when icon is Tier 1', () => {
    expect(service.isTier1('uk2-pencil')).toBeTrue();
  });

  it('should return false when icon is not Tier 1', () => {
    expect(service.isTier1('test-icon')).toBeFalse();
  });

  it('should return 1 when icon is Tier 1', () => {
    expect(service.getIconTier('uk2-pencil')).toBe(1);
  });

  it('should return true when icon is Tier 2', () => {
    expect(service.isTier2('uk2-mono-piggy')).toBeTrue();
  });

  it('should return false when icon is not Tier 2', () => {
    expect(service.isTier2('test-icon')).toBeFalse();
  });

  it('should return 2 when icon is Tier 2', () => {
    expect(service.getIconTier('uk2-mono-piggy')).toBe(2);
  });

  it('should return true when icon is Tier 3', () => {
    expect(service.isTier3('uk2-tier3-checking')).toBeTrue();
  });

  it('should return false when icon is not Tier 3', () => {
    expect(service.isTier3('test-icon')).toBeFalse();
  });

  it('should return 3 when icon is Tier 3', () => {
    expect(service.getIconTier('uk2-tier3-checking')).toBe(3);
  });

  it('should return null when icon Tier not exist', () => {
    expect(service.getIconTier('test-icon')).toBe(null);
  });
});
