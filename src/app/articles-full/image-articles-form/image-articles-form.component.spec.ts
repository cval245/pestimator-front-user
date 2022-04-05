import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ImageArticlesFormComponent} from './image-articles-form.component';

describe('ImageArticlesFormComponent', () => {
  let component: ImageArticlesFormComponent;
  let fixture: ComponentFixture<ImageArticlesFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ImageArticlesFormComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageArticlesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
