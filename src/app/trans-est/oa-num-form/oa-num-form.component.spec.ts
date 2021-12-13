import {ComponentFixture, TestBed} from '@angular/core/testing';

import {OaNumFormComponent} from './oa-num-form.component';

describe('OaNumFormComponent', () => {
  let component: OaNumFormComponent;
  let fixture: ComponentFixture<OaNumFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OaNumFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OaNumFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
