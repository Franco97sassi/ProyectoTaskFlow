import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { TaskService } from '../../../core/services/task.service';
import { DashboardHomeComponent } from './dashboard-home.component';

describe('DashboardHomeComponent', () => {
  let component: DashboardHomeComponent;
  let fixture: ComponentFixture<DashboardHomeComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
       imports: [DashboardHomeComponent],
      providers: [{ provide: TaskService, useValue: { getAll: () => of([]) } }]
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardHomeComponent);
        component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
