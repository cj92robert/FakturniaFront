import { TestBed } from '@angular/core/testing';

import { JwtexpireInterceptor } from './jwtexpire.interceptor';

describe('JwtexpireInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      JwtexpireInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: JwtexpireInterceptor = TestBed.inject(JwtexpireInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
