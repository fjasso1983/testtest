import { Component } from '@angular/core';

@Component({
  template: `
    <mat-form-field appearance="outline" floatLabel="always">
      <mat-label>Select an option</mat-label>
      <mat-select uk2Dropdown [uk2IsLoading]="isLoading" [(value)]="selected">
        <mat-option>None</mat-option>
        <mat-option value="option1">Option 1</mat-option>
        <mat-option value="option2">Option 2</mat-option>
        <mat-option value="option3">Option 3</mat-option>
      </mat-select>
    </mat-form-field>
  `,
})
export class DropdownTestingComponent {
  isLoading = false;

  activeLoading() {
    this.isLoading = true;
  }
}
