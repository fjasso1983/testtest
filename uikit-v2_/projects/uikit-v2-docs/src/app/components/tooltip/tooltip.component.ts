import { Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { Uk2TooltipPlacementEnum, Uk2TooltipSizeEnum, Uk2TooltipTriggerEnum } from '@axos/uikit-v2-lib';

@Component({
  selector: 'app-tooltip',
  templateUrl: './tooltip.component.html',
  styleUrls: ['./tooltip.component.scss'],
})
export class TooltipComponent implements OnInit, OnDestroy {
  isLoading = false;
  arrowOffset = 0;
  placement: Uk2TooltipPlacementEnum = Uk2TooltipPlacementEnum.right;
  uk2TooltipTriggerEnum = Uk2TooltipTriggerEnum;
  size: Uk2TooltipSizeEnum = Uk2TooltipSizeEnum.large;

  constructor(private elementRef: ElementRef) {}

  toggleLoading() {
    this.isLoading = !this.isLoading;
  }

  ngOnInit(): void {
    this.elementRef.nativeElement.closest('.side-nav-content').classList.add('background-grey');
  }

  ngOnDestroy(): void {
    this.elementRef.nativeElement.closest('.side-nav-content').classList.remove('background-grey');
  }

  setPlacement(value: any) {
    if (value == 'auto') {
      this.placement = Uk2TooltipPlacementEnum.auto;
    } else if (value == 'right') {
      this.placement = Uk2TooltipPlacementEnum.right;
    }
  }

  setSize(value: any) {
    if (value == 'large') {
      this.size = Uk2TooltipSizeEnum.large;
    } else if (value == 'medium') {
      this.size = Uk2TooltipSizeEnum.medium;
    } else if (value == 'small') {
      this.size = Uk2TooltipSizeEnum.small;
    }
  }
}
