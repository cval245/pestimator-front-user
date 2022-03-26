import {ComponentFixture, TestBed} from '@angular/core/testing';

import {EstimatePatentCostsComponent} from './estimate-patent-costs.component';

describe('EstimatePatentCostsComponent', () => {
  let component: EstimatePatentCostsComponent;
  let fixture: ComponentFixture<EstimatePatentCostsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EstimatePatentCostsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EstimatePatentCostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
