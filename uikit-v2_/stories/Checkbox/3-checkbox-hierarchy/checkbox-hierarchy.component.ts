import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-checkbox-hierarchy',
  templateUrl: './checkbox-hierarchy.component.html',
  styleUrls: ['./checkbox-hierarchy.component.scss', '../../../projects/uikit-v2-lib/src/styles/uk2.scss'],
})
export class CheckboxHierarchyComponent {
  @Input() isLoading = false;

  task: task;
  allComplete: boolean = false;

  constructor() {
    this.task = {
      name:'Indeterminate',
      subtasks: [
        { name: 'Primary', completed: false },
        { name: 'Accent', completed: false },
        { name: 'Warn', completed: false }
      ]
    };
  }

  updateAllComplete() {
    this.allComplete = this.task.subtasks != null && this.task.subtasks.every(t => t.completed);
  }

  someComplete(): boolean {
    if (this.task.subtasks == null) {
      return false;
    }
    return this.task.subtasks.filter(t => t.completed).length > 0 && !this.allComplete;
  }

  setAll(completed: boolean) {
    this.allComplete = completed;
    if (this.task.subtasks == null) {
      return;
    }
    this.task.subtasks.forEach(t => t.completed = completed);
  }

}
interface task {
  name: string,
  subtasks: subtask[]
}

interface subtask {
  name: string,
  completed: boolean
}

