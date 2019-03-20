import { TestBed } from '@angular/core/testing';

import { TransportsService } from './transports.service';

describe('TransportsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TransportsService = TestBed.get(TransportsService);
    expect(service).toBeTruthy();
  });
});
