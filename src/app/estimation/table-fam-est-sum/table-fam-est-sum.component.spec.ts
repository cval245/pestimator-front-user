import {ComponentFixture, TestBed} from '@angular/core/testing';

import {TableFamEstSumComponent} from './table-fam-est-sum.component';

describe('TableFamEstSumComponent', () => {
  let component: TableFamEstSumComponent;
  let fixture: ComponentFixture<TableFamEstSumComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableFamEstSumComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableFamEstSumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
