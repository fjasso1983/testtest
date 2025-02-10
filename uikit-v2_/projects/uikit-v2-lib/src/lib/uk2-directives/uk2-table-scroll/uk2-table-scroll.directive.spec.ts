import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Uk2TableScrollDirective } from './uk2-table-scroll.directive';
import { MockIntersectionObserver, MockResizeObserver } from './tests';
import { By } from '@angular/platform-browser';

@Component({
  template: `
    <div id="parent-container-element">
      <div id="container-element">
        <div class="empty-space"></div>
        <mat-table
          id="tableElement"
          uk2Table
          uk2TableScroll
          [uk2MarginBelowViewport]="marginBelowViewport"
          [uk2TableViewport]="tableViewport"
          [dataSource]="tableSourceData"
        >
          <ng-container matColumnDef="columnA" sticky>
            <mat-header-cell *matHeaderCellDef class="sticky-cell-width"> Column Text </mat-header-cell>
            <mat-cell *matCellDef="let cell" class="sticky-cell-width">{{ cell.columnA }} </mat-cell>
          </ng-container>
          <ng-container matColumnDef="columnB">
            <mat-header-cell *matHeaderCellDef class="long-cell"> Column Text </mat-header-cell>
            <mat-cell *matCellDef="let cell" class="long-cell"> {{ cell.columnB }} </mat-cell>
          </ng-container>
          <ng-container matColumnDef="columnC">
            <mat-header-cell *matHeaderCellDef class="long-cell"> Column Text </mat-header-cell>
            <mat-cell *matCellDef="let cell" class="long-cell"> {{ cell.columnC }} </mat-cell>
          </ng-container>
          <ng-container matColumnDef="columnD">
            <mat-header-cell *matHeaderCellDef class="long-cell"> Column Text </mat-header-cell>
            <mat-cell *matCellDef="let cell" class="long-cell"> {{ cell.columnD }} </mat-cell>
          </ng-container>
          <ng-container matColumnDef="columnE">
            <mat-header-cell *matHeaderCellDef class="long-cell"> Column Text </mat-header-cell>
            <mat-cell *matCellDef="let cell" class="long-cell"> {{ cell.columnE }} </mat-cell>
          </ng-container>
          <ng-container matColumnDef="columnF">
            <mat-header-cell *matHeaderCellDef class="long-cell"> Column Text </mat-header-cell>
            <mat-cell *matCellDef="let cell" class="long-cell"> {{ cell.columnF }} </mat-cell>
          </ng-container>
          <ng-container matColumnDef="columnG">
            <mat-header-cell *matHeaderCellDef class="long-cell"> Column Text </mat-header-cell>
            <mat-cell *matCellDef="let cell" class="long-cell"> {{ cell.columnG }} </mat-cell>
          </ng-container>
          <mat-header-row *matHeaderRowDef="displayedColumns" uk2-sticky-row></mat-header-row>
          <mat-row *matRowDef="let row; columns: displayedColumns"></mat-row>
        </mat-table>
        <div class="empty-space"></div>
      </div>
    </div>
  `,
  styles: [
    `
      mat-cell {
        padding: 0 !important;
      }

      .viewport-size {
        overflow-y: auto;
        overflow-x: hidden;
        height: 500px !important;
        width: 500px;
        box-sizing: border-box;
      }

      .sticky-cell-width {
        min-width: 250px !important;
        width: 250px !important;
      }

      .long-cell {
        min-width: 350px !important;
        width: 350px !important;
      }

      .empty-space {
        margin: 0px;
        border: 0px;
        padding: 0px;
        height: 2000px;
      }
    `,
  ],
})
class TestComponent {
  displayedColumns: string[] = ['columnA', 'columnB', 'columnC', 'columnD', 'columnE', 'columnF', 'columnG'];
  tableData: any[] = [];
  tableSourceData = new MatTableDataSource<any>(this.tableData);
  marginBelowViewport = 0;
  tableViewport: undefined | HTMLElement;

  constructor() {
    this.fillTableData();
  }

  fillTableData() {
    for (let index = 0; index < 50; index++) {
      this.tableData.push({
        columnA: 'lorem ipsum',
        columnB: 'lorem ipsum',
        columnC: 'lorem ipsum',
        columnD: 'lorem ipsum',
        columnE: 'lorem ipsum',
        columnF: 'lorem ipsum',
        columnG: 'lorem ipsum',
      });
    }
  }
}

