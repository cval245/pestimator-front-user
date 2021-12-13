import {ComponentFixture, TestBed} from '@angular/core/testing';

import {FamEstDetailComponent} from './fam-est-detail.component';

describe('FamEstDetailComponent', () => {
  let component: FamEstDetailComponent;
  let fixture: ComponentFixture<FamEstDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FamEstDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FamEstDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
