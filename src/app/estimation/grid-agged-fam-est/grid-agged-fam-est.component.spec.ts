import {ComponentFixture, TestBed} from '@angular/core/testing';

import {GridAggedFamEstComponent} from './grid-agged-fam-est.component';

describe('GridAggedFamEstComponent', () => {
  let component: GridAggedFamEstComponent;
  let fixture: ComponentFixture<GridAggedFamEstComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GridAggedFamEstComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GridAggedFamEstComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
