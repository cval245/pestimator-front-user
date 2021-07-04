import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FamDetTableComponent } from './fam-det-table.component';

describe('FamDetTableComponent', () => {
  let component: FamDetTableComponent;
  let fixture: ComponentFixture<FamDetTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FamDetTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FamDetTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
