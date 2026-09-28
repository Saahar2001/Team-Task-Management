import { Injectable, computed, signal } from '@angular/core';
import { Task, TaskInput } from '../models/task.model';

const STORAGE_KEY = 'workboard_tasks';

@Injectable({ providedIn: 'root' })
export class TaskService {
  private readonly initialTasks: Task[] = [
    {
      id: 1,
      title: 'Prepare weekly report',
      description: 'Collect the main updates and blockers from the team.',
      assignee: 'Sahar',
      dueDate: '2026-10-01',
      status: 'In Progress',
      priority: 'High',
      createdAt: '2026-09-25'
    },
    {
      id: 2,
      title: 'Review landing page',
      description: 'Check mobile spacing and form validation before release.',
      assignee: 'Noura',
      dueDate: '2026-10-03',
      status: 'To Do',
      priority: 'Medium',
      createdAt: '2026-09-26'
    },
    {
      id: 3,
      title: 'Update client notes',
      description: 'Add the latest meeting decisions to the project record.',
      assignee: 'Khalid',
      dueDate: '2026-09-29',
      status: 'Done',
      priority: 'Low',
      createdAt: '2026-09-24'
    }
  ];

  readonly tasks = signal<Task[]>(this.loadTasks());

  readonly totalTasks = computed(() => this.tasks().length);
  readonly todoTasks = computed(() => this.tasks().filter(task => task.status === 'To Do').length);
  readonly inProgressTasks = computed(() => this.tasks().filter(task => task.status === 'In Progress').length);
  readonly completedTasks = computed(() => this.tasks().filter(task => task.status === 'Done').length);

  addTask(taskInput: TaskInput): void {
    const task: Task = {
      ...taskInput,
      id: Date.now(),
      createdAt: new Date().toISOString().slice(0, 10)
    };

    this.updateTasks([...this.tasks(), task]);
  }

  updateTask(id: number, taskInput: TaskInput): void {
    const updatedTasks = this.tasks().map(task =>
      task.id === id ? { ...task, ...taskInput } : task
    );

    this.updateTasks(updatedTasks);
  }

  deleteTask(id: number): void {
    this.updateTasks(this.tasks().filter(task => task.id !== id));
  }

  getTaskById(id: number): Task | undefined {
    return this.tasks().find(task => task.id === id);
  }

  private updateTasks(tasks: Task[]): void {
    this.tasks.set(tasks);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }

  private loadTasks(): Task[] {
    const savedTasks = localStorage.getItem(STORAGE_KEY);

    if (!savedTasks) {
      return this.initialTasks;
    }

    try {
      return JSON.parse(savedTasks) as Task[];
    } catch {
      return this.initialTasks;
    }
  }
}
