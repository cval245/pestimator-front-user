import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransFormTableComponent } from './trans-form-table.component';

describe('TransFormTableComponent', () => {
  let component: TransFormTableComponent;
  let fixture: ComponentFixture<TransFormTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransFormTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransFormTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
