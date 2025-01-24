import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSnackBar, MatSnackBarModule, MatSnackBarRef, MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import { Uk2ToastComponent } from './uk2-toast.component';
import { Uk2ToastConfigModel } from './models';
import { uk2ToastConfigConstants, uk2ToastErrorConstants } from './constants/constants';
import { Uk2ToastTypeEnum } from './enums';
import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UK2_BREAKPOINTS } from '@axos/uikit-v2-lib/src/lib/uk2-internal-utils';

@Component({
  template: '',
})
class OpenToastTestingComponent {
  durationInSeconds = 50;

  constructor(public _snackBar: MatSnackBar) {}

  openSnackBarAlert() {
    this._snackBar.openFromComponent(Uk2ToastComponent, {
      duration: this.durationInSeconds * 1000,
      data: {
        message: 'hello alert message',
        type: Uk2ToastTypeEnum.alert,
      },
    });
  }

  openSnackBarSuccess() {
    this._snackBar.openFromComponent(Uk2ToastComponent, {
      duration: this.durationInSeconds * 1000,
      data: {
        message: 'hello success message',
        type: Uk2ToastTypeEnum.success,
      },
    });
  }

  openSnackBarLoading() {
    this._snackBar.openFromComponent(Uk2ToastComponent, {
      duration: this.durationInSeconds * 1000,
      data: {
        message: '',
        type: Uk2ToastTypeEnum.loading,
      },
    });
  }
}

describe('Uk2ToastComponent', () => {
  let component: Uk2ToastComponent;
  let fixture: ComponentFixture<Uk2ToastComponent>;
  let snackRef: MatSnackBarRef<any>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Uk2ToastComponent],
      imports: [MatSnackBarModule, BrowserAnimationsModule],
      providers: [
        { provide: MAT_SNACK_BAR_DATA, useValue: {} },
        { provide: MatSnackBarRef, useValue: { dismiss: jasmine.createSpy() } },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Uk2ToastComponent);
    component = fixture.componentInstance;
    snackRef = TestBed.inject(MatSnackBarRef);
    component.snackBarContainer = document.createElement('div');
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should validate the config', () => {
    component.data = { type: 'invalidType', message: 'Toast message' };
    expect(() => component.validateConfig()).toThrowError(uk2ToastErrorConstants.errorConfigType);
  });

  it('should Throw Error if message is null', () => {
    component.data = { type: Uk2ToastTypeEnum.success, message: null };
    expect(() => component.validateConfig()).toThrowError(uk2ToastErrorConstants.errorConfigMessage);
  });

  it('should Throw Error if message is undefined', () => {
    component.data = { type: Uk2ToastTypeEnum.success, message: undefined };
    expect(() => component.validateConfig()).toThrowError(uk2ToastErrorConstants.errorConfigMessage);
  });

  it('should Throw Error if message is empty', () => {
    component.data = { type: Uk2ToastTypeEnum.success, message: '' };
    expect(() => component.validateConfig()).toThrowError(uk2ToastErrorConstants.errorConfigMessage);
  });

  it('should NOT Throw Error if message is null and type is skeleton', () => {
    component.data = { type: Uk2ToastTypeEnum.loading, message: null };
    expect(() => component.validateConfig()).not.toThrowError(uk2ToastErrorConstants.errorConfigMessage);
  });

  it('should create correct config', () => {
    component.data = { type: Uk2ToastTypeEnum.success, message: 'Toast message' };
    let config: Uk2ToastConfigModel = new Uk2ToastConfigModel(component.data);
    expect(config).toEqual(
      jasmine.objectContaining({
        class: uk2ToastConfigConstants.successClass,
        iconName: uk2ToastConfigConstants.successIconName,
        message: component.data.message,
      })
    );

    component.data = { type: Uk2ToastTypeEnum.alert, message: 'Alert Toast message' };
    config = new Uk2ToastConfigModel(component.data);
    expect(config).toEqual(
      jasmine.objectContaining({
        class: uk2ToastConfigConstants.alertClass,
        iconName: uk2ToastConfigConstants.alertIconName,
        message: component.data.message,
      })
    );

    component.data = { type: Uk2ToastTypeEnum.loading, message: 'Toast message' };
    config = new Uk2ToastConfigModel(component.data);
    expect(config).toEqual(
      jasmine.objectContaining({
        class: uk2ToastConfigConstants.loadingClass,
        iconName: '',
        message: '',
      })
    );
  });

  it('should dismiss the toast', () => {
    component.dismiss();
    expect(snackRef.dismiss).toHaveBeenCalled();
  });

  it('should conditionally dismiss the toast based on window.innerWidth', () => {
    window.innerWidth = UK2_BREAKPOINTS.lg + 1;
    component.conditionalDismiss();
    expect(snackRef.dismiss).not.toHaveBeenCalled();
    window.innerWidth = UK2_BREAKPOINTS.lg - 1;
    component.conditionalDismiss();
    expect(snackRef.dismiss).toHaveBeenCalled();
  });
});

describe('Uk2ToastComponent', () => {
  let componentOpening: OpenToastTestingComponent;
  let fixtureOpening: ComponentFixture<OpenToastTestingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Uk2ToastComponent, OpenToastTestingComponent],
      imports: [MatSnackBarModule, BrowserAnimationsModule],
      providers: [
        { provide: MAT_SNACK_BAR_DATA, useValue: {} },
        { provide: MatSnackBarRef, useValue: { dismiss: jasmine.createSpy() } },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixtureOpening = TestBed.createComponent(OpenToastTestingComponent);
    componentOpening = fixtureOpening.componentInstance;
  });

  it('should initialize the component with Success config', () => {
    componentOpening.openSnackBarSuccess();
    let snackBarContainer = componentOpening._snackBar._openedSnackBarRef?.instance.snackBarContainer;
    expect(snackBarContainer.classList).toContain('uk2-toast-container');
    let cdkOverlayContainer = componentOpening._snackBar._openedSnackBarRef?.instance.cdkOverlayContainer;
    expect(cdkOverlayContainer.classList).toContain('uk2-toast-cdk-overlay-container');
    let uk2Toast = snackBarContainer.querySelector('.uk2-toast');
    expect(uk2Toast.classList).toContain(uk2ToastConfigConstants.successClass);
  });

  it('should initialize the component with Alert config', () => {
    componentOpening.openSnackBarAlert();
    let snackBarContainer = componentOpening._snackBar._openedSnackBarRef?.instance.snackBarContainer;
    expect(snackBarContainer.classList).toContain('uk2-toast-container');
    let cdkOverlayContainer = componentOpening._snackBar._openedSnackBarRef?.instance.cdkOverlayContainer;
    expect(cdkOverlayContainer.classList).toContain('uk2-toast-cdk-overlay-container');
    let uk2Toast = snackBarContainer.querySelector('.uk2-toast');
    expect(uk2Toast.classList).toContain(uk2ToastConfigConstants.alertClass);
  });

  it('should initialize the component with Loading config', () => {
    componentOpening.openSnackBarLoading();
    let snackBarContainer = componentOpening._snackBar._openedSnackBarRef?.instance.snackBarContainer;
    expect(snackBarContainer.classList).toContain('uk2-toast-container');
    let cdkOverlayContainer = componentOpening._snackBar._openedSnackBarRef?.instance.cdkOverlayContainer;
    expect(cdkOverlayContainer.classList).toContain('uk2-toast-cdk-overlay-container');
    let uk2Toast = snackBarContainer.querySelector('.uk2-toast');
    expect(uk2Toast.classList).toContain(uk2ToastConfigConstants.loadingClass);
  });
});
