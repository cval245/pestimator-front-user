import {ComponentFixture, TestBed} from '@angular/core/testing';

import {LawFirmFeeGridComponent} from './law-firm-fee-grid.component';

describe('LawFirmFeeGridComponent', () => {
  let component: LawFirmFeeGridComponent;
  let fixture: ComponentFixture<LawFirmFeeGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LawFirmFeeGridComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LawFirmFeeGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
