import { TestBed } from '@angular/core/testing';

import { PlaneDrawService } from './plane-draw.service';

describe('PlaneDrawService', () => {
  let service: PlaneDrawService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlaneDrawService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
