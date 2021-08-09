import { TestBed } from '@angular/core/testing';

import { AuthActive } from './auth-guard.guard';

describe('AuthActive', () => {
  let guard: AuthActive;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AuthActive);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
