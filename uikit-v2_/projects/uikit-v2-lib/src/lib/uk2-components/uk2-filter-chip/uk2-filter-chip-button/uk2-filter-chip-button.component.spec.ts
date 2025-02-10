import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Uk2FilterChipStateService } from '@axos/uikit-v2-lib/src/lib/uk2-services';

import { Uk2FilterChipButtonComponent } from './uk2-filter-chip-button.component';

describe('Uk2FilterChipButtonComponent', () => {
  describe('functionality', () => {
    let fixture: ComponentFixture<Uk2FilterChipButtonComponent>;
    let component: Uk2FilterChipButtonComponent;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        declarations: [Uk2FilterChipButtonComponent],
        providers: [Uk2FilterChipStateService],
      }).compileComponents();
    });

    beforeEach(() => {
      fixture = TestBed.createComponent(Uk2FilterChipButtonComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should create a button with class uk2-filter-chip-button', () => {
      // Arrange
      const button = fixture.nativeElement.querySelector('button');

      // Act
      // Assert
      expect(button).toBeTruthy();
      expect(button.classList.contains('uk2-filter-chip-button')).toBeTrue();
    });

    it('should add class uk2-filter-chip-button-active when service value pressed is true', () => {
      // Arrange
      const button = fixture.nativeElement.querySelector('button');
      component.uk2FilterChipStateService.setPressed(true);

      // Act
      fixture.detectChanges();

      // Assert
      expect(button.classList.contains('uk2-filter-chip-button-active')).toBeTrue();
    });

    it('should call openOverlay method when button is clicked', () => {
      // Arrange
      const spy = spyOn(component.uk2FilterChipStateService, 'openOverlay');

      // Act
      const button = fixture.nativeElement.querySelector('button');
      button.click();

      // Assert
      expect(spy).toHaveBeenCalled();
    });

    it('should set the max width of the button to the value from the service', () => {
      // Arrange
      const button = fixture.nativeElement.querySelector('button');
      component.uk2FilterChipStateService.setFilterChipMaxWidth(100);

      // Act
      fixture.detectChanges();

      // Assert
      expect(button.style.maxWidth).toBe('100px');
    });
  });

  describe('errors', () => {
    it('should throw an error if the Uk2FilterChipStateService is not provided', async () => {
      // Arrange
      let fixture: ComponentFixture<Uk2FilterChipButtonComponent>;
      await TestBed.configureTestingModule({
        declarations: [Uk2FilterChipButtonComponent],
      }).compileComponents();

      // Act
      // Assert
      expect(() => (fixture = TestBed.createComponent(Uk2FilterChipButtonComponent))).toThrowError();
    });
  });
});
