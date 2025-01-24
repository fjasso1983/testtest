import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { Uk2TableColumnResizeDirective } from './uk2-table-column-resize.directive';
import { Uk2TableDirectiveModule } from '@axos/uikit-v2-lib';
import { CommonModule, DOCUMENT } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { By } from '@angular/platform-browser';

@Component({
  template: ` <mat-table id="tableElement" uk2Table [dataSource]="tableSourceData">
    <ng-container matColumnDef="firstColumn">
      <mat-header-cell
        id="firstColumnResize"
        uk2TableColumnResize
        [uk2ColumnWidth]="columnWidth"
        [uk2DisableResize]="disableColumn"
        *matHeaderCellDef
      >
        Column Text
      </mat-header-cell>
      <mat-cell *matCellDef="let cell">
        <div id="contentCell">{{ cell.firstColumn }}</div>
      </mat-cell>
    </ng-container>
    <ng-container matColumnDef="secondColumn">
      <mat-header-cell uk2TableColumnResize *matHeaderCellDef> Column Text </mat-header-cell>
      <mat-cell *matCellDef="let cell"> {{ cell.secondColumn }} </mat-cell>
    </ng-container>
    <ng-container matColumnDef="lastColumn">
      <mat-header-cell id="lastColumnResize" uk2TableColumnResize *matHeaderCellDef> Column Text </mat-header-cell>
      <mat-cell *matCellDef="let cell"> {{ cell.lastColumn }} </mat-cell>
    </ng-container>
    <mat-header-row *matHeaderRowDef="displayedColumns"></mat-header-row>
    <mat-row *matRowDef="let row; columns: displayedColumns"></mat-row>
  </mat-table>`,
  styles: [
    `
      mat-cell {
        padding: 0 !important;
      }

      /*350px size */
      .long-column-styles {
        width: 300px !important;
        padding: 0 25px !important;
      }
    `,
  ],
})
class TestComponent {
  columnWidth: string | undefined = undefined;
  disableColumn = false;
  displayedColumns: string[] = ['firstColumn', 'secondColumn', 'lastColumn'];
  tableSourceData = [
    {
      firstColumn: 'lorem ipsum',
      secondColumn: 'lorem ipsum',
      lastColumn: 'lorem ipsum',
    },
  ];
}
describe('Uk2TableColumnResizeDirective', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;
  let documentMock: Document;

  beforeEach(async () => {
    documentMock = document;

    await TestBed.configureTestingModule({
      declarations: [TestComponent, Uk2TableColumnResizeDirective],
      imports: [Uk2TableDirectiveModule, MatTableModule, CommonModule],
      providers: [{ provide: DOCUMENT, useValue: documentMock }],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('it should be created', () => {
    const directiveEl = fixture.debugElement.query(By.directive(Uk2TableColumnResizeDirective));
    const directive = directiveEl.injector.get(Uk2TableColumnResizeDirective);

    expect(directive).toBeTruthy();
  });

  it('should create a grabber element', () => {
    const grabberElement = fixture.debugElement.query(By.css('.uk2-table-header-grabber')).nativeElement;

    expect(grabberElement).toBeTruthy();
  });

  it('should apply horizontal scrolling styles to the parent table', () => {
    const parentTable = fixture.debugElement.query(By.css('#tableElement')).nativeElement;

    expect(parentTable.style.overflowX).toBe('auto');
  });

  it('should apply display block to the grabber when uk2DisableResize is set to false', () => {
    const grabberElement = fixture.debugElement.query(By.css('.uk2-table-header-grabber')).nativeElement;
    component.disableColumn = false;

    fixture.detectChanges();

    expect(grabberElement.style.display).toBe('block');
  });

  it('should apply display block none to the grabber when uk2DisableResize is set to true', () => {
    const grabberElement = fixture.debugElement.query(By.css('.uk2-table-header-grabber')).nativeElement;
    component.disableColumn = true;

    fixture.detectChanges();

    expect(grabberElement.style.display).toBe('none');
  });

  it('should resize the column cells when uk2ColumnWidth is set', () => {
    const directiveEl = fixture.debugElement.query(By.directive(Uk2TableColumnResizeDirective));
    const headerCell = directiveEl.nativeElement;

    component.columnWidth = '150px';
    fixture.detectChanges();

    expect(headerCell.style['min-width']).toEqual('150px');
    expect(headerCell.style['width']).toEqual('150px');
  });

  it("should set the flex style on each cell and header as '0 0 auto' if the column is not the last on the table", () => {
    const tableElement = fixture.debugElement.query(By.css('#tableElement')).nativeElement;
    const headerRow = tableElement.querySelectorAll('mat-header-row');
    const headerCell = headerRow[0].querySelectorAll('mat-header-cell')[0];
    const contentRow = tableElement.querySelectorAll('mat-row');
    const contentCell = contentRow[0].querySelectorAll('mat-cell')[0];

    expect(headerCell.style.flex).toBe('0 0 auto');
    expect(contentCell.style.flex).toBe('0 0 auto');
  });

  it("should not set the flex style on each cell and header as '0 0 auto' if the column is the last on the table", () => {
    const tableElement = fixture.debugElement.query(By.css('#tableElement')).nativeElement;
    const headerRow = tableElement.querySelectorAll('mat-header-row');
    const headerCell = headerRow[0].querySelectorAll('mat-header-cell')[2];
    const contentRow = tableElement.querySelectorAll('mat-row');
    const contentCell = contentRow[0].querySelectorAll('mat-cell')[2];

    expect(headerCell.style.flex).not.toBe('0 0 auto');
    expect(contentCell.style.flex).not.toBe('0 0 auto');
  });

  it('should apply the correct cursor styles when the mouse is lifted after dragging the size', () => {
    const grabberElement = fixture.debugElement.query(By.css('.uk2-table-header-grabber')).nativeElement;
    const event = new MouseEvent('mousedown', { clientX: 100 });

    grabberElement.dispatchEvent(event);

    expect(documentMock.body.style.cursor).toEqual('col-resize');
    expect(documentMock.body.style.userSelect).toEqual('none');
  });

  it('should resize the column cells when the mouse clicks and drags over the grabber and emit the size when finished', () => {
    const directiveEl = fixture.debugElement.query(By.directive(Uk2TableColumnResizeDirective));
    const directive = directiveEl.injector.get(Uk2TableColumnResizeDirective);
    const resizeSpy = spyOn(directive.uk2ColumnWasResized, 'emit');
    component.columnWidth = '100px';
    fixture.detectChanges();

    const headerCell = directiveEl.nativeElement;
    const grabberElement = fixture.debugElement.query(By.css('.uk2-table-header-grabber')).nativeElement;

    const mouseDownEvent = new MouseEvent('mousedown', { clientX: 100 });
    const mouseMoveEvent = new MouseEvent('mousemove', { clientX: 150 });
    const mouseUpEvent = new MouseEvent('mouseup');

    grabberElement.dispatchEvent(mouseDownEvent);
    document.dispatchEvent(mouseMoveEvent);
    document.dispatchEvent(mouseUpEvent);
    fixture.detectChanges();

    expect(headerCell.style.width).toBe('150px');
    expect(resizeSpy).toHaveBeenCalledWith('150px');
  });

  it('should resize a column to its widest content element when the mouse double clicks the grabber', () => {
    const directiveEl = fixture.debugElement.query(By.directive(Uk2TableColumnResizeDirective));
    const grabberElement = fixture.debugElement.query(By.css('.uk2-table-header-grabber')).nativeElement;
    const contentCell: HTMLElement = fixture.debugElement.query(By.css('#contentCell')).nativeElement;
    const headerCell = directiveEl.nativeElement;
    contentCell.classList.add('long-column-styles');
    fixture.detectChanges();

    const mouseDoubleClickEvent = new MouseEvent('dblclick');
    grabberElement.dispatchEvent(mouseDoubleClickEvent);
    fixture.detectChanges();

    expect(headerCell.style.width).toBe('350px');
    expect(headerCell.style['min-width']).toBe('350px');
  });

  it('should call to destroy all listeners when the element is destroyed', () => {
    const directiveEl = fixture.debugElement.query(By.directive(Uk2TableColumnResizeDirective));
    const directive = directiveEl.injector.get(Uk2TableColumnResizeDirective);
    directive['mouseDownListener'] = jasmine.createSpy();
    directive['dblClickListener'] = jasmine.createSpy();
    directive['mouseUpListener'] = jasmine.createSpy();
    directive['mouseMoveListener'] = jasmine.createSpy();

    fixture.destroy();

    expect(directive['mouseDownListener']).toHaveBeenCalled();
    expect(directive['dblClickListener']).toHaveBeenCalled();
    expect(directive['mouseUpListener']).toHaveBeenCalled();
    expect(directive['mouseMoveListener']).toHaveBeenCalled();
  });

  it('should return the correct offset width of a column', () => {
    const directiveEl = fixture.debugElement.query(By.directive(Uk2TableColumnResizeDirective));
    const directive = directiveEl.injector.get(Uk2TableColumnResizeDirective);
    component.columnWidth = '150px';
    fixture.detectChanges();

    expect(directive['columnOffsetWidth']).toBe(150);
  });
});
