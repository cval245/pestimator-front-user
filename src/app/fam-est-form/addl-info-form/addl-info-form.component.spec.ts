import {ComponentFixture, TestBed} from '@angular/core/testing';

import {AddlInfoFormComponent} from './addl-info-form.component';

describe('AddlInfoFormComponent', () => {
  let component: AddlInfoFormComponent;
  let fixture: ComponentFixture<AddlInfoFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddlInfoFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddlInfoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
