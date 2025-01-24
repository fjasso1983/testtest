import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, NgModel, Validators } from '@angular/forms';
import {
  Uk2FormFieldHintDisplayPatternEnum,
  Uk2PasswordRuleModel,
  Uk2PasswordValidationResult,
} from '@axos/uikit-v2-lib';
import { fromEvent } from 'rxjs';

@Component({
  selector: 'app-password-rules',
  templateUrl: './password-rules.component.html',
  styleUrls: ['./password-rules.component.scss'],
})
export class PasswordRulesComponent implements OnInit {
  @ViewChild('tdfPassword') tdfPassword!: NgModel;
  @ViewChild('tdfPassword2') tdfPassword2!: NgModel;
  @ViewChild('inputPassword', { static: true }) inputPassword!: ElementRef<HTMLInputElement>;

  alwaysVisible = Uk2FormFieldHintDisplayPatternEnum.alwaysVisible;
  hideInDefaultState = Uk2FormFieldHintDisplayPatternEnum.hideInDefaultState;
  isLoading = false;
  showPassword = false;
  showPassword2 = false;
  showPassword3 = false;
  showPassword4 = false;
  form: UntypedFormGroup = this.fb.group({
    password: new UntypedFormControl('', [Validators.required]),
    password2: new UntypedFormControl('', [Validators.required]),
  });

  user: any = {
    password: '',
    password2: '',
  };

  customPasswordRules: Uk2PasswordRuleModel[] = [
    new Uk2PasswordRuleModel({
      svgIconName: 'uk2-check-circle',
      ruleName: 'Two uppercase letter',
      ruleRegex: /([A-Z]{2})/,
      ruleIsMet: false,
      ruleErrorMessage: 'Password must contain at least two uppercase letters.',
    }),
  ];

  get hintDisplayPatterns() {
    return Uk2FormFieldHintDisplayPatternEnum;
  }

  get password(): any {
    return this.form.get('password');
  }

  get password2(): any {
    return this.form.get('password2');
  }

  pwdErrorMessage: string | undefined = undefined;
  pwd2ErrorMessage: string | undefined = undefined;
  tdfErrorMessage: string | undefined = undefined;
  tdf2ErrorMessage: string | undefined = undefined;

  constructor(private fb: UntypedFormBuilder, private changeDetectorRef: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.listenInputPasswordEvents();
  }

  listenInputPasswordEvents() {
    fromEvent(this.inputPassword?.nativeElement, 'blur').subscribe(() => {
      if (this.pwdErrorMessage != undefined) {
        this.pwdErrorMessage = 'Password requirements not met';
        this.changeDetectorRef.detectChanges();
      }
    });
  }

  toggleLoading() {
    this.isLoading = true;
    setTimeout(() => {
      this.isLoading = false;
    }, 3000);
  }

  toggleShowPassword() {
    this.showPassword = !this.showPassword;
  }

  toggleShowPassword2() {
    this.showPassword2 = !this.showPassword2;
  }

  toggleShowPassword3() {
    this.showPassword3 = !this.showPassword3;
  }

  toggleShowPassword4() {
    this.showPassword4 = !this.showPassword4;
  }

  // Reactive Form
  processPassword(validationResult: Uk2PasswordValidationResult) {
    if (!validationResult.allRulesPassed) {
      this.form.controls['password'].setErrors({ strenghtIncorrect: true });
      this.pwdErrorMessage = validationResult.resultErrorMessage;
      if (validationResult.forceInputErrorState) {
        this.form.controls['password'].markAsTouched();
      }
      this.changeDetectorRef.detectChanges();
    } else {
      this.form.controls['password'].reset;
      this.pwdErrorMessage = undefined;
      this.changeDetectorRef.detectChanges();
    }
  }

  processPassword2(validationResult: Uk2PasswordValidationResult) {
    if (!validationResult.allRulesPassed) {
      this.form.controls['password2'].setErrors({ strenghtIncorrect: true });
      this.pwd2ErrorMessage = validationResult.resultErrorMessage;
      this.changeDetectorRef.detectChanges();
    } else {
      this.form.controls['password2'].reset;
      this.pwd2ErrorMessage = undefined;
      this.changeDetectorRef.detectChanges();
    }
  }

  onReactiveFormSubmit() {}

  // Template driven Form

  processTDFPassword(validationResult: Uk2PasswordValidationResult) {
    if (!validationResult.allRulesPassed) {
      this.tdfPassword?.control.setErrors({ strenghtIncorrect: true });
      this.tdfErrorMessage = validationResult.resultErrorMessage;
      if (validationResult.forceInputErrorState) {
        this.tdfPassword?.control.markAsTouched();
      }
      this.changeDetectorRef.detectChanges();
    } else {
      this.tdfPassword?.control.reset;
      this.tdfErrorMessage = undefined;
      this.changeDetectorRef.detectChanges();
    }
  }

  processTDFPassword2(validationResult: Uk2PasswordValidationResult) {
    if (!validationResult.allRulesPassed) {
      this.tdfPassword2?.control.setErrors({ strenghtIncorrect: true });
      this.tdf2ErrorMessage = validationResult.resultErrorMessage;
      this.changeDetectorRef.detectChanges();
    } else {
      this.tdfPassword2?.control.reset;
      this.tdf2ErrorMessage = undefined;
      this.changeDetectorRef.detectChanges();
    }
  }

  onSubmitTemplateBased() {}
}
