import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { of } from 'rxjs';
import { TaskService } from '../../../core/services/task.service';
import { UserService } from '../../../core/services/user.service';
import { TaskListComponent } from './task-list.component';

describe('TaskListComponent', () => {
  let component: TaskListComponent;
  let fixture: ComponentFixture<TaskListComponent>;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
     imports: [TaskListComponent],
      providers: [
        provideRouter([]),
        { provide: TaskService, useValue: { getAll: () => of([]), remove: () => of(undefined) } },
        { provide: UserService, useValue: { getAll: () => of([]) } }
      ]
    }).compileComponents();


    fixture = TestBed.createComponent(TaskListComponent);
        component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
