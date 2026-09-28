import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { TasksComponent } from './pages/tasks/tasks.component';

export const routes: Routes = [
  { path: '', component: DashboardComponent, title: 'Dashboard | WorkBoard' },
  { path: 'tasks', component: TasksComponent, title: 'Tasks | WorkBoard' },
  { path: '**', redirectTo: '' }
];
