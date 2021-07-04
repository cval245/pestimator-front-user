import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FamEstFormComponent } from './fam-est-form.component';

describe('FamEstFormComponent', () => {
  let component: FamEstFormComponent;
  let fixture: ComponentFixture<FamEstFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FamEstFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FamEstFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
