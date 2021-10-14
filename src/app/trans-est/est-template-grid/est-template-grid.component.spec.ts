import {ComponentFixture, TestBed} from '@angular/core/testing';

import {EstTemplateGridComponent} from './est-template-grid.component';

describe('EstTemplateGridComponent', () => {
  let component: EstTemplateGridComponent;
  let fixture: ComponentFixture<EstTemplateGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EstTemplateGridComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EstTemplateGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
