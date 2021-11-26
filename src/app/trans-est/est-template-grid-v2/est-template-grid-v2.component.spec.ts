import {ComponentFixture, TestBed} from '@angular/core/testing';

import {EstTemplateGridV2Component} from './est-template-grid-v2.component';

describe('EstTemplateGridV2Component', () => {
  let component: EstTemplateGridV2Component;
  let fixture: ComponentFixture<EstTemplateGridV2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EstTemplateGridV2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EstTemplateGridV2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
