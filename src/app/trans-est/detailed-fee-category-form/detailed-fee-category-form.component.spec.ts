import {ComponentFixture, TestBed} from '@angular/core/testing';

import {DetailedFeeCategoryFormComponent} from './detailed-fee-category-form.component';

describe('DetailedFeeCategoryFormComponent', () => {
  let component: DetailedFeeCategoryFormComponent;
  let fixture: ComponentFixture<DetailedFeeCategoryFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DetailedFeeCategoryFormComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailedFeeCategoryFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
