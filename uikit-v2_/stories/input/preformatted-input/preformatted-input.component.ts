import { Component, ElementRef, OnInit, ViewChild, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Uk2IconRegistryService, Uk2InputSizeEnum } from '@axos/uikit-v2-lib';

@Component({
  selector: 'storybook-preformatted-input',
  templateUrl: './preformatted-input.component.html',
  styleUrls: ['./preformatted-input.component.scss'],
})
export class PreformattedInputComponent implements OnInit {
  @ViewChild('percentageInput') percentageInput?: ElementRef;
  @ViewChild('phoneInput', { static: false }) phoneInput?: ElementRef;
  @ViewChild('ssnInput', { static: false }) ssnInput?: ElementRef;
  @Input() inputSize = Uk2InputSizeEnum.large;

  form!: FormGroup;
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

  constructor(private formBuilder: FormBuilder, private iconRegistryService: Uk2IconRegistryService) {
    this.iconRegistryService.registerAllCategories();
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      amount: ['', [Validators.required]],
      percentage: ['', [Validators.required]],
      ssn: ['', [Validators.required]],
      mobilePhoneNumber: ['', [Validators.required]],
    });
  }

  get amount(): any {
    return this.form.get('amount');
  }

  get percentage(): any {
    return this.form.get('percentage');
  }

  get mobilePhoneNumber(): any {
    return this.form.get('mobilePhoneNumber');
  }

  get ssn(): any {
    return this.form.get('ssn');
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
    const value = this.phoneInput?.nativeElement.value;
    let lastDigitIndex = -1;

    if (this.phoneMaskConfig.placeHolderCharacter == 'X') {
      if (value.indexOf('X') > 2) {
        this.phoneMaskConfig.placeHolderCharacter = '_';
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
    this.form.controls['mobilePhoneNumber'].reset();

    this.phoneMaskConfig = {
      inputMask: '000) 000 - 0000',
      showMaskTyped: true,
      dropSpecialCharacters: true,
      placeHolder: ' (XXX) XXX - XXXX',
      placeHolderCharacter: 'X',
      prefix: ' (',
    };

    this.phoneMaskConfig.placeHolderCharacter = '_';
  }

  showClearButton(name: string) {
    const value = this.form.controls[name].value;

    return value !== null && value !== undefined && value !== '';
  }

  onBlur(inputValue: string) {
    if (inputValue !== null && inputValue !== undefined && inputValue !== '') {
      if (inputValue.length >= 1 && !inputValue.includes('.')) {
        const newValue = inputValue + '.00';
        this.form.controls['amount'].setValue(newValue);
      } else if (inputValue.split('.')[1].length !== 2) {
        let val = inputValue;
        while (val.split('.')[1].length !== 2) {
          val = val + '0';
        }
        this.form.controls['amount'].setValue(val);
      }
    }
  }

  setPercentageFieldWidth(value: string) {
    if (this.percentageInput) {
      this.percentageInput.nativeElement.parentElement.style.width =
        value.length == 0 ? '10px' : value.length * 10 + 'px';
    }
  }

  clearPercentageField() {
    this.form.controls['percentage'].reset();
    this.setPercentageFieldWidth('');
  }
}
