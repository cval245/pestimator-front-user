import {ComponentFixture, TestBed} from '@angular/core/testing';

import {BuyNewEstimateComponent} from './buy-new-estimate.component';

describe('BuyNewEstimateComponent', () => {
  let component: BuyNewEstimateComponent;
  let fixture: ComponentFixture<BuyNewEstimateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuyNewEstimateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuyNewEstimateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
