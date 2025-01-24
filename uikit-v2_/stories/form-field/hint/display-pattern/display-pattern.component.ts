import { AfterViewInit, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Uk2FormFieldHintDisplayPatternEnum } from '@axos/uikit-v2-lib';
import { Uk2IconRegistryService } from '@axos/uikit-v2-lib';

@Component({
  selector: 'lib-hint-display',
  templateUrl: './display-pattern.component.html',
  styleUrls: ['./display-pattern.component.scss', '../../../../projects/uikit-v2-lib/src/styles/uk2.scss'],
})
export class DisplayPatternComponent implements OnChanges, AfterViewInit {
  @Input() behavior: Uk2FormFieldHintDisplayPatternEnum = Uk2FormFieldHintDisplayPatternEnum.alwaysVisible;
  @Input() helperText = 'Consectetur adipiscing elit, leo quisque varius.';
  @Input() errorText = 'This field is required';
  @Input() isRequired = false;

  nameInput = new FormControl('');

  constructor(private iconRegistryService: Uk2IconRegistryService) {
    this.iconRegistryService.registerAllCategories();
  }

  ngAfterViewInit() {
    if (this.isRequired) {
      this.nameInput.setValidators(Validators.required);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { isRequired } = changes;
    if (isRequired && this.nameInput) {
      this.handleRequired();
    }
  }

  private handleRequired() {
    if (this.isRequired) {
      this.nameInput.setValidators(Validators.required);
      this.nameInput.updateValueAndValidity();
      this.nameInput.markAsTouched();
      this.nameInput.markAsDirty();
    } else {
      this.nameInput.clearValidators();
      this.nameInput.updateValueAndValidity();
      this.nameInput.markAsUntouched();
      this.nameInput.markAsPristine();
    }
  }
}
