import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Uk2PanelComponent } from './uk2-panel.component';
import { CommonModule } from '@angular/common';
import { MatIconTestingModule } from '@angular/material/icon/testing';
import { MatButtonModule } from '@angular/material/button';
import { Component, NO_ERRORS_SCHEMA, SimpleChange } from '@angular/core';
import { Overlay, OverlayContainer } from '@angular/cdk/overlay';
import { uk2PanelPosition } from './enums';
import { Subject } from 'rxjs';

//Material overlay Spy methods
const globalEndSpy = jasmine.createSpy('end');
const globalStartSpy = jasmine.createSpy('start');
const disposeSpy = jasmine.createSpy('dispose');
const overlayAddClassSpy = jasmine.createSpy('add');
const sizeUpdateSpy = jasmine.createSpy('updateSize');

const mockOverlayPositionBuilder = {
  global: () => {
    return {
      end: globalEndSpy,
      start: globalStartSpy,
    };
  },
  flexibleConnectedTo: () => {
    return {
      withPositions: () => {},
    };
  },
};

const backdropClickObserver: Subject<any> = new Subject();
const mockOverlayRef = {
  dispose: disposeSpy,
  updateSize: sizeUpdateSpy,
  attach: () => {},
  backdropClick: () => {
    return backdropClickObserver;
  },
  overlayElement: {
    children: [
      {
        classList: {
          add: overlayAddClassSpy,
        },
        addEventListener: jasmine.createSpy('addEventListener').and.callFake((_, callback) => {
          callback();
        }),
      },
    ],
    querySelector: () => {},
  },
};

const mockOverlay = jasmine.createSpyObj('Overlay', ['create', 'position']);
mockOverlay.position.and.returnValue(mockOverlayPositionBuilder);
mockOverlay.create.and.returnValue(mockOverlayRef);

describe('uk2PanelComponent - Component', () => {
  let component: Uk2PanelComponent;
  let fixture: ComponentFixture<Uk2PanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Uk2PanelComponent],
      imports: [CommonModule, MatIconTestingModule, MatButtonModule],
      providers: [{ provide: Overlay, useValue: mockOverlay }],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(Uk2PanelComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should open the panel on the right position with the correct styles', () => {
    component.uk2PanelClass = 'uk2-panel-custom-class';
    component.uk2PanelPosition = uk2PanelPosition.Right;

    component.openPanel();

    expect(globalEndSpy).toHaveBeenCalled();
    expect(component['panelStyles']).toEqual(['uk2-panel-custom-class', 'uk2-panel-right-position']);
  });

  it('should open the panel on left position with the correct styles', () => {
    component.uk2PanelClass = 'uk2-panel-custom-class';
    component.uk2PanelPosition = uk2PanelPosition.Left;

    component.openPanel();

    expect(globalStartSpy).toHaveBeenCalled();
    expect(component['panelStyles']).toEqual(['uk2-panel-custom-class', 'uk2-panel-left-position']);
  });

  it('should call to close the panel when the backdrop is clicked', () => {
    const closeSpy = spyOn(component, 'closePanel');
    component.uk2CloseOnBackdropClick = true;
    component.openPanel();

    backdropClickObserver.next({ type: 'click' } as MouseEvent);

    expect(closeSpy).toHaveBeenCalled();
  });

  it('should add the proper animation styles when closing the panel on the right position', () => {
    component.uk2PanelPosition = uk2PanelPosition.Right;
    component.openPanel();

    component.closePanel();

    expect(overlayAddClassSpy).toHaveBeenCalledWith('uk2-panel-animation-right-position-dispose');
    expect(disposeSpy).toHaveBeenCalled();
  });

  it('should add the proper animation styles when closing the panel on the left position', () => {
    component.uk2PanelPosition = uk2PanelPosition.Left;
    component.openPanel();

    component.closePanel();

    expect(overlayAddClassSpy).toHaveBeenCalledWith('uk2-panel-animation-left-position-dispose');
    expect(disposeSpy).toHaveBeenCalled();
  });

  it('should update the panel width when the panel overlay is open', () => {
    component.openPanel();

    component.ngOnChanges({
      panelWidth: new SimpleChange(0, 200, false),
    });

    expect(sizeUpdateSpy).toHaveBeenCalledWith({ width: 200 });
  });

  it('should update the panel max width when the panel overlay is open', () => {
    component.openPanel();

    component.ngOnChanges({
      panelMaxWidth: new SimpleChange(0, 400, false),
    });

    expect(sizeUpdateSpy).toHaveBeenCalledWith({ maxWidth: 400 });
  });

  it('should update the panel max width when the panel overlay is open', () => {
    component.openPanel();

    component.ngOnChanges({
      panelMinWidth: new SimpleChange(0, 100, false),
    });

    expect(sizeUpdateSpy).toHaveBeenCalledWith({ minWidth: 100 });
  });
});

