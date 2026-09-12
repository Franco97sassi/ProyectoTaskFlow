import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { of } from 'rxjs';
import { TaskService } from '../../../core/services/task.service';
import { DashboardHomeComponent } from './dashboard-home.component';

describe('DashboardHomeComponent', () => {
  let component: DashboardHomeComponent;
  let fixture: ComponentFixture<DashboardHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardHomeComponent],
      providers: [
        provideRouter([]),
        {
          provide: TaskService,
          useValue: {
            getAll: () => of([
              { id: 1, title: 'Discovery', status: 'PENDING', priority: 'HIGH', dueDate: '2099-01-01' },
              { id: 2, title: 'Build', status: 'IN_PROGRESS', priority: 'MEDIUM', dueDate: '2099-01-01' },
              { id: 3, title: 'Release', status: 'DONE', priority: 'HIGH', dueDate: '2020-01-01' }
            ])
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('calculates the workspace metrics', () => {
    expect(component.total).toBe(3);
    expect(component.pending).toBe(1);
    expect(component.inProgress).toBe(1);
    expect(component.done).toBe(1);
    expect(component.highPriority).toBe(2);
    expect(component.completionRate).toBe(33);
    expect(component.activeTasks).toBe(2);
  });

  it('renders the progress and attention sections', () => {
    const content = fixture.nativeElement.textContent;
    expect(content).toContain('Progreso del equipo');
    expect(content).toContain('33%');
    expect(content).toContain('2 prioritarias');
  });
});