describe('Uk2TableScrollDirective', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;
  let directive: Uk2TableScrollDirective;
  let visibleViewport: HTMLElement;
  let animationSpy: jasmine.Spy

  beforeEach(async () => {
    (window as any).IntersectionObserver = MockIntersectionObserver;
    (window as any).ResizeObserver = MockResizeObserver;
    animationSpy = spyOn(window, 'requestAnimationFrame').and.callFake(callback => {
      callback(0);
      return 0;
    });

    await TestBed.configureTestingModule({
      declarations: [TestComponent, Uk2TableScrollDirective],
      imports: [MatTableModule],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
  });

  beforeEach(async () => {
    visibleViewport = fixture.debugElement.query(By.css('#container-element')).nativeElement;
    visibleViewport.classList.add('viewport-size');
    visibleViewport.scrollTop = 0;
    component.tableViewport = undefined;

    await fixture.whenStable();
    fixture.detectChanges();

    const directiveEl = fixture.debugElement.query(By.directive(Uk2TableScrollDirective));
    directive = directiveEl.injector.get(Uk2TableScrollDirective);
  });

  //Mocks the intersection observer triggering if the component comes into view or not
  function triggerIntersection(isIntersecting: boolean) {
    const table = fixture.debugElement.query(By.css('#tableElement')).nativeElement;
    (directive['intersectionObserver'] as unknown as MockIntersectionObserver).trigger([
      { isIntersecting, target: table } as IntersectionObserverEntry,
    ]);
  }

  function triggerResize() {
    (directive['resizeObserver'] as unknown as MockIntersectionObserver).trigger([]);
  }

  afterEach(() => {
    fixture.destroy();
  });

  it('should be created', () => {
    expect(directive).toBeTruthy();
  });

  it('should automatically determine the scrollable viewport', () => {
    expect(directive['viewportElement']).toBe(visibleViewport);
  });

  it('should set the viewport defined by uk2TableViewport', () => {
    const viewport = fixture.debugElement.query(By.css('#parent-container-element')).nativeElement;
    component.tableViewport = viewport;
    fixture.detectChanges();

    directive.ngAfterViewInit();

    expect(directive['viewportElement']).toBe(viewport);
  });

  it('should add the correct style class to the table', () => {
    const table = fixture.debugElement.query(By.css('#tableElement')).nativeElement;

    expect(table.classList).toContain('uk2-table-scroll');
  });

  it('should create a horizontal scroller element on the table with the correct class', () => {
    const table = fixture.debugElement.query(By.css('#tableElement')).nativeElement;
    const horizontalScroller = table.querySelector('.uk2-table-horizontal-scroller');

    expect(horizontalScroller).toBeTruthy();
    expect(horizontalScroller.classList).toContain('uk2-scrollbar--large');
  });

  it('should create a column shadow element on the table with the correct class', () => {
    const table = fixture.debugElement.query(By.css('#tableElement')).nativeElement;
    const stickyShadow = table.querySelector('.uk2-sticky-shadow-container');

    expect(stickyShadow).toBeTruthy();
  });

  it('it should set the correct class and position to a mat-header-row element with the uk2-sticky-row attribute', () => {
    const headerRow = fixture.debugElement.query(By.css('mat-header-row[uk2-sticky-row]')).nativeElement;

    expect(headerRow).toBeTruthy();
    expect(headerRow.classList).toContain('uk2-table-sticky-row');
  });

  it('should set the mat-header-row offset height as top padding to the table', () => {
    const table = fixture.debugElement.query(By.css('#tableElement')).nativeElement;
    const headerRow = fixture.debugElement.query(By.css('mat-header-row[uk2-sticky-row]')).nativeElement;
    const headerHeight = headerRow.offsetHeight;
    const tableStyles = getComputedStyle(table);

    expect(tableStyles.paddingTop).toEqual(`${headerHeight}px`);
  });

  it('should set the column shadow element width based on the width of the angular sticky elements when a resize is triggered', () => {
    const stickyShadow = fixture.debugElement.query(By.css('.uk2-sticky-shadow-container')).nativeElement;
    const stickyShadowStyles = getComputedStyle(stickyShadow);

    triggerResize();
    fixture.detectChanges();

    expect(stickyShadowStyles.width).toEqual('250px');
  });

  it('should set the column shadow display to none if the left scroll is 0', () => {
    const table = fixture.debugElement.query(By.css('#tableElement')).nativeElement;
    const stickyShadow = fixture.debugElement.query(By.css('.uk2-sticky-shadow-container')).nativeElement;
    const stickyShadowStyles = getComputedStyle(stickyShadow);
    table.scrollLeft = 0;

    triggerResize();
    fixture.detectChanges();

    expect(stickyShadowStyles.display).toEqual('none');
  });

  it('should adjust the width of the scroller element based on the table scroll width', () => {
    const table = fixture.debugElement.query(By.css('#tableElement')).nativeElement;
    const headerRow = fixture.debugElement.query(By.css('mat-header-row[uk2-sticky-row]')).nativeElement;
    const horizontalScroller = table.querySelector('.uk2-size-scroller');
    const horizontalScrollerStyles = getComputedStyle(horizontalScroller);

    //modifies the table inner scroll width by resizing the header
    headerRow.style.width = '6000px';
    triggerResize();
    fixture.detectChanges();

    expect(horizontalScrollerStyles.width).toEqual('6000px');
  });

  it('should listen to the viewport scroll event if the table comes into view', () => {
    directive['viewportElement'] = visibleViewport;

    triggerIntersection(true);
    const event = new Event('scroll');
    visibleViewport.dispatchEvent(event);

    expect(animationSpy).toHaveBeenCalled();
  });

  it('should listen to the document scroll event if no viewport was assigned if the table comes into view', () => {
    directive['viewportElement'] = document.documentElement;

    triggerIntersection(true);
    const event = new Event('scroll');
    document.dispatchEvent(event);

    expect(animationSpy).toHaveBeenCalled();
  });


  it('should call to destroy all event listeners if the table comes out of view of the viewport', () => {
    const destroySpy = spyOn(directive['eventDestroy$'], 'next');

    triggerIntersection(false);

    expect(destroySpy).toHaveBeenCalled();
  });

  it('should adjust the header to the top position of the table when the table is not fully in view', () => {
    const headerRow = fixture.debugElement.query(By.css('mat-header-row[uk2-sticky-row]')).nativeElement;
    visibleViewport.scrollTo(0, 1800);
    triggerIntersection(true);

    directive.updateTableAndViewportSizes();
    fixture.detectChanges();

    expect(headerRow.style.top).toEqual('0px');
  });

  it('should adjust the horizontal scroller position at the bottom of the vieweport when the table is visible', () => {
    const horizontalScroller = fixture.debugElement.query(By.css('.uk2-table-horizontal-scroller')).nativeElement;
    visibleViewport.scrollTo(0, 2000);
    triggerIntersection(true);

    directive.updateTableAndViewportSizes();
    fixture.detectChanges();

    expect(horizontalScroller.style.top).toEqual('500px'); //500 is the bottom of the viewport
  });

  it('should adjust the horizontal scroller position at the bottom of the table when the viewport scroll is below the visible table', () => {
    const horizontalScroller = fixture.debugElement.query(By.css('.uk2-table-horizontal-scroller')).nativeElement;
    const tableHeight = directive['tableHeight'];
    visibleViewport.scrollTo(0, 1800 + tableHeight);
    triggerIntersection(true);

    directive.updateTableAndViewportSizes();
    fixture.detectChanges();

    expect(horizontalScroller.style.top).toEqual(`${tableHeight}px`);
  });

  it('should adjust the table dimensions to keep a margin below the viewport scroll position', () => {
    const table = fixture.debugElement.query(By.css('#tableElement')).nativeElement;
    component.marginBelowViewport = 10;
    expect(table.style.marginTop).toEqual('');
    fixture.detectChanges();

    const event = new Event('scroll');
    visibleViewport.scrollTo(0, 2000); //Scroll position at fully visible table
    triggerIntersection(true);
    visibleViewport.dispatchEvent(event);
    fixture.detectChanges();

    expect(table.style.marginTop).toEqual(`10px`);

    visibleViewport.scrollTo(0, 2100);
    triggerIntersection(true);
    visibleViewport.dispatchEvent(event);
    fixture.detectChanges();

    expect(table.style.marginTop).toEqual(`110px`);
  });

  it('should adjust the table margin as the table height when the viewport scrolls bellow the visible table position', () => {
    const table = fixture.debugElement.query(By.css('#tableElement')).nativeElement;
    expect(table.style.marginTop).toEqual('');
    const tableHeight = directive['tableHeight'];

    const event = new Event('scroll');
    visibleViewport.scrollTo(0, 5000); //Scroll below the table position
    triggerIntersection(true);
    visibleViewport.dispatchEvent(event);
    fixture.detectChanges();

    expect(table.style.marginTop).toEqual(`${tableHeight}px`);
  });

  it('should adjust the table scroll position based on the horizontal scroller scroll', () => {
    const table = fixture.debugElement.query(By.css('#tableElement')).nativeElement;
    const scrollerElement: HTMLElement = table.querySelector('.uk2-table-horizontal-scroller');

    triggerIntersection(true);
    scrollerElement.scrollLeft = 200;
    const event = new Event('scroll');
    scrollerElement.dispatchEvent(event);
    fixture.detectChanges();

    expect(table.scrollLeft).toEqual(scrollerElement.scrollLeft);
  });

  it('should adjust the sticky columns shadow element dimensions when the viewport is scrolled', () => {
    const tableHeight = directive['tableHeight'];
    visibleViewport.scrollTo(0, 100);
    triggerIntersection(true);
    triggerResize();
    directive.updateTableAndViewportSizes();
    fixture.detectChanges();

    const event = new Event('scroll');
    visibleViewport.dispatchEvent(event);
    fixture.detectChanges();
    const table = fixture.debugElement.query(By.css('#tableElement')).nativeElement;

    const shadowElement = table.querySelector('.uk2-sticky-shadow-container');
    expect(shadowElement.style.height).toBe(`${tableHeight}px`);
  });

  it('should validate the horizontal scroll not exceding the content width', () => {
    const tableElement = fixture.debugElement.query(By.css('#tableElement')).nativeElement;
    const scrollerElement: HTMLElement = tableElement.querySelector('.uk2-table-horizontal-scroller');
    const headerRow: HTMLElement = fixture.debugElement.query(By.css('mat-header-row[uk2-sticky-row]')).nativeElement;
    const contentWidth = headerRow.scrollWidth;
    // Override horizontal scrolling properties with a mock to modify this value
    let tableScrollValue = 0;
    Object.defineProperty(tableElement, 'scrollLeft', {
      get: () => tableScrollValue,
      set: newValue => {
        tableScrollValue = newValue;
      },
    });
    let scrollValue = 0;
    Object.defineProperty(scrollerElement, 'scrollLeft', {
      get: () => scrollValue,
      set: newValue => {
        scrollValue = newValue;
      },
    });
    let widthValue = 0;
    Object.defineProperty(tableElement, 'scrollWidth', {
      get: () => widthValue,
      set: value => {
        widthValue = value;
      },
    });

    tableElement.scrollLeft = contentWidth + 1000;
    tableElement.scrollWidth = contentWidth + 1000;

    directive.updateTableAndViewportSizes();
    fixture.detectChanges();

    expect(tableElement.scrollLeft).toEqual(scrollerElement.scrollWidth);
  });

  it('should set the horizontal scroll to 0 if the scroll position exceeds the table width', () => {
    const tableElement = fixture.debugElement.query(By.css('#tableElement')).nativeElement;
    const scrollerElement: HTMLElement = tableElement.querySelector('.uk2-table-horizontal-scroller');
    const headerRow: HTMLElement = fixture.debugElement.query(By.css('mat-header-row[uk2-sticky-row]')).nativeElement;
    const contentWidth = headerRow.scrollWidth;

    // Override horizontal scrolling properties with a mock to modify this value
    let tableScrollValue = 0;
    Object.defineProperty(tableElement, 'scrollLeft', {
      get: () => tableScrollValue,
      set: newValue => {
        tableScrollValue = newValue;
      },
    });
    let scrollValue = 0;
    Object.defineProperty(scrollerElement, 'scrollLeft', {
      get: () => scrollValue,
      set: newValue => {
        scrollValue = newValue;
      },
    });
    let widthValue = 0;
    Object.defineProperty(tableElement, 'scrollWidth', {
      get: () => widthValue,
      set: value => {
        widthValue = value;
      },
    });

    tableElement.scrollLeft = contentWidth + 500;
    tableElement.scrollWidth = contentWidth + 1000;

    directive.updateTableAndViewportSizes();
    fixture.detectChanges();

    expect(tableElement.scrollLeft).toEqual(0);
  });
});
