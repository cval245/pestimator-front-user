import {ComponentFixture, TestBed} from '@angular/core/testing';

import {StepperButtonsNextComponent} from './stepper-buttons-next.component';

describe('StepperButtonsNextComponent', () => {
  let component: StepperButtonsNextComponent;
  let fixture: ComponentFixture<StepperButtonsNextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StepperButtonsNextComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StepperButtonsNextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
