import { Directive, HostBinding, Input, OnChanges, OnInit, SimpleChanges, inject } from '@angular/core';

import { MatBadge } from '@angular/material/badge';

import { IUk2IsLoading } from '@axos/uikit-v2-lib/src/lib/uk2-internal-utils';

import { Uk2BadgeTypeEnum } from './enums';

@Directive({
  selector: '[matBadge][uk2NotificationBadge]',
})
export class Uk2NotificationBadgeDirective implements OnInit, OnChanges, IUk2IsLoading {
  @Input() uk2IsLoading = false;
  @Input() uk2BadgeType: Uk2BadgeTypeEnum = Uk2BadgeTypeEnum.notification;
  @Input() uk2BadgeSelected = false;
  @Input() uk2BadgeEnableHoverState = false;
  private readonly _matBadge = inject(MatBadge);
  private badge!: HTMLElement;
  private _badgeText = '';
  private _hidden!: boolean;

  @Input()
  set matBadge(badgeText: string) {
    setTimeout(() => {
      this._badgeText = badgeText;
      if (this.badge) {
        this.updateBadgeText();
      }
    });
  }

  @Input('matBadgeHidden')
  get hidden(): boolean {
    return this._hidden;
  }
  set hidden(hidden: boolean) {
    this._hidden = hidden;
  }

  @HostBinding('class.uk2-notification-badge-hidden') get hiddenClass() {
    return this.hidden;
  }

  @HostBinding('class.uk2-badge') get badgeTypeClass() {
    return this.uk2BadgeType === Uk2BadgeTypeEnum.badge;
  }

  @HostBinding('class.uk2-selected') get badgeSelectedClass() {
    return this.uk2BadgeSelected;
  }

  @HostBinding('class.uk2-badge-hover') get badgeHoverClass() {
    return this.uk2BadgeEnableHoverState;
  }

  ngOnInit(): void {
    if (!this._badgeText) {
      // Hack to render badge even if is empty
      this._matBadge.content = '-';
      this._matBadge.content = '';
    }
    this.badge = this._matBadge['_badgeElement'];
    this.badge.classList.add('uk2-notification-badge');
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { uk2IsLoading } = changes;

    setTimeout(() => {
      if (uk2IsLoading && this.badge) {
        this.toggleLoading();
      }
    });
  }

  updateBadgeText() {
    const badgeNumber = Number.parseInt(this._badgeText, 10);

    if (!Number.isNaN(badgeNumber) && badgeNumber > 9) {
      this.badge.classList.add('uk2-notification-badge-wider');
      this.badge.innerHTML = '9+';
    } else {
      this.badge.classList.remove('uk2-notification-badge-wider');
      this.badge.innerHTML = this._badgeText;
    }
  }

  toggleLoading() {
    if (this.uk2IsLoading) {
      this.badge.classList.add('uk2-notification-badge-skeleton');
    } else {
      this.badge.classList.remove('uk2-notification-badge-skeleton');
    }
  }
}
