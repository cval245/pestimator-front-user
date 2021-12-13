import {ComponentFixture, TestBed} from '@angular/core/testing';

import {FamEstDetailTableComponent} from './fam-est-detail-table.component';

describe('FamEstDetailTableComponent', () => {
  let component: FamEstDetailTableComponent;
  let fixture: ComponentFixture<FamEstDetailTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FamEstDetailTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FamEstDetailTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
