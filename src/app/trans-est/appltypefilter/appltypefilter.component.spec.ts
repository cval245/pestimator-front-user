import {ComponentFixture, TestBed} from '@angular/core/testing';

import {AppltypefilterComponent} from './appltypefilter.component';

describe('AppltypefilterComponent', () => {
  let component: AppltypefilterComponent;
  let fixture: ComponentFixture<AppltypefilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppltypefilterComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppltypefilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
