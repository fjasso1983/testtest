import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Uk2BreadcrumbsItem, Uk2ButtonSizeEnum } from '@axos/uikit-v2-lib';

import { BreadcrumbsService } from './breadcrumbs.service';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
})
export class BreadcrumbsComponent implements OnInit {
  uk2IsLoading = false;
  items: Uk2BreadcrumbsItem[] = [];
  buttonSize = Uk2ButtonSizeEnum.medium;
  constructor(public breadcrumbsService: BreadcrumbsService, private cd: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.breadcrumbsService.items.subscribe(items => {
      this.items = items;
      this.cd.detectChanges();
    });
  }

  toggleLoading() {
    this.uk2IsLoading = !this.uk2IsLoading;
  }
}
