import {ComponentFixture, TestBed} from '@angular/core/testing';

import {LawFirmModalComponent} from './law-firm-modal.component';

describe('LawFirmModalComponent', () => {
  let component: LawFirmModalComponent;
  let fixture: ComponentFixture<LawFirmModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LawFirmModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LawFirmModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
