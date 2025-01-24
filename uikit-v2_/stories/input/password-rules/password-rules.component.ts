import {
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  ChangeDetectorRef,
  OnInit,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Uk2PasswordValidationResult, Uk2IconRegistryService, Uk2InputSizeEnum } from '@axos/uikit-v2-lib';
import { fromEvent } from 'rxjs';

@Component({
  selector: 'storybook-input-password-rules',
  templateUrl: './password-rules.component.html',
})
export class PasswordRulesComponent implements OnInit, OnChanges {
  @Input() uk2IsLoading = false;
  @Input() showPassword = false;
  @Input() form!: FormGroup;
  @Input() inputSize = Uk2InputSizeEnum.large;
  @ViewChild('inputPassword', { static: true }) inputPassword!: ElementRef<HTMLInputElement>;

  pwdErrorMessage: string | undefined = undefined;

  constructor(private changeDetectorRef: ChangeDetectorRef, private iconRegistryService: Uk2IconRegistryService) {}

  //* Reactive forms code

  get password(): any {
    return this.form.get('password');
  }

  ngOnInit(): void {
    this.iconRegistryService.registerAllCategories();
    this.listenInputPasswordBlurEvent();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.form.previousValue != undefined) {
      this.form.setValue({
        password: changes.form.previousValue.value.password,
      });
    }
  }

  toggleShowPassword() {
    this.showPassword = !this.showPassword;
  }

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

  listenInputPasswordBlurEvent() {
    fromEvent(this.inputPassword?.nativeElement, 'blur').subscribe(() => {
      if (this.pwdErrorMessage != undefined && this.pwdErrorMessage != 'Leading or trailing spaces not allowed') {
        this.pwdErrorMessage = 'Password requirements not met';
        this.changeDetectorRef.detectChanges();
      }
    });
  }
}
