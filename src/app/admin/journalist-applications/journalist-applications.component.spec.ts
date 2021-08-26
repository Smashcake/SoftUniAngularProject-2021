import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JournalistApplicationsComponent } from './journalist-applications.component';

describe('JournalistApplicationsComponent', () => {
  let component: JournalistApplicationsComponent;
  let fixture: ComponentFixture<JournalistApplicationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [JournalistApplicationsComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JournalistApplicationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
