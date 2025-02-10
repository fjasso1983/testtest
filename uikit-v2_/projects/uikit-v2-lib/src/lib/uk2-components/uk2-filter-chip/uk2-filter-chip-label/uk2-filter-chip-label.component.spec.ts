import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { MatIconModule } from '@angular/material/icon';
import { MatIconTestingModule } from '@angular/material/icon/testing';

import { Uk2FilterChipStateService } from '@axos/uikit-v2-lib/src/lib/uk2-services';

import { Uk2FilterChipLabelComponent } from './uk2-filter-chip-label.component';

describe('Uk2FilterChipLabelComponent', () => {
  describe('errors', () => {
    it('should throw an error if the Uk2FilterChipStateService is not provided', async () => {
      // Arrange
      let fixture: ComponentFixture<Uk2FilterChipLabelComponent>;
      await TestBed.configureTestingModule({
        declarations: [Uk2FilterChipLabelComponent],
      }).compileComponents();

      // Act
      // Assert
      expect(() => (fixture = TestBed.createComponent(Uk2FilterChipLabelComponent))).toThrowError();
    });
  });

  describe('functionality', () => {
    let fixture: ComponentFixture<Uk2FilterChipLabelComponent>;
    let component: Uk2FilterChipLabelComponent;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        declarations: [Uk2FilterChipLabelComponent],
        imports: [MatIconModule, MatIconTestingModule],
        providers: [Uk2FilterChipStateService],
      }).compileComponents();
    });

    beforeEach(() => {
      fixture = TestBed.createComponent(Uk2FilterChipLabelComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should create div with class uk2-filter-chip-label', () => {
      // Arrange
      const div = fixture.nativeElement.querySelector('div');

      // Act
      // Assert
      expect(div).toBeTruthy();
      expect(div.classList.contains('uk2-filter-chip-label')).toBeTrue();
    });

    it('should only display the identifier when the chip is not active', () => {
      // Arrange
      component.uk2FilterChipStateService.setIdentifier('Name');
      component.uk2FilterChipStateService.setConditional({ label: 'Is', buttonLabel: 'Is' });
      component.uk2FilterChipStateService.setActive(false);

      // Act
      fixture.detectChanges();

      // Assert
      expect(fixture.nativeElement.querySelector('.uk2-filter-chip-label').textContent.trim()).toBe('Name');
    });

    it('should display the identifier and condition when the chip is active', () => {
      // Arrange
      component.uk2FilterChipStateService.setIdentifier('Name');
      component.uk2FilterChipStateService.setConditional({ label: 'Is', buttonLabel: 'Is' });
      component.uk2FilterChipStateService.setValue('Peter');

      // Act
      fixture.detectChanges();

      // Assert
      expect(fixture.nativeElement.textContent.replace(/[\n\r]+|[\s]{2,}/g, ' ').trim()).toContain('Name: Is Peter');
    });

    it('should display the total number of items selected when the chip is active and the width of the conditions exceeds the max width', fakeAsync(() => {
      // Arrange
      component.uk2FilterChipStateService.setIdentifier('Name');
      component.uk2FilterChipStateService.setConditional({ label: 'Is', buttonLabel: 'Is' });
      component.uk2FilterChipStateService.setIsMultiple(true);
      component.uk2FilterChipStateService.setValue(['Peter', 'John', 'Alexander', 'Benjamin', 'Katherine']);
      component.uk2FilterChipStateService.optionSelected();

      // Act
      tick();
      fixture.detectChanges();

      // Assert
      expect(
        fixture.nativeElement
          .querySelector('.uk2-filter-chip-label')
          .textContent.replace(/[\n\r]+|[\s]{2,}/g, ' ')
          .trim()
      ).toContain('Name (5)');
      expect(component.showNumberOfItems).toBeTrue();
    }));
  });
});
