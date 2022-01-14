import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CustomApplDetailsComponent} from './custom-appl-details.component';

describe('CustomApplDetailsComponent', () => {
  let component: CustomApplDetailsComponent;
  let fixture: ComponentFixture<CustomApplDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomApplDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomApplDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
