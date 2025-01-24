import { Component, OnInit } from '@angular/core';
import { BreadcrumbsService } from '../breadcrumbs.service';

@Component({
  selector: 'app-home',
  template: `
    <p>Home component</p>
    <br />
    <a routerLink="/components/breadcrumbs/items">All Items</a>
  `,
  styles: ['p {margin: 10px 5px}'],
})
export class HomeComponent implements OnInit {
  constructor(private breadcrumbsService: BreadcrumbsService) {}
  ngOnInit(): void {
    this.breadcrumbsService.setItems([
      {
        url: '/components/breadcrumbs/home',
        label: 'Home',
      },
    ]);
  }
}
