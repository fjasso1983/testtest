import { Component, ElementRef, NO_ERRORS_SCHEMA, TemplateRef, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { MatButtonModule } from '@angular/material/button';
import { MatIconTestingModule } from '@angular/material/icon/testing';
import { MatDividerModule } from '@angular/material/divider';
import { MatDialogModule, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Uk2DirectivesModule } from '@axos/uikit-v2-lib/src/lib/uk2-directives';

import { Uk2DialogData, Uk2ModalComponent } from './uk2-modal.component';
import { Uk2ModalRenderComponent } from './uk2-modal.component';
import {
  Uk2ModalActionsGridEnum,
  Uk2ModalFontWeightEnum,
  Uk2ModalUniversalHeaderDensity,
  Uk2ModalHeaderVariant,
  Uk2ModalTitleAlignEnum,
} from './enums';
import { Uk2IconRegistryService } from '../../uk2-services/uk2-icon-registry/uk2-icon-registry.service';

describe('Uk2ModalComponent', () => {
  let component: Uk2ModalComponent;
  let fixture: ComponentFixture<Uk2ModalComponent>;
  let matDialogSpy: { closeAll: jasmine.Spy; open: jasmine.Spy; getDialogById: jasmine.Spy };
  let service: Uk2IconRegistryService;

  const dialogInitialData: Uk2DialogData = {
    title: '',
    subtitle: '',
    showCloseButton: false,
    showHeader: true,
    headerVariant: Uk2ModalHeaderVariant.defaultHeader,
    content: undefined as any,
    showTitleDivider: false,
    showActionsDivider: false,
    actions: undefined as any,
    actionsGrid: Uk2ModalActionsGridEnum.side,
    titleFontWeight: Uk2ModalFontWeightEnum.bold400,
    titleAlign: Uk2ModalTitleAlignEnum.left,
    bodyContentAlignment: Uk2ModalTitleAlignEnum.left,
    headerIsLoading: false,
    backButtonFunction: jasmine.any(Function) as any,
    truncateUniversalHeader: true,
    headerDensity: Uk2ModalUniversalHeaderDensity.medium,
    showBackButton: false,
  };

  beforeEach(async () => {
    matDialogSpy = jasmine.createSpyObj('MatDialog', ['closeAll', 'open', 'getDialogById']);
    matDialogSpy.open.and.returnValue({
      afterClosed() {
        return { subscribe: () => {} };
      },
    });

    await TestBed.configureTestingModule({
      declarations: [Uk2ModalComponent, Uk2ModalRenderComponent],
      imports: [
        CommonModule,
        HttpClientTestingModule,
        MatIconTestingModule,
        MatButtonModule,
        MatDialogModule,
        MatDividerModule,
        Uk2DirectivesModule,
      ],
      providers: [Uk2IconRegistryService, { provide: MatDialog, useValue: matDialogSpy }],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    service = TestBed.inject(Uk2IconRegistryService);
    service.registerAllCategories();

    fixture = TestBed.createComponent(Uk2ModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('open dialog ', () => {
    component.openDialog();
    expect(matDialogSpy.open).toHaveBeenCalled();
  });

  it('should notify when the labeled button was clicked', () => {
    const emitSpy = spyOn(component.backButtonCallback, 'emit');

    component.onBackButtonClick();

    expect(emitSpy).toHaveBeenCalled();
  });

  it('backdrop should be present when hasBackdrop is TRUE ', () => {
    component.hasBackdrop = true;
    component.disabledCloseOverlayBackdrop = true;
    component.openDialog();

    let expectedValue = {
      data: {
        ...dialogInitialData,
      },
      id: undefined,
      disableClose: true,
      hasBackdrop: true,
      autoFocus: false,
      panelClass: ['uk2-modal-dialog-container'],
      backdropClass: 'uk2-modal-backdrop',
    };

    component.openDialog();
    expect(matDialogSpy.open).toHaveBeenCalledWith(Uk2ModalRenderComponent, expectedValue);
  });

  it('backdrop should NOT be present when hasBackdrop is FALSE ', () => {
    component.hasBackdrop = false;
    component.disabledCloseOverlayBackdrop = true;
    component.openDialog();

    let expectedValue = {
      data: {
        ...dialogInitialData,
      },
      id: undefined,
      disableClose: true,
      hasBackdrop: false,
      autoFocus: false,
      panelClass: ['uk2-modal-dialog-container'],
      backdropClass: 'uk2-modal-backdrop',
    };
    component.openDialog();
    expect(matDialogSpy.open).toHaveBeenCalledWith(Uk2ModalRenderComponent, expectedValue);
  });

  it('backdrop should be FORCED TO BE PRESENT when hasBackdrop is FALSE and disabledCloseOverlayBackdrop is FALSE', () => {
    component.hasBackdrop = false;
    component.disabledCloseOverlayBackdrop = false;
    component.openDialog();

    let expectedValue = {
      data: {
        ...dialogInitialData,
      },
      id: undefined,
      disableClose: false,
      hasBackdrop: true,
      autoFocus: false,
      panelClass: ['uk2-modal-dialog-container'],
      backdropClass: 'uk2-modal-backdrop',
    };
    component.openDialog();
    expect(matDialogSpy.open).toHaveBeenCalledWith(Uk2ModalRenderComponent, expectedValue);
  });

  it('should set uk2-modal-responsive-fullscreen-mode class if uk2EnableResponsiveFullscreen is set to true', () => {
    component.uk2EnableResponsiveFullscreen = true;
    component.headerVariant = Uk2ModalHeaderVariant.universalHeader;
    component.openDialog();

    let expectedValue = {
      data: {
        ...dialogInitialData,
        headerVariant: Uk2ModalHeaderVariant.universalHeader,
      },
      id: undefined,
      disableClose: true,
      hasBackdrop: true,
      autoFocus: false,
      panelClass: ['uk2-modal-dialog-container', 'uk2-modal-responsive-fullscreen-mode'],
      backdropClass: 'uk2-modal-backdrop',
    };
    component.openDialog();
    expect(matDialogSpy.open).toHaveBeenCalledWith(Uk2ModalRenderComponent, expectedValue);
  });

  it('should force the universal header variant if uk2EnableResponsiveFullscreen is set to true', () => {
    component.uk2EnableResponsiveFullscreen = true;
    component.headerVariant = Uk2ModalHeaderVariant.defaultHeader;
    component.openDialog();

    let expectedValue = {
      data: {
        ...dialogInitialData,
        headerVariant: Uk2ModalHeaderVariant.universalHeader,
      },
      id: undefined,
      disableClose: true,
      hasBackdrop: true,
      autoFocus: false,
      panelClass: ['uk2-modal-dialog-container', 'uk2-modal-responsive-fullscreen-mode'],
      backdropClass: 'uk2-modal-backdrop',
    };
    component.openDialog();
    expect(matDialogSpy.open).toHaveBeenCalledWith(Uk2ModalRenderComponent, expectedValue);
  });

  it('close dialog ', () => {
    component.closeDialog();
    expect(matDialogSpy.closeAll).toHaveBeenCalled();
  });

  it('close dialog', () => {
    component.modalId = 'modal-id';
    component.closeDialog();
    expect(matDialogSpy.getDialogById).toHaveBeenCalled();
  });
});

@Component({
  template: `
    <ng-template #modalContent>
      <h3>modal content</h3>
    </ng-template>
  `,
})
class TestComponent {
  @ViewChild('modalContent') modalContent: ElementRef = new ElementRef(null);
}

describe('Uk2ModalRenderComponent fade tests', () => {
  let component: Uk2ModalRenderComponent;
  let fixture: ComponentFixture<Uk2ModalRenderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Uk2ModalRenderComponent, TestComponent],
      imports: [
        CommonModule,
        MatIconTestingModule,
        MatButtonModule,
        MatDialogModule,
        MatDividerModule,
        Uk2DirectivesModule,
      ],
      providers: [
        [
          {
            provide: MAT_DIALOG_DATA,
            useValue: {
              title: 'this.title',
              subtitle: 'this.subtitle',
              showCloseButton: true,
              showTitleDivider: true,
              showActionsDivider: true,
              titleFontWeight: Uk2ModalFontWeightEnum.bold300,
              titleAlign: Uk2ModalTitleAlignEnum.center,
            },
          },
        ],
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(Uk2ModalRenderComponent);
    component = fixture.componentInstance;
  });

  it('should return the modal element', () => {
    const modalContent = component.getModalContent();
    expect(modalContent).not.toBeNull();
  });

  it('should add a fade class when theres scrolling present', () => {
    spyOn(component, 'getModalContent').and.returnValue({
      nativeElement: {
        scrollHeight: 400,
        clientHeight: 100,
        scrollTop: 100,
        classList: {
          toggle: jasmine.createSpy('toggle'),
        },
      },
    });
    fixture.detectChanges();

    expect(component.getModalContent).toHaveBeenCalled();
    expect(component.getModalContent().nativeElement.classList.toggle).toHaveBeenCalledWith(
      'uk2-modal-is-bottom-overflowing',
      true
    );
  });

  it("shouldn't add a fade class when there's no scrolling present", () => {
    spyOn(component, 'getModalContent').and.returnValue({
      nativeElement: {
        scrollHeight: 50,
        clientHeight: 100,
        classList: {
          remove: jasmine.createSpy('remove'),
        },
      },
    });
    fixture.detectChanges();

    expect(component.getModalContent).toHaveBeenCalled();
    expect(component.getModalContent().nativeElement.classList.remove).toHaveBeenCalledWith(
      'uk2-modal-is-bottom-overflowing'
    );
  });

  it('should remove a fade when the scroll reaches bottom', () => {
    spyOn(component, 'getModalContent').and.returnValue({
      nativeElement: {
        scrollHeight: 200,
        clientHeight: 100,
        scrollTop: 100,
        classList: {
          remove: jasmine.createSpy('remove'),
          toggle: jasmine.createSpy('toggle'),
        },
      },
    });
    fixture.detectChanges();

    expect(component.getModalContent).toHaveBeenCalled();
    expect(component.getModalContent().nativeElement.classList.toggle).toHaveBeenCalledWith(
      'uk2-modal-is-bottom-overflowing',
      false
    );
  });
});

describe('Uk2ModalRenderComponent component tests', () => {
  let component: Uk2ModalRenderComponent;
  let fixture: ComponentFixture<Uk2ModalRenderComponent>;
  let service: Uk2IconRegistryService;

  function defineElementRefSpy(scrollHeight: number, clientHeight: number, scrollTop: number) {
    spyOn(component, 'getModalContent').and.returnValue({
      nativeElement: {
        scrollHeight: scrollHeight,
        clientHeight: clientHeight,
        scrollTop: scrollTop,
        classList: {
          remove: jasmine.createSpy('remove'),
          toggle: jasmine.createSpy('toggle'),
        },
      },
    });
    spyOn(component, 'setFade');
  }

  async function configureComponentTestModule(dialogData: Partial<Uk2DialogData>) {
    await TestBed.configureTestingModule({
      declarations: [Uk2ModalRenderComponent, TestComponent],
      imports: [
        CommonModule,
        HttpClientTestingModule,
        MatIconTestingModule,
        MatButtonModule,
        MatDialogModule,
        MatDividerModule,
        Uk2DirectivesModule,
      ],
      providers: [
        [
          Uk2IconRegistryService,
          {
            provide: MAT_DIALOG_DATA,
            useValue: dialogData,
          },
        ],
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    service = TestBed.inject(Uk2IconRegistryService);
    service.registerAllCategories();

    return TestBed.createComponent(Uk2ModalRenderComponent);
  }

  it('call getModalContent', async () => {
    fixture = await configureComponentTestModule({
      title: 'this.title',
      subtitle: '',
      showCloseButton: true,
      showTitleDivider: true,
      showActionsDivider: true,
      actionsGrid: Uk2ModalActionsGridEnum.sideSpaced,
      titleFontWeight: Uk2ModalFontWeightEnum.bold300,
      titleAlign: Uk2ModalTitleAlignEnum.center,
    });
    component = fixture.componentInstance;
    defineElementRefSpy(0, 0, 0);

    fixture.detectChanges();
    expect(component.getModalContent()).toBeFalsy;
  });

  it('action grid is sideSpaced', async () => {
    fixture = await configureComponentTestModule({
      title: 'this.title',
      subtitle: 'this.subtitle',
      showCloseButton: true,
      showTitleDivider: true,
      showActionsDivider: true,
      actionsGrid: Uk2ModalActionsGridEnum.sideSpaced,
      titleFontWeight: Uk2ModalFontWeightEnum.bold300,
      titleAlign: Uk2ModalTitleAlignEnum.center,
    });
    component = fixture.componentInstance;
    defineElementRefSpy(0, 0, 0);
    component.actionGridRender();
    fixture.detectChanges();

    expect(component).toBeTruthy();
  });

  it('action grid is side', async () => {
    fixture = await configureComponentTestModule({
      title: 'this.title',
      subtitle: 'this.subtitle',
      showCloseButton: true,
      showTitleDivider: true,
      showActionsDivider: true,
      actionsGrid: Uk2ModalActionsGridEnum.side,
      titleFontWeight: Uk2ModalFontWeightEnum.bold300,
      titleAlign: Uk2ModalTitleAlignEnum.center,
      bodyContentAlignment: Uk2ModalTitleAlignEnum.center,
    });
    component = fixture.componentInstance;

    defineElementRefSpy(0, 0, 0);
    component.actionGridRender();
    fixture.detectChanges();
    component.bodyAlignClass();

    expect(component).toBeTruthy();
  });

  it('action grid is stacked', async () => {
    fixture = await configureComponentTestModule({
      title: 'this.title',
      subtitle: undefined,
      showCloseButton: false,
      showTitleDivider: true,
      showActionsDivider: true,
      actionsGrid: Uk2ModalActionsGridEnum.stacked,
      titleFontWeight: Uk2ModalFontWeightEnum.bold400,
      titleAlign: Uk2ModalTitleAlignEnum.left,
      bodyContentAlignment: Uk2ModalTitleAlignEnum.left,
    });
    component = fixture.componentInstance;
    defineElementRefSpy(0, 0, 0);
    component.actionGridRender();
    fixture.detectChanges();
    component.bodyAlignClass();

    expect(component).toBeTruthy();
  });

  it('action grid is centered', async () => {
    fixture = await configureComponentTestModule({
      title: 'this.title',
      subtitle: undefined,
      showCloseButton: false,
      showTitleDivider: true,
      showActionsDivider: true,
      actionsGrid: Uk2ModalActionsGridEnum.centered,
      titleFontWeight: Uk2ModalFontWeightEnum.bold400,
      titleAlign: Uk2ModalTitleAlignEnum.left,
      bodyContentAlignment: Uk2ModalTitleAlignEnum.left,
    });
    component = fixture.componentInstance;
    defineElementRefSpy(0, 0, 0);
    component.actionGridRender();
    fixture.detectChanges();
    component.bodyAlignClass();

    expect(component).toBeTruthy();
  });

  it('actions grid is null', async () => {
    fixture = await configureComponentTestModule({
      title: 'this.title',
      subtitle: 'this.subtitle',
      showCloseButton: true,
      showTitleDivider: true,
      showActionsDivider: true,
      titleFontWeight: Uk2ModalFontWeightEnum.bold400,
      titleAlign: Uk2ModalTitleAlignEnum.center,
    });
    component = fixture.componentInstance;
    defineElementRefSpy(0, 0, 0);
    component.actionGridRender();
    component.onResize();
    fixture.detectChanges();

    expect(component).toBeTruthy();
  });

  it('should set the correct title alignment styles for center align', async () => {
    fixture = await configureComponentTestModule({
      title: 'this.title',
      subtitle: 'this.subtitle',
      showCloseButton: false,
      titleFontWeight: Uk2ModalFontWeightEnum.bold400,
      titleAlign: Uk2ModalTitleAlignEnum.center,
    });
    component = fixture.componentInstance;
    defineElementRefSpy(0, 0, 0);
    component.actionGridRender();
    component.onResize();
    fixture.detectChanges();

    const alignment = component.titleAlignClass();

    expect(alignment).toEqual('uk2-modal-title-center');
  });

  it('should set the correct title alignment styles for center align when the close button is showed', async () => {
    fixture = await configureComponentTestModule({
      title: 'this.title',
      subtitle: 'this.subtitle',
      showCloseButton: true,
      titleFontWeight: Uk2ModalFontWeightEnum.bold400,
      titleAlign: Uk2ModalTitleAlignEnum.center,
    });
    component = fixture.componentInstance;
    defineElementRefSpy(0, 0, 0);
    component.actionGridRender();
    component.onResize();
    fixture.detectChanges();

    const alignment = component.titleAlignClass();

    expect(alignment).toEqual('uk2-modal-title-center uk2-modal-title-center-padding-left');
  });

  it('should set the correct title alignment styles for left align', async () => {
    fixture = await configureComponentTestModule({
      title: 'this.title',
      subtitle: 'this.subtitle',
      titleFontWeight: Uk2ModalFontWeightEnum.bold400,
      titleAlign: Uk2ModalTitleAlignEnum.left,
    });
    component = fixture.componentInstance;
    defineElementRefSpy(0, 0, 0);
    component.actionGridRender();
    component.onResize();
    fixture.detectChanges();

    const alignment = component.titleAlignClass();

    expect(alignment).toEqual('');
  });

  it('should call the back button function', async () => {
    const backFunctionSpy = jasmine.createSpy('backButtonFunction');
    fixture = await configureComponentTestModule({
      title: 'this.title',
      headerVariant: Uk2ModalHeaderVariant.universalHeader,
      backButtonFunction: backFunctionSpy,
    });
    component = fixture.componentInstance;
    defineElementRefSpy(0, 0, 0);
    component.actionGridRender();
    component.onResize();
    fixture.detectChanges();

    component.onClickBackButton();

    expect(backFunctionSpy).toHaveBeenCalled();
  });

  it('should set the correct styles for bold400 font weight as large density', async () => {
    fixture = await configureComponentTestModule({
      title: 'this.title',
      subtitle: 'this.subtitle',
      showCloseButton: true,
      showTitleDivider: true,
      titleFontWeight: Uk2ModalFontWeightEnum.bold400,
    });
    component = fixture.componentInstance;
    defineElementRefSpy(0, 0, 0);
    component.actionGridRender();
    component.onResize();
    fixture.detectChanges();

    const styles = component['getHeaderState']();

    expect(styles).toContain('uk2-header-density-lrg');
  });

  it('should set the correct styles for bold300 font weight as medium density', async () => {
    fixture = await configureComponentTestModule({
      title: 'this.title',
      subtitle: 'this.subtitle',
      showCloseButton: true,
      showTitleDivider: true,
      titleFontWeight: Uk2ModalFontWeightEnum.bold300,
    });
    component = fixture.componentInstance;
    defineElementRefSpy(0, 0, 0);
    component.actionGridRender();
    component.onResize();
    fixture.detectChanges();

    const styles = component['getHeaderState']();

    expect(styles).toContain('uk2-header-density-med');
  });

  it('should set the correct styles for font weight when theres no subtitle', async () => {
    fixture = await configureComponentTestModule({
      title: 'this.title',
      subtitle: undefined,
      showCloseButton: true,
      showTitleDivider: true,
      titleFontWeight: Uk2ModalFontWeightEnum.bold400,
    });
    component = fixture.componentInstance;
    defineElementRefSpy(0, 0, 0);
    component.actionGridRender();
    component.onResize();
    fixture.detectChanges();

    const weightStyles = component.getTitleClass();

    expect(weightStyles).toContain('uk2-modal-title-margin-bottom');
  });

  it('should set the correct styles for the close button when defined', async () => {
    fixture = await configureComponentTestModule({
      title: 'this.title',
      subtitle: 'this.subtitle',
      showCloseButton: true,
      showTitleDivider: true,
      titleFontWeight: Uk2ModalFontWeightEnum.bold300,
    });
    component = fixture.componentInstance;
    defineElementRefSpy(0, 0, 0);
    component.actionGridRender();
    component.onResize();
    fixture.detectChanges();

    const weightStyles = component.closeButtonClass();

    expect(weightStyles).toEqual('uk2-modal-grid-x');
  });

  it('should set the correct styles for the close button when not defined', async () => {
    fixture = await configureComponentTestModule({
      title: 'this.title',
      subtitle: 'this.subtitle',
      showCloseButton: false,
      showTitleDivider: true,
      titleFontWeight: Uk2ModalFontWeightEnum.bold300,
    });
    component = fixture.componentInstance;
    defineElementRefSpy(0, 0, 0);
    component.actionGridRender();
    component.onResize();
    fixture.detectChanges();

    const weightStyles = component.closeButtonClass();

    expect(weightStyles).toEqual('');
  });

  it('should set the correct styles for the default header', async () => {
    fixture = await configureComponentTestModule({
      headerVariant: Uk2ModalHeaderVariant.defaultHeader,
      title: 'this.title',
      subtitle: 'this.subtitle',
      showCloseButton: true,
    });
    component = fixture.componentInstance;
    defineElementRefSpy(0, 0, 0);
    component.actionGridRender();
    component.onResize();
    fixture.detectChanges();

    const headerStyles = component['getHeaderState']();

    expect(headerStyles).toContain('uk2-modal-default-header');
  });

  it('should set the correct styles for the universal header variant', async () => {
    fixture = await configureComponentTestModule({
      headerVariant: Uk2ModalHeaderVariant.universalHeader,
      title: 'this.title',
      showCloseButton: true,
    });
    component = fixture.componentInstance;
    defineElementRefSpy(0, 0, 0);
    component.actionGridRender();
    component.onResize();
    fixture.detectChanges();

    const headerStyles = component['getHeaderState']();

    expect(headerStyles).toContain('uk2-modal-universal-header');
  });

  it('should set the correct styles for the universal header variant loading state', async () => {
    fixture = await configureComponentTestModule({
      headerVariant: Uk2ModalHeaderVariant.universalHeader,
      title: 'this.title',
      headerIsLoading: true,
    });
    component = fixture.componentInstance;
    defineElementRefSpy(0, 0, 0);
    component.actionGridRender();
    component.onResize();
    fixture.detectChanges();

    const headerStyles = component['getHeaderState']();

    expect(headerStyles).toContain('uk2-modal-header-skeleton');
  });

  it('should set the correct styles for the universal header variant small density', async () => {
    fixture = await configureComponentTestModule({
      headerVariant: Uk2ModalHeaderVariant.universalHeader,
      headerDensity: Uk2ModalUniversalHeaderDensity.small,
      title: 'this.title',
    });
    component = fixture.componentInstance;
    defineElementRefSpy(0, 0, 0);
    component.actionGridRender();
    component.onResize();
    fixture.detectChanges();

    const headerStyles = component['getHeaderState']();

    expect(headerStyles).toContain('uk2-header-density-sml');
  });

  it('should set the correct styles for the universal header variant medium density', async () => {
    fixture = await configureComponentTestModule({
      headerVariant: Uk2ModalHeaderVariant.universalHeader,
      headerDensity: Uk2ModalUniversalHeaderDensity.medium,
      title: 'this.title',
    });
    component = fixture.componentInstance;
    defineElementRefSpy(0, 0, 0);
    component.actionGridRender();
    component.onResize();
    fixture.detectChanges();

    const headerStyles = component['getHeaderState']();

    expect(headerStyles).toContain('uk2-header-density-med');
  });

  it('should set the correct styles for the universal header variant large density', async () => {
    fixture = await configureComponentTestModule({
      headerVariant: Uk2ModalHeaderVariant.universalHeader,
      headerDensity: Uk2ModalUniversalHeaderDensity.large,
      title: 'this.title',
    });
    component = fixture.componentInstance;
    defineElementRefSpy(0, 0, 0);
    component.actionGridRender();
    component.onResize();
    fixture.detectChanges();

    const headerStyles = component['getHeaderState']();

    expect(headerStyles).toContain('uk2-header-density-lrg');
  });
});
