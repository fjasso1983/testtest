import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Uk2IconRegistryService } from '../../uk2-services/uk2-icon-registry/uk2-icon-registry.service';
import { Uk2BrandTopBarLabeledIconButtonModel, Uk2BrandTopBarRedirectionUrlModel } from './models';
import { uk2BrandTopBarConstants } from './constants/constants';
import { Uk2BrandTopBarComponent } from './uk2-brand-top-bar.component';
import { MatIconTestingModule } from '@angular/material/icon/testing';
import { By } from '@angular/platform-browser';
import { Uk2IsNullOrEmptyPipe } from '../../uk2-internal-utils';
import { Renderer2, ElementRef } from '@angular/core';

describe('Uk2BrandTopBarComponent', () => {
  let component: Uk2BrandTopBarComponent;
  let fixture: ComponentFixture<Uk2BrandTopBarComponent>;
  let service: Uk2IconRegistryService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Uk2BrandTopBarComponent],
      providers: [Uk2IconRegistryService],
      imports: [MatIconTestingModule, Uk2IsNullOrEmptyPipe],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    service = TestBed.inject(Uk2IconRegistryService);
    service.registerAllCategories();
    fixture = TestBed.createComponent(Uk2BrandTopBarComponent);
    component = fixture.componentInstance;
    component.uk2LogoImgPath = '../test.png';
    component.uk2LabeledIconButton = new Uk2BrandTopBarLabeledIconButtonModel({
      svgIconName: 'chevron-left',
      labelText: 'label text',
    });
    component.displayButton = true;
    component.uk2ShowCloseButton = true;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call validateLabeledIconButton and validateRedirectionUrl on ngOnChanges', () => {
    spyOn<any>(component, 'validateLabeledIconButton');
    spyOn<any>(component, 'validateRedirectionUrl');

    component.ngOnChanges();

    expect(component['validateLabeledIconButton']).toHaveBeenCalled();
    expect(component['validateRedirectionUrl']).toHaveBeenCalled();
  });

  it('should correctly show the logo come from uk2LogoImgPath', () => {
    const uk2Logo = fixture.nativeElement.querySelector('.uk2-brand-top-bar-logo');
    expect(uk2Logo.getAttribute('src')).toEqual('../test.png');
  });

  it('should correctly show Label text button', () => {
    const uk2ButtonLabelText = fixture.debugElement.nativeElement.querySelector('#uk2BrandTopBarButton');
    fixture.detectChanges();
    expect(uk2ButtonLabelText.textContent.trim()).toContain('label text');
  });

  it('should emit uk2CallBackButton event when user click button', () => {
    spyOn(component.uk2CallBackButton, 'emit');
    let button = fixture.debugElement.nativeElement.querySelector('#uk2BrandTopBarButton');
    button.click();
    fixture.detectChanges();
    expect(component.uk2CallBackButton.emit).toHaveBeenCalled();
  });

  it('should have uk2HasContextualTopBar set as false by default', () => {
    expect(component.uk2HasContextualTopBar).toBeFalse();
  });

  it('should add .uk2-brand-top-bar-with-contextual-top-bar class when both uk2HasContextualTopBar and uk2IsLoading are true', () => {
    fixture.componentRef.setInput('uk2IsLoading', true);
    fixture.componentRef.setInput('uk2HasContextualTopBar', true);
    fixture.detectChanges();
    const skeletonToolbar = fixture.debugElement.query(By.css('mat-toolbar'));
    expect(skeletonToolbar.nativeElement.classList).toContain('uk2-brand-top-bar-with-contextual-top-bar');
  });

  it('should emit uk2CallBackCloseButton event when user click button', () => {
    spyOn(component.uk2CallBackCloseButton, 'emit');
    let closeButton = fixture.debugElement.nativeElement.querySelector('#uk2BrandTopBarCloseButton');
    closeButton.click();
    fixture.detectChanges();
    expect(component.uk2CallBackCloseButton.emit).toHaveBeenCalled();
  });

  it('should set uk2-brand-top-bar-logo-ria class to logo img if uk2IsAxos is false', () => {
    component.uk2IsAxos = false;
    fixture.detectChanges();
    const uk2Logo = fixture.nativeElement.querySelector('.uk2-brand-top-bar-logo');
    expect(uk2Logo.classList.contains('uk2-brand-top-bar-logo-ria')).toBeTrue();
    expect(uk2Logo.classList.contains('uk2-brand-top-bar-logo-axos')).toBeFalse();
  });

  it('should set uk2-brand-top-bar-logo-axos class to logo img if uk2IsAxos is true', () => {
    component.uk2IsAxos = true;
    fixture.detectChanges();
    const uk2Logo = fixture.nativeElement.querySelector('.uk2-brand-top-bar-logo');
    expect(uk2Logo.classList.contains('uk2-brand-top-bar-logo-ria')).toBeFalse();
    expect(uk2Logo.classList.contains('uk2-brand-top-bar-logo-axos')).toBeTrue();
  });
});

