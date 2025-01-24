import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, ViewChild } from '@angular/core';
import { By } from '@angular/platform-browser';

import { Uk2SearchMenuItemDirective } from './uk2-search-menu-item.directive';

describe('Uk2SearchMenuItemDirective', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TestComponent, Uk2SearchMenuItemDirective],
    }).compileComponents();

    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  describe('HTML attributes', () => {
    it('should add class and role to host element', () => {
      const targetEl = fixture.debugElement.query(By.css('#target-element')).nativeElement as HTMLElement;

      expect(targetEl.classList.contains('uk2-search-menu-item')).toBeTrue();
      expect(targetEl.getAttribute('role')).toBe('option');
    });
  });

  describe('HTML events', () => {
    let targetEl: HTMLElement;
    beforeEach(() => {
      targetEl = fixture.debugElement.query(By.css('#target-element')).nativeElement as HTMLElement;
    });

    it('should emit uk2SearchMenuItemSelected if user click element', async (done: DoneFn) => {
      await fixture.whenStable();

      component.uk2SearchMenuItemDirective.uk2SearchMenuItemSelected.subscribe(event => {
        expect(event).toBeUndefined();
        done();
      });

      targetEl.click();
    });

    it('should emit uk2SearchMenuItemSelected if user click element', async (done: DoneFn) => {
      await fixture.whenStable();

      component.uk2SearchMenuItemDirective.uk2SearchMenuItemSelected.subscribe(event => {
        expect(event).toBeUndefined();
        done();
      });

      targetEl.dispatchEvent(new KeyboardEvent('keyup', { key: 'enter' }));
    });
  });

  describe('directive methods', () => {
    it('should add hide class and tabindex -1 calling hide method', async () => {
      await fixture.whenStable();
      let targetEl = fixture.debugElement.query(By.css('#target-element')).nativeElement as HTMLElement;

      component.uk2SearchMenuItemDirective.hide();

      expect(targetEl.getAttribute('tabindex')).toBe('-1');
      expect(targetEl.classList.contains('cdk-visually-hidden')).toBeTrue();
      expect(targetEl.style.display).toBe('none');
      expect(component.uk2SearchMenuItemDirective.disabled).toBeTrue();
    });

    it('should remove hide class and tabindex should be 1 calling show method', async () => {
      await fixture.whenStable();
      let targetEl = fixture.debugElement.query(By.css('#target-element')).nativeElement as HTMLElement;

      component.uk2SearchMenuItemDirective.show();

      expect(targetEl.getAttribute('tabindex')).toBe('0');
      expect(targetEl.classList.contains('cdk-visually-hidden')).toBeFalse();
      expect(targetEl.style.display).toBe('block');
      expect(component.uk2SearchMenuItemDirective.disabled).toBeFalse();
    });

    it('should focus target element calling focus element', async () => {
      await fixture.whenStable();
      const spy = spyOn(component.uk2SearchMenuItemDirective['elementRef'].nativeElement, 'focus');

      component.uk2SearchMenuItemDirective.focus();

      expect(spy).toHaveBeenCalled();
    });

    it('should sanitize inner text of target element and assign to textContent property', async () => {
      await fixture.whenStable();

      component.uk2SearchMenuItemDirective.ngAfterViewInit();

      expect(component.uk2SearchMenuItemDirective.textContent).toEqual('my option text');
    });
  });
});

@Component({
  template: `<div id="target-element" uk2SearchMenuItem>My  option teXT</div>`,
})
class TestComponent {
  @ViewChild(Uk2SearchMenuItemDirective) uk2SearchMenuItemDirective!: Uk2SearchMenuItemDirective;
}
