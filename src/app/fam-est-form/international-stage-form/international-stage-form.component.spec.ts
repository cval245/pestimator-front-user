import {ComponentFixture, TestBed} from '@angular/core/testing';

import {InternationalStageFormComponent} from './international-stage-form.component';

describe('InternationalStageFormComponent', () => {
  let component: InternationalStageFormComponent;
  let fixture: ComponentFixture<InternationalStageFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InternationalStageFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InternationalStageFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
