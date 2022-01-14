import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ParisStageFormComponent} from './paris-stage-form.component';

describe('ParisStageFormComponent', () => {
  let component: ParisStageFormComponent;
  let fixture: ComponentFixture<ParisStageFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParisStageFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParisStageFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
