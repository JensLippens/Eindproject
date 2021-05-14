import { TestBed } from '@angular/core/testing';

import { MandjeService } from './mandje.service';

describe('MandjeService', () => {
  let service: MandjeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MandjeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
