import {ComponentFixture, TestBed} from '@angular/core/testing';

import {LawFeeEntryPageComponent} from './law-fee-entry-page.component';

describe('LawFeeEntryPageComponent', () => {
  let component: LawFeeEntryPageComponent;
  let fixture: ComponentFixture<LawFeeEntryPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LawFeeEntryPageComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LawFeeEntryPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
