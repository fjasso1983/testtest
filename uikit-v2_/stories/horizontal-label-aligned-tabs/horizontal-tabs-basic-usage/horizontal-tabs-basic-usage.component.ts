import { Component, Input, OnInit } from '@angular/core';
import { Uk2ButtonSizeEnum, Uk2IconRegistryService, Uk2Tier1AlertsEnum } from '@axos/uikit-v2-lib';

@Component({
  selector: 'tabs-basic-usage',
  templateUrl: './horizontal-tabs-basic-usage.component.html',
  styleUrls: ['./horizontal-tabs-basic-usage.component.scss'],
})
export class HorizontalTabsBasicUsageComponent implements OnInit {
  @Input() isLoading = false;
  @Input() disabled = false;
  @Input() badgesHidden = true;
  @Input() iconsHidden = false;
  readonly badgeText = '!';
  readonly buttonSize = Uk2ButtonSizeEnum.small;

  selectedTab = 0;

  tabsList: { title: string; content: string; id: number }[] = [
    {
      title: 'Title #1',
      content: 'content #1',
      id: 0,
    },
    {
      title: 'Title #2',
      content: 'content #2',
      id: 1,
    },
    {
      title: 'Title #3',
      content: 'content #3',
      id: 2,
    },
  ];

  constructor(private iconRegistryService: Uk2IconRegistryService) {
    this.iconRegistryService.registerAllCategories();
  }

  ngOnInit(): void {
    // Remove padding from the main storybook container
    document.querySelector('.sb-main-padded')?.classList.remove('sb-main-padded');
  }

  get alertsIcons() {
    return Uk2Tier1AlertsEnum;
  }

  addTab(): void {
    const newTabId = this.tabsList.length + 1;
    const newTab = {
      title: `Title #${newTabId}`,
      content: `content #${newTabId}`,
      id: newTabId,
    };
    this.tabsList.push(newTab);
  }

  removeTab(): void {
    this.tabsList.pop();
    const newLastItem = this.tabsList.length - 1;
    this.tabChange(newLastItem);
  }

  tabChange(tabIndex: number): void {
    this.selectedTab = tabIndex;
  }
}
