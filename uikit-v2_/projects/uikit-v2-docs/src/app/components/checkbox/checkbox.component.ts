import { Component } from '@angular/core';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
})
export class CheckboxComponent {
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
}
