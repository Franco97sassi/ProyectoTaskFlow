// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-dashboard-home',
//   imports: [],
//   templateUrl: './dashboard-home.html',
//   styleUrl: './dashboard-home.scss',
// })
// export class DashboardHome {

// }


import { Component, inject, OnInit } from '@angular/core';
import { TaskService } from '../../../core/services/task.service';

@Component({
  selector: 'app-dashboard-home',
  standalone: true,
  templateUrl: './dashboard-home.component.html'
})
export class DashboardHomeComponent implements OnInit {
  private service = inject(TaskService);
  total = 0;
  pending = 0;
  inProgress = 0;
  done = 0;

  ngOnInit(): void {
    this.service.getAll().subscribe(tasks => {
      this.total = tasks.length;
      this.pending = tasks.filter(t => t.status === 'PENDING').length;
      this.inProgress = tasks.filter(t => t.status === 'IN_PROGRESS').length;
      this.done = tasks.filter(t => t.status === 'DONE').length;
    });
  }
}
