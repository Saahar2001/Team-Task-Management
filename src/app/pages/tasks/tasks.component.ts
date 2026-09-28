import { Component, computed, inject, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TaskFormComponent } from '../../components/task-form/task-form.component';
import { Task, TaskInput, TaskPriority, TaskStatus } from '../../core/models/task.model';
import { TaskService } from '../../core/services/task.service';

@Component({
  selector: 'app-tasks',
  imports: [DatePipe, FormsModule, TaskFormComponent],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css'
})
export class TasksComponent {
  private readonly taskService = inject(TaskService);

  readonly searchTerm = signal('');
  readonly statusFilter = signal<'All' | TaskStatus>('All');
  readonly priorityFilter = signal<'All' | TaskPriority>('All');
  readonly showForm = signal(false);
  readonly selectedTask = signal<Task | null>(null);

  readonly filteredTasks = computed(() => {
    const search = this.searchTerm().trim().toLowerCase();
    const status = this.statusFilter();
    const priority = this.priorityFilter();

    return this.taskService.tasks().filter(task => {
      const matchesSearch = !search ||
        task.title.toLowerCase().includes(search) ||
        task.description.toLowerCase().includes(search) ||
        task.assignee.toLowerCase().includes(search);

      const matchesStatus = status === 'All' || task.status === status;
      const matchesPriority = priority === 'All' || task.priority === priority;

      return matchesSearch && matchesStatus && matchesPriority;
    });
  });

  openAddForm(): void {
    this.selectedTask.set(null);
    this.showForm.set(true);
  }

  openEditForm(task: Task): void {
    this.selectedTask.set(task);
    this.showForm.set(true);
  }

  closeForm(): void {
    this.showForm.set(false);
    this.selectedTask.set(null);
  }

  saveTask(taskInput: TaskInput): void {
    const currentTask = this.selectedTask();

    if (currentTask) {
      this.taskService.updateTask(currentTask.id, taskInput);
    } else {
      this.taskService.addTask(taskInput);
    }

    this.closeForm();
  }

  deleteTask(task: Task): void {
    const confirmed = window.confirm(`Delete “${task.title}”?`);

    if (confirmed) {
      this.taskService.deleteTask(task.id);
    }
  }

  clearFilters(): void {
    this.searchTerm.set('');
    this.statusFilter.set('All');
    this.priorityFilter.set('All');
  }
}
