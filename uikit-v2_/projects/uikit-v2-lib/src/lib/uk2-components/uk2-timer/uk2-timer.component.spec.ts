import { ComponentFixture, TestBed, fakeAsync, flush, tick } from '@angular/core/testing';
import { ChangeDetectorRef } from '@angular/core';
import { Uk2TimerComponent } from './uk2-timer.component';
import { Uk2TimerEventEnum } from './enums';
import { uk2TimerConstants } from './constants';

describe('Uk2TimerComponent', () => {
  let component: Uk2TimerComponent;
  let fixture: ComponentFixture<Uk2TimerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Uk2TimerComponent],
      providers: [ChangeDetectorRef],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Uk2TimerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.flagTimerConfigured = false;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call validateStartTime on init', () => {
    spyOn<any>(component, 'validateStartTime');
    component.uk2StartTime = 120;
    component.ngOnInit();
    expect(component['validateStartTime']).toHaveBeenCalled();
  });

  it('should initialize with correct minutes and seconds', () => {
    component.uk2StartTime = 120;
    component.ngOnInit();
    expect(component.minutes).toEqual(2);
    expect(component.seconds).toEqual(0);
  });

  it('should start timer when uk2TimerRunning changes to true', () => {
    spyOn<any>(component, 'startTimer');
    component.ngOnChanges({
      uk2TimerRunning: {
        currentValue: true,
        previousValue: false,
        firstChange: false,
        isFirstChange: () => false,
      },
    });
    expect(component['startTimer']).toHaveBeenCalled();
  });

  it('should pause timer when uk2TimerRunning changes to false', () => {
    spyOn<any>(component, 'pauseTimer');
    component.ngOnChanges({
      uk2TimerRunning: {
        currentValue: false,
        previousValue: true,
        firstChange: false,
        isFirstChange: () => false,
      },
    });
    expect(component['pauseTimer']).toHaveBeenCalled();
  });

  it('should stop timer when uk2TimerStopAndReset changes to true', () => {
    spyOn<any>(component, 'stopTimer');
    component.ngOnChanges({
      uk2TimerStopAndReset: {
        currentValue: true,
        previousValue: false,
        firstChange: false,
        isFirstChange: () => false,
      },
    });
    expect(component['stopTimer']).toHaveBeenCalled();
  });

  it('should emit started event when startTimer is called', fakeAsync(() => {
    spyOn(component.uk2TimerEvent, 'emit');
    component['startTimer']();
    tick();
    expect(component.uk2TimerEvent.emit).toHaveBeenCalledWith(Uk2TimerEventEnum.started);
    component['stopTimer']();
    flush();
  }));

  it('should emit paused event when pauseTimer is called', fakeAsync(() => {
    spyOn(component.uk2TimerEvent, 'emit');
    component['pauseTimer']();
    flush();
    expect(component.uk2TimerEvent.emit).toHaveBeenCalledWith(Uk2TimerEventEnum.paused);
  }));

  it('should reset timer when stopTimer is called', () => {
    spyOn<any>(component, 'resetTimer');
    component['stopTimer']();
    expect(component['resetTimer']).toHaveBeenCalled();
  });

  it('should emit ended event when endTimer is called', fakeAsync(() => {
    spyOn(component.uk2TimerEvent, 'emit');
    component['endTimer']();
    flush();
    expect(component.uk2TimerEvent.emit).toHaveBeenCalledWith(Uk2TimerEventEnum.ended);
  }));

  it('should emit reset event when resetTimer is called', fakeAsync(() => {
    spyOn(component.uk2TimerEvent, 'emit');
    component['resetTimer']();
    flush();
    expect(component.uk2TimerEvent.emit).toHaveBeenCalledWith(Uk2TimerEventEnum.reset);
  }));

  it('should decrease seconds every second when startTimer is called', fakeAsync(() => {
    component.uk2StartTime = 10;
    component.ngOnInit();
    component['startTimer']();
    tick(2000);
    expect(component.seconds).toEqual(8);
    tick(1000);
    expect(component.seconds).toEqual(7);
    component['stopTimer']();
    flush();
  }));

  it('should decrease minutes and reset seconds to 59 when seconds reach 0', fakeAsync(() => {
    component.uk2StartTime = 61;
    component.ngOnInit();
    component['startTimer']();
    tick(1000);
    expect(component.minutes).toEqual(1);
    expect(component.seconds).toEqual(0);
    tick(1000);
    expect(component.minutes).toEqual(0);
    expect(component.seconds).toEqual(59);
    component['stopTimer']();
    flush();
  }));

  it('should call endTimer when minutes and seconds reach 0', fakeAsync(() => {
    spyOn<any>(component, 'endTimer');
    component.uk2StartTime = 1;
    component.ngOnInit();
    component['startTimer']();
    tick(4000);
    expect(component['endTimer']).toHaveBeenCalled();
    component['stopTimer']();
    flush();
  }));

  it('should set initial value when uk2StartTime changes to a value between 1 and 3599 and call startTimer', () => {
    component.uk2TimerRunning = true;
    spyOn<any>(component, 'startTimer');
    component.ngOnChanges({
      uk2StartTime: {
        currentValue: 120,
        previousValue: 0,
        firstChange: false,
        isFirstChange: () => false,
      },
    });

    expect(component.uk2TimerStopAndReset).toBeFalse();
    expect(component.flagTimerConfigured).toBeFalse();
    expect(component['startTimer']).toHaveBeenCalled();
  });

  it('should set initial value when uk2StartTime changes to a value between 1 and 3599 and DONT call startTimer', () => {
    component.uk2TimerRunning = false;
    spyOn<any>(component, 'startTimer');
    component.ngOnChanges({
      uk2StartTime: {
        currentValue: 120,
        previousValue: 0,
        firstChange: false,
        isFirstChange: () => false,
      },
    });

    expect(component.uk2TimerStopAndReset).toBeFalse();
    expect(component.flagTimerConfigured).toBeFalse();
    expect(component['startTimer']).not.toHaveBeenCalled();
  });

  it('should throw an error when uk2StartTime changes to a value outside the range 1-3599', () => {
    expect(() => {
      component.ngOnChanges({
        uk2StartTime: {
          currentValue: 3600,
          previousValue: 0,
          firstChange: false,
          isFirstChange: () => false,
        },
      });
    }).toThrow(new Error(uk2TimerConstants.errorMessages.startTime));

    expect(() => {
      component.ngOnChanges({
        uk2StartTime: {
          currentValue: 0,
          previousValue: 0,
          firstChange: false,
          isFirstChange: () => false,
        },
      });
    }).toThrow(new Error(uk2TimerConstants.errorMessages.startTime));
  });

  it('should call clearIntervalIfExists when timer start', fakeAsync(() => {
    spyOn<any>(component, 'clearIntervalIfExists');
    component.uk2StartTime = 10;
    component.ngOnInit();
    component['startTimer']();
    tick(2000);
    expect(component['clearIntervalIfExists']).toHaveBeenCalled();
    component['stopTimer']();
    flush();
  }));

  it('should clear Interval If Exists when clearIntervalIfExists', () => {
    component.interval = setInterval(() => {}, 1000);
    component['clearIntervalIfExists']();
    expect(component.interval).toBeUndefined();
  });

  it('should call configureTimerDate with uk2StartTime on first start Timer', fakeAsync(() => {
    spyOn<any>(component, 'configureTimerDate');
    component.uk2StartTime = 10;
    component.ngOnInit();
    component['startTimer']();
    tick(2000);
    expect(component['configureTimerDate']).toHaveBeenCalledWith(10);
    component['pauseTimer']();
    flush();
  }));

  it('should call configureTimerDatewith missing time after pause (rounded)', fakeAsync(() => {
    component.uk2StartTime = 10;
    component.ngOnInit();
    component['startTimer']();
    tick(7000);
    component['pauseTimer']();
    component.flagTimerConfigured = true;
    spyOn<any>(component, 'configureTimerDate');
    component['startTimer']();
    expect(component['configureTimerDate']).toHaveBeenCalledWith(3);
    component['stopTimer']();
    flush();
  }));
});
