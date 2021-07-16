import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstFormComponent } from './est-form.component';

describe('EstFormComponent', () => {
  let component: EstFormComponent;
  let fixture: ComponentFixture<EstFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EstFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EstFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
