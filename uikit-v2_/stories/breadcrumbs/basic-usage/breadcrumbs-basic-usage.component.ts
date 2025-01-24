import { Component, Input } from '@angular/core';

import { Uk2BreadcrumbsItem, Uk2ButtonSizeEnum, Uk2IconRegistryService } from '@axos/uikit-v2-lib';

@Component({
  selector: 'breadcrumbs-basic-usage',
  templateUrl: './breadcrumbs-basic-usage.component.html',
  styles: [
    `
      .mat-toolbar {
        background: transparent;
      }
      .button-container {
        display: flex;
        flex-direction: row;
        gap: 8px;
      }
    `,
  ],
})
export class BreadcrumbsBasicUsageComponent {
  @Input() uk2IsLoading = false;
  @Input() breadcrumbItems: Uk2BreadcrumbsItem[] = [
    {
      url: '/component/1',
      label: 'Home',
    },
    {
      url: '/component/2',
      label: 'All items',
    },
    {
      url: '/component/3',
      label: 'TVs and Games consoles',
    },
    {
      url: '/component/4',
      label: 'Microsoft',
    },
    {
      url: '/component/5',
      label: 'XBox Series X',
    },
  ];
  items = this.breadcrumbItems;
  uk2ButtonSize: Uk2ButtonSizeEnum = Uk2ButtonSizeEnum.small;
  counter = 1;

  constructor(private iconRegistryService: Uk2IconRegistryService) {
    this.iconRegistryService.registerAllCategories();
  }

  updateItems(href: any) {
    const idx = this.breadcrumbItems.findIndex(item => item.url === href);
    this.breadcrumbItems = this.breadcrumbItems.slice(0, idx + 1);
  }


  onItemSelected(item: Uk2BreadcrumbsItem) {
    this.updateItems(item.url);
  }

  addItem() {
    this.breadcrumbItems = [...this.breadcrumbItems, { url: `/page/${this.counter}`, label: `Item #${this.counter}` }];
    this.counter += 1;
  }

  resetItems() {
    this.breadcrumbItems = this.items;
    this.counter = 1;
  }
}
