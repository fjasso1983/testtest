import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-determinate-progress-bar',
  templateUrl: './determinate-progress-bar.component.html',
  styleUrls: ['./determinate-progress-bar.component.scss', '../../../projects/uikit-v2-lib/src/styles/uk2.scss'],
})
export class DeterminateProgressBarBasicUsageComponent {
  @Input() value = 40;

  constructor() {}
}
