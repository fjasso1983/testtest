import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-checkbox-selection-cards',
  templateUrl: './checkbox-selection-cards.component.html',
  styleUrls: ['./checkbox-selection-cards.component.scss'],
})
export class CheckboxSelectionCardsComponent implements OnInit {
  typesOfShoes: string[] = ['Boots', 'Clogs', 'Loafers', 'Moccasins', 'Sneakers'];
  isLoading = false;
  isDisabled = false;

  addresses: any[] = [
    {
      name: 'San diego Office',
      description: '207 Fifth Ave, San Diego, CA 92101',
    },
    {
      name: 'Guadalajara Office',
      description: ' Av. Adolfo López Mateos Sur 1280, Chapalita, 45040 Guadalajara, Jal., Mexico',
    },
    {
      name: 'Paris Office',
      description: '112 Rue du Faubourg Saint-Honoré, 75008 Paris, France',
    },
  ];

  phoneList: any[] = [];

  user: any = {
    singleSelectedAddress: null,
    multipleSelectedAddress: null,
  };

  form: FormGroup = this.fb.group({
    selectedAddress: new FormControl('', [Validators.required]),
  });

  get selectedAddress(): any {
    return this.form.get('selectedAddress');
  }

  constructor(private fb: FormBuilder, private cd: ChangeDetectorRef) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.phoneList = [
        {
          name: 'Home',
          value: '123-456-7890',
        },
        {
          name: 'Work',
          value: '098-765-4321',
        },
        {
          name: 'Mobile',
          value: '321-654-9870',
        },
      ];
      this.cd.detectChanges();
    }, 2000);
  }

  toggleLoading() {
    this.isLoading = !this.isLoading;
  }

  toggleDisable() {
    this.isDisabled = !this.isDisabled;
  }

  onReactiveFormSubmit() {}

  onTemplateDrivenFormSubmit() {}
}
