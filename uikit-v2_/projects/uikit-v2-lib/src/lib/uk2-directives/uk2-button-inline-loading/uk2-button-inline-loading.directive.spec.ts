import { Component, EventEmitter, Output } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { Uk2DirectivesModule } from '@axos/uikit-v2-lib/src/lib/uk2-directives';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Uk2ServicesModule } from '@axos/uikit-v2-lib/src/lib/uk2-services';

describe('Uk2ButtonInlineLoadingDirective', () => {
  describe('From normal state to loading state', () => {
    let fixture: ComponentFixture<TestComponent>;
    let component: TestComponent;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [MatButtonModule, Uk2DirectivesModule, BrowserAnimationsModule, Uk2ServicesModule],
        declarations: [TestComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(TestComponent);
      component = fixture.componentInstance;

      fixture.detectChanges();
    });

    it('should create a normal button', () => {
      const text = fixture.nativeElement.querySelector('button');

      expect(component).toBeDefined();
      expect(text.innerText).toBe('Click');
    });

    it('should allow keyboard interaction while is not loading', (done: DoneFn) => {
      component.enterPressDown.subscribe(keyEvent => {
        expect(keyEvent).toBe('keyEvent');
        done();
      });

      const button = fixture.nativeElement.querySelector('button') as HTMLButtonElement;
      button.focus();
      button.dispatchEvent(new KeyboardEvent('keydown', { key: 'enter' }));
    });

    it('should show text loading and three dots when loading is activated', fakeAsync(() => {
      component.toggleLoading();

      fixture.detectChanges();
      tick(1);

      const text = fixture.nativeElement.querySelector('button span.uk2-inline-loading-button-container');
      expect(text.innerText).toBe('Loading...');
    }));
  });

  describe('From loading state to normal state', () => {
    let fixture: ComponentFixture<TestComponent>;
    let component: TestComponent;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [MatButtonModule, Uk2DirectivesModule, BrowserAnimationsModule, Uk2ServicesModule],
        declarations: [TestComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(TestComponent);
      component = fixture.componentInstance;
      component.uk2InlineLoading = true;
      component.uk2InlineLoadingText = 'Saving';
    });

    it('should show text loading and three dots when loading is activated', fakeAsync(() => {
      fixture.detectChanges();
      tick(1);
      const text = fixture.nativeElement.querySelector('button span.uk2-inline-loading-button-container');
      expect(text.innerText).toBe('Saving...');
    }));

    it('should disable keyboard interaction while is loading', fakeAsync(() => {
      const subsSpy = spyOn(component.enterPressDown, 'subscribe');
      fixture.detectChanges();
      tick(1);

      const button = fixture.nativeElement.querySelector('button') as HTMLButtonElement;
      button.focus();
      button.dispatchEvent(new KeyboardEvent('keydown', { key: 'enter' }));

      tick(1);
      expect(subsSpy).not.toHaveBeenCalled();
    }));
  });

  describe('Bad Inputs', () => {
    let fixture: ComponentFixture<TestComponent>;
    let component: TestComponent;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [MatButtonModule, Uk2DirectivesModule, BrowserAnimationsModule, Uk2ServicesModule],
        declarations: [TestComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(TestComponent);
      component = fixture.componentInstance;
      component.uk2InlineLoadingText = undefined as any;
    });

    it('should throw error when loading text input is falsy', () => {
      expect(() => {
        fixture.detectChanges();
      }).toThrowError(
        '[inlineLoadingStateText] is a required property for Uk2ButtonInlineLoadingDirective please provide a valid string value'
      );
    });

    it('should throw error when loading input is not boolean', () => {
      component.uk2InlineLoadingText = 'Loading' as any;
      component.uk2InlineLoading = 'true' as any;

      expect(() => {
        fixture.detectChanges();
      }).toThrowError(
        '[uk2IsInlineLoadingActive] is a required property for Uk2ButtonInlineLoadingDirective please provide a boolean value'
      );
    });
  });
});

@Component({
  template: `
    <button
      uk2PrimaryButton
      disableRipple
      mat-raised-button
      [uk2InlineLoadingStateText]="uk2InlineLoadingText"
      [uk2IsInlineLoadingActive]="uk2InlineLoading"
      (keydown)="onEnter()"
      >Click</button
    >
  `,
})
class TestComponent {
  uk2InlineLoadingText = 'Loading';
  uk2InlineLoading = false;
  @Output() enterPressDown = new EventEmitter<string>();

  toggleLoading() {
    this.uk2InlineLoading = !this.uk2InlineLoading;
  }

  onEnter() {
    this.enterPressDown.emit('keyEvent');
  }
}
