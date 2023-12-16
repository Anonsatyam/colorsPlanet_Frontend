import { TestBed } from '@angular/core/testing';

import { GradientColorService } from './gradient-color.service';

describe('GradientColorService', () => {
  let service: GradientColorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GradientColorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
