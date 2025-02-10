import { ChangeDetectorRef, Component, ElementRef, Renderer2 } from '@angular/core';
import { Uk2HeaderInlineActionsCellDirective } from './uk2-header-inline-actions-cell.directive';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

@Component({
  template: `<mat-header-cell uk2HeaderInlineActionsCell></mat-header-cell>`,
})
class TestHostComponent {}

class MockElementRef extends ElementRef {}

describe('Uk2HeaderInlineActionsCellDirective', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let directive: Uk2HeaderInlineActionsCellDirective;

  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      declarations: [Uk2HeaderInlineActionsCellDirective, TestHostComponent],
      providers: [
        Uk2HeaderInlineActionsCellDirective,
        { provide: ElementRef, useClass: MockElementRef },
        Renderer2,
        ChangeDetectorRef,
      ],
    }).createComponent(TestHostComponent);
    fixture.detectChanges();
    directive = fixture.debugElement
      .query(By.directive(Uk2HeaderInlineActionsCellDirective))
      .injector.get(Uk2HeaderInlineActionsCellDirective) as Uk2HeaderInlineActionsCellDirective;
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
    expect(directive['baseCSSClass']).toBe('uk2-header-inline-actions-cell');
  });

  it('should add base css class when ngAfterViewInit is called', () => {
    directive.ngAfterViewInit();
    expect(directive['elementRef'].nativeElement.classList.contains(directive['baseCSSClass'])).toBeTrue();
  });

  it('should call fixHeaderCellWidth() when ngAfterViewInit is called and "inlineActionsCellElement" is found', () => {
    const tableElementMock = document.createElement('mat-table');
    const inlineActionsCellElementMock = document.createElement('mat-cell');
    inlineActionsCellElementMock.setAttribute('uk2InlineActionsCell', '');
    tableElementMock.appendChild(inlineActionsCellElementMock);
    spyOn(directive['renderer'], 'parentNode').and.returnValue(tableElementMock);
    spyOn(directive, <any>'fixHeaderCellWidth').and.callFake(() => {});
    directive.ngAfterViewInit();
    expect(directive['fixHeaderCellWidth']).toHaveBeenCalled();
    directive['onResizeUnsubscribeFn']!();
  });

  it('should not call fixHeaderCellWidth() when ngAfterViewInit is called and "inlineActionsCellElement" is not found', () => {
    const tableElementMock = document.createElement('mat-table');
    const cellElementMock = document.createElement('mat-cell');
    tableElementMock.appendChild(cellElementMock);
    spyOn(directive['renderer'], 'parentNode').and.returnValue(tableElementMock);
    spyOn(directive, <any>'fixHeaderCellWidth').and.callFake(() => {});
    directive.ngAfterViewInit();
    expect(directive['fixHeaderCellWidth']).not.toHaveBeenCalled();
  });

  it('should set width of inlineActionCellWidth to elementRef when fixHeaderCellWidth() is called', () => {
    const inlineActionsCellElementMock = document.createElement('mat-cell');
    const widthMock = 100;
    spyOnProperty(inlineActionsCellElementMock, 'offsetWidth', 'get').and.returnValue(widthMock);
    directive['fixHeaderCellWidth'](inlineActionsCellElementMock);
    expect(directive['elementRef'].nativeElement.style.width).toBe(widthMock + 'px');
    expect(directive['elementRef'].nativeElement.style.minWidth).toBe(widthMock + 'px');
    expect(directive['elementRef'].nativeElement.style.maxWidth).toBe(widthMock + 'px');
  });

  it('should call onResizeUnsubscribeFn if its defined when ngOnDestroy is called', () => {
    const onResizeUnsubscribeFnMock = () => {};
    directive['onResizeUnsubscribeFn'] = onResizeUnsubscribeFnMock;
    spyOn(directive, <never>'onResizeUnsubscribeFn');
    directive.ngOnDestroy();
    expect(directive['onResizeUnsubscribeFn']).toHaveBeenCalled();
  });
});
