import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, Validators } from '@angular/forms';
import { Uk2FormFieldHintDisplayPatternEnum } from '@axos/uikit-v2-lib';

@Component({
  selector: 'app-hint-display',
  templateUrl: './hint-display.component.html',
  styleUrls: ['./hint-display.component.scss'],
})
export class HintDisplayComponent implements OnInit {
  alwaysVisible = Uk2FormFieldHintDisplayPatternEnum.alwaysVisible;
  hideInDefaultState = Uk2FormFieldHintDisplayPatternEnum.hideInDefaultState;

  name = new UntypedFormControl('');
  email = new UntypedFormControl('');
  phone = new UntypedFormControl('', [Validators.required]);

  constructor() {}

  ngOnInit(): void {
    this.phone.markAsDirty();
    this.phone.markAsTouched();
  }

  get basicExample(): string {
    return `
<form (ngSubmit)="onSubmit()">
  <mat-form-field appearance="fill">
    <mat-label>Enter your name</mat-label>
    <input id="inputName" matInput [uk2HintDisplayPattern]="Uk2FormFieldHintDisplayPattern.alwaysVisible" [formControl]="name" name='name'>
    <mat-hint>
      This is a hint
    </mat-hint>
    <mat-error>Invalid name</mat-error>
  </mat-form-field>
  <button>Submit</button>
</form>`;
  }
}
