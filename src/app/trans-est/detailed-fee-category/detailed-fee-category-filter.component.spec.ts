import {ComponentFixture, TestBed} from '@angular/core/testing';

import {DetailedFeeCategoryFilterComponent} from './detailed-fee-category-filter.component';

describe('DetailedFeeCategoryComponent', () => {
  let component: DetailedFeeCategoryFilterComponent;
  let fixture: ComponentFixture<DetailedFeeCategoryFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DetailedFeeCategoryFilterComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailedFeeCategoryFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
