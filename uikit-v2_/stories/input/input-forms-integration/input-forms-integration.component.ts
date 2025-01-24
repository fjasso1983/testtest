import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Uk2IconRegistryService, Uk2InputSizeEnum } from '@axos/uikit-v2-lib';
@Component({
  selector: 'storybook-input-reactive-form',
  templateUrl: './input-forms-integration.component.html',
  styleUrls: ['./input-forms-integration.component.scss'],
})
export class InputFormsIntegrationComponent implements OnInit, OnChanges {
  @Input() uk2IsLoading = false;
  @Input() form!: FormGroup;
  @Input() inputSize = Uk2InputSizeEnum.large;

  constructor(private iconRegistryService: Uk2IconRegistryService) {}

  ngOnInit(): void {
    this.iconRegistryService.registerAllCategories();
  }

  //* Reactive forms code

  get name(): any {
    return this.form.get('name');
  }

  get email(): any {
    return this.form.get('email');
  }

  get phone(): any {
    return this.form.get('phone');
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.form.previousValue != undefined) {
      this.form.setValue({
        name: changes.form.previousValue.value.name,
        phone: changes.form.previousValue.value.phone,
        email: changes.form.previousValue.value.email,
      });
    }
  }
}
