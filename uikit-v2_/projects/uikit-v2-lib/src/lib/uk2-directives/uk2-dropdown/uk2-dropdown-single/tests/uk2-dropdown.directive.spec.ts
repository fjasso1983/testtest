import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { Uk2InternalUtilsServicesModule, MATERIAL_CLASSES } from '@axos/uikit-v2-lib/src/lib/uk2-internal-utils';

import { Uk2DropdownDirective } from '../uk2-dropdown.directive';
import { Uk2DropdownSizeEnum } from '../enums';
import { UK2_DROPDOWN_CLASSES } from '../constants/constants';
import {
  getElementRef,
  getHintEl,
  getHost,
  getMatFormField,
  getMatFormFieldComponent,
  getPanel,
  getRenderer,
} from './mocks/index.spec';
import { DropdownTestingComponent } from './dropdown-testing.component.spec';
import { NO_ERRORS_SCHEMA, SimpleChange } from '@angular/core';

describe('Uk2DropdownDirective UI', () => {
  let component: DropdownTestingComponent;
  let fixture: ComponentFixture<DropdownTestingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DropdownTestingComponent, Uk2DropdownDirective],
      imports: [MatSelectModule, MatInputModule, BrowserAnimationsModule, Uk2InternalUtilsServicesModule],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DropdownTestingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create an instance', () => {
    expect(component).toBeDefined();
  });

  it("should add class 'uk2-hidden' if input change to true", () => {
    component.activeLoading();
    fixture.detectChanges();

    const matFormField = fixture.elementRef.nativeElement.querySelector(
      `.${MATERIAL_CLASSES.formField}`
    ) as HTMLElement;
    const skeleton = fixture.elementRef.nativeElement.querySelector('.uk2-skeleton-input') as HTMLElement;
    expect(matFormField).toBeDefined();
    expect(matFormField.classList.contains('uk2-hidden')).toBeTrue();
    expect(skeleton).toBeDefined();
    expect(skeleton.classList.contains('uk2-hidden')).toBeFalse();
  });
});

