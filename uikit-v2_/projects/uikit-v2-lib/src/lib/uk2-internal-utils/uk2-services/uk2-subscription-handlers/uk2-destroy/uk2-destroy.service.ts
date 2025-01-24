import { Injectable, OnDestroy } from '@angular/core';
import { ReplaySubject } from 'rxjs';
/**
 * Service that emits a value when the component is destroyed
 * This service is to be injected at component level to handle subscriptions
 */
@Injectable()
export class Uk2DestroyService extends ReplaySubject<void> implements OnDestroy {
  constructor() {
    super(1);
  }

  ngOnDestroy(): void {
    this.next();
    this.complete();
  }
}
