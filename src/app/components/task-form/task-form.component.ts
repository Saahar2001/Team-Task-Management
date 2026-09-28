import { Component, EventEmitter, Input, Output, OnChanges, SimpleChanges, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Task, TaskInput, TaskPriority, TaskStatus } from '../../core/models/task.model';

@Component({
  selector: 'app-task-form',
  imports: [ReactiveFormsModule],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.css'
})
export class TaskFormComponent implements OnChanges {
  private readonly formBuilder = inject(FormBuilder);

  @Input() task: Task | null = null;
  @Output() saveTask = new EventEmitter<TaskInput>();
  @Output() cancel = new EventEmitter<void>();

  readonly statuses: TaskStatus[] = ['To Do', 'In Progress', 'Done'];
  readonly priorities: TaskPriority[] = ['Low', 'Medium', 'High'];

  readonly taskForm = this.formBuilder.nonNullable.group({
    title: ['', [Validators.required, Validators.minLength(3)]],
    description: ['', Validators.required],
    assignee: ['', Validators.required],
    dueDate: ['', Validators.required],
    status: ['To Do' as TaskStatus, Validators.required],
    priority: ['Medium' as TaskPriority, Validators.required]
  });

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes['task']) {
      return;
    }

    if (this.task) {
      this.taskForm.setValue({
        title: this.task.title,
        description: this.task.description,
        assignee: this.task.assignee,
        dueDate: this.task.dueDate,
        status: this.task.status,
        priority: this.task.priority
      });
    } else {
      this.taskForm.reset({
        title: '',
        description: '',
        assignee: '',
        dueDate: '',
        status: 'To Do',
        priority: 'Medium'
      });
    }
  }

  submit(): void {
    if (this.taskForm.invalid) {
      this.taskForm.markAllAsTouched();
      return;
    }

    this.saveTask.emit(this.taskForm.getRawValue());
  }
}
