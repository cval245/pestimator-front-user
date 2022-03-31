import {ComponentFixture, TestBed} from '@angular/core/testing';

import {LawFirmListComponent} from './law-firm-list.component';

describe('LawFirmListComponent', () => {
  let component: LawFirmListComponent;
  let fixture: ComponentFixture<LawFirmListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LawFirmListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LawFirmListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
