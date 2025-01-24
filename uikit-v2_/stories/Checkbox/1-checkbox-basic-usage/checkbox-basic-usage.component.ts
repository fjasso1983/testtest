import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox-basic-usage.component.html',
  styleUrls: ['./checkbox-basic-usage.component.scss', '../../../projects/uikit-v2-lib/src/styles/uk2.scss'],
})
export class CheckboxComponent {
  @Input() indeterminate = false;
  @Input() disabled = false;
  @Input() isChecked = false;
  @Input() isLoading = false;
  @Input() text = 'Example label';
  @Input() hasHyperlink = false;
  @Input() hyperlinkText = 'Link';

  constructor() {}
}
