import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ConditionRendererComponent} from './condition-renderer.component';

describe('ConditionRendererComponent', () => {
  let component: ConditionRendererComponent;
  let fixture: ComponentFixture<ConditionRendererComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConditionRendererComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConditionRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
