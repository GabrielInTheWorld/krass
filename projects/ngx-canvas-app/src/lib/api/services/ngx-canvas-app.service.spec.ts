import { TestBed } from '@angular/core/testing';

import { NgxCanvasAppService } from './ngx-canvas-app.service';

describe('NgxCanvasAppService', () => {
  let service: NgxCanvasAppService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgxCanvasAppService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
