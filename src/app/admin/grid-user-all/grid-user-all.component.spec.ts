import {ComponentFixture, TestBed} from '@angular/core/testing';

import {GridUserAllComponent} from './grid-user-all.component';

describe('GridUserAllComponent', () => {
  let component: GridUserAllComponent;
  let fixture: ComponentFixture<GridUserAllComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GridUserAllComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GridUserAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