@Component({
  template: `
    <uk2-panel #sidePanelRef>
      <ng-template #uk2PanelHeaderIcons>
        <button>
          <mat-icon [svgIcon]="'uk2-x'"></mat-icon>
        </button>
      </ng-template>
      <ng-template #uk2PanelContent>
        <p>Panel content</p>
      </ng-template>
    </uk2-panel>
  `,
})
class PanelTestComponent {}
describe('uk2PanelComponent - UI', () => {
  let component: Uk2PanelComponent;
  let fixture: ComponentFixture<PanelTestComponent>;
  let overlayContainer: OverlayContainer;
  let overlayContainerElement: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Uk2PanelComponent, PanelTestComponent],
      imports: [CommonModule, MatIconTestingModule, MatButtonModule],
      providers: [Overlay],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(PanelTestComponent);
    component = fixture.debugElement.children[0].componentInstance;
    overlayContainer = TestBed.inject(OverlayContainer);
    overlayContainerElement = overlayContainer.getContainerElement();
    fixture.detectChanges();
  });

  beforeEach(() => {
    component.openPanel();
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
    overlayContainer.ngOnDestroy();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should display the correct header title', () => {
    const headerElement = overlayContainerElement.querySelector('.uk2-panel-header-content h2');
    component.uk2HeaderTitle = 'Test header title';
    fixture.detectChanges();

    const title = headerElement!.innerHTML.trim();
    expect(title).toEqual('Test header title');
  });

  it('should add the correct CSS class to the panel element', () => {
    const headerElement = overlayContainerElement.querySelector('.uk2-panel');
    component.uk2PanelClass = 'panel-test-styles';
    component['setPanelClass']();

    fixture.detectChanges();

    expect(headerElement?.classList).toContain('panel-test-styles');
  });

  it('should display the footer if uk2ShowFooter is true', () => {
    component.uk2ShowFooter = true;
    fixture.detectChanges();

    const footerElement = overlayContainerElement.querySelector('.uk2-panel-footer');

    expect(footerElement).toBeTruthy();
  });

  it('should not display the footer if uk2ShowFooter is false', () => {
    component.uk2ShowFooter = false;
    fixture.detectChanges();

    const footerElement = overlayContainerElement.querySelector('.uk2-panel-footer');

    expect(footerElement).toBeFalsy();
  });

  it('should display the skeleton state if uk2IsLoading is true', () => {
    component.uk2IsLoading = true;
    fixture.detectChanges();

    const skeletonElement = overlayContainerElement.querySelector('.uk2-panel-skeleton');

    expect(skeletonElement).toBeTruthy();
  });

  it('should not display the skeleton state if uk2IsLoading is false', () => {
    component.uk2IsLoading = false;
    fixture.detectChanges();

    const skeletonElement = overlayContainerElement.querySelector('.uk2-panel-skeleton');

    expect(skeletonElement).toBeFalsy();
  });

  it('should add the correct CSS class to the header icon buttons', () => {
    const headerElement = overlayContainerElement.querySelector('.uk2-panel-header-content');
    const buttons = headerElement?.querySelectorAll('button');

    buttons?.forEach(button => {
      expect(button.classList).toContain('uk2-panel-header-icon');
    });
  });
});
