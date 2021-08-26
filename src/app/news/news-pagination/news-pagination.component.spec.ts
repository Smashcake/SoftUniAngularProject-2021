import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsPaginationComponent } from './news-pagination.component';

describe('NewsPaginationComponent', () => {
  let component: NewsPaginationComponent;
  let fixture: ComponentFixture<NewsPaginationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NewsPaginationComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsPaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
