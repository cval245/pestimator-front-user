import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CustomApplOptionsComponent} from './custom-appl-options.component';

describe('CustomApplOptionsComponent', () => {
  let component: CustomApplOptionsComponent;
  let fixture: ComponentFixture<CustomApplOptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomApplOptionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomApplOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
