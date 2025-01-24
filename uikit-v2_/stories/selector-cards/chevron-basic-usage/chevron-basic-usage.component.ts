import { Component, Input, OnInit } from '@angular/core';
import { Uk2IconRegistryService } from '@axos/uikit-v2-lib';

@Component({
  selector: 'storybook-chevron-selector-cards',
  templateUrl: './chevron-basic-usage.component.html',
  styleUrls: ['./chevron-basic-usage.component.scss'],
})
export class ChevronBasicUsageComponent implements OnInit {
  @Input() uk2IsLoading = false;
  @Input() uk2IsRadio = false;
  @Input() isDisabled = false;
  @Input() headerText = 'Lorem Ipsum Dolor';
  @Input() bodyText =
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.';
  @Input() svgIconName = 'uk2-tier3-credit-cards';
  @Input() svgIconTier = '3';
  @Input() showIcon = true;

  constructor(private iconRegistryService: Uk2IconRegistryService) {}

  ngOnInit(): void {
    this.iconRegistryService.registerAllCategories();
  }
}
