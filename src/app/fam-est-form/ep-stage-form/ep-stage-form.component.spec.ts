import {ComponentFixture, TestBed} from '@angular/core/testing';

import {EpStageFormComponent} from './ep-stage-form.component';

describe('EpStageFormComponent', () => {
  let component: EpStageFormComponent;
  let fixture: ComponentFixture<EpStageFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EpStageFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EpStageFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
