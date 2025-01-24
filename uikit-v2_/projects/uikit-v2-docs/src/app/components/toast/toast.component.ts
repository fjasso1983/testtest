import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Uk2ToastComponent, Uk2ToastTypeEnum } from '@axos/uikit-v2-lib';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss'],
})
export class ToastComponent {
  durationInSeconds = 5;

  constructor(private _snackBar: MatSnackBar) {}

  openSnackBarAlert() {
    this._snackBar.openFromComponent(Uk2ToastComponent, {
      duration: this.durationInSeconds * 1000,
      data: {
        message: 'hello alert message',
        type: Uk2ToastTypeEnum.alert,
      },
    });
  }

  openSnackBarSuccess() {
    this._snackBar.openFromComponent(Uk2ToastComponent, {
      duration: this.durationInSeconds * 1000,
      data: {
        message: 'hello success message',
        type: Uk2ToastTypeEnum.success,
      },
    });
  }

  openSnackBarErrorType() {
    this._snackBar.openFromComponent(Uk2ToastComponent, {
      duration: this.durationInSeconds * 1000,
      data: {
        message: 'hello success message',
        type: 'dfsf',
      },
    });
  }

  openSnackBarErrorMessage() {
    this._snackBar.openFromComponent(Uk2ToastComponent, {
      duration: this.durationInSeconds * 1000,
      data: {
        message: '',
        type: Uk2ToastTypeEnum.success,
      },
    });
  }

  openSnackBarSuccessBig() {
    this._snackBar.openFromComponent(Uk2ToastComponent, {
      duration: this.durationInSeconds * 1000,
      data: {
        message:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
        type: Uk2ToastTypeEnum.success,
      },
    });
  }

  openSnackBarSkeleton() {
    this._snackBar.openFromComponent(Uk2ToastComponent, {
      duration: this.durationInSeconds * 1000,
      data: {
        message: '',
        type: Uk2ToastTypeEnum.loading,
      },
    });
  }

  openSnackBarWithoutDuration() {
    this._snackBar.openFromComponent(Uk2ToastComponent, {
      data: {
        message: 'Toast without duration',
        type: Uk2ToastTypeEnum.success,
      },
    });
  }
}
