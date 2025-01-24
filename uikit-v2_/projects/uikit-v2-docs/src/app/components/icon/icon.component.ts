import { Component, ChangeDetectionStrategy } from '@angular/core';
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
} from '@axos/uikit-v2-lib';

@Component({
  selector: 'app-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconComponent {
  alertIcons = Object.values(Uk2Tier1AlertsEnum);
  biometricsIcons = Object.values(Uk2Tier1BiometricsEnum);
  communicationIcons = Object.values(Uk2Tier1CommunicationEnum);
  filesIcons = Object.values(Uk2Tier1FilesEnum);
  financialEnum = Object.values(Uk2Tier1FinancialEnum);
  investEnum = Object.values(Uk2Tier1InvestEnum);
  miscEnum = Object.values(Uk2Tier1MiscEnum);
  navigationEnum = Object.values(Uk2Tier1NavigationEnum);
  utilityEnum = Object.values(Uk2Tier1UtilityEnum);
  valuemovementsEnum = Object.values(Uk2Tier1ValueMovementsEnum);
  monoEnum = Object.values(Uk2Tier2MonoEnum);
  coloredWithAccentEnum = Object.values(Uk2Tier2ColoredWithAccentEnum);
  tier3 = Object.values(Uk2Tier3Enum);
  constructor() {}
}
