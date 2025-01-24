import { Component } from '@angular/core';

@Component({
  selector: 'app-loading-spinner',
  templateUrl: './loading-spinner.component.html',
  styleUrls: ['./loading-spinner.component.scss'],
})
export class LoadingSpinnerComponent {
  diameter = 16;
  stroke = 2;

  constructor() {}

  changeValues() {
    if (this.diameter <= 128) {
      this.diameter = this.diameter * 2;
      this.stroke = this.stroke * 2;
    } else {
      this.diameter = 16;
      this.stroke = 2;
    }
  }
}
