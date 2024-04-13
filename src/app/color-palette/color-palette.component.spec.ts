import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColorPaletteComponent } from './color-palette.component';

fdescribe('ColorPaletteComponent', () => {
  let component: ColorPaletteComponent;
  let fixture: ComponentFixture<ColorPaletteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ColorPaletteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ColorPaletteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
