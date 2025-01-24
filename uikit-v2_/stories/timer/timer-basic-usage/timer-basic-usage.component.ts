import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-timer',
  templateUrl: './timer-basic-usage.component.html',
})
export class TimerBasicUsageComponent {
  @Input() time = 3599;
  @Input() isRunning = false;
  @Input() isStop = false;
  @Output() timerEvent = new EventEmitter();

  running() {
    this.isRunning = !this.isRunning;
  }

  stop() {
    this.isStop = !this.isStop;
  }

  uk2TimerEvent(value: any) {
    this.timerEvent.emit(value);
  }
}
