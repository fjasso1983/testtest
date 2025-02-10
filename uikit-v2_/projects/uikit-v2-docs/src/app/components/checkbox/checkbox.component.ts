import { Component, Input } from '@angular/core';
import { Uk2ListItem, Uk2ListItemCurrencyOptions } from '@axos/uikit-v2-lib';
import { moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
})
export class CheckboxComponent {
  @Input() currencyOptions: Uk2ListItemCurrencyOptions = {
    currencyCode: 'USD',
    display: 'symbol',
    digitsInfo: '1.2-2',
  };
  isLoading = false;

  task = {
    name: 'Indeterminate',
    subtasks: [
      {
        name: 'Primary',
        completed: false,
      },
      {
        name: 'Accent',
        completed: false,
      },
      {
        name: 'Warn',
        completed: false,
      },
    ],
  };

  allComplete = false;

  firstListItem: Uk2ListItem = {
    headerLabelName: 'First item',
    value: 'firstitem',
  };

  secondListItem: Uk2ListItem = {
    svgIconName: 'uk2-envelope',
    headerLabelName: 'Second Item',
    value: 'EmailNotifications',
  };

  items = [this.firstListItem, this.secondListItem];

  constructor() {}

  updateAllComplete() {
    this.allComplete = this.task.subtasks !== null && this.task.subtasks.every(t => t.completed);
  }

  someComplete(): boolean {
    if (this.task.subtasks === null) {
      return false;
    }

    return this.task.subtasks.filter(t => t.completed).length > 0 && !this.allComplete;
  }

  setAll(completed: boolean) {
    this.allComplete = completed;
    if (this.task.subtasks === null) {
      return;
    }
    this.task.subtasks.forEach(t => (t.completed = completed));
  }

  toggleLoading() {
    this.isLoading = !this.isLoading;
  }

  drop(event: any) {
    moveItemInArray(this.items, event.previousIndex, event.currentIndex);
  }
}
