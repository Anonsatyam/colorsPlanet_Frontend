import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddColorPaletteComponent } from './add-color-palette.component';

describe('AddColorPaletteComponent', () => {
  let component: AddColorPaletteComponent;
  let fixture: ComponentFixture<AddColorPaletteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddColorPaletteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddColorPaletteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
