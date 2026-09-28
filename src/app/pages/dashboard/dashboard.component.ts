import { Component, computed, inject } from '@angular/core';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TaskService } from '../../core/services/task.service';

@Component({
  selector: 'app-dashboard',
  imports: [DatePipe, RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  readonly taskService = inject(TaskService);

  readonly recentTasks = computed(() =>
    [...this.taskService.tasks()]
      .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
      .slice(0, 4)
  );

  readonly completionRate = computed(() => {
    const total = this.taskService.totalTasks();
    return total === 0 ? 0 : Math.round((this.taskService.completedTasks() / total) * 100);
  });
}
