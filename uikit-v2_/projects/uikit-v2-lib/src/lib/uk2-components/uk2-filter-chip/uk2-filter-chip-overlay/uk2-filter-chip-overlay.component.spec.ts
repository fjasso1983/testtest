import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { QueryList } from '@angular/core';

import { Uk2FilterChipStateService } from '@axos/uikit-v2-lib/src/lib/uk2-services';

import { Uk2FilterChipOverlayComponent } from './uk2-filter-chip-overlay.component';

describe('Uk2FilterChipOverlayComponent', () => {
  describe('errors', () => {
    it('should throw an error if the Uk2FilterChipStateService is not provided', async () => {
      // Arrange
      let fixture: ComponentFixture<Uk2FilterChipOverlayComponent>;
      await TestBed.configureTestingModule({
        declarations: [Uk2FilterChipOverlayComponent],
      }).compileComponents();

      // Act
      // Assert
      expect(() => (fixture = TestBed.createComponent(Uk2FilterChipOverlayComponent))).toThrowError();
    });
  });

  describe('functionality', () => {
    let fixture: ComponentFixture<Uk2FilterChipOverlayComponent>;
    let component: Uk2FilterChipOverlayComponent;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        declarations: [Uk2FilterChipOverlayComponent],
        providers: [Uk2FilterChipStateService],
      }).compileComponents();
    });

    beforeEach(() => {
      fixture = TestBed.createComponent(Uk2FilterChipOverlayComponent);
      component = fixture.componentInstance;

      component.uk2FilterChipOverlayOptions = [];

      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should open overlay calling open method', () => {
      // Assert
      let overlayEl: HTMLElement;

      // Act
      component.open();

      // Assert
      overlayEl = fixture.debugElement.query(By.css('.uk2-filter-chip-overlay')).nativeElement;
      expect(overlayEl).toBeTruthy();
    });

    it('should remove overlay calling close method', () => {
      // Arrange
      let overlayEl;

      // Act
      component.open();
      component.close();
      fixture.detectChanges();

      // Assert
      overlayEl = fixture.debugElement.query(By.css('.uk2-filter-chip-overlay'));
      expect(overlayEl).toBeFalsy();
    });

    it('should return true if overlay is open', () => {
      // Act
      component.open();

      // Assert
      expect(component.isOpen()).toBeTrue();
    });

    it('should return false if overlay is closed', () => {
      // Act
      component.open();
      component.close();

      // Assert
      expect(component.isOpen()).toBeFalse();
    });

    it('should clear value when clearValue is called', () => {
      // Arrange
      const spy = spyOn(component.uk2FilterChipStateService, 'setValue');

      // Act
      component.clearValue();

      // Assert
      expect(spy).toHaveBeenCalledWith('');
    });

    it('should call setPreviousItemActive when ArrowUp is pressed', () => {
      // Arrange
      const spy = spyOn(component.keyManager, 'setPreviousItemActive');
      const event = { key: 'ArrowUp', preventDefault: jasmine.createSpy() };

      // Act
      component.handleKeyEvent(event as unknown as KeyboardEvent);

      // Assert
      expect(event.preventDefault).toHaveBeenCalled();
      expect(spy).toHaveBeenCalled();
    });

    it('should call setNextItemActive when ArrowDown is pressed', () => {
      // Arrange
      const spy = spyOn(component.keyManager, 'setNextItemActive');
      const event = { key: 'ArrowDown', preventDefault: jasmine.createSpy() };

      // Act
      component.handleKeyEvent(event as unknown as KeyboardEvent);

      // Assert
      expect(event.preventDefault).toHaveBeenCalled();
      expect(spy).toHaveBeenCalled();
    });

    it('should call preventDefault and focus on clearSelection when Tab is pressed', () => {
      // Arrange
      component.clearSelection = {
        nativeElement: {
          focus: jasmine.createSpy(),
        },
      };
      component.uk2FilterChipStateService.setActive(true);
      fixture.detectChanges();
      const spy = component.clearSelection.nativeElement.focus;
      const event = { key: 'Tab', preventDefault: jasmine.createSpy() } as unknown as KeyboardEvent;

      // Act
      component.handleKeyEvent(event);

      // Assert
      expect(event.preventDefault).toHaveBeenCalled();
      expect(spy).toHaveBeenCalled();
    });

    it('should call setFirstItemActive when openOverlay emits a new value', () => {
      // Arrange
      const spy = spyOn(component.keyManager, 'setFirstItemActive');

      // Act
      component.ngOnInit();
      component.uk2FilterChipStateService.openOverlay();

      // Assert
      expect(spy).toHaveBeenCalled();
    });

    it('should set min-width to 200px when uk2MinWidth is set to "200px"', () => {
      // Assert
      let overlayEl: HTMLElement;

      // Act
      component.uk2FilterChipStateService.setOverlayMinWidth('200px');
      component.open();

      // Assert
      overlayEl = fixture.debugElement.query(By.css('.uk2-filter-chip-overlay')).nativeElement;
      expect(overlayEl.style.minWidth).toEqual('200px');
    });

    it('should call close method is service property getCloseOverlayAfterClear returns true when clearValue is called', () => {
      // Arrange
      const spy = spyOn(component, 'close');
      spyOn(component.uk2FilterChipStateService, 'getCloseOverlayAfterClear').and.returnValue(true);

      // Act
      component.clearValue();

      // Assert
      expect(spy).toHaveBeenCalled();
    });

    it('should not call close method is service property getCloseOverlayAfterClear returns false when clearValue is called', () => {
      // Arrange
      const spy = spyOn(component, 'close');
      spyOn(component.uk2FilterChipStateService, 'getCloseOverlayAfterClear').and.returnValue(false);

      // Act
      component.clearValue();

      // Assert
      expect(spy).not.toHaveBeenCalled();
    });

    it('should hide clear selection button if uk2ShowClearSelection is set to false', () => {
      // Act
      component.uk2FilterChipStateService.setShowClearSelection(false);
      component.uk2FilterChipStateService.setActive(true);
      component.open();

      // Assert
      const clearSelectionEl = document.querySelector('.uk2-filter-chip-overlay-clear-selection');
      expect(clearSelectionEl).toBeNull();
    });

    it('should show clear selection button if uk2ShowClearSelection is set to true', () => {
      // Act
      component.uk2FilterChipStateService.setShowClearSelection(true);
      component.uk2FilterChipStateService.setActive(true);
      component.open();

      // Assert
      const clearSelectionEl = document.querySelector('.uk2-filter-chip-overlay-clear-selection');
      expect(clearSelectionEl).not.toBeNull();
    });

    it('should call close when escape key is pressed', () => {
      // Arrange
      const spy = spyOn(component, 'close');
      const event = { key: 'Escape', preventDefault: jasmine.createSpy() };

      // Act
      component.handleKeyEvent(event as unknown as KeyboardEvent);

      // Assert
      expect(event.preventDefault).toHaveBeenCalled();
      expect(spy).toHaveBeenCalled();
    });
  });
});
