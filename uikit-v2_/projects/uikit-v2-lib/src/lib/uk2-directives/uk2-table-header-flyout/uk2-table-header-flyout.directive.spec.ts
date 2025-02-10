import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Uk2TableHeaderFlyoutDirective } from './uk2-table-header-flyout.directive';
import { By } from '@angular/platform-browser';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Uk2FlyoutMenuDirective, Uk2FlyoutMenuXPosition } from '../uk2-flyout-menu';
import { Subject } from 'rxjs';
import { uk2TableHeaderFlyoutConstant } from './constants';

@Component({
  template: ` <mat-table uk2Table [dataSource]="tableSourceData">
    <ng-container matColumnDef="columnA" sticky>
      <mat-header-cell
        id="headerCellElement"
        uk2TableHeaderFlyout
        uk2FlyoutMenu
        [uk2DisableFlyoutPositionOverride]="disablePosOverride"
        [uk2DisableFlyoutClassOverride]="disableClassOverride"
        [uk2DisableOpeningFlyout]="disableFlyoutOpen"
        *matHeaderCellDef
      >
        Column Text
      </mat-header-cell>
      <mat-cell *matCellDef="let cell">{{ cell.columnA }} </mat-cell>
    </ng-container>
    <mat-header-row *matHeaderRowDef="displayedColumns"></mat-header-row>
  </mat-table>`,
})
class TestComponent {
  disableFlyoutOpen = false;
  disablePosOverride = false;
  disableClassOverride = false;

