import {ComponentFixture, TestBed} from '@angular/core/testing';

import {DetFeeCatApplTypesRendererComponent} from './det-fee-cat-appl-types-renderer.component';

describe('DetFeeCatApplTypesRendererComponent', () => {
  let component: DetFeeCatApplTypesRendererComponent;
  let fixture: ComponentFixture<DetFeeCatApplTypesRendererComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DetFeeCatApplTypesRendererComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetFeeCatApplTypesRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
