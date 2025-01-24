import { Component, OnInit } from '@angular/core';
import { BreadcrumbsService } from '../breadcrumbs.service';

@Component({
  selector: 'app-tv-games',
  template: `
    <p>TV and Games component</p>
    <br />
    <a routerLink="/components/breadcrumbs/x-box">X-Box</a>
  `,
  styles: ['p {margin: 10px 5px}'],
})
export class TvGamesComponent implements OnInit {
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
    ]);
  }
}
