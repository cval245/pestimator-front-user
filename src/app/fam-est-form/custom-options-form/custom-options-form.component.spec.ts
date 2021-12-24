import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CustomOptionsFormComponent} from './custom-options-form.component';

describe('CustomOptionsFormComponent', () => {
  let component: CustomOptionsFormComponent;
  let fixture: ComponentFixture<CustomOptionsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomOptionsFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomOptionsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
