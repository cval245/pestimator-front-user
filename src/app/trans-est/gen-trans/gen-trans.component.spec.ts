import {ComponentFixture, TestBed} from '@angular/core/testing';

import {GenTransComponent} from './gen-trans.component';

describe('GenTransComponent', () => {
  let component: GenTransComponent;
  let fixture: ComponentFixture<GenTransComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenTransComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GenTransComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
