import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FamilyEstimateTableComponent } from './family-estimate-table.component';

describe('FamilyEstimateTableComponent', () => {
  let component: FamilyEstimateTableComponent;
  let fixture: ComponentFixture<FamilyEstimateTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FamilyEstimateTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FamilyEstimateTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