  displayedColumns: string[] = ['columnA'];
  tableData: any[] = [];
  tableSourceData = new MatTableDataSource<any>(this.tableData);
}
describe('Uk2TableHeaderFlyoutDirective', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;
  let directive: Uk2TableHeaderFlyoutDirective;
  let mockFlyoutDirective: jasmine.SpyObj<Uk2FlyoutMenuDirective>;
  let mockOverlayClosed$: Subject<void>;

  beforeEach(async () => {
    mockOverlayClosed$ = new Subject();
    mockFlyoutDirective = jasmine.createSpyObj('Uk2FlyoutMenuDirective', ['open'], {
      uk2OverlayClosed: mockOverlayClosed$,
    });

    await TestBed.configureTestingModule({
      declarations: [TestComponent, Uk2TableHeaderFlyoutDirective],
      imports: [MatTableModule],
      providers: [{ provide: Uk2FlyoutMenuDirective, useValue: mockFlyoutDirective }],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
  });

  beforeEach(() => {
    component.disableFlyoutOpen = true;
    component.disablePosOverride = true;
    component.disableClassOverride = true;
    fixture.detectChanges();

    const directiveEl = fixture.debugElement.query(By.directive(Uk2TableHeaderFlyoutDirective));
    directive = directiveEl.injector.get(Uk2TableHeaderFlyoutDirective);
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should be created', () => {
    expect(directive).toBeTruthy();
  });

  it('should add the class uk2-table-header-flyout-cell to the header cell element', () => {
    const headerCell = fixture.debugElement.query(By.css('#headerCellElement')).nativeElement;

    fixture.detectChanges();

    expect(headerCell.classList).toContain('uk2-table-header-flyout-cell');
  });

  it('should override the flyout menu position configuration if uk2DisableFlyoutPositionOverride is false', () => {
    mockFlyoutDirective.uk2OriginXPosition = Uk2FlyoutMenuXPosition.end;
    mockFlyoutDirective.uk2OverlayXPosition = Uk2FlyoutMenuXPosition.end;
    mockFlyoutDirective.uk2OverlayYOffset = 4;
    component.disablePosOverride = false;
    fixture.detectChanges();

    directive.ngOnInit();

    expect(mockFlyoutDirective.uk2OriginXPosition).toEqual(Uk2FlyoutMenuXPosition.start);
    expect(mockFlyoutDirective.uk2OverlayXPosition).toEqual(Uk2FlyoutMenuXPosition.start);
    expect(mockFlyoutDirective.uk2OverlayYOffset).toEqual(2);
  });

  it('should not override the flyout menu position configuration if uk2DisableFlyoutPositionOverride is true', () => {
    mockFlyoutDirective.uk2OriginXPosition = Uk2FlyoutMenuXPosition.end;
    mockFlyoutDirective.uk2OverlayXPosition = Uk2FlyoutMenuXPosition.end;
    mockFlyoutDirective.uk2OverlayYOffset = 4;
    component.disablePosOverride = true;
    fixture.detectChanges();

    directive.ngOnInit();

    expect(mockFlyoutDirective.uk2OriginXPosition).not.toEqual(Uk2FlyoutMenuXPosition.start);
    expect(mockFlyoutDirective.uk2OverlayXPosition).not.toEqual(Uk2FlyoutMenuXPosition.start);
    expect(mockFlyoutDirective.uk2OverlayYOffset).not.toEqual(2);
  });

  it('should override the flyout menu container class if uk2DisableFlyoutClassOverride is false', () => {
    mockFlyoutDirective.uk2OverlayPanelClass = '';
    component.disableClassOverride = false;
    fixture.detectChanges();

    directive.ngOnInit();
    expect(mockFlyoutDirective.uk2OverlayPanelClass).toEqual('uk2-header-flyout-menu');
  });

  it('should not override the flyout menu container class if uk2DisableFlyoutClassOverride is true', () => {
    mockFlyoutDirective.uk2OverlayPanelClass = '';
    component.disableClassOverride = true;
    fixture.detectChanges();

    directive.ngOnInit();

    expect(mockFlyoutDirective.uk2OverlayPanelClass).not.toEqual('uk2-header-flyout-menu');
  });

  it('it should emit uk2HeaderCellWasClicked when a left click is triggered on the header cell', () => {
    const emitSpy = spyOn(directive.uk2HeaderCellWasClicked, 'emit');
    const headerCell = fixture.debugElement.query(By.css('#headerCellElement')).nativeElement;
    const clickEvent = new Event('click');

    headerCell.dispatchEvent(clickEvent);

    expect(emitSpy).toHaveBeenCalled();
  });

  it('it should emit uk2HeaderCellWasClicked when a right click is triggered on the header cell', () => {
    const emitSpy = spyOn(directive.uk2HeaderCellWasClicked, 'emit');
    const headerCell = fixture.debugElement.query(By.css('#headerCellElement')).nativeElement;
    const clickEvent = new Event('contextmenu');

    headerCell.dispatchEvent(clickEvent);

    expect(emitSpy).toHaveBeenCalled();
  });

  it('should open a flyout menu and add uk2-table-header-cell-active class when either click even is triggered on the header cell', () => {
    const headerCell = fixture.debugElement.query(By.css('#headerCellElement')).nativeElement;
    const clickEvent = new Event('click');
    component.disableFlyoutOpen = false;
    fixture.detectChanges();

    headerCell.dispatchEvent(clickEvent);
    fixture.detectChanges();

    expect(headerCell.classList).toContain('uk2-table-header-cell-active');
    expect(mockFlyoutDirective.open).toHaveBeenCalled();
  });

  it('should remove uk2-table-header-cell-active if the flyout overlay is closed', () => {
    const headerCell = fixture.debugElement.query(By.css('#headerCellElement')).nativeElement;
    headerCell.classList.add('uk2-table-header-cell-active');

    mockOverlayClosed$.next();
    fixture.detectChanges();

    expect(headerCell.classList).not.toContain('uk2-table-header-cell-active');
  });
});

describe('Uk2TableHeaderFlyoutDirective - Errors', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TestComponent, Uk2TableHeaderFlyoutDirective],
      imports: [MatTableModule],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should throw an error if Uk2FlyoutMenuDirective is not imported correctly', () => {
    expect(() => {
      fixture.detectChanges();
    }).toThrowError(uk2TableHeaderFlyoutConstant.errorMessages.undefinedFlyoutDirective);
  });
});
