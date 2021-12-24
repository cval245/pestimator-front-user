import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CustomDetailsFormComponent} from './custom-details-form.component';

describe('CustomDetailsFormComponent', () => {
  let component: CustomDetailsFormComponent;
  let fixture: ComponentFixture<CustomDetailsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomDetailsFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomDetailsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
