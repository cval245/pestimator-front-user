import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LawFirmTableComponent } from './law-firm-table.component';

describe('LawFirmTableComponent', () => {
  let component: LawFirmTableComponent;
  let fixture: ComponentFixture<LawFirmTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LawFirmTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LawFirmTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
