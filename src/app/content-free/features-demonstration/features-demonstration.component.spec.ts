import {ComponentFixture, TestBed} from '@angular/core/testing';

import {FeaturesDemonstrationComponent} from './features-demonstration.component';

describe('FeaturesDemonstrationComponent', () => {
  let component: FeaturesDemonstrationComponent;
  let fixture: ComponentFixture<FeaturesDemonstrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeaturesDemonstrationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FeaturesDemonstrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
