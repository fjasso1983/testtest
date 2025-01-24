import { Component, OnInit } from '@angular/core';
import { BreadcrumbsService } from '../breadcrumbs.service';

@Component({
  selector: 'app-xbox',
  template: '<p>X-Box Component</p>',
  styles: ['p {margin: 10px 5px}'],
})
export class XboxComponent implements OnInit {
  constructor(private breadcrumbsService: BreadcrumbsService) {}

  ngOnInit(): void {
    this.breadcrumbsService.setItems([
      {
        url: '/components/breadcrumbs/home',
        label: 'Home',
      },
      {
        url: '/components/breadcrumbs/items',
        label: 'All items',
      },
      {
        url: '/components/breadcrumbs/tv-games',
        label: 'TVs and Games consoles',
      },
      {
        label: 'XBox Series X',
        url: '/components/breadcrumbs/x-box',
      },
    ]);
  }
}
