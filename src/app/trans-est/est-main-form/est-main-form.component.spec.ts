import {ComponentFixture, TestBed} from '@angular/core/testing';

import {EstMainFormComponent} from './est-main-form.component';

describe('EstMainFormComponent', () => {
  let component: EstMainFormComponent;
  let fixture: ComponentFixture<EstMainFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EstMainFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EstMainFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
