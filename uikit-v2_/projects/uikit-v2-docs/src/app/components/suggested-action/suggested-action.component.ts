import { Component, ViewEncapsulation } from '@angular/core';
import { Uk2TooltipPlacementEnum, Uk2TooltipSuggestedActionConfigModel } from '@axos/uikit-v2-lib';

@Component({
  selector: 'app-suggested-action',
  templateUrl: './suggested-action.component.html',
  styleUrls: ['./suggested-action.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SuggestedActionComponent {
  hideButton = false;
  clickedbutton = '';
  tooltipConfig = new Uk2TooltipSuggestedActionConfigModel({
    bodyText: 'hello from app consumer',
    displayCloseButton: true,
    placement: Uk2TooltipPlacementEnum.top,
    arrowOffset: 20,
  });

  constructor() {}

  changeButtonDisplay() {
    this.hideButton = !this.hideButton;
  }

  clickActionMethod(data: any) {
    this.clickedbutton = `button clicked ${data}`;
  }

  get basicExample(): string {
    return `
    <uk2-suggested-action
      headerSvgIconName="alerts-circle"
      panelTitle="Brokerage Cash"
      panelSubtitle="$5,000.00"
      buttonText="Add Funds"
      [dynamicContent]="dynamicText"
      (buttonClickEvent)="clickActionMethod(1)"
      titleInfoSvgIconName="alerts-exclamation-circle"
      titleInfoTooltip="Example tooltip test"
      [isExpandable]="true"
      [isExpanded]="false">
    </uk2-suggested-action>`;
  }
}
