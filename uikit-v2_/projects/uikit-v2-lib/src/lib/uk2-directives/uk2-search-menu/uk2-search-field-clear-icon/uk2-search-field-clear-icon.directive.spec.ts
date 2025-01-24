import { Component, Input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { Uk2SearchMenuDirective } from '../uk2-search-menu.directive';
import { Uk2SearchInputClearIconDirective } from './uk2-search-field-clear-icon.directive';

describe('Uk2SearchInputClearIconDirective', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;
  let uk2SearchMenuDirectiveMock = jasmine.createSpyObj('Uk2SearchMenuDirective', [
    'focusOverlay',
    'clearInputAndFocus',
  ]);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TestComponent, Uk2SearchInputClearIconDirective],
    }).compileComponents();

    uk2SearchMenuDirectiveMock.clearInputAndFocus.calls.reset();
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;

    component.uk2SearchMenu = uk2SearchMenuDirectiveMock;

    fixture.detectChanges();
  });

  describe('HTML attributes', () => {
    it('should add classes and attributes to host element', () => {
      const targetEl = fixture.debugElement.query(By.css('#target-element')).nativeElement as HTMLButtonElement;

      expect(targetEl).toBeDefined();

      expect(targetEl.classList.contains('uk2-search-clear-input-icon')).toBeTrue();
      expect(targetEl.classList.contains('uk2-search-input-icon')).toBeTrue();
      expect(targetEl.getAttribute('aria-label')).toBe('Clear search input');
    });
  });

  describe('User events', () => {
    it('should listen tab event and call focusOverlay method', () => {
      const targetEl = fixture.debugElement.query(By.css('#target-element')).nativeElement as HTMLButtonElement;

      targetEl.dispatchEvent(new KeyboardEvent('keydown', { key: 'tab' }));

      expect(uk2SearchMenuDirectiveMock.focusOverlay).toHaveBeenCalled();
    });

    it('should listen click event and call clearInputAndFocus method', () => {
      const targetEl = fixture.debugElement.query(By.css('#target-element')).nativeElement as HTMLButtonElement;

      targetEl.dispatchEvent(new Event('click'));

      expect(uk2SearchMenuDirectiveMock.clearInputAndFocus).toHaveBeenCalled();
    });

    it("should listen keydown enter event and don't call clearInputAndFocus method", () => {
      const targetEl = fixture.debugElement.query(By.css('#target-element')).nativeElement as HTMLButtonElement;

      targetEl.dispatchEvent(new KeyboardEvent('keydown', { key: 'enter' }));

      expect(uk2SearchMenuDirectiveMock.clearInputAndFocus).not.toHaveBeenCalled();
    });

    it('should listen keyup enter event and call clearInputAndFocus method', () => {
      const targetEl = fixture.debugElement.query(By.css('#target-element')).nativeElement as HTMLButtonElement;

      targetEl.dispatchEvent(new KeyboardEvent('keyup', { key: 'enter' }));

      expect(uk2SearchMenuDirectiveMock.clearInputAndFocus).toHaveBeenCalled();
    });
  });
});

@Component({
  template: `<button id="target-element" uk2SearchInputClearIcon [uk2SearchMenu]="uk2SearchMenu"></button>`,
})
export class TestComponent {
  @Input() uk2SearchMenu!: Uk2SearchMenuDirective;
}
