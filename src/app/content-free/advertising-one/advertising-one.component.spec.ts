import {ComponentFixture, TestBed} from '@angular/core/testing';

import {AdvertisingOneComponent} from './advertising-one.component';

describe('AdvertisingOneComponent', () => {
  let component: AdvertisingOneComponent;
  let fixture: ComponentFixture<AdvertisingOneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdvertisingOneComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvertisingOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
