import { Component } from '@angular/core';
import { FormControl, Validators, FormBuilder, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-datepicker',
  templateUrl: './datePicker.component.html',
  styleUrls: ['./datePicker.component.scss'],
})
export class DatePickerComponent {
  isDisabled = false;
  opened = false;
  form: FormGroup = this.fb.group({
    date1: new FormControl('', [Validators.required]),
    date2: new FormControl(new Date()),
    date3: new FormControl('', [Validators.required]),
    date4: new FormControl('', [Validators.required]),
    date5: new FormControl('', [Validators.required]),
    date6: new FormControl('', [Validators.required]),
    disabled: new FormControl(
      {
        value: '',
        disabled: this.isDisabled,
      },
      [Validators.required]
    ),
  });
  get date1(): any {
    return this.form.get('date1');
  }
  get date2(): any {
    return this.form.get('date2');
  }
  get date3(): any {
    return this.form.get('date3');
  }
  get date4(): any {
    return this.form.get('date4');
  }
  get date5(): any {
    return this.form.get('date5');
  }
  get date6(): any {
    return this.form.get('date6');
  }

  get disabled(): any {
    return this.form.get('disabled');
  }

  constructor(private fb: FormBuilder) {}
  streamOpened() {
    this.opened = true;
  }
  toggleDisabled() {
    this.isDisabled = !this.isDisabled;
  }
}