describe('Uk2BrandTopBarComponent', () => {
  let component: Uk2BrandTopBarComponent;
  let fixture: ComponentFixture<Uk2BrandTopBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Uk2BrandTopBarComponent],
      imports: [Uk2IsNullOrEmptyPipe],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Uk2BrandTopBarComponent);
    component = fixture.componentInstance;
    component.uk2LogoImgPath = '../test.png';
    component.uk2LabeledIconButton = new Uk2BrandTopBarLabeledIconButtonModel({
      labelText: 'Test button text',
    });
    fixture.detectChanges();
  });

  it('should Trown Error when uk2LabeledIconButton.svgIconName is invalid or undefined', () => {
    expect(() => component.ngOnChanges()).toThrowError(uk2BrandTopBarConstants.errorMessages.svgIconName);
    component.uk2LabeledIconButton = new Uk2BrandTopBarLabeledIconButtonModel({
      svgIconName: '',
      labelText: 'Test button text',
    });
    fixture.detectChanges();
    expect(() => component.ngOnChanges()).toThrowError(uk2BrandTopBarConstants.errorMessages.svgIconName);
    component.uk2LabeledIconButton = new Uk2BrandTopBarLabeledIconButtonModel({
      svgIconName: null,
      labelText: 'Test button text',
    });
    fixture.detectChanges();
    expect(() => component.ngOnChanges()).toThrowError(uk2BrandTopBarConstants.errorMessages.svgIconName);
  });
});

describe('Uk2BrandTopBarComponent', () => {
  let component: Uk2BrandTopBarComponent;
  let fixture: ComponentFixture<Uk2BrandTopBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Uk2BrandTopBarComponent],
      imports: [Uk2IsNullOrEmptyPipe],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Uk2BrandTopBarComponent);
    component = fixture.componentInstance;
    component.uk2LogoImgPath = '../test.png';
    component.uk2LabeledIconButton = new Uk2BrandTopBarLabeledIconButtonModel({
      svgIconName: 'svg-name',
    });
    fixture.detectChanges();
  });

  it('should Trown Error when uk2LabeledIconButton.labelText is invalid or undefined', () => {
    expect(() => component.ngOnChanges()).toThrowError(uk2BrandTopBarConstants.errorMessages.labelText);
    component.uk2LabeledIconButton = new Uk2BrandTopBarLabeledIconButtonModel({
      svgIconName: 'svg-name',
      labelText: '',
    });
    fixture.detectChanges();
    expect(() => component.ngOnChanges()).toThrowError(uk2BrandTopBarConstants.errorMessages.labelText);
    component.uk2LabeledIconButton = new Uk2BrandTopBarLabeledIconButtonModel({
      svgIconName: 'svg-name',
      labelText: null,
    });
    fixture.detectChanges();
    expect(() => component.ngOnChanges()).toThrowError(uk2BrandTopBarConstants.errorMessages.labelText);
  });

  it('should Trown Error when uk2LabeledIconButton.labelText is invalid or undefined', () => {
    expect(() => component.ngOnChanges()).toThrowError(uk2BrandTopBarConstants.errorMessages.labelText);
    component.uk2LabeledIconButton = new Uk2BrandTopBarLabeledIconButtonModel({
      svgIconName: 'svg-name',
      labelText: '',
    });
    fixture.detectChanges();
    expect(() => component.ngOnChanges()).toThrowError(uk2BrandTopBarConstants.errorMessages.labelText);
    component.uk2LabeledIconButton = new Uk2BrandTopBarLabeledIconButtonModel({
      svgIconName: 'svg-name',
      labelText: null,
    });
    fixture.detectChanges();
    expect(() => component.ngOnChanges()).toThrowError(uk2BrandTopBarConstants.errorMessages.labelText);
  });
});

