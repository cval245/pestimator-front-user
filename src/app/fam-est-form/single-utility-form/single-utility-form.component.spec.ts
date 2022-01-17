import {ComponentFixture, TestBed} from '@angular/core/testing';

import {SingleUtilityFormComponent} from './single-utility-form.component';

describe('SingleUtilityFormComponent', () => {
  let component: SingleUtilityFormComponent;
  let fixture: ComponentFixture<SingleUtilityFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingleUtilityFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleUtilityFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
