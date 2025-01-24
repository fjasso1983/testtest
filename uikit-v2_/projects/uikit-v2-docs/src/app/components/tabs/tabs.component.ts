import { Component, ElementRef, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';

import { Uk2StretchTabsSizeEnum, Uk2VerticalTabSizeEnum } from '@axos/uikit-v2-lib';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class TabsComponent implements OnInit, OnDestroy {
  isLoading = false;
  clickedbutton = '';
  sizeTabs = Uk2StretchTabsSizeEnum.medium;
  isDisabled = false;
  verticalSizeTabs = Uk2VerticalTabSizeEnum.medium;

  constructor(private elementRef: ElementRef) {}

  ngOnInit(): void {
    this.elementRef.nativeElement.closest('.side-nav-content').classList.add('background-grey');
  }

  ngOnDestroy(): void {
    this.elementRef.nativeElement.closest('.side-nav-content').classList.remove('background-grey');
  }

  toggleLoading() {
    this.isLoading = !this.isLoading;
  }

  toggleSize(value: any) {
    if (value == 'small') {
      this.sizeTabs = Uk2StretchTabsSizeEnum.small;
    } else {
      this.sizeTabs = Uk2StretchTabsSizeEnum.medium;
    }
  }

  clickActionMethod(data: any) {
    this.clickedbutton = `button clicked ${data}`;
  }
}
