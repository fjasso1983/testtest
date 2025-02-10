import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { By } from '@angular/platform-browser';

import { MatIconModule } from '@angular/material/icon';
import { MatIconTestingModule } from '@angular/material/icon/testing';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { MATERIAL_CLASSES } from '@axos/uikit-v2-lib/src/lib/uk2-internal-utils';

import { Uk2ListItem } from '../../types';
import { Uk2ListItemModule } from '../../uk2-list-item.module';
import { Uk2ListItemComponent } from '../../uk2-list-item.component';
import { Uk2IconRegistryService } from '@axos/uikit-v2-lib';

describe('Uk2ListItemClickableDirective', () => {
  describe('Normal list item', () => {
    let fixture: ComponentFixture<NormalListItemComponent>;
    let service : Uk2IconRegistryService;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        declarations: [NormalListItemComponent],
        providers:[Uk2IconRegistryService],
        imports: [CommonModule, Uk2ListItemModule, MatIconTestingModule, MatIconModule],
      }).compileComponents;

      service = TestBed.inject(Uk2IconRegistryService);
      service.registerAllCategories();
      fixture = TestBed.createComponent(NormalListItemComponent);

      fixture.detectChanges();
    });

    it('should set style cursor to pointer', () => {
      const component = fixture.debugElement.query(By.directive(Uk2ListItemComponent));

      expect(component.styles.cursor).toBe('pointer');
      expect(component.styles.pointerEvents).toBe('auto');
    });

    it('should not emit click events when list-item isDisabled', () => {
      const component = fixture.componentInstance;
      const componentEl = fixture.debugElement.query(By.directive(Uk2ListItemComponent));

      component.activateIsDisabled();
      fixture.detectChanges();

      expect(componentEl.styles.cursor).toBe('default');
      expect(componentEl.styles.pointerEvents).toBe('none');
    });

    it('should not emit click events when list-item isLoading', () => {
      const component = fixture.componentInstance;
      const componentEl = fixture.debugElement.query(By.directive(Uk2ListItemComponent));

      component.activateIsLoading();
      fixture.detectChanges();

      expect(componentEl.styles.cursor).toBe('default');
      expect(componentEl.styles.pointerEvents).toBe('none');
    });
  });

  describe('Radio list item', () => {
    let fixture: ComponentFixture<RadioListItemComponent>;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        declarations: [RadioListItemComponent],
        imports: [CommonModule, Uk2ListItemModule, MatIconTestingModule, MatIconModule, MatRadioModule],
      }).compileComponents;

      fixture = TestBed.createComponent(RadioListItemComponent);

      fixture.detectChanges();
    });

    it('should call radioButton click method when list item is clicked', () => {
      const component = fixture.debugElement.query(By.directive(Uk2ListItemComponent));
      const radioEl = fixture.debugElement.query(By.css(`.${MATERIAL_CLASSES.matRadioTouchTarget}`))
        .nativeElement as HTMLInputElement;
      const clickSpy = spyOn(radioEl, 'click');

      component.nativeElement.click();

      expect(clickSpy).toHaveBeenCalled();
    });

    it('should not call radioButton click if the click target is of type input to avoid duplicate click', () => {
      const radioTouchTargetEl = fixture.debugElement.query(By.css(`.${MATERIAL_CLASSES.matRadioTouchTarget}`))
        .nativeElement as HTMLInputElement;
      const radioEl = fixture.debugElement.query(By.css(`input[type="radio"]`)).nativeElement as HTMLInputElement;

      const clickSpy = spyOn(radioTouchTargetEl, 'click');

      radioEl.click();

      expect(clickSpy).toHaveBeenCalledTimes(0);
    });
  });
  describe('Checkbox list item', () => {
    let fixture: ComponentFixture<CheckboxListItemComponent>;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        declarations: [CheckboxListItemComponent],
        imports: [CommonModule, Uk2ListItemModule, MatIconTestingModule, MatIconModule, MatCheckboxModule],
      }).compileComponents;

      fixture = TestBed.createComponent(CheckboxListItemComponent);

      fixture.detectChanges();
    });

    it('should call checkBox click method when list item is clicked', () => {
      const component = fixture.debugElement.query(By.directive(Uk2ListItemComponent));
      const checkBoxEl = fixture.debugElement.query(By.css(`.${MATERIAL_CLASSES.matCheckboxTouchTarget}`))
        .nativeElement as HTMLInputElement;
      const clickSpy = spyOn(checkBoxEl, 'click');

      component.nativeElement.click();

      expect(clickSpy).toHaveBeenCalled();
    });

    it('should not call checkBox click if the click target is of type input to avoid duplicate click', () => {
      const checkBoxTouchTargetEl = fixture.debugElement.query(By.css(`.${MATERIAL_CLASSES.matCheckboxTouchTarget}`))
        .nativeElement as HTMLInputElement;
      const checkBoxEl = fixture.debugElement.query(By.css(`input[type="checkbox"]`)).nativeElement as HTMLInputElement;

      const clickSpy = spyOn(checkBoxTouchTargetEl, 'click');

      checkBoxEl.click();

      expect(clickSpy).toHaveBeenCalledTimes(0);
    });
  });
});

@Component({
  template: `<uk2-list-item
    uk2Clickable
    [uk2ListItem]="item"
    [uk2IsLoading]="isLoading"
    [uk2IsDisabled]="isDisabled"
  ></uk2-list-item>`,
})
export class NormalListItemComponent {
  item: Uk2ListItem = {
    bodyText: 'You agree with option 1',
    headerLabelName: 'Option 1',
    svgIconName: 'uk2-phone',
    value: 'option1',
  };
  isLoading = false;
  isDisabled = false;

  activateIsLoading() {
    this.isLoading = true;
  }

  activateIsDisabled() {
    this.isDisabled = true;
  }
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
  template: `<uk2-list-item uk2Clickable [uk2ListItem]="item">
    <mat-checkbox uk2Checkbox disableRipple></mat-checkbox>
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
