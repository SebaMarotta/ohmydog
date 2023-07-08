import { TestBed } from '@angular/core/testing';

import { CruzaService } from './cruza.service';

describe('CruzaService', () => {
  let service: CruzaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CruzaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
