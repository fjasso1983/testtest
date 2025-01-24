import { Component, Input, OnInit } from '@angular/core';
import {
  Uk2IconRegistryService,
  Uk2TooltipPlacementEnum,
  Uk2TooltipSizeEnum,
  Uk2TooltipTriggerEnum,
} from '@axos/uikit-v2-lib';

@Component({
  selector: 'app-tooltip',
  templateUrl: './tooltip-basic-usage.component.html',
})
export class TooltipBasicUsageComponent implements OnInit {
  @Input() uk2IsLoading = false;
  @Input() labelText = "Didn't receive the code?";
  @Input() bodyText =
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.';
  @Input() displayCloseButton = true;
  @Input() svgIconName = 'uk2-info-circle';
  @Input() arrowOffset = 0;
  @Input() placement: Uk2TooltipPlacementEnum = Uk2TooltipPlacementEnum.auto;
  @Input() desktopOpenMode: Uk2TooltipTriggerEnum = Uk2TooltipTriggerEnum.hover;
  @Input() size: Uk2TooltipSizeEnum = Uk2TooltipSizeEnum.large;

  constructor(private iconRegistryService: Uk2IconRegistryService) {}

  ngOnInit(): void {
    this.iconRegistryService.registerAllCategories();
  }

  closeButtonClick() {
    console.log('close button click');
  }
}
