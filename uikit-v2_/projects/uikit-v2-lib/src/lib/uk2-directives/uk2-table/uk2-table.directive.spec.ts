import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { MatTableModule } from '@angular/material/table';

import { Uk2TableDirective } from './uk2-table.directive';
import { Uk2TableBorderStyleEnum, Uk2TableDensityEnum, Uk2TableTextBehaviorEnum } from './enums';

describe('uk2TableDirective', () => {
  let fixture: ComponentFixture<Uk2TableTest>;
  let component: Uk2TableTest;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Uk2TableTest, Uk2TableDirective],
      imports: [CommonModule, MatTableModule],
    }).compileComponents();

    fixture = TestBed.createComponent(Uk2TableTest);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should add class "uk2-table" to table element', () => {
    const uk2TableEl = fixture.debugElement.query(By.css('.uk2-table')).nativeElement;

    expect(uk2TableEl).not.toBeNull();
  });

  it('should control table borders changing input [uk2TableBorderType]', () => {
    const uk2TableEl = fixture.debugElement.query(By.css('.uk2-table')).nativeElement as HTMLElement;
    expect(uk2TableEl.classList.contains('uk2-no-borders')).toBeTrue();

    component.changeTo8PxBorder();
    fixture.detectChanges();
    expect(uk2TableEl.classList.contains('uk2-8px-borders')).toBeTrue();

    component.changeTo16PxBorder();
    fixture.detectChanges();
    expect(uk2TableEl.classList.contains('uk2-16px-borders')).toBeTrue();
  });

  it('should change the density of the table changing input [uk2TableDensity]', () => {
    const uk2TableEl = fixture.debugElement.query(By.css('.uk2-table')).nativeElement as HTMLElement;
    expect(uk2TableEl.classList.contains('uk2-table-small')).toBeTrue();

    component.changeToMedium();
    fixture.detectChanges();
    expect(uk2TableEl.classList.contains('uk2-table-medium')).toBeTrue();

    component.changeToLarge();
    fixture.detectChanges();
    expect(uk2TableEl.classList.contains('uk2-table-large')).toBeTrue();
  });

  it('should add class "uk2-table-loading" when [uk2IsLoading] is true', () => {
    const uk2TableEl = fixture.debugElement.query(By.css('.uk2-table')).nativeElement as HTMLElement;
    expect(uk2TableEl.classList.contains('uk2-table-loading')).toBeFalse();

    component.changeLoadingTrue();
    fixture.detectChanges();
    expect(uk2TableEl.classList.contains('uk2-table-loading')).toBeTrue();

    component.changeLoadingFalse();
    fixture.detectChanges();
    expect(uk2TableEl.classList.contains('uk2-table-loading')).toBeFalse();
  });

  it('should change the text behavior of the table changing input [uk2TextBehavior]', () => {
    const uk2TableEl = fixture.debugElement.query(By.css('.uk2-table')).nativeElement as HTMLElement;
    expect(uk2TableEl.classList.contains('uk2-table-text-behavior-wrap')).toBeTrue();

    component.changeTableTextBehaviorTruncate();
    fixture.detectChanges();
    expect(uk2TableEl.classList.contains('uk2-table-text-behavior-truncate')).toBeTrue();

    component.changeTableTextBehaviorWrap();
    fixture.detectChanges();
    expect(uk2TableEl.classList.contains('uk2-table-text-behavior-wrap')).toBeTrue();
  });
});

@Component({
  selector: 'uk2-table-test',
  template: `
    <mat-table
      uk2Table
      [uk2TableBorderType]="tableBorderStyle"
      [uk2TableDensity]="tableDensity"
      [uk2IsLoading]="tableLoading"
      [uk2TextBehavior]="tableTextBehavior"
      [dataSource]="dataSource"
    >
      <ng-container matColumnDef="position">
        <mat-header-cell *matHeaderCellDef> No. </mat-header-cell>
        <mat-cell *matCellDef="let element"> {{ element.position }} </mat-cell>
      </ng-container>
      <ng-container matColumnDef="name">
        <mat-header-cell *matHeaderCellDef> Name </mat-header-cell>
        <mat-cell *matCellDef="let element"> {{ element.name }} </mat-cell>
      </ng-container>
      <ng-container matColumnDef="weight">
        <mat-header-cell *matHeaderCellDef> Weight </mat-header-cell>
        <mat-cell *matCellDef="let element"> {{ element.weight }} </mat-cell>
      </ng-container>
      <ng-container matColumnDef="symbol">
        <mat-header-cell *matHeaderCellDef> Symbol </mat-header-cell>
        <mat-cell *matCellDef="let element"> {{ element.symbol }} </mat-cell>
      </ng-container>
      <mat-header-row *matHeaderRowDef="displayedColumns"></mat-header-row>
      <mat-row *matRowDef="let row; columns: displayedColumns"></mat-row>
    </mat-table>
  `,
})
class Uk2TableTest {
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = [
    { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
    { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
    { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
    { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
    { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
    { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
    { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
    { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
    { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
    { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
  ];
  tableBorderStyle: Uk2TableBorderStyleEnum = Uk2TableBorderStyleEnum.none;
  tableDensity: Uk2TableDensityEnum = Uk2TableDensityEnum.small;
  tableLoading = false;
  tableTextBehavior: Uk2TableTextBehaviorEnum = Uk2TableTextBehaviorEnum.wrap;

  changeTo8PxBorder() {
    this.tableBorderStyle = Uk2TableBorderStyleEnum.borderRadius8;
  }

  changeTo16PxBorder() {
    this.tableBorderStyle = Uk2TableBorderStyleEnum.borderRadius16;
  }

  changeToMedium() {
    this.tableDensity = Uk2TableDensityEnum.medium;
  }

  changeToLarge() {
    this.tableDensity = Uk2TableDensityEnum.large;
  }

  changeLoadingTrue() {
    this.tableLoading = true;
  }

  changeLoadingFalse() {
    this.tableLoading = false;
  }

  changeTableTextBehaviorWrap() {
    this.tableTextBehavior = Uk2TableTextBehaviorEnum.wrap;
  }

  changeTableTextBehaviorTruncate() {
    this.tableTextBehavior = Uk2TableTextBehaviorEnum.truncate;
  }
}
