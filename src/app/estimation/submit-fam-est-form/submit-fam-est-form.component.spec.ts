import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmitFamEstFormComponent } from './submit-fam-est-form.component';

describe('SubmitFamEstFormComponent', () => {
  let component: SubmitFamEstFormComponent;
  let fixture: ComponentFixture<SubmitFamEstFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubmitFamEstFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmitFamEstFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
