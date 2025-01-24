import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Uk2TooltipPlacementEnum, Uk2TooltipSuggestedActionConfigModel } from '@axos/uikit-v2-lib';
import { Uk2IconRegistryService } from '@axos/uikit-v2-lib';
@Component({
  selector: 'app-suggestedaction',
  templateUrl: './suggested-action-basic-usage.component.html',
  styleUrls: ['./suggested-action-basic-usage.component.scss', '../../../projects/uikit-v2-lib/src/styles/uk2.scss'],
})
export class SuggestedActionBasicUsageComponent implements OnInit, OnChanges {
  @Input() headerSvgIconName = 'uk2-color-bag-hand';
  @Input() panelTitle = 'Brokerage Cash';
  @Input() panelSubtitle = '$570.00';
  @Input() buttonText = 'Add Funds';
  @Input() isExpandable = true;
  @Input() isExpanded = false;
  @Input() hideButton = false;
  @Input() isTooltipEnable = true;

  // tooltip
  @Input() tooltipBodyText = 'Example tooltip';
  @Input() tooltipDisplayCloseButton = true;
  @Input() tooltipPlacement = Uk2TooltipPlacementEnum.top;
  @Input() tooltipArrowOffset = 0;

  oldTooltipConfig: Uk2TooltipSuggestedActionConfigModel | undefined = undefined;

  tooltipConfig: Uk2TooltipSuggestedActionConfigModel | undefined = new Uk2TooltipSuggestedActionConfigModel({
    bodyText: this.tooltipBodyText,
    displayCloseButton: this.tooltipDisplayCloseButton,
    placement: this.tooltipPlacement,
    arrowOffset: this.tooltipArrowOffset,
  });

  constructor(private iconRegistryService: Uk2IconRegistryService) {
    this.iconRegistryService.registerAllCategories();
  }

  ngOnInit(): void {
    this.toggleToolTipConfig(this.isTooltipEnable);
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes.isTooltipEnable) this.toggleToolTipConfig(changes.isTooltipEnable.currentValue);

    if (
      changes.tooltipBodyText ||
      changes.tooltipDisplayCloseButton ||
      changes.tooltipPlacement ||
      changes.tooltipArrowOffset
    ) {
      this.tooltipConfig = new Uk2TooltipSuggestedActionConfigModel({
        bodyText: changes.tooltipBodyText ? changes.tooltipBodyText.currentValue : this.tooltipBodyText,
        displayCloseButton: changes.tooltipDisplayCloseButton
          ? changes.tooltipDisplayCloseButton.currentValue
          : this.tooltipDisplayCloseButton,
        placement: changes.tooltipPlacement ? changes.tooltipPlacement.currentValue : this.tooltipPlacement,
        arrowOffset: changes.tooltipArrowOffset ? changes.tooltipArrowOffset.currentValue : this.tooltipArrowOffset,
      });
    }
  }
  toggleToolTipConfig(isToolTipEnable: boolean) {
    if (!isToolTipEnable) {
      this.oldTooltipConfig = this.tooltipConfig;
      this.tooltipConfig = undefined;
    } else {
      if (this.oldTooltipConfig) this.tooltipConfig = this.oldTooltipConfig;
    }
  }
}
