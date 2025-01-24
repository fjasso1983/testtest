import { NO_ERRORS_SCHEMA, SimpleChange } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Uk2PasswordRuleModel, Uk2PasswordValidationResult } from './models';
import { Uk2PasswordRulesComponent } from './uk2-password-rules.component';
import { uk2PasswordRulesConstants } from './constants/constants';
import { Uk2IconRegistryService } from '../../uk2-services/uk2-icon-registry/uk2-icon-registry.service';
import { MatIconTestingModule } from '@angular/material/icon/testing';

describe('Uk2PasswordRulesComponent', () => {
  let component: Uk2PasswordRulesComponent;
  let fixture: ComponentFixture<Uk2PasswordRulesComponent>;
  let service: Uk2IconRegistryService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Uk2PasswordRulesComponent],
      providers: [Uk2IconRegistryService],
      imports: [MatIconTestingModule],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    service = TestBed.inject(Uk2IconRegistryService);
    service.registerAllCategories();
    fixture = TestBed.createComponent(Uk2PasswordRulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should correctly render the passed passwordRules @Input value', () => {
    fixture.detectChanges();
    const compiled = fixture.debugElement.query(By.css('.uk2-password-rules-line'));
    expect(compiled.nativeElement.textContent).toBe(uk2PasswordRulesConstants.ruleName[0]);
  });

  it('should correctly change the property ruleIsMet of passwordRules to TRUE', () => {
    component.inputToValidate = '';
    component.passwordRules = [
      new Uk2PasswordRuleModel({
        svgIconName: uk2PasswordRulesConstants.defaultIconName,
        ruleName: 'Two uppercase letter',
        ruleRegex: /([A-Z]{2})/,
        ruleIsMet: false,
      }),
    ];
    fixture.detectChanges();
    expect(component.passwordRules[0].ruleIsMet).toBeFalse();
    component.ngOnChanges({
      inputToValidate: new SimpleChange('', 'aaDD', true),
    });
    fixture.detectChanges();
    expect(component.passwordRules[0].ruleIsMet).toBeTrue();
  });

  it('should correctly change the property ruleIsMet of passwordRules to FALSE', () => {
    component.inputToValidate = 'aaDD';
    component.passwordRules = [
      new Uk2PasswordRuleModel({
        svgIconName: uk2PasswordRulesConstants.defaultIconName,
        ruleName: 'Two uppercase letter',
        ruleRegex: /([A-Z]{2})/,
        ruleIsMet: true,
      }),
    ];
    fixture.detectChanges();
    expect(component.passwordRules[0].ruleIsMet).toBeTrue();
    component.ngOnChanges({
      inputToValidate: new SimpleChange('aaDD', '', true),
    });
    fixture.detectChanges();
    expect(component.passwordRules[0].ruleIsMet).toBeFalse();
  });

  it('should correctly create Uk2PasswordRuleModel with default value', () => {
    component.passwordRules = [new Uk2PasswordRuleModel()];
    fixture.detectChanges();
    expect(component.passwordRules[0].svgIconName).toBe(uk2PasswordRulesConstants.defaultIconName);
    expect(component.passwordRules[0].ruleName).toBeUndefined();
    expect(component.passwordRules[0].ruleRegex).toBeUndefined();
    expect(component.passwordRules[0].ruleIsMet).toBeFalse();
  });

  it('should correctly create Uk2PasswordRuleModel with Custom value', () => {
    component.passwordRules = [
      new Uk2PasswordRuleModel({
        svgIconName: uk2PasswordRulesConstants.defaultIconName,
        ruleName: 'Two uppercase letter',
        ruleRegex: /([A-Z]{2})/,
        ruleIsMet: false,
      }),
    ];
    fixture.detectChanges();
    expect(component.passwordRules[0].svgIconName).toBe(uk2PasswordRulesConstants.defaultIconName);
    expect(component.passwordRules[0].ruleName).toBe('Two uppercase letter');
    expect(component.passwordRules[0].ruleRegex).toEqual(/([A-Z]{2})/);
    expect(component.passwordRules[0].ruleIsMet).toBeFalse();
  });

  it('should return "Invalid symbol." message error', () => {
    spyOn(component.processValidation, 'emit');
    component.validatePassword('aa8Adjaxjwo~', component.passwordRules);
    fixture.detectChanges();
    var expectedValue = new Uk2PasswordValidationResult();
    expectedValue.resultErrorMessage = uk2PasswordRulesConstants.resultErrorMessageSymbol;
    expectedValue.forceInputErrorState = true;
    expect(component.processValidation.emit).toHaveBeenCalledWith(expectedValue);
    component.validatePassword('aa8Adjaxjwo#~', component.passwordRules);
    fixture.detectChanges();
    expect(component.processValidation.emit).toHaveBeenCalledWith(expectedValue);
  });

  it('should return "Leading or trailing spaces not allowed" message error', () => {
    spyOn(component.processValidation, 'emit');
    const expectedError: Uk2PasswordValidationResult = {
      allRulesPassed: false,
      forceInputErrorState: true,
      resultErrorMessage: uk2PasswordRulesConstants.resultErrorLeadingOrTrailingSpaces,
    };
    component.validatePassword(' ValueWithLeadingSpace', component.passwordRules);
    fixture.detectChanges();

    expect(component.processValidation.emit).toHaveBeenCalledWith(expectedError);

    component.validatePassword('ValueWithTrailingSpace ', component.passwordRules);
    fixture.detectChanges();
    expect(component.processValidation.emit).toHaveBeenCalledWith(expectedError);
  });
});

