import {ComponentFixture, TestBed} from '@angular/core/testing';

import {LawFirmFeeTypeFormPageComponent} from './law-firm-fee-type-form-page.component';

describe('LawFirmFeeTypeFormPageComponent', () => {
  let component: LawFirmFeeTypeFormPageComponent;
  let fixture: ComponentFixture<LawFirmFeeTypeFormPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LawFirmFeeTypeFormPageComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LawFirmFeeTypeFormPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
