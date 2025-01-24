import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { catchError } from 'rxjs/operators';
import { uk2IconValidationConstants } from './constants/constants';
import { Uk2IconRegistryService } from '@axos/uikit-v2-lib/src/lib/uk2-services';
import {
  Uk2Tier1AlertsEnum,
  Uk2Tier1BiometricsEnum,
  Uk2Tier1CommunicationEnum,
  Uk2Tier1FilesEnum,
  Uk2Tier1InvestEnum,
  Uk2Tier1MiscEnum,
  Uk2Tier1NavigationEnum,
  Uk2Tier1UtilityEnum,
  Uk2Tier1ValueMovementsEnum,
  Uk2Tier2ColoredWithAccentEnum,
  Uk2Tier2MonoEnum,
  Uk2Tier1FinancialEnum,
  Uk2Tier3Enum,
} from '@axos/uikit-v2-lib/src/lib/uk2-services';
@Injectable()
export class Uk2IconValidationService {
  allTier1 = {
    ...(Uk2Tier1AlertsEnum as unknown as String),
    ...(Uk2Tier1BiometricsEnum as unknown as String),
    ...(Uk2Tier1CommunicationEnum as unknown as String),
    ...(Uk2Tier1FilesEnum as unknown as String),
    ...(Uk2Tier1InvestEnum as unknown as String),
    ...(Uk2Tier1MiscEnum as unknown as String),
    ...(Uk2Tier1NavigationEnum as unknown as String),
    ...(Uk2Tier1UtilityEnum as unknown as String),
    ...(Uk2Tier1ValueMovementsEnum as unknown as String),
    ...(Uk2Tier1FinancialEnum as unknown as String),
  };

  allTier2 = {
    ...(Uk2Tier2ColoredWithAccentEnum as unknown as String),
    ...(Uk2Tier2MonoEnum as unknown as String),
  };

  allTier3 = Uk2Tier3Enum as unknown as String;
  constructor(private matIconRegistry: MatIconRegistry, private iconRegistryService: Uk2IconRegistryService) {}

  isValidIconName(svgIconName: string) {
    this.matIconRegistry
      .getNamedSvgIcon(svgIconName)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.message.includes(uk2IconValidationConstants.materialIconErrorMessages.unableToFindIconWithName)) {
            throw new TypeError(uk2IconValidationConstants.errorMessages.notDefinedInIconsRegistryService);
          }
          if (error.status === 404) {
            throw new TypeError(
              uk2IconValidationConstants.errorMessages.fileNotFound(
                svgIconName,
                this.iconRegistryService.registeredIconsUrl
              )
            );
          }
          throw new TypeError(uk2IconValidationConstants.errorMessages.unhandledException);
        })
      )
      .subscribe(() => {});
  }

  getIconTier(svgIconName: string): number | null {
    if (this.isTier3(svgIconName)) return 3;
    if (this.isTier2(svgIconName)) return 2;
    if (this.isTier1(svgIconName)) return 1;

    return null;
  }

  isTier1(svgIconName: string): boolean {
    if (!Object.values(this.allTier1).includes(svgIconName)) {
      return false;
    } else {
      return true;
    }
  }

  isTier2(svgIconName: string): boolean {
    if (!Object.values(this.allTier2).includes(svgIconName)) {
      return false;
    } else {
      return true;
    }
  }

  isTier3(svgIconName: string): boolean {
    if (!Object.values(this.allTier3).includes(svgIconName)) {
      return false;
    } else {
      return true;
    }
  }
}