describe('Uk2PasswordRulesComponent Regex Error Testing NgOnInit', () => {
  let component: Uk2PasswordRulesComponent;
  let fixture: ComponentFixture<Uk2PasswordRulesComponent>;
  let service: Uk2IconRegistryService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Uk2PasswordRulesComponent],
      providers: [Uk2IconRegistryService],
      imports: [MatIconTestingModule],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    service = TestBed.inject(Uk2IconRegistryService);
    service.registerAllCategories();
    fixture = TestBed.createComponent(Uk2PasswordRulesComponent);
    component = fixture.componentInstance;
    component.passwordRules = [
      new Uk2PasswordRuleModel({
        svgIconName: uk2PasswordRulesConstants.defaultIconName,
        ruleName: 'Two uppercase letter',
        ruleRegex: undefined,
        ruleIsMet: false,
      }),
    ];
  });

  it('should Trown Error when ruleRegex is undefined', () => {
    expect(() => fixture.detectChanges()).toThrowError(Error);
  });

  it('should Trown Error when ruleRegex is undefined and validatePassword() is called', () => {
    expect(() => component.validatePassword('test', component.passwordRules)).toThrowError(Error);
  });
});

describe('Uk2PasswordRulesComponent Regex Error Testing NgOnInit', () => {
  let component: Uk2PasswordRulesComponent;
  let fixture: ComponentFixture<Uk2PasswordRulesComponent>;
  let service: Uk2IconRegistryService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Uk2PasswordRulesComponent],
      providers: [Uk2IconRegistryService],
      imports: [MatIconTestingModule],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    service = TestBed.inject(Uk2IconRegistryService);
    service.registerAllCategories();
    fixture = TestBed.createComponent(Uk2PasswordRulesComponent);
    component = fixture.componentInstance;
    component.passwordRules = [
      new Uk2PasswordRuleModel({
        svgIconName: uk2PasswordRulesConstants.defaultIconName,
        ruleName: undefined,
        ruleRegex: /([A-Z]{2})/,
        ruleIsMet: false,
      }),
    ];
  });

  it('should Trown Error when ruleName is undefined', () => {
    expect(() => fixture.detectChanges()).toThrowError(Error);
  });

  it('should correctly Uk2PasswordValidationResult object with default value', () => {
    var validationResult = new Uk2PasswordValidationResult();
    expect(validationResult.allRulesPassed).toBeFalse();
  });
});
