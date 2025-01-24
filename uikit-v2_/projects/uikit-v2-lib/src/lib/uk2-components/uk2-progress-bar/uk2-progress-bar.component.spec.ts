import { EventEmitter, NO_ERRORS_SCHEMA, SimpleChange } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Uk2IconRegistryService } from '../../uk2-services/uk2-icon-registry/uk2-icon-registry.service';
import { Uk2ProgressBarLabeledIconButtonModel } from './models';
import { uk2ProgressBarConstants } from './constants/constants';
import { Uk2ProgressBarComponent } from './uk2-progress-bar.component';
import { CommonModule } from '@angular/common';
import { MatIconTestingModule } from '@angular/material/icon/testing';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { Uk2DirectivesModule } from '../../uk2-directives';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { HttpClientModule } from '@angular/common/http';

describe('Uk2ProgressBarComponent', () => {
  let component: Uk2ProgressBarComponent;
  let fixture: ComponentFixture<Uk2ProgressBarComponent>;
  let service: Uk2IconRegistryService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Uk2ProgressBarComponent],
      imports: [
        CommonModule,
        HttpClientModule,
        MatToolbarModule,
        MatIconTestingModule,
        MatButtonModule,
        Uk2DirectivesModule,
        MatProgressBarModule,
      ],
      providers: [Uk2IconRegistryService],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    service = TestBed.inject(Uk2IconRegistryService);
    service.registerAllCategories();
    fixture = TestBed.createComponent(Uk2ProgressBarComponent);
    component = fixture.componentInstance;
    component.uk2LogoImgPath = '../test.png';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render skeleton state', () => {
    component.uk2IsLoading = true;

    fixture.detectChanges();

    expect(
      fixture.nativeElement.querySelector('.uk2-progress-bar').classList.contains('uk2-progress-bar-skeleton')
    ).toBeTruthy();
  });

  it('should render header button', () => {
    component.uk2HeaderIconButton = new Uk2ProgressBarLabeledIconButtonModel({
      svgIconName: 'uk2-log-out-R',
      labelText: 'Save & Exit',
    });
    spyOn(component.uk2HeaderCallBackButton, 'emit');

    //directly call ngOnChanges
    component.ngOnChanges();
    fixture.detectChanges();

    const nativeElement = fixture.nativeElement;
    const button = nativeElement.querySelector('.uk2-progress-bar-header-button button');
    button.dispatchEvent(new Event('click'));

    expect(component.uk2HeaderCallBackButton.emit).toHaveBeenCalled();
  });

  it('should render footer button', () => {
    component.uk2FooterIconButton = new Uk2ProgressBarLabeledIconButtonModel({
      svgIconName: 'uk2-log-out-R',
      labelText: 'Save & Exit',
    });
    spyOn(component.uk2FooterCallBackButton, 'emit');

    component.ngOnChanges();
    fixture.detectChanges();

    const nativeElement = fixture.nativeElement;
    const button = nativeElement.querySelector('.uk2-progress-bar-footer-button button');
    button.dispatchEvent(new Event('click'));

    expect(component.uk2FooterCallBackButton.emit).toHaveBeenCalled();
  });

  it('should throw an error when trying to render the button', () => {
    component.uk2FooterIconButton = new Uk2ProgressBarLabeledIconButtonModel({
      svgIconName: 'uk2-log-out-R',
      labelText: null,
    });

    expect(() => component.ngOnChanges()).toThrowError(uk2ProgressBarConstants.errorMessages.labelText);
  });

  it('should throw an error when trying to render the button', () => {
    component.uk2FooterIconButton = new Uk2ProgressBarLabeledIconButtonModel({
      svgIconName: null,
      labelText: 'Save & Exit',
    });

    expect(() => component.ngOnChanges()).toThrowError(uk2ProgressBarConstants.errorMessages.svgIconName);
  });
});
