import {ComponentFixture, TestBed} from '@angular/core/testing';

import {FamilyEstimateMainComponent} from './family-estimate-main.component';

describe('FamilyEstimateMainComponent', () => {
  let component: FamilyEstimateMainComponent;
  let fixture: ComponentFixture<FamilyEstimateMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FamilyEstimateMainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FamilyEstimateMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
