import { TestBed } from '@angular/core/testing';

import { MinesweepService } from './minesweep.service';

describe('MinesweepService', () => {
  let service: MinesweepService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MinesweepService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
