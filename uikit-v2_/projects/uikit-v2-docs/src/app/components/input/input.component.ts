import { Component, ElementRef, ViewChild } from '@angular/core';
import {
  FormControl,
  FormGroupDirective,
  UntypedFormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { Uk2FormFieldHintDisplayPatternEnum, Uk2DropdownSizeEnum, Uk2InputSizeEnum } from '@axos/uikit-v2-lib';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent {
  @ViewChild('percentageInput') percentageInput?: ElementRef;
  @ViewChild('phoneInput', { static: false }) phoneInput?: ElementRef;
  @ViewChild('ssnInput', { static: false }) ssnInput?: ElementRef;
  @ViewChild(FormGroupDirective) formToReset!: FormGroupDirective;

  alwaysVisible = Uk2FormFieldHintDisplayPatternEnum.alwaysVisible;
  hideInDefaultState = Uk2FormFieldHintDisplayPatternEnum.hideInDefaultState;
  isLoading = false;

  inputSize = Uk2InputSizeEnum.large;
  dropdownSize = Uk2DropdownSizeEnum.large;

  dropdownModel = '';
  documentReceived = new FormControl([]);
  documentList: string[] = ['Confirmations', 'Statements', 'Tax Forms'];
  opened = false;

  formPreFormated = this.fb.group({
    amount: ['', [Validators.required]],
    percentage: ['', [Validators.required]],
    ssn: ['', [Validators.required]],
    mobilePhoneNumber: ['', [Validators.required]],
    date1: new FormControl('', [Validators.required]),
  });

  form2: UntypedFormGroup = this.fb.group({
    email2: new UntypedFormControl('p@d', [Validators.required, Validators.email]),
    name2: new UntypedFormControl('', [Validators.required]),
  });

  form: UntypedFormGroup = this.fb.group({
    email: new UntypedFormControl('p@d', [Validators.required, Validators.email]),
    name: new UntypedFormControl('', [Validators.required]),
    phone: new UntypedFormControl('', [Validators.required]),
    disabled: new UntypedFormControl(
      {
        value: '',
        disabled: true,
      },
      [Validators.required]
    ),
    disabledFilled: new UntypedFormControl(
      {
        value: "Hello I'm filled",
        disabled: true,
      },
      [Validators.required]
    ),
  });

  user: any = {
    name: 'hello',
  };

  showSSN = false;

  ssnMaskConfig = {
    visibleInputMask: 'AAA-AA-AAAA',
    hiddenInputMask: 'AAAAAAAAA',
    showMaskTyped: false,
    dropSpecialCharacters: true,
    placeHolder: 'XXX - XX - XXXX',
  };

  phoneMaskConfig = {
    inputMask: '000) 000 - 0000',
    showMaskTyped: true,
    dropSpecialCharacters: true,
    placeHolder: ' (XXX) XXX - XXXX',
    placeHolderCharacter: 'X',
    prefix: ' (',
  };

  get hintDisplayPatterns() {
    return Uk2FormFieldHintDisplayPatternEnum;
  }

  get date1(): any {
    return this.form.get('date1');
  }

  get email2(): any {
    return this.form2.get('email2');
  }

  get email(): any {
    return this.form.get('email');
  }

  get phone(): any {
    return this.form.get('phone');
  }

  get name(): any {
    return this.form.get('name');
  }

  get name2(): any {
    return this.form2.get('name2');
  }

  get disabled(): any {
    return this.form.get('disabled');
  }

  get disabledFilled(): any {
    return this.form.get('disabledFilled');
  }

  get amount(): any {
    return this.formPreFormated.get('amount');
  }

  get percentage(): any {
    return this.formPreFormated.get('percentage');
  }

  get mobilePhoneNumber(): any {
    return this.formPreFormated.get('mobilePhoneNumber');
  }

  get ssn(): any {
    return this.formPreFormated.get('ssn');
  }

  constructor(private fb: UntypedFormBuilder) {}

  onItemRemoved(item: string) {
    const items = this.documentReceived.value!;
    this.removeFirst(items, item);
    this.documentReceived.setValue(items);
  }

  removeFirst<T>(array: T[], toRemove: T): void {
    const index = array.indexOf(toRemove);
    if (index !== -1) {
      array.splice(index, 1);
    }
  }

  toggleLoading() {
    this.isLoading = !this.isLoading;
  }

  resetForm() {
    this.formToReset?.resetForm();
  }

  submit() {
    setTimeout(() => {
      this.formToReset?.resetForm();
    }, 1000);
  }

  // SSN
  handleSelectSSN(event: any) {
    event.preventDefault();
    this.setCursorSSN();
  }

  toggleShowSSN(event: MouseEvent): void {
    this.showSSN = !this.showSSN;
    event.stopPropagation();
  }

  setCursorSSN() {
    const value = this.ssnInput?.nativeElement.value;
    let lastDigitIndex = -1;

    if (this.showSSN && value.indexOf('_') != -1) {
      lastDigitIndex = value.indexOf('_');
    } else {
      lastDigitIndex = value.length;
    }

    if (lastDigitIndex !== -1) {
      if (lastDigitIndex != 4 && lastDigitIndex != 7) {
        this.ssnInput?.nativeElement.setSelectionRange(lastDigitIndex, lastDigitIndex);
      }
      if (this.ssnInput?.nativeElement.selectionStart == 0) {
        this.ssnInput?.nativeElement.setSelectionRange(lastDigitIndex, lastDigitIndex);
      }
    }
  }

  // Phone
  handleSelectPhone(event: any) {
    event.preventDefault();
    this.setCursorPhone();
  }
  setCursorPhone() {
    let value = this.phoneInput?.nativeElement.value;
    let lastDigitIndex = -1;

    if (this.phoneMaskConfig.placeHolderCharacter == 'X') {
      if (value.indexOf('X') > 2) {
        this.phoneMaskConfig.placeHolderCharacter = '_';
        this.formPreFormated.patchValue({
          mobilePhoneNumber: this.phoneInput?.nativeElement.value.replaceAll('X', '_'),
        });
      }
    }

    if (value.indexOf('_') != -1) {
      lastDigitIndex = value.indexOf('_');
    } else {
      lastDigitIndex = value.indexOf('X');
    }

    if (lastDigitIndex != 13 && lastDigitIndex != 7) {
      this.phoneInput?.nativeElement.setSelectionRange(lastDigitIndex, lastDigitIndex);
    }
  }
  clearPhoneField() {
    this.formPreFormated.patchValue({
      mobilePhoneNumber: '',
    });

    this.phoneMaskConfig = {
      inputMask: '000) 000 - 0000',
      showMaskTyped: true,
      dropSpecialCharacters: true,
      placeHolder: ' (XXX) XXX - XXXX',
      placeHolderCharacter: 'X',
      prefix: ' (',
    };

    this.phoneMaskConfig.placeHolderCharacter = 'X';
  }

  showClearButton(name: string) {
    const value = this.formPreFormated.controls[name].value;

    return value !== null && value !== undefined && value !== '';
  }

  onBlur(event: Event) {
    let inputValue = (event.target as HTMLInputElement).value;
    if (inputValue !== null && inputValue !== undefined && inputValue !== '') {
      if (inputValue.length >= 1 && !inputValue.includes('.')) {
        const newValue = inputValue + '.00';
        this.formPreFormated.controls['amount'].setValue(newValue);
      } else if (inputValue.split('.')[1].length !== 2) {
        let val = inputValue;
        while (val.split('.')[1].length !== 2) {
          val = val + '0';
        }
        this.formPreFormated.controls['amount'].setValue(val);
      }
    }
  }

  setPercentageFieldWidth(event: Event) {
    let value = (event.target as HTMLInputElement).value;
    if (this.percentageInput) {
      this.percentageInput.nativeElement.parentElement.style.width =
        value.length == 0 ? '10px' : value.length * 10 + 'px';
    }
  }

  clearPercentageField() {
    this.formPreFormated.controls['percentage'].reset();
    //this.setPercentageFieldWidth('');
  }

  setInputSize(size: string) {
    if (size == 'large') {
      this.inputSize = Uk2InputSizeEnum.large;
    } else if (size == 'medium') {
      this.inputSize = Uk2InputSizeEnum.medium;
    } else if (size == 'small') {
      this.inputSize = Uk2InputSizeEnum.small;
    }
  }

  setDropdownSize(size: string) {
    if (size == 'large') {
      this.dropdownSize = Uk2DropdownSizeEnum.large;
    } else if (size == 'medium') {
      this.dropdownSize = Uk2DropdownSizeEnum.medium;
    } else if (size == 'small') {
      this.dropdownSize = Uk2DropdownSizeEnum.small;
    }
  }

  streamOpened() {
    this.opened = true;
  }
}
