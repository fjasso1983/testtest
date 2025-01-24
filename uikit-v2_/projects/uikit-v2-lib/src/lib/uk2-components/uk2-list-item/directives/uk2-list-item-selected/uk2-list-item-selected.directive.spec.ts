import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatIconTestingModule } from '@angular/material/icon/testing';
import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { MatSelectHarness } from '@angular/material/select/testing';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCheckboxHarness } from '@angular/material/checkbox/testing';
import { MatRadioGroupHarness, MatRadioButtonHarness } from '@angular/material/radio/testing';
import { MatRadioModule } from '@angular/material/radio';

import { Uk2ListItem } from '../../types';
import { Uk2ListItemModule } from '../../uk2-list-item.module';

describe('Uk2ListItemSelectedDirective', () => {
  describe('MatOption Parent', () => {
    let fixture: ComponentFixture<OptionListItemComponent>;
    let loader: HarnessLoader;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [
          CommonModule,
          BrowserAnimationsModule,
          MatSelectModule,
          MatIconModule,
          MatIconTestingModule,
          Uk2ListItemModule,
        ],
        declarations: [OptionListItemComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(OptionListItemComponent);
      loader = TestbedHarnessEnvironment.loader(fixture);

      fixture.detectChanges();
    });

    it('should add selected class when option change value', async () => {
      const select = await loader.getHarness(MatSelectHarness);

      await select.open();
      const [firstOption, secondOption] = await select.getOptions();

      await secondOption.click();
      await firstOption.click();

      const selectedListItemEl = document.querySelector('.uk2-list-item-selected');

      expect(selectedListItemEl).not.toBeNull();
    });
  });

  describe('MatCheckbox List Item', () => {
    let fixture: ComponentFixture<CheckboxListItemComponent>;
    let loader: HarnessLoader;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [CommonModule, Uk2ListItemModule, MatCheckboxModule, MatIconModule, MatIconTestingModule],
        declarations: [CheckboxListItemComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(CheckboxListItemComponent);
      loader = TestbedHarnessEnvironment.loader(fixture);
    });

    it('should add selected class when checkbox is checked', async () => {
      let checkbox = await loader.getHarness(MatCheckboxHarness);

      await checkbox.uncheck();
      await checkbox.check();

      const selectedListItemEl = document.querySelector('.uk2-list-item-selected');
      expect(selectedListItemEl).not.toBeNull();
    });
  });

  describe('RadioGroup List Item', () => {
    let fixture: ComponentFixture<RadioGroupListItemComponent>;
    let loader: HarnessLoader;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [CommonModule, Uk2ListItemModule, MatRadioModule, MatIconModule, MatIconTestingModule],
        declarations: [RadioGroupListItemComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(RadioGroupListItemComponent);
    });

    it('should add selected class when checkbox is checked', async () => {
      loader = TestbedHarnessEnvironment.loader(fixture);
      let radioGroup = await loader.getHarness(MatRadioGroupHarness);

      await radioGroup.checkRadioButton();

      const selectedListItemEl = document.querySelectorAll('.uk2-list-item-selected');
      expect(selectedListItemEl.length).toBe(1);
    });
  });

  describe('RadioButton List Item', () => {
    let fixture: ComponentFixture<RadioListItemComponent>;
    let loader: HarnessLoader;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [CommonModule, Uk2ListItemModule, MatRadioModule, MatIconModule, MatIconTestingModule],
        declarations: [RadioListItemComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(RadioListItemComponent);
      loader = TestbedHarnessEnvironment.loader(fixture);
    });

    it('should add selected class when checkbox is checked', async () => {
      let radioButton = await loader.getHarness(MatRadioButtonHarness);

      await radioButton.check();

      const selectedListItemEl = document.querySelector('.uk2-list-item-selected');
      expect(selectedListItemEl).not.toBeNull();
    });
  });
});

@Component({
  template: `<mat-select value="option1">
    <mat-option value="option1">
      <uk2-list-item [uk2ListItem]="item"></uk2-list-item>
    </mat-option>
    <mat-option value="option2">
      <uk2-list-item [uk2ListItem]="item"></uk2-list-item>
    </mat-option>
  </mat-select>`,
})
export class OptionListItemComponent {
  item: Uk2ListItem = {
    bodyText: 'You agree with option 1',
    headerLabelName: 'Option 1',
    svgIconName: 'uk2-phone',
    value: 'option1',
  };
}

@Component({
  template: `<uk2-list-item uk2Clickable [uk2ListItem]="item">
    <mat-radio-button disableRipple uk2RadioButton value="option1"> </mat-radio-button>
  </uk2-list-item>`,
})
export class RadioListItemComponent {
  item: Uk2ListItem = {
    bodyText: 'You agree with option 1',
    headerLabelName: 'Option 1',
    svgIconName: 'uk2-phone',
    value: 'option1',
  };
}

@Component({
  template: `
    <mat-radio-group value="option1">
      <uk2-list-item uk2Clickable [uk2ListItem]="item">
        <mat-radio-button disableRipple uk2RadioButton value="option1"></mat-radio-button>
      </uk2-list-item>
      <uk2-list-item uk2Clickable [uk2ListItem]="item">
        <mat-radio-button disableRipple uk2RadioButton value="option2"></mat-radio-button>
      </uk2-list-item>
    </mat-radio-group>
  `,
})
export class RadioGroupListItemComponent {
  item: Uk2ListItem = {
    bodyText: 'You agree with option 1',
    headerLabelName: 'Option 1',
    svgIconName: 'uk2-phone',
    value: 'option1',
  };
}

@Component({
  template: `<uk2-list-item uk2Clickable [uk2ListItem]="item">
    <mat-checkbox uk2Checkbox disableRipple checked></mat-checkbox>
  </uk2-list-item>`,
})
export class CheckboxListItemComponent {
  item: Uk2ListItem = {
    bodyText: 'You agree with option 1',
    headerLabelName: 'Option 1',
    svgIconName: 'uk2-phone',
    value: 'option1',
  };
}
