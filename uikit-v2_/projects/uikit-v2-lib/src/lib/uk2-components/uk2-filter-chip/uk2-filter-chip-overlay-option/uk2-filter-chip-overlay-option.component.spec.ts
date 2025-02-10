import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatCheckboxModule } from '@angular/material/checkbox';

import { Uk2DirectivesModule, Uk2MenuListItemModule } from '@axos/uikit-v2-lib/src/lib/uk2-directives';
import { Uk2FilterChipStateService } from '@axos/uikit-v2-lib/src/lib/uk2-services';

import { Uk2FilterChipOverlayOptionComponent } from './uk2-filter-chip-overlay-option.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('Uk2FilterChipOverlayOptionComponent', () => {
  describe('errors', () => {
    it('should throw an error if the Uk2FilterChipStateService is not provided', async () => {
      // Arrange
      let fixture: ComponentFixture<Uk2FilterChipOverlayOptionComponent>;
      await TestBed.configureTestingModule({
        declarations: [Uk2FilterChipOverlayOptionComponent],
        schemas: [NO_ERRORS_SCHEMA],
      }).compileComponents();

      // Act
      // Assert
      expect(() => (fixture = TestBed.createComponent(Uk2FilterChipOverlayOptionComponent))).toThrowError();
    });
  });

  describe('functionality', () => {
    let fixture: ComponentFixture<Uk2FilterChipOverlayOptionComponent>;
    let component: Uk2FilterChipOverlayOptionComponent;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        declarations: [Uk2FilterChipOverlayOptionComponent],
        imports: [MatCheckboxModule, Uk2DirectivesModule, Uk2MenuListItemModule],
        providers: [Uk2FilterChipStateService],
        schemas: [NO_ERRORS_SCHEMA],
      }).compileComponents();
    });

    beforeEach(() => {
      fixture = TestBed.createComponent(Uk2FilterChipOverlayOptionComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should set option as active if state value match with option value', () => {
      // Arrange
      component.uk2Value = 'Option 1';
      component['uk2FilterChipState'].setValue('Option 1');

      // Act
      fixture.detectChanges();

      // Assert
      expect(fixture.nativeElement.classList.contains('uk2-filter-chip-option-active')).toBeTruthy();
    });

    it('should set option as active in uk2Multiple if state value array contains option value', () => {
      // Arrange
      component.uk2Value = 'Option 1';
      component.uk2Multiple = true;
      component['uk2FilterChipState'].setValue(['Option 3', 'Option 1']);

      // Act
      fixture.detectChanges();

      // Assert
      expect(fixture.nativeElement.classList.contains('uk2-filter-chip-option-active')).toBeTruthy();
    });

    it('should update state value and state active when option is clicked', () => {
      // Arrange
      component['uk2FilterChipState'].setActive(false);
      component['uk2FilterChipState'].setValue('');
      component.uk2Value = 'Option 1';
      const optionEl = fixture.nativeElement;

      // Act
      optionEl.click();
      fixture.detectChanges();

      // Assert
      expect(component['uk2FilterChipState'].getValue()).toBe('Option 1');
      expect(component['uk2FilterChipState'].getActive()).toBeTrue();
    });

    it('should update state value and state active when option is multiple and is clicked', () => {
      // Arrange
      component['uk2FilterChipState'].setActive(false);
      component['uk2FilterChipState'].setValue([]);
      component.uk2Value = 'Option 1';
      component.uk2Multiple = true;
      const optionEl = fixture.nativeElement;

      // Act
      optionEl.click();
      fixture.detectChanges();

      // Assert
      expect(component['uk2FilterChipState'].getValue()).toEqual(['Option 1']);
      expect(component['uk2FilterChipState'].getActive()).toBeTrue();
    });

    it('should remove option from state value when option is multiple and is clicked and already active', () => {
      // Arrange
      component['uk2FilterChipState'].setActive(true);
      component['uk2FilterChipState'].setValue(['Option 1']);
      component.uk2Value = 'Option 1';
      component.uk2Multiple = true;
      const optionEl = fixture.nativeElement;

      // Act
      optionEl.click();
      fixture.detectChanges();

      // Assert
      expect(component['uk2FilterChipState'].getValue()).toEqual([]);
      expect(component['uk2FilterChipState'].getActive()).toBeFalse();
    });

    it('should change empty string to empty array when option is multiple and is clicked', () => {
      // Arrange
      component['uk2FilterChipState'].setActive(false);
      component['uk2FilterChipState'].setValue('');
      component.uk2Value = 'Option 1';
      component.uk2Multiple = true;
      const optionEl = fixture.nativeElement;

      // Act
      optionEl.click();
      fixture.detectChanges();

      // Assert
      expect(component['uk2FilterChipState'].getValue()).toEqual(['Option 1']);
      expect(component['uk2FilterChipState'].getActive()).toBeTrue();
    });

    it('should focus element when focus method is called', () => {
      // Arrange
      const spy = spyOn(component.elementRef.nativeElement, 'focus');

      // Act
      component.focus();

      // Assert
      expect(spy).toHaveBeenCalled();
    });

    it('should call onClick on event keydown.enter', () => {
      // Arrange
      const spy = spyOn(component, 'onClick');
      const event = new KeyboardEvent('keydown', { key: 'Enter' });

      // Act
      component.elementRef.nativeElement.dispatchEvent(event);

      // Assert
      expect(spy).toHaveBeenCalled();
    });

    it('should call onClick on event keydown.space', () => {
      // Arrange
      const spy = spyOn(component, 'onClick');
      const event = new KeyboardEvent('keydown', { key: ' ' });

      // Act
      component.elementRef.nativeElement.dispatchEvent(event);

      // Assert
      expect(spy).toHaveBeenCalled();
    });

    it('should not set value on clicking element if component is disabled', () => {
      // Arrange
      component.uk2IsDisabled = true;
      const spy = spyOn(component['uk2FilterChipState'], 'setValue');
      const optionEl = fixture.nativeElement;

      // Act
      optionEl.click();
      fixture.detectChanges();

      // Assert
      expect(component['uk2FilterChipState'].getValue()).toEqual(null);
      expect(spy).not.toHaveBeenCalled();
    });
  });
});
