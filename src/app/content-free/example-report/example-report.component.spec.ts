import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ExampleReportComponent} from './example-report.component';

describe('ExampleReportComponent', () => {
  let component: ExampleReportComponent;
  let fixture: ComponentFixture<ExampleReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ExampleReportComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExampleReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
