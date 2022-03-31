import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ArticlesListPageComponent} from './articles-list-page.component';

describe('ArticlesListPageComponent', () => {
  let component: ArticlesListPageComponent;
  let fixture: ComponentFixture<ArticlesListPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArticlesListPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticlesListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
