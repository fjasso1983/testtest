import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import {
  Uk2ModalComponent,
  Uk2ButtonSizeEnum,
  Uk2ModalActionsGridEnum,
  Uk2ModalFontWeightEnum,
  Uk2ModalTitleAlignEnum,
  Uk2ModalHeaderVariant,
} from '@axos/uikit-v2-lib';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ModalComponent {
  @ViewChild('modal') modal?: Uk2ModalComponent;
  @ViewChild('longModal') longModal?: Uk2ModalComponent;
  @ViewChild('fullscreenModal') fullscreenModal?: Uk2ModalComponent;
  @ViewChild('timerModal') timerModal?: Uk2ModalComponent;
  @ViewChild('secondaryHeaderModal') secondaryHeaderModal?: Uk2ModalComponent;
  @ViewChild('secondaryHeaderModalLoading') secondaryHeaderModalLoading?: Uk2ModalComponent;

  buttonSize = Uk2ButtonSizeEnum;
  actionsGrid = Uk2ModalActionsGridEnum;
  fontWeight = Uk2ModalFontWeightEnum;
  titleAlign = Uk2ModalTitleAlignEnum;
  headerVariant = Uk2ModalHeaderVariant;
  isRunning = false;
  isStop = false;

  constructor() {}

  openModal() {
    this.modal?.openDialog();
  }

  closeModal() {
    this.modal?.closeDialog();
  }

  openResponsiveFullscreenModal() {
    this.fullscreenModal?.openDialog();
  }

  closeResponsiveFullscreenModal() {
    this.fullscreenModal?.closeDialog();
  }

  openLongModal() {
    this.longModal?.openDialog();
  }

  closeLongModal() {
    this.longModal?.closeDialog();
  }

  openTimerModal() {
    this.timerModal?.openDialog();
    this.isRunning = true;
  }

  closeTimerModal() {
    this.running();
    this.timerModal?.closeDialog();
    setTimeout(() => {
      this.stop();
    }, 1000);
  }

  openSecondaryHeaderModal() {
    this.secondaryHeaderModal?.openDialog();
  }

  openSecondaryHeaderLoadingModal() {
    this.secondaryHeaderModalLoading?.openDialog();
  }

  closeSecondaryHeaderLoadingModal() {
    this.secondaryHeaderModalLoading?.closeDialog();
  }

  alert() {
    alert('Function was executed');
  }

  backButton() {
    console.log('Back button');
    alert('Back function was executed');
  }

  running() {
    this.isRunning = !this.isRunning;
  }

  stop() {
    this.isStop = !this.isStop;
  }

  uk2TimerEvent(value: any) {
    console.log(value);
  }
}
