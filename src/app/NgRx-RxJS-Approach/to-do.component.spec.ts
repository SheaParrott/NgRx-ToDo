import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToDoComponentTwo } from './to-do.component';

describe('ToDoComponent', () => {
  let component: ToDoComponentTwo;
  let fixture: ComponentFixture<ToDoComponentTwo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToDoComponentTwo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ToDoComponentTwo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
