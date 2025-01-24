import { Component } from '@angular/core';

@Component({
  selector: 'app-hyperlink',
  templateUrl: './hyperlink.component.html',
  styleUrls: ['./hyperlink.component.scss'],
})
export class HyperlinkComponent {
  constructor() {}

  get basicExample(): string {
    return '<a uk2Anchor routerLink="">My link</a>';
  }
}
