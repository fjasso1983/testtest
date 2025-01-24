import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-checkbox-align',
  templateUrl: './checkbox-align.component.html',
  styleUrls: ['./checkbox-align.component.scss', '../../../projects/uikit-v2-lib/src/styles/uk2.scss'],
})
export class CheckboxAlignComponent {
  @Input() align = 'Left';
  @Input() isLoading = false;

  constructor() {}

  IsAlignRight(){
    return 'Right' === this.align;
  }
}
