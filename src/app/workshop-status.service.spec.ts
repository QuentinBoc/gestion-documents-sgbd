import { TestBed } from '@angular/core/testing';

import { WorkshopStatusService } from './workshop-status.service';

describe('WorkshopStatusService', () => {
  let service: WorkshopStatusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WorkshopStatusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