describe('Uk2BrandTopBarComponent', () => {
  let component: Uk2BrandTopBarComponent;
  let fixture: ComponentFixture<Uk2BrandTopBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Uk2BrandTopBarComponent],
      imports: [Uk2IsNullOrEmptyPipe],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Uk2BrandTopBarComponent);
    component = fixture.componentInstance;
    component.uk2LogoImgPath = '../test.png';
    component.uk2LabeledIconButton = new Uk2BrandTopBarLabeledIconButtonModel({
      svgIconName: 'svg-name',
    });
    fixture.detectChanges();
  });

  it('should validate redirection url', () => {
    component.uk2LogoRedirectionUrl = { url: 'http://example.com', openOnNewTab: true };
    component['validateRedirectionUrl']();
    fixture.detectChanges();
    expect(component.showRedirectionLink()).toBeTrue();
  });

  it('should return _blank for setRedirectionTarget', () => {
    component.uk2LogoRedirectionUrl = { url: 'http://example.com', openOnNewTab: true };
    expect(component.setRedirectionTarget()).toEqual('_blank');
  });

  it('should return empty string for setRedirectionTarget', () => {
    component.uk2LogoRedirectionUrl = { url: 'http://example.com', openOnNewTab: false };
    expect(component.setRedirectionTarget()).toEqual('');
  });

  it('should show redirection link', () => {
    component.uk2LogoRedirectionUrl = { url: 'http://example.com', openOnNewTab: true };
    expect(component.showRedirectionLink()).toBeTrue();
  });

  it('should not show redirection link', () => {
    component.uk2LogoRedirectionUrl = undefined;
    expect(component.showRedirectionLink()).toBeFalse();
  });

  it('should not throw error when uk2LogoRedirectionUrl is undefined', () => {
    component.uk2LogoRedirectionUrl = undefined;
    expect(() => component['validateRedirectionUrl']()).not.toThrow();
  });

  it('should throw error when uk2LogoRedirectionUrl.url is an empty string', () => {
    component.uk2LogoRedirectionUrl = { url: '', openOnNewTab: true };
    expect(() => component['validateRedirectionUrl']()).toThrowError(uk2BrandTopBarConstants.errorMessages.url);
  });

  it('should create default Uk2BrandTopBarLabeledIconButtonModel', () => {
    const redirectionConfig: Uk2BrandTopBarRedirectionUrlModel = new Uk2BrandTopBarRedirectionUrlModel();

    expect(redirectionConfig.url).toEqual('');
    expect(redirectionConfig.openOnNewTab).toEqual(true);
  });

  it('should be true if uk2LogoImgPath is a falsy value', () => {
    // @ts-ignore
    component.uk2LogoImgPath = undefined;
    expect(component.hasEmptyOrNullUk2LogoImgPath).toBeTrue();
    // @ts-ignore
    component.uk2LogoImgPath = null;
    expect(component.hasEmptyOrNullUk2LogoImgPath).toBeTrue();
    // @ts-ignore
    component.uk2LogoImgPath = '';
    expect(component.hasEmptyOrNullUk2LogoImgPath).toBeTrue();
  });

  it('should be false if uk2LogoImgPath is a truthy value', () => {
    component.uk2LogoImgPath = '../test.png';
    expect(component.hasEmptyOrNullUk2LogoImgPath).toBeFalse();
  });

  it('should be uk2LogoImgPath on desktop screen', () => {
    component.isMobileScreen = false;
    component.uk2LogoImgPath = 'desktop.png';
    expect(component.uk2ImageResponsiveLogoSRC).toEqual('desktop.png');
  });

  it('should be uk2LogoImgPath on mobile screen if uk2MobileLogoPath is empty', () => {
    component.isMobileScreen = true;
    component.uk2MobileLogoPath = '';
    component.uk2LogoImgPath = 'desktop.png';
    expect(component.uk2ImageResponsiveLogoSRC).toEqual('desktop.png');
  });

  it('should be uk2MobileLogoPath on mobile screen', () => {
    component.isMobileScreen = true;
    component.uk2MobileLogoPath = 'mobile.png';
    component.uk2LogoImgPath = 'desktop.png';
    expect(component.uk2ImageResponsiveLogoSRC).toEqual('mobile.png');
  });
});

