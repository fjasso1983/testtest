import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-checkbox-hierarchy',
  templateUrl: './checkbox-forms-integration.component.html',
  styleUrls: ['./checkbox-forms-integration.component.scss', '../../../projects/uikit-v2-lib/src/styles/uk2.scss'],
})
export class CheckboxExampleFormComponent implements OnInit {
    @Input() isLoading = false;
    form!: FormGroup;

    constructor(private formBuilder: FormBuilder) { }

    ngOnInit(): void {
      this.form = this.formBuilder.group({
        verificationCode: ['', [Validators.required]],
        rememberMe: [false, []],
      });
    }

  }
