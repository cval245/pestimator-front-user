import {ComponentFixture, TestBed} from '@angular/core/testing';

import {LawFirmFormPageComponent} from './law-firm-form-page.component';

describe('LawFirmFormPageComponent', () => {
  let component: LawFirmFormPageComponent;
  let fixture: ComponentFixture<LawFirmFormPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LawFirmFormPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LawFirmFormPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