describe('Uk2BrandTopBarComponent', () => {
  let component: Uk2BrandTopBarComponent;
  let fixture: ComponentFixture<Uk2BrandTopBarComponent>;
  let renderer: jasmine.SpyObj<Renderer2>;
  let el: ElementRef;

  beforeEach(async () => {
    const rendererSpy = jasmine.createSpyObj('Renderer2', ['addClass', 'removeClass']);

    await TestBed.configureTestingModule({
      declarations: [Uk2BrandTopBarComponent],
      providers: [
        { provide: Renderer2, useValue: rendererSpy },
        { provide: ElementRef, useValue: { nativeElement: document.createElement('div') } },
      ],
      imports: [Uk2IsNullOrEmptyPipe],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(Uk2BrandTopBarComponent);
    component = fixture.componentInstance;
    renderer = TestBed.inject(Renderer2) as jasmine.SpyObj<Renderer2>;
    el = TestBed.inject(ElementRef);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('listenToWindowResize', () => {
    it('should call onWindowScroll on resize', () => {
      spyOn<any>(component, 'onWindowScroll');
      component['listenToWindowResize']();
      window.dispatchEvent(new Event('resize'));
      expect(component['onWindowScroll']).toHaveBeenCalled();
    });
  });

  describe('checkContextualTopBarTabs', () => {
    it('should set contextualTopBarElement, contextualTopBarTabsElement', () => {
      const mockElement = document.createElement('div');
      spyOn(document, 'querySelector').and.returnValue(mockElement);
      spyOn(el.nativeElement, 'querySelector').and.returnValue(mockElement);

      component['checkContextualTopBarTabs']();

      expect(component['contextualTopBarElement']).toBe(mockElement);
      expect(component['contextualTopBarTabsElement']).toBe(mockElement);
    });
  });

  describe('onWindowScroll', () => {
    it('should add class when contextualTopBarElement is below contextualTopBarTabsElement', () => {
      const mockElement = document.createElement('div');
      spyOn(mockElement, 'getBoundingClientRect').and.returnValue({
        top: 10,
        height: 0,
        width: 0,
        x: 0,
        y: 0,
        bottom: 0,
        left: 0,
        right: 0,
        toJSON: function () {
          throw new Error('Function not implemented.');
        },
      });
      component['contextualTopBarElement'] = mockElement;
      component['contextualTopBarTabsElement'] = mockElement;
      component['targetElementBottomBorder'] = mockElement;
      component['isMobileScreen'] = true;
      renderer.addClass(mockElement, 'uk2-top-bar-above-contextual-bar');
      component['onWindowScroll']();

      expect(component['targetElementBottomBorder'].classList.contains('uk2-top-bar-above-contextual-bar')).toBeFalse();
    });

    it('should remove class when contextualTopBarElement is above contextualTopBarTabsElement', () => {
      const mockElement = document.createElement('div');
      spyOn(mockElement, 'getBoundingClientRect').and.returnValue({
        top: 30,
        height: 0,
        width: 0,
        x: 0,
        y: 0,
        bottom: 0,
        left: 0,
        right: 0,
        toJSON: function () {
          throw new Error('Function not implemented.');
        },
      });
      component['contextualTopBarElement'] = mockElement;
      component['contextualTopBarTabsElement'] = mockElement;
      component['targetElementBottomBorder'] = mockElement;
      component['isMobileScreen'] = true;

      component['onWindowScroll']();

      expect(component['targetElementBottomBorder'].classList.contains('uk2-top-bar-above-contextual-bar')).toBeTrue();
    });
  });

  it('should call checkContextualTopBarTabs and onWindowScroll on window scroll', () => {
    spyOn<any>(component, 'checkContextualTopBarTabs');
    spyOn<any>(component, 'onWindowScroll');

    window.dispatchEvent(new Event('scroll'));

    expect(component['checkContextualTopBarTabs']).toHaveBeenCalled();
    expect(component['onWindowScroll']).toHaveBeenCalled();
  });
});
