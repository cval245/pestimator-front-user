import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ChartCountryEstDetailComponent} from './chart-country-est-detail.component';

describe('ChartCountryEstDetailComponent', () => {
  let component: ChartCountryEstDetailComponent;
  let fixture: ComponentFixture<ChartCountryEstDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChartCountryEstDetailComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartCountryEstDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
