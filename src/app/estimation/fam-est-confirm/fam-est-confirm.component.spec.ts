import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FamEstConfirmComponent } from './fam-est-confirm.component';

describe('FamEstConfirmComponent', () => {
  let component: FamEstConfirmComponent;
  let fixture: ComponentFixture<FamEstConfirmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FamEstConfirmComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FamEstConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
