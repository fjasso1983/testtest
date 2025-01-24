import { Component, OnInit } from '@angular/core';
import { BreadcrumbsService } from '../../breadcrumbs/breadcrumbs.service';

@Component({
  selector: 'app-child-page',
  template: `
    <h3>Child Page</h3>
    <a routerLink="/components/contextual-top-bar/grand-child-page">GrandChild Page</a>
  `,
  styles: ['p {margin: 10px 5px}'],
})
export class ChildPageComponent implements OnInit {
  constructor(private breadcrumbsService: BreadcrumbsService) {}

  ngOnInit(): void {
    this.breadcrumbsService.setItems([
      {
        url: '/components/contextual-top-bar/parent-page',
        label: 'Parent Page',
      },
      {
        url: '/components/contextual-top-bar/child-page',
        label: 'Child Page',
      },
    ]);
  }
}
