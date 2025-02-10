import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA, SimpleChange } from '@angular/core';
import { By } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { BreakpointObserver } from '@angular/cdk/layout';
import { MatIconTestingModule } from '@angular/material/icon/testing';
import { MatIconModule } from '@angular/material/icon';

import { of } from 'rxjs';
import { Uk2IconRegistryService } from '@axos/uikit-v2-lib';

import {
  Uk2TooltipArrowEnum,
  Uk2TooltipPlacementEnum,
  Uk2TooltipSizeEnum,
  Uk2TooltipStrategyEnum,
  Uk2TooltipTriggerEnum,
} from './enums';
import { Uk2TooltipComponent } from './uk2-tooltip.component';
import { uk2TooltipErrorConstants } from './constants/constants';

describe('Uk2TooltipComponent extern box test =>', () => {
  let component: Uk2TooltipComponent;
  let fixture: ComponentFixture<Uk2TooltipComponent>;
  let service: Uk2IconRegistryService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Uk2TooltipComponent],
      imports: [MatIconTestingModule, MatIconModule, HttpClientModule],
      providers: [Uk2IconRegistryService],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    service = TestBed.inject(Uk2IconRegistryService);
    service.registerAllCategories();
    fixture = TestBed.createComponent(Uk2TooltipComponent);
    component = fixture.componentInstance;
    component.labelText = 'labelText';
    component.svgIconName = 'svgIconName';
    component.bodyText = 'bodyText';
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display the tooltip label text correctly', () => {
    component.uk2IsLoading = false;
    component.labelText = 'Tooltip label text';
    fixture.detectChanges();
    const label = fixture.debugElement.nativeElement.querySelector('.uk2-tooltip-label-text');
    expect(label?.textContent).toContain('Tooltip label text');
  });

  it('should add correct size class', () => {
    component.uk2IsLoading = false;
    component.size = Uk2TooltipSizeEnum.large;
    fixture.detectChanges();
    let label = fixture.debugElement.nativeElement.querySelector('.uk2-tooltip-label-text');
    let icon = fixture.debugElement.nativeElement.querySelector('.uk2-tooltip-button');
    expect(label?.classList).toContain('uk2-tooltip-label-text-large');
    expect(icon?.classList).toContain('uk2-tooltip-button-large');

    component.size = Uk2TooltipSizeEnum.small;
    fixture.detectChanges();

    label = fixture.debugElement.nativeElement.querySelector('.uk2-tooltip-label-text');
    icon = fixture.debugElement.nativeElement.querySelector('.uk2-tooltip-button');
    expect(label?.classList).toContain('uk2-tooltip-label-text-small');
    expect(icon?.classList).toContain('uk2-tooltip-button-small');

    component.size = Uk2TooltipSizeEnum.medium;
    fixture.detectChanges();

    label = fixture.debugElement.nativeElement.querySelector('.uk2-tooltip-label-text');
    icon = fixture.debugElement.nativeElement.querySelector('.uk2-tooltip-button');
    expect(label?.classList).toContain('uk2-tooltip-label-text-medium');
    expect(icon?.classList).toContain('uk2-tooltip-button-medium');
  });
});

