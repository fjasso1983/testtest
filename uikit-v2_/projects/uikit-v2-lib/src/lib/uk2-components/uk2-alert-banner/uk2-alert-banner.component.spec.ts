import { ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { Uk2AlertBannerComponent } from './uk2-alert-banner.component';
import { uk2AlertBannerErrorConstants } from './constants/constants';
import { Uk2AlertBannerBehaviorEnum, Uk2AlertBannerTypeEnum } from './enums';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Uk2Tier1AlertsEnum } from '../../uk2-services';

describe('Uk2AlertBannerComponent', () => {
  let component: Uk2AlertBannerComponent;
  let fixture: ComponentFixture<Uk2AlertBannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Uk2AlertBannerComponent],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(Uk2AlertBannerComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should Throw Error if uk2AlertBannerType is undefined', () => {
    component.uk2AlertBannerType = undefined;
    expect(() => component.validateInput()).toThrowError(uk2AlertBannerErrorConstants.errorAlertBannerType);
  });

  it('should Throw Error if uk2AlertBannerType is invalid', () => {
    component.uk2AlertBannerType = 'invalidType' as Uk2AlertBannerTypeEnum;
    expect(() => component.validateInput()).toThrowError(uk2AlertBannerErrorConstants.errorAlertBannerType);
  });

  it('should Throw Error if uk2AlertBannerBehavior is undefined', () => {
    component.uk2AlertBannerType = Uk2AlertBannerTypeEnum.inform;
    component.uk2AlertBannerBehavior = undefined;
    expect(() => component.validateInput()).toThrowError(uk2AlertBannerErrorConstants.errorAlertBannerBehavior);
  });

  it('should Throw Error if uk2AlertBannerBehavior is invalid', () => {
    component.uk2AlertBannerType = Uk2AlertBannerTypeEnum.inform;
    component.uk2AlertBannerBehavior = 'invalidType' as Uk2AlertBannerBehaviorEnum;
    expect(() => component.validateInput()).toThrowError(uk2AlertBannerErrorConstants.errorAlertBannerBehavior);
  });

  it('should Throw Error if uk2AlertBannerBodyText is empty', () => {
    component.uk2AlertBannerBehavior = Uk2AlertBannerBehaviorEnum.dismissible;
    component.uk2AlertBannerType = Uk2AlertBannerTypeEnum.inform;
    component.uk2AlertBannerBodyText = '';
    expect(() => component.validateInput()).toThrowError(uk2AlertBannerErrorConstants.errorAlertBannerBodyText);
  });

  it('should set default Icon to exclamationTriangle if uk2AlertBannerType is alert', () => {
    component.uk2AlertBannerType = Uk2AlertBannerTypeEnum.alert;
    component.uk2AlertBannerSvgIconName = '';
    component.setDefaultIcon();
    expect(component.svgIconNameToDisplay).toEqual(Uk2Tier1AlertsEnum.exclamationTriangle);
  });

  it('should set default Icon to infoCircle if uk2AlertBannerType is inform', () => {
    component.uk2AlertBannerType = Uk2AlertBannerTypeEnum.inform;
    component.uk2AlertBannerSvgIconName = '';
    component.setDefaultIcon();
    expect(component.svgIconNameToDisplay).toEqual(Uk2Tier1AlertsEnum.infoCircle);
  });

  it('should display uk2AlertBannerSvgIconName if not empty', () => {
    component.uk2AlertBannerType = Uk2AlertBannerTypeEnum.inform;
    component.uk2AlertBannerSvgIconName = 'uk2-x-circle';
    component.setDefaultIcon();
    expect(component.svgIconNameToDisplay).toEqual(Uk2Tier1AlertsEnum.xCircle);
  });

  it('should call validateInput and setDefaultIcon on NgOnInit', () => {
    component.uk2AlertBannerBehavior = Uk2AlertBannerBehaviorEnum.dismissible;
    component.uk2AlertBannerType = Uk2AlertBannerTypeEnum.inform;
    component.uk2AlertBannerBodyText = 'test';
    const validateInputSpy = spyOn(component, 'validateInput').and.callThrough();
    const setDefaultIconSpy = spyOn(component, 'setDefaultIcon').and.callThrough();
    component.ngOnInit();
    fixture.detectChanges();
    expect(validateInputSpy).toHaveBeenCalled();
    expect(setDefaultIconSpy).toHaveBeenCalled();
  });

  it('should emit uk2AlertBannerDismissBannerAction on click on closeButton', fakeAsync(() => {
    component.uk2AlertBannerBehavior = Uk2AlertBannerBehaviorEnum.dismissible;
    component.uk2AlertBannerType = Uk2AlertBannerTypeEnum.inform;
    component.uk2AlertBannerBodyText = 'test';
    fixture.detectChanges();
    const closeButton = fixture.elementRef.nativeElement.querySelector('.uk2-alert-banner-dismiss-button');
    const dismissBannerActionSpy = spyOn(component, 'dismissBannerAction').and.callThrough();
    spyOn(component.uk2AlertBannerDismissBannerAction, 'emit');
    closeButton.click();
    expect(dismissBannerActionSpy).toHaveBeenCalled();
    tick(499);
    expect(component.uk2AlertBannerDismissBannerAction.emit).not.toHaveBeenCalled();
    tick(2);
    expect(component.uk2AlertBannerDismissBannerAction.emit).toHaveBeenCalled();
  }));

  it('should emit urlBannerAction on click on hyperLink click', () => {
    component.uk2AlertBannerBehavior = Uk2AlertBannerBehaviorEnum.dismissible;
    component.uk2AlertBannerType = Uk2AlertBannerTypeEnum.inform;
    component.uk2AlertBannerBodyText = 'test';
    component.uk2AlertBannerHyperlinkText = 'test';
    fixture.detectChanges();
    const hyperlink = fixture.elementRef.nativeElement.querySelector('#uk2AlertBannerHyperlink');
    const urlBannerActionSpy = spyOn(component, 'urlBannerAction').and.callThrough();
    spyOn(component.uk2AlertBannerHyperlinkAction, 'emit');
    hyperlink.click();
    expect(urlBannerActionSpy).toHaveBeenCalled();
    expect(component.uk2AlertBannerHyperlinkAction.emit).toHaveBeenCalled();
  });

  it('should apply uk2-alert-banner-alert class if uk2AlertBannerType == alert', () => {
    component.uk2AlertBannerType = Uk2AlertBannerTypeEnum.alert;
    component.uk2AlertBannerBehavior = Uk2AlertBannerBehaviorEnum.dismissible;
    component.uk2AlertBannerBodyText = 'test';
    component.uk2AlertbannerAnimateOnDisplay = false;
    fixture.detectChanges();
    const componentElement = fixture.elementRef.nativeElement.querySelector('.uk2-alert-banner-container');
    expect(componentElement.classList.contains('uk2-alert-banner-alert')).toBeTrue();
  });

  it('should apply uk2-alert-banner-inform class if uk2AlertBannerType == inform', () => {
    component.uk2AlertBannerType = Uk2AlertBannerTypeEnum.inform;
    component.uk2AlertBannerBehavior = Uk2AlertBannerBehaviorEnum.dismissible;
    component.uk2AlertBannerBodyText = 'test';
    component.uk2AlertbannerAnimateOnDisplay = false;
    fixture.detectChanges();
    const componentElement = fixture.elementRef.nativeElement.querySelector('.uk2-alert-banner-container');
    expect(componentElement.classList.contains('uk2-alert-banner-inform')).toBeTrue();
  });

  it('should return empty class if type is invalid', () => {
    component.uk2AlertBannerType = 'invalidType' as Uk2AlertBannerTypeEnum;
    component.uk2AlertBannerBehavior = Uk2AlertBannerBehaviorEnum.dismissible;
    component.uk2AlertBannerBodyText = 'test';
    component.uk2AlertbannerAnimateOnDisplay = false;
    var result = component.getClasses();
    expect(result).toBe('');
  });

  it('should return uk2-alert-banner-animation class if uk2AlertbannerAnimateOnDisplay == true', () => {
    component.uk2AlertBannerType = 'invalidType' as Uk2AlertBannerTypeEnum;
    component.uk2AlertBannerBehavior = Uk2AlertBannerBehaviorEnum.dismissible;
    component.uk2AlertBannerBodyText = 'test';
    component.uk2AlertbannerAnimateOnDisplay = true;
    var result = component.getAnimationClasses();
    expect(result).toContain('uk2-alert-banner-animation');
  });

  it('should return uk2-alert-banner-dismiss-animation class if dismissClick == true', () => {
    component.uk2AlertBannerBehavior = Uk2AlertBannerBehaviorEnum.dismissible;
    component.uk2AlertBannerBodyText = 'test';
    component.uk2AlertbannerAnimateOnDisplay = true;
    component.dismissClick = true;
    var result = component.getAnimationClasses();
    expect(result).toContain('uk2-alert-banner-dismiss-animation');
  });

  it('should display close Button if Uk2AlertBannerBehavior is dismissible', () => {
    component.uk2AlertBannerType = Uk2AlertBannerTypeEnum.inform;
    component.uk2AlertBannerBehavior = Uk2AlertBannerBehaviorEnum.dismissible;
    component.uk2AlertBannerBodyText = 'test';
    fixture.detectChanges();
    const closButtonElement = fixture.elementRef.nativeElement.querySelector('.uk2-alert-banner-dismiss-container');
    expect(closButtonElement).toBeDefined;
  });

  it('should display close Button if Uk2AlertBannerBehavior is persistent', () => {
    component.uk2AlertBannerType = Uk2AlertBannerTypeEnum.inform;
    component.uk2AlertBannerBehavior = Uk2AlertBannerBehaviorEnum.persistent;
    component.uk2AlertBannerBodyText = 'test';
    fixture.detectChanges();
    const closButtonElement = fixture.elementRef.nativeElement.querySelector('.uk2-alert-banner-dismiss-container');
    expect(closButtonElement).not.toBeDefined;
  });

  it('isDismissible() should return true if Uk2AlertBannerBehavior is dismissible', () => {
    component.uk2AlertBannerType = Uk2AlertBannerTypeEnum.inform;
    component.uk2AlertBannerBehavior = Uk2AlertBannerBehaviorEnum.dismissible;
    component.uk2AlertBannerBodyText = 'test';
    fixture.detectChanges();
    const result = component.isDismissible();
    expect(result).toBeTrue;
  });

  it('isDismissible() should return false if Uk2AlertBannerBehavior is persistent', () => {
    component.uk2AlertBannerType = Uk2AlertBannerTypeEnum.inform;
    component.uk2AlertBannerBehavior = Uk2AlertBannerBehaviorEnum.persistent;
    component.uk2AlertBannerBodyText = 'test';
    fixture.detectChanges();
    const result = component.isDismissible();
    expect(result).toBeTrue;
  });

  it('should call setDefaultIcon on Uk2AlertBannerType  change', () => {
    const setDefaultIconSpy = spyOn(component, 'setDefaultIcon').and.callThrough();
    component.uk2AlertBannerType = Uk2AlertBannerTypeEnum.inform;
    component.uk2AlertBannerBehavior = Uk2AlertBannerBehaviorEnum.persistent;
    component.uk2AlertBannerBodyText = 'test';
    fixture.detectChanges();
    component.uk2AlertBannerType = Uk2AlertBannerTypeEnum.alert;
    component.ngOnChanges();
    expect(setDefaultIconSpy).toHaveBeenCalled();
    expect(component.svgIconNameToDisplay).toEqual(Uk2Tier1AlertsEnum.exclamationTriangle);
  });

  it('should call setDefaultIcon on uk2AlertBannerSvgIconName change', () => {
    const setDefaultIconSpy = spyOn(component, 'setDefaultIcon').and.callThrough();
    component.uk2AlertBannerType = Uk2AlertBannerTypeEnum.inform;
    component.uk2AlertBannerBehavior = Uk2AlertBannerBehaviorEnum.persistent;
    component.uk2AlertBannerBodyText = 'test';
    fixture.detectChanges();
    component.uk2AlertBannerSvgIconName = Uk2Tier1AlertsEnum.xCircle;
    component.ngOnChanges();
    expect(setDefaultIconSpy).toHaveBeenCalled();
    expect(component.svgIconNameToDisplay).toEqual(Uk2Tier1AlertsEnum.xCircle);
  });
});
