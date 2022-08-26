import { TestBed } from '@angular/core/testing';

import { UserDashboardGuard } from './user-dashboard.guard';

describe('UserDashboardGuard', () => {
  let guard: UserDashboardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(UserDashboardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
