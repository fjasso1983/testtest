import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { Uk2MessagingCardComponent } from './uk2-messaging-card.component';
import {
  uk2MessagingCardAlertConfig,
  uk2MessagingCardDefaultConfig,
  uk2MessagingCardErrorConstants,
  uk2MessagingCardInformConfig,
} from './constants';
import { Uk2MessagingCardTypeEnum } from './enums';
import { NO_ERRORS_SCHEMA, SimpleChange } from '@angular/core';
import { MatIconTestingModule } from '@angular/material/icon/testing';
import { MatExpansionModule } from '@angular/material/expansion';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('Uk2MessagingCardComponent', () => {
  let component: Uk2MessagingCardComponent;
  let fixture: ComponentFixture<Uk2MessagingCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Uk2MessagingCardComponent],
      imports: [MatIconTestingModule, MatExpansionModule, BrowserAnimationsModule],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(Uk2MessagingCardComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should Throw Error if uk2MessagingCardHeaderText have length == 0', () => {
    component.uk2MessagingCardHeaderText = '';
    expect(() => component.validateInput()).toThrowError(uk2MessagingCardErrorConstants.errorEmptyTitle);
  });

  it('should Throw Error if uk2MessagingCardSvgIconName is not null and uk2MessagingCardType == Uk2MessagingCardTypeEnum.alert', () => {
    component.uk2MessagingCardHeaderText = 'Hello';
    component.uk2MessagingCardSvgIconName = 'uk2-x';
    component.uk2MessagingCardType = Uk2MessagingCardTypeEnum.alert;
    expect(() => component.validateInput()).toThrowError(uk2MessagingCardErrorConstants.errorIconAlert);
  });

  it('should set alert Configuration if uk2MessagingCardType is alert', () => {
    component.uk2MessagingCardHeaderText = 'Hello';
    component.uk2MessagingCardSvgIconName = '';
    component.uk2MessagingCardType = Uk2MessagingCardTypeEnum.alert;
    component.uk2MessagingCardShowIcon = false;
    fixture.detectChanges();
    component.applyTheme();
    fixture.detectChanges();
    expect(component.configMessagingCard.class).toEqual(uk2MessagingCardAlertConfig.class);
    expect(component.configMessagingCard.svgIconName).toEqual(uk2MessagingCardAlertConfig.svgIconName);
    const componentElement = fixture.elementRef.nativeElement.querySelector('.uk2-messaging-card');
    expect(componentElement.classList.contains('uk2-messaging-card-alert')).toBeTrue();
    expect(component.uk2MessagingCardShowIcon).toBeTrue();
  });

  it('should set inform Configuration if uk2MessagingCardType is inform', () => {
    component.uk2MessagingCardHeaderText = 'Hello';
    component.uk2MessagingCardSvgIconName = '';
    component.uk2MessagingCardType = Uk2MessagingCardTypeEnum.inform;
    fixture.detectChanges();
    component.applyTheme();
    fixture.detectChanges();
    expect(component.configMessagingCard.class).toEqual(uk2MessagingCardInformConfig.class);
    expect(component.configMessagingCard.svgIconName).toEqual(uk2MessagingCardInformConfig.svgIconName);
    const componentElement = fixture.elementRef.nativeElement.querySelector('.uk2-messaging-card');
    expect(componentElement.classList.contains('uk2-messaging-card-inform')).toBeTrue();
  });

  it('should set default Configuration if uk2MessagingCardType is default', () => {
    component.uk2MessagingCardHeaderText = 'Hello';
    component.uk2MessagingCardSvgIconName = '';
    component.uk2MessagingCardType = Uk2MessagingCardTypeEnum.default;
    fixture.detectChanges();
    component.applyTheme();
    expect(component.configMessagingCard.class).toEqual(uk2MessagingCardDefaultConfig.class);
    expect(component.configMessagingCard.svgIconName).toEqual(uk2MessagingCardDefaultConfig.svgIconName);
    const componentElement = fixture.elementRef.nativeElement.querySelector('.uk2-messaging-card');
    expect(componentElement.classList.contains('uk2-messaging-card-default')).toBeTrue();
  });

  it('should apply custom icon if uk2MessagingCardType != Alert', () => {
    component.uk2MessagingCardHeaderText = 'Hello';
    component.uk2MessagingCardSvgIconName = 'uk2-x';
    component.uk2MessagingCardType = Uk2MessagingCardTypeEnum.inform;
    fixture.detectChanges();
    component.applyTheme();
    expect(component.configMessagingCard.svgIconName).toEqual('uk2-x');
  });

  it('should set uk2-messaging-card-status class if uk2MessagingCardIsExpandable == true', () => {
    component.uk2MessagingCardHeaderText = 'Hello';
    component.uk2MessagingCardSvgIconName = '';
    component.uk2MessagingCardType = Uk2MessagingCardTypeEnum.default;
    fixture.detectChanges();
    component.uk2MessagingCardIsExpandable = true;
    fixture.detectChanges();
    const componentElement = fixture.elementRef.nativeElement.querySelector('.uk2-messaging-card');
    expect(componentElement.classList.contains('uk2-messaging-card-expandable')).toBeTrue();
  });

  it('should NOT set uk2-messaging-card-expandable class if uk2MessagingCardIsExpandable == false', () => {
    component.uk2MessagingCardHeaderText = 'Hello';
    component.uk2MessagingCardSvgIconName = '';
    component.uk2MessagingCardType = Uk2MessagingCardTypeEnum.default;
    fixture.detectChanges();
    component.uk2MessagingCardIsExpandable = false;
    fixture.detectChanges();
    const componentElement = fixture.elementRef.nativeElement.querySelector('.uk2-messaging-card');
    expect(componentElement.classList.contains('uk2-messaging-card-expandable')).toBeFalse();
  });

  it('should call applyTheme onChanges when Type change', () => {
    component.uk2MessagingCardHeaderText = 'Hello';
    fixture.detectChanges();
    const applyThemeSpy = spyOn(component, 'applyTheme').and.callThrough();
    component.ngOnChanges({
      uk2MessagingCardType: new SimpleChange(Uk2MessagingCardTypeEnum.default, Uk2MessagingCardTypeEnum.alert, true),
    });
    expect(applyThemeSpy).toHaveBeenCalled();
  });

  it('should call applyTheme onChanges when Icon change', () => {
    component.uk2MessagingCardHeaderText = 'Hello';
    component.uk2MessagingCardSvgIconName = '';
    fixture.detectChanges();
    const applyThemeSpy = spyOn(component, 'applyTheme').and.callThrough();
    component.ngOnChanges({
      uk2MessagingCardSvgIconName: new SimpleChange('', 'uk2-cog', true),
    });
    expect(applyThemeSpy).toHaveBeenCalled();
  });

  it('should not apply uk2MessagingCardIsExpanded to true if uk2MessagingCardIsExpandable == false ', () => {
    component.uk2MessagingCardHeaderText = 'Hello';
    component.uk2MessagingCardIsExpandable = false;
    component.uk2MessagingCardIsExpanded = false;
    fixture.detectChanges();
    component.ngOnChanges({
      uk2MessagingCardIsExpanded: new SimpleChange(false, true, true),
    });
    expect(component.uk2MessagingCardIsExpanded).toBeFalse();
  });

  it('should apply correct Change on uk2MessagingCardIsExpandable change to true', () => {
    component.uk2MessagingCardHeaderText = 'Hello';
    component.uk2MessagingCardIsExpandable = false;
    fixture.detectChanges();
    const applyThemeSpy = spyOn(component, 'applyTheme').and.callThrough();
    fixture.detectChanges();
    component.ngOnChanges({
      uk2MessagingCardIsExpandable: new SimpleChange(false, true, true),
    });
    expect(component.uk2MessagingCardIsExpandable).toBeTrue();
    expect(applyThemeSpy).toHaveBeenCalled();
  });

  it('should apply correct Change on uk2MessagingCardIsExpandable change to false', () => {
    component.uk2MessagingCardHeaderText = 'Hello';
    component.uk2MessagingCardIsExpandable = true;
    fixture.detectChanges();
    const applyThemeSpy = spyOn(component, 'applyTheme').and.callThrough();
    fixture.detectChanges();
    component.ngOnChanges({
      uk2MessagingCardIsExpandable: new SimpleChange(true, false, true),
    });
    expect(component.uk2MessagingCardIsExpandable).toBeFalse();
    expect(component.uk2MessagingCardIsExpanded).toBeFalse();
    expect(applyThemeSpy).toHaveBeenCalled();
  });

  it('should inverse value of uk2MessagingCardIsExpanded on toggleExpand()', () => {
    component.uk2MessagingCardHeaderText = 'Hello';
    component.uk2MessagingCardIsExpanded = false;
    fixture.detectChanges();
    component.toggleExpand();
    expect(component.uk2MessagingCardIsExpanded).toBeTrue();
    component.toggleExpand();
    expect(component.uk2MessagingCardIsExpanded).toBeFalse();
  });
});
