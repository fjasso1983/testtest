import { Component } from '@angular/core';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss'],
})
export class TimerComponent {
  isRunning = false;
  isStop = false;

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