describe('Uk2DropdownDirective Class', () => {
  let component: Uk2DropdownDirective;

  let matFormFieldEl: any;
  let elementRefMock: any;
  let hostMock: any;
  let rendererMock: any;
  let matFormFieldComponent: any;
  let hintEl: any;
  let panelMock: any;

  beforeEach(() => {
    elementRefMock = getElementRef();
    hintEl = getHintEl();
    hostMock = getHost();
    matFormFieldEl = getMatFormField();
    matFormFieldComponent = getMatFormFieldComponent();
    panelMock = getPanel();
    rendererMock = getRenderer();
    elementRefMock.nativeElement.closest.and.returnValue(matFormFieldEl);
    component = null as any;
  });

  it('should throw if mat-form-field is not appearance="outline"', () => {
    expect(() => {
      matFormFieldEl.classList.contains.and.returnValue(false);
      elementRefMock.nativeElement.closest.and.returnValue(matFormFieldEl);

      component = new Uk2DropdownDirective(elementRefMock, rendererMock, matFormFieldComponent, hostMock);

      component.ngAfterViewInit();
    }).toThrowError('appearance should be outline');
  });

  it('should call rerender.addClass with values "uk2-dropdown-filled"', () => {
    elementRefMock.nativeElement.closest.and.returnValue(matFormFieldEl);
    hostMock.setValue(['test']);

    component = new Uk2DropdownDirective(elementRefMock, rendererMock, matFormFieldComponent, hostMock);
    component.inputFilled();

    expect(rendererMock.addClass).toHaveBeenCalledOnceWith(matFormFieldEl, 'uk2-dropdown-filled');
    hostMock.setValue('');
  });

  it('should throw if mat-form-field is not floatLabel="always"', () => {
    matFormFieldEl.classList.contains.and.callFake((name: string) => name === MATERIAL_CLASSES.outlineField);
    elementRefMock.nativeElement.closest.and.returnValue(matFormFieldEl);

    component = new Uk2DropdownDirective(elementRefMock, rendererMock, matFormFieldComponent, hostMock);
    expect(() => {
      component.ngAfterViewInit();
    }).toThrowError('float label should be always');
  });

  it('should call inputFilled when onChange is invoked', () => {
    component = new Uk2DropdownDirective(elementRefMock, rendererMock, matFormFieldComponent, hostMock);
    const inputFilledSpy = spyOn(component, 'inputFilled');

    component.onChange();

    expect(inputFilledSpy).toHaveBeenCalled();
  });

  it('should toggle isOpen variable and call changeOpenCloseClass when onOpen is invoked', () => {
    component = new Uk2DropdownDirective(elementRefMock, rendererMock, matFormFieldComponent, hostMock);
    const changeOpenCloseClassSpy = spyOn(component, 'changeOpenCloseClass');

    component.onOpen();

    expect(changeOpenCloseClassSpy).toHaveBeenCalled();
  });

  it('should call renderer.addClass if isOpen is true calling changeOpenCloseClass', () => {
    hostMock.setPanelOpen(true);
    elementRefMock.nativeElement.closest.and.returnValue(matFormFieldEl);
    component = new Uk2DropdownDirective(elementRefMock, rendererMock, matFormFieldComponent, hostMock);

    component.changeOpenCloseClass();

    expect(rendererMock.addClass).toHaveBeenCalledOnceWith(matFormFieldEl, UK2_DROPDOWN_CLASSES.open);
    hostMock.setPanelOpen(false);
  });

  it('should call renderer.removeClass if isOpen is false calling changeOpenCloseClass', () => {
    elementRefMock.nativeElement.closest.and.returnValue(matFormFieldEl);
    component = new Uk2DropdownDirective(elementRefMock, rendererMock, matFormFieldComponent, hostMock);

    component.changeOpenCloseClass();

    expect(rendererMock.removeClass).toHaveBeenCalledOnceWith(matFormFieldEl, UK2_DROPDOWN_CLASSES.open);
    expect(matFormFieldEl.classList.remove).toHaveBeenCalledWith('uk2-dropdown-flyout-above');
    expect(matFormFieldEl.classList.remove).toHaveBeenCalledWith('uk2-dropdown-flyout-bellow');
  });

  it("should invoke handleSkeleton with null if singleChanges doesn't have uk2IsLoading property", () => {
    component = new Uk2DropdownDirective(elementRefMock, rendererMock, matFormFieldComponent, hostMock);
    const handleSkeletonSpy = spyOn(component, 'handleSkeleton');
    const changes = {
      uk2IsLoading: {} as SimpleChange,
    };

    component.ngOnChanges(changes);

    expect(handleSkeletonSpy).toHaveBeenCalledOnceWith(false, Uk2DropdownSizeEnum.large);
  });

  it('should NOT create hint element in panel if hint element does not exits', () => {
    const component = new Uk2DropdownDirective(elementRefMock, rendererMock, matFormFieldComponent, hostMock);
    component['_panelParent'] = {
      querySelector: () => null,
    };

    matFormFieldComponent.hintLabel = 'label';
    const getDropDownPanelSpy = spyOn(component, 'getDropDownPanel');
    const customPanelMock = { ...panelMock, parentNode: {} };
    getDropDownPanelSpy.and.returnValue(customPanelMock);
    rendererMock.createElement.and.returnValue(hintEl);
    hostMock.setPanelOpen(true);

    const hasHintSpy = spyOn(component, 'hasHint');
    hasHintSpy.and.returnValue(null);

    component.addHint();

    expect(component['_panelHint']).toBe(null);
  });

  it('should render hint element when panel its open and panel its below', () => {
    const component = new Uk2DropdownDirective(elementRefMock, rendererMock, matFormFieldComponent, hostMock);
    component['_panelHint'] = {};
    hostMock.setPanelOpen(true);
    const isFlyDownAboveSpy = spyOn(component, 'isFlyDownAbove');
    isFlyDownAboveSpy.and.returnValue(false);

    component.toggleHint();

    expect(rendererMock.insertBefore).toHaveBeenCalledOnceWith(
      component['_panelParent'],
      component['_panelHint'],
      hostMock.panel.nativeElement
    );
  });

  it('should not render hint element when panel its close', () => {
    const component = new Uk2DropdownDirective(elementRefMock, rendererMock, matFormFieldComponent, hostMock);
    component['_panelHint'] = {};
    hostMock.setPanelOpen(false);

    component.toggleHint();

    expect(rendererMock.removeChild).toHaveBeenCalledOnceWith(component['_panelParent'], component['_panelHint']);
  });

  it('should exit addHint function if flydown is above', () => {
    let component = new Uk2DropdownDirective(elementRefMock, rendererMock, matFormFieldComponent, hostMock);
    const isFlyDownAboveSpy = spyOn(component, 'isFlyDownAbove');
    isFlyDownAboveSpy.and.returnValue(true);
    hostMock.setPanelOpen(true);

    component.addHint();

    expect(rendererMock.insertBefore).not.toHaveBeenCalled();
  });

  it('should add gradient margin effect if scroll is visible', () => {
    let component = new Uk2DropdownDirective(elementRefMock, rendererMock, matFormFieldComponent, hostMock);
    const getDropDownPanelSpy = spyOn(component, 'getDropDownPanel');
    const customPanelMock = { ...panelMock, scrollHeight: 100, clientHeight: 50 };

    hostMock.setPanelOpen(true);
    getDropDownPanelSpy.and.returnValue(customPanelMock);

    component.addGradientEffect();

    expect(getDropDownPanelSpy).toHaveBeenCalled();
    expect(panelMock.classList.add).toHaveBeenCalledOnceWith('uk2-dropdown-gradient-margin');
  });

  it('should add scroll event on panel when onscroll event isnt exists', () => {
    let component = new Uk2DropdownDirective(elementRefMock, rendererMock, matFormFieldComponent, hostMock);
    const getDropDownPanelSpy = spyOn(component, 'getDropDownPanel');
    const customPanelMock = { ...panelMock, onscroll: null };
    const customPanelMockSpy = spyOn(customPanelMock, 'onscroll');
    customPanelMockSpy.and.returnValue(null);

    hostMock.setPanelOpen(true);
    getDropDownPanelSpy.and.returnValue(customPanelMock);

    component.addGradientEffect();

    expect(getDropDownPanelSpy).toHaveBeenCalled();
    expect(customPanelMock.onscroll).toBeTruthy();
  });

  it('should change panel minWith property calling resizePanel()', () => {
    elementRefMock.nativeElement.closest.and.returnValue(matFormFieldEl);
    component = new Uk2DropdownDirective(elementRefMock, rendererMock, matFormFieldComponent, hostMock);
    matFormFieldEl.clientWidth = 100;
    hostMock.setPanelOpen(true);

    component.resizePanel();

    expect(hostMock.panel.nativeElement.style.minWidth).toBe('96px');
  });

  it('should change classes if changePanelClass is invoked and host in error state', () => {
    elementRefMock.nativeElement.closest.and.returnValue(matFormFieldEl);
    component = new Uk2DropdownDirective(elementRefMock, rendererMock, matFormFieldComponent, hostMock);
    hostMock.panel.nativeElement.closest.and.returnValue(panelMock);
    hostMock.setPanelOpen(true);
    hostMock.ngControl.invalid = true;
    hostMock.ngControl.touched = true;

    component.changePanelClass();

    expect(panelMock.classList.add).toHaveBeenCalledWith('uk2-dropdown-overlay-error');
    expect(panelMock.classList.remove).toHaveBeenCalledWith('uk2-dropdown-overlay-valid');

    hostMock.ngControl.invalid = false;
    hostMock.ngControl.touched = false;
    component.changePanelClass();

    expect(panelMock.classList.remove).toHaveBeenCalledWith('uk2-dropdown-overlay-error');
    expect(panelMock.classList.add).toHaveBeenCalledWith('uk2-dropdown-overlay-valid');

    const getDropDownPanelSpy = spyOn(component, 'getDropDownPanel');
    const nullPanelMock = {
      closest() {
        return null;
      },
    } as any;
    getDropDownPanelSpy.and.returnValue(nullPanelMock);

    panelMock.classList.remove.calls.reset();
    panelMock.classList.add.calls.reset();

    component.changePanelClass();

    expect(panelMock.classList.remove).not.toHaveBeenCalled();
    expect(panelMock.classList.add).not.toHaveBeenCalled();
  });

  it('should return html element calling createLabelContainer()', () => {
    const mockDiv = {};
    const mockLabel = { innerText: '' };
    rendererMock.createElement.and.callFake((name: string) => (name === 'div' ? mockDiv : mockLabel));
    component = new Uk2DropdownDirective(elementRefMock, rendererMock, matFormFieldComponent, hostMock);
    const labelSpy = spyOn(component, 'getLabelText');
    labelSpy.and.returnValue('Options');

    component.createLabelContainer();

    expect(rendererMock.createElement).toHaveBeenCalled();
    expect(rendererMock.appendChild).toHaveBeenCalled();
    expect(labelSpy).toHaveBeenCalledTimes(1);
    expect(rendererMock.addClass).toHaveBeenCalledWith(mockDiv, 'uk2-dropdown-overlay-label-container');
    expect(rendererMock.addClass).toHaveBeenCalledWith(mockLabel, 'uk2-dropdown-overlay-label');
  });

  it('should return label calling getLabelText()', () => {
    const labelEl = {
      querySelector() {
        return {
          textContent: 'Label',
        };
      },
    };
    elementRefMock.nativeElement.closest.and.returnValue(labelEl);

    component = new Uk2DropdownDirective(elementRefMock, rendererMock, matFormFieldComponent, hostMock);

    expect(component.getLabelText()).toBe('Label');

    elementRefMock.nativeElement.closest.and.returnValue({
      querySelector() {
        return null;
      },
    });

    component = new Uk2DropdownDirective(elementRefMock, rendererMock, matFormFieldComponent, hostMock);

    expect(component.getLabelText()).toBe('');
  });

  it('should call renderer2.appendChild when calling createDropdownLabelSection()', () => {
    hostMock.panelOpen = true;
    component = new Uk2DropdownDirective(elementRefMock, rendererMock, matFormFieldComponent, hostMock);
    const divElMock = {} as HTMLElement;
    const createLabelContainerSpy = spyOn(component, 'createLabelContainer');
    const getDropDownPanelSpy = spyOn(component, 'getDropDownPanel');
    const panelMock = {
      parentNode: 'Parent Pane;',
    } as any;
    rendererMock.appendChild.calls.reset();
    createLabelContainerSpy.and.returnValue(divElMock);
    getDropDownPanelSpy.and.returnValue(panelMock);

    component.createDropdownLabelSection();

    expect(rendererMock.appendChild).toHaveBeenCalledOnceWith(panelMock.parentNode, divElMock);
  });

  it('should change flyout styles calling changeOpenCloseClass()', () => {
    hostMock.setPanelOpen(true);
    elementRefMock.nativeElement.closest.and.returnValue(matFormFieldEl);
    hostMock.multiple = true;
    component = new Uk2DropdownDirective(elementRefMock, rendererMock, matFormFieldComponent, hostMock);
    const createDropdownLabelSectionSpy = spyOn(component, 'createDropdownLabelSection');
    const getDropDownPanelSpy = spyOn(component, 'getDropDownPanel');
    const dropdownPanelMock = {
      closest() {
        return panelMock;
      },
    } as any;
    getDropDownPanelSpy.and.returnValue(dropdownPanelMock);
    const isFlyDownAboveSpy = spyOn(component, 'isFlyDownAbove');
    isFlyDownAboveSpy.and.returnValue(true);

    component.changeOpenCloseClass();

    expect(getDropDownPanelSpy).toHaveBeenCalled();
    expect(panelMock.classList.remove).toHaveBeenCalledOnceWith('uk2-dropdown-overlay-below');
    expect(panelMock.classList.add).toHaveBeenCalledWith('uk2-dropdown-overlay-above');
    expect(matFormFieldEl.classList.add).toHaveBeenCalledWith('uk2-dropdown-flyout-above');
    expect(panelMock.classList.add).toHaveBeenCalledWith(UK2_DROPDOWN_CLASSES.multi);
    expect(createDropdownLabelSectionSpy).toHaveBeenCalled();

    isFlyDownAboveSpy.and.returnValue(false);
    panelMock.classList.remove.calls.reset();
    panelMock.classList.add.calls.reset();
    matFormFieldEl.classList.add.calls.reset();
    createDropdownLabelSectionSpy.calls.reset();

    component.changeOpenCloseClass();

    expect(getDropDownPanelSpy).toHaveBeenCalled();
    expect(panelMock.classList.remove).toHaveBeenCalledOnceWith('uk2-dropdown-overlay-above');
    expect(panelMock.classList.add).toHaveBeenCalledWith('uk2-dropdown-overlay-below');
    expect(matFormFieldEl.classList.add).toHaveBeenCalledWith('uk2-dropdown-flyout-bellow');

    expect(createDropdownLabelSectionSpy).not.toHaveBeenCalled();

    component.addScrollEvent();
    expect(getDropDownPanelSpy).toHaveBeenCalled();
    expect(rendererMock.setStyle).toHaveBeenCalled();
  });

  it('should not call renderer if one or both _panelParent and _labelAboveEl are null calling deleteLabelSection()', () => {
    component = new Uk2DropdownDirective(elementRefMock, rendererMock, matFormFieldComponent, hostMock);
    component['_labelAboveEl'] = {};
    component['_panelParent'] = null;

    component.deleteLabelSection();

    expect(rendererMock.removeChild).not.toHaveBeenCalled();

    component['_labelAboveEl'] = null;
    component['_panelParent'] = {};

    component.deleteLabelSection();

    expect(rendererMock.removeChild).not.toHaveBeenCalled();

    component['_labelAboveEl'] = null;
    component['_panelParent'] = null;

    component.deleteLabelSection();

    expect(rendererMock.removeChild).not.toHaveBeenCalled();
  });

  it('should not call renderer if one or both _panelParent and _labelAboveEl are null calling deleteLabelSection()', () => {
    component = new Uk2DropdownDirective(elementRefMock, rendererMock, matFormFieldComponent, hostMock);
    component['_labelAboveEl'] = {};
    component['_panelParent'] = {};

    component.deleteLabelSection();

    expect(rendererMock.removeChild).toHaveBeenCalledTimes(1);
  });

  it('should call [render.setStyle] when [hideDisplayPanelOnClose] is invoked', () => {
    component = new Uk2DropdownDirective(elementRefMock, rendererMock, matFormFieldComponent, hostMock);
    hostMock.setPanelOpen(true);
    hostMock.multiple = false;

    const getDropDownPanelSpy = spyOn(component, 'getDropDownPanel');
    const dropdownPanelMock = {
      closest() {
        return panelMock;
      },
    } as any;
    getDropDownPanelSpy.and.returnValue(dropdownPanelMock);

    component.hideDisplayPanelOnClose();

    expect(getDropDownPanelSpy).toHaveBeenCalled();
    expect(rendererMock.setStyle).toHaveBeenCalled();
  });

  it('should call [classList.replace] when [replaceSizeClass] method is invoked', () => {
    elementRefMock.nativeElement.closest.and.returnValue(matFormFieldEl);
    component = new Uk2DropdownDirective(elementRefMock, rendererMock, matFormFieldComponent, hostMock);

    component.replaceSizeClass('dropdown');

    expect(matFormFieldEl.classList.replace).toHaveBeenCalled();
  });

  it('should call [render.setStyle] when [ngOnChanges] is invoked with a [uk2CSSProperties]', () => {
    component = new Uk2DropdownDirective(elementRefMock, rendererMock, matFormFieldComponent, hostMock);
    hostMock.setPanelOpen(true);
    const getDropDownPanelSpy = spyOn(component, 'getDropDownPanel');
    const dropdownPanelMock = {
      closest() {
        return panelMock;
      },
    } as any;
    getDropDownPanelSpy.and.returnValue(dropdownPanelMock);
    const changes = {
      uk2CSSProperties: {
        currentValue: [
          {
            name: 'name',
            value: 'value',
          },
        ],
      } as SimpleChange,
    };

    component.ngOnChanges(changes);

    expect(getDropDownPanelSpy).toHaveBeenCalled();
    expect(rendererMock.setStyle).toHaveBeenCalled();
  });

  it('should NOT call [render.setStyle] when [ngOnChanges] is invoked with a [uk2CSSProperties]', () => {
    component = new Uk2DropdownDirective(elementRefMock, rendererMock, matFormFieldComponent, hostMock);
    hostMock.setPanelOpen(false);
    const getDropDownPanelSpy = spyOn(component, 'getDropDownPanel');
    const dropdownPanelMock = {
      closest() {
        return panelMock;
      },
    } as any;
    getDropDownPanelSpy.and.returnValue(dropdownPanelMock);
    const changes = {
      uk2CSSProperties: {
        currentValue: [
          {
            name: 'name',
            value: 'value',
          },
        ],
      } as SimpleChange,
    };

    component.ngOnChanges(changes);

    expect(getDropDownPanelSpy).not.toHaveBeenCalled();
    expect(rendererMock.setStyle).not.toHaveBeenCalled();
  });
});