describe('Uk2TooltipComponent', () => {
  let component: Uk2TooltipComponent;
  let fixture: ComponentFixture<Uk2TooltipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Uk2TooltipComponent],
      providers: [Uk2IconRegistryService],
      imports: [MatIconTestingModule, MatIconModule, HttpClientModule],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Uk2TooltipComponent);
    component = fixture.componentInstance;
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should Throw Error if bodyText is empty', () => {
    component.bodyText = '';
    component.svgIconName = 'svgIconName';
    component.labelText = 'labelText';
    expect(() => fixture.detectChanges()).toThrowError(uk2TooltipErrorConstants.errorBodyText);
  });

  it('should Throw Error if svgIconName is empty', () => {
    component.svgIconName = '';
    component.bodyText = 'bodyText';
    component.labelText = 'labelText';
    expect(() => fixture.detectChanges()).toThrowError(uk2TooltipErrorConstants.errorSvgIconName);
  });

  it('should display only body text', () => {
    component.bodyText = 'test';
    component.svgIconName = 'svgIconName';
    component.labelText = 'labelText';
    const newDiv = document.createElement('div');
    component.uk2TooltipHtmlContent = { nativeElement: { childNodes: [] }};
    component.uk2TooltipIconButton = { nativeElement: newDiv};
    component.uk2TooltipContainer = { nativeElement: newDiv};
    component.ngAfterViewInit();
    expect(component.displayBodyText).toBeTruthy();
    fixture.detectChanges();
    const uk2TooltipBodyText = fixture.debugElement.query(By.css('#uk2-Tooltip-body-text')).nativeElement as HTMLElement;
    expect(uk2TooltipBodyText).not.toBeNull();
    expect(uk2TooltipBodyText.textContent).toContain('test');
  });

  it('should display only content', () => {
    let element: HTMLElement;
    element = document.createElement('div');
    const barElement = document.createElement('div');
    component.bodyText = 'test';
    component.svgIconName = 'svgIconName';
    component.labelText = 'labelText';
    const newDiv = document.createElement('div');
    element.appendChild(barElement);
    component.uk2TooltipHtmlContent = { nativeElement: element};
    component.uk2TooltipIconButton = { nativeElement: newDiv};
    component.uk2TooltipContainer = { nativeElement: newDiv};
    component.ngAfterViewInit();
    expect(component.displayBodyText).toBeFalsy();
    const uk2TooltipBodyText = fixture.elementRef.nativeElement.querySelector('#uk2-Tooltip-body-text');
    expect(uk2TooltipBodyText).toBeNull();
  });

  it('shouldn\'t display content when is loading', () => {
    let element: HTMLElement;
    element = document.createElement('div');
    const barElement = document.createElement('div');
    component.bodyText = 'test';
    component.svgIconName = 'svgIconName';
    component.labelText = 'labelText';
    component.uk2IsLoading = true;
    const newDiv = document.createElement('div');
    element.appendChild(barElement);
    component.uk2TooltipHtmlContent = { nativeElement: element};
    component.uk2TooltipIconButton = { nativeElement: newDiv};
    component.uk2TooltipContainer = { nativeElement: newDiv};
    const uk2TooltipContainer = fixture.elementRef.nativeElement.querySelector('#uk2-tooltip-container');
    expect(uk2TooltipContainer).toBeNull();
  });

  it('should Throw Error if content and bodytext is empty', () => {
    component.bodyText = '';
    component.svgIconName = 'svgIconName';
    component.labelText = 'labelText';
    const newDiv = document.createElement('div');
    component.uk2TooltipHtmlContent = { nativeElement: { childNodes: [] }};
    component.uk2TooltipIconButton = { nativeElement: newDiv};
    component.uk2TooltipContainer = { nativeElement: newDiv};
    expect(() => component.ngAfterViewInit()).toThrowError(uk2TooltipErrorConstants.errorBodyText);
  });
});

describe('Uk2TooltipComponent tooltip general test ', () => {
  let component: Uk2TooltipComponent;
  let fixture: ComponentFixture<Uk2TooltipComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [Uk2TooltipComponent],
      imports: [MatIconTestingModule, HttpClientModule],
      providers: [BreakpointObserver],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Uk2TooltipComponent);
    component = fixture.componentInstance;
    component.labelText = 'labelText';
    component.svgIconName = 'svgIconName';
    component.bodyText = 'bodyText';
    component.arrowOffset = 10;
    component.strategy = Uk2TooltipStrategyEnum.absolute;
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set default options correctly', () => {
    component.ngAfterViewInit();
    expect(component.options.offset).toEqual([10, 16]);
    expect(component.options.maxWidth).toEqual(253);
    expect(component.options.interactive).toEqual(true);
    expect(component.options.appendTo).toEqual('parent');
    expect(component.options.arrow).toEqual(Uk2TooltipArrowEnum.default);
    expect(component.options.role).toEqual('tooltip');
    expect(component.options.delay).toEqual(0);
    expect(component.options.duration).toEqual(0);
    expect(component.options.popperOptions?.strategy).toEqual(Uk2TooltipStrategyEnum.absolute);
    expect(component.options.placement).toEqual(Uk2TooltipPlacementEnum.auto);
    expect(component.options.onShow).toEqual(jasmine.any(Function));
    expect(component.options.onHide).toEqual(jasmine.any(Function));
  });

  it('should set correct strategy value', () => {
    component.ngOnChanges({
      strategy: new SimpleChange(Uk2TooltipStrategyEnum.absolute, Uk2TooltipStrategyEnum.fixed, false),
    });
    expect(component.tippyInstance.props.popperOptions.strategy).toEqual(Uk2TooltipStrategyEnum.fixed);
  });

  it('should set correct arrowOffset value', () => {
    component.ngOnChanges({
      arrowOffset: new SimpleChange(10, 50, false),
    });
    expect(component.tippyInstance.props.offset).toEqual([50, 16]);
  });

  it('should set correct placement value', () => {
    component.ngOnChanges({
      placement: new SimpleChange(Uk2TooltipPlacementEnum.auto, Uk2TooltipPlacementEnum.right, false),
    });
    expect(component.tippyInstance.props.placement).toEqual(Uk2TooltipPlacementEnum.right);
  });

  it('should set theme uk2TooltipSkeletonTheme when uk2IsLoading == true', () => {
    component.ngOnChanges({
      uk2IsLoading: new SimpleChange(false, true, false),
    });
    expect(component.tippyInstance.props.theme).toEqual('uk2TooltipSkeletonTheme');
    expect(component.tippyInstance.props.content).toEqual(component.uk2TooltipSkeletonContainer.nativeElement);
  });

  it('should set theme uk2TooltipTheme when uk2IsLoading == false', () => {
    component.ngOnChanges({
      uk2IsLoading: new SimpleChange(true, false, false),
    });
    expect(component.tippyInstance.props.theme).toEqual('uk2TooltipTheme');
    expect(component.tippyInstance.props.content).toEqual(component.uk2TooltipContainer.nativeElement);
  });

  it('should hide overlay when tooltipOnHide is called', () => {
    component.tooltipOnHide();
    expect(component.showOverlay).toBeFalse();
  });

  it('should call tooltipOnShow when tooltip is opened and tooltipOnHide when tooltip is closed ', () => {
    const spyTooltipOnHide = spyOn(component, 'tooltipOnHide').and.callThrough();
    const spyTooltipOnShow = spyOn(component, 'tooltipOnShow').and.callThrough();
    component.tippyInstance.show();
    fixture.detectChanges();
    expect(spyTooltipOnShow).toHaveBeenCalled();
    component.tippyInstance.hide();
    fixture.detectChanges();
    expect(spyTooltipOnHide).toHaveBeenCalled();
  });

  it('should emit closeButtonClick when close button is clicked', () => {
    spyOn(component.closeButtonClick, 'emit');
    component.uk2IsLoading = false;
    component.displayCloseButton = true;
    fixture.detectChanges();
    const closeButton = fixture.debugElement.query(By.css('.uk2-tooltip-close-button'));
    closeButton.triggerEventHandler('click', null);
    expect(component.closeButtonClick.emit).toHaveBeenCalled();
  });
});

