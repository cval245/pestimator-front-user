import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FamestformdataSummaryComponent } from './famestformdata-summary.component';

describe('FamestformdataSummaryComponent', () => {
  let component: FamestformdataSummaryComponent;
  let fixture: ComponentFixture<FamestformdataSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FamestformdataSummaryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FamestformdataSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
