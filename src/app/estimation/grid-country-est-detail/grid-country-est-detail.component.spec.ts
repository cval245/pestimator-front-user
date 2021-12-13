import {ComponentFixture, TestBed} from '@angular/core/testing';

import {GridCountryEstDetailComponent} from './grid-country-est-detail.component';

describe('GridCountryEstDetailComponent', () => {
  let component: GridCountryEstDetailComponent;
  let fixture: ComponentFixture<GridCountryEstDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GridCountryEstDetailComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GridCountryEstDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
