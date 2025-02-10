import { Component, DebugElement, EventEmitter, Renderer2, SimpleChange, SimpleChanges } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Uk2TableSortingDirective } from '../uk2-table-sorting.directive';
import { Uk2TableHeaderSortingDirective } from './uk2-table-header-sorting.directive';

@Component({
  template: `
    <mat-table uk2TableSorting [dataSource]="dataSource">
      <ng-container matColumnDef="testColumn">
        <mat-header-cell *matHeaderCellDef uk2TableHeaderSorting="testColumn"></mat-header-cell>
        <mat-cell *matCellDef="let element"> {{ element.testColumn }} </mat-cell>
      </ng-container>

      <mat-header-row *matHeaderRowDef="displayedColumns"></mat-header-row>
      <mat-row *matRowDef="let row; columns: displayedColumns"></mat-row>
    </mat-table>
  `,
})
class ukTableHeaderSortingTest {
  displayedColumns: string[] = ['testColumn'];
  dataSource = [{ testColumn: 'Test Data' }];
}

describe('Uk2TableHeaderSortingDirective', () => {
  let fixture: ComponentFixture<ukTableHeaderSortingTest>;
  let directiveEl: DebugElement;
  let component: Uk2TableHeaderSortingDirective;

  let uk2TableSortMock: jasmine.SpyObj<Uk2TableSortingDirective>;

  beforeEach(() => {
    uk2TableSortMock = jasmine.createSpyObj(
      'Uk2TableSortingDirective',
      ['uk2InitSortFirstColumnEmit', 'uk2DisableTableSortingChange', 'uk2InitSortFirstColumnEmit'],
      {
        uk2InitSortFirstColumnEmit: new EventEmitter<boolean>(),
        uk2DisableTableSortingChange: new EventEmitter<boolean>(),
        sortables: new Map(),
        active: '',
        direction: 'asc',
      }
    );

    TestBed.configureTestingModule({
      declarations: [ukTableHeaderSortingTest, Uk2TableHeaderSortingDirective],
      imports: [MatTableModule, MatSortModule, NoopAnimationsModule],
      providers: [Renderer2, { provide: Uk2TableSortingDirective, useValue: uk2TableSortMock }],
    }).compileComponents();

    fixture = TestBed.createComponent(ukTableHeaderSortingTest);
    fixture.detectChanges();
    directiveEl = fixture.debugElement.query(By.directive(Uk2TableHeaderSortingDirective));
    component = directiveEl.injector.get(Uk2TableHeaderSortingDirective);
  });

  it('should create an instance', () => {
    expect(component).toBeTruthy();
  });

  it('should have uk2DisableSorting default to false', () => {
    expect(component.uk2DisableSorting).toBe(false);
  });

  it('should disable sorting when uk2DisableSorting is set to true', () => {
    component.uk2DisableSorting = true;
    fixture.detectChanges();
    expect(component.uk2DisableSorting).toBe(true);
  });

  it('should enable sorting when uk2DisableSorting is set to false', () => {
    component.uk2DisableSorting = false;
    fixture.detectChanges();
    expect(component.uk2DisableSorting).toBe(false);
  });

  it('should call removeUk2SortingButton when uk2DisableSorting is true', () => {
    const changes: SimpleChanges = {
      uk2DisableSorting: new SimpleChange(null, true, false),
    };

    testDisableSorting(component, changes);
  });

  it('should call createUk2SortingButton when uk2DisableSorting is false', () => {
    const changes: SimpleChanges = {
      uk2DisableSorting: new SimpleChange(null, false, false),
    };

    testEnableSorting(component, changes);
  });

  it('should call emitSortChange when Uk2TableSortingDirective emits init sort first column ', () => {
    component.ngAfterViewInit();
    spyOn(component as any, 'emitSortChange').and.callThrough();
    uk2TableSortMock.uk2InitSortFirstColumnEmit.emit(true);

    expect((component as any).emitSortChange).toHaveBeenCalled();
  });

  it('should call emitSortOption when the button is clicked', () => {
    spyOn(component as any, 'emitSortOption');
    spyOn(component as any, 'createUk2SortingButton').and.callThrough();
    const button = fixture.elementRef.nativeElement.querySelector('.uk2-sort-table-header-button');
    button.click();

    expect((component as any).uk2TableSort.direction).toEqual('asc');
  });

  it('should call removeUk2SortingButton when uk2DisableTableSortingChange emits true', () => {
    emitTableSortingChange(component, uk2TableSortMock, 'removeUk2SortingButton', true);

    expect((component as any).removeUk2SortingButton).toHaveBeenCalled();
  });

  it('should call createUk2SortingButton when uk2DisableTableSortingChange emits false', () => {
    emitTableSortingChange(component, uk2TableSortMock, 'createUk2SortingButton', false);

    expect((component as any).createUk2SortingButton).toHaveBeenCalled();
  });
});

function testDisableSorting(component: Uk2TableHeaderSortingDirective, changes: SimpleChanges) {
  spyOn(component as any, 'removeUk2SortingButton').and.callThrough();
  component.ngOnChanges(changes);

  expect((component as any).removeUk2SortingButton).toHaveBeenCalled();
  expect((component as any).sortingButton).toBeNull();
}

function testEnableSorting(component: Uk2TableHeaderSortingDirective, changes: SimpleChanges) {
  spyOn(component as any, 'createUk2SortingButton').and.callThrough();
  component.ngOnChanges(changes);

  expect((component as any).createUk2SortingButton).toHaveBeenCalled();
  expect((component as any).sortingButton).not.toBeNull();
}

function emitTableSortingChange(
  component: Uk2TableHeaderSortingDirective,
  uk2TableSortMock: jasmine.SpyObj<Uk2TableSortingDirective>,
  spyMethod: string,
  emitValue: boolean
) {
  component.ngAfterViewInit();
  spyOn(component as any, spyMethod).and.callThrough();
  uk2TableSortMock.uk2DisableTableSortingChange.emit(emitValue);
}
