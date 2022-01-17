import {ComponentFixture, TestBed} from '@angular/core/testing';

import {FirstApplFormComponent} from './first-appl-form.component';

describe('FirstApplFormComponent', () => {
  let component: FirstApplFormComponent;
  let fixture: ComponentFixture<FirstApplFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FirstApplFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FirstApplFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
