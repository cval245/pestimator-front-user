import {ComponentFixture, TestBed} from '@angular/core/testing';

import {FamEstDetailsComponent} from './fam-est-details.component';

describe('FamEstDetailsComponent', () => {
  let component: FamEstDetailsComponent;
  let fixture: ComponentFixture<FamEstDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FamEstDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FamEstDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
