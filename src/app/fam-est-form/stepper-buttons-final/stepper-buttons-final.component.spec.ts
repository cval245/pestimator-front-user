import {ComponentFixture, TestBed} from '@angular/core/testing';

import {StepperButtonsFinalComponent} from './stepper-buttons-final.component';

describe('StepperButtonsFinalComponent', () => {
  let component: StepperButtonsFinalComponent;
  let fixture: ComponentFixture<StepperButtonsFinalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StepperButtonsFinalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StepperButtonsFinalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
