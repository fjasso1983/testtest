import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
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
  Uk2IconRegistryService,
} from '@axos/uikit-v2-lib';

@Component({
  selector: 'storybook-iconography',
  templateUrl: './iconography.component.html',
  styleUrls: ['./iconography.component.scss'],
})
export class IconComponent implements OnInit, OnChanges {
  alertIcons = Object.values(Uk2Tier1AlertsEnum);
  biometricsIcons = Object.values(Uk2Tier1BiometricsEnum);
  communicationIcons = Object.values(Uk2Tier1CommunicationEnum);
  filesIcons = Object.values(Uk2Tier1FilesEnum);
  financialEnum = Object.values(Uk2Tier1FinancialEnum);
  investEnum = Object.values(Uk2Tier1InvestEnum);
  miscEnum = Object.values(Uk2Tier1MiscEnum);
  navigationEnum = Object.values(Uk2Tier1NavigationEnum);
  utilityEnum = Object.values(Uk2Tier1UtilityEnum);
  valueMovementsEnum = Object.values(Uk2Tier1ValueMovementsEnum);
  monoEnum = Object.values(Uk2Tier2MonoEnum);
  coloredWithAccentEnum = Object.values(Uk2Tier2ColoredWithAccentEnum);
  tier3 = Object.values(Uk2Tier3Enum);
  @Input() tier1Color = '#4A5560';
  @Input() tier2Color = '#4A5560';
  @Input() tier2IsSelectedState = false;

  private themeWrapper = document.querySelector('body');

  constructor(private iconRegistryService: Uk2IconRegistryService) {}
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.tier1Color) {
      const newValue = changes.tier1Color.currentValue;
      if (newValue) {
        this.themeWrapper?.style.setProperty('--storybook-iconography-tier-1-color', `${newValue}`);
      }
    }

    if (changes.tier2Color) {
      const newValue = changes.tier2Color.currentValue;
      if (newValue) {
        this.themeWrapper?.style.setProperty('--storybook-iconography-tier-2-color', `${newValue}`);
      }
    }

    if (changes.tier2IsSelectedState) {
      const newValue = changes.tier2IsSelectedState.currentValue;
      if (newValue) {
        this.themeWrapper?.style.setProperty('--storybook-iconography-tier-2-colored-with-accent-color', '#2F5B88'); // Primary / Blue 400
        this.themeWrapper?.style.setProperty('--uk2-icons-tier2-accent-color', '#2F5B88'); // Primary / Blue 400
      } else {
        this.themeWrapper?.style.setProperty('--storybook-iconography-tier-2-colored-with-accent-color', '#4A5560'); // Neutral / Slate 400
        this.themeWrapper?.style.removeProperty('--uk2-icons-tier2-accent-color'); // Primary / Blue 400
      }
    }
  }

  ngOnInit(): void {
    this.iconRegistryService.registerAllCategories();
  }
}
