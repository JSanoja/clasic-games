import { TestBed } from '@angular/core/testing';

import { StorageService } from './storage.service';
import { ILeaderBoard } from '../model/leader-board';

describe('StorageService', () => {
  let service: StorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('#getLeaderBoard to be Array', () => {
    expect(service.getLeaderBoard()).toEqual([]);
  });

  it('#setLeaderBoard to be', () => {
    expect(service.setLeaderBoard([])).toBe();
  });

});
