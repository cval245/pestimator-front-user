import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ArticlesFormModalComponent} from './articles-form-modal.component';

describe('ArticlesFormModalComponent', () => {
  let component: ArticlesFormModalComponent;
  let fixture: ComponentFixture<ArticlesFormModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArticlesFormModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticlesFormModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
