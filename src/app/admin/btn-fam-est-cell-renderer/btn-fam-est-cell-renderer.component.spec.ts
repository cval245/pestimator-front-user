import {ComponentFixture, TestBed} from '@angular/core/testing';

import {BtnFamEstCellRendererComponent} from './btn-fam-est-cell-renderer.component';

describe('BtnFamEstCellRendererComponent', () => {
  let component: BtnFamEstCellRendererComponent;
  let fixture: ComponentFixture<BtnFamEstCellRendererComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BtnFamEstCellRendererComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BtnFamEstCellRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
