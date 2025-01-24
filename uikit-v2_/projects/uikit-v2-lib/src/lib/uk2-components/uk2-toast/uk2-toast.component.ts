import { ChangeDetectionStrategy, Component, ElementRef, OnInit, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA, MatSnackBarRef } from '@angular/material/snack-bar';

import { MATERIAL_CLASSES, UK2_BREAKPOINTS } from '@axos/uikit-v2-lib/src/lib/uk2-internal-utils';
import { Uk2ToastConfigModel } from './models';
import { uk2ToastErrorConstants } from './constants/constants';
import { Uk2ToastTypeEnum } from './enums';

@Component({
  selector: 'uk2-toast',
  templateUrl: './uk2-toast.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Uk2ToastComponent implements OnInit {
  snackBarContainer: HTMLElement = this.elementRef.nativeElement.closest(`.${MATERIAL_CLASSES.snackBarContainer}`);
  cdkOverlayContainer: HTMLElement = this.elementRef.nativeElement.closest(`.${MATERIAL_CLASSES.cdkOverlayContainer}`);
  configToast: Uk2ToastConfigModel = new Uk2ToastConfigModel();

  constructor(
    private elementRef: ElementRef,
    @Inject(MAT_SNACK_BAR_DATA) public data: any,
    private _snackRef: MatSnackBarRef<any>
  ) {}

  ngOnInit(): void {
    let duration = this._snackRef.containerInstance.snackBarConfig.duration;
    let durationToast = duration ? duration - 500 : 5000;
    this.snackBarContainer = this.elementRef.nativeElement.closest(`.${MATERIAL_CLASSES.snackBarContainer}`);
    this.snackBarContainer.classList.add('uk2-hidden');
    this.cdkOverlayContainer = this.elementRef.nativeElement.closest(`.${MATERIAL_CLASSES.cdkOverlayContainer}`);
    this.cdkOverlayContainer.classList.add('uk2-toast-cdk-overlay-container');
    if (this.validateConfig()) {
      this.configToast = new Uk2ToastConfigModel(this.data);
      this.snackBarContainer.classList.add('uk2-toast-container');
      this.snackBarContainer.classList.remove('uk2-hidden');
      setTimeout(() => {
        this.snackBarContainer.classList.add('uk2-toast-container-slide-down');
      }, durationToast);
    }
  }

  validateConfig(): boolean {
    if (!Object.values(Uk2ToastTypeEnum).includes(this.data.type)) {
      this._snackRef.dismiss();
      throw new Error(uk2ToastErrorConstants.errorConfigType);
    } else if ((!this.data.message || this.data.message.length == 0) && this.data.type != Uk2ToastTypeEnum.loading) {
      this._snackRef.dismiss();
      throw new Error(uk2ToastErrorConstants.errorConfigMessage);
    }

    return true;
  }

  dismiss() {
    this.snackBarContainer.classList.add('uk2-toast-container-slide-down');
    this._snackRef.dismiss();
  }

  conditionalDismiss() {
    if (window.innerWidth <= UK2_BREAKPOINTS.lg) {
      this.dismiss();
    }
  }
}
