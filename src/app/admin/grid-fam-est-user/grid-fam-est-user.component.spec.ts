import {ComponentFixture, TestBed} from '@angular/core/testing';

import {GridFamEstUserComponent} from './grid-fam-est-user.component';

describe('GridFamEstUserComponent', () => {
  let component: GridFamEstUserComponent;
  let fixture: ComponentFixture<GridFamEstUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GridFamEstUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GridFamEstUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
