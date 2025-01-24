import { of } from 'rxjs';

export const getMatFormField = (): any => ({
  classList: {
    contains: jasmine.createSpy(),
    remove: jasmine.createSpy(),
    add: jasmine.createSpy(),
    replace: jasmine.createSpy(),
  },
  attributes: {
    getNamedItem: jasmine.createSpy(),
  },
  clientWidth: 0,
});

export const getPanel = (): any => ({
  classList: {
    add: jasmine.createSpy(),
    remove: jasmine.createSpy(),
  },
  style: {
    transformOrigin: '',
  },
});

export const getElementRef = (): any => ({
  nativeElement: {
    closest: jasmine.createSpy(),
    parentElement: {
      querySelector: jasmine.createSpy(),
    },
  },
});

export const getRenderer = (): any => ({
  createElement: jasmine.createSpy(),
  addClass: jasmine.createSpy(),
  removeClass: jasmine.createSpy(),
  removeStyle: jasmine.createSpy(),
  setStyle: jasmine.createSpy(),
  insertBefore: jasmine.createSpy(),
  appendChild: jasmine.createSpy(),
  removeChild: jasmine.createSpy(),
});

export const getNgZone = (): any => ({
  onStable: {
    pipe() {
      return {
        subscribe(cb: any) {
          cb();
        },
      };
    },
  },
});

export const getHost = (): any => ({
  panelOpen: false,
  value: '',
  multiple: false,
  overlayDir: {
    backdropClick: {
      pipe() {
        return {
          subscribe(cb: any) {
            cb();
          },
        };
      },
    },
  },
  stateChanges: {
    pipe() {
      return of();
    },
  },
  panel: {
    nativeElement: {
      classList: {
        add: jasmine.createSpy(),
        remove: jasmine.createSpy(),
      },
      style: {},
      querySelector: jasmine.createSpy(),
      closest: jasmine.createSpy(),
    },
  },
  querySelector: jasmine.createSpy(),
  setPanelOpen(value: boolean) {
    this.panelOpen = value;
  },
  setValue(value: any) {
    this.value = value;
  },
  close: jasmine.createSpy(),
  errorState: false,
  ngControl: {
    invalid: false,
    touched: false,
  },
  _overlayDir: {
    overlayRef: {
      updatePosition: jasmine.createSpy(),
    },
  },
  disableRipple: false,
});

export const getHintEl = () => ({
  classList: {
    add: jasmine.createSpy(),
  },
  innerText: '',
});

export const getMatFormFieldComponent = (): any => ({
  hintLabel: '',
});
