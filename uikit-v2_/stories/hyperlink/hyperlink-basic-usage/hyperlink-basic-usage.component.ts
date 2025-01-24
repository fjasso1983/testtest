import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-hyperlink',
  templateUrl: './hyperlink-basic-usage.component.html',
  styleUrls: ['./hyperlink-basic-usage.component.scss', '../../../projects/uikit-v2-lib/src/styles/uk2.scss'],
})
export class HyperLinkBasicUsageComponent {
  @Input() text = 'Hyperlink Text';

  constructor() {}
}
