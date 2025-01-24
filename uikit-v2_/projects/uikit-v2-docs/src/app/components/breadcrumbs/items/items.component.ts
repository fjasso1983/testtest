import { Component, OnInit } from '@angular/core';
import { BreadcrumbsService } from '../breadcrumbs.service';

@Component({
  selector: 'app-items',
  template: `
    <p>All Items component</p>
    <br />
    <a routerLink="/components/breadcrumbs/tv-games">TV and Games</a>
  `,
  styles: ['p {margin: 10px 5px}'],
})
export class ItemsComponent implements OnInit {
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
    ]);
  }
}
