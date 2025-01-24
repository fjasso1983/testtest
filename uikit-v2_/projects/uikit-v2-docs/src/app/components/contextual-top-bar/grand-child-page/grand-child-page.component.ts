import { Component, OnInit } from '@angular/core';
import { BreadcrumbsService } from '../../breadcrumbs/breadcrumbs.service';

@Component({
  selector: 'app-grand-child-page',
  template: '<h3>GrandChild Page</h3>',
  styles: ['p {margin: 10px 5px}'],
})
export class GrandChildPageComponent implements OnInit {
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
      {
        url: '/components/contextual-top-bar/child-page',
        label: 'GrandChild Page',
      },
    ]);
  }
}
