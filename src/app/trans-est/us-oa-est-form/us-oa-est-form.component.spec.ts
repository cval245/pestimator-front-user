import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsOaEstFormComponent } from './us-oa-est-form.component';

describe('UsOaEstFormComponent', () => {
  let component: UsOaEstFormComponent;
  let fixture: ComponentFixture<UsOaEstFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsOaEstFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsOaEstFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
