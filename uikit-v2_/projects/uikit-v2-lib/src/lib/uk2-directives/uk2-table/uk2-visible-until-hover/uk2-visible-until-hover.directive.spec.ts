import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Uk2DirectivesModule } from '../../uk2-directives.module';
import { UK2_TABLE_ELEMENT_VISIBLE_HOVER_CSS_CLASS } from '../constants';
import { Uk2TableDirectiveModule } from '../uk2-table.module';
import { Uk2VisibleUntilHoverElementDirective } from './uk2-visible-until-hover-element.directive';
import { Uk2VisibleUntilHoverDirective } from './uk2-visible-until-hover.directive';

describe('Uk2VisibleUntilHoverDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let component: TestComponent;
  let directive: Uk2VisibleUntilHoverDirective;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TestComponent, Uk2VisibleUntilHoverDirective, Uk2VisibleUntilHoverElementDirective],
      imports: [MatTableModule, MatCheckboxModule, Uk2TableDirectiveModule, Uk2DirectivesModule, MatButtonModule],
    }).compileComponents();

    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    directive = component.directive;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(directive).toBeTruthy();
  });

  it('should sync with inner checkbox', () => {
    const checkbox = fixture.nativeElement.querySelector('input[type="checkbox"]') as HTMLInputElement;
    expect(checkbox.checked).toBeFalse();
    checkbox.click();
    expect(checkbox.checked).toBeTrue();
    checkbox.click();
    expect(checkbox.checked).toBeFalse();
  });

  it('should sync with hover', () => {
    const matRowEl = fixture.nativeElement.querySelector('mat-row');

    expect(directive.uk2IsHovered).toBeFalse();
    matRowEl.dispatchEvent(new MouseEvent('mouseenter'));
    expect(directive.uk2IsHovered).toBeTrue();
    matRowEl.dispatchEvent(new MouseEvent('mouseleave'));
    expect(directive.uk2IsHovered).toBeFalse();
  });

  it('should show target element when hovered', () => {
    const matRowEl = fixture.nativeElement.querySelector('mat-row');
    const targetEl = fixture.nativeElement.querySelector(`.${UK2_TABLE_ELEMENT_VISIBLE_HOVER_CSS_CLASS}`);
    const checkbox = fixture.nativeElement.querySelector('input[type="checkbox"]') as HTMLInputElement;

    checkbox.click();
    matRowEl.dispatchEvent(new MouseEvent('mouseenter'));

    expect(targetEl.classList.contains('uk2-visible')).toBeTrue();
    matRowEl.dispatchEvent(new MouseEvent('mouseleave'));
    expect(targetEl.classList.contains('uk2-hidden')).toBeTrue();
  });

  it('should not throw error if target element is not found', () => {
    spyOn(directive['nativeElement'], 'querySelector').and.returnValue(null);
    const matRowEl = fixture.nativeElement.querySelector('mat-row');
    const checkbox = fixture.nativeElement.querySelector('input[type="checkbox"]') as HTMLInputElement;

    checkbox.click();
    matRowEl.dispatchEvent(new MouseEvent('mouseenter'));
    expect(() => matRowEl.dispatchEvent(new MouseEvent('mouseleave'))).not.toThrow();
  });
});

@Component({
  template: `
    <mat-table uk2Table [dataSource]="dataSource">
      <ng-container matColumnDef="checkbox" sticky>
        <mat-header-cell class="uk2-checkbox-column" *matHeaderCellDef> </mat-header-cell>
        <mat-cell class="uk2-checkbox-column" *matCellDef="let element">
          <mat-checkbox uk2Checkbox disableRipple [checked]="isRowSelected"></mat-checkbox>
        </mat-cell>
      </ng-container>
      <ng-container matColumnDef="propertyA">
        <mat-header-cell *matHeaderCellDef> Property A </mat-header-cell>
        <mat-cell *matCellDef="let element">
          <div class="target-cell">
            <span>{{ element.propertyA }}</span>
            <button uk2PrimaryButton disableRipple mat-raised-button uk2VisibleUntilHoverElement>Open</button>
          </div>
        </mat-cell>
      </ng-container>
      <mat-header-row *matHeaderRowDef="displayedColumns"></mat-header-row>
      <mat-row *matRowDef="let row; columns: displayedColumns" uk2VisibleUntilHover></mat-row>
    </mat-table>
  `,
})
class TestComponent {
  @ViewChild(Uk2VisibleUntilHoverDirective) directive!: Uk2VisibleUntilHoverDirective;
  isRowSelected = false;
  displayedColumns: string[] = ['checkbox', 'propertyA'];
  tableData: any[] = [
    { record: 1, propertyA: 'Lorem ' },
    { record: 2, propertyA: 'Lorem ' },
  ];
  dataSource = new MatTableDataSource<any>(this.tableData);
}
