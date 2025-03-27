import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { athurizationGuard } from './athurization.guard';

describe('athurizationGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => athurizationGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
