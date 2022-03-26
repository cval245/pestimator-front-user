import {ComponentFixture, TestBed} from '@angular/core/testing';

import {LawFirmDetailComponent} from './law-firm-detail.component';

describe('LawFirmDetailComponent', () => {
  let component: LawFirmDetailComponent;
  let fixture: ComponentFixture<LawFirmDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LawFirmDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LawFirmDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
