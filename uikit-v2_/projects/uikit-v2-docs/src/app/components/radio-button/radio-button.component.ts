import { Component, OnInit, ChangeDetectorRef, ViewEncapsulation } from '@angular/core';

import { Uk2ButtonSizeEnum, Uk2RadioButtonAlignmentEnum, Uk2RadioButtonSizeEnum } from '@axos/uikit-v2-lib';

@Component({
  selector: 'app-radio-button',
  templateUrl: './radio-button.component.html',
  styleUrls: ['./radio-button.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class RadioButtonComponent implements OnInit {
  isLoading = false;
  density = Uk2RadioButtonSizeEnum.medium;
  align = Uk2RadioButtonAlignmentEnum.left;
  disabled = false;
  seasons: string[] = ['Winter', 'Spring', 'Summer', 'Autumn'];
  loadingGroup2 = true;
  small = Uk2ButtonSizeEnum.small;

  constructor(private cd: ChangeDetectorRef) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.loadingGroup2 = false;
      this.cd.detectChanges();
    }, 1500);
  }

  toggleLoading() {
    this.isLoading = !this.isLoading;
  }

  toggleDensity() {
    if (this.density === Uk2RadioButtonSizeEnum.medium) {
      this.density = Uk2RadioButtonSizeEnum.small;

      return;
    }
    this.density = Uk2RadioButtonSizeEnum.medium;
  }

  toggleDisable() {
    this.disabled = !this.disabled;
  }

  toggleAlignment() {
    this.align =
      this.align === Uk2RadioButtonAlignmentEnum.left
        ? Uk2RadioButtonAlignmentEnum.right
        : Uk2RadioButtonAlignmentEnum.left;
  }
}
