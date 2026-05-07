import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { of } from 'rxjs';
import { TaskService } from '../../../core/services/task.service';
import { TaskFormComponent } from './task-form.component';


describe('TaskFormComponent', () => {
  let component: TaskFormComponent;
  let fixture: ComponentFixture<TaskFormComponent>;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskFormComponent],
      providers: [
        provideRouter([]),
        { provide: TaskService, useValue: { getById: () => of({}), create: () => of({}), update: () => of({}) } }
      ]
    }).compileComponents();
    component = fixture.componentInstance;
    fixture = TestBed.createComponent(TaskFormComponent);  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
