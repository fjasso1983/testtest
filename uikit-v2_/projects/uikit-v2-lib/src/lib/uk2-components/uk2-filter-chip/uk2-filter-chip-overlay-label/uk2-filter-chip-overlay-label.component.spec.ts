import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatIconModule } from '@angular/material/icon';
import { MatIconTestingModule } from '@angular/material/icon/testing';
import { OverlayModule } from '@angular/cdk/overlay';

import { Uk2FilterChipStateService } from '@axos/uikit-v2-lib/src/lib/uk2-services';

import { Uk2FilterChipOverlayLabelComponent } from './uk2-filter-chip-overlay-label.component';

describe('Uk2FilterChipOverlayLabelComponent', () => {
  describe('errors', () => {
    it('should throw an error if the Uk2FilterChipStateService is not provided', async () => {
      // Arrange
      let fixture: ComponentFixture<Uk2FilterChipOverlayLabelComponent>;
      await TestBed.configureTestingModule({
        declarations: [Uk2FilterChipOverlayLabelComponent],
      }).compileComponents();

      // Act
      // Assert
      expect(() => (fixture = TestBed.createComponent(Uk2FilterChipOverlayLabelComponent))).toThrowError();
    });
  });

  describe('functionality', () => {
    let fixture: ComponentFixture<Uk2FilterChipOverlayLabelComponent>;
    let component: Uk2FilterChipOverlayLabelComponent;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        declarations: [Uk2FilterChipOverlayLabelComponent],
        imports: [MatIconModule, MatIconTestingModule, OverlayModule],
        providers: [Uk2FilterChipStateService],
      }).compileComponents();
    });

    beforeEach(() => {
      fixture = TestBed.createComponent(Uk2FilterChipOverlayLabelComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should render identifier and conditional', () => {
      // Arrange
      component.uk2FilterChipStateService.setIdentifier('Name');
      component.uk2FilterChipStateService.setConditional({ label: 'Is', buttonLabel: 'Is' });

      // Act
      fixture.detectChanges();

      // Assert
      const label = fixture.nativeElement.querySelector('.uk2-filter-chip-overlay-label');
      expect(label.textContent).toContain('Name');
      expect(label.textContent).toContain('Is');
    });

    describe('conditionals overlay', () => {
      it('should open conditions overlay when clicked on chevronDownIcon', () => {
        // Arrange
        component.uk2Conditions = [
          { label: 'Is', buttonLabel: 'Is' },
          { label: 'Is not', buttonLabel: 'Not' },
        ];
        const chevronDownIconEl = fixture.nativeElement.querySelector('.uk2-filter-chip-overlay-label-header mat-icon');

        // Act
        chevronDownIconEl.click();
        fixture.detectChanges();

        // Assert
        const innerFlyDownEl = document.querySelector('.uk2-filter-chip-inner-fly-down-container');
        const conditionsElList = document.querySelectorAll<HTMLElement>('.uk2-filter-chip-inner-fly-down-option');
        expect(innerFlyDownEl).toBeTruthy();
        expect(conditionsElList[0].innerText).toContain('Is');
        expect(conditionsElList[1].innerText).toContain('Is not');
        expect(conditionsElList.length).toBe(2);
      });

      it('should add active class to conditional option that matches with state', () => {
        // Arrange
        component.uk2Conditions = [
          { label: 'Is', buttonLabel: 'Is' },
          { label: 'Is not', buttonLabel: 'Not' },
        ];
        component.uk2FilterChipStateService.setConditional({ label: 'Is not', buttonLabel: 'Not' });
        const chevronDownIconEl = fixture.nativeElement.querySelector('.uk2-filter-chip-overlay-label-header mat-icon');

        // Act
        chevronDownIconEl.click();
        fixture.detectChanges();

        // Assert
        const conditionsElList = document.querySelectorAll<HTMLElement>('.uk2-filter-chip-inner-fly-down-option');
        expect(conditionsElList[1].classList.contains('uk2-inner-fly-down-option-active')).toBeTrue();
      });

      it('should update state conditional and emit event after clicking on one condition option', () => {
        // Arrange
        component.uk2Conditions = [
          { label: 'Is', buttonLabel: 'Is' },
          { label: 'Is not', buttonLabel: 'Not' },
        ];
        component.uk2FilterChipStateService.setConditional({ label: 'Is', buttonLabel: 'Is' });
        const chevronDownIconEl = fixture.nativeElement.querySelector('.uk2-filter-chip-overlay-label-header mat-icon');
        const emitSpy = spyOn(component.uk2OptionSelected, 'emit');

        // Act
        chevronDownIconEl.click();
        fixture.detectChanges();
        const conditionsElList = document.querySelectorAll<HTMLElement>('.uk2-filter-chip-inner-fly-down-option');
        conditionsElList[1].click();
        fixture.detectChanges();

        // Assert
        expect(component.uk2FilterChipStateService.getConditional().label).toBe('Is not');
        expect(component.uk2FilterChipStateService.getConditional().buttonLabel).toBe('Not');
        expect(emitSpy).toHaveBeenCalledWith('Is not');
      });
    });

    describe('ellipsis overlay', () => {
      it('should open ellipsis overlay when clicked on ellipsisHorizontalIcon', () => {
        // Arrange
        const ellipsisHorizontalIconEl = fixture.nativeElement.querySelector(
          '.uk2-filter-chip-overlay-label-ellipsis mat-icon'
        );

        // Act
        ellipsisHorizontalIconEl.click();
        fixture.detectChanges();

        // Assert
        const innerFlyDownEl = document.querySelector('.uk2-filter-chip-inner-fly-down-container');
        expect(innerFlyDownEl).toBeTruthy();
      });

      it('should call deleteFilter method when clicked on trashIcon', () => {
        // Arrange
        const deleteFilterSpy = spyOn(component.uk2FilterChipStateService, 'deleteFilter');
        component.uk2FilterChipStateService.setValue('Peter');
        const ellipsisHorizontalIconEl = fixture.nativeElement.querySelector(
          '.uk2-filter-chip-overlay-label-ellipsis mat-icon'
        );
        ellipsisHorizontalIconEl.click();
        fixture.detectChanges();

        // Act
        const trashIconEl = document.querySelector<HTMLElement>(
          '.uk2-filter-chip-delete-filter-container .uk2-filter-chip-inner-fly-down-option'
        ) as HTMLElement;
        trashIconEl.click();

        // Assert
        expect(deleteFilterSpy).toHaveBeenCalled();
      });
    });
  });
});
