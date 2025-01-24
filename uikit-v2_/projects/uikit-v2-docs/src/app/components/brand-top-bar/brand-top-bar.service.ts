import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface IBrandTopBar {
  logoUrl: string;
  organizationName: string;
}

@Injectable()
export class BrandTopBarService {
  private topBar$ = new BehaviorSubject<IBrandTopBar>({
    logoUrl: '',
    organizationName: '',
  });

  get topBar(): Observable<IBrandTopBar> {
    return this.topBar$.asObservable();
  }

  setTopBar(newState: IBrandTopBar) {
    this.topBar$.next({
      ...this.topBar$,
      ...newState,
    });
  }
}
