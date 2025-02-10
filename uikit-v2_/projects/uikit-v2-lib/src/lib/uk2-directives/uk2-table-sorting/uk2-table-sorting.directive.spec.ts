import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { Uk2TableSortingDirective } from './uk2-table-sorting.directive';
import { MatSort } from '@angular/material/sort';
import { By } from '@angular/platform-browser';

@Component({
  template: `<mat-table
    uk2TableSorting
    [uk2DisableTableSorting]="disableSorting"
    [uk2InitSortFirstColumn]="initSortFirstColumn"
  ></mat-table>`,
})
class Uk2TableSortingTest {
  disableSorting = false;
  initSortFirstColumn = true;
}

describe('Uk2TableSortingDirective', () => {
  let component: Uk2TableSortingTest;
  let fixture: ComponentFixture<Uk2TableSortingTest>;
  let directive: Uk2TableSortingDirective;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Uk2TableSortingTest, Uk2TableSortingDirective],
      providers: [{ provide: MatSort, useValue: {} }],
    });
    fixture = TestBed.createComponent(Uk2TableSortingTest);
    component = fixture.componentInstance;
    directive = fixture.debugElement
      .query(By.directive(Uk2TableSortingDirective))
      .injector.get(Uk2TableSortingDirective);
    fixture.detectChanges();
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });

  it('should emit uk2DisableTableSortingChange on initialization', () => {
    spyOn(directive.uk2DisableTableSortingChange, 'emit');
    directive.ngAfterViewInit();
    expect(directive.uk2DisableTableSortingChange.emit).toHaveBeenCalledWith(component.disableSorting);
  });

  it('should emit uk2InitSortFirstColumnEmit on initialization', () => {
    spyOn(directive.uk2InitSortFirstColumnEmit, 'emit');
    directive.ngAfterViewInit();
    expect(directive.uk2InitSortFirstColumnEmit.emit).toHaveBeenCalledWith(component.initSortFirstColumn);
  });

  it('should emit uk2DisableTableSortingChange on input change', () => {
    spyOn(directive.uk2DisableTableSortingChange, 'emit');
    component.disableSorting = true;
    fixture.detectChanges();
    directive.ngOnChanges();
    expect(directive.uk2DisableTableSortingChange.emit).toHaveBeenCalledWith(true);
  });

  it('should not emit uk2DisableTableSortingChange if value does not change', () => {
    spyOn(directive.uk2DisableTableSortingChange, 'emit');
    directive.ngOnChanges();
    expect(directive.uk2DisableTableSortingChange.emit).not.toHaveBeenCalled();
  });
});
