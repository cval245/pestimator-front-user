import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ArticlesListFormComponent} from './articles-list-form.component';

describe('ArticlesListFormComponent', () => {
  let component: ArticlesListFormComponent;
  let fixture: ComponentFixture<ArticlesListFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArticlesListFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticlesListFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
