import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ApplTypeFormComponent} from './appl-type-form.component';

describe('ApplTypeFormComponent', () => {
  let component: ApplTypeFormComponent;
  let fixture: ComponentFixture<ApplTypeFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ApplTypeFormComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplTypeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
