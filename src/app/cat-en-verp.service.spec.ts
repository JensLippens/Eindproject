import { TestBed } from '@angular/core/testing';

import { CatEnVerpService } from './cat-en-verp.service';

describe('CatEnVerpService', () => {
  let service: CatEnVerpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CatEnVerpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
