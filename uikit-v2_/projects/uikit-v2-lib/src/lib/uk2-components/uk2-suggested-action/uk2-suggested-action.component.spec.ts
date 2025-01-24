import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconTestingModule } from '@angular/material/icon/testing';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Uk2IconRegistryService } from '../../uk2-services/uk2-icon-registry/uk2-icon-registry.service';
import { Uk2SuggestedActionComponent } from './uk2-suggested-action.component';
import { NO_ERRORS_SCHEMA, SimpleChange } from '@angular/core';
import { Uk2TooltipSuggestedActionConfigModel } from './models';
import { Uk2TooltipPlacementEnum } from '../uk2-tooltip/enums';

describe('Uk2SuggestedActionComponent', () => {
  let component: Uk2SuggestedActionComponent;
  let fixture: ComponentFixture<Uk2SuggestedActionComponent>;
  let service: Uk2IconRegistryService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Uk2SuggestedActionComponent],
      imports: [
        MatIconTestingModule,
        MatExpansionModule,
        MatTooltipModule,
        MatButtonModule,
        BrowserAnimationsModule,
        HttpClientModule,
      ],
      providers: [Uk2IconRegistryService],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    service = TestBed.inject(Uk2IconRegistryService);
    service.registerAllCategories();
    fixture = TestBed.createComponent(Uk2SuggestedActionComponent);
    component = fixture.componentInstance;

    component.tooltipConfig = new Uk2TooltipSuggestedActionConfigModel({
      bodyText: 'hello from app consumer',
      displayCloseButton: true,
      placement: Uk2TooltipPlacementEnum.top,
      arrowOffset: 20,
    });

    component.headerSvgIconName = 'test';
    component.panelSubtitle = 'test';
    component.isExpandable = true;
    component.hideToggle = false;
  });

  afterEach(() => {
    TestBed.resetTestingModule();
  });

  it('should render element with appropriated class name', () => {
    component.buttonText = 'test';
    component.panelTitle = 'test';
    fixture.detectChanges();
    const input = fixture.elementRef.nativeElement.querySelector('mat-expansion-panel');
    expect(input.classList.contains('mat-expansion-panel')).toBeTrue();
  });

  it('should click button event when clicked', () => {
    component.buttonText = 'test';
    component.panelTitle = 'test';
    fixture.detectChanges();
    const spy = spyOn(component.buttonClickEvent, 'emit');
    let button = fixture.debugElement.nativeElement.querySelector('button');
    button.click();
    expect(spy).toHaveBeenCalled();
  });

  it('should have text in the button if i put some value in button text property', () => {
    component.buttonText = 'test';
    component.panelTitle = 'test';
    fixture.detectChanges();
    const input = fixture.elementRef.nativeElement.querySelector('button');
    const textButton = input.textContent;
    expect(textButton).toBe(' test ');
  });

  it('should have icon when i create the component', () => {
    component.buttonText = 'test';
    component.buttonText = 'test';
    component.panelTitle = 'test';
    fixture.detectChanges();
    const input = fixture.elementRef.nativeElement.querySelector('.uk2-suggested-action-icon');
    expect(input).not.toBeNull();
  });

  it('should display error if panel tittle is onlye 1 character or less', () => {
    expect(() => {
      component.panelTitle = '';
      fixture.detectChanges();
    }).toThrowError('panelTitle property value must be at lease one character long');
  });

  it('should display hand cursor when isExpandable is true and display toggle button', () => {
    component.buttonText = 'test';
    component.panelTitle = 'test';
    component.isExpandable = true;
    fixture.detectChanges();
    const input = fixture.elementRef.nativeElement.querySelector('.uk2-suggested-action-header');
    expect(input.classList.contains('uk2-suggested-action-panel-cursor')).toBeFalsy();
    const button = fixture.elementRef.nativeElement.querySelector('button');
    expect(button.classList.contains('uk2-suggested-action-button')).toBeFalsy();
  });

  it('should display pointer cursor when isExpandable is false and remove toggle button ', () => {
    component.buttonText = 'test';
    component.panelTitle = 'test';
    component.isExpandable = false;
    fixture.detectChanges();
    const input = fixture.elementRef.nativeElement.querySelector('.uk2-suggested-action-header');
    expect(input.classList.contains('uk2-suggested-action-panel-cursor')).toBeTrue();
    const button = fixture.elementRef.nativeElement.querySelector('button');
    expect(button.classList.contains('uk2-suggested-action-button')).toBeTrue();
  });

  it('should not display mat icon tooltip when title info tooltip is not defined', () => {
    component.buttonText = 'test';
    component.panelTitle = 'test';
    component.tooltipConfig = new Uk2TooltipSuggestedActionConfigModel({
      bodyText: '',
      displayCloseButton: true,
      placement: Uk2TooltipPlacementEnum.top,
      arrowOffset: 20,
    });
    fixture.detectChanges();
    const icon = fixture.elementRef.nativeElement.querySelector('.uk2-suggested-action-tooltip');
    expect(icon).toBeNull();
  });

  it('shoud display the suggested action button', () => {
    component.buttonText = 'test';
    component.panelTitle = 'test';
    fixture.detectChanges();

    const button = fixture.elementRef.nativeElement.querySelector('.uk2-suggested-action-panel-header-button');
    expect(button).toBeTruthy();
  });

  it('should not display the suggested action button if hideButton is set to true', () => {
    component.buttonText = 'test';
    component.panelTitle = 'test';
    component.hideButton = true;
    fixture.detectChanges();

    const button = fixture.elementRef.nativeElement.querySelector('.uk2-suggested-action-panel-header-button');
    expect(button).toBeNull();
  });

  it('should detect ngOnChanges for isExpandable is false', () => {
    component.buttonText = 'test';
    component.panelTitle = 'test';
    component.tooltipConfig = new Uk2TooltipSuggestedActionConfigModel({
      bodyText: 'hello from app consumer',
      displayCloseButton: true,
      placement: Uk2TooltipPlacementEnum.top,
      arrowOffset: 20,
    });
    component.isExpandable = true;
    component.isExpanded = true;

    //directly call ngOnChanges
    component.ngOnChanges({
      isExpandable: new SimpleChange(true, false, component.isExpandable),
    });

    fixture.detectChanges();

    const htmlComponent = fixture.nativeElement;
    const expansionIndicator = htmlComponent.querySelector('.uk2-suggested-action-panel-cursor');
    expect(expansionIndicator).toBeNull();
  });

  it('should detect ngOnChanges for isExpandable is true', () => {
    component.buttonText = 'test';
    component.panelTitle = 'test';
    component.tooltipConfig = new Uk2TooltipSuggestedActionConfigModel({
      bodyText: 'hello from app consumer',
      displayCloseButton: true,
      placement: Uk2TooltipPlacementEnum.top,
      arrowOffset: 20,
    });
    component.isExpandable = false;
    component.isExpanded = true;

    //directly call ngOnChanges
    component.ngOnChanges({
      isExpandable: new SimpleChange(false, true, component.isExpandable),
    });

    fixture.detectChanges();

    const htmlComponent = fixture.nativeElement;
    const expansionIndicator = htmlComponent.querySelector('.uk2-suggested-action-panel-cursor');
    expect(expansionIndicator).not.toBeNull();
  });

  it('should detect ngOnChanges for tooltipConfig', () => {
    component.buttonText = 'test';
    component.panelTitle = 'test';
    component.tooltipConfig = new Uk2TooltipSuggestedActionConfigModel({
      bodyText: 'hello from app consumer',
      displayCloseButton: true,
      placement: Uk2TooltipPlacementEnum.top,
      arrowOffset: 20,
    });
    component.isExpandable = false;
    component.isExpanded = true;

    const tooltipNewConfig = new Uk2TooltipSuggestedActionConfigModel({
      bodyText: 'New Config',
      displayCloseButton: false,
      placement: Uk2TooltipPlacementEnum.right,
      arrowOffset: 0,
    });

    component.ngOnChanges({
      tooltipConfig: new SimpleChange(component.tooltipConfig, tooltipNewConfig, true),
    });
    fixture.detectChanges();

    expect(component.tooltipConfig).toBe(tooltipNewConfig);
  });
});
