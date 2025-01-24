import { Injectable } from '@angular/core';

import { Uk2BreadcrumbsItem } from '@axos/uikit-v2-lib';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class BreadcrumbsService {
  private _items = new BehaviorSubject<Uk2BreadcrumbsItem[]>([]);

  get items(): Observable<Uk2BreadcrumbsItem[]> {
    return this._items.asObservable();
  }

  setItems(items: Uk2BreadcrumbsItem[]) {
    this._items.next(items);
  }
}
