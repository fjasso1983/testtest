import { Component, Input, OnInit } from '@angular/core';
import { Uk2IconRegistryService } from '@axos/uikit-v2-lib';

@Component({
  selector: 'storybook-checkbox-selector-cards',
  templateUrl: './checkbox-basic-usage.component.html',
  styleUrls: ['./checkbox-basic-usage.component.scss'],
})
export class CheckboxBasicUsageComponent implements OnInit {
  @Input() uk2IsLoading = false;
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
