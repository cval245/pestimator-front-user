import {ComponentFixture, TestBed} from '@angular/core/testing';

import {LawFirmCardComponent} from './law-firm-card.component';

describe('LawFirmCardComponent', () => {
  let component: LawFirmCardComponent;
  let fixture: ComponentFixture<LawFirmCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LawFirmCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LawFirmCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
