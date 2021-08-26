import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewNewsComponent } from './review-news.component';

describe('ReviewNewsComponent', () => {
  let component: ReviewNewsComponent;
  let fixture: ComponentFixture<ReviewNewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReviewNewsComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewNewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
