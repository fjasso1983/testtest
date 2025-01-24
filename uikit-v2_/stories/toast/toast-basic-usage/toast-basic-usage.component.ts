import { Component, Input, OnInit } from '@angular/core';
import { Uk2ToastComponent, Uk2ToastTypeEnum, Uk2ButtonSizeEnum, Uk2IconRegistryService } from '@axos/uikit-v2-lib';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-toast',
  templateUrl: './toast-basic-usage.component.html',
})
export class ToastBasicUsageComponent implements OnInit {
  @Input() type: Uk2ToastTypeEnum = Uk2ToastTypeEnum.success;
  @Input() message = 'Hello toast message !';
  @Input() duration = 10;
  buttonSize = Uk2ButtonSizeEnum;

  constructor(private _snackBar: MatSnackBar, private iconRegistryService: Uk2IconRegistryService) {}

  ngOnInit() {
    this.iconRegistryService.registerAllCategories();
  }

  openToast() {
    let durationInMilliseconds = this.duration * 1000;
    this._snackBar.openFromComponent(Uk2ToastComponent, {
      duration: durationInMilliseconds,
      data: {
        message: this.message,
        type: this.type,
      },
    });
  }
}
