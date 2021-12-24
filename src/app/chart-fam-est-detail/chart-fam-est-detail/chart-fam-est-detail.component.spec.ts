import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ChartFamEstDetailComponent} from './chart-fam-est-detail.component';

describe('ChartFamEstDetailComponent', () => {
  let component: ChartFamEstDetailComponent;
  let fixture: ComponentFixture<ChartFamEstDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChartFamEstDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartFamEstDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