describe('Uk2TooltipComponent tooltip desktop test ', () => {
  let component: Uk2TooltipComponent;
  let fixture: ComponentFixture<Uk2TooltipComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [Uk2TooltipComponent],
      imports: [MatIconTestingModule, HttpClientModule],
      providers: [BreakpointObserver],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Uk2TooltipComponent);
    component = fixture.componentInstance;
    component.labelText = 'labelText';
    component.svgIconName = 'svgIconName';
    component.bodyText = 'bodyText';
    fixture.detectChanges();
    const breakpointObserver: BreakpointObserver = TestBed.inject(BreakpointObserver);
    spyOn(breakpointObserver, 'observe').and.returnValue(
      of({
        matches: false,
      } as any)
    );
    component.ngOnInit();
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be on desktop Mode', () => {
    expect(component.mobileMode).toBeFalse();
  });

  it('should set desktop Mode configuration -> Open tooltip box on click or on hover on the icon only ', () => {
    expect(component.tippyInstance.props.trigger).toEqual(Uk2TooltipTriggerEnum.hover);
    expect(component.tippyInstance.props.triggerTarget).toEqual(component.uk2TooltipIconButton.nativeElement);
    component.ngOnChanges({
      desktopOpenMode: new SimpleChange(Uk2TooltipTriggerEnum.hover, Uk2TooltipTriggerEnum.click, false),
    });
    expect(component.tippyInstance.props.trigger).toEqual(Uk2TooltipTriggerEnum.click);
    expect(component.tippyInstance.props.triggerTarget).toEqual(component.uk2TooltipIconButton.nativeElement);
  });

  it('should not apply overlay Backdrop On open tooltip', () => {
    component.tooltipOnShow();
    expect(component.showOverlay).toBeFalse();
  });
});

describe('Uk2TooltipComponent tooltip mobile test ', () => {
  let component: Uk2TooltipComponent;
  let fixture: ComponentFixture<Uk2TooltipComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [Uk2TooltipComponent],
      imports: [MatIconTestingModule, HttpClientModule],
      providers: [BreakpointObserver],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Uk2TooltipComponent);
    component = fixture.componentInstance;
    component.labelText = 'labelText';
    component.svgIconName = 'svgIconName';
    component.bodyText = 'bodyText';
    fixture.detectChanges();
    const breakpointObserver: BreakpointObserver = TestBed.inject(BreakpointObserver);
    spyOn(breakpointObserver, 'observe').and.returnValue(
      of({
        matches: true,
      } as any)
    );
    component.ngOnInit();
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be on mobile Mode', () => {
    expect(component.mobileMode).toBeTrue();
  });

  it('should set desktop Mode configuration -> Open tooltip box on mouseEnter or mouseClick on the icon only ', () => {
    expect(component.tippyInstance.props.trigger).toEqual(Uk2TooltipTriggerEnum.click);
    expect(component.tippyInstance.props.triggerTarget).toEqual(component.uk2Tooltip.nativeElement);
  });

  it('should apply overlay Backdrop On open tooltip', () => {
    component.tooltipOnShow();
    expect(component.showOverlay).toBeTrue();
  });
});
