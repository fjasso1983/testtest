import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-loading-spinner',
  templateUrl: './loading-spinner-basic-usage.component.html',
  styleUrls: [],
})
export class LoadingSpinnerBasicUsageComponent {
  @Input() diameter = 32;
  @Input() strokeWidth = 4;

  constructor() {}
}
