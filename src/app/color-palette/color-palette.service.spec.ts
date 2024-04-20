import { TestBed } from '@angular/core/testing';

import { ColorPaletteService } from './color-palette.service';

describe('ColorPaletteService', () => {
  let service: ColorPaletteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ColorPaletteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
