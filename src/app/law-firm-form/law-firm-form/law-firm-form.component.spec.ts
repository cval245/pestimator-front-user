import {ComponentFixture, TestBed} from '@angular/core/testing';

import {LawFirmFormComponent} from './law-firm-form.component';

describe('LawFirmFormComponent', () => {
  let component: LawFirmFormComponent;
  let fixture: ComponentFixture<LawFirmFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LawFirmFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LawFirmFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
