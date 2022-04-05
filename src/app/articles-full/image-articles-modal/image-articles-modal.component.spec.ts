import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ImageArticlesModalComponent} from './image-articles-modal.component';

describe('ImageArticlesModalComponent', () => {
  let component: ImageArticlesModalComponent;
  let fixture: ComponentFixture<ImageArticlesModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ImageArticlesModalComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageArticlesModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
