import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Uk2HeaderFillColumnDirective } from './uk2-column-fill.directive';
import { MatTableModule } from '@angular/material/table';
import { By } from '@angular/platform-browser';

@Component({
  template: `
    <mat-table [dataSource]="dataSource">
      <ng-container matColumnDef="columnA">
        <mat-header-cell *matHeaderCellDef uk2HeaderFillColumn> Column A </mat-header-cell>
        <mat-cell *matCellDef="let element"> {{ element.columnA }} </mat-cell>
      </ng-container>

      <mat-header-row *matHeaderRowDef="displayedColumns"></mat-header-row>
      <mat-row *matRowDef="let row; columns: displayedColumns"></mat-row>
    </mat-table>
  `,
})
class TestComponent {
  displayedColumns: string[] = ['columnA'];
  dataSource = [{ columnA: 'Data A' }];
}

describe('Uk2HeaderFillColumnDirective', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;
  let directive: Uk2HeaderFillColumnDirective;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TestComponent, Uk2HeaderFillColumnDirective],
      imports: [MatTableModule],
    }).compileComponents();

    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    const directiveEl = fixture.debugElement.query(By.directive(Uk2HeaderFillColumnDirective));
    directive = directiveEl.injector.get(Uk2HeaderFillColumnDirective);
  });

  it('should be created', () => {
    expect(directive).toBeTruthy();
  });

  it('should add uk2-header-fill-column class to all the column cells', () => {
    const headerCell = fixture.nativeElement.querySelector('mat-header-cell');

    expect(headerCell.classList).toContain('uk2-header-fill-column');
  });
});
