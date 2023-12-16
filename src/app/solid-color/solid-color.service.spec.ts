import { TestBed } from '@angular/core/testing';

import { SolidColorService } from './solid-color.service';

describe('SolidColorService', () => {
  let service: SolidColorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SolidColorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
