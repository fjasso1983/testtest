import { Component, OnInit } from '@angular/core';
import { BreadcrumbsService } from '../../breadcrumbs/breadcrumbs.service';

@Component({
  selector: 'app-parent-page',
  template: `
    <h3>Parent Page</h3>
    <a routerLink="/components/contextual-top-bar/child-page">Child Page</a>
  `,
  styles: ['p {margin: 10px 5px}'],
})
export class ParentPageComponent implements OnInit {
  constructor(private breadcrumbsService: BreadcrumbsService) {}
  ngOnInit(): void {
    this.breadcrumbsService.setItems([
      {
        url: '/components/contextual-top-bar/parent-page',
        label: 'Parent Page',
      },
    ]);
  }
}
