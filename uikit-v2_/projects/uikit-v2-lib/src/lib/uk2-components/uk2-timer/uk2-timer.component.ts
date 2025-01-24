import {
  Component,
  OnInit,
  Input,
  SimpleChanges,
  OnChanges,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Output,
  EventEmitter,
  OnDestroy,
} from '@angular/core';
import { Uk2TimerEventEnum } from './enums';
import { uk2TimerConstants } from './constants/constants';

@Component({
  selector: 'uk2-timer',
  templateUrl: './uk2-timer.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Uk2TimerComponent implements OnInit, OnChanges, OnDestroy {
  @Input() uk2StartTime = 1;
  @Input() uk2TimerRunning = false;
  @Input() uk2TimerStopAndReset = false;
  @Output() uk2TimerRunningChange = new EventEmitter<boolean>();
  @Output() uk2TimerStopAndResetChange = new EventEmitter<boolean>();
  @Output() uk2TimerEvent = new EventEmitter<Uk2TimerEventEnum>();

  minutes = 0;
  seconds = 1;
  timeToCount = 1;
  flagTimerConfigured = false;
  targetDateTime = new Date(+new Date() + (this.uk2StartTime + 1) * 1000);
  interval: ReturnType<typeof setInterval> | undefined;

  constructor(private ref: ChangeDetectorRef) {}

  ngOnInit() {
    this.validateStartTime(this.uk2StartTime);
  }

  ngOnChanges(changes: SimpleChanges) {
    this.handleTimerChanges(changes);
    this.validateStartTimeIfChanged(changes);
  }

  ngOnDestroy() {
    clearInterval(this.interval);
  }

  private handleTimerChanges(changes: SimpleChanges) {
    if (changes.uk2TimerRunning?.currentValue) {
      this.startTimer();
    } else if (changes.uk2TimerRunning?.currentValue == false) {
      this.pauseTimer();
    } else if (changes.uk2TimerStopAndReset?.currentValue) {
      this.stopTimer();
    }
  }

  private validateStartTimeIfChanged(changes: SimpleChanges) {
    if (changes.uk2StartTime) {
      this.validateStartTime(changes.uk2StartTime.currentValue);
    }
  }
  private startTimer() {
    this.clearIntervalIfExists();
    setTimeout(() => {
      this.uk2TimerRunningChange.emit(this.uk2TimerRunning);
      this.uk2TimerEvent.emit(Uk2TimerEventEnum.started);
    });

    if (!this.flagTimerConfigured) {
      this.configureTimerDate(this.uk2StartTime);
    } else {
      this.configureTimerDate(this.timeToCount);
    }

    this.intervalLogicCounter();
    this.interval = setInterval(() => {
      this.intervalLogicCounter();
    }, 1000);
  }

  private intervalLogicCounter() {
    if (new Date() < this.targetDateTime) {
      this.timeToCount = Math.ceil((this.targetDateTime.getTime() - new Date().getTime()) / 1000);
      this.setMMssValue(this.timeToCount);
    } else {
      this.endTimer();
    }

    this.ref.detectChanges();
  }

  private pauseTimer() {
    clearInterval(this.interval);
    setTimeout(() => {
      this.uk2TimerRunningChange.emit(this.uk2TimerRunning);
      this.uk2TimerEvent.emit(Uk2TimerEventEnum.paused);
    });
  }

  private stopTimer() {
    clearInterval(this.interval);
    this.resetTimer();
  }

  private endTimer() {
    clearInterval(this.interval);
    this.uk2TimerRunning = false;
    this.uk2TimerStopAndReset = false;
    setTimeout(() => {
      this.uk2TimerRunningChange.emit(this.uk2TimerRunning);
      this.uk2TimerRunningChange.emit(this.uk2TimerStopAndReset);
      this.uk2TimerEvent.emit(Uk2TimerEventEnum.ended);
    });
    this.ref.detectChanges();
  }

  private resetTimer() {
    this.setMMssValue(this.uk2StartTime);
    this.uk2TimerRunning = false;
    this.uk2TimerStopAndReset = false;
    this.flagTimerConfigured = false;

    setTimeout(() => {
      this.uk2TimerRunningChange.emit(this.uk2TimerRunning);
      this.uk2TimerStopAndResetChange.emit(this.uk2TimerStopAndReset);
      this.uk2TimerEvent.emit(Uk2TimerEventEnum.reset);
    });
    this.ref.detectChanges();
  }

  private validateStartTime(startTimeValue: number) {
    if (startTimeValue < 3600 && startTimeValue > 0) {
      this.setMMssValue(startTimeValue);
      this.uk2TimerStopAndReset = false;
      this.flagTimerConfigured = false;
      if (this.uk2TimerRunning) {
        this.startTimer();
      }
    } else {
      throw new Error(uk2TimerConstants.errorMessages.startTime);
    }
  }

  private configureTimerDate(startTimeValue: number) {
    this.targetDateTime = new Date(+new Date() + startTimeValue * 1000);
    this.timeToCount = startTimeValue;
    this.setMMssValue(startTimeValue);
    this.flagTimerConfigured = true;
  }

  private setMMssValue(time: number) {
    this.minutes = Math.floor(time / 60);
    this.seconds = time % 60;
  }

  private clearIntervalIfExists() {
    if (this.interval !== undefined) {
      clearInterval(this.interval);
      this.interval = undefined;
    }
  }
}
