import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Uk2FlyoutMenuBodyDirective } from './uk2-flyout-body.directive';
import { CommonModule } from '@angular/common';

describe('Uk2FlyoutBodyDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let component: TestComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CommonModule],
      declarations: [TestComponent, Uk2FlyoutMenuBodyDirective],
    });

    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have class uk2-flyout-menu-body', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('div').classList).toContain('uk2-flyout-menu-body');
  });

  it('should have class uk2-scrollbar--medium', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('div').classList).toContain('uk2-scrollbar--medium');
  });

  it('should add gradient effect when content overflow', () => {
    component.triggerScroll = true;
    fixture.detectChanges();
    component.directive.ngOnInit();
    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('div').classList).toContain('uk2-gradient-margin');
  });

  it('should remove gradient effect when user scroll to the end of overflow', () => {
    component.triggerScroll = true;
    fixture.detectChanges();
    component.directive.ngOnInit();
    fixture.detectChanges();
    spyOn(component.directive as any, 'getScrollData').and.returnValue({
      scrollTop: 50,
      scrollHeight: 100,
      offsetHeight: 50,
    });

    fixture.nativeElement.querySelector('div').dispatchEvent(new Event('scroll'));

    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('div').classList).not.toContain('uk2-gradient-margin');
  });

  it('should add gradient effect when user scroll to any section except the end', () => {
    component.triggerScroll = true;
    fixture.detectChanges();
    component.directive.ngOnInit();
    fixture.detectChanges();

    fixture.nativeElement.querySelector('div').dispatchEvent(new Event('scroll'));
    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('div').classList).toContain('uk2-gradient-margin');
  });
});

@Component({
  template: `<div uk2FlyoutMenuBody [style.height]="triggerScroll ? '50px' : 'auto'">
    <div *ngIf="triggerScroll">
      <p>lorem ipsum</p>
      <p>lorem ipsum</p>
      <p>lorem ipsum</p>
      <p>lorem ipsum</p>
      <p>lorem ipsum</p>
      <p>lorem ipsum</p>
      <p>lorem ipsum</p>
      <p>lorem ipsum</p>
      <p>lorem ipsum</p>
      <p>lorem ipsum</p>
    </div>
  </div>`,
})
class TestComponent {
  @ViewChild(Uk2FlyoutMenuBodyDirective) directive!: Uk2FlyoutMenuBodyDirective;
  triggerScroll = false;
}
