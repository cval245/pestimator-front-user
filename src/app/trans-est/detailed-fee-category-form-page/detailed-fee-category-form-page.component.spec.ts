import {ComponentFixture, TestBed} from '@angular/core/testing';

import {DetailedFeeCategoryFormPageComponent} from './detailed-fee-category-form-page.component';

describe('DetailedFeeCategoryFormPageComponent', () => {
  let component: DetailedFeeCategoryFormPageComponent;
  let fixture: ComponentFixture<DetailedFeeCategoryFormPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DetailedFeeCategoryFormPageComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailedFeeCategoryFormPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
