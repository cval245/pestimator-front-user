import {ComponentFixture, TestBed} from '@angular/core/testing';

import {FamEstFormPageComponent} from './fam-est-form-page.component';

describe('FamEstFormPageComponent', () => {
  let component: FamEstFormPageComponent;
  let fixture: ComponentFixture<FamEstFormPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FamEstFormPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FamEstFormPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
