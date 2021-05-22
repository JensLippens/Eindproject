import { TestBed } from '@angular/core/testing';

import { BestellingService } from './bestelling.service';

describe('BestellingService', () => {
  let service: BestellingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BestellingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
